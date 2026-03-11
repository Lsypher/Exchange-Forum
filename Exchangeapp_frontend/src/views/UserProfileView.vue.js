/* __placeholder__ */
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Camera, Calendar, Location, Edit, Plus, Document, View, Star, StarFilled, Delete } from '@element-plus/icons-vue';
import { useAuthStore } from '../store/auth';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const authStore = useAuthStore();
const activeTab = ref('articles');
const showEditDialog = ref(false);
const showAvatarDialog = ref(false);
const saving = ref(false);
const myArticles = ref([]);
const favoriteArticles = ref([]);
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
        }
        catch (e) {
            myArticles.value = [];
        }
    }
};
const loadFavorites = () => {
    const stored = localStorage.getItem('favorite_articles');
    if (stored) {
        try {
            favoriteArticles.value = JSON.parse(stored);
        }
        catch (e) {
            favoriteArticles.value = [];
        }
    }
};
const formatDate = (dateString) => {
    if (!dateString)
        return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};
const editArticle = (article) => {
    router.push({ name: 'NewsDetail', params: { id: article.ID } });
};
const deleteArticle = async (article) => {
    try {
        await ElMessageBox.confirm('确定要删除这篇文章吗？此操作不可撤销。', '删除文章', {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'warning',
        });
        myArticles.value = myArticles.value.filter(a => a.ID !== article.ID);
        localStorage.setItem('my_articles', JSON.stringify(myArticles.value));
        ElMessage.success('文章已删除');
    }
    catch {
        // cancelled
    }
};
const unfavorite = (article) => {
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
    }
    finally {
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
        }
        catch (e) { }
    }
    const userSettings = localStorage.getItem('user_settings');
    if (userSettings) {
        try {
            const parsed = JSON.parse(userSettings);
            Object.assign(settings, parsed);
        }
        catch (e) { }
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("profile-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("profile-header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("profile-cover") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("profile-info") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("avatar-wrapper") }, });
    const __VLS_0 = {}.ElAvatar;
    ({}.ElAvatar);
    ({}.ElAvatar);
    __VLS_components.ElAvatar;
    __VLS_components.elAvatar;
    __VLS_components.ElAvatar;
    __VLS_components.elAvatar;
    // @ts-ignore
    [ElAvatar, ElAvatar,];
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ size: ((100)), src: ((__VLS_ctx.userInfo.avatar)), ...{ class: ("profile-avatar") }, }));
    const __VLS_2 = __VLS_1({ size: ((100)), src: ((__VLS_ctx.userInfo.avatar)), ...{ class: ("profile-avatar") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ size: ((100)), src: ((__VLS_ctx.userInfo.avatar)), ...{ class: ("profile-avatar") }, }));
    (__VLS_ctx.userInfo.username?.charAt(0).toUpperCase());
    // @ts-ignore
    [userInfo, userInfo,];
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.showAvatarDialog = true;
                // @ts-ignore
                [showAvatarDialog,];
            } }, ...{ class: ("avatar-edit-btn") }, });
    const __VLS_6 = {}.ElIcon;
    ({}.ElIcon);
    ({}.ElIcon);
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    // @ts-ignore
    [ElIcon, ElIcon,];
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    ({}({}));
    const __VLS_12 = {}.Camera;
    ({}.Camera);
    __VLS_components.Camera;
    // @ts-ignore
    [Camera,];
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    ({}({}));
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    (__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("user-details") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("username") }, });
    (__VLS_ctx.userInfo.username);
    // @ts-ignore
    [userInfo,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("user-bio") }, });
    (__VLS_ctx.userInfo.bio || '暂无个人简介');
    // @ts-ignore
    [userInfo,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("user-meta") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("meta-item") }, });
    const __VLS_18 = {}.ElIcon;
    ({}.ElIcon);
    ({}.ElIcon);
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    // @ts-ignore
    [ElIcon, ElIcon,];
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
    const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
    ({}({}));
    const __VLS_24 = {}.Calendar;
    ({}.Calendar);
    __VLS_components.Calendar;
    // @ts-ignore
    [Calendar,];
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
    const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
    ({}({}));
    const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
    (__VLS_23.slots).default;
    const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
    (__VLS_ctx.userInfo.joinDate);
    // @ts-ignore
    [userInfo,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("meta-item") }, });
    const __VLS_30 = {}.ElIcon;
    ({}.ElIcon);
    ({}.ElIcon);
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    // @ts-ignore
    [ElIcon, ElIcon,];
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
    const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
    ({}({}));
    const __VLS_36 = {}.Location;
    ({}.Location);
    __VLS_components.Location;
    // @ts-ignore
    [Location,];
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
    const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
    ({}({}));
    const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
    (__VLS_35.slots).default;
    const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
    (__VLS_ctx.userInfo.location || '未设置地区');
    // @ts-ignore
    [userInfo,];
    const __VLS_42 = {}.ElButton;
    ({}.ElButton);
    ({}.ElButton);
    __VLS_components.ElButton;
    __VLS_components.elButton;
    __VLS_components.ElButton;
    __VLS_components.elButton;
    // @ts-ignore
    [ElButton, ElButton,];
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ ...{ 'onClick': {} }, ...{ class: ("edit-profile-btn") }, }));
    const __VLS_44 = __VLS_43({ ...{ 'onClick': {} }, ...{ class: ("edit-profile-btn") }, }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    ({}({ ...{ 'onClick': {} }, ...{ class: ("edit-profile-btn") }, }));
    let __VLS_48;
    const __VLS_49 = {
        onClick: (...[$event]) => {
            __VLS_ctx.showEditDialog = true;
            // @ts-ignore
            [showEditDialog,];
        }
    };
    const __VLS_50 = {}.ElIcon;
    ({}.ElIcon);
    ({}.ElIcon);
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    // @ts-ignore
    [ElIcon, ElIcon,];
    const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({}));
    const __VLS_52 = __VLS_51({}, ...__VLS_functionalComponentArgsRest(__VLS_51));
    ({}({}));
    const __VLS_56 = {}.Edit;
    ({}.Edit);
    __VLS_components.Edit;
    // @ts-ignore
    [Edit,];
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({}));
    const __VLS_58 = __VLS_57({}, ...__VLS_functionalComponentArgsRest(__VLS_57));
    ({}({}));
    const __VLS_61 = __VLS_pickFunctionalComponentCtx(__VLS_56, __VLS_58);
    (__VLS_55.slots).default;
    const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52);
    (__VLS_47.slots).default;
    const __VLS_47 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44);
    let __VLS_45;
    let __VLS_46;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("profile-content") }, });
    const __VLS_62 = {}.ElTabs;
    ({}.ElTabs);
    ({}.ElTabs);
    __VLS_components.ElTabs;
    __VLS_components.elTabs;
    __VLS_components.ElTabs;
    __VLS_components.elTabs;
    // @ts-ignore
    [ElTabs, ElTabs,];
    const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({ modelValue: ((__VLS_ctx.activeTab)), ...{ class: ("profile-tabs") }, }));
    const __VLS_64 = __VLS_63({ modelValue: ((__VLS_ctx.activeTab)), ...{ class: ("profile-tabs") }, }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    ({}({ modelValue: ((__VLS_ctx.activeTab)), ...{ class: ("profile-tabs") }, }));
    const __VLS_68 = {}.ElTabPane;
    ({}.ElTabPane);
    ({}.ElTabPane);
    __VLS_components.ElTabPane;
    __VLS_components.elTabPane;
    __VLS_components.ElTabPane;
    __VLS_components.elTabPane;
    // @ts-ignore
    [ElTabPane, ElTabPane,];
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({ label: ("我的文章"), name: ("articles"), }));
    const __VLS_70 = __VLS_69({ label: ("我的文章"), name: ("articles"), }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    ({}({ label: ("我的文章"), name: ("articles"), }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("tab-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("section-header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("section-title") }, });
    // @ts-ignore
    [activeTab,];
    const __VLS_74 = {}.RouterLink;
    ({}.RouterLink);
    ({}.RouterLink);
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    // @ts-ignore
    [RouterLink, RouterLink,];
    const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({ to: ("/articles/create"), ...{ class: ("create-btn") }, }));
    const __VLS_76 = __VLS_75({ to: ("/articles/create"), ...{ class: ("create-btn") }, }, ...__VLS_functionalComponentArgsRest(__VLS_75));
    ({}({ to: ("/articles/create"), ...{ class: ("create-btn") }, }));
    const __VLS_80 = {}.ElIcon;
    ({}.ElIcon);
    ({}.ElIcon);
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    // @ts-ignore
    [ElIcon, ElIcon,];
    const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({}));
    const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
    ({}({}));
    const __VLS_86 = {}.Plus;
    ({}.Plus);
    __VLS_components.Plus;
    // @ts-ignore
    [Plus,];
    const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({}));
    const __VLS_88 = __VLS_87({}, ...__VLS_functionalComponentArgsRest(__VLS_87));
    ({}({}));
    const __VLS_91 = __VLS_pickFunctionalComponentCtx(__VLS_86, __VLS_88);
    (__VLS_85.slots).default;
    const __VLS_85 = __VLS_pickFunctionalComponentCtx(__VLS_80, __VLS_82);
    (__VLS_79.slots).default;
    const __VLS_79 = __VLS_pickFunctionalComponentCtx(__VLS_74, __VLS_76);
    if (__VLS_ctx.myArticles.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("empty-state") }, });
        const __VLS_92 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({ ...{ class: ("empty-icon") }, }));
        const __VLS_94 = __VLS_93({ ...{ class: ("empty-icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_93));
        ({}({ ...{ class: ("empty-icon") }, }));
        const __VLS_98 = {}.Document;
        ({}.Document);
        __VLS_components.Document;
        // @ts-ignore
        [Document,];
        const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({}));
        const __VLS_100 = __VLS_99({}, ...__VLS_functionalComponentArgsRest(__VLS_99));
        ({}({}));
        // @ts-ignore
        [myArticles,];
        const __VLS_103 = __VLS_pickFunctionalComponentCtx(__VLS_98, __VLS_100);
        (__VLS_97.slots).default;
        const __VLS_97 = __VLS_pickFunctionalComponentCtx(__VLS_92, __VLS_94);
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        const __VLS_104 = {}.RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({ to: ("/articles/create"), ...{ class: ("btn btn-primary") }, }));
        const __VLS_106 = __VLS_105({ to: ("/articles/create"), ...{ class: ("btn btn-primary") }, }, ...__VLS_functionalComponentArgsRest(__VLS_105));
        ({}({ to: ("/articles/create"), ...{ class: ("btn btn-primary") }, }));
        (__VLS_109.slots).default;
        const __VLS_109 = __VLS_pickFunctionalComponentCtx(__VLS_104, __VLS_106);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("articles-grid") }, });
        for (const [article] of __VLS_getVForSourceType((__VLS_ctx.myArticles))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({ key: ((article.ID)), ...{ class: ("article-card") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-content") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-meta") }, });
            if (article.category) {
                const __VLS_110 = {}.ElTag;
                ({}.ElTag);
                ({}.ElTag);
                __VLS_components.ElTag;
                __VLS_components.elTag;
                __VLS_components.ElTag;
                __VLS_components.elTag;
                // @ts-ignore
                [ElTag, ElTag,];
                const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({ size: ("small"), }));
                const __VLS_112 = __VLS_111({ size: ("small"), }, ...__VLS_functionalComponentArgsRest(__VLS_111));
                ({}({ size: ("small"), }));
                (article.category);
                // @ts-ignore
                [myArticles,];
                (__VLS_115.slots).default;
                const __VLS_115 = __VLS_pickFunctionalComponentCtx(__VLS_110, __VLS_112);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("article-date") }, });
            (__VLS_ctx.formatDate(article.CreatedAt));
            // @ts-ignore
            [formatDate,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("article-title") }, });
            const __VLS_116 = {}.RouterLink;
            ({}.RouterLink);
            ({}.RouterLink);
            __VLS_components.RouterLink;
            __VLS_components.routerLink;
            __VLS_components.RouterLink;
            __VLS_components.routerLink;
            // @ts-ignore
            [RouterLink, RouterLink,];
            const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({ to: (({ name: 'NewsDetail', params: { id: article.ID } })), }));
            const __VLS_118 = __VLS_117({ to: (({ name: 'NewsDetail', params: { id: article.ID } })), }, ...__VLS_functionalComponentArgsRest(__VLS_117));
            ({}({ to: (({ name: 'NewsDetail', params: { id: article.ID } })), }));
            (article.title);
            (__VLS_121.slots).default;
            const __VLS_121 = __VLS_pickFunctionalComponentCtx(__VLS_116, __VLS_118);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("article-preview") }, });
            (article.preview);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-stats") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            const __VLS_122 = {}.ElIcon;
            ({}.ElIcon);
            ({}.ElIcon);
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            // @ts-ignore
            [ElIcon, ElIcon,];
            const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({}));
            const __VLS_124 = __VLS_123({}, ...__VLS_functionalComponentArgsRest(__VLS_123));
            ({}({}));
            const __VLS_128 = {}.View;
            ({}.View);
            __VLS_components.View;
            // @ts-ignore
            [View,];
            const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({}));
            const __VLS_130 = __VLS_129({}, ...__VLS_functionalComponentArgsRest(__VLS_129));
            ({}({}));
            const __VLS_133 = __VLS_pickFunctionalComponentCtx(__VLS_128, __VLS_130);
            (__VLS_127.slots).default;
            const __VLS_127 = __VLS_pickFunctionalComponentCtx(__VLS_122, __VLS_124);
            (article.views || 0);
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            const __VLS_134 = {}.ElIcon;
            ({}.ElIcon);
            ({}.ElIcon);
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            // @ts-ignore
            [ElIcon, ElIcon,];
            const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({}));
            const __VLS_136 = __VLS_135({}, ...__VLS_functionalComponentArgsRest(__VLS_135));
            ({}({}));
            const __VLS_140 = {}.Star;
            ({}.Star);
            __VLS_components.Star;
            // @ts-ignore
            [Star,];
            const __VLS_141 = __VLS_asFunctionalComponent(__VLS_140, new __VLS_140({}));
            const __VLS_142 = __VLS_141({}, ...__VLS_functionalComponentArgsRest(__VLS_141));
            ({}({}));
            const __VLS_145 = __VLS_pickFunctionalComponentCtx(__VLS_140, __VLS_142);
            (__VLS_139.slots).default;
            const __VLS_139 = __VLS_pickFunctionalComponentCtx(__VLS_134, __VLS_136);
            (article.likes || 0);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("article-actions") }, });
            const __VLS_146 = {}.ElButton;
            ({}.ElButton);
            ({}.ElButton);
            __VLS_components.ElButton;
            __VLS_components.elButton;
            __VLS_components.ElButton;
            __VLS_components.elButton;
            // @ts-ignore
            [ElButton, ElButton,];
            const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({ ...{ 'onClick': {} }, size: ("small"), }));
            const __VLS_148 = __VLS_147({ ...{ 'onClick': {} }, size: ("small"), }, ...__VLS_functionalComponentArgsRest(__VLS_147));
            ({}({ ...{ 'onClick': {} }, size: ("small"), }));
            let __VLS_152;
            const __VLS_153 = {
                onClick: (...[$event]) => {
                    if (!(!((__VLS_ctx.myArticles.length === 0))))
                        return;
                    __VLS_ctx.editArticle(article);
                    // @ts-ignore
                    [editArticle,];
                }
            };
            const __VLS_154 = {}.ElIcon;
            ({}.ElIcon);
            ({}.ElIcon);
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            // @ts-ignore
            [ElIcon, ElIcon,];
            const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({}));
            const __VLS_156 = __VLS_155({}, ...__VLS_functionalComponentArgsRest(__VLS_155));
            ({}({}));
            const __VLS_160 = {}.Edit;
            ({}.Edit);
            __VLS_components.Edit;
            // @ts-ignore
            [Edit,];
            const __VLS_161 = __VLS_asFunctionalComponent(__VLS_160, new __VLS_160({}));
            const __VLS_162 = __VLS_161({}, ...__VLS_functionalComponentArgsRest(__VLS_161));
            ({}({}));
            const __VLS_165 = __VLS_pickFunctionalComponentCtx(__VLS_160, __VLS_162);
            (__VLS_159.slots).default;
            const __VLS_159 = __VLS_pickFunctionalComponentCtx(__VLS_154, __VLS_156);
            (__VLS_151.slots).default;
            const __VLS_151 = __VLS_pickFunctionalComponentCtx(__VLS_146, __VLS_148);
            let __VLS_149;
            let __VLS_150;
            const __VLS_166 = {}.ElButton;
            ({}.ElButton);
            ({}.ElButton);
            __VLS_components.ElButton;
            __VLS_components.elButton;
            __VLS_components.ElButton;
            __VLS_components.elButton;
            // @ts-ignore
            [ElButton, ElButton,];
            const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({ ...{ 'onClick': {} }, size: ("small"), type: ("danger"), }));
            const __VLS_168 = __VLS_167({ ...{ 'onClick': {} }, size: ("small"), type: ("danger"), }, ...__VLS_functionalComponentArgsRest(__VLS_167));
            ({}({ ...{ 'onClick': {} }, size: ("small"), type: ("danger"), }));
            let __VLS_172;
            const __VLS_173 = {
                onClick: (...[$event]) => {
                    if (!(!((__VLS_ctx.myArticles.length === 0))))
                        return;
                    __VLS_ctx.deleteArticle(article);
                    // @ts-ignore
                    [deleteArticle,];
                }
            };
            const __VLS_174 = {}.ElIcon;
            ({}.ElIcon);
            ({}.ElIcon);
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            // @ts-ignore
            [ElIcon, ElIcon,];
            const __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174({}));
            const __VLS_176 = __VLS_175({}, ...__VLS_functionalComponentArgsRest(__VLS_175));
            ({}({}));
            const __VLS_180 = {}.Delete;
            ({}.Delete);
            __VLS_components.Delete;
            // @ts-ignore
            [Delete,];
            const __VLS_181 = __VLS_asFunctionalComponent(__VLS_180, new __VLS_180({}));
            const __VLS_182 = __VLS_181({}, ...__VLS_functionalComponentArgsRest(__VLS_181));
            ({}({}));
            const __VLS_185 = __VLS_pickFunctionalComponentCtx(__VLS_180, __VLS_182);
            (__VLS_179.slots).default;
            const __VLS_179 = __VLS_pickFunctionalComponentCtx(__VLS_174, __VLS_176);
            (__VLS_171.slots).default;
            const __VLS_171 = __VLS_pickFunctionalComponentCtx(__VLS_166, __VLS_168);
            let __VLS_169;
            let __VLS_170;
        }
    }
    (__VLS_73.slots).default;
    const __VLS_73 = __VLS_pickFunctionalComponentCtx(__VLS_68, __VLS_70);
    const __VLS_186 = {}.ElTabPane;
    ({}.ElTabPane);
    ({}.ElTabPane);
    __VLS_components.ElTabPane;
    __VLS_components.elTabPane;
    __VLS_components.ElTabPane;
    __VLS_components.elTabPane;
    // @ts-ignore
    [ElTabPane, ElTabPane,];
    const __VLS_187 = __VLS_asFunctionalComponent(__VLS_186, new __VLS_186({ label: ("收藏的文章"), name: ("favorites"), }));
    const __VLS_188 = __VLS_187({ label: ("收藏的文章"), name: ("favorites"), }, ...__VLS_functionalComponentArgsRest(__VLS_187));
    ({}({ label: ("收藏的文章"), name: ("favorites"), }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("tab-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("section-header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("section-title") }, });
    if (__VLS_ctx.favoriteArticles.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("empty-state") }, });
        const __VLS_192 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_193 = __VLS_asFunctionalComponent(__VLS_192, new __VLS_192({ ...{ class: ("empty-icon") }, }));
        const __VLS_194 = __VLS_193({ ...{ class: ("empty-icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_193));
        ({}({ ...{ class: ("empty-icon") }, }));
        const __VLS_198 = {}.Star;
        ({}.Star);
        __VLS_components.Star;
        // @ts-ignore
        [Star,];
        const __VLS_199 = __VLS_asFunctionalComponent(__VLS_198, new __VLS_198({}));
        const __VLS_200 = __VLS_199({}, ...__VLS_functionalComponentArgsRest(__VLS_199));
        ({}({}));
        // @ts-ignore
        [favoriteArticles,];
        const __VLS_203 = __VLS_pickFunctionalComponentCtx(__VLS_198, __VLS_200);
        (__VLS_197.slots).default;
        const __VLS_197 = __VLS_pickFunctionalComponentCtx(__VLS_192, __VLS_194);
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        const __VLS_204 = {}.RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        const __VLS_205 = __VLS_asFunctionalComponent(__VLS_204, new __VLS_204({ to: ("/articles"), ...{ class: ("btn btn-primary") }, }));
        const __VLS_206 = __VLS_205({ to: ("/articles"), ...{ class: ("btn btn-primary") }, }, ...__VLS_functionalComponentArgsRest(__VLS_205));
        ({}({ to: ("/articles"), ...{ class: ("btn btn-primary") }, }));
        (__VLS_209.slots).default;
        const __VLS_209 = __VLS_pickFunctionalComponentCtx(__VLS_204, __VLS_206);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("articles-list") }, });
        for (const [article] of __VLS_getVForSourceType((__VLS_ctx.favoriteArticles))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((article.ID)), ...{ class: ("favorite-item") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("favorite-info") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("favorite-title") }, });
            const __VLS_210 = {}.RouterLink;
            ({}.RouterLink);
            ({}.RouterLink);
            __VLS_components.RouterLink;
            __VLS_components.routerLink;
            __VLS_components.RouterLink;
            __VLS_components.routerLink;
            // @ts-ignore
            [RouterLink, RouterLink,];
            const __VLS_211 = __VLS_asFunctionalComponent(__VLS_210, new __VLS_210({ to: (({ name: 'NewsDetail', params: { id: article.ID } })), }));
            const __VLS_212 = __VLS_211({ to: (({ name: 'NewsDetail', params: { id: article.ID } })), }, ...__VLS_functionalComponentArgsRest(__VLS_211));
            ({}({ to: (({ name: 'NewsDetail', params: { id: article.ID } })), }));
            (article.title);
            // @ts-ignore
            [favoriteArticles,];
            (__VLS_215.slots).default;
            const __VLS_215 = __VLS_pickFunctionalComponentCtx(__VLS_210, __VLS_212);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("favorite-meta") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (article.author?.username);
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (__VLS_ctx.formatDate(article.CreatedAt));
            // @ts-ignore
            [formatDate,];
            const __VLS_216 = {}.ElButton;
            ({}.ElButton);
            ({}.ElButton);
            __VLS_components.ElButton;
            __VLS_components.elButton;
            __VLS_components.ElButton;
            __VLS_components.elButton;
            // @ts-ignore
            [ElButton, ElButton,];
            const __VLS_217 = __VLS_asFunctionalComponent(__VLS_216, new __VLS_216({ ...{ 'onClick': {} }, ...{ class: ("unfavorite-btn") }, title: ("取消收藏"), }));
            const __VLS_218 = __VLS_217({ ...{ 'onClick': {} }, ...{ class: ("unfavorite-btn") }, title: ("取消收藏"), }, ...__VLS_functionalComponentArgsRest(__VLS_217));
            ({}({ ...{ 'onClick': {} }, ...{ class: ("unfavorite-btn") }, title: ("取消收藏"), }));
            let __VLS_222;
            const __VLS_223 = {
                onClick: (...[$event]) => {
                    if (!(!((__VLS_ctx.favoriteArticles.length === 0))))
                        return;
                    __VLS_ctx.unfavorite(article);
                    // @ts-ignore
                    [unfavorite,];
                }
            };
            const __VLS_224 = {}.ElIcon;
            ({}.ElIcon);
            ({}.ElIcon);
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            __VLS_components.ElIcon;
            __VLS_components.elIcon;
            // @ts-ignore
            [ElIcon, ElIcon,];
            const __VLS_225 = __VLS_asFunctionalComponent(__VLS_224, new __VLS_224({}));
            const __VLS_226 = __VLS_225({}, ...__VLS_functionalComponentArgsRest(__VLS_225));
            ({}({}));
            const __VLS_230 = {}.StarFilled;
            ({}.StarFilled);
            __VLS_components.StarFilled;
            // @ts-ignore
            [StarFilled,];
            const __VLS_231 = __VLS_asFunctionalComponent(__VLS_230, new __VLS_230({}));
            const __VLS_232 = __VLS_231({}, ...__VLS_functionalComponentArgsRest(__VLS_231));
            ({}({}));
            const __VLS_235 = __VLS_pickFunctionalComponentCtx(__VLS_230, __VLS_232);
            (__VLS_229.slots).default;
            const __VLS_229 = __VLS_pickFunctionalComponentCtx(__VLS_224, __VLS_226);
            (__VLS_221.slots).default;
            const __VLS_221 = __VLS_pickFunctionalComponentCtx(__VLS_216, __VLS_218);
            let __VLS_219;
            let __VLS_220;
        }
    }
    (__VLS_191.slots).default;
    const __VLS_191 = __VLS_pickFunctionalComponentCtx(__VLS_186, __VLS_188);
    const __VLS_236 = {}.ElTabPane;
    ({}.ElTabPane);
    ({}.ElTabPane);
    __VLS_components.ElTabPane;
    __VLS_components.elTabPane;
    __VLS_components.ElTabPane;
    __VLS_components.elTabPane;
    // @ts-ignore
    [ElTabPane, ElTabPane,];
    const __VLS_237 = __VLS_asFunctionalComponent(__VLS_236, new __VLS_236({ label: ("账户设置"), name: ("settings"), }));
    const __VLS_238 = __VLS_237({ label: ("账户设置"), name: ("settings"), }, ...__VLS_functionalComponentArgsRest(__VLS_237));
    ({}({ label: ("账户设置"), name: ("settings"), }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("tab-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("settings-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("section-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("settings-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("group-title") }, });
    const __VLS_242 = {}.ElForm;
    ({}.ElForm);
    ({}.ElForm);
    __VLS_components.ElForm;
    __VLS_components.elForm;
    __VLS_components.ElForm;
    __VLS_components.elForm;
    // @ts-ignore
    [ElForm, ElForm,];
    const __VLS_243 = __VLS_asFunctionalComponent(__VLS_242, new __VLS_242({ labelPosition: ("top"), ...{ class: ("settings-form") }, }));
    const __VLS_244 = __VLS_243({ labelPosition: ("top"), ...{ class: ("settings-form") }, }, ...__VLS_functionalComponentArgsRest(__VLS_243));
    ({}({ labelPosition: ("top"), ...{ class: ("settings-form") }, }));
    const __VLS_248 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_249 = __VLS_asFunctionalComponent(__VLS_248, new __VLS_248({ label: ("用户名"), }));
    const __VLS_250 = __VLS_249({ label: ("用户名"), }, ...__VLS_functionalComponentArgsRest(__VLS_249));
    ({}({ label: ("用户名"), }));
    const __VLS_254 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_255 = __VLS_asFunctionalComponent(__VLS_254, new __VLS_254({ modelValue: ((__VLS_ctx.settings.username)), disabled: (true), }));
    const __VLS_256 = __VLS_255({ modelValue: ((__VLS_ctx.settings.username)), disabled: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_255));
    ({}({ modelValue: ((__VLS_ctx.settings.username)), disabled: (true), }));
    // @ts-ignore
    [settings,];
    const __VLS_259 = __VLS_pickFunctionalComponentCtx(__VLS_254, __VLS_256);
    (__VLS_253.slots).default;
    const __VLS_253 = __VLS_pickFunctionalComponentCtx(__VLS_248, __VLS_250);
    const __VLS_260 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_261 = __VLS_asFunctionalComponent(__VLS_260, new __VLS_260({ label: ("邮箱"), }));
    const __VLS_262 = __VLS_261({ label: ("邮箱"), }, ...__VLS_functionalComponentArgsRest(__VLS_261));
    ({}({ label: ("邮箱"), }));
    const __VLS_266 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_267 = __VLS_asFunctionalComponent(__VLS_266, new __VLS_266({ modelValue: ((__VLS_ctx.settings.email)), placeholder: ("绑定邮箱"), }));
    const __VLS_268 = __VLS_267({ modelValue: ((__VLS_ctx.settings.email)), placeholder: ("绑定邮箱"), }, ...__VLS_functionalComponentArgsRest(__VLS_267));
    ({}({ modelValue: ((__VLS_ctx.settings.email)), placeholder: ("绑定邮箱"), }));
    // @ts-ignore
    [settings,];
    const __VLS_271 = __VLS_pickFunctionalComponentCtx(__VLS_266, __VLS_268);
    (__VLS_265.slots).default;
    const __VLS_265 = __VLS_pickFunctionalComponentCtx(__VLS_260, __VLS_262);
    const __VLS_272 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_273 = __VLS_asFunctionalComponent(__VLS_272, new __VLS_272({ label: ("个人简介"), }));
    const __VLS_274 = __VLS_273({ label: ("个人简介"), }, ...__VLS_functionalComponentArgsRest(__VLS_273));
    ({}({ label: ("个人简介"), }));
    const __VLS_278 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_279 = __VLS_asFunctionalComponent(__VLS_278, new __VLS_278({ modelValue: ((__VLS_ctx.settings.bio)), type: ("textarea"), rows: ((3)), placeholder: ("介绍一下自己"), }));
    const __VLS_280 = __VLS_279({ modelValue: ((__VLS_ctx.settings.bio)), type: ("textarea"), rows: ((3)), placeholder: ("介绍一下自己"), }, ...__VLS_functionalComponentArgsRest(__VLS_279));
    ({}({ modelValue: ((__VLS_ctx.settings.bio)), type: ("textarea"), rows: ((3)), placeholder: ("介绍一下自己"), }));
    // @ts-ignore
    [settings,];
    const __VLS_283 = __VLS_pickFunctionalComponentCtx(__VLS_278, __VLS_280);
    (__VLS_277.slots).default;
    const __VLS_277 = __VLS_pickFunctionalComponentCtx(__VLS_272, __VLS_274);
    const __VLS_284 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_285 = __VLS_asFunctionalComponent(__VLS_284, new __VLS_284({ label: ("地区"), }));
    const __VLS_286 = __VLS_285({ label: ("地区"), }, ...__VLS_functionalComponentArgsRest(__VLS_285));
    ({}({ label: ("地区"), }));
    const __VLS_290 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_291 = __VLS_asFunctionalComponent(__VLS_290, new __VLS_290({ modelValue: ((__VLS_ctx.settings.location)), placeholder: ("所在地区"), }));
    const __VLS_292 = __VLS_291({ modelValue: ((__VLS_ctx.settings.location)), placeholder: ("所在地区"), }, ...__VLS_functionalComponentArgsRest(__VLS_291));
    ({}({ modelValue: ((__VLS_ctx.settings.location)), placeholder: ("所在地区"), }));
    // @ts-ignore
    [settings,];
    const __VLS_295 = __VLS_pickFunctionalComponentCtx(__VLS_290, __VLS_292);
    (__VLS_289.slots).default;
    const __VLS_289 = __VLS_pickFunctionalComponentCtx(__VLS_284, __VLS_286);
    (__VLS_247.slots).default;
    const __VLS_247 = __VLS_pickFunctionalComponentCtx(__VLS_242, __VLS_244);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("settings-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("group-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("setting-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("setting-info") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("setting-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("setting-desc") }, });
    const __VLS_296 = {}.ElSwitch;
    ({}.ElSwitch);
    __VLS_components.ElSwitch;
    __VLS_components.elSwitch;
    // @ts-ignore
    [ElSwitch,];
    const __VLS_297 = __VLS_asFunctionalComponent(__VLS_296, new __VLS_296({ modelValue: ((__VLS_ctx.settings.notifyUpdates)), }));
    const __VLS_298 = __VLS_297({ modelValue: ((__VLS_ctx.settings.notifyUpdates)), }, ...__VLS_functionalComponentArgsRest(__VLS_297));
    ({}({ modelValue: ((__VLS_ctx.settings.notifyUpdates)), }));
    // @ts-ignore
    [settings,];
    const __VLS_301 = __VLS_pickFunctionalComponentCtx(__VLS_296, __VLS_298);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("setting-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("setting-info") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("setting-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("setting-desc") }, });
    const __VLS_302 = {}.ElSwitch;
    ({}.ElSwitch);
    __VLS_components.ElSwitch;
    __VLS_components.elSwitch;
    // @ts-ignore
    [ElSwitch,];
    const __VLS_303 = __VLS_asFunctionalComponent(__VLS_302, new __VLS_302({ modelValue: ((__VLS_ctx.settings.notifyReplies)), }));
    const __VLS_304 = __VLS_303({ modelValue: ((__VLS_ctx.settings.notifyReplies)), }, ...__VLS_functionalComponentArgsRest(__VLS_303));
    ({}({ modelValue: ((__VLS_ctx.settings.notifyReplies)), }));
    // @ts-ignore
    [settings,];
    const __VLS_307 = __VLS_pickFunctionalComponentCtx(__VLS_302, __VLS_304);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("setting-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("setting-info") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("setting-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("setting-desc") }, });
    const __VLS_308 = {}.ElSwitch;
    ({}.ElSwitch);
    __VLS_components.ElSwitch;
    __VLS_components.elSwitch;
    // @ts-ignore
    [ElSwitch,];
    const __VLS_309 = __VLS_asFunctionalComponent(__VLS_308, new __VLS_308({ modelValue: ((__VLS_ctx.settings.notifyWeekly)), }));
    const __VLS_310 = __VLS_309({ modelValue: ((__VLS_ctx.settings.notifyWeekly)), }, ...__VLS_functionalComponentArgsRest(__VLS_309));
    ({}({ modelValue: ((__VLS_ctx.settings.notifyWeekly)), }));
    // @ts-ignore
    [settings,];
    const __VLS_313 = __VLS_pickFunctionalComponentCtx(__VLS_308, __VLS_310);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("settings-actions") }, });
    const __VLS_314 = {}.ElButton;
    ({}.ElButton);
    ({}.ElButton);
    __VLS_components.ElButton;
    __VLS_components.elButton;
    __VLS_components.ElButton;
    __VLS_components.elButton;
    // @ts-ignore
    [ElButton, ElButton,];
    const __VLS_315 = __VLS_asFunctionalComponent(__VLS_314, new __VLS_314({ ...{ 'onClick': {} }, type: ("primary"), loading: ((__VLS_ctx.saving)), }));
    const __VLS_316 = __VLS_315({ ...{ 'onClick': {} }, type: ("primary"), loading: ((__VLS_ctx.saving)), }, ...__VLS_functionalComponentArgsRest(__VLS_315));
    ({}({ ...{ 'onClick': {} }, type: ("primary"), loading: ((__VLS_ctx.saving)), }));
    let __VLS_320;
    const __VLS_321 = {
        onClick: (__VLS_ctx.saveSettings)
    };
    // @ts-ignore
    [saving, saveSettings,];
    (__VLS_319.slots).default;
    const __VLS_319 = __VLS_pickFunctionalComponentCtx(__VLS_314, __VLS_316);
    let __VLS_317;
    let __VLS_318;
    (__VLS_241.slots).default;
    const __VLS_241 = __VLS_pickFunctionalComponentCtx(__VLS_236, __VLS_238);
    (__VLS_67.slots).default;
    const __VLS_67 = __VLS_pickFunctionalComponentCtx(__VLS_62, __VLS_64);
    const __VLS_322 = {}.ElDialog;
    ({}.ElDialog);
    ({}.ElDialog);
    __VLS_components.ElDialog;
    __VLS_components.elDialog;
    __VLS_components.ElDialog;
    __VLS_components.elDialog;
    // @ts-ignore
    [ElDialog, ElDialog,];
    const __VLS_323 = __VLS_asFunctionalComponent(__VLS_322, new __VLS_322({ modelValue: ((__VLS_ctx.showEditDialog)), title: ("编辑个人资料"), width: ("500px"), ...{ class: ("edit-dialog") }, }));
    const __VLS_324 = __VLS_323({ modelValue: ((__VLS_ctx.showEditDialog)), title: ("编辑个人资料"), width: ("500px"), ...{ class: ("edit-dialog") }, }, ...__VLS_functionalComponentArgsRest(__VLS_323));
    ({}({ modelValue: ((__VLS_ctx.showEditDialog)), title: ("编辑个人资料"), width: ("500px"), ...{ class: ("edit-dialog") }, }));
    const __VLS_328 = {}.ElForm;
    ({}.ElForm);
    ({}.ElForm);
    __VLS_components.ElForm;
    __VLS_components.elForm;
    __VLS_components.ElForm;
    __VLS_components.elForm;
    // @ts-ignore
    [ElForm, ElForm,];
    const __VLS_329 = __VLS_asFunctionalComponent(__VLS_328, new __VLS_328({ model: ((__VLS_ctx.editForm)), labelPosition: ("top"), }));
    const __VLS_330 = __VLS_329({ model: ((__VLS_ctx.editForm)), labelPosition: ("top"), }, ...__VLS_functionalComponentArgsRest(__VLS_329));
    ({}({ model: ((__VLS_ctx.editForm)), labelPosition: ("top"), }));
    const __VLS_334 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_335 = __VLS_asFunctionalComponent(__VLS_334, new __VLS_334({ label: ("用户名"), }));
    const __VLS_336 = __VLS_335({ label: ("用户名"), }, ...__VLS_functionalComponentArgsRest(__VLS_335));
    ({}({ label: ("用户名"), }));
    const __VLS_340 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_341 = __VLS_asFunctionalComponent(__VLS_340, new __VLS_340({ modelValue: ((__VLS_ctx.editForm.username)), disabled: (true), }));
    const __VLS_342 = __VLS_341({ modelValue: ((__VLS_ctx.editForm.username)), disabled: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_341));
    ({}({ modelValue: ((__VLS_ctx.editForm.username)), disabled: (true), }));
    // @ts-ignore
    [showEditDialog, editForm, editForm,];
    const __VLS_345 = __VLS_pickFunctionalComponentCtx(__VLS_340, __VLS_342);
    (__VLS_339.slots).default;
    const __VLS_339 = __VLS_pickFunctionalComponentCtx(__VLS_334, __VLS_336);
    const __VLS_346 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_347 = __VLS_asFunctionalComponent(__VLS_346, new __VLS_346({ label: ("个人简介"), }));
    const __VLS_348 = __VLS_347({ label: ("个人简介"), }, ...__VLS_functionalComponentArgsRest(__VLS_347));
    ({}({ label: ("个人简介"), }));
    const __VLS_352 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_353 = __VLS_asFunctionalComponent(__VLS_352, new __VLS_352({ modelValue: ((__VLS_ctx.editForm.bio)), type: ("textarea"), rows: ((3)), placeholder: ("介绍一下自己"), }));
    const __VLS_354 = __VLS_353({ modelValue: ((__VLS_ctx.editForm.bio)), type: ("textarea"), rows: ((3)), placeholder: ("介绍一下自己"), }, ...__VLS_functionalComponentArgsRest(__VLS_353));
    ({}({ modelValue: ((__VLS_ctx.editForm.bio)), type: ("textarea"), rows: ((3)), placeholder: ("介绍一下自己"), }));
    // @ts-ignore
    [editForm,];
    const __VLS_357 = __VLS_pickFunctionalComponentCtx(__VLS_352, __VLS_354);
    (__VLS_351.slots).default;
    const __VLS_351 = __VLS_pickFunctionalComponentCtx(__VLS_346, __VLS_348);
    const __VLS_358 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_359 = __VLS_asFunctionalComponent(__VLS_358, new __VLS_358({ label: ("地区"), }));
    const __VLS_360 = __VLS_359({ label: ("地区"), }, ...__VLS_functionalComponentArgsRest(__VLS_359));
    ({}({ label: ("地区"), }));
    const __VLS_364 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_365 = __VLS_asFunctionalComponent(__VLS_364, new __VLS_364({ modelValue: ((__VLS_ctx.editForm.location)), placeholder: ("所在地区"), }));
    const __VLS_366 = __VLS_365({ modelValue: ((__VLS_ctx.editForm.location)), placeholder: ("所在地区"), }, ...__VLS_functionalComponentArgsRest(__VLS_365));
    ({}({ modelValue: ((__VLS_ctx.editForm.location)), placeholder: ("所在地区"), }));
    // @ts-ignore
    [editForm,];
    const __VLS_369 = __VLS_pickFunctionalComponentCtx(__VLS_364, __VLS_366);
    (__VLS_363.slots).default;
    const __VLS_363 = __VLS_pickFunctionalComponentCtx(__VLS_358, __VLS_360);
    (__VLS_333.slots).default;
    const __VLS_333 = __VLS_pickFunctionalComponentCtx(__VLS_328, __VLS_330);
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        (__VLS_327.slots).footer;
        const __VLS_370 = {}.ElButton;
        ({}.ElButton);
        ({}.ElButton);
        __VLS_components.ElButton;
        __VLS_components.elButton;
        __VLS_components.ElButton;
        __VLS_components.elButton;
        // @ts-ignore
        [ElButton, ElButton,];
        const __VLS_371 = __VLS_asFunctionalComponent(__VLS_370, new __VLS_370({ ...{ 'onClick': {} }, }));
        const __VLS_372 = __VLS_371({ ...{ 'onClick': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_371));
        ({}({ ...{ 'onClick': {} }, }));
        let __VLS_376;
        const __VLS_377 = {
            onClick: (...[$event]) => {
                __VLS_ctx.showEditDialog = false;
                // @ts-ignore
                [showEditDialog,];
            }
        };
        (__VLS_375.slots).default;
        const __VLS_375 = __VLS_pickFunctionalComponentCtx(__VLS_370, __VLS_372);
        let __VLS_373;
        let __VLS_374;
        const __VLS_378 = {}.ElButton;
        ({}.ElButton);
        ({}.ElButton);
        __VLS_components.ElButton;
        __VLS_components.elButton;
        __VLS_components.ElButton;
        __VLS_components.elButton;
        // @ts-ignore
        [ElButton, ElButton,];
        const __VLS_379 = __VLS_asFunctionalComponent(__VLS_378, new __VLS_378({ ...{ 'onClick': {} }, type: ("primary"), }));
        const __VLS_380 = __VLS_379({ ...{ 'onClick': {} }, type: ("primary"), }, ...__VLS_functionalComponentArgsRest(__VLS_379));
        ({}({ ...{ 'onClick': {} }, type: ("primary"), }));
        let __VLS_384;
        const __VLS_385 = {
            onClick: (__VLS_ctx.saveProfile)
        };
        // @ts-ignore
        [saveProfile,];
        (__VLS_383.slots).default;
        const __VLS_383 = __VLS_pickFunctionalComponentCtx(__VLS_378, __VLS_380);
        let __VLS_381;
        let __VLS_382;
    }
    const __VLS_327 = __VLS_pickFunctionalComponentCtx(__VLS_322, __VLS_324);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['profile-container'];
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['profile-header'];
        __VLS_styleScopedClasses['profile-cover'];
        __VLS_styleScopedClasses['profile-info'];
        __VLS_styleScopedClasses['avatar-wrapper'];
        __VLS_styleScopedClasses['profile-avatar'];
        __VLS_styleScopedClasses['avatar-edit-btn'];
        __VLS_styleScopedClasses['user-details'];
        __VLS_styleScopedClasses['username'];
        __VLS_styleScopedClasses['user-bio'];
        __VLS_styleScopedClasses['user-meta'];
        __VLS_styleScopedClasses['meta-item'];
        __VLS_styleScopedClasses['meta-item'];
        __VLS_styleScopedClasses['edit-profile-btn'];
        __VLS_styleScopedClasses['profile-content'];
        __VLS_styleScopedClasses['profile-tabs'];
        __VLS_styleScopedClasses['tab-content'];
        __VLS_styleScopedClasses['section-header'];
        __VLS_styleScopedClasses['section-title'];
        __VLS_styleScopedClasses['create-btn'];
        __VLS_styleScopedClasses['empty-state'];
        __VLS_styleScopedClasses['empty-icon'];
        __VLS_styleScopedClasses['btn'];
        __VLS_styleScopedClasses['btn-primary'];
        __VLS_styleScopedClasses['articles-grid'];
        __VLS_styleScopedClasses['article-card'];
        __VLS_styleScopedClasses['article-content'];
        __VLS_styleScopedClasses['article-meta'];
        __VLS_styleScopedClasses['article-date'];
        __VLS_styleScopedClasses['article-title'];
        __VLS_styleScopedClasses['article-preview'];
        __VLS_styleScopedClasses['article-stats'];
        __VLS_styleScopedClasses['article-actions'];
        __VLS_styleScopedClasses['tab-content'];
        __VLS_styleScopedClasses['section-header'];
        __VLS_styleScopedClasses['section-title'];
        __VLS_styleScopedClasses['empty-state'];
        __VLS_styleScopedClasses['empty-icon'];
        __VLS_styleScopedClasses['btn'];
        __VLS_styleScopedClasses['btn-primary'];
        __VLS_styleScopedClasses['articles-list'];
        __VLS_styleScopedClasses['favorite-item'];
        __VLS_styleScopedClasses['favorite-info'];
        __VLS_styleScopedClasses['favorite-title'];
        __VLS_styleScopedClasses['favorite-meta'];
        __VLS_styleScopedClasses['unfavorite-btn'];
        __VLS_styleScopedClasses['tab-content'];
        __VLS_styleScopedClasses['settings-section'];
        __VLS_styleScopedClasses['section-title'];
        __VLS_styleScopedClasses['settings-group'];
        __VLS_styleScopedClasses['group-title'];
        __VLS_styleScopedClasses['settings-form'];
        __VLS_styleScopedClasses['settings-group'];
        __VLS_styleScopedClasses['group-title'];
        __VLS_styleScopedClasses['setting-item'];
        __VLS_styleScopedClasses['setting-info'];
        __VLS_styleScopedClasses['setting-label'];
        __VLS_styleScopedClasses['setting-desc'];
        __VLS_styleScopedClasses['setting-item'];
        __VLS_styleScopedClasses['setting-info'];
        __VLS_styleScopedClasses['setting-label'];
        __VLS_styleScopedClasses['setting-desc'];
        __VLS_styleScopedClasses['setting-item'];
        __VLS_styleScopedClasses['setting-info'];
        __VLS_styleScopedClasses['setting-label'];
        __VLS_styleScopedClasses['setting-desc'];
        __VLS_styleScopedClasses['settings-actions'];
        __VLS_styleScopedClasses['edit-dialog'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {
                Camera: Camera,
                Calendar: Calendar,
                Location: Location,
                Edit: Edit,
                Plus: Plus,
                Document: Document,
                View: View,
                Star: Star,
                StarFilled: StarFilled,
                Delete: Delete,
                activeTab: activeTab,
                showEditDialog: showEditDialog,
                showAvatarDialog: showAvatarDialog,
                saving: saving,
                myArticles: myArticles,
                favoriteArticles: favoriteArticles,
                userInfo: userInfo,
                editForm: editForm,
                settings: settings,
                formatDate: formatDate,
                editArticle: editArticle,
                deleteArticle: deleteArticle,
                unfavorite: unfavorite,
                saveProfile: saveProfile,
                saveSettings: saveSettings,
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
