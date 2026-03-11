<template>
  <div class="profile-container">
    <div class="container">
      <div class="profile-header">
        <div class="profile-cover"></div>
        <div class="profile-info">
          <div class="avatar-wrapper">
            <el-avatar :size="100" :src="userInfo.avatar" class="profile-avatar">
              {{ userInfo.username?.charAt(0).toUpperCase() }}
            </el-avatar>
            <button class="avatar-edit-btn" @click="showAvatarDialog = true">
              <el-icon><Camera /></el-icon>
            </button>
          </div>
          <div class="user-details">
            <h1 class="username">{{ userInfo.username }}</h1>
            <p class="user-bio">{{ userInfo.bio || '暂无个人简介' }}</p>
            <div class="user-meta">
              <span class="meta-item">
                <el-icon><Calendar /></el-icon>
                加入于 {{ userInfo.joinDate }}
              </span>
              <span class="meta-item">
                <el-icon><Location /></el-icon>
                {{ userInfo.location || '未设置地区' }}
              </span>
            </div>
          </div>
          <el-button class="edit-profile-btn" @click="showEditDialog = true">
            <el-icon><Edit /></el-icon>
            编辑资料
          </el-button>
        </div>
      </div>

      <div class="profile-content">
        <el-tabs v-model="activeTab" class="profile-tabs">
          <el-tab-pane label="我的文章" name="articles">
            <div class="tab-content">
              <div class="section-header">
                <h2 class="section-title">我的文章</h2>
                <router-link to="/articles/create" class="create-btn">
                  <el-icon><Plus /></el-icon>
                  创作新文章
                </router-link>
              </div>

              <div v-if="myArticles.length === 0" class="empty-state">
                <el-icon class="empty-icon"><Document /></el-icon>
                <h3>还没有发布任何文章</h3>
                <p>开始创作您的第一篇文章吧</p>
                <router-link to="/articles/create" class="btn btn-primary">
                  立即创作
                </router-link>
              </div>

              <div v-else class="articles-grid">
                <article v-for="article in myArticles" :key="article.ID" class="article-card">
                  <div class="article-content">
                    <div class="article-meta">
                      <el-tag size="small" v-if="article.category">{{ article.category }}</el-tag>
                      <span class="article-date">{{ formatDate(article.CreatedAt) }}</span>
                    </div>
                    <h3 class="article-title">
                      <router-link :to="{ name: 'NewsDetail', params: { id: article.ID } }">
                        {{ article.title }}
                      </router-link>
                    </h3>
                    <p class="article-preview">{{ article.preview }}</p>
                    <div class="article-stats">
                      <span><el-icon><View /></el-icon> {{ article.views || 0 }}</span>
                      <span><el-icon><Star /></el-icon> {{ article.likes || 0 }}</span>
                    </div>
                  </div>
                  <div class="article-actions">
                    <el-button size="small" @click="editArticle(article)">
                      <el-icon><Edit /></el-icon>
                      编辑
                    </el-button>
                    <el-button size="small" type="danger" @click="deleteArticle(article)">
                      <el-icon><Delete /></el-icon>
                      删除
                    </el-button>
                  </div>
                </article>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="收藏的文章" name="favorites">
            <div class="tab-content">
              <div class="section-header">
                <h2 class="section-title">收藏的文章</h2>
              </div>

              <div v-if="favoriteArticles.length === 0" class="empty-state">
                <el-icon class="empty-icon"><Star /></el-icon>
                <h3>还没有收藏的文章</h3>
                <p>收藏的文章将在这里显示</p>
                <router-link to="/articles" class="btn btn-primary">
                  浏览文章
                </router-link>
              </div>

              <div v-else class="articles-list">
                <div v-for="article in favoriteArticles" :key="article.ID" class="favorite-item">
                  <div class="favorite-info">
                    <h3 class="favorite-title">
                      <router-link :to="{ name: 'NewsDetail', params: { id: article.ID } }">
                        {{ article.title }}
                      </router-link>
                    </h3>
                    <div class="favorite-meta">
                      <span>{{ article.author?.username }}</span>
                      <span>{{ formatDate(article.CreatedAt) }}</span>
                    </div>
                  </div>
                  <el-button class="unfavorite-btn" @click="unfavorite(article)" title="取消收藏">
                    <el-icon><StarFilled /></el-icon>
                  </el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="账户设置" name="settings">
            <div class="tab-content">
              <div class="settings-section">
                <h2 class="section-title">账户设置</h2>

                <div class="settings-group">
                  <h3 class="group-title">个人信息</h3>
                  <el-form label-position="top" class="settings-form">
                    <el-form-item label="用户名">
                      <el-input v-model="settings.username" disabled />
                    </el-form-item>
                    <el-form-item label="邮箱">
                      <el-input v-model="settings.email" placeholder="绑定邮箱" />
                    </el-form-item>
                    <el-form-item label="个人简介">
                      <el-input v-model="settings.bio" type="textarea" :rows="3" placeholder="介绍一下自己" />
                    </el-form-item>
                    <el-form-item label="地区">
                      <el-input v-model="settings.location" placeholder="所在地区" />
                    </el-form-item>
                  </el-form>
                </div>

                <div class="settings-group">
                  <h3 class="group-title">通知偏好</h3>
                  <div class="setting-item">
                    <div class="setting-info">
                      <span class="setting-label">文章更新通知</span>
                      <span class="setting-desc">当您关注的文章有新动态时通知您</span>
                    </div>
                    <el-switch v-model="settings.notifyUpdates" />
                  </div>
                  <div class="setting-item">
                    <div class="setting-info">
                      <span class="setting-label">评论回复通知</span>
                      <span class="setting-desc">当有人回复您的评论时通知您</span>
                    </div>
                    <el-switch v-model="settings.notifyReplies" />
                  </div>
                  <div class="setting-item">
                    <div class="setting-info">
                      <span class="setting-label">每周精选</span>
                      <span class="setting-desc">每周为您推送优质金融文章</span>
                    </div>
                    <el-switch v-model="settings.notifyWeekly" />
                  </div>
                </div>

                <div class="settings-actions">
                  <el-button type="primary" @click="saveSettings" :loading="saving">
                    保存设置
                  </el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-dialog v-model="showEditDialog" title="编辑个人资料" width="500px" class="edit-dialog">
      <el-form :model="editForm" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled />
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input v-model="editForm.bio" type="textarea" :rows="3" placeholder="介绍一下自己" />
        </el-form-item>
        <el-form-item label="地区">
          <el-input v-model="editForm.location" placeholder="所在地区" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEditDialog = false">取消</el-button>
        <el-button type="primary" @click="saveProfile">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  Camera, Calendar, Location, Edit, Plus, Document, View, Star,
  StarFilled, Delete
} from '@element-plus/icons-vue';
import { useAuthStore } from '../store/auth';
import type { Article } from '../types/Article';

