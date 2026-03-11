<template>
  <el-container>
    <el-header>
      <div class="header-container">
        <div class="header-left">
          <div class="logo">
            <span class="logo-text">Exchange Forum</span>
          </div>
          <nav class="header-nav">
            <router-link to="/" class="header-nav-link" :class="{ active: $route.name === 'Home' }">
              首页
            </router-link>
            <router-link to="/exchanges" class="header-nav-link" :class="{ active: $route.name === 'CurrencyExchange' }">
              汇率兑换
            </router-link>
            <router-link to="/articles" class="header-nav-link" :class="{ active: $route.name === 'News' }">
              新闻资讯
            </router-link>
          </nav>
        </div>
        <div class="header-right">
          <div class="header-nav" v-if="!authStore.isAuthenticated">
            <router-link to="/login" class="header-nav-link">登录</router-link>
            <router-link to="/register" class="btn btn-secondary header-btn">注册</router-link>
          </div>
          <div class="user-menu" v-else>
            <router-link to="/articles/create" class="create-article-btn">
              <el-icon><Edit /></el-icon>
              <span>创作</span>
            </router-link>
            <el-dropdown @command="handleUserMenu">
              <div class="user-avatar">
                <el-avatar :size="32" :src="authStore.user?.avatar || defaultAvatar">
                  {{ authStore.user?.username?.charAt(0).toUpperCase() }}
                </el-avatar>
                <span class="username">{{ authStore.user?.username }}</span>
                <el-icon class="dropdown-icon"><arrow-down /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="create">创作文章</el-dropdown-item>
                  <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                  <el-dropdown-item command="settings">账户设置</el-dropdown-item>
                  <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from './store/auth';
import { ArrowDown, Edit } from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const activeIndex = ref(route.name?.toString() || 'home');

