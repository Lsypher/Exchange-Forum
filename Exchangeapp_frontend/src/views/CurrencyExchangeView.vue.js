/* __placeholder__ */
import { ref, onMounted, computed } from 'vue';
import { Sort, Right, Clock, Refresh } from '@element-plus/icons-vue';
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
        // 首先调用新的货币列表 API 获取预设货币
        try {
            const currenciesResponse = await axios.get('/currencies');
            if (currenciesResponse.data && currenciesResponse.data.length > 0) {
                currencies.value = currenciesResponse.data;
            }
        }
        catch {
            // 如果货币列表 API 失败，使用备用方案
            console.warn('Failed to fetch currencies from /currencies, using fallback');
        }
        // 同时获取汇率数据（用于显示最近汇率和实际兑换计算）
        const ratesResponse = await axios.get('/exchangerates');
        rates.value = ratesResponse.data;
        // 如果有汇率数据，合并货币列表（作为备用，确保已有汇率的货币也能选择）
        if (ratesResponse.data && ratesResponse.data.length > 0) {
            const rateCurrencies = [...new Set(ratesResponse.data.map((rate) => [rate.fromcurrency, rate.tocurrency]).flat())].sort();
            // 合并两个列表并去重
            currencies.value = [...new Set([...currencies.value, ...rateCurrencies])].sort();
        }
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
const getLatestUpdateTime = () => {
    if (!rates.value.length)
        return '-';
    const latestTime = rates.value
        .filter(r => r.time)
        .map(r => r.time)
        .sort()
        .reverse()[0];
    if (!latestTime)
        return '-';
    return new Date(latestTime).toLocaleString('zh-CN');
};
const refreshLoading = ref(false);
const refreshRates = async () => {
    try {
        refreshLoading.value = true;
        await axios.post('/exchangerates/refresh');
        ElMessage.success('汇率刷新成功');
        await fetchCurrencies();
    }
    catch (error) {
        if (error.response?.data?.error) {
            ElMessage.error(error.response.data.error);
        }
        else {
            ElMessage.error('刷新汇率失败');
        }
        console.error('Failed to refresh exchange rates', error);
    }
    finally {
        refreshLoading.value = false;
    }
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("header-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("page-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("page-description") }, });
    const __VLS_0 = {}.ElButton;
    ({}.ElButton);
    ({}.ElButton);
    __VLS_components.ElButton;
    __VLS_components.elButton;
    __VLS_components.ElButton;
    __VLS_components.elButton;
    // @ts-ignore
    [ElButton, ElButton,];
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onClick': {} }, type: ("primary"), ...{ class: ("refresh-btn") }, loading: ((__VLS_ctx.refreshLoading)), }));
    const __VLS_2 = __VLS_1({ ...{ 'onClick': {} }, type: ("primary"), ...{ class: ("refresh-btn") }, loading: ((__VLS_ctx.refreshLoading)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ ...{ 'onClick': {} }, type: ("primary"), ...{ class: ("refresh-btn") }, loading: ((__VLS_ctx.refreshLoading)), }));
    let __VLS_6;
    const __VLS_7 = {
        onClick: (__VLS_ctx.refreshRates)
    };
    const __VLS_8 = {}.ElIcon;
    ({}.ElIcon);
    ({}.ElIcon);
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    __VLS_components.ElIcon;
    __VLS_components.elIcon;
    // @ts-ignore
    [ElIcon, ElIcon,];
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
    const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
    ({}({}));
    const __VLS_14 = {}.Refresh;
    ({}.Refresh);
    __VLS_components.Refresh;
    // @ts-ignore
    [Refresh,];
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
    const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
    ({}({}));
    // @ts-ignore
    [refreshLoading, refreshRates,];
    const __VLS_19 = __VLS_pickFunctionalComponentCtx(__VLS_14, __VLS_16);
    (__VLS_13.slots).default;
    const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_8, __VLS_10);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    let __VLS_3;
    let __VLS_4;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("exchange-card") }, });
    const __VLS_20 = {}.ElForm;
    ({}.ElForm);
    ({}.ElForm);
    __VLS_components.ElForm;
    __VLS_components.elForm;
    __VLS_components.ElForm;
    __VLS_components.elForm;
    // @ts-ignore
    [ElForm, ElForm,];
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ model: ((__VLS_ctx.form)), ...{ class: ("exchange-form") }, labelPosition: ("top"), }));
    const __VLS_22 = __VLS_21({ model: ((__VLS_ctx.form)), ...{ class: ("exchange-form") }, labelPosition: ("top"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    ({}({ model: ((__VLS_ctx.form)), ...{ class: ("exchange-form") }, labelPosition: ("top"), }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-row") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-col") }, });
    const __VLS_26 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({ label: ("从货币"), ...{ class: ("form-item") }, }));
    const __VLS_28 = __VLS_27({ label: ("从货币"), ...{ class: ("form-item") }, }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    ({}({ label: ("从货币"), ...{ class: ("form-item") }, }));
    const __VLS_32 = {}.ElSelect;
    ({}.ElSelect);
    ({}.ElSelect);
    __VLS_components.ElSelect;
    __VLS_components.elSelect;
    __VLS_components.ElSelect;
    __VLS_components.elSelect;
    // @ts-ignore
    [ElSelect, ElSelect,];
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ modelValue: ((__VLS_ctx.form.fromCurrency)), placeholder: ("选择源货币"), ...{ class: ("currency-select") }, size: ("large"), }));
    const __VLS_34 = __VLS_33({ modelValue: ((__VLS_ctx.form.fromCurrency)), placeholder: ("选择源货币"), ...{ class: ("currency-select") }, size: ("large"), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    ({}({ modelValue: ((__VLS_ctx.form.fromCurrency)), placeholder: ("选择源货币"), ...{ class: ("currency-select") }, size: ("large"), }));
    for (const [currency] of __VLS_getVForSourceType((__VLS_ctx.currencies))) {
        const __VLS_38 = {}.ElOption;
        ({}.ElOption);
        __VLS_components.ElOption;
        __VLS_components.elOption;
        // @ts-ignore
        [ElOption,];
        const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({ key: ((currency)), label: ((currency)), value: ((currency)), }));
        const __VLS_40 = __VLS_39({ key: ((currency)), label: ((currency)), value: ((currency)), }, ...__VLS_functionalComponentArgsRest(__VLS_39));
        ({}({ key: ((currency)), label: ((currency)), value: ((currency)), }));
        // @ts-ignore
        [form, form, currencies,];
        const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_38, __VLS_40);
    }
    (__VLS_37.slots).default;
    const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
    (__VLS_31.slots).default;
    const __VLS_31 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("exchange-arrow") }, });
    const __VLS_44 = {}.ElButton;
    ({}.ElButton);
    ({}.ElButton);
    __VLS_components.ElButton;
    __VLS_components.elButton;
    __VLS_components.ElButton;
    __VLS_components.elButton;
    // @ts-ignore
    [ElButton, ElButton,];
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({ ...{ 'onClick': {} }, circle: (true), ...{ class: ("swap-btn") }, }));
    const __VLS_46 = __VLS_45({ ...{ 'onClick': {} }, circle: (true), ...{ class: ("swap-btn") }, }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    ({}({ ...{ 'onClick': {} }, circle: (true), ...{ class: ("swap-btn") }, }));
    let __VLS_50;
    const __VLS_51 = {
        onClick: (__VLS_ctx.swapCurrencies)
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
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({ size: ("20"), }));
    const __VLS_54 = __VLS_53({ size: ("20"), }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    ({}({ size: ("20"), }));
    const __VLS_58 = {}.Sort;
    ({}.Sort);
    __VLS_components.Sort;
    // @ts-ignore
    [Sort,];
    const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({}));
    const __VLS_60 = __VLS_59({}, ...__VLS_functionalComponentArgsRest(__VLS_59));
    ({}({}));
    // @ts-ignore
    [swapCurrencies,];
    const __VLS_63 = __VLS_pickFunctionalComponentCtx(__VLS_58, __VLS_60);
    (__VLS_57.slots).default;
    const __VLS_57 = __VLS_pickFunctionalComponentCtx(__VLS_52, __VLS_54);
    (__VLS_49.slots).default;
    const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_44, __VLS_46);
    let __VLS_47;
    let __VLS_48;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-col") }, });
    const __VLS_64 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({ label: ("到货币"), ...{ class: ("form-item") }, }));
    const __VLS_66 = __VLS_65({ label: ("到货币"), ...{ class: ("form-item") }, }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    ({}({ label: ("到货币"), ...{ class: ("form-item") }, }));
    const __VLS_70 = {}.ElSelect;
    ({}.ElSelect);
    ({}.ElSelect);
    __VLS_components.ElSelect;
    __VLS_components.elSelect;
    __VLS_components.ElSelect;
    __VLS_components.elSelect;
    // @ts-ignore
    [ElSelect, ElSelect,];
    const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({ modelValue: ((__VLS_ctx.form.toCurrency)), placeholder: ("选择目标货币"), ...{ class: ("currency-select") }, size: ("large"), }));
    const __VLS_72 = __VLS_71({ modelValue: ((__VLS_ctx.form.toCurrency)), placeholder: ("选择目标货币"), ...{ class: ("currency-select") }, size: ("large"), }, ...__VLS_functionalComponentArgsRest(__VLS_71));
    ({}({ modelValue: ((__VLS_ctx.form.toCurrency)), placeholder: ("选择目标货币"), ...{ class: ("currency-select") }, size: ("large"), }));
    for (const [currency] of __VLS_getVForSourceType((__VLS_ctx.currencies))) {
        const __VLS_76 = {}.ElOption;
        ({}.ElOption);
        __VLS_components.ElOption;
        __VLS_components.elOption;
        // @ts-ignore
        [ElOption,];
        const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({ key: ((currency)), label: ((currency)), value: ((currency)), }));
        const __VLS_78 = __VLS_77({ key: ((currency)), label: ((currency)), value: ((currency)), }, ...__VLS_functionalComponentArgsRest(__VLS_77));
        ({}({ key: ((currency)), label: ((currency)), value: ((currency)), }));
        // @ts-ignore
        [form, currencies,];
        const __VLS_81 = __VLS_pickFunctionalComponentCtx(__VLS_76, __VLS_78);
    }
    (__VLS_75.slots).default;
    const __VLS_75 = __VLS_pickFunctionalComponentCtx(__VLS_70, __VLS_72);
    (__VLS_69.slots).default;
    const __VLS_69 = __VLS_pickFunctionalComponentCtx(__VLS_64, __VLS_66);
    const __VLS_82 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({ label: ("兑换金额"), ...{ class: ("form-item") }, }));
    const __VLS_84 = __VLS_83({ label: ("兑换金额"), ...{ class: ("form-item") }, }, ...__VLS_functionalComponentArgsRest(__VLS_83));
    ({}({ label: ("兑换金额"), ...{ class: ("form-item") }, }));
    const __VLS_88 = {}.ElInput;
    ({}.ElInput);
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput, ElInput,];
    const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({ modelValue: ((__VLS_ctx.form.amount)), type: ("number"), placeholder: ("输入要兑换的金额"), ...{ class: ("amount-input") }, size: ("large"), }));
    const __VLS_90 = __VLS_89({ modelValue: ((__VLS_ctx.form.amount)), type: ("number"), placeholder: ("输入要兑换的金额"), ...{ class: ("amount-input") }, size: ("large"), }, ...__VLS_functionalComponentArgsRest(__VLS_89));
    ({}({ modelValue: ((__VLS_ctx.form.amount)), type: ("number"), placeholder: ("输入要兑换的金额"), ...{ class: ("amount-input") }, size: ("large"), }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        (__VLS_93.slots).prefix;
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("currency-prefix") }, });
        (__VLS_ctx.form.fromCurrency || 'USD');
        // @ts-ignore
        [form, form,];
    }
    const __VLS_93 = __VLS_pickFunctionalComponentCtx(__VLS_88, __VLS_90);
    (__VLS_87.slots).default;
    const __VLS_87 = __VLS_pickFunctionalComponentCtx(__VLS_82, __VLS_84);
    const __VLS_94 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({}));
    const __VLS_96 = __VLS_95({}, ...__VLS_functionalComponentArgsRest(__VLS_95));
    ({}({}));
    const __VLS_100 = {}.ElButton;
    ({}.ElButton);
    ({}.ElButton);
    __VLS_components.ElButton;
    __VLS_components.elButton;
    __VLS_components.ElButton;
    __VLS_components.elButton;
    // @ts-ignore
    [ElButton, ElButton,];
    const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({ ...{ 'onClick': {} }, type: ("primary"), ...{ class: ("exchange-btn") }, size: ("large"), loading: ((__VLS_ctx.loading)), disabled: ((!__VLS_ctx.form.fromCurrency || !__VLS_ctx.form.toCurrency || !__VLS_ctx.form.amount)), }));
    const __VLS_102 = __VLS_101({ ...{ 'onClick': {} }, type: ("primary"), ...{ class: ("exchange-btn") }, size: ("large"), loading: ((__VLS_ctx.loading)), disabled: ((!__VLS_ctx.form.fromCurrency || !__VLS_ctx.form.toCurrency || !__VLS_ctx.form.amount)), }, ...__VLS_functionalComponentArgsRest(__VLS_101));
    ({}({ ...{ 'onClick': {} }, type: ("primary"), ...{ class: ("exchange-btn") }, size: ("large"), loading: ((__VLS_ctx.loading)), disabled: ((!__VLS_ctx.form.fromCurrency || !__VLS_ctx.form.toCurrency || !__VLS_ctx.form.amount)), }));
    let __VLS_106;
    const __VLS_107 = {
        onClick: (__VLS_ctx.exchange)
    };
    // @ts-ignore
    [form, form, form, loading, exchange,];
    (__VLS_105.slots).default;
    const __VLS_105 = __VLS_pickFunctionalComponentCtx(__VLS_100, __VLS_102);
    let __VLS_103;
    let __VLS_104;
    (__VLS_99.slots).default;
    const __VLS_99 = __VLS_pickFunctionalComponentCtx(__VLS_94, __VLS_96);
    (__VLS_25.slots).default;
    const __VLS_25 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
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
        const __VLS_108 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({ ...{ class: ("arrow-icon") }, }));
        const __VLS_110 = __VLS_109({ ...{ class: ("arrow-icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_109));
        ({}({ ...{ class: ("arrow-icon") }, }));
        const __VLS_114 = {}.Right;
        ({}.Right);
        __VLS_components.Right;
        // @ts-ignore
        [Right,];
        const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({}));
        const __VLS_116 = __VLS_115({}, ...__VLS_functionalComponentArgsRest(__VLS_115));
        ({}({}));
        const __VLS_119 = __VLS_pickFunctionalComponentCtx(__VLS_114, __VLS_116);
        (__VLS_113.slots).default;
        const __VLS_113 = __VLS_pickFunctionalComponentCtx(__VLS_108, __VLS_110);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("amount-to") }, });
        (__VLS_ctx.formatAmount(__VLS_ctx.result));
        (__VLS_ctx.form.toCurrency);
        // @ts-ignore
        [form, result, formatAmount,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("result-time") }, });
        const __VLS_120 = {}.ElIcon;
        ({}.ElIcon);
        ({}.ElIcon);
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        __VLS_components.ElIcon;
        __VLS_components.elIcon;
        // @ts-ignore
        [ElIcon, ElIcon,];
        const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({ size: ("14"), }));
        const __VLS_122 = __VLS_121({ size: ("14"), }, ...__VLS_functionalComponentArgsRest(__VLS_121));
        ({}({ size: ("14"), }));
        const __VLS_126 = {}.Clock;
        ({}.Clock);
        __VLS_components.Clock;
        // @ts-ignore
        [Clock,];
        const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({}));
        const __VLS_128 = __VLS_127({}, ...__VLS_functionalComponentArgsRest(__VLS_127));
        ({}({}));
        const __VLS_131 = __VLS_pickFunctionalComponentCtx(__VLS_126, __VLS_128);
        (__VLS_125.slots).default;
        const __VLS_125 = __VLS_pickFunctionalComponentCtx(__VLS_120, __VLS_122);
        (__VLS_ctx.getLatestUpdateTime());
        // @ts-ignore
        [getLatestUpdateTime,];
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
        __VLS_styleScopedClasses['header-content'];
        __VLS_styleScopedClasses['page-title'];
        __VLS_styleScopedClasses['page-description'];
        __VLS_styleScopedClasses['refresh-btn'];
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
                Refresh: Refresh,
                form: form,
                result: result,
                currencies: currencies,
                loading: loading,
                recentRates: recentRates,
                displayRate: displayRate,
                exchange: exchange,
                swapCurrencies: swapCurrencies,
                formatAmount: formatAmount,
                getLatestUpdateTime: getLatestUpdateTime,
                refreshLoading: refreshLoading,
                refreshRates: refreshRates,
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
