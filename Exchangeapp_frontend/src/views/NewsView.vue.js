/* __placeholder__ */
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from '../axios';
import { useAuthStore } from '../store/auth';
import { Lock, Document, View, Search } from '@element-plus/icons-vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const articles = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const router = useRouter();
const authStore = useAuthStore();
const filteredArticles = computed(() => {
    if (!searchQuery.value.trim()) {
        return articles.value;
    }
    const query = searchQuery.value.toLowerCase().trim();
    return articles.value.filter(article => article.title.toLowerCase().includes(query) ||
        article.preview.toLowerCase().includes(query) ||
        (article.category && article.category.toLowerCase().includes(query)) ||
        (article.tags && article.tags.toLowerCase().includes(query)));
});
const fetchArticles = async () => {
    if (!authStore.isAuthenticated)
        return;
    try {
        loading.value = true;
        const response = await axios.get('/articles');
        articles.value = response.data;
    }
    catch (error) {
        ElMessage.error('获取文章列表失败');
        console.error('Failed to load articles:', error);
    }
    finally {
        loading.value = false;
    }
};
const viewDetail = (id) => {
    router.push({ name: 'NewsDetail', params: { id: String(id) } });
};
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
onMounted(fetchArticles);
const __VLS_fnComponent = (await import('vue')).defineComponent({});
let __VLS_functionalComponentProps;
let __VLS_modelEmitsType;
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("news-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("page-header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("page-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("page-description") }, });
    if (!__VLS_ctx.authStore.isAuthenticated) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("auth-prompt") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("blankslate") }, });
        const __VLS_0 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ size: ("48"), ...{ class: ("text-muted") }, }));
        const __VLS_2 = __VLS_1({ size: ("48"), ...{ class: ("text-muted") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ size: ("48"), ...{ class: ("text-muted") }, }));
        const __VLS_6 = {}.Lock;
        ({}.Lock);
        __VLS_components.Lock;
        // @ts-ignore
        [Lock,];
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
        const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
        ({}({}));
        // @ts-ignore
        [authStore,];
        const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
        (__VLS_5.slots).default;
        const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        const __VLS_12 = {}.RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ to: ("/login"), ...{ class: ("btn btn-primary") }, }));
        const __VLS_14 = __VLS_13({ to: ("/login"), ...{ class: ("btn btn-primary") }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        ({}({ to: ("/login"), ...{ class: ("btn btn-primary") }, }));
        (__VLS_17.slots).default;
        const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    }
    else if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-section") }, });
        const __VLS_18 = {}.ElSkeleton;
        ({}.ElSkeleton);
        __VLS_components.ElSkeleton;
        __VLS_components.elSkeleton;
        // @ts-ignore
        [ElSkeleton,];
        const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ rows: ((3)), animated: (true), }));
        const __VLS_20 = __VLS_19({ rows: ((3)), animated: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        ({}({ rows: ((3)), animated: (true), }));
        // @ts-ignore
        [loading,];
        const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
    }
    else if (__VLS_ctx.filteredArticles.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("empty-section") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("blankslate") }, });
        const __VLS_24 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ size: ("48"), ...{ class: ("text-muted") }, }));
        const __VLS_26 = __VLS_25({ size: ("48"), ...{ class: ("text-muted") }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        ({}({ size: ("48"), ...{ class: ("text-muted") }, }));
        const __VLS_30 = {}.Document;
        ({}.Document);
        __VLS_components.Document;
        // @ts-ignore
        [Document,];
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
        const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
        ({}({}));
        // @ts-ignore
        [filteredArticles,];
        const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
        (__VLS_29.slots).default;
        const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (__VLS_ctx.searchQuery ? '没有找到匹配的文章' : '暂无文章');
        // @ts-ignore
        [searchQuery,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.searchQuery ? '试试其他关键词' : '目前还没有发布任何文章，请稍后再来查看');
        // @ts-ignore
        [searchQuery,];
        if (__VLS_ctx.searchQuery) {
            const __VLS_36 = {}.ElButton;
            ({}.ElButton);
            ({}.ElButton);
            __VLS_components.ElButton;
            __VLS_components.elButton;
            __VLS_components.ElButton;
            __VLS_components.elButton;
            // @ts-ignore
            [ElButton, ElButton,];
            const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ ...{ 'onClick': {} }, type: ("primary"), }));
            const __VLS_38 = __VLS_37({ ...{ 'onClick': {} }, type: ("primary"), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
            ({}({ ...{ 'onClick': {} }, type: ("primary"), }));
            let __VLS_42;
            const __VLS_43 = {
                onClick: (...[$event]) => {
                    if (!(!((!__VLS_ctx.authStore.isAuthenticated))))
                        return;
                    if (!(!((__VLS_ctx.loading))))
                        return;
                    if (!((__VLS_ctx.filteredArticles.length === 0)))
                        return;
                    if (!((__VLS_ctx.searchQuery)))
                        return;
                    __VLS_ctx.searchQuery = '';
                    // @ts-ignore
                    [searchQuery, searchQuery,];
                }
            };
            (__VLS_41.slots).default;
            const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
            let __VLS_39;
            let __VLS_40;
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("articles-section") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("articles-header") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("section-title") }, });
        (__VLS_ctx.searchQuery ? '搜索结果' : '最新文章');
        // @ts-ignore
        [searchQuery,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("header-actions") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("search-box") }, });
        const __VLS_44 = {}.ElInput;
        ({}.ElInput);
        __VLS_components.ElInput;
        __VLS_components.elInput;
        // @ts-ignore
        [ElInput,];
        const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({ modelValue: ((__VLS_ctx.searchQuery)), placeholder: ("搜索文章..."), prefixIcon: ((__VLS_ctx.Search)), clearable: (true), ...{ class: ("search-input") }, }));
        const __VLS_46 = __VLS_45({ modelValue: ((__VLS_ctx.searchQuery)), placeholder: ("搜索文章..."), prefixIcon: ((__VLS_ctx.Search)), clearable: (true), ...{ class: ("search-input") }, }, ...__VLS_functionalComponentArgsRest(__VLS_45));
        ({}({ modelValue: ((__VLS_ctx.searchQuery)), placeholder: ("搜索文章..."), prefixIcon: ((__VLS_ctx.Search)), clearable: (true), ...{ class: ("search-input") }, }));
        // @ts-ignore
        [searchQuery, Search,];
        const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_44, __VLS_46);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("articles-stats") }, });
        (__VLS_ctx.filteredArticles.length);
        // @ts-ignore
        [filteredArticles,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("articles-list") }, });
        for (const [article] of __VLS_getVForSourceType((__VLS_ctx.filteredArticles))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({ key: ((article.ID)), ...{ class: ("article-card") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-header") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-meta") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("article-date") }, });
            (__VLS_ctx.formatDate(article.CreatedAt || ''));
            // @ts-ignore
            [filteredArticles, formatDate,];
            if (article.category) {
                const __VLS_50 = {}.ElTag;
                ({}.ElTag);
                ({}.ElTag);
                __VLS_components.ElTag;
                __VLS_components.elTag;
                __VLS_components.ElTag;
                __VLS_components.elTag;
                // @ts-ignore
                [ElTag, ElTag,];
                const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({ size: ("small"), ...{ class: ("article-category") }, }));
                const __VLS_52 = __VLS_51({ size: ("small"), ...{ class: ("article-category") }, }, ...__VLS_functionalComponentArgsRest(__VLS_51));
                ({}({ size: ("small"), ...{ class: ("article-category") }, }));
                (article.category);
                (__VLS_55.slots).default;
                const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("article-title") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ ...{ onClick: (...[$event]) => {
                        if (!(!((!__VLS_ctx.authStore.isAuthenticated))))
                            return;
                        if (!(!((__VLS_ctx.loading))))
                            return;
                        if (!(!((__VLS_ctx.filteredArticles.length === 0))))
                            return;
                        __VLS_ctx.viewDetail(article.ID);
                        // @ts-ignore
                        [viewDetail,];
                    } }, ...{ class: ("article-link") }, });
            (article.title);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("article-preview") }, });
            (article.preview);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-footer") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-author") }, });
            const __VLS_56 = {}.ElAvatar;
            ({}.ElAvatar);
            ({}.ElAvatar);
            __VLS_components.ElAvatar;
            __VLS_components.elAvatar;
            __VLS_components.ElAvatar;
            __VLS_components.elAvatar;
            // @ts-ignore
            [ElAvatar, ElAvatar,];
            const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({ size: ((20)), src: ((article.author?.avatar)), ...{ class: ("author-avatar") }, }));
            const __VLS_58 = __VLS_57({ size: ((20)), src: ((article.author?.avatar)), ...{ class: ("author-avatar") }, }, ...__VLS_functionalComponentArgsRest(__VLS_57));
            ({}({ size: ((20)), src: ((article.author?.avatar)), ...{ class: ("author-avatar") }, }));
            (article.author?.username?.charAt(0));
            (__VLS_61.slots).default;
            const __VLS_61 = __VLS_pickFunctionalComponentCtx(__VLS_56, __VLS_58);
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("author-name") }, });
            (article.author?.username || '匿名用户');
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-actions") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!(!((!__VLS_ctx.authStore.isAuthenticated))))
                            return;
                        if (!(!((__VLS_ctx.loading))))
                            return;
                        if (!(!((__VLS_ctx.filteredArticles.length === 0))))
                            return;
                        __VLS_ctx.viewDetail(article.ID);
                        // @ts-ignore
                        [viewDetail,];
                    } }, ...{ class: ("action-btn") }, });
            const __VLS_62 = {}.ElIcon;
            ({}.ElIcon);
            ({}.ElIcon);
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            // @ts-ignore
            [ElIcon, ElIcon,];
            const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({ size: ("16"), }));
            const __VLS_64 = __VLS_63({ size: ("16"), }, ...__VLS_functionalComponentArgsRest(__VLS_63));
            ({}({ size: ("16"), }));
            const __VLS_68 = {}.View;
            ({}.View);
            __VLS_components.View;
            // @ts-ignore
            [View,];
            const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({}));
            const __VLS_70 = __VLS_69({}, ...__VLS_functionalComponentArgsRest(__VLS_69));
            ({}({}));
            const __VLS_73 = __VLS_pickFunctionalComponentCtx(__VLS_68, __VLS_70);
            (__VLS_67.slots).default;
            const __VLS_67 = __VLS_pickFunctionalComponentCtx(__VLS_62, __VLS_64);
        }
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['news-container'];
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['page-header'];
        __VLS_styleScopedClasses['page-title'];
        __VLS_styleScopedClasses['page-description'];
        __VLS_styleScopedClasses['auth-prompt'];
        __VLS_styleScopedClasses['blankslate'];
        __VLS_styleScopedClasses['text-muted'];
        __VLS_styleScopedClasses['btn'];
        __VLS_styleScopedClasses['btn-primary'];
        __VLS_styleScopedClasses['loading-section'];
        __VLS_styleScopedClasses['empty-section'];
        __VLS_styleScopedClasses['blankslate'];
        __VLS_styleScopedClasses['text-muted'];
        __VLS_styleScopedClasses['articles-section'];
        __VLS_styleScopedClasses['articles-header'];
        __VLS_styleScopedClasses['section-title'];
        __VLS_styleScopedClasses['header-actions'];
        __VLS_styleScopedClasses['search-box'];
        __VLS_styleScopedClasses['search-input'];
        __VLS_styleScopedClasses['articles-stats'];
        __VLS_styleScopedClasses['articles-list'];
        __VLS_styleScopedClasses['article-card'];
        __VLS_styleScopedClasses['article-header'];
        __VLS_styleScopedClasses['article-meta'];
        __VLS_styleScopedClasses['article-date'];
        __VLS_styleScopedClasses['article-category'];
        __VLS_styleScopedClasses['article-title'];
        __VLS_styleScopedClasses['article-link'];
        __VLS_styleScopedClasses['article-preview'];
        __VLS_styleScopedClasses['article-footer'];
        __VLS_styleScopedClasses['article-author'];
        __VLS_styleScopedClasses['author-avatar'];
        __VLS_styleScopedClasses['author-name'];
        __VLS_styleScopedClasses['article-actions'];
        __VLS_styleScopedClasses['action-btn'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {
                Lock: Lock,
                Document: Document,
                View: View,
                Search: Search,
                loading: loading,
                searchQuery: searchQuery,
                authStore: authStore,
                filteredArticles: filteredArticles,
                viewDetail: viewDetail,
                formatDate: formatDate,
            };
        },
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
