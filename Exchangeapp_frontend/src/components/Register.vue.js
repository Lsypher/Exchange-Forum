/* __placeholder__ */
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { ElMessage } from 'element-plus';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const form = ref({
    username: '',
    password: '',
    confirmPassword: '',
});
const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const isFormValid = computed(() => {
    return form.value.username &&
        form.value.password &&
        form.value.confirmPassword &&
        form.value.password === form.value.confirmPassword &&
        form.value.password.length >= 6;
});
const register = async () => {
    if (form.value.password !== form.value.confirmPassword) {
        ElMessage.error('两次输入的密码不一致');
        return;
    }
    if (form.value.password.length < 6) {
        ElMessage.error('密码长度至少为6位');
        return;
    }
    try {
        loading.value = true;
        await authStore.register(form.value.username, form.value.password);
        ElMessage.success('注册成功');
        router.push({ name: 'News' });
    }
    catch (error) {
        ElMessage.error('注册失败，请重试');
    }
    finally {
        loading.value = false;
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("auth-page") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("auth-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("auth-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("auth-header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("auth-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("auth-subtitle") }, });
    const __VLS_0 = {}.ElForm;
    ({}.ElForm);
    ({}.ElForm);
    __VLS_components.ElForm;
    __VLS_components.elForm;
    __VLS_components.ElForm;
    __VLS_components.elForm;
    // @ts-ignore
    [ElForm, ElForm,];
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onSubmit': {} }, model: ((__VLS_ctx.form)), ...{ class: ("auth-form") }, labelPosition: ("top"), }));
    const __VLS_2 = __VLS_1({ ...{ 'onSubmit': {} }, model: ((__VLS_ctx.form)), ...{ class: ("auth-form") }, labelPosition: ("top"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ ...{ 'onSubmit': {} }, model: ((__VLS_ctx.form)), ...{ class: ("auth-form") }, labelPosition: ("top"), }));
    let __VLS_6;
    const __VLS_7 = {
        onSubmit: (__VLS_ctx.register)
    };
    const __VLS_8 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ label: ("用户名"), ...{ class: ("form-item") }, required: (true), }));
    const __VLS_10 = __VLS_9({ label: ("用户名"), ...{ class: ("form-item") }, required: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    ({}({ label: ("用户名"), ...{ class: ("form-item") }, required: (true), }));
    const __VLS_14 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({ modelValue: ((__VLS_ctx.form.username)), placeholder: ("请输入用户名"), size: ("large"), ...{ class: ("auth-input") }, prefixIcon: ("User"), }));
    const __VLS_16 = __VLS_15({ modelValue: ((__VLS_ctx.form.username)), placeholder: ("请输入用户名"), size: ("large"), ...{ class: ("auth-input") }, prefixIcon: ("User"), }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    ({}({ modelValue: ((__VLS_ctx.form.username)), placeholder: ("请输入用户名"), size: ("large"), ...{ class: ("auth-input") }, prefixIcon: ("User"), }));
    // @ts-ignore
    [form, form, register,];
    const __VLS_19 = __VLS_pickFunctionalComponentCtx(__VLS_14, __VLS_16);
    (__VLS_13.slots).default;
    const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_8, __VLS_10);
    const __VLS_20 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ label: ("密码"), ...{ class: ("form-item") }, required: (true), }));
    const __VLS_22 = __VLS_21({ label: ("密码"), ...{ class: ("form-item") }, required: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    ({}({ label: ("密码"), ...{ class: ("form-item") }, required: (true), }));
    const __VLS_26 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({ modelValue: ((__VLS_ctx.form.password)), type: ("password"), placeholder: ("请输入密码（至少6位）"), size: ("large"), ...{ class: ("auth-input") }, prefixIcon: ("Lock"), showPassword: (true), }));
    const __VLS_28 = __VLS_27({ modelValue: ((__VLS_ctx.form.password)), type: ("password"), placeholder: ("请输入密码（至少6位）"), size: ("large"), ...{ class: ("auth-input") }, prefixIcon: ("Lock"), showPassword: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    ({}({ modelValue: ((__VLS_ctx.form.password)), type: ("password"), placeholder: ("请输入密码（至少6位）"), size: ("large"), ...{ class: ("auth-input") }, prefixIcon: ("Lock"), showPassword: (true), }));
    // @ts-ignore
    [form,];
    const __VLS_31 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28);
    (__VLS_25.slots).default;
    const __VLS_25 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
    const __VLS_32 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ label: ("确认密码"), ...{ class: ("form-item") }, required: (true), }));
    const __VLS_34 = __VLS_33({ label: ("确认密码"), ...{ class: ("form-item") }, required: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    ({}({ label: ("确认密码"), ...{ class: ("form-item") }, required: (true), }));
    const __VLS_38 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({ modelValue: ((__VLS_ctx.form.confirmPassword)), type: ("password"), placeholder: ("请再次输入密码"), size: ("large"), ...{ class: ("auth-input") }, prefixIcon: ("Lock"), showPassword: (true), }));
    const __VLS_40 = __VLS_39({ modelValue: ((__VLS_ctx.form.confirmPassword)), type: ("password"), placeholder: ("请再次输入密码"), size: ("large"), ...{ class: ("auth-input") }, prefixIcon: ("Lock"), showPassword: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    ({}({ modelValue: ((__VLS_ctx.form.confirmPassword)), type: ("password"), placeholder: ("请再次输入密码"), size: ("large"), ...{ class: ("auth-input") }, prefixIcon: ("Lock"), showPassword: (true), }));
    // @ts-ignore
    [form,];
    const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_38, __VLS_40);
    (__VLS_37.slots).default;
    const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
    const __VLS_44 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
    const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
    ({}({}));
    const __VLS_50 = {}.ElButton;
    ({}.ElButton);
    ({}.ElButton);
    __VLS_components.ElButton;
    __VLS_components.elButton;
    __VLS_components.ElButton;
    __VLS_components.elButton;
    // @ts-ignore
    [ElButton, ElButton,];
    const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({ type: ("primary"), nativeType: ("submit"), ...{ class: ("auth-btn") }, size: ("large"), loading: ((__VLS_ctx.loading)), disabled: ((!__VLS_ctx.isFormValid)), }));
    const __VLS_52 = __VLS_51({ type: ("primary"), nativeType: ("submit"), ...{ class: ("auth-btn") }, size: ("large"), loading: ((__VLS_ctx.loading)), disabled: ((!__VLS_ctx.isFormValid)), }, ...__VLS_functionalComponentArgsRest(__VLS_51));
    ({}({ type: ("primary"), nativeType: ("submit"), ...{ class: ("auth-btn") }, size: ("large"), loading: ((__VLS_ctx.loading)), disabled: ((!__VLS_ctx.isFormValid)), }));
    // @ts-ignore
    [loading, isFormValid,];
    (__VLS_55.slots).default;
    const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52);
    (__VLS_49.slots).default;
    const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_44, __VLS_46);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    let __VLS_3;
    let __VLS_4;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("auth-footer") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("auth-text") }, });
    const __VLS_56 = {}.RouterLink;
    ({}.RouterLink);
    ({}.RouterLink);
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    // @ts-ignore
    [RouterLink, RouterLink,];
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({ to: ("/login"), ...{ class: ("auth-link") }, }));
    const __VLS_58 = __VLS_57({ to: ("/login"), ...{ class: ("auth-link") }, }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    ({}({ to: ("/login"), ...{ class: ("auth-link") }, }));
    (__VLS_61.slots).default;
    const __VLS_61 = __VLS_pickFunctionalComponentCtx(__VLS_56, __VLS_58);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("auth-info") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("info-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("info-description") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("info-features") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['auth-page'];
        __VLS_styleScopedClasses['auth-container'];
        __VLS_styleScopedClasses['auth-card'];
        __VLS_styleScopedClasses['auth-header'];
        __VLS_styleScopedClasses['auth-title'];
        __VLS_styleScopedClasses['auth-subtitle'];
        __VLS_styleScopedClasses['auth-form'];
        __VLS_styleScopedClasses['form-item'];
        __VLS_styleScopedClasses['auth-input'];
        __VLS_styleScopedClasses['form-item'];
        __VLS_styleScopedClasses['auth-input'];
        __VLS_styleScopedClasses['form-item'];
        __VLS_styleScopedClasses['auth-input'];
        __VLS_styleScopedClasses['auth-btn'];
        __VLS_styleScopedClasses['auth-footer'];
        __VLS_styleScopedClasses['auth-text'];
        __VLS_styleScopedClasses['auth-link'];
        __VLS_styleScopedClasses['auth-info'];
        __VLS_styleScopedClasses['info-title'];
        __VLS_styleScopedClasses['info-description'];
        __VLS_styleScopedClasses['info-features'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {
                form: form,
                loading: loading,
                isFormValid: isFormValid,
                register: register,
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
