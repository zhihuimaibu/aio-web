import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('/src/components/index.vue') },
        { path: '/404', component: () => import('/src/components/404.vue') },
        { path: '/system/login', component: () => import('/src/components/system/system-login.vue') },
        { path: '/system/user', component: () => import('/src/components/system/system-user.vue') },
        { path: '/blog', component: () => import('/src/components/blog/blog-subject.vue') },
        { path: '/blog/info', component: () => import('/src/components/blog/blog-info.vue') },
        { path: '/blog/edit', component: () => import('/src/components/blog/blog-edit.vue') },
        { path: '/month/balance', component: () => import('/src/components/month/month-balance.vue') },
        { path: "/:pathMatch(.*)", redirect: "/404", name: "notMatch", hidden: true },
    ]
});

export default router