import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "../axios";
import { useAuthStore } from "../store/auth";
import { Lock, View, StarFilled, Collection, ChatDotRound, ChatLineSquare, Delete, Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const article = ref(null);
const route = useRoute();
const authStore = useAuthStore();
const likes = ref(0);
const liking = ref(false);
const isFavorited = ref(false);
const searchQuery = ref('');
const comments = ref([]);
const newComment = ref('');
const submitting = ref(false);
const replyingTo = ref(null);
const replyContent = ref('');
const { id } = route.params;
const formattedContent = computed(() => {
    if (!article.value?.content)
        return '';
    return article.value.content
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>');
});
const fetchArticle = async () => {
    try {
        const response = await axios.get(`/articles/${id}`);
        article.value = response.data;
        checkFavorite();
    }
    catch (error) {
        console.error("Failed to load article:", error);
        ElMessage.error('获取文章失败');
    }
};
const likeArticle = async () => {
    try {
        liking.value = true;
        const res = await axios.post(`/articles/${id}/like`);
        likes.value = res.data.likes;
        ElMessage.success('点赞成功');
    }
    catch (error) {
        ElMessage.error('点赞失败，请重试');
        console.log('Error Liking article:', error);
    }
    finally {
        liking.value = false;
    }
};
const fetchLike = async () => {
    try {
        const res = await axios.get(`/articles/${id}/like`);
        likes.value = res.data.likes;
    }
    catch (error) {
        console.log('Error fetching likes:', error);
    }
};
const checkFavorite = () => {
    const stored = localStorage.getItem('favorite_articles');
    if (stored) {
        try {
            const favorites = JSON.parse(stored);
            isFavorited.value = favorites.some(a => a.ID === article.value?.ID);
        }
        catch {
            isFavorited.value = false;
        }
    }
};
const toggleFavorite = () => {
    const stored = localStorage.getItem('favorite_articles');
    let favorites = [];
    if (stored) {
        try {
            favorites = JSON.parse(stored);
        }
        catch {
            favorites = [];
        }
    }
    if (isFavorited.value) {
        favorites = favorites.filter(a => a.ID !== article.value?.ID);
        ElMessage.success('已取消收藏');
    }
    else {
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
        }
        catch {
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
        const comment = {
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
    }
    finally {
        submitting.value = false;
    }
};
const replyToComment = (comment) => {
    replyingTo.value = comment.id;
    replyContent.value = '';
};
const submitReply = (comment) => {
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
const deleteComment = async (comment) => {
    try {
        await ElMessageBox.confirm('确定要删除这条评论吗？', '删除评论', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        });
        comments.value = comments.value.filter(c => c.id !== comment.id);
        saveComments();
        ElMessage.success('评论已删除');
    }
    catch { }
};
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
const formatCommentDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) {
        return '今天';
    }
    else if (days === 1) {
        return '昨天';
    }
    else if (days < 7) {
        return `${days}天前`;
    }
    else {
        return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
    }
};
onMounted(() => {
    if (authStore.isAuthenticated) {
        fetchArticle();
        fetchLike();
        loadComments();
    }
    else {
        fetchArticle();
    }
});
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-detail-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-content") }, });
    if (__VLS_ctx.article) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({ ...{ class: ("article") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({ ...{ class: ("article-header") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-meta") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("article-date") }, });
        (__VLS_ctx.formatDate(__VLS_ctx.article.CreatedAt));
        // @ts-ignore
        [article, article, formatDate,];
        if (__VLS_ctx.article.category) {
            const __VLS_0 = {}.ElTag;
            ({}.ElTag);
            ({}.ElTag);
            __VLS_components.ElTag;
            __VLS_components.elTag;
            __VLS_components.ElTag;
            __VLS_components.elTag;
            // @ts-ignore
            [ElTag, ElTag,];
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ size: ("small"), ...{ class: ("article-category") }, }));
            const __VLS_2 = __VLS_1({ size: ("small"), ...{ class: ("article-category") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            ({}({ size: ("small"), ...{ class: ("article-category") }, }));
            (__VLS_ctx.article.category);
            // @ts-ignore
            [article, article,];
            (__VLS_5.slots).default;
            const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("article-title") }, });
        (__VLS_ctx.article.title);
        // @ts-ignore
        [article,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-author-info") }, });
        const __VLS_6 = {}.ElAvatar;
        ({}.ElAvatar);
        ({}.ElAvatar);
        __VLS_components.ElAvatar;
        __VLS_components.elAvatar;
        __VLS_components.ElAvatar;
        __VLS_components.elAvatar;
        // @ts-ignore
        [ElAvatar, ElAvatar,];
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ size: ((32)), src: ((__VLS_ctx.article.author?.avatar)), ...{ class: ("author-avatar") }, }));
        const __VLS_8 = __VLS_7({ size: ((32)), src: ((__VLS_ctx.article.author?.avatar)), ...{ class: ("author-avatar") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        ({}({ size: ((32)), src: ((__VLS_ctx.article.author?.avatar)), ...{ class: ("author-avatar") }, }));
        (__VLS_ctx.article.author?.username?.charAt(0));
        // @ts-ignore
        [article, article,];
        (__VLS_11.slots).default;
        const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("author-details") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("author-name") }, });
        (__VLS_ctx.article.author?.username || '匿名用户');
        // @ts-ignore
        [article,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("author-bio") }, });
        (__VLS_ctx.article.author?.bio || '金融分析师');
        // @ts-ignore
        [article,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-body") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-content markdown-body") }, });
        __VLS_directiveFunction(__VLS_ctx.vHtml)((__VLS_ctx.formattedContent));
        // @ts-ignore
        [vHtml, formattedContent,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({ ...{ class: ("article-footer") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-stats") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("stat-item") }, });
        const __VLS_12 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ size: ("16"), }));
        const __VLS_14 = __VLS_13({ size: ("16"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        ({}({ size: ("16"), }));
        const __VLS_18 = {}.View;
        ({}.View);
        __VLS_components.View;
        // @ts-ignore
        [View,];
        const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
        const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
        ({}({}));
        const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
        (__VLS_17.slots).default;
        const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.article.views || 0);
        // @ts-ignore
        [article,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("stat-item") }, });
        const __VLS_24 = {}.ElButton;
        ({}.ElButton);
        ({}.ElButton);
        __VLS_components.ElButton;
        __VLS_components.elButton;
        __VLS_components.ElButton;
        __VLS_components.elButton;
        // @ts-ignore
        [ElButton, ElButton,];
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ ...{ 'onClick': {} }, type: ("primary"), loading: ((__VLS_ctx.liking)), ...{ class: ("like-btn") }, }));
        const __VLS_26 = __VLS_25({ ...{ 'onClick': {} }, type: ("primary"), loading: ((__VLS_ctx.liking)), ...{ class: ("like-btn") }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        ({}({ ...{ 'onClick': {} }, type: ("primary"), loading: ((__VLS_ctx.liking)), ...{ class: ("like-btn") }, }));
        let __VLS_30;
        const __VLS_31 = {
            onClick: (__VLS_ctx.likeArticle)
        };
        const __VLS_32 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ size: ("16"), }));
        const __VLS_34 = __VLS_33({ size: ("16"), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        ({}({ size: ("16"), }));
        const __VLS_38 = {}.StarFilled;
        ({}.StarFilled);
        __VLS_components.StarFilled;
        // @ts-ignore
        [StarFilled,];
        const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({}));
        const __VLS_40 = __VLS_39({}, ...__VLS_functionalComponentArgsRest(__VLS_39));
        ({}({}));
        // @ts-ignore
        [liking, likeArticle,];
        const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_38, __VLS_40);
        (__VLS_37.slots).default;
        const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.likes);
        // @ts-ignore
        [likes,];
        (__VLS_29.slots).default;
        const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
        let __VLS_27;
        let __VLS_28;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("stat-item") }, });
        const __VLS_44 = {}.ElButton;
        ({}.ElButton);
        ({}.ElButton);
        __VLS_components.ElButton;
        __VLS_components.elButton;
        __VLS_components.ElButton;
        __VLS_components.elButton;
        // @ts-ignore
        [ElButton, ElButton,];
        const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({ ...{ 'onClick': {} }, ...{ class: (({ 'is-favorited': __VLS_ctx.isFavorited })) }, ...{ class: ("favorite-btn") }, }));
        const __VLS_46 = __VLS_45({ ...{ 'onClick': {} }, ...{ class: (({ 'is-favorited': __VLS_ctx.isFavorited })) }, ...{ class: ("favorite-btn") }, }, ...__VLS_functionalComponentArgsRest(__VLS_45));
        ({}({ ...{ 'onClick': {} }, ...{ class: (({ 'is-favorited': __VLS_ctx.isFavorited })) }, ...{ class: ("favorite-btn") }, }));
        __VLS_styleScopedClasses = ({ 'is-favorited': isFavorited });
        let __VLS_50;
        const __VLS_51 = {
            onClick: (__VLS_ctx.toggleFavorite)
        };
        const __VLS_52 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({ size: ("16"), }));
        const __VLS_54 = __VLS_53({ size: ("16"), }, ...__VLS_functionalComponentArgsRest(__VLS_53));
        ({}({ size: ("16"), }));
        const __VLS_58 = {}.Collection;
        ({}.Collection);
        __VLS_components.Collection;
        // @ts-ignore
        [Collection,];
        const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({}));
        const __VLS_60 = __VLS_59({}, ...__VLS_functionalComponentArgsRest(__VLS_59));
        ({}({}));
        // @ts-ignore
        [isFavorited, toggleFavorite,];
        const __VLS_63 = __VLS_pickFunctionalComponentCtx(__VLS_58, __VLS_60);
        (__VLS_57.slots).default;
        const __VLS_57 = __VLS_pickFunctionalComponentCtx(__VLS_52, __VLS_54);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.isFavorited ? '已收藏' : '收藏');
        // @ts-ignore
        [isFavorited,];
        (__VLS_49.slots).default;
        const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_44, __VLS_46);
        let __VLS_47;
        let __VLS_48;
        if (__VLS_ctx.article.tags) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-tags") }, });
            for (const [tag] of __VLS_getVForSourceType((__VLS_ctx.article.tags.split(',')))) {
                const __VLS_64 = {}.ElTag;
                ({}.ElTag);
                ({}.ElTag);
                __VLS_components.ElTag;
                __VLS_components.elTag;
                __VLS_components.ElTag;
                __VLS_components.elTag;
                // @ts-ignore
                [ElTag, ElTag,];
                const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({ key: ((tag)), size: ("small"), ...{ class: ("tag-item") }, }));
                const __VLS_66 = __VLS_65({ key: ((tag)), size: ("small"), ...{ class: ("tag-item") }, }, ...__VLS_functionalComponentArgsRest(__VLS_65));
                ({}({ key: ((tag)), size: ("small"), ...{ class: ("tag-item") }, }));
                (tag.trim());
                // @ts-ignore
                [article, article,];
                (__VLS_69.slots).default;
                const __VLS_69 = __VLS_pickFunctionalComponentCtx(__VLS_64, __VLS_66);
            }
        }
    }
    else if (!__VLS_ctx.authStore.isAuthenticated) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("auth-prompt") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("blankslate") }, });
        const __VLS_70 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({ size: ("48"), ...{ class: ("text-muted") }, }));
        const __VLS_72 = __VLS_71({ size: ("48"), ...{ class: ("text-muted") }, }, ...__VLS_functionalComponentArgsRest(__VLS_71));
        ({}({ size: ("48"), ...{ class: ("text-muted") }, }));
        const __VLS_76 = {}.Lock;
        ({}.Lock);
        __VLS_components.Lock;
        // @ts-ignore
        [Lock,];
        const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({}));
        const __VLS_78 = __VLS_77({}, ...__VLS_functionalComponentArgsRest(__VLS_77));
        ({}({}));
        // @ts-ignore
        [authStore,];
        const __VLS_81 = __VLS_pickFunctionalComponentCtx(__VLS_76, __VLS_78);
        (__VLS_75.slots).default;
        const __VLS_75 = __VLS_pickFunctionalComponentCtx(__VLS_70, __VLS_72);
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        const __VLS_82 = {}.RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({ to: ("/login"), ...{ class: ("btn btn-primary") }, }));
        const __VLS_84 = __VLS_83({ to: ("/login"), ...{ class: ("btn btn-primary") }, }, ...__VLS_functionalComponentArgsRest(__VLS_83));
        ({}({ to: ("/login"), ...{ class: ("btn btn-primary") }, }));
        (__VLS_87.slots).default;
        const __VLS_87 = __VLS_pickFunctionalComponentCtx(__VLS_82, __VLS_84);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-section") }, });
        const __VLS_88 = {}.ElSkeleton;
        ({}.ElSkeleton);
        __VLS_components.ElSkeleton;
        __VLS_components.elSkeleton;
        // @ts-ignore
        [ElSkeleton,];
        const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({ rows: ((10)), animated: (true), }));
        const __VLS_90 = __VLS_89({ rows: ((10)), animated: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_89));
        ({}({ rows: ((10)), animated: (true), }));
        const __VLS_93 = __VLS_pickFunctionalComponentCtx(__VLS_88, __VLS_90);
    }
    if (__VLS_ctx.authStore.isAuthenticated) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("comments-section") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("comments-title") }, });
        const __VLS_94 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({}));
        const __VLS_96 = __VLS_95({}, ...__VLS_functionalComponentArgsRest(__VLS_95));
        ({}({}));
        const __VLS_100 = {}.ChatDotRound;
        ({}.ChatDotRound);
        __VLS_components.ChatDotRound;
        // @ts-ignore
        [ChatDotRound,];
        const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({}));
        const __VLS_102 = __VLS_101({}, ...__VLS_functionalComponentArgsRest(__VLS_101));
        ({}({}));
        // @ts-ignore
        [authStore,];
        const __VLS_105 = __VLS_pickFunctionalComponentCtx(__VLS_100, __VLS_102);
        (__VLS_99.slots).default;
        const __VLS_99 = __VLS_pickFunctionalComponentCtx(__VLS_94, __VLS_96);
        (__VLS_ctx.comments.length);
        // @ts-ignore
        [comments,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comment-form") }, });
        const __VLS_106 = {}.ElAvatar;
        ({}.ElAvatar);
        ({}.ElAvatar);
        __VLS_components.ElAvatar;
        __VLS_components.elAvatar;
        __VLS_components.ElAvatar;
        __VLS_components.elAvatar;
        // @ts-ignore
        [ElAvatar, ElAvatar,];
        const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({ size: ((40)), ...{ class: ("comment-avatar") }, }));
        const __VLS_108 = __VLS_107({ size: ((40)), ...{ class: ("comment-avatar") }, }, ...__VLS_functionalComponentArgsRest(__VLS_107));
        ({}({ size: ((40)), ...{ class: ("comment-avatar") }, }));
        (__VLS_ctx.authStore.user?.username?.charAt(0));
        // @ts-ignore
        [authStore,];
        (__VLS_111.slots).default;
        const __VLS_111 = __VLS_pickFunctionalComponentCtx(__VLS_106, __VLS_108);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comment-input-wrapper") }, });
        const __VLS_112 = {}.ElInput;
        ({}.ElInput);
        __VLS_components.ElInput;
        __VLS_components.elInput;
        // @ts-ignore
        [ElInput,];
        const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({ modelValue: ((__VLS_ctx.newComment)), type: ("textarea"), rows: ((3)), placeholder: ("写下你的评论..."), ...{ class: ("comment-textarea") }, }));
        const __VLS_114 = __VLS_113({ modelValue: ((__VLS_ctx.newComment)), type: ("textarea"), rows: ((3)), placeholder: ("写下你的评论..."), ...{ class: ("comment-textarea") }, }, ...__VLS_functionalComponentArgsRest(__VLS_113));
        ({}({ modelValue: ((__VLS_ctx.newComment)), type: ("textarea"), rows: ((3)), placeholder: ("写下你的评论..."), ...{ class: ("comment-textarea") }, }));
        // @ts-ignore
        [newComment,];
        const __VLS_117 = __VLS_pickFunctionalComponentCtx(__VLS_112, __VLS_114);
        const __VLS_118 = {}.ElButton;
        ({}.ElButton);
        ({}.ElButton);
        __VLS_components.ElButton;
        __VLS_components.elButton;
        __VLS_components.ElButton;
        __VLS_components.elButton;
        // @ts-ignore
        [ElButton, ElButton,];
        const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({ ...{ 'onClick': {} }, type: ("primary"), loading: ((__VLS_ctx.submitting)), ...{ class: ("submit-comment-btn") }, }));
        const __VLS_120 = __VLS_119({ ...{ 'onClick': {} }, type: ("primary"), loading: ((__VLS_ctx.submitting)), ...{ class: ("submit-comment-btn") }, }, ...__VLS_functionalComponentArgsRest(__VLS_119));
        ({}({ ...{ 'onClick': {} }, type: ("primary"), loading: ((__VLS_ctx.submitting)), ...{ class: ("submit-comment-btn") }, }));
        let __VLS_124;
        const __VLS_125 = {
            onClick: (__VLS_ctx.submitComment)
        };
        // @ts-ignore
        [submitting, submitComment,];
        (__VLS_123.slots).default;
        const __VLS_123 = __VLS_pickFunctionalComponentCtx(__VLS_118, __VLS_120);
        let __VLS_121;
        let __VLS_122;
        if (__VLS_ctx.comments.length === 0) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("no-comments") }, });
            const __VLS_126 = {}.ElIcon;
            ({}.ElIcon);
            ({}.ElIcon);
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            // @ts-ignore
            [ElIcon, ElIcon,];
            const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({}));
            const __VLS_128 = __VLS_127({}, ...__VLS_functionalComponentArgsRest(__VLS_127));
            ({}({}));
            const __VLS_132 = {}.ChatLineSquare;
            ({}.ChatLineSquare);
            __VLS_components.ChatLineSquare;
            // @ts-ignore
            [ChatLineSquare,];
            const __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({}));
            const __VLS_134 = __VLS_133({}, ...__VLS_functionalComponentArgsRest(__VLS_133));
            ({}({}));
            // @ts-ignore
            [comments,];
            const __VLS_137 = __VLS_pickFunctionalComponentCtx(__VLS_132, __VLS_134);
            (__VLS_131.slots).default;
            const __VLS_131 = __VLS_pickFunctionalComponentCtx(__VLS_126, __VLS_128);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comments-list") }, });
            for (const [comment] of __VLS_getVForSourceType((__VLS_ctx.comments))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((comment.id)), ...{ class: ("comment-item") }, });
                const __VLS_138 = {}.ElAvatar;
                ({}.ElAvatar);
                ({}.ElAvatar);
                __VLS_components.ElAvatar;
                __VLS_components.elAvatar;
                __VLS_components.ElAvatar;
                __VLS_components.elAvatar;
                // @ts-ignore
                [ElAvatar, ElAvatar,];
                const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({ size: ((40)), src: ((comment.author?.avatar)), ...{ class: ("comment-avatar") }, }));
                const __VLS_140 = __VLS_139({ size: ((40)), src: ((comment.author?.avatar)), ...{ class: ("comment-avatar") }, }, ...__VLS_functionalComponentArgsRest(__VLS_139));
                ({}({ size: ((40)), src: ((comment.author?.avatar)), ...{ class: ("comment-avatar") }, }));
                (comment.author?.username?.charAt(0));
                // @ts-ignore
                [comments,];
                (__VLS_143.slots).default;
                const __VLS_143 = __VLS_pickFunctionalComponentCtx(__VLS_138, __VLS_140);
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comment-content") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comment-header") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("comment-author") }, });
                (comment.author?.username || '匿名用户');
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("comment-date") }, });
                (__VLS_ctx.formatCommentDate(comment.CreatedAt));
                // @ts-ignore
                [formatCommentDate,];
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("comment-text") }, });
                (comment.content);
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comment-actions") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                            if (!((__VLS_ctx.authStore.isAuthenticated)))
                                return;
                            if (!(!((__VLS_ctx.comments.length === 0))))
                                return;
                            __VLS_ctx.replyToComment(comment);
                            // @ts-ignore
                            [replyToComment,];
                        } }, ...{ class: ("action-btn") }, });
                const __VLS_144 = {}.ElIcon;
                ({}.ElIcon);
                ({}.ElIcon);
                __VLS_components.ElIcon;
                __VLS_components.elIcon;
                __VLS_components.ElIcon;
                __VLS_components.elIcon;
                // @ts-ignore
                [ElIcon, ElIcon,];
                const __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({}));
                const __VLS_146 = __VLS_145({}, ...__VLS_functionalComponentArgsRest(__VLS_145));
                ({}({}));
                const __VLS_150 = {}.ChatLineSquare;
                ({}.ChatLineSquare);
                __VLS_components.ChatLineSquare;
                // @ts-ignore
                [ChatLineSquare,];
                const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({}));
                const __VLS_152 = __VLS_151({}, ...__VLS_functionalComponentArgsRest(__VLS_151));
                ({}({}));
                const __VLS_155 = __VLS_pickFunctionalComponentCtx(__VLS_150, __VLS_152);
                (__VLS_149.slots).default;
                const __VLS_149 = __VLS_pickFunctionalComponentCtx(__VLS_144, __VLS_146);
                __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                            if (!((__VLS_ctx.authStore.isAuthenticated)))
                                return;
                            if (!(!((__VLS_ctx.comments.length === 0))))
                                return;
                            __VLS_ctx.deleteComment(comment);
                            // @ts-ignore
                            [deleteComment,];
                        } }, ...{ class: ("action-btn") }, });
                const __VLS_156 = {}.ElIcon;
                ({}.ElIcon);
                ({}.ElIcon);
                __VLS_components.ElIcon;
                __VLS_components.elIcon;
                __VLS_components.ElIcon;
                __VLS_components.elIcon;
                // @ts-ignore
                [ElIcon, ElIcon,];
                const __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({}));
                const __VLS_158 = __VLS_157({}, ...__VLS_functionalComponentArgsRest(__VLS_157));
                ({}({}));
                const __VLS_162 = {}.Delete;
                ({}.Delete);
                __VLS_components.Delete;
                // @ts-ignore
                [Delete,];
                const __VLS_163 = __VLS_asFunctionalComponent(__VLS_162, new __VLS_162({}));
                const __VLS_164 = __VLS_163({}, ...__VLS_functionalComponentArgsRest(__VLS_163));
                ({}({}));
                const __VLS_167 = __VLS_pickFunctionalComponentCtx(__VLS_162, __VLS_164);
                (__VLS_161.slots).default;
                const __VLS_161 = __VLS_pickFunctionalComponentCtx(__VLS_156, __VLS_158);
                if (comment.replies && comment.replies.length > 0) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("replies-list") }, });
                    for (const [reply] of __VLS_getVForSourceType((comment.replies))) {
                        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((reply.id)), ...{ class: ("reply-item") }, });
                        const __VLS_168 = {}.ElAvatar;
                        ({}.ElAvatar);
                        ({}.ElAvatar);
                        __VLS_components.ElAvatar;
                        __VLS_components.elAvatar;
                        __VLS_components.ElAvatar;
                        __VLS_components.elAvatar;
                        // @ts-ignore
                        [ElAvatar, ElAvatar,];
                        const __VLS_169 = __VLS_asFunctionalComponent(__VLS_168, new __VLS_168({ size: ((32)), src: ((reply.author?.avatar)), ...{ class: ("reply-avatar") }, }));
                        const __VLS_170 = __VLS_169({ size: ((32)), src: ((reply.author?.avatar)), ...{ class: ("reply-avatar") }, }, ...__VLS_functionalComponentArgsRest(__VLS_169));
                        ({}({ size: ((32)), src: ((reply.author?.avatar)), ...{ class: ("reply-avatar") }, }));
                        (reply.author?.username?.charAt(0));
                        (__VLS_173.slots).default;
                        const __VLS_173 = __VLS_pickFunctionalComponentCtx(__VLS_168, __VLS_170);
                        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("reply-content") }, });
                        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("reply-header") }, });
                        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("reply-author") }, });
                        (reply.author?.username);
                        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("reply-date") }, });
                        (__VLS_ctx.formatCommentDate(reply.CreatedAt));
                        // @ts-ignore
                        [formatCommentDate,];
                        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("reply-text") }, });
                        (reply.content);
                    }
                }
            }
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)({ ...{ class: ("article-sidebar") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("sidebar-section search-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("sidebar-title") }, });
    const __VLS_174 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174({ modelValue: ((__VLS_ctx.searchQuery)), placeholder: ("搜索标题或内容..."), prefixIcon: ((__VLS_ctx.Search)), clearable: (true), ...{ class: ("search-input") }, }));
    const __VLS_176 = __VLS_175({ modelValue: ((__VLS_ctx.searchQuery)), placeholder: ("搜索标题或内容..."), prefixIcon: ((__VLS_ctx.Search)), clearable: (true), ...{ class: ("search-input") }, }, ...__VLS_functionalComponentArgsRest(__VLS_175));
    ({}({ modelValue: ((__VLS_ctx.searchQuery)), placeholder: ("搜索标题或内容..."), prefixIcon: ((__VLS_ctx.Search)), clearable: (true), ...{ class: ("search-input") }, }));
    // @ts-ignore
    [searchQuery, Search,];
    const __VLS_179 = __VLS_pickFunctionalComponentCtx(__VLS_174, __VLS_176);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("sidebar-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("sidebar-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("related-articles") }, });
    for (const [i] of __VLS_getVForSourceType((3))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((i)), ...{ class: ("related-article") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({ ...{ class: ("related-title") }, });
        (i);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("related-date") }, });
        (10 + i);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("sidebar-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("sidebar-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("tag-cloud") }, });
    for (const [tag] of __VLS_getVForSourceType((['汇率', '投资', '分析', '市场', '货币']))) {
        const __VLS_180 = {}.ElTag;
        ({}.ElTag);
        ({}.ElTag);
        __VLS_components.ElTag;
        __VLS_components.elTag;
        __VLS_components.ElTag;
        __VLS_components.elTag;
        // @ts-ignore
        [ElTag, ElTag,];
        const __VLS_181 = __VLS_asFunctionalComponent(__VLS_180, new __VLS_180({ key: ((tag)), size: ("small"), ...{ class: ("cloud-tag") }, }));
        const __VLS_182 = __VLS_181({ key: ((tag)), size: ("small"), ...{ class: ("cloud-tag") }, }, ...__VLS_functionalComponentArgsRest(__VLS_181));
        ({}({ key: ((tag)), size: ("small"), ...{ class: ("cloud-tag") }, }));
        (tag);
        (__VLS_185.slots).default;
        const __VLS_185 = __VLS_pickFunctionalComponentCtx(__VLS_180, __VLS_182);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['article-detail-container'];
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['article-content'];
        __VLS_styleScopedClasses['article'];
        __VLS_styleScopedClasses['article-header'];
        __VLS_styleScopedClasses['article-meta'];
        __VLS_styleScopedClasses['article-date'];
        __VLS_styleScopedClasses['article-category'];
        __VLS_styleScopedClasses['article-title'];
        __VLS_styleScopedClasses['article-author-info'];
        __VLS_styleScopedClasses['author-avatar'];
        __VLS_styleScopedClasses['author-details'];
        __VLS_styleScopedClasses['author-name'];
        __VLS_styleScopedClasses['author-bio'];
        __VLS_styleScopedClasses['article-body'];
        __VLS_styleScopedClasses['article-content'];
        __VLS_styleScopedClasses['markdown-body'];
        __VLS_styleScopedClasses['article-footer'];
        __VLS_styleScopedClasses['article-stats'];
        __VLS_styleScopedClasses['stat-item'];
        __VLS_styleScopedClasses['stat-item'];
        __VLS_styleScopedClasses['like-btn'];
        __VLS_styleScopedClasses['stat-item'];
        __VLS_styleScopedClasses['favorite-btn'];
        __VLS_styleScopedClasses['article-tags'];
        __VLS_styleScopedClasses['tag-item'];
        __VLS_styleScopedClasses['auth-prompt'];
        __VLS_styleScopedClasses['blankslate'];
        __VLS_styleScopedClasses['text-muted'];
        __VLS_styleScopedClasses['btn'];
        __VLS_styleScopedClasses['btn-primary'];
        __VLS_styleScopedClasses['loading-section'];
        __VLS_styleScopedClasses['comments-section'];
        __VLS_styleScopedClasses['comments-title'];
        __VLS_styleScopedClasses['comment-form'];
        __VLS_styleScopedClasses['comment-avatar'];
        __VLS_styleScopedClasses['comment-input-wrapper'];
        __VLS_styleScopedClasses['comment-textarea'];
        __VLS_styleScopedClasses['submit-comment-btn'];
        __VLS_styleScopedClasses['no-comments'];
        __VLS_styleScopedClasses['comments-list'];
        __VLS_styleScopedClasses['comment-item'];
        __VLS_styleScopedClasses['comment-avatar'];
        __VLS_styleScopedClasses['comment-content'];
        __VLS_styleScopedClasses['comment-header'];
        __VLS_styleScopedClasses['comment-author'];
        __VLS_styleScopedClasses['comment-date'];
        __VLS_styleScopedClasses['comment-text'];
        __VLS_styleScopedClasses['comment-actions'];
        __VLS_styleScopedClasses['action-btn'];
        __VLS_styleScopedClasses['action-btn'];
        __VLS_styleScopedClasses['replies-list'];
        __VLS_styleScopedClasses['reply-item'];
        __VLS_styleScopedClasses['reply-avatar'];
        __VLS_styleScopedClasses['reply-content'];
        __VLS_styleScopedClasses['reply-header'];
        __VLS_styleScopedClasses['reply-author'];
        __VLS_styleScopedClasses['reply-date'];
        __VLS_styleScopedClasses['reply-text'];
        __VLS_styleScopedClasses['article-sidebar'];
        __VLS_styleScopedClasses['sidebar-section'];
        __VLS_styleScopedClasses['search-section'];
        __VLS_styleScopedClasses['sidebar-title'];
        __VLS_styleScopedClasses['search-input'];
        __VLS_styleScopedClasses['sidebar-section'];
        __VLS_styleScopedClasses['sidebar-title'];
        __VLS_styleScopedClasses['related-articles'];
        __VLS_styleScopedClasses['related-article'];
        __VLS_styleScopedClasses['related-title'];
        __VLS_styleScopedClasses['related-date'];
        __VLS_styleScopedClasses['sidebar-section'];
        __VLS_styleScopedClasses['sidebar-title'];
        __VLS_styleScopedClasses['tag-cloud'];
        __VLS_styleScopedClasses['cloud-tag'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {
                Lock: Lock,
                View: View,
                StarFilled: StarFilled,
                Collection: Collection,
                ChatDotRound: ChatDotRound,
                ChatLineSquare: ChatLineSquare,
                Delete: Delete,
                Search: Search,
                article: article,
                authStore: authStore,
                likes: likes,
                liking: liking,
                isFavorited: isFavorited,
                searchQuery: searchQuery,
                comments: comments,
                newComment: newComment,
                submitting: submitting,
                formattedContent: formattedContent,
                likeArticle: likeArticle,
                toggleFavorite: toggleFavorite,
                submitComment: submitComment,
                replyToComment: replyToComment,
                deleteComment: deleteComment,
                formatDate: formatDate,
                formatCommentDate: formatCommentDate,
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