const router = useRouter();
const authStore = useAuthStore();
const activeTab = ref('articles');
const showEditDialog = ref(false);
const showAvatarDialog = ref(false);
const saving = ref(false);

const myArticles = ref<Article[]>([]);
const favoriteArticles = ref<Article[]>([]);

const userInfo = reactive({
  username: authStore.user?.username || '用户',
  avatar: authStore.user?.avatar || '',
  bio: authStore.user?.bio || '',
  joinDate: '2024年1月',
  location: '',
});

const editForm = reactive({
  username: userInfo.username,
  bio: userInfo.bio,
  location: '',
});

const settings = reactive({
  username: userInfo.username,
  email: '',
  bio: '',
  location: '',
  notifyUpdates: true,
  notifyReplies: true,
  notifyWeekly: false,
});

const loadMyArticles = async () => {
  // 从本地存储获取我的文章（因为后端没有专门的API）
  const stored = localStorage.getItem('my_articles');
  if (stored) {
    try {
      myArticles.value = JSON.parse(stored);
    } catch (e) {
      myArticles.value = [];
    }
  }
};

const loadFavorites = () => {
  const stored = localStorage.getItem('favorite_articles');
  if (stored) {
    try {
      favoriteArticles.value = JSON.parse(stored);
    } catch (e) {
      favoriteArticles.value = [];
    }
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const editArticle = (article: Article) => {
  router.push({ name: 'NewsDetail', params: { id: article.ID } });
};

const deleteArticle = async (article: Article) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除这篇文章吗？此操作不可撤销。',
      '删除文章',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    myArticles.value = myArticles.value.filter(a => a.ID !== article.ID);
    localStorage.setItem('my_articles', JSON.stringify(myArticles.value));
    ElMessage.success('文章已删除');
  } catch {
    // cancelled
  }
};

const unfavorite = (article: Article) => {
  favoriteArticles.value = favoriteArticles.value.filter(a => a.ID !== article.ID);
  localStorage.setItem('favorite_articles', JSON.stringify(favoriteArticles.value));
  ElMessage.success('已取消收藏');
};

const saveProfile = () => {
  Object.assign(userInfo, editForm);
  localStorage.setItem('user_profile', JSON.stringify(userInfo));
  showEditDialog.value = false;
  ElMessage.success('资料已更新');
};

const saveSettings = async () => {
  try {
    saving.value = true;
    localStorage.setItem('user_settings', JSON.stringify(settings));
    ElMessage.success('设置已保存');
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'Login' });
    return;
  }
  loadMyArticles();
  loadFavorites();

  const profile = localStorage.getItem('user_profile');
  if (profile) {
    try {
      const parsed = JSON.parse(profile);
      Object.assign(userInfo, parsed);
      Object.assign(editForm, parsed);
    } catch (e) {}
  }

  const userSettings = localStorage.getItem('user_settings');
  if (userSettings) {
    try {
      const parsed = JSON.parse(userSettings);
      Object.assign(settings, parsed);
    } catch (e) {}
  }
});
</script>

