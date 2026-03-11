/* __placeholder__ */
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { ArrowLeft, Link, List, Monitor, InfoFilled, Upload, ChatLineSquare } from '@element-plus/icons-vue';
import axios from '../axios';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const formRef = ref();
const contentRef = ref();
const savingDraft = ref(false);
const publishing = ref(false);
const categories = ['市场分析', '投资策略', '货币动态', '宏观经济', '区块链', '保险理财', '房产投资', '其他'];
const form = reactive({
    title: '',
    preview: '',
    content: '',
    category: '',
    tags: '',
});
const rules = {
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' },
        { min: 5, max: 100, message: '标题长度在 5 到 100 个字符', trigger: 'blur' },
    ],
    preview: [
        { required: true, message: '请输入文章摘要', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '请输入文章内容', trigger: 'blur' },
        { min: 20, message: '内容至少需要 20 个字符', trigger: 'blur' },
    ],
};
const insertFormat = (before, after) => {
    const textarea = contentRef.value?.$refs.textarea;
    if (!textarea)
        return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = form.content.substring(start, end);
    const newText = form.content.substring(0, start) + before + selectedText + after + form.content.substring(end);
    form.content = newText;
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
};
const saveDraft = async () => {
    try {
        savingDraft.value = true;
        localStorage.setItem('article_draft', JSON.stringify(form));
        ElMessage.success('草稿已保存');
    }
    catch (error) {
        ElMessage.error('保存失败');
    }
    finally {
        savingDraft.value = false;
    }
};
const loadDraft = () => {
    const draft = localStorage.getItem('article_draft');
    if (draft) {
        try {
            const parsed = JSON.parse(draft);
            Object.assign(form, parsed);
        }
        catch (e) {
            // ignore
        }
    }
};
const publishArticle = async () => {
    try {
        await formRef.value.validate();
    }
    catch {
        ElMessage.warning('请完善文章信息');
        return;
    }
    try {
        publishing.value = true;
        await axios.post('/articles', {
            title: form.title,
            preview: form.preview,
            content: form.content,
            category: form.category,
            tags: form.tags,
        });
        ElMessage.success('文章发布成功！');
        localStorage.removeItem('article_draft');
        router.push({ name: 'News' });
    }
    catch (error) {
        ElMessage.error(error.response?.data?.message || '发布失败，请重试');
    }
    finally {
        publishing.value = false;
    }
};
loadDraft();
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("create-article-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("page-header") }, });
    const __VLS_0 = {}.RouterLink;
    ({}.RouterLink);
    ({}.RouterLink);
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    // @ts-ignore
    [RouterLink, RouterLink,];
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/articles"), ...{ class: ("back-link") }, }));
    const __VLS_2 = __VLS_1({ to: ("/articles"), ...{ class: ("back-link") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ to: ("/articles"), ...{ class: ("back-link") }, }));
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
    const __VLS_12 = {}.ArrowLeft;
    ({}.ArrowLeft);
    __VLS_components.ArrowLeft;
    // @ts-ignore
    [ArrowLeft,];
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    ({}({}));
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    (__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("page-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("page-description") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("editor-card") }, });
    const __VLS_18 = {}.ElForm;
    ({}.ElForm);
    ({}.ElForm);
    __VLS_components.ElForm;
    __VLS_components.elForm;
    __VLS_components.ElForm;
    __VLS_components.elForm;
    // @ts-ignore
    [ElForm, ElForm,];
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ model: ((__VLS_ctx.form)), rules: ((__VLS_ctx.rules)), ref: ("formRef"), labelPosition: ("top"), ...{ class: ("article-form") }, }));
    const __VLS_20 = __VLS_19({ model: ((__VLS_ctx.form)), rules: ((__VLS_ctx.rules)), ref: ("formRef"), labelPosition: ("top"), ...{ class: ("article-form") }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    ({}({ model: ((__VLS_ctx.form)), rules: ((__VLS_ctx.rules)), ref: ("formRef"), labelPosition: ("top"), ...{ class: ("article-form") }, }));
    // @ts-ignore
    (__VLS_ctx.formRef);
    const __VLS_24 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ label: ("文章标题"), prop: ("title"), }));
    const __VLS_26 = __VLS_25({ label: ("文章标题"), prop: ("title"), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    ({}({ label: ("文章标题"), prop: ("title"), }));
    const __VLS_30 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ modelValue: ((__VLS_ctx.form.title)), placeholder: ("输入引人注目的标题..."), size: ("large"), ...{ class: ("title-input") }, maxlength: ("100"), showWordLimit: (true), }));
    const __VLS_32 = __VLS_31({ modelValue: ((__VLS_ctx.form.title)), placeholder: ("输入引人注目的标题..."), size: ("large"), ...{ class: ("title-input") }, maxlength: ("100"), showWordLimit: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    ({}({ modelValue: ((__VLS_ctx.form.title)), placeholder: ("输入引人注目的标题..."), size: ("large"), ...{ class: ("title-input") }, maxlength: ("100"), showWordLimit: (true), }));
    // @ts-ignore
    [form, form, rules, formRef,];
    const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
    (__VLS_29.slots).default;
    const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-row") }, });
    const __VLS_36 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ label: ("分类"), prop: ("category"), ...{ class: ("form-col") }, }));
    const __VLS_38 = __VLS_37({ label: ("分类"), prop: ("category"), ...{ class: ("form-col") }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    ({}({ label: ("分类"), prop: ("category"), ...{ class: ("form-col") }, }));
    const __VLS_42 = {}.ElSelect;
    ({}.ElSelect);
    ({}.ElSelect);
    __VLS_components.ElSelect;
    __VLS_components.elSelect;
    __VLS_components.ElSelect;
    __VLS_components.elSelect;
    // @ts-ignore
    [ElSelect, ElSelect,];
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ modelValue: ((__VLS_ctx.form.category)), placeholder: ("选择分类"), size: ("large"), ...{ class: ("category-select") }, }));
    const __VLS_44 = __VLS_43({ modelValue: ((__VLS_ctx.form.category)), placeholder: ("选择分类"), size: ("large"), ...{ class: ("category-select") }, }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    ({}({ modelValue: ((__VLS_ctx.form.category)), placeholder: ("选择分类"), size: ("large"), ...{ class: ("category-select") }, }));
    for (const [cat] of __VLS_getVForSourceType((__VLS_ctx.categories))) {
        const __VLS_48 = {}.ElOption;
        ({}.ElOption);
        __VLS_components.ElOption;
        __VLS_components.elOption;
        // @ts-ignore
        [ElOption,];
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ key: ((cat)), label: ((cat)), value: ((cat)), }));
        const __VLS_50 = __VLS_49({ key: ((cat)), label: ((cat)), value: ((cat)), }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        ({}({ key: ((cat)), label: ((cat)), value: ((cat)), }));
        // @ts-ignore
        [form, categories,];
        const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_48, __VLS_50);
    }
    (__VLS_47.slots).default;
    const __VLS_47 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44);
    (__VLS_41.slots).default;
    const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
    const __VLS_54 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ label: ("标签"), ...{ class: ("form-col") }, }));
    const __VLS_56 = __VLS_55({ label: ("标签"), ...{ class: ("form-col") }, }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    ({}({ label: ("标签"), ...{ class: ("form-col") }, }));
    const __VLS_60 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({ modelValue: ((__VLS_ctx.form.tags)), placeholder: ("用逗号分隔多个标签"), size: ("large"), ...{ class: ("tags-input") }, }));
    const __VLS_62 = __VLS_61({ modelValue: ((__VLS_ctx.form.tags)), placeholder: ("用逗号分隔多个标签"), size: ("large"), ...{ class: ("tags-input") }, }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    ({}({ modelValue: ((__VLS_ctx.form.tags)), placeholder: ("用逗号分隔多个标签"), size: ("large"), ...{ class: ("tags-input") }, }));
    // @ts-ignore
    [form,];
    const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_60, __VLS_62);
    (__VLS_59.slots).default;
    const __VLS_59 = __VLS_pickFunctionalComponentCtx(__VLS_54, __VLS_56);
    const __VLS_66 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({ label: ("文章摘要"), prop: ("preview"), }));
    const __VLS_68 = __VLS_67({ label: ("文章摘要"), prop: ("preview"), }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    ({}({ label: ("文章摘要"), prop: ("preview"), }));
    const __VLS_72 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({ modelValue: ((__VLS_ctx.form.preview)), type: ("textarea"), rows: ((3)), placeholder: ("简要描述文章内容..."), maxlength: ("200"), showWordLimit: (true), }));
    const __VLS_74 = __VLS_73({ modelValue: ((__VLS_ctx.form.preview)), type: ("textarea"), rows: ((3)), placeholder: ("简要描述文章内容..."), maxlength: ("200"), showWordLimit: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    ({}({ modelValue: ((__VLS_ctx.form.preview)), type: ("textarea"), rows: ((3)), placeholder: ("简要描述文章内容..."), maxlength: ("200"), showWordLimit: (true), }));
    // @ts-ignore
    [form,];
    const __VLS_77 = __VLS_pickFunctionalComponentCtx(__VLS_72, __VLS_74);
    (__VLS_71.slots).default;
    const __VLS_71 = __VLS_pickFunctionalComponentCtx(__VLS_66, __VLS_68);
    const __VLS_78 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({ label: ("文章内容"), prop: ("content"), }));
    const __VLS_80 = __VLS_79({ label: ("文章内容"), prop: ("content"), }, ...__VLS_functionalComponentArgsRest(__VLS_79));
    ({}({ label: ("文章内容"), prop: ("content"), }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("editor-wrapper") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("editor-toolbar") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.insertFormat('**', '**');
                // @ts-ignore
                [insertFormat,];
            } }, type: ("button"), ...{ class: ("toolbar-btn") }, title: ("加粗"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.insertFormat('*', '*');
                // @ts-ignore
                [insertFormat,];
            } }, type: ("button"), ...{ class: ("toolbar-btn") }, title: ("斜体"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.em, __VLS_intrinsicElements.em)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.insertFormat('\n## ', '');
                // @ts-ignore
                [insertFormat,];
            } }, type: ("button"), ...{ class: ("toolbar-btn") }, title: ("标题"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.insertFormat('[', '](url)');
                // @ts-ignore
                [insertFormat,];
            } }, type: ("button"), ...{ class: ("toolbar-btn") }, title: ("链接"), });
    const __VLS_84 = {}.ElIcon;
    ({}.ElIcon);
    ({}.ElIcon);
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    // @ts-ignore
    [ElIcon, ElIcon,];
    const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({}));
    const __VLS_86 = __VLS_85({}, ...__VLS_functionalComponentArgsRest(__VLS_85));
    ({}({}));
    const __VLS_90 = {}.Link;
    ({}.Link);
    __VLS_components.Link;
    // @ts-ignore
    [Link,];
    const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({}));
    const __VLS_92 = __VLS_91({}, ...__VLS_functionalComponentArgsRest(__VLS_91));
    ({}({}));
    const __VLS_95 = __VLS_pickFunctionalComponentCtx(__VLS_90, __VLS_92);
    (__VLS_89.slots).default;
    const __VLS_89 = __VLS_pickFunctionalComponentCtx(__VLS_84, __VLS_86);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.insertFormat('\n> ', '');
                // @ts-ignore
                [insertFormat,];
            } }, type: ("button"), ...{ class: ("toolbar-btn") }, title: ("引用"), });
    const __VLS_96 = {}.ElIcon;
    ({}.ElIcon);
    ({}.ElIcon);
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    // @ts-ignore
    [ElIcon, ElIcon,];
    const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({}));
    const __VLS_98 = __VLS_97({}, ...__VLS_functionalComponentArgsRest(__VLS_97));
    ({}({}));
    const __VLS_102 = {}.ChatLineSquare;
    ({}.ChatLineSquare);
    __VLS_components.ChatLineSquare;
    // @ts-ignore
    [ChatLineSquare,];
    const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({}));
    const __VLS_104 = __VLS_103({}, ...__VLS_functionalComponentArgsRest(__VLS_103));
    ({}({}));
    const __VLS_107 = __VLS_pickFunctionalComponentCtx(__VLS_102, __VLS_104);
    (__VLS_101.slots).default;
    const __VLS_101 = __VLS_pickFunctionalComponentCtx(__VLS_96, __VLS_98);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.insertFormat('\n- ', '');
                // @ts-ignore
                [insertFormat,];
            } }, type: ("button"), ...{ class: ("toolbar-btn") }, title: ("列表"), });
    const __VLS_108 = {}.ElIcon;
    ({}.ElIcon);
    ({}.ElIcon);
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    // @ts-ignore
    [ElIcon, ElIcon,];
    const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({}));
    const __VLS_110 = __VLS_109({}, ...__VLS_functionalComponentArgsRest(__VLS_109));
    ({}({}));
    const __VLS_114 = {}.List;
    ({}.List);
    __VLS_components.List;
    // @ts-ignore
    [List,];
    const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({}));
    const __VLS_116 = __VLS_115({}, ...__VLS_functionalComponentArgsRest(__VLS_115));
    ({}({}));
    const __VLS_119 = __VLS_pickFunctionalComponentCtx(__VLS_114, __VLS_116);
    (__VLS_113.slots).default;
    const __VLS_113 = __VLS_pickFunctionalComponentCtx(__VLS_108, __VLS_110);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.insertFormat('\n```\n', '\n```');
                // @ts-ignore
                [insertFormat,];
            } }, type: ("button"), ...{ class: ("toolbar-btn") }, title: ("代码"), });
    const __VLS_120 = {}.ElIcon;
    ({}.ElIcon);
    ({}.ElIcon);
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    // @ts-ignore
    [ElIcon, ElIcon,];
    const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({}));
    const __VLS_122 = __VLS_121({}, ...__VLS_functionalComponentArgsRest(__VLS_121));
    ({}({}));
    const __VLS_126 = {}.Monitor;
    ({}.Monitor);
    __VLS_components.Monitor;
    // @ts-ignore
    [Monitor,];
    const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({}));
    const __VLS_128 = __VLS_127({}, ...__VLS_functionalComponentArgsRest(__VLS_127));
    ({}({}));
    const __VLS_131 = __VLS_pickFunctionalComponentCtx(__VLS_126, __VLS_128);
    (__VLS_125.slots).default;
    const __VLS_125 = __VLS_pickFunctionalComponentCtx(__VLS_120, __VLS_122);
    const __VLS_132 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({ ref: ("contentRef"), modelValue: ((__VLS_ctx.form.content)), type: ("textarea"), rows: ((15)), placeholder: ("\u5728\u8fd9\u91cc\u64b0\u5199\u60a8\u7684\u6587\u7ae0\u5185\u5bb9\u002e\u002e\u002e\u000d\u000a\u652f\u6301\u0020\u004d\u0061\u0072\u006b\u0064\u006f\u0077\u006e\u0020\u8bed\u6cd5\u683c\u5f0f"), ...{ class: ("content-editor") }, }));
    const __VLS_134 = __VLS_133({ ref: ("contentRef"), modelValue: ((__VLS_ctx.form.content)), type: ("textarea"), rows: ((15)), placeholder: ("\u5728\u8fd9\u91cc\u64b0\u5199\u60a8\u7684\u6587\u7ae0\u5185\u5bb9\u002e\u002e\u002e\u000d\u000a\u652f\u6301\u0020\u004d\u0061\u0072\u006b\u0064\u006f\u0077\u006e\u0020\u8bed\u6cd5\u683c\u5f0f"), ...{ class: ("content-editor") }, }, ...__VLS_functionalComponentArgsRest(__VLS_133));
    ({}({ ref: ("contentRef"), modelValue: ((__VLS_ctx.form.content)), type: ("textarea"), rows: ((15)), placeholder: ("\u5728\u8fd9\u91cc\u64b0\u5199\u60a8\u7684\u6587\u7ae0\u5185\u5bb9\u002e\u002e\u002e\u000d\u000a\u652f\u6301\u0020\u004d\u0061\u0072\u006b\u0064\u006f\u0077\u006e\u0020\u8bed\u6cd5\u683c\u5f0f"), ...{ class: ("content-editor") }, }));
    // @ts-ignore
    (__VLS_ctx.contentRef);
    // @ts-ignore
    [form, contentRef,];
    const __VLS_137 = __VLS_pickFunctionalComponentCtx(__VLS_132, __VLS_134);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("editor-hint") }, });
    const __VLS_138 = {}.ElIcon;
    ({}.ElIcon);
    ({}.ElIcon);
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    // @ts-ignore
    [ElIcon, ElIcon,];
    const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({}));
    const __VLS_140 = __VLS_139({}, ...__VLS_functionalComponentArgsRest(__VLS_139));
    ({}({}));
    const __VLS_144 = {}.InfoFilled;
    ({}.InfoFilled);
    __VLS_components.InfoFilled;
    // @ts-ignore
    [InfoFilled,];
    const __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({}));
    const __VLS_146 = __VLS_145({}, ...__VLS_functionalComponentArgsRest(__VLS_145));
    ({}({}));
    const __VLS_149 = __VLS_pickFunctionalComponentCtx(__VLS_144, __VLS_146);
    (__VLS_143.slots).default;
    const __VLS_143 = __VLS_pickFunctionalComponentCtx(__VLS_138, __VLS_140);
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_83.slots).default;
    const __VLS_83 = __VLS_pickFunctionalComponentCtx(__VLS_78, __VLS_80);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-actions") }, });
    const __VLS_150 = {}.ElButton;
    ({}.ElButton);
    ({}.ElButton);
    __VLS_components.ElButton;
    __VLS_components.elButton;
    __VLS_components.ElButton;
    __VLS_components.elButton;
    // @ts-ignore
    [ElButton, ElButton,];
    const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({ ...{ 'onClick': {} }, loading: ((__VLS_ctx.savingDraft)), size: ("large"), ...{ class: ("draft-btn") }, }));
    const __VLS_152 = __VLS_151({ ...{ 'onClick': {} }, loading: ((__VLS_ctx.savingDraft)), size: ("large"), ...{ class: ("draft-btn") }, }, ...__VLS_functionalComponentArgsRest(__VLS_151));
    ({}({ ...{ 'onClick': {} }, loading: ((__VLS_ctx.savingDraft)), size: ("large"), ...{ class: ("draft-btn") }, }));
    let __VLS_156;
    const __VLS_157 = {
        onClick: (__VLS_ctx.saveDraft)
    };
    // @ts-ignore
    [savingDraft, saveDraft,];
    (__VLS_155.slots).default;
    const __VLS_155 = __VLS_pickFunctionalComponentCtx(__VLS_150, __VLS_152);
    let __VLS_153;
    let __VLS_154;
    const __VLS_158 = {}.ElButton;
    ({}.ElButton);
    ({}.ElButton);
    __VLS_components.ElButton;
    __VLS_components.elButton;
    __VLS_components.ElButton;
    __VLS_components.elButton;
    // @ts-ignore
    [ElButton, ElButton,];
    const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({ ...{ 'onClick': {} }, type: ("primary"), loading: ((__VLS_ctx.publishing)), size: ("large"), ...{ class: ("publish-btn") }, disabled: ((!__VLS_ctx.form.title || !__VLS_ctx.form.content)), }));
    const __VLS_160 = __VLS_159({ ...{ 'onClick': {} }, type: ("primary"), loading: ((__VLS_ctx.publishing)), size: ("large"), ...{ class: ("publish-btn") }, disabled: ((!__VLS_ctx.form.title || !__VLS_ctx.form.content)), }, ...__VLS_functionalComponentArgsRest(__VLS_159));
    ({}({ ...{ 'onClick': {} }, type: ("primary"), loading: ((__VLS_ctx.publishing)), size: ("large"), ...{ class: ("publish-btn") }, disabled: ((!__VLS_ctx.form.title || !__VLS_ctx.form.content)), }));
    let __VLS_164;
    const __VLS_165 = {
        onClick: (__VLS_ctx.publishArticle)
    };
    if (!__VLS_ctx.publishing) {
        const __VLS_166 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({}));
        const __VLS_168 = __VLS_167({}, ...__VLS_functionalComponentArgsRest(__VLS_167));
        ({}({}));
        const __VLS_172 = {}.Upload;
        ({}.Upload);
        __VLS_components.Upload;
        // @ts-ignore
        [Upload,];
        const __VLS_173 = __VLS_asFunctionalComponent(__VLS_172, new __VLS_172({}));
        const __VLS_174 = __VLS_173({}, ...__VLS_functionalComponentArgsRest(__VLS_173));
        ({}({}));
        // @ts-ignore
        [form, form, publishing, publishing, publishArticle,];
        const __VLS_177 = __VLS_pickFunctionalComponentCtx(__VLS_172, __VLS_174);
        (__VLS_171.slots).default;
        const __VLS_171 = __VLS_pickFunctionalComponentCtx(__VLS_166, __VLS_168);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.publishing ? '发布中...' : '发布文章');
    // @ts-ignore
    [publishing,];
    (__VLS_163.slots).default;
    const __VLS_163 = __VLS_pickFunctionalComponentCtx(__VLS_158, __VLS_160);
    let __VLS_161;
    let __VLS_162;
    (__VLS_23.slots).default;
    const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("tips-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("tips-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("tips-list") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['create-article-container'];
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['page-header'];
        __VLS_styleScopedClasses['back-link'];
        __VLS_styleScopedClasses['page-title'];
        __VLS_styleScopedClasses['page-description'];
        __VLS_styleScopedClasses['editor-card'];
        __VLS_styleScopedClasses['article-form'];
        __VLS_styleScopedClasses['title-input'];
        __VLS_styleScopedClasses['form-row'];
        __VLS_styleScopedClasses['form-col'];
        __VLS_styleScopedClasses['category-select'];
        __VLS_styleScopedClasses['form-col'];
        __VLS_styleScopedClasses['tags-input'];
        __VLS_styleScopedClasses['editor-wrapper'];
        __VLS_styleScopedClasses['editor-toolbar'];
        __VLS_styleScopedClasses['toolbar-btn'];
        __VLS_styleScopedClasses['toolbar-btn'];
        __VLS_styleScopedClasses['toolbar-btn'];
        __VLS_styleScopedClasses['toolbar-btn'];
        __VLS_styleScopedClasses['toolbar-btn'];
        __VLS_styleScopedClasses['toolbar-btn'];
        __VLS_styleScopedClasses['toolbar-btn'];
        __VLS_styleScopedClasses['content-editor'];
        __VLS_styleScopedClasses['editor-hint'];
        __VLS_styleScopedClasses['form-actions'];
        __VLS_styleScopedClasses['draft-btn'];
        __VLS_styleScopedClasses['publish-btn'];
        __VLS_styleScopedClasses['tips-card'];
        __VLS_styleScopedClasses['tips-title'];
        __VLS_styleScopedClasses['tips-list'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {
                ArrowLeft: ArrowLeft,
                Link: Link,
                List: List,
                Monitor: Monitor,
                InfoFilled: InfoFilled,
                Upload: Upload,
                ChatLineSquare: ChatLineSquare,
                formRef: formRef,
                contentRef: contentRef,
                savingDraft: savingDraft,
                publishing: publishing,
                categories: categories,
                form: form,
                rules: rules,
                insertFormat: insertFormat,
                saveDraft: saveDraft,
                publishArticle: publishArticle,
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
