<template>

    <el-form ref="ruleFormRef" :model="formData">
        <el-row :gutter="24">
            <!-- 输入栏样式 -->
            <template v-for="item in formItemAttrs" :key="item.prop">
                <el-col v-bind="item.col">
                    <el-form-item :label="item.label" :prop="item.prop">
                        <component v-model="formData[item.prop]" :is="isComp(item.component)"
                            :placeholder="item.placeholder">
                            <!-- 处理下拉选项 -->
                            <template v-if="item.component === 'select'">
                                <el-option v-for="value in item.options" :key="value.value" :label="value.label"
                                    :value="value.value" />
                            </template>
                            <!-- <el-option label="其他" value="0"></el-option> -->
                        </component>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
        <el-row>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset(ruleFormRef)">重置</el-button>
        </el-row>
    </el-form>

</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const props = defineProps({
    formItem: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['search'])

const formItemAttrs = computed(() => {
    return props.formItem.map(item => ({
        ...item,
        col: { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }
    }))
})

//表单数据
const ruleFormRef = ref(null)

const formData = reactive({

})

const isComp = (comp) => {
    return {
        input: 'el-input',
        select: 'el-select'
    }[comp]
}

const handleSearch = () => {
    //console.log(formData)
    emit('search', formData)

}

const handleReset = (formRef) => {
    // formData = reactive({})
    //先重置表单，再查询
    if(!formRef){
        return
    }
    formRef.resetFields()
    emit('search', formData)
}

</script>
