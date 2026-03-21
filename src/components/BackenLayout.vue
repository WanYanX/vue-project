<template>
    <div class="backend-layout">
        <el-container class="main-container">
            <!-- 侧边栏 -->
           <SideBar/>
            <el-container>
                <!-- 页面头 -->
                <el-header>
                    <NavBar/>
                </el-header>
                <!-- 页面主体 -->
                <!-- 属于子路由 -->
               <el-main class="main-container">
                    <!-- 路由出入口 -->
                    <router-view class="content-container"></router-view>
               </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
    import SideBar from './SideBar.vue'
    import NavBar from './NavBar.vue'
</script>
<style lang="scss" scoped>
.backend-layout {
    height: 100vh;
    .el-header {
        height: 74px !important;
    }
    .main-container {
        height: 100%;
        .content-container {
            border-radius: 10px;
            padding: 20px;
            min-height: calc(100% - 74px);
            background-color: #fff;
        }
    }
}
</style>
