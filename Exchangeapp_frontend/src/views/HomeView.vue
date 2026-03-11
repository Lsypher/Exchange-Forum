<template>
  <div class="home-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">欢迎使用 Exchange Forum</h1>
        <p class="hero-description">实时汇率查询、货币兑换计算与金融新闻资讯，一站式金融服务平台</p>
        <div class="hero-actions">
          <router-link to="/exchanges" class="btn btn-primary hero-btn">
            开始汇率兑换
          </router-link>
          <router-link to="/articles" class="btn btn-secondary hero-btn">
            浏览金融新闻
          </router-link>
        </div>
      </div>
    </div>

    <div class="features-section">
      <div class="container">
        <h2 class="section-title">核心功能</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1.5 1.75a.75.75 0 00-1.5 0v12.5c0 .414.336.75.75.75h14.5a.75.75 0 000-1.5H1.5V1.75zm2.75 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"></path>
              </svg>
            </div>
            <h3 class="feature-title">实时汇率</h3>
            <p class="feature-description">获取全球主要货币的实时汇率数据，支持历史汇率查询</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8.5.75a.75.75 0 00-1.5 0v5.19L4.391 3.33a.75.75 0 10-1.06 1.061L5.939 7H.75a.75.75 0 000 1.5h5.19l-2.61 2.609a.75.75 0 101.061 1.06L7 9.561v5.189a.75.75 0 001.5 0V9.56l2.609 2.61a.75.75 0 101.06-1.061L9.561 8.5h5.189a.75.75 0 000-1.5H9.56l2.61-2.609a.75.75 0 00-1.061-1.06L8.5 5.939V.75z"></path>
              </svg>
            </div>
            <h3 class="feature-title">货币兑换</h3>
            <p class="feature-description">快速准确的货币兑换计算器，支持多种货币实时换算</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9.25h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9.25h3.757a3.75 3.75 0 011.994.574z"></path>
              </svg>
            </div>
            <h3 class="feature-title">金融资讯</h3>
            <p class="feature-description">最新的金融新闻和市场分析，助您把握投资机会</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home-container {
  min-height: calc(100vh - 64px);
  background: linear-gradient(180deg, #faf8f5 0%, #f5f2ed 100%);
  position: relative;
}

.home-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(196, 167, 125, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 30%, rgba(139, 115, 85, 0.06) 0%, transparent 40%),
    radial-gradient(circle at 40% 80%, rgba(196, 167, 125, 0.05) 0%, transparent 30%);
  pointer-events: none;
}

.hero-section {
  padding: 100px 0 80px;
  text-align: center;
  position: relative;
}

.hero-content {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}


.hero-title {
  margin-bottom: 20px;
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: 52px;
  font-weight: 700;
  line-height: 1.15;
  color: #2d2a26;
  letter-spacing: -1px;
  animation: fadeInUp 0.6s ease-out;
}

.hero-description {
  margin-bottom: 36px;
  font-size: 20px;
  line-height: 1.6;
  color: #8b7355;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 0.6s ease-out 0.1s both;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.hero-btn {
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  transition: all 0.25s ease;
  text-decoration: none;
}

.btn-primary.hero-btn {
  background: linear-gradient(135deg, #c4a77d 0%, #a68b5b 100%);
  border: none;
  color: #fff;
}

.btn-primary.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(166, 139, 91, 0.4);
}

.btn-secondary.hero-btn {
  background: #fff;
  border: 2px solid #e8e4de;
  color: #6b5744;
}

.btn-secondary.hero-btn:hover {
  background: #faf8f5;
  border-color: #c4a77d;
  color: #2d2a26;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.features-section {
  padding: 80px 0;
  position: relative;
  z-index: 1;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-title {
  margin-bottom: 48px;
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  color: #2d2a26;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
}

.feature-card {
  padding: 36px 32px;
  background: #ffffff;
  border: 1px solid #e8e4de;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px rgba(45, 42, 38, 0.06);
}

.feature-card:hover {
  border-color: #c4a77d;
  box-shadow: 0 8px 32px rgba(45, 42, 38, 0.12);
  transform: translateY(-4px);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: 20px;
  color: #c4a77d;
  background: linear-gradient(135deg, #faf8f5 0%, #f5f2ed 100%);
  border-radius: 14px;
}

.feature-title {
  margin-bottom: 10px;
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: 22px;
  font-weight: 600;
  color: #2d2a26;
}

.feature-description {
  color: #8b7355;
  line-height: 1.6;
  font-size: 15px;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 64px 0;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-description {
    font-size: 18px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .hero-btn {
    width: 100%;
    max-width: 300px;
  }

  .features-section {
    padding: 64px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>