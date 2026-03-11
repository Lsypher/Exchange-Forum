<template>
  <div class="exchange-container">
    <div class="container">
      <div class="exchange-header">
        <h1 class="page-title">货币兑换</h1>
        <p class="page-description">实时汇率换算，支持全球主要货币</p>
      </div>

      <div class="exchange-card">
        <el-form :model="form" class="exchange-form" label-position="top">
          <div class="form-row">
            <div class="form-col">
              <el-form-item label="从货币" class="form-item">
                <el-select
                  v-model="form.fromCurrency"
                  placeholder="选择源货币"
                  class="currency-select"
                  size="large"
                >
                  <el-option
                    v-for="currency in currencies"
                    :key="currency"
                    :label="currency"
                    :value="currency"
                  />
                </el-select>
              </el-form-item>
            </div>

            <div class="exchange-arrow">
              <el-button circle @click="swapCurrencies" class="swap-btn">
                <el-icon size="20"><Sort /></el-icon>
              </el-button>
            </div>

            <div class="form-col">
              <el-form-item label="到货币" class="form-item">
                <el-select
                  v-model="form.toCurrency"
                  placeholder="选择目标货币"
                  class="currency-select"
                  size="large"
                >
                  <el-option
                    v-for="currency in currencies"
                    :key="currency"
                    :label="currency"
                    :value="currency"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>

          <el-form-item label="兑换金额" class="form-item">
            <el-input
              v-model="form.amount"
              type="number"
              placeholder="输入要兑换的金额"
              class="amount-input"
              size="large"
            >
              <template #prefix>
                <span class="currency-prefix">{{ form.fromCurrency || 'USD' }}</span>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="exchange"
              class="exchange-btn"
              size="large"
              :loading="loading"
              :disabled="!form.fromCurrency || !form.toCurrency || !form.amount"
            >
              立即兑换
            </el-button>
          </el-form-item>
        </el-form>

        <div v-if="result" class="result-box">
          <div class="result-header">
            <h3 class="result-title">兑换结果</h3>
            <span class="result-rate">汇率: {{ displayRate }}</span>
          </div>
          <div class="result-content">
            <div class="result-amount">
              <span class="amount-from">{{ formatAmount(form.amount) }} {{ form.fromCurrency }}</span>
              <el-icon class="arrow-icon"><Right /></el-icon>
              <span class="amount-to">{{ formatAmount(result) }} {{ form.toCurrency }}</span>
            </div>
            <div class="result-time">
              <el-icon size="14"><Clock /></el-icon>
              更新时间: {{ currentTime }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="recentRates.length > 0" class="recent-rates">
        <h2 class="section-title">最近汇率</h2>
        <div class="rates-grid">
          <div v-for="rate in recentRates" :key="rate.key" class="rate-item">
            <div class="rate-currency">{{ rate.from }} → {{ rate.to }}</div>
            <div class="rate-value">{{ rate.rate.toFixed(4) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>  
  
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Sort, Right, Clock } from '@element-plus/icons-vue';
import axios from '../axios';
import { ElMessage } from 'element-plus';

interface ExchangeRate {
  fromcurrency: string;
  tocurrency: string;
  rate: number;
}

const form = ref({
  fromCurrency: 'USD',
  toCurrency: 'CNY',
  amount: 100,
});

const result = ref<number | null>(null);
const currencies = ref<string[]>([]);
const rates = ref<ExchangeRate[]>([]);
const loading = ref(false);
const currentRate = ref<number | null>(null);
const currentTime = ref('');

const recentRates = computed(() => {
  if (!rates.value.length) return [];
  return rates.value.slice(0, 6).map(rate => ({
    key: `${rate.fromcurrency}-${rate.tocurrency}`,
    from: rate.fromcurrency,
    to: rate.tocurrency,
    rate: rate.rate
  }));
});

const displayRate = computed(() => {
  return currentRate.value ? currentRate.value.toFixed(4) : '-';
});

const fetchCurrencies = async () => {
  try {
    loading.value = true;
    const response = await axios.get<ExchangeRate[]>('/exchangerates');
    rates.value = response.data;
    currencies.value = [...new Set(response.data.map((rate: ExchangeRate) => [rate.fromcurrency, rate.tocurrency]).flat())].sort();
  } catch (error) {
    ElMessage.error('获取汇率数据失败');
    console.error('Failed to load currencies', error);
  } finally {
    loading.value = false;
  }
};

const exchange = () => {
  if (!form.value.amount || form.value.amount <= 0) {
    ElMessage.warning('请输入有效的兑换金额');
    return;
  }

  const rate = rates.value.find(
    (rate) => rate.fromcurrency === form.value.fromCurrency && rate.tocurrency === form.value.toCurrency
  )?.rate;

  if (rate) {
    currentRate.value = rate;
    result.value = form.value.amount * rate;
    updateCurrentTime();
  } else {
    ElMessage.warning('未找到对应的汇率信息');
    result.value = null;
    currentRate.value = null;
  }
};

const swapCurrencies = () => {
  const temp = form.value.fromCurrency;
  form.value.fromCurrency = form.value.toCurrency;
  form.value.toCurrency = temp;

  if (result.value) {
    exchange();
  }
};

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

const updateCurrentTime = () => {
  currentTime.value = new Date().toLocaleString('zh-CN');
};

onMounted(() => {
  fetchCurrencies();
  updateCurrentTime();
});
</script>
  
<style scoped>
.exchange-container {
  min-height: calc(100vh - 64px);
  background: linear-gradient(180deg, #faf8f5 0%, #f5f2ed 100%);
  padding: 48px 0 80px;
}

.container {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 24px;
}

.exchange-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-title {
  margin-bottom: 8px;
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: 42px;
  font-weight: 700;
  color: #2d2a26;
}

.page-description {
  font-size: 18px;
  color: #8b7355;
}

.exchange-card {
  background: #ffffff;
  border: 1px solid #e8e4de;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(45, 42, 38, 0.08);
  padding: 40px;
  margin-bottom: 32px;
}

.exchange-form {
  margin-bottom: 32px;
}

.form-row {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 24px;
}

.form-col {
  flex: 1;
}

.exchange-arrow {
  padding-bottom: 24px;
}

.swap-btn {
  width: 44px;
  height: 44px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #faf8f5;
  border: 2px solid #e8e4de;
  color: #8b7355;
  transition: all 0.2s ease;
}

.swap-btn:hover {
  background: #e8e4de;
  border-color: #c4a77d;
  color: #2d2a26;
}

.form-item {
  margin-bottom: 0;
}

.form-item :deep(.el-form-item__label) {
  color: #2d2a26;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 15px;
}

.currency-select {
  width: 100%;
}

.currency-select :deep(.el-input__wrapper) {
  border-radius: 10px;
  box-shadow: none;
  border: 2px solid #e8e4de;
}

.currency-select :deep(.el-input__wrapper:hover),
.currency-select :deep(.el-input__wrapper.is-focus) {
  border-color: #c4a77d;
}

.currency-prefix {
  color: #8b7355;
  font-size: 14px;
  margin-right: 4px;
}

.amount-input {
  width: 100%;
}

.amount-input :deep(.el-input__wrapper) {
  border-radius: 10px;
  box-shadow: none;
  border: 2px solid #e8e4de;
}

.amount-input :deep(.el-input__wrapper:hover),
.amount-input :deep(.el-input__wrapper.is-focus) {
  border-color: #c4a77d;
}

.exchange-btn {
  width: 100%;
  height: 52px;
  font-size: 17px;
  font-weight: 600;
  margin-top: 16px;
  background: linear-gradient(135deg, #c4a77d 0%, #a68b5b 100%);
  border: none;
  border-radius: 10px;
  color: #fff;
  transition: all 0.2s ease;
}

.exchange-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(166, 139, 91, 0.4);
}

.exchange-btn:disabled {
  background: #d4cfc4;
  cursor: not-allowed;
}

.result-box {
  background: linear-gradient(180deg, #faf8f5 0%, #f5f2ed 100%);
  border: 1px solid #e8e4de;
  border-radius: 12px;
  padding: 24px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.result-title {
  margin: 0;
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: 18px;
  font-weight: 600;
  color: #2d2a26;
}

.result-rate {
  font-size: 14px;
  color: #8b7355;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-amount {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 22px;
  font-weight: 600;
}

.amount-from {
  color: #8b7355;
}

.amount-to {
  color: #a68b5b;
  font-size: 26px;
}

.arrow-icon {
  color: #c4a77d;
}

.result-time {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #a69580;
}

.recent-rates {
  margin-top: 48px;
}

.section-title {
  margin-bottom: 24px;
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  color: #2d2a26;
}

.rates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.rate-item {
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e8e4de;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.rate-item:hover {
  border-color: #c4a77d;
  box-shadow: 0 4px 16px rgba(45, 42, 38, 0.08);
}

.rate-currency {
  font-size: 14px;
  color: #8b7355;
  margin-bottom: 8px;
}

.rate-value {
  font-size: 20px;
  font-weight: 600;
  color: #2d2a26;
}

@media (max-width: 768px) {
  .container {
    padding: 32px 16px;
  }

  .exchange-card {
    padding: 24px;
  }

  .form-row {
    flex-direction: column;
    align-items: stretch;
  }

  .exchange-arrow {
    display: flex;
    justify-content: center;
    padding: 8px 0;
    transform: rotate(90deg);
  }

  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .result-amount {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .arrow-icon {
    transform: rotate(90deg);
  }
}
</style>
  