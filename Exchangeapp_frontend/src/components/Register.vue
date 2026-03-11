<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1 class="auth-title">注册新账户</h1>
          <p class="auth-subtitle">加入 Exchange Forum，获取专业金融服务</p>
        </div>

        <el-form :model="form" class="auth-form" @submit.prevent="register" label-position="top">
          <el-form-item label="用户名" class="form-item" required>
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              size="large"
              class="auth-input"
              prefix-icon="User"
            />
          </el-form-item>

          <el-form-item label="密码" class="form-item" required>
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码（至少6位）"
              size="large"
              class="auth-input"
              prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <el-form-item label="确认密码" class="form-item" required>
            <el-input
              v-model="form.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              size="large"
              class="auth-input"
              prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              native-type="submit"
              class="auth-btn"
              size="large"
              :loading="loading"
              :disabled="!isFormValid"
            >
              创建账户
            </el-button>
          </el-form-item>
        </el-form>

        <div class="auth-footer">
          <p class="auth-text">
            已有账户？
            <router-link to="/login" class="auth-link">立即登录</router-link>
          </p>
        </div>
      </div>

      <div class="auth-info">
        <h2 class="info-title">加入 Exchange Forum</h2>
        <p class="info-description">创建免费账户，解锁全部功能</p>
        <ul class="info-features">
          <li>实时汇率查询</li>
          <li>货币兑换计算</li>
          <li>金融新闻资讯</li>
          <li>个人收藏管理</li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { ElMessage } from 'element-plus';

const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
});

const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const isFormValid = computed(() => {
  return form.value.username &&
         form.value.password &&
         form.value.confirmPassword &&
         form.value.password === form.value.confirmPassword &&
         form.value.password.length >= 6;
});

const register = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致');
    return;
  }

  if (form.value.password.length < 6) {
    ElMessage.error('密码长度至少为6位');
    return;
  }

  try {
    loading.value = true;
    await authStore.register(form.value.username, form.value.password);
    ElMessage.success('注册成功');
    router.push({ name: 'News' });
  } catch (error) {
    ElMessage.error('注册失败，请重试');
  } finally {
    loading.value = false;
  }
};
</script>
  
<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #faf8f5 0%, #f5f2ed 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  position: relative;
}

.auth-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(196, 167, 125, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(139, 115, 85, 0.08) 0%, transparent 40%);
  pointer-events: none;
}

.auth-container {
  display: flex;
  gap: 80px;
  max-width: 1024px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.auth-card {
  flex: 1;
  max-width: 400px;
  background: #ffffff;
  border: 1px solid #e8e4de;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(45, 42, 38, 0.08);
  padding: 40px;
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}


.auth-title {
  margin: 0 0 8px;
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  color: #2d2a26;
}

.auth-subtitle {
  margin: 0;
  font-size: 16px;
  color: #8b7355;
}

.auth-form {
  margin-bottom: 24px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item :deep(.el-form-item__label) {
  color: #2d2a26;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 15px;
}

.auth-input :deep(.el-input__wrapper) {
  width: 100%;
  border-radius: 10px;
  box-shadow: none;
  border: 2px solid #e8e4de;
}

.auth-input :deep(.el-input__wrapper:hover),
.auth-input :deep(.el-input__wrapper.is-focus) {
  border-color: #c4a77d;
}

.auth-btn {
  width: 100%;
  height: 52px;
  font-size: 17px;
  font-weight: 600;
  background: linear-gradient(135deg, #c4a77d 0%, #a68b5b 100%);
  border: none;
  border-radius: 10px;
  color: #fff;
  transition: all 0.2s ease;
}

.auth-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(166, 139, 91, 0.4);
}

.auth-footer {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid #e8e4de;
}

.auth-text {
  margin: 0;
  font-size: 14px;
  color: #8b7355;
}

.auth-link {
  color: #c4a77d;
  text-decoration: none;
  font-weight: 600;
}

.auth-link:hover {
  color: #a68b5b;
}

.auth-info {
  flex: 1;
  max-width: 400px;
  padding: 32px 0;
}

.info-title {
  margin: 0 0 16px;
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: 36px;
  font-weight: 700;
  color: #2d2a26;
}

.info-description {
  margin: 0 0 32px;
  font-size: 18px;
  line-height: 1.6;
  color: #8b7355;
}

.info-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-features li {
  position: relative;
  padding-left: 32px;
  margin-bottom: 16px;
  font-size: 16px;
  color: #2d2a26;
}

.info-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  color: #c4a77d;
  font-weight: 600;
  font-size: 18px;
}

@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
    gap: 48px;
  }

  .auth-info {
    text-align: center;
    padding: 0;
  }

  .info-features li {
    text-align: left;
  }
}
</style>
  