import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
    loadToken() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
      }
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
});
