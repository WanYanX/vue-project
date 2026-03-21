<template>
    <el-aside :width="isCollapse ? '64px' : '264px'">
        <!-- 侧边栏标题 -->
        <el-menu :collapse="isCollapse" :collapse-transition="false" default-active="2" class="side-bar">
            <div class="brand">
                <el-image style="width: 50px; height: 50px; margin-right: 10px;" :src="icon_log_url" alt="logo" />
                <div v-show="!isCollapse" class="info-card">
                    <h1 class="brand-title">心理健康AI助手</h1>
                    <p class="brand-subtitle">管理后台</p>
                </div>
            </div>
            <!-- 侧边栏选项 -->
            <el-menu-item @click="selectMenu" v-for="item in router.options.routes[0].children" :key="item.path" :index="item.path">
                <el-icon><component :is="item.meta.icon" /></el-icon>
                <span>{{ item.meta.title }}</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script setup>
// 获取数据
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const router = useRouter()

//引用图片
const icon_log_url = new URL('@/assets/images/机器人.png', import.meta.url).href

const isCollapse = computed(()=>useAdminStore().isCollapse)

const selectMenu = (key)=>{
    //console.log(key)
    // 子路由
    const current_router = router.options.routes[0]
    // 路由拼接，获取跳转路径
    const current_path = `${current_router.path}/${key.index}`
    //console.log(current_path)
    router.push(current_path)
}

</script>

<style lang="scss" scoped>

.side-bar{
    height: 100%;
    .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #e5e7eb;
    .info-card {
        .brand-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #1f2937;
        }
        .brand-subtitle {
            font-size: 14px;
            color: #6b7280;
        }
    }
}
}



</style>
