import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/home/homeView.vue";
import LoginView from "../views/auth/login/loginView.vue";
import RegisterView from "../views/auth/register/registerView.vue";
import ProfileView from "../views/profile/profileView.vue";
import MyWorksheetsView from "../views/myWorksheets/myWorksheetsView.vue";
import UsersListView from "../views/usersList/usersListView.vue";
import NotificationView from "../views/notifications/notificationsView.vue";

const routes = [
  { path: "/", name: "Login", component: LoginView },
  { path: "/home", name: "Home", component: HomeView },
  { path: "/register", name: "Register", component: RegisterView },
  { path: "/profile", name: "Profile", component: ProfileView },
  { path: "/my-worksheets", name: "MyWorksheets", component: MyWorksheetsView },
  { path: "/users-list", name: "UsersList", component: UsersListView },
  { path: "/notifications", name: "Notification", component: NotificationView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
