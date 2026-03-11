/* __placeholder__ */
import { ref, onMounted, computed } from 'vue';
import { Sort, Right, Clock } from '@element-plus/icons-vue';
import axios from '../axios';
import { ElMessage } from 'element-plus';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const form = ref({
    fromCurrency: 'USD',
    toCurrency: 'CNY',
    amount: 100,
});
const result = ref(null);
const currencies = ref([]);
const rates = ref([]);
const loading = ref(false);
const currentRate = ref(null);
const currentTime = ref('');
const recentRates = computed(() => {
    if (!rates.value.length)
        return [];
    return rates.value.slice(0, 6).map(rate => ({
        key: `${rate.fromcurrency}-${rate.tocurrency}`,
        from: rate.fromcurrency,
        to: rate.tocurrency,
        rate: rate.rate
    }));
});
const displayRate = computed(() => {
    return currentRate.value ? currentRate.value.toFixed(4) : '-';
});
const fetchCurrencies = async () => {
    try {
        loading.value = true;
        const response = await axios.get('/exchangerates');
        rates.value = response.data;
        currencies.value = [...new Set(response.data.map((rate) => [rate.fromcurrency, rate.tocurrency]).flat())].sort();
    }
    catch (error) {
        ElMessage.error('获取汇率数据失败');
        console.error('Failed to load currencies', error);
    }
    finally {
        loading.value = false;
    }
};
const exchange = () => {
    if (!form.value.amount || form.value.amount <= 0) {
        ElMessage.warning('请输入有效的兑换金额');
        return;
    }
    const rate = rates.value.find((rate) => rate.fromcurrency === form.value.fromCurrency && rate.tocurrency === form.value.toCurrency)?.rate;
    if (rate) {
        currentRate.value = rate;
        result.value = form.value.amount * rate;
        updateCurrentTime();
    }
    else {
        ElMessage.warning('未找到对应的汇率信息');
        result.value = null;
        currentRate.value = null;
    }
};
const swapCurrencies = () => {
    const temp = form.value.fromCurrency;
    form.value.fromCurrency = form.value.toCurrency;
    form.value.toCurrency = temp;
    if (result.value) {
        exchange();
    }
};
const formatAmount = (amount) => {
    return new Intl.NumberFormat('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};
const updateCurrentTime = () => {
    currentTime.value = new Date().toLocaleString('zh-CN');
};
onMounted(() => {
    fetchCurrencies();
    updateCurrentTime();
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("exchange-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("exchange-header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("page-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("page-description") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("exchange-card") }, });
    const __VLS_0 = {}.ElForm;
    ({}.ElForm);
    ({}.ElForm);
    __VLS_components.ElForm;
    __VLS_components.elForm;
    __VLS_components.ElForm;
    __VLS_components.elForm;
    // @ts-ignore
    [ElForm, ElForm,];
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ model: ((__VLS_ctx.form)), ...{ class: ("exchange-form") }, labelPosition: ("top"), }));
    const __VLS_2 = __VLS_1({ model: ((__VLS_ctx.form)), ...{ class: ("exchange-form") }, labelPosition: ("top"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ model: ((__VLS_ctx.form)), ...{ class: ("exchange-form") }, labelPosition: ("top"), }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-row") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-col") }, });
    const __VLS_6 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ label: ("从货币"), ...{ class: ("form-item") }, }));
    const __VLS_8 = __VLS_7({ label: ("从货币"), ...{ class: ("form-item") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    ({}({ label: ("从货币"), ...{ class: ("form-item") }, }));
    const __VLS_12 = {}.ElSelect;
    ({}.ElSelect);
    ({}.ElSelect);
    __VLS_components.ElSelect;
    __VLS_components.elSelect;
    __VLS_components.ElSelect;
    __VLS_components.elSelect;
    // @ts-ignore
    [ElSelect, ElSelect,];
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ modelValue: ((__VLS_ctx.form.fromCurrency)), placeholder: ("选择源货币"), ...{ class: ("currency-select") }, size: ("large"), }));
    const __VLS_14 = __VLS_13({ modelValue: ((__VLS_ctx.form.fromCurrency)), placeholder: ("选择源货币"), ...{ class: ("currency-select") }, size: ("large"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    ({}({ modelValue: ((__VLS_ctx.form.fromCurrency)), placeholder: ("选择源货币"), ...{ class: ("currency-select") }, size: ("large"), }));
    for (const [currency] of __VLS_getVForSourceType((__VLS_ctx.currencies))) {
        const __VLS_18 = {}.ElOption;
        ({}.ElOption);
        __VLS_components.ElOption;
        __VLS_components.elOption;
        // @ts-ignore
        [ElOption,];
        const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ key: ((currency)), label: ((currency)), value: ((currency)), }));
        const __VLS_20 = __VLS_19({ key: ((currency)), label: ((currency)), value: ((currency)), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        ({}({ key: ((currency)), label: ((currency)), value: ((currency)), }));
        // @ts-ignore
        [form, form, currencies,];
        const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
    }
    (__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    (__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("exchange-arrow") }, });
    const __VLS_24 = {}.ElButton;
    ({}.ElButton);
    ({}.ElButton);
    __VLS_components.ElButton;
    __VLS_components.elButton;
    __VLS_components.ElButton;
    __VLS_components.elButton;
    // @ts-ignore
    [ElButton, ElButton,];
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ ...{ 'onClick': {} }, circle: (true), ...{ class: ("swap-btn") }, }));
    const __VLS_26 = __VLS_25({ ...{ 'onClick': {} }, circle: (true), ...{ class: ("swap-btn") }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    ({}({ ...{ 'onClick': {} }, circle: (true), ...{ class: ("swap-btn") }, }));
    let __VLS_30;
    const __VLS_31 = {
        onClick: (__VLS_ctx.swapCurrencies)
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
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ size: ("20"), }));
    const __VLS_34 = __VLS_33({ size: ("20"), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    ({}({ size: ("20"), }));
    const __VLS_38 = {}.Sort;
    ({}.Sort);
    __VLS_components.Sort;
    // @ts-ignore
    [Sort,];
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({}));
    const __VLS_40 = __VLS_39({}, ...__VLS_functionalComponentArgsRest(__VLS_39));
    ({}({}));
    // @ts-ignore
    [swapCurrencies,];
    const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_38, __VLS_40);
    (__VLS_37.slots).default;
    const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
    (__VLS_29.slots).default;
    const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
    let __VLS_27;
    let __VLS_28;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-col") }, });
    const __VLS_44 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({ label: ("到货币"), ...{ class: ("form-item") }, }));
    const __VLS_46 = __VLS_45({ label: ("到货币"), ...{ class: ("form-item") }, }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    ({}({ label: ("到货币"), ...{ class: ("form-item") }, }));
    const __VLS_50 = {}.ElSelect;
    ({}.ElSelect);
    ({}.ElSelect);
    __VLS_components.ElSelect;
    __VLS_components.elSelect;
    __VLS_components.ElSelect;
    __VLS_components.elSelect;
    // @ts-ignore
    [ElSelect, ElSelect,];
    const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({ modelValue: ((__VLS_ctx.form.toCurrency)), placeholder: ("选择目标货币"), ...{ class: ("currency-select") }, size: ("large"), }));
    const __VLS_52 = __VLS_51({ modelValue: ((__VLS_ctx.form.toCurrency)), placeholder: ("选择目标货币"), ...{ class: ("currency-select") }, size: ("large"), }, ...__VLS_functionalComponentArgsRest(__VLS_51));
    ({}({ modelValue: ((__VLS_ctx.form.toCurrency)), placeholder: ("选择目标货币"), ...{ class: ("currency-select") }, size: ("large"), }));
    for (const [currency] of __VLS_getVForSourceType((__VLS_ctx.currencies))) {
        const __VLS_56 = {}.ElOption;
        ({}.ElOption);
        __VLS_components.ElOption;
        __VLS_components.elOption;
        // @ts-ignore
        [ElOption,];
        const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({ key: ((currency)), label: ((currency)), value: ((currency)), }));
        const __VLS_58 = __VLS_57({ key: ((currency)), label: ((currency)), value: ((currency)), }, ...__VLS_functionalComponentArgsRest(__VLS_57));
        ({}({ key: ((currency)), label: ((currency)), value: ((currency)), }));
        // @ts-ignore
        [form, currencies,];
        const __VLS_61 = __VLS_pickFunctionalComponentCtx(__VLS_56, __VLS_58);
    }
    (__VLS_55.slots).default;
    const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52);
    (__VLS_49.slots).default;
    const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_44, __VLS_46);
    const __VLS_62 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({ label: ("兑换金额"), ...{ class: ("form-item") }, }));
    const __VLS_64 = __VLS_63({ label: ("兑换金额"), ...{ class: ("form-item") }, }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    ({}({ label: ("兑换金额"), ...{ class: ("form-item") }, }));
    const __VLS_68 = {}.ElInput;
    ({}.ElInput);
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput, ElInput,];
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({ modelValue: ((__VLS_ctx.form.amount)), type: ("number"), placeholder: ("输入要兑换的金额"), ...{ class: ("amount-input") }, size: ("large"), }));
    const __VLS_70 = __VLS_69({ modelValue: ((__VLS_ctx.form.amount)), type: ("number"), placeholder: ("输入要兑换的金额"), ...{ class: ("amount-input") }, size: ("large"), }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    ({}({ modelValue: ((__VLS_ctx.form.amount)), type: ("number"), placeholder: ("输入要兑换的金额"), ...{ class: ("amount-input") }, size: ("large"), }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        (__VLS_73.slots).prefix;
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("currency-prefix") }, });
        (__VLS_ctx.form.fromCurrency || 'USD');
        // @ts-ignore
        [form, form,];
    }
    const __VLS_73 = __VLS_pickFunctionalComponentCtx(__VLS_68, __VLS_70);
    (__VLS_67.slots).default;
    const __VLS_67 = __VLS_pickFunctionalComponentCtx(__VLS_62, __VLS_64);
    const __VLS_74 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({}));
    const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
    ({}({}));
    const __VLS_80 = {}.ElButton;
    ({}.ElButton);
    ({}.ElButton);
    __VLS_components.ElButton;
    __VLS_components.elButton;
    __VLS_components.ElButton;
    __VLS_components.elButton;
    // @ts-ignore
    [ElButton, ElButton,];
    const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({ ...{ 'onClick': {} }, type: ("primary"), ...{ class: ("exchange-btn") }, size: ("large"), loading: ((__VLS_ctx.loading)), disabled: ((!__VLS_ctx.form.fromCurrency || !__VLS_ctx.form.toCurrency || !__VLS_ctx.form.amount)), }));
    const __VLS_82 = __VLS_81({ ...{ 'onClick': {} }, type: ("primary"), ...{ class: ("exchange-btn") }, size: ("large"), loading: ((__VLS_ctx.loading)), disabled: ((!__VLS_ctx.form.fromCurrency || !__VLS_ctx.form.toCurrency || !__VLS_ctx.form.amount)), }, ...__VLS_functionalComponentArgsRest(__VLS_81));
    ({}({ ...{ 'onClick': {} }, type: ("primary"), ...{ class: ("exchange-btn") }, size: ("large"), loading: ((__VLS_ctx.loading)), disabled: ((!__VLS_ctx.form.fromCurrency || !__VLS_ctx.form.toCurrency || !__VLS_ctx.form.amount)), }));
    let __VLS_86;
    const __VLS_87 = {
        onClick: (__VLS_ctx.exchange)
    };
    // @ts-ignore
    [form, form, form, loading, exchange,];
    (__VLS_85.slots).default;
    const __VLS_85 = __VLS_pickFunctionalComponentCtx(__VLS_80, __VLS_82);
    let __VLS_83;
    let __VLS_84;
    (__VLS_79.slots).default;
    const __VLS_79 = __VLS_pickFunctionalComponentCtx(__VLS_74, __VLS_76);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    if (__VLS_ctx.result) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("result-box") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("result-header") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("result-title") }, });
        // @ts-ignore
        [result,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("result-rate") }, });
        (__VLS_ctx.displayRate);
        // @ts-ignore
        [displayRate,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("result-content") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("result-amount") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("amount-from") }, });
        (__VLS_ctx.formatAmount(__VLS_ctx.form.amount));
        (__VLS_ctx.form.fromCurrency);
        // @ts-ignore
        [form, form, formatAmount,];
        const __VLS_88 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({ ...{ class: ("arrow-icon") }, }));
        const __VLS_90 = __VLS_89({ ...{ class: ("arrow-icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_89));
        ({}({ ...{ class: ("arrow-icon") }, }));
        const __VLS_94 = {}.Right;
        ({}.Right);
        __VLS_components.Right;
        // @ts-ignore
        [Right,];
        const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({}));
        const __VLS_96 = __VLS_95({}, ...__VLS_functionalComponentArgsRest(__VLS_95));
        ({}({}));
        const __VLS_99 = __VLS_pickFunctionalComponentCtx(__VLS_94, __VLS_96);
        (__VLS_93.slots).default;
        const __VLS_93 = __VLS_pickFunctionalComponentCtx(__VLS_88, __VLS_90);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("amount-to") }, });
        (__VLS_ctx.formatAmount(__VLS_ctx.result));
        (__VLS_ctx.form.toCurrency);
        // @ts-ignore
        [form, result, formatAmount,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("result-time") }, });
        const __VLS_100 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({ size: ("14"), }));
        const __VLS_102 = __VLS_101({ size: ("14"), }, ...__VLS_functionalComponentArgsRest(__VLS_101));
        ({}({ size: ("14"), }));
        const __VLS_106 = {}.Clock;
        ({}.Clock);
        __VLS_components.Clock;
        // @ts-ignore
        [Clock,];
        const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({}));
        const __VLS_108 = __VLS_107({}, ...__VLS_functionalComponentArgsRest(__VLS_107));
        ({}({}));
        const __VLS_111 = __VLS_pickFunctionalComponentCtx(__VLS_106, __VLS_108);
        (__VLS_105.slots).default;
        const __VLS_105 = __VLS_pickFunctionalComponentCtx(__VLS_100, __VLS_102);
        (__VLS_ctx.currentTime);
        // @ts-ignore
        [currentTime,];
    }
    if (__VLS_ctx.recentRates.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("recent-rates") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("section-title") }, });
        // @ts-ignore
        [recentRates,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("rates-grid") }, });
        for (const [rate] of __VLS_getVForSourceType((__VLS_ctx.recentRates))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((rate.key)), ...{ class: ("rate-item") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("rate-currency") }, });
            (rate.from);
            (rate.to);
            // @ts-ignore
            [recentRates,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("rate-value") }, });
            (rate.rate.toFixed(4));
        }
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['exchange-container'];
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['exchange-header'];
        __VLS_styleScopedClasses['page-title'];
        __VLS_styleScopedClasses['page-description'];
        __VLS_styleScopedClasses['exchange-card'];
        __VLS_styleScopedClasses['exchange-form'];
        __VLS_styleScopedClasses['form-row'];
        __VLS_styleScopedClasses['form-col'];
        __VLS_styleScopedClasses['form-item'];
        __VLS_styleScopedClasses['currency-select'];
        __VLS_styleScopedClasses['exchange-arrow'];
        __VLS_styleScopedClasses['swap-btn'];
        __VLS_styleScopedClasses['form-col'];
        __VLS_styleScopedClasses['form-item'];
        __VLS_styleScopedClasses['currency-select'];
        __VLS_styleScopedClasses['form-item'];
        __VLS_styleScopedClasses['amount-input'];
        __VLS_styleScopedClasses['currency-prefix'];
        __VLS_styleScopedClasses['exchange-btn'];
        __VLS_styleScopedClasses['result-box'];
        __VLS_styleScopedClasses['result-header'];
        __VLS_styleScopedClasses['result-title'];
        __VLS_styleScopedClasses['result-rate'];
        __VLS_styleScopedClasses['result-content'];
        __VLS_styleScopedClasses['result-amount'];
        __VLS_styleScopedClasses['amount-from'];
        __VLS_styleScopedClasses['arrow-icon'];
        __VLS_styleScopedClasses['amount-to'];
        __VLS_styleScopedClasses['result-time'];
        __VLS_styleScopedClasses['recent-rates'];
        __VLS_styleScopedClasses['section-title'];
        __VLS_styleScopedClasses['rates-grid'];
        __VLS_styleScopedClasses['rate-item'];
        __VLS_styleScopedClasses['rate-currency'];
        __VLS_styleScopedClasses['rate-value'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {
                Sort: Sort,
                Right: Right,
                Clock: Clock,
                form: form,
                result: result,
                currencies: currencies,
                loading: loading,
                currentTime: currentTime,
                recentRates: recentRates,
                displayRate: displayRate,
                exchange: exchange,
                swapCurrencies: swapCurrencies,
                formatAmount: formatAmount,
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
