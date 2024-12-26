import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import LoginView from "./views/LoginView.vue";

const routes = [
    { path: "/", component: HomeView },
    { path: '/about', component: AboutView },
    { path: "/login", component: LoginView },
    { path: '/dashboard', component: () => import('./views/protected/DashboardView.vue'), name: "Dashboard", meta: { requiresAuth: true } },

];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') ? !!localStorage.getItem('isAuthenticated') : false
    const accessToken = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : ''
    if (isAuthenticated && accessToken) {
        // store.dispatch('setData', { isAuthenticated, accessToken })
    }
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: "Login" });
    } else {
        next();
    }
})

export default router;
