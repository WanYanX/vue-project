import { createRouter, createWebHistory } from "vue-router";
import BackenLayout from "@/components/BackenLayout.vue";
import AuthLayout from "@/components/AuthLayout.vue";
import FrontendLayout from "@/components/FrontendLayout.vue";

//路由的配置
const backend_routes = [
  {
    path: "/back",
    redirect: "/back/dashboard",
    component: BackenLayout,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          title: "数据分析",
          icon: "PieChart",
        },
      },
      {
        path: "knowledge",
        component: () => import("@/views/Knowledge.vue"),
        meta: {
          title: "知识文章",
          icon: "ChatLineSquare",
        },
      },
      {
        path: "consultation",
        component: () => import("@/views/Consultations.vue"),
        meta: {
          title: "咨询记录",
          icon: "Message",
        },
      },
      {
        path: "emotional",
        component: () => import("@/views/Emotional.vue"),
        meta: {
          title: "情绪日志",
          icon: "User",
        },
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        component: () => import("@/views/Login.vue"),
        meta: {
          title: "登录",
        },
      },
      {
        path: "register",
        component: () => import("@/views/Register.vue"),
        meta: {
          title: "注册",
        },
      },
    ],
  },
];

const frontend_routes = [
  {
    path: "/",
    component: FrontendLayout,
    children: [
      {
        path: "/",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/consultation",
        component: () => import("@/views/Consultation.vue"),
      },
      {
        path: "/emotion-diary",
        component: () => import("@/views/EmotionDiary.vue"),
      },
      {
        path: "/knowledge",
        component: () => import("@/views/FrontendKnowledge.vue"),
      },
      {
        path: "/knowledge/article/:id",
        component: () => import("@/views/ArticleDetail.vue"),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...backend_routes, ...frontend_routes],
});

// 路由前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (token) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo.userType === 2) {
      // 后台用户
      if (to.path.startsWith("/back")) {
        next();
      } else {
        next("/back/dashboard");
      }
    } else if (userInfo.userType === 1) {
      // 前台用户无法访问后台
      if (to.path.startsWith("/back") || to.path.startsWith("/auth")) {
        next("/");
      } else {
        next();
      }
    }
  } else {
    //未登录
    if (to.path.startsWith("/back")) {
      next("/auth/login");
    } else {
      next();
    }
  }
});

export default router;
