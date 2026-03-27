<template>
  <div class="article-detail-container">
    <div class="container">
      <div class="article-content">
        <article v-if="article" class="article">
          <header class="article-header">
            <div class="article-meta">
              <span class="article-date">{{ formatDate(article.CreatedAt || '') }}</span>
              <el-tag v-if="article.category" size="small" class="article-category">
                {{ article.category }}
              </el-tag>
            </div>
            <h1 class="article-title">{{ article.title }}</h1>
            <div class="article-author-info">
              <el-avatar :size="32" :src="article.author?.avatar" class="author-avatar">
                {{ article.author?.username?.charAt(0) }}
              </el-avatar>
              <div class="author-details">
                <span class="author-name">{{ article.author?.username || '匿名用户' }}</span>
                <span class="author-bio">{{ article.author?.bio || '金融分析师' }}</span>
              </div>
            </div>
          </header>

          <div class="article-body">
            <div class="article-content markdown-body" v-html="formattedContent"></div>
          </div>

          <footer class="article-footer">
            <div class="article-stats">
              <div class="stat-item">
                <el-icon size="16"><View /></el-icon>
                <span>{{ article.views || 0 }} 阅读</span>
              </div>
              <div class="stat-item">
                <el-button
                  type="primary"
                  @click="likeArticle"
                  :loading="liking"
                  class="like-btn"
                >
                  <el-icon size="16"><StarFilled /></el-icon>
                  <span>点赞 ({{ likes }})</span>
                </el-button>
              </div>
              <div class="stat-item">
                <el-button
                  @click="toggleFavorite"
                  :class="{ 'is-favorited': isFavorited }"
                  class="favorite-btn"
                >
                  <el-icon size="16"><Collection /></el-icon>
                  <span>{{ isFavorited ? '已收藏' : '收藏' }}</span>
                </el-button>
              </div>
            </div>

            <div class="article-tags" v-if="article.tags">
              <el-tag
                v-for="tag in article.tags.split(',')"
                :key="tag"
                size="small"
                class="tag-item"
              >
                {{ tag.trim() }}
              </el-tag>
            </div>
          </footer>
        </article>

        <div v-else-if="!authStore.isAuthenticated" class="auth-prompt">
          <div class="blankslate">
            <el-icon size="48" class="text-muted"><Lock /></el-icon>
            <h3>需要登录</h3>
            <p>登录后可以阅读完整的文章内容</p>
            <router-link to="/login" class="btn btn-primary">立即登录</router-link>
          </div>
        </div>

        <div v-else class="loading-section">
          <el-skeleton :rows="10" animated />
        </div>

        <section v-if="authStore.isAuthenticated" class="comments-section">
          <h2 class="comments-title">
            <el-icon><ChatDotRound /></el-icon>
            评论 ({{ comments.length }})
          </h2>

          <div class="comment-form">
            <el-avatar :size="40" class="comment-avatar">
              {{ authStore.user?.username?.charAt(0) }}
            </el-avatar>
            <div class="comment-input-wrapper">
              <el-input
                v-model="newComment"
                type="textarea"
                :rows="3"
                placeholder="写下你的评论..."
                class="comment-textarea"
              />
              <el-button
                type="primary"
                @click="submitComment"
                :loading="submitting"
                class="submit-comment-btn"
              >
               发表评论
              </el-button>
            </div>
          </div>

          <div v-if="comments.length === 0" class="no-comments">
            <el-icon><ChatLineSquare /></el-icon>
            <p>暂无评论，快来发表第一条评论吧</p>
          </div>

          <div v-else class="comments-list">
            <div v-for="comment in comments" :key="comment.id" class="comment-item">
              <el-avatar :size="40" :src="comment.author?.avatar" class="comment-avatar">
                {{ comment.author?.username?.charAt(0) }}
              </el-avatar>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">{{ comment.author?.username || '匿名用户' }}</span>
                  <span class="comment-date">{{ formatCommentDate(comment.CreatedAt) }}</span>
                </div>
                <p class="comment-text">{{ comment.content }}</p>
                <div class="comment-actions">
                  <button class="action-btn" @click="replyToComment(comment)">
                    <el-icon><ChatLineSquare /></el-icon>
                    回复
                  </button>
                  <button class="action-btn" @click="deleteComment(comment)">
                    <el-icon><Delete /></el-icon>
                    删除
                  </button>
                </div>

                <div v-if="comment.replies && comment.replies.length > 0" class="replies-list">
                  <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
                    <el-avatar :size="32" :src="reply.author?.avatar" class="reply-avatar">
                      {{ reply.author?.username?.charAt(0) }}
                    </el-avatar>
                    <div class="reply-content">
                      <div class="reply-header">
                        <span class="reply-author">{{ reply.author?.username }}</span>
                        <span class="reply-date">{{ formatCommentDate(reply.CreatedAt) }}</span>
                      </div>
                      <p class="reply-text">{{ reply.content }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside class="article-sidebar">
        <div class="sidebar-section search-section">
          <h3 class="sidebar-title">搜索文章</h3>
          <el-input
            v-model="searchQuery"
            placeholder="搜索标题或内容..."
            :prefix-icon="Search"
            clearable
            class="search-input"
          />
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">相关文章</h3>
          <div class="related-articles">
            <div v-for="i in 3" :key="i" class="related-article">
              <h4 class="related-title">相关文章标题 {{ i }}</h4>
              <span class="related-date">2024-01-{{ 10 + i }}</span>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">热门标签</h3>
          <div class="tag-cloud">
            <el-tag
              v-for="tag in ['汇率', '投资', '分析', '市场', '货币']"
              :key="tag"
              size="small"
              class="cloud-tag"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "../axios";
import { useAuthStore } from "../store/auth";
import type { Article, Like, Comment } from "../types/Article";
import { Lock, View, StarFilled, Collection, ChatDotRound, ChatLineSquare, Delete, Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const article = ref<Article | null>(null);
const route = useRoute();
const authStore = useAuthStore();
const likes = ref<number>(0);
const liking = ref(false);
const isFavorited = ref(false);
const searchQuery = ref('');

const comments = ref<Comment[]>([]);
const newComment = ref('');
const submitting = ref(false);
const replyingTo = ref<number | null>(null);
const replyContent = ref('');

const { id } = route.params;

const formattedContent = computed(() => {
  if (!article.value?.content) return '';
  return article.value.content
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
});

const fetchArticle = async () => {
  try {
    const response = await axios.get<Article>(`/articles/${id}`);
    article.value = response.data;
    checkFavorite();
  } catch (error) {
    console.error("Failed to load article:", error);
    ElMessage.error('获取文章失败');
  }
};

const likeArticle = async () => {
  try {
    liking.value = true;
    const res = await axios.post<Like>(`/articles/${id}/like`);
    likes.value = res.data.likes;
    ElMessage.success('点赞成功');
  } catch (error) {
    ElMessage.error('点赞失败，请重试');
    console.log('Error Liking article:', error);
  } finally {
    liking.value = false;
  }
};

const fetchLike = async () => {
  try {
    const res = await axios.get<Like>(`/articles/${id}/like`);
    likes.value = res.data.likes;
  } catch (error) {
    console.log('Error fetching likes:', error);
  }
};

const checkFavorite = () => {
  const stored = localStorage.getItem('favorite_articles');
  if (stored) {
    try {
      const favorites: Article[] = JSON.parse(stored);
      isFavorited.value = favorites.some(a => a.ID === article.value?.ID);
    } catch {
      isFavorited.value = false;
    }
  }
};

const toggleFavorite = () => {
  const stored = localStorage.getItem('favorite_articles');
  let favorites: Article[] = [];
  if (stored) {
    try {
      favorites = JSON.parse(stored);
    } catch {
      favorites = [];
    }
  }

  if (isFavorited.value) {
    favorites = favorites.filter(a => a.ID !== article.value?.ID);
    ElMessage.success('已取消收藏');
  } else {
    if (article.value) {
      favorites.push(article.value);
      ElMessage.success('已添加到收藏');
    }
  }

  localStorage.setItem('favorite_articles', JSON.stringify(favorites));
  isFavorited.value = !isFavorited.value;
};

const loadComments = () => {
  const key = `comments_${id}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      comments.value = JSON.parse(stored);
    } catch {
      comments.value = [];
    }
  }
};

const saveComments = () => {
  const key = `comments_${id}`;
  localStorage.setItem(key, JSON.stringify(comments.value));
};

const submitComment = async () => {
  if (!newComment.value.trim()) {
    ElMessage.warning('请输入评论内容');
    return;
  }

  try {
    submitting.value = true;
    const comment: Comment = {
      id: Date.now(),
      articleId: Number(id),
      author: {
        username: authStore.user?.username || '用户',
        avatar: authStore.user?.avatar
      },
      content: newComment.value.trim(),
      CreatedAt: new Date().toISOString(),
      replies: []
    };
    comments.value.unshift(comment);
    saveComments();
    newComment.value = '';
    ElMessage.success('评论成功');
  } finally {
    submitting.value = false;
  }
};

const replyToComment = (comment: Comment) => {
  replyingTo.value = comment.id;
  replyContent.value = '';
};

const submitReply = (comment: Comment) => {
  if (!replyContent.value.trim()) {
    ElMessage.warning('请输入回复内容');
    return;
  }

  if (!comment.replies) {
    comment.replies = [];
  }

  comment.replies.push({
    id: Date.now(),
    articleId: Number(id),
    author: {
      username: authStore.user?.username || '用户',
      avatar: authStore.user?.avatar
    },
    content: replyContent.value.trim(),
    CreatedAt: new Date().toISOString()
  });

  saveComments();
  replyingTo.value = null;
  replyContent.value = '';
  ElMessage.success('回复成功');
};

const cancelReply = () => {
  replyingTo.value = null;
  replyContent.value = '';
};

const deleteComment = async (comment: Comment) => {
  try {
    await ElMessageBox.confirm('确定要删除这条评论吗？', '删除评论', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    comments.value = comments.value.filter(c => c.id !== comment.id);
    saveComments();
    ElMessage.success('评论已删除');
  } catch {}
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatCommentDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return '今天';
  } else if (days === 1) {
    return '昨天';
  } else if (days < 7) {
    return `${days}天前`;
  } else {
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  }
};

onMounted(() => {
  if (authStore.isAuthenticated) {
    fetchArticle();
    fetchLike();
    loadComments();
  } else {
    fetchArticle();
  }
});
</script>

<style scoped>
.article-detail-container {
  min-height: calc(100vh - 64px);
  background-color: #faf8f5;
  padding: 48px 0;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  align-items: start;
}

.article-content {
  min-width: 0;
}

.article {
  background-color: #ffffff;
  border: 1px solid #e8e4de;
  border-radius: var(--border-radius-large);
  overflow: hidden;
}

.article-header {
  padding: 32px;
  background-color: #faf8f5;
  border-bottom: 1px solid #e8e4de;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
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
  margin: 0 0 20px;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.25;
  color: #2d2a26;
}

.article-author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  border: 1px solid #e8e4de;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  font-size: 14px;
  font-weight: 500;
  color: #2d2a26;
}

.author-bio {
  font-size: 12px;
  color: #8b7355;
}

.article-body {
  padding: 32px;
}

.article-content {
  font-size: 16px;
  line-height: 1.75;
  color: #2d2a26;
}

.article-content p {
  margin-bottom: 16px;
}

.article-footer {
  padding: 24px 32px;
  background-color: #faf8f5;
  border-top: 1px solid #e8e4de;
}

.article-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #8b7355;
}

.like-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  font-size: 12px;
  font-weight: 500;
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

.article-sidebar {
  position: sticky;
  top: 24px;
}

.sidebar-section {
  background-color: #ffffff;
  border: 1px solid #e8e4de;
  border-radius: var(--border-radius-large);
  padding: 20px;
  margin-bottom: 24px;
}

.sidebar-title {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
  color: #2d2a26;
}

.related-articles {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.related-article {
  padding: 12px 0;
  border-bottom: 1px solid #e8e4de;
}

.related-article:last-child {
  border-bottom: none;
}

.related-title {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 500;
  color: #c4a77d;
  cursor: pointer;
}

.related-title:hover {
  text-decoration: underline;
}

.related-date {
  font-size: 12px;
  color: #8b7355;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cloud-tag {
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.cloud-tag:hover {
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
  }

  .article-sidebar {
    position: static;
    order: -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .article-sidebar {
    grid-template-columns: 1fr;
  }

  .article-header,
  .article-body,
  .article-footer {
    padding: 24px;
  }

  .article-title {
    font-size: 24px;
  }
}

/* Comments Section */
.comments-section {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #e8e4de;
}

.comments-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 24px;
  font-size: 22px;
  font-weight: 600;
  color: #2d2a26;
}

.comment-form {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.comment-avatar {
  flex-shrink: 0;
  background: linear-gradient(135deg, #e8e4de, #c4a77d);
  font-weight: 600;
  color: #fff;
}

.comment-input-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment-textarea :deep(.el-textarea__inner) {
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 15px;
  line-height: 1.6;
}

.submit-comment-btn {
  align-self: flex-end;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
}

.no-comments {
  text-align: center;
  padding: 40px 20px;
  color: #8b7355;
}

.no-comments .el-icon {
  font-size: 48px;
  margin-bottom: 12px;
  color: #e8e4de;
}

.no-comments p {
  margin: 0;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.comment-item {
  display: flex;
  gap: 12px;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.comment-author {
  font-weight: 600;
  color: #2d2a26;
}

.comment-date {
  font-size: 13px;
  color: #8b7355;
}

.comment-text {
  margin: 0 0 12px;
  line-height: 1.6;
  color: #2d2a26;
}

.comment-actions {
  display: flex;
  gap: 16px;
}

.comment-actions .action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  background: none;
  border: none;
  color: #8b7355;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s;
}

.comment-actions .action-btn:hover {
  color: #c4a77d;
}

.replies-list {
  margin-top: 16px;
  padding-left: 20px;
  border-left: 2px solid #e8e4de;
}

.reply-item {
  display: flex;
  gap: 10px;
  padding: 12px 0;
}

.reply-item:not(:last-child) {
  border-bottom: 1px solid #e8e4de;
}

.reply-avatar {
  flex-shrink: 0;
  background: #faf8f5;
}

.reply-content {
  flex: 1;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.reply-author {
  font-weight: 500;
  font-size: 14px;
  color: #2d2a26;
}

.reply-date {
  font-size: 12px;
  color: #8b7355;
}

.reply-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #2d2a26;
}

/* Sidebar Search */
.search-section {
  position: sticky;
  top: 24px;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #e8e4de;
}

.search-input :deep(.el-input__wrapper:hover),
.search-input :deep(.el-input__wrapper.is-focus) {
  border-color: #c4a77d;
}

/* Favorite Button */
.favorite-btn.is-favorited {
  color: #b88a4d;
  border-color: #b88a4d;
}

.loading-section {
  padding: 40px;
}
</style>