<style scoped>
.profile-container {
  min-height: calc(100vh - 64px);
  background: #faf8f5;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

.profile-header {
  position: relative;
  margin-bottom: 32px;
}

.profile-cover {
  height: 200px;
  background: linear-gradient(135deg, #c4a77d 0%, #8b7355 50%, #6b5744 100%);
  border-radius: 0 0 24px 24px;
  position: relative;
  overflow: hidden;
}

.profile-cover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.profile-info {
  display: flex;
  align-items: flex-end;
  gap: 24px;
  padding: 0 32px;
  margin-top: -50px;
  position: relative;
  z-index: 1;
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.profile-avatar {
  border: 4px solid #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #c4a77d, #8b7355);
  font-size: 36px;
  font-weight: 600;
  color: #fff;
}

.avatar-edit-btn {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b5744;
  transition: all 0.2s ease;
}

.avatar-edit-btn:hover {
  transform: scale(1.1);
}

.user-details {
  flex: 1;
  padding-bottom: 8px;
}

.username {
  margin: 0 0 8px;
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: 32px;
  font-weight: 700;
  color: #2d2a26;
}

.user-bio {
  margin: 0 0 12px;
  color: #6b5744;
  font-size: 15px;
}

.user-meta {
  display: flex;
  gap: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #8b7355;
  font-size: 14px;
}

.edit-profile-btn {
  margin-bottom: 8px;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  background: #fff;
  border: 2px solid #e8e4de;
  color: #6b5744;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.edit-profile-btn:hover {
  background: #f5f2ed;
  border-color: #c4a77d;
}

.profile-content {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(45, 42, 38, 0.08);
  overflow: hidden;
}

.profile-tabs :deep(.el-tabs__header) {
  margin: 0;
  padding: 0 24px;
  background: #faf8f5;
  border-bottom: 1px solid #e8e4de;
}

.profile-tabs :deep(.el-tabs__nav-wrap::after) {
  display: none;
}

.profile-tabs :deep(.el-tabs__item) {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  font-weight: 500;
  color: #8b7355;
}

.profile-tabs :deep(.el-tabs__item.is-active) {
  color: #c4a77d;
}

.profile-tabs :deep(.el-tabs__active-bar) {
  background: linear-gradient(90deg, #c4a77d, #a68b5b);
  height: 3px;
}

.tab-content {
  padding: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  margin: 0;
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: 24px;
  font-weight: 600;
  color: #2d2a26;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #c4a77d, #a68b5b);
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(166, 139, 91, 0.4);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #faf8f5;
  border-radius: 12px;
}

.empty-icon {
  font-size: 64px;
  color: #d4cfc4;
  margin-bottom: 16px;
}

.empty-state h3 {
  margin: 0 0 8px;
  font-size: 20px;
  color: #2d2a26;
}

.empty-state p {
  margin: 0 0 24px;
  color: #8b7355;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.article-card {
  background: #faf8f5;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(45, 42, 38, 0.12);
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.article-date {
  font-size: 13px;
  color: #8b7355;
}

.article-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.article-title a {
  color: #2d2a26;
  text-decoration: none;
}

.article-title a:hover {
  color: #c4a77d;
}

.article-preview {
  margin: 0 0 12px;
  color: #6b5744;
  font-size: 14px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-stats {
  display: flex;
  gap: 16px;
  color: #8b7355;
  font-size: 13px;
}

.article-stats span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.article-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e8e4de;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.favorite-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #faf8f5;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.favorite-item:hover {
  background: #f0ebe3;
}

.favorite-title {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 500;
}

.favorite-title a {
  color: #2d2a26;
  text-decoration: none;
}

.favorite-title a:hover {
  color: #c4a77d;
}

.favorite-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #8b7355;
}

.unfavorite-btn {
  padding: 8px;
  background: transparent;
  border: none;
  color: #c4a77d;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s ease;
}

.unfavorite-btn:hover {
  transform: scale(1.2);
  color: #a68b5b;
}

.settings-section {
  max-width: 600px;
}

.settings-group {
  margin-bottom: 32px;
}

.group-title {
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: 600;
  color: #2d2a26;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e4de;
}

.settings-form :deep(.el-input__wrapper),
.settings-form :deep(.el-textarea__inner) {
  border-radius: 8px;
  box-shadow: none;
  border: 2px solid #e8e4de;
}

.settings-form :deep(.el-input__wrapper:hover),
.settings-form :deep(.el-textarea__inner:hover),
.settings-form :deep(.el-input__wrapper.is-focus),
.settings-form :deep(.el-textarea__inner:focus) {
  border-color: #c4a77d;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e8e4de;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.setting-label {
  font-weight: 500;
  color: #2d2a26;
}

.setting-desc {
  font-size: 13px;
  color: #8b7355;
}

.settings-actions {
  padding-top: 24px;
}

.settings-actions .el-button {
  padding: 12px 32px;
  border-radius: 10px;
  font-weight: 600;
  background: linear-gradient(135deg, #c4a77d, #a68b5b);
  border: none;
}

@media (max-width: 768px) {
  .profile-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 16px;
    margin-top: -60px;
  }

  .user-meta {
    justify-content: center;
    flex-wrap: wrap;
  }

  .edit-profile-btn {
    margin-top: 16px;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
