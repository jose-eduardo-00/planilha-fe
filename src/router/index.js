import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/home/homeView.vue";
import LoginView from "../views/auth/login/loginView.vue";
import RegisterView from "../views/auth/register/registerView.vue";

const routes = [
  { path: "/", name: "Login", component: LoginView },
  { path: "/home", name: "Home", component: HomeView },
  { path: "/register", name: "Register", component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