const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNFOEU4RTgiLz4KPHBhdGggZD0iTTE2IDE2QzE4LjIwOTEgMTYgMjAgMTQuMjA5MSAyMCAxMkMyMCAxMC44OTU0IDE5LjY0MTEgOS44NTY5MSAxOSAzQzE4LjM1ODkgMy4wMTc2MiAxNy43MzQ5IDMuMTc1MTkgMTcuMTkgMy40NkMxNi42NDUgMy43NDQ4MSAxNi4xNzU5IDQuMTQ5MjYgMTUuODIgNC42NEwxNSA2TDE0LjE4IDQuNjRDMTMuODI0MSA0LjE0OTI2IDEzLjM1NTIgMy43NDQ4MSAxMi44MSAzLjQ2QzEyLjI2NTIgMy4xNzUxOSAxMS42NDExIDMuMDE3NjIgMTEgM0MxMC4zNTg5IDMuMDE3NjIgOS43MzQ5MSAzLjE3NTE5IDkuMTkgMy40NkM4LjY0NTI1IDMuNzQ0ODEgOC4xNzU5MSA0LjE0OTI2IDcuODIgNC42NEw3IDZMNi4xOCA0LjY0QzUuODI0MDkgNC4xNDkyNiA1LjM1NTEyIDMuNzQ0ODEgNC44MSAzLjQ2QzQuMjY1MTIgMy4xNzUxOSAzLjY0MTEyIDMuMDE3NjIgMyAzQzMuMzU4OTEgMy4wMTc2MiAzLjk4MjgxIDMuMTc1MTkgNC41MyAzLjQ2QzUuMDc3ODEgMy43NDQ4MSA1LjU0NjI1IDQuMTQ5MjYgNS45IDQuNjRMNyA2TDcuOSA0LjY0QzguMjU1OTEgNC4xNDkyNiA4LjcyMzQ0IDMuNzQ0ODEgOS4yNyAzLjQ2QzkuODE2NTYgMy4xNzUxOSAxMC40MzkxIDMuMDE3NjIgMTEgM0MxMS42MDkxIDMuMDE3NjIgMTIuMjM0OSAzLjE3NTE5IDEyLjc4IDMuNDZDMTMuMzI0MSAzLjc0NDgxIDEzLjc5MjUgNC4xNDkyNiAxNC4xOCA0LjY0TDEzIDZMMTMuODIgNC42NEMxNC4xNzU5IDQuMTQ5MjYgMTQuNjQ1MyAzLjc0NDgxIDE1LjE5IDMuNDZDMTUuNzM0OSAzLjE3NTE5IDE2LjM1ODkgMy4wMTc2MiAxNyAzQzE3LjY0MTEgMy4wMTc2MiAxOC4yNjU5IDMuMTc1MTkgMTguODEgMy40NkMxOS4zNTQ5IDMuNzQ0ODEgMTkuODI0MSA0LjE0OTI2IDIwLjE4IDQuNjRMMjEgNkwyMC4xOCA0LjY0QzE5LjgyNDEgNC4xNDkyNiAxOS4zNTUzIDMuNzQ0ODEgMTguODEgMy40NkMxOC4yNjU5IDMuMTc1MTkgMTcuNjQxMSAzLjAxNzYyIDE3IDNDMTYuMzU4OSAzLjAxNzYyIDE1LjczNDkgMy4xNzUxOSAxNS4xOSAzLjQ2QzE0LjY0NTMgMy43NDQ4MSAxNC4xNzU5IDQuMTQ5MjYgMTMuODIgNC42NEwxNSA2TDE0LjE4IDQuNjRDMTMuODI0MSA0LjE0OTI2IDEzLjM1NTIgMy43NDQ4MSAxMi44MSAzLjQ2QzEyLjI2NTIgMy4xNzUxOSAxMS42NDExIDMuMDE3NjIgMTEgM0MxMC4zNTg5IDMuMDE3NjIgOS43MzQ5MSAzLjE3NTE5IDkuMTkgMy40NkM4LjY0NTI1IDMuNzQ0ODEgOC4xNzU5MSA0LjE0OTI2IDcuODIgNC42NEw3IDZMNi4xOCA0LjY0QzUuODI0MDkgNC4xNDkyNiA1LjM1NTEyIDMuNzQ0ODEgNC44MSAzLjQ2QzQuMjY1MTIgMy4xNzUxOSAzLjY0MTEyIDMuMDE3NjIgMyAzWiIgZmlsbD0iIzk5OTk5Ii8+Cjwvc3ZnPgo=';

watch(route, (newRoute) => {
  activeIndex.value = newRoute.name?.toString() || 'home';
});

const handleSelect = (key: string) => {
  if ( key === 'logout') {
    authStore.logout();
    router.push({ name: 'Home' });
  } else {
    router.push({ name:  key.charAt(0).toUpperCase() +  key.slice(1) });
  }
};

const handleUserMenu = (command: string) => {
  if (command === 'logout') {
    authStore.logout();
    router.push({ name: 'Home' });
  } else if (command === 'profile') {
    router.push({ name: 'UserProfile' });
  } else if (command === 'settings') {
    router.push({ name: 'UserProfile', query: { tab: 'settings' } });
  } else if (command === 'create') {
    router.push({ name: 'CreateArticle' });
  }
};
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
  height: 100%;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 16px;
}

.logo-text {
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-nav-link {
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 6px;
  transition: background-color 0.12s ease-out;
}

.header-nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}

.header-nav-link.active {
  background-color: rgba(255, 255, 255, 0.15);
}

.header-btn {
  margin-left: 8px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.create-article-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.create-article-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-avatar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.12s ease-out;
}

.user-avatar:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.username {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
}

.dropdown-icon {
  color: #ffffff;
  font-size: 12px;
}

:deep(.el-dropdown-menu) {
  margin-top: 8px !important;
}

@media (max-width: 768px) {
  .header-nav-link {
    padding: 8px;
  }

  .logo-text {
    display: none;
  }

  .username {
    display: none;
  }
}
</style>