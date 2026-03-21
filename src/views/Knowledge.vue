<!-- 知识文章 -->
<template>
    <div>
        <!-- 新增按钮 -->
        <PageHead title="知识文章">
            <template #buttons>
                <el-button @click="handleEdit({})" type="primary">新增</el-button>
            </template>
        </PageHead>
        <TableSearch :form-item="formItem" @search="handleSearch" />
        <!-- 内容表格 -->
        <el-table :data="tableData" style="width: 100%;margin-top: 25px;">
            <el-table-column label="文章标题" fixed="left" width="240">
                <template #default="scope">
                    <div style="display: flex; align-items: center;">
                        <el-icon>
                            <timer />
                        </el-icon>
                        <span>{{ scope.row.title }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="文章分类" width="200">
                <template #default="scope">
                    <el-icon>
                        <!-- 添加图标 -->
                    </el-icon>
                    <div style="display: flex; align-items: center;">
                        <span>{{ categoryMap[scope.row.categoryId] }}</span>
                    </div>
                </template>
            </el-table-column>


            <el-table-column prop="authorName" width="150px" label="作者" />
            <el-table-column prop="readCount" width="150px" label="阅读量" />
            <el-table-column prop="updatedAt" width="150px" label="发布时间" />
            <el-table-column label="操作" width="240" fixed="right">
                <template #default="scope">
                    <el-button @click="handleEdit(scope.row)" text type="primary">编辑</el-button>
                    <el-button @click="handlePublish(scope.row)" text
                        v-if="scope.row.status === 0 || scope.row.status === 2" type="success">发布</el-button>
                    <el-button @click="handleUnpublish(scope.row)" text v-if="scope.row.status === 1"
                        type="warning">下线</el-button>
                    <el-button @click="handleDelete(scope.row)" text type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination style="margin-top: 25px;" :page-size="pagination.size" layout="prev,pager,next"
            :total="pagination.total" @change="handleChange" />
        <ArticleDialog v-model:modelValue="dialogVisible" :article="currentArticle" :categories="categories"
            @success="handleSubmit" />
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { deleteArticle, categoryTree, articlePage, getArticleDetail, changeArticleStatus } from '@/api/admin'
import ArticleDialog from '@/components/ArticleDialog.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const formItem = [
    {
        comp: 'input',
        prop: 'title',
        label: '文章标题',
        placeholder: '请输入文章标题'
    },
    {
        comp: 'select',
        prop: 'categoryId',
        label: '文章分类',
        placeholder: '请选择文章分类',
    },
    {
        comp: 'select',
        prop: 'status',
        label: '文章状态',
        placeholder: '请选择文章状态',
        options: [
            {
                label: '草稿',
                value: 0
            },
            {
                label: '已发布',
                value: 1
            },
            {
                label: '已下线',
                value: 2
            }
        ]
    }
]

// 分页参数
const pagination = reactive({
    currentPage: 1,
    size: 10,
    total: 0
})

const handleSearch = async (formData) => {
    //console.log(formData,'查询参数')

    const params = {
        ...pagination,
        ...formData
    }

    const { records, total } = await articlePage(params)
    // console.log(data)
    tableData.value = records
    pagination.total = total
}

const handleChange = (page) => {
    pagination.currentPage = page
    handleSearch()
}

// 分类映射
const categoryMap = reactive([])
// 分类的列表
const categories = ref([])
// 文章列表数据
const tableData = ref([])
// 新增和编辑
const dialogVisible = ref(false)
const currentArticle = ref(null)
const handleSubmit = () => {
    // 取消弹窗
    dialogVisible.value = false
    //刷新列表
    handleSearch()
}
// 数据的编辑
const handleEdit = (row) => {
    console.log(row)
    if (!row.id) {
        //新增
        currentArticle.value = null
        dialogVisible.value = true
    }
    else {
        //编辑
        getArticleDetail(row.id).then(res => {
            //console.log(res)
            currentArticle.value = res
            dialogVisible.value = true
        })
    }
}

//发布
const handlePublish = (row) => {
    ElMessageBox.confirm(
        `确认发布${row.title}文章吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
    }).then(() => {
        // 确认发布
        changeArticleStatus(row.id, { status: 1 }).then(res => {
            ElMessage.success('发布成功')
            handleSearch()
        })
    })
}

//下线
const handleUnpublish = (row) => {
    ElMessageBox.confirm(
        `确认下线${row.title}文章吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        // 确认下线
        changeArticleStatus(row.id, { status: 2 }).then(res => {
            ElMessage.success('下线成功')
            handleSearch()
        })
    })
}

//删除
const handleDelete = (row) => {
    ElMessageBox.confirm(
        `确认删除${row.title}文章吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
    }).then(() => {
        // 确认删除
        deleteArticle(row.id).then(res => {
            ElMessage.success('删除成功')
            handleSearch();
        })
    })
}

onMounted(async () => {
    const data = await categoryTree()

    categories.value = data.map(item => {
        categoryMap[item.id] = item.categoryName
        return {
            label: item.categoryName,
            value: item.id
        }
    })
    // console.log(categories.value)
    formItem[1].options = categories.value

    // 获取列表
    handleSearch()

})

</script>
