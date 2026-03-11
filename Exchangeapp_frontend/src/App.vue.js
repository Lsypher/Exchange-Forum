import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from './store/auth';
import { ArrowDown, Edit } from '@element-plus/icons-vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const activeIndex = ref(route.name?.toString() || 'home');
const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNFOEU4RTgiLz4KPHBhdGggZD0iTTE2IDE2QzE4LjIwOTEgMTYgMjAgMTQuMjA5MSAyMCAxMkMyMCAxMC44OTU0IDE5LjY0MTEgOS44NTY5MSAxOSAzQzE4LjM1ODkgMy4wMTc2MiAxNy43MzQ5IDMuMTc1MTkgMTcuMTkgMy40NkMxNi42NDUgMy43NDQ4MSAxNi4xNzU5IDQuMTQ5MjYgMTUuODIgNC42NEwxNSA2TDE0LjE4IDQuNjRDMTMuODI0MSA0LjE0OTI2IDEzLjM1NTIgMy43NDQ4MSAxMi44MSAzLjQ2QzEyLjI2NTIgMy4xNzUxOSAxMS42NDExIDMuMDE3NjIgMTEgM0MxMC4zNTg5IDMuMDE3NjIgOS43MzQ5MSAzLjE3NTE5IDkuMTkgMy40NkM4LjY0NTI1IDMuNzQ0ODEgOC4xNzU5MSA0LjE0OTI2IDcuODIgNC42NEw3IDZMNi4xOCA0LjY0QzUuODI0MDkgNC4xNDkyNiA1LjM1NTEyIDMuNzQ0ODEgNC44MSAzLjQ2QzQuMjY1MTIgMy4xNzUxOSAzLjY0MTEyIDMuMDE3NjIgMyAzQzMuMzU4OTEgMy4wMTc2MiAzLjk4MjgxIDMuMTc1MTkgNC41MyAzLjQ2QzUuMDc3ODEgMy43NDQ4MSA1LjU0NjI1IDQuMTQ5MjYgNS45IDQuNjRMNyA2TDcuOSA0LjY0QzguMjU1OTEgNC4xNDkyNiA4LjcyMzQ0IDMuNzQ0ODEgOS4yNyAzLjQ2QzkuODE2NTYgMy4xNzUxOSAxMC40MzkxIDMuMDE3NjIgMTEgM0MxMS42MDkxIDMuMDE3NjIgMTIuMjM0OSAzLjE3NTE5IDEyLjc4IDMuNDZDMTMuMzI0MSAzLjc0NDgxIDEzLjc5MjUgNC4xNDkyNiAxNC4xOCA0LjY0TDEzIDZMMTMuODIgNC42NEMxNC4xNzU5IDQuMTQ5MjYgMTQuNjQ1MyAzLjc0NDgxIDE1LjE5IDMuNDZDMTUuNzM0OSAzLjE3NTE5IDE2LjM1ODkgMy4wMTc2MiAxNyAzQzE3LjY0MTEgMy4wMTc2MiAxOC4yNjU5IDMuMTc1MTkgMTguODEgMy40NkMxOS4zNTQ5IDMuNzQ0ODEgMTkuODI0MSA0LjE0OTI2IDIwLjE4IDQuNjRMMjEgNkwyMC4xOCA0LjY0QzE5LjgyNDEgNC4xNDkyNiAxOS4zNTUzIDMuNzQ0ODEgMTguODEgMy40NkMxOC4yNjU5IDMuMTc1MTkgMTcuNjQxMSAzLjAxNzYyIDE3IDNDMTYuMzU4OSAzLjAxNzYyIDE1LjczNDkgMy4xNzUxOSAxNS4xOSAzLjQ2QzE0LjY0NTMgMy43NDQ4MSAxNC4xNzU5IDQuMTQ5MjYgMTMuODIgNC42NEwxNSA2TDE0LjE4IDQuNjRDMTMuODI0MSA0LjE0OTI2IDEzLjM1NTIgMy43NDQ4MSAxMi44MSAzLjQ2QzEyLjI2NTIgMy4xNzUxOSAxMS42NDExIDMuMDE3NjIgMTEgM0MxMC4zNTg5IDMuMDE3NjIgOS43MzQ5MSAzLjE3NTE5IDkuMTkgMy40NkM4LjY0NTI1IDMuNzQ0ODEgOC4xNzU5MSA0LjE0OTI2IDcuODIgNC42NEw3IDZMNi4xOCA0LjY0QzUuODI0MDkgNC4xNDkyNiA1LjM1NTEyIDMuNzQ0ODEgNC44MSAzLjQ2QzQuMjY1MTIgMy4xNzUxOSAzLjY0MTEyIDMuMDE3NjIgMyAzWiIgZmlsbD0iIzk5OTk5Ii8+Cjwvc3ZnPgo=';
watch(route, (newRoute) => {
    activeIndex.value = newRoute.name?.toString() || 'home';
});
const handleSelect = (key) => {
    if (key === 'logout') {
        authStore.logout();
        router.push({ name: 'Home' });
    }
    else {
        router.push({ name: key.charAt(0).toUpperCase() + key.slice(1) });
    }
};
const handleUserMenu = (command) => {
    if (command === 'logout') {
        authStore.logout();
        router.push({ name: 'Home' });
    }
    else if (command === 'profile') {
        router.push({ name: 'UserProfile' });
    }
    else if (command === 'settings') {
        router.push({ name: 'UserProfile', query: { tab: 'settings' } });
    }
    else if (command === 'create') {
        router.push({ name: 'CreateArticle' });
    }
};
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
    const __VLS_0 = {}.ElContainer;
    ({}.ElContainer);
    ({}.ElContainer);
    __VLS_components.ElContainer;
    __VLS_components.elContainer;
    __VLS_components.ElContainer;
    __VLS_components.elContainer;
    // @ts-ignore
    [ElContainer, ElContainer,];
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({}));
    const __VLS_6 = {}.ElHeader;
    ({}.ElHeader);
    ({}.ElHeader);
    __VLS_components.ElHeader;
    __VLS_components.elHeader;
    __VLS_components.ElHeader;
    __VLS_components.elHeader;
    // @ts-ignore
    [ElHeader, ElHeader,];
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    ({}({}));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("header-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("header-left") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("logo") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("logo-text") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({ ...{ class: ("header-nav") }, });
    const __VLS_12 = {}.RouterLink;
    ({}.RouterLink);
    ({}.RouterLink);
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    // @ts-ignore
    [RouterLink, RouterLink,];
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ to: ("/"), ...{ class: ("header-nav-link") }, ...{ class: (({ active: __VLS_ctx.$route.name === 'Home' })) }, }));
    const __VLS_14 = __VLS_13({ to: ("/"), ...{ class: ("header-nav-link") }, ...{ class: (({ active: __VLS_ctx.$route.name === 'Home' })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    ({}({ to: ("/"), ...{ class: ("header-nav-link") }, ...{ class: (({ active: __VLS_ctx.$route.name === 'Home' })) }, }));
    __VLS_styleScopedClasses = ({ active: $route.name === 'Home' });
    // @ts-ignore
    [$route,];
    (__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    const __VLS_18 = {}.RouterLink;
    ({}.RouterLink);
    ({}.RouterLink);
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    // @ts-ignore
    [RouterLink, RouterLink,];
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ to: ("/exchanges"), ...{ class: ("header-nav-link") }, ...{ class: (({ active: __VLS_ctx.$route.name === 'CurrencyExchange' })) }, }));
    const __VLS_20 = __VLS_19({ to: ("/exchanges"), ...{ class: ("header-nav-link") }, ...{ class: (({ active: __VLS_ctx.$route.name === 'CurrencyExchange' })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    ({}({ to: ("/exchanges"), ...{ class: ("header-nav-link") }, ...{ class: (({ active: __VLS_ctx.$route.name === 'CurrencyExchange' })) }, }));
    __VLS_styleScopedClasses = ({ active: $route.name === 'CurrencyExchange' });
    // @ts-ignore
    [$route,];
    (__VLS_23.slots).default;
    const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
    const __VLS_24 = {}.RouterLink;
    ({}.RouterLink);
    ({}.RouterLink);
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    // @ts-ignore
    [RouterLink, RouterLink,];
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ to: ("/articles"), ...{ class: ("header-nav-link") }, ...{ class: (({ active: __VLS_ctx.$route.name === 'News' })) }, }));
    const __VLS_26 = __VLS_25({ to: ("/articles"), ...{ class: ("header-nav-link") }, ...{ class: (({ active: __VLS_ctx.$route.name === 'News' })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    ({}({ to: ("/articles"), ...{ class: ("header-nav-link") }, ...{ class: (({ active: __VLS_ctx.$route.name === 'News' })) }, }));
    __VLS_styleScopedClasses = ({ active: $route.name === 'News' });
    // @ts-ignore
    [$route,];
    (__VLS_29.slots).default;
    const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("header-right") }, });
    if (!__VLS_ctx.authStore.isAuthenticated) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("header-nav") }, });
        const __VLS_30 = {}.RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ to: ("/login"), ...{ class: ("header-nav-link") }, }));
        const __VLS_32 = __VLS_31({ to: ("/login"), ...{ class: ("header-nav-link") }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        ({}({ to: ("/login"), ...{ class: ("header-nav-link") }, }));
        // @ts-ignore
        [authStore,];
        (__VLS_35.slots).default;
        const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
        const __VLS_36 = {}.RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ to: ("/register"), ...{ class: ("btn btn-secondary header-btn") }, }));
        const __VLS_38 = __VLS_37({ to: ("/register"), ...{ class: ("btn btn-secondary header-btn") }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        ({}({ to: ("/register"), ...{ class: ("btn btn-secondary header-btn") }, }));
        (__VLS_41.slots).default;
        const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("user-menu") }, });
        const __VLS_42 = {}.RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ to: ("/articles/create"), ...{ class: ("create-article-btn") }, }));
        const __VLS_44 = __VLS_43({ to: ("/articles/create"), ...{ class: ("create-article-btn") }, }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        ({}({ to: ("/articles/create"), ...{ class: ("create-article-btn") }, }));
        const __VLS_48 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({}));
        const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
        ({}({}));
        const __VLS_54 = {}.Edit;
        ({}.Edit);
        __VLS_components.Edit;
        // @ts-ignore
        [Edit,];
        const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({}));
        const __VLS_56 = __VLS_55({}, ...__VLS_functionalComponentArgsRest(__VLS_55));
        ({}({}));
        const __VLS_59 = __VLS_pickFunctionalComponentCtx(__VLS_54, __VLS_56);
        (__VLS_53.slots).default;
        const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_48, __VLS_50);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_47.slots).default;
        const __VLS_47 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44);
        const __VLS_60 = {}.ElDropdown;
        ({}.ElDropdown);
        ({}.ElDropdown);
        __VLS_components.ElDropdown;
        __VLS_components.elDropdown;
        __VLS_components.ElDropdown;
        __VLS_components.elDropdown;
        // @ts-ignore
        [ElDropdown, ElDropdown,];
        const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({ ...{ 'onCommand': {} }, }));
        const __VLS_62 = __VLS_61({ ...{ 'onCommand': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_61));
        ({}({ ...{ 'onCommand': {} }, }));
        let __VLS_66;
        const __VLS_67 = {
            onCommand: (__VLS_ctx.handleUserMenu)
        };
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("user-avatar") }, });
        const __VLS_68 = {}.ElAvatar;
        ({}.ElAvatar);
        ({}.ElAvatar);
        __VLS_components.ElAvatar;
        __VLS_components.elAvatar;
        __VLS_components.ElAvatar;
        __VLS_components.elAvatar;
        // @ts-ignore
        [ElAvatar, ElAvatar,];
        const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({ size: ((32)), src: ((__VLS_ctx.authStore.user?.avatar || __VLS_ctx.defaultAvatar)), }));
        const __VLS_70 = __VLS_69({ size: ((32)), src: ((__VLS_ctx.authStore.user?.avatar || __VLS_ctx.defaultAvatar)), }, ...__VLS_functionalComponentArgsRest(__VLS_69));
        ({}({ size: ((32)), src: ((__VLS_ctx.authStore.user?.avatar || __VLS_ctx.defaultAvatar)), }));
        (__VLS_ctx.authStore.user?.username?.charAt(0).toUpperCase());
        // @ts-ignore
        [authStore, authStore, handleUserMenu, defaultAvatar,];
        (__VLS_73.slots).default;
        const __VLS_73 = __VLS_pickFunctionalComponentCtx(__VLS_68, __VLS_70);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("username") }, });
        (__VLS_ctx.authStore.user?.username);
        // @ts-ignore
        [authStore,];
        const __VLS_74 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({ ...{ class: ("dropdown-icon") }, }));
        const __VLS_76 = __VLS_75({ ...{ class: ("dropdown-icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_75));
        ({}({ ...{ class: ("dropdown-icon") }, }));
        const __VLS_80 = {}.ArrowDown;
        ({}.ArrowDown);
        __VLS_components.ArrowDown;
        __VLS_components.arrowDown;
        // @ts-ignore
        [ArrowDown,];
        const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({}));
        const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
        ({}({}));
        const __VLS_85 = __VLS_pickFunctionalComponentCtx(__VLS_80, __VLS_82);
        (__VLS_79.slots).default;
        const __VLS_79 = __VLS_pickFunctionalComponentCtx(__VLS_74, __VLS_76);
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            (__VLS_65.slots).dropdown;
            const __VLS_86 = {}.ElDropdownMenu;
            ({}.ElDropdownMenu);
            ({}.ElDropdownMenu);
            __VLS_components.ElDropdownMenu;
            __VLS_components.elDropdownMenu;
            __VLS_components.ElDropdownMenu;
            __VLS_components.elDropdownMenu;
            // @ts-ignore
            [ElDropdownMenu, ElDropdownMenu,];
            const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({}));
            const __VLS_88 = __VLS_87({}, ...__VLS_functionalComponentArgsRest(__VLS_87));
            ({}({}));
            const __VLS_92 = {}.ElDropdownItem;
            ({}.ElDropdownItem);
            ({}.ElDropdownItem);
            __VLS_components.ElDropdownItem;
            __VLS_components.elDropdownItem;
            __VLS_components.ElDropdownItem;
            __VLS_components.elDropdownItem;
            // @ts-ignore
            [ElDropdownItem, ElDropdownItem,];
            const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({ command: ("create"), }));
            const __VLS_94 = __VLS_93({ command: ("create"), }, ...__VLS_functionalComponentArgsRest(__VLS_93));
            ({}({ command: ("create"), }));
            (__VLS_97.slots).default;
            const __VLS_97 = __VLS_pickFunctionalComponentCtx(__VLS_92, __VLS_94);
            const __VLS_98 = {}.ElDropdownItem;
            ({}.ElDropdownItem);
            ({}.ElDropdownItem);
            __VLS_components.ElDropdownItem;
            __VLS_components.elDropdownItem;
            __VLS_components.ElDropdownItem;
            __VLS_components.elDropdownItem;
            // @ts-ignore
            [ElDropdownItem, ElDropdownItem,];
            const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({ command: ("profile"), }));
            const __VLS_100 = __VLS_99({ command: ("profile"), }, ...__VLS_functionalComponentArgsRest(__VLS_99));
            ({}({ command: ("profile"), }));
            (__VLS_103.slots).default;
            const __VLS_103 = __VLS_pickFunctionalComponentCtx(__VLS_98, __VLS_100);
            const __VLS_104 = {}.ElDropdownItem;
            ({}.ElDropdownItem);
            ({}.ElDropdownItem);
            __VLS_components.ElDropdownItem;
            __VLS_components.elDropdownItem;
            __VLS_components.ElDropdownItem;
            __VLS_components.elDropdownItem;
            // @ts-ignore
            [ElDropdownItem, ElDropdownItem,];
            const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({ command: ("settings"), }));
            const __VLS_106 = __VLS_105({ command: ("settings"), }, ...__VLS_functionalComponentArgsRest(__VLS_105));
            ({}({ command: ("settings"), }));
            (__VLS_109.slots).default;
            const __VLS_109 = __VLS_pickFunctionalComponentCtx(__VLS_104, __VLS_106);
            const __VLS_110 = {}.ElDropdownItem;
            ({}.ElDropdownItem);
            ({}.ElDropdownItem);
            __VLS_components.ElDropdownItem;
            __VLS_components.elDropdownItem;
            __VLS_components.ElDropdownItem;
            __VLS_components.elDropdownItem;
            // @ts-ignore
            [ElDropdownItem, ElDropdownItem,];
            const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({ divided: (true), command: ("logout"), }));
            const __VLS_112 = __VLS_111({ divided: (true), command: ("logout"), }, ...__VLS_functionalComponentArgsRest(__VLS_111));
            ({}({ divided: (true), command: ("logout"), }));
            (__VLS_115.slots).default;
            const __VLS_115 = __VLS_pickFunctionalComponentCtx(__VLS_110, __VLS_112);
            (__VLS_91.slots).default;
            const __VLS_91 = __VLS_pickFunctionalComponentCtx(__VLS_86, __VLS_88);
        }
        const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_60, __VLS_62);
        let __VLS_63;
        let __VLS_64;
    }
    (__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    const __VLS_116 = {}.ElMain;
    ({}.ElMain);
    ({}.ElMain);
    __VLS_components.ElMain;
    __VLS_components.elMain;
    __VLS_components.ElMain;
    __VLS_components.elMain;
    // @ts-ignore
    [ElMain, ElMain,];
    const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({}));
    const __VLS_118 = __VLS_117({}, ...__VLS_functionalComponentArgsRest(__VLS_117));
    ({}({}));
    const __VLS_122 = {}.RouterView;
    ({}.RouterView);
    ({}.RouterView);
    __VLS_components.RouterView;
    __VLS_components.routerView;
    __VLS_components.RouterView;
    __VLS_components.routerView;
    // @ts-ignore
    [RouterView, RouterView,];
    const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({}));
    const __VLS_124 = __VLS_123({}, ...__VLS_functionalComponentArgsRest(__VLS_123));
    ({}({}));
    const __VLS_127 = __VLS_pickFunctionalComponentCtx(__VLS_122, __VLS_124);
    (__VLS_121.slots).default;
    const __VLS_121 = __VLS_pickFunctionalComponentCtx(__VLS_116, __VLS_118);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['header-container'];
        __VLS_styleScopedClasses['header-left'];
        __VLS_styleScopedClasses['logo'];
        __VLS_styleScopedClasses['logo-text'];
        __VLS_styleScopedClasses['header-nav'];
        __VLS_styleScopedClasses['header-nav-link'];
        __VLS_styleScopedClasses['header-nav-link'];
        __VLS_styleScopedClasses['header-nav-link'];
        __VLS_styleScopedClasses['header-right'];
        __VLS_styleScopedClasses['header-nav'];
        __VLS_styleScopedClasses['header-nav-link'];
        __VLS_styleScopedClasses['btn'];
        __VLS_styleScopedClasses['btn-secondary'];
        __VLS_styleScopedClasses['header-btn'];
        __VLS_styleScopedClasses['user-menu'];
        __VLS_styleScopedClasses['create-article-btn'];
        __VLS_styleScopedClasses['user-avatar'];
        __VLS_styleScopedClasses['username'];
        __VLS_styleScopedClasses['dropdown-icon'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {
                ArrowDown: ArrowDown,
                Edit: Edit,
                authStore: authStore,
                defaultAvatar: defaultAvatar,
                handleUserMenu: handleUserMenu,
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
