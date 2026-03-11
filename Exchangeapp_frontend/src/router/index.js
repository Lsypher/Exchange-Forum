import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CurrencyExchangeView from '../views/CurrencyExchangeView.vue';
import NewsView from '../views/NewsView.vue';
import NewsDetailView from '../views/NewsDetailView.vue';
import CreateArticleView from '../views/CreateArticleView.vue';
import UserProfileView from '../views/UserProfileView.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/exchanges', name: 'CurrencyExchange', component: CurrencyExchangeView },
    { path: '/articles', name: 'News', component: NewsView },
    { path: '/articles/create', name: 'CreateArticle', component: CreateArticleView },
    { path: '/articles/:id', name: 'NewsDetail', component: NewsDetailView },
    { path: '/profile', name: 'UserProfile', component: UserProfileView },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
