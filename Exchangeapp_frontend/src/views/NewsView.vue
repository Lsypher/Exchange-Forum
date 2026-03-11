<template>
  <div class="news-container">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">金融新闻</h1>
        <p class="page-description">了解最新的金融市场动态和专业分析</p>
      </div>

      <div v-if="!authStore.isAuthenticated" class="auth-prompt">
        <div class="blankslate">
          <el-icon size="48" class="text-muted"><Lock /></el-icon>
          <h3>需要登录</h3>
          <p>登录后可以查看最新的金融新闻和市场分析</p>
          <router-link to="/login" class="btn btn-primary">立即登录</router-link>
        </div>
      </div>

      <div v-else-if="loading" class="loading-section">
        <el-skeleton :rows="3" animated />
      </div>

      <div v-else-if="filteredArticles.length === 0" class="empty-section">
        <div class="blankslate">
          <el-icon size="48" class="text-muted"><Document /></el-icon>
          <h3>{{ searchQuery ? '没有找到匹配的文章' : '暂无文章' }}</h3>
          <p>{{ searchQuery ? '试试其他关键词' : '目前还没有发布任何文章，请稍后再来查看' }}</p>
          <el-button v-if="searchQuery" @click="searchQuery = ''" type="primary">
            清除搜索
          </el-button>
        </div>
      </div>

      <div v-else class="articles-section">
        <div class="articles-header">
          <h2 class="section-title">
            {{ searchQuery ? '搜索结果' : '最新文章' }}
          </h2>
          <div class="header-actions">
            <div class="search-box">
              <el-input
                v-model="searchQuery"
                placeholder="搜索文章..."
                :prefix-icon="Search"
                clearable
                class="search-input"
              />
            </div>
            <div class="articles-stats">
              共 {{ filteredArticles.length }} 篇文章
            </div>
          </div>
        </div>

        <div class="articles-list">
          <article v-for="article in filteredArticles" :key="article.ID" class="article-card">
            <div class="article-header">
              <div class="article-meta">
                <span class="article-date">{{ formatDate(article.CreatedAt) }}</span>
                <el-tag v-if="article.category" size="small" class="article-category">
                  {{ article.category }}
                </el-tag>
              </div>
              <h2 class="article-title">
                <a @click="viewDetail(article.ID)" class="article-link">{{ article.title }}</a>
              </h2>
              <p class="article-preview">{{ article.preview }}</p>
            </div>

            <div class="article-footer">
              <div class="article-author">
                <el-avatar :size="20" :src="article.author?.avatar" class="author-avatar">
                  {{ article.author?.username?.charAt(0) }}
                </el-avatar>
                <span class="author-name">{{ article.author?.username || '匿名用户' }}</span>
              </div>

              <div class="article-actions">
                <button class="action-btn" @click="viewDetail(article.ID)">
                  <el-icon size="16"><View /></el-icon>
                  阅读更多
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from '../axios';
import { useAuthStore } from '../store/auth';
import type { Article } from "../types/Article";
import { Lock, Document, View, Search } from '@element-plus/icons-vue';

const articles = ref<Article[]>([]);
const loading = ref(false);
const searchQuery = ref('');
const router = useRouter();
const authStore = useAuthStore();

const filteredArticles = computed(() => {
  if (!searchQuery.value.trim()) {
    return articles.value;
  }
  const query = searchQuery.value.toLowerCase().trim();
  return articles.value.filter(article =>
    article.title.toLowerCase().includes(query) ||
    article.preview.toLowerCase().includes(query) ||
    (article.category && article.category.toLowerCase().includes(query)) ||
    (article.tags && article.tags.toLowerCase().includes(query))
  );
});

const fetchArticles = async () => {
  if (!authStore.isAuthenticated) return;

  try {
    loading.value = true;
    const response = await axios.get<Article[]>('/articles');
    articles.value = response.data;
  } catch (error) {
    ElMessage.error('获取文章列表失败');
    console.error('Failed to load articles:', error);
  } finally {
    loading.value = false;
  }
};

const viewDetail = (id: string) => {
  router.push({ name: 'NewsDetail', params: { id } });
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(fetchArticles);
</script>

<style scoped>
.news-container {
  min-height: calc(100vh - 64px);
  background: linear-gradient(180deg, #faf8f5 0%, #f5f2ed 100%);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 24px;
}

.page-header {
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

.auth-prompt {
  max-width: 600px;
  margin: 0 auto;
}

.blankslate {
  padding: 80px 40px;
  text-align: center;
  background-color: #faf8f5;
  border: 1px solid #e8e4de;
  border-radius: var(--border-radius-large);
}

.blankslate h3 {
  margin: 16px 0 8px;
  font-size: 24px;
  font-weight: 600;
}

.blankslate p {
  margin-bottom: 24px;
  color: #8b7355;
}

.loading-section {
  padding: 80px 0;
}

.empty-section {
  max-width: 600px;
  margin: 0 auto;
}

.articles-section {
  max-width: 896px;
  margin: 0 auto;
}

.articles-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8e4de;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-box {
  width: 280px;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: 20px;
  box-shadow: none;
  border: 1px solid #e8e4de;
}

.search-input :deep(.el-input__wrapper:hover),
.search-input :deep(.el-input__wrapper.is-focus) {
  border-color: #c4a77d;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #2d2a26;
  margin: 0;
}

.articles-stats {
  font-size: 14px;
  color: #8b7355;
  white-space: nowrap;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-card {
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #e8e4de;
  border-radius: var(--border-radius-large);
  transition: all 0.2s ease-out;
}

.article-card:hover {
  border-color: #c4a77d;
  box-shadow: var(--shadow-medium);
}

.article-header {
  margin-bottom: 16px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.article-date {
  font-size: 14px;
  color: #8b7355;
}

.article-category {
  font-size: 12px;
  font-weight: 500;
}

.article-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
}

.article-link {
  color: #2d2a26;
  text-decoration: none;
  cursor: pointer;
}

.article-link:hover {
  color: #c4a77d;
  text-decoration: underline;
}

.article-preview {
  margin: 0;
  color: #8b7355;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e8e4de;
}

.article-author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-avatar {
  border: 1px solid #e8e4de;
}

.author-name {
  font-size: 14px;
  color: #8b7355;
}

.article-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  color: #c4a77d;
  background-color: transparent;
  border: 1px solid #e8e4de;
  border-radius: var(--border-radius-medium);
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.action-btn:hover {
  background-color: #faf8f5;
  border-color: #c4a77d;
  text-decoration: none;
}

@media (max-width: 768px) {
  .container {
    padding: 32px 16px;
  }

  .articles-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .header-actions {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: 12px;
  }

  .search-box {
    width: 100%;
  }

  .article-card {
    padding: 20px;
  }

  .article-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
