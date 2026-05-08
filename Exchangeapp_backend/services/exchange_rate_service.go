package services

import (
	"encoding/json"
	"errors"
	"exchangeapp/config"
	"exchangeapp/models"
	"fmt"
	"log"
	"net/http"
	"time"

	"gorm.io/gorm"
)

var supportedCurrencies = []string{
	"USD", "EUR", "CNY", "JPY", "GBP",
	"HKD", "KRW", "AUD", "CAD", "CHF",
}

func isSupportedCurrency(c string) bool {
	for _, supported := range supportedCurrencies {
		if c == supported {
			return true
		}
	}
	return false
}

type FrankfurterResponse struct {
	Amount float64             `json:"amount"`
	Base   string              `json:"base"`
	Date   string              `json:"date"`
	Rates  map[string]float64  `json:"rates"`
}

type ExchangeRateService struct {
	db         *gorm.DB
	httpClient *http.Client
	baseURL    string
	baseCurrency string
	timeout    int
	retryCount int
	retryDelay int
}

func NewExchangeRateService(db *gorm.DB) *ExchangeRateService {
	cfg := config.AppConfig.ExchangeRate
	return &ExchangeRateService{
		db:         db,
		httpClient: &http.Client{Timeout: time.Duration(cfg.Timeout) * time.Second},
		baseURL:    "https://api.frankfurter.app",
		baseCurrency: cfg.BaseCurrency,
		timeout:    cfg.Timeout,
		retryCount: 3,
		retryDelay: 5,
	}
}

func (s *ExchangeRateService) FetchAndUpdateAll() error {
	log.Println("[ExchangeRate] 开始获取汇率数据...")

	rates, err := s.fetchRatesFromAPI()
	if err != nil {
		return fmt.Errorf("获取汇率失败: %w", err)
	}

	if err := s.upsertRates(rates); err != nil {
		return fmt.Errorf("更新数据库失败: %w", err)
	}

	log.Printf("[ExchangeRate] 成功更新 %d 个货币对汇率", len(rates))
	return nil
}

func (s *ExchangeRateService) fetchRatesFromAPI() (map[string]map[string]float64, error) {
	result := make(map[string]map[string]float64)

	for _, from := range supportedCurrencies {
		if from == s.baseCurrency {
			continue
		}

		var resp FrankfurterResponse
		url := fmt.Sprintf("%s/latest?from=%s", s.baseURL, from)

		if err := s.fetchWithRetry(url, &resp); err != nil {
			log.Printf("[ExchangeRate] 获取 %s 汇率失败: %v", from, err)
			continue
		}

		result[from] = make(map[string]float64)

		if baseRate, ok := resp.Rates[s.baseCurrency]; ok && baseRate > 0 {
			result[from][s.baseCurrency] = 1.0 / baseRate
		}

		for to, rate := range resp.Rates {
			if to == s.baseCurrency || !isSupportedCurrency(to) {
				continue
			}
			result[from][to] = rate
		}
	}

	return result, nil
}

func (s *ExchangeRateService) fetchWithRetry(url string, result *FrankfurterResponse) error {
	var lastErr error
	for i := 0; i < s.retryCount; i++ {
		resp, err := s.httpClient.Get(url)
		if err != nil {
			lastErr = err
			time.Sleep(time.Duration(s.retryDelay) * time.Second)
			continue
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			lastErr = fmt.Errorf("HTTP %d", resp.StatusCode)
			time.Sleep(time.Duration(s.retryDelay) * time.Second)
			continue
		}

		if err := json.NewDecoder(resp.Body).Decode(result); err != nil {
			lastErr = err
			time.Sleep(time.Duration(s.retryDelay) * time.Second)
			continue
		}
		return nil
	}
	return lastErr
}

func (s *ExchangeRateService) upsertRates(rates map[string]map[string]float64) error {
	now := time.Now()

	for from, toRates := range rates {
		for to, rate := range toRates {
			// 过滤无效货币对和汇率
			if !isSupportedCurrency(from) || !isSupportedCurrency(to) {
				continue
			}
			if rate <= 0 || rate > 1e10 {
				continue
			}

			var existing models.ExchangeRate
			err := s.db.Where("from_currency = ? AND to_currency = ?", from, to).First(&existing).Error

			if errors.Is(err, gorm.ErrRecordNotFound) {
				record := models.ExchangeRate{
					FromCurrency: from,
					ToCurrency:   to,
					Rate:         rate,
					Time:         now,
				}
				if err := s.db.Create(&record).Error; err != nil {
					log.Printf("[ExchangeRate] 创建汇率记录失败: %s/%s: %v", from, to, err)
				}
			} else if err == nil {
				existing.Rate = rate
				existing.Time = now
				if err := s.db.Save(&existing).Error; err != nil {
					log.Printf("[ExchangeRate] 更新汇率记录失败: %s/%s: %v", from, to, err)
				}
			} else {
				log.Printf("[ExchangeRate] 查询汇率记录失败: %s/%s: %v", from, to, err)
			}
		}
	}
	return nil
}

func (s *ExchangeRateService) Refresh() error {
	return s.FetchAndUpdateAll()
}