package jobs

import (
	"exchangeapp/config"
	"exchangeapp/global"
	"exchangeapp/services"
	"log"
	"sync"
	"time"
)

type ExchangeRateJob struct {
	service   *services.ExchangeRateService
	interval  time.Duration
	stopChan  chan struct{}
	wg        sync.WaitGroup
	running   bool
	mu        sync.Mutex
}

var (
	jobInstance *ExchangeRateJob
	jobOnce     sync.Once
)

func NewExchangeRateJob() *ExchangeRateJob {
	jobOnce.Do(func() {
		cfg := config.AppConfig.ExchangeRate
		service := services.NewExchangeRateService(global.Db)

		jobInstance = &ExchangeRateJob{
			service:  service,
			interval: time.Duration(cfg.FetchInterval) * time.Second,
			stopChan: make(chan struct{}),
		}
	})
	return jobInstance
}

func (j *ExchangeRateJob) Start() {
	j.mu.Lock()
	if j.running {
		j.mu.Unlock()
		return
	}
	j.running = true
	j.mu.Unlock()

	log.Printf("[ExchangeRateJob] 启动定时任务，间隔: %v", j.interval)

	if err := j.RunOnce(); err != nil {
		log.Printf("[ExchangeRateJob] 初始更新失败: %v", err)
	}

	j.wg.Add(1)
	go j.run()
}

func (j *ExchangeRateJob) run() {
	defer j.wg.Done()

	ticker := time.NewTicker(j.interval)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			if err := j.RunOnce(); err != nil {
				log.Printf("[ExchangeRateJob] 定时更新失败: %v", err)
			}
		case <-j.stopChan:
			log.Println("[ExchangeRateJob] 收到停止信号")
			return
		}
	}
}

func (j *ExchangeRateJob) Stop() {
	j.mu.Lock()
	if !j.running {
		j.mu.Unlock()
		return
	}
	j.mu.Unlock()

	log.Println("[ExchangeRateJob] 停止定时任务...")
	close(j.stopChan)
	j.wg.Wait()

	j.mu.Lock()
	j.running = false
	j.mu.Unlock()
	log.Println("[ExchangeRateJob] 定时任务已停止")
}

func (j *ExchangeRateJob) RunOnce() error {
	return j.service.FetchAndUpdateAll()
}