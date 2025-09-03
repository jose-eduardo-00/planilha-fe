<template>
    <div class="sidebar" :class="{ collapsed: !isOpen }">
        <h2 class="title text-white text-center mt-4 mb-2 fs-3" :class="{ 'hide-list': !isOpen }">Admin</h2>
        <hr class="mb-2" style="width: 90%; height: 2px; margin: 0 auto; background-color: #fff;" />
        <ul v-if="admin" class="nav flex-column mt-4" :class="{ 'hide-list': !isOpen }">
            <li class="ms-4  d-flex align-items-center">
                <i class="fa-solid fa-users fa-lg text-white"></i>
                <router-link class="text-white text-decoration-none fs-5 ms-2" to="/users-list">Usuários</router-link>
            </li>
            <hr class="mt-2 mb-4 ms-4" style="width: 70%; height: 2px; background-color: #fff" />

            <li class="ms-4 d-flex align-items-center">
                <i class="fa-solid fa-bell fa-lg text-white"></i>
                <router-link class="text-white text-decoration-none fs-5 ms-2"
                    to="/notifications">Notificações</router-link>
            </li>
            <hr class="mt-2 mb-4 ms-4" style="width: 70%; height: 2px; background-color: #fff;" />
        </ul>

        <h2 class="title text-white text-center mt-4 mb-2 fs-3" :class="{ 'hide-list': !isOpen }">Planilhas</h2>
        <hr class="mb-2" style="width: 90%; height: 2px; margin: 0 auto; background-color: #fff;" />
        <ul class="nav flex-column mt-4" :class="{ 'hide-list': !isOpen }">
            <!-- <li class="ms-4  d-flex align-items-center">
                <i class="fa-solid fa-house fa-lg text-white"></i>
                <router-link class="text-white text-decoration-none fs-5 ms-2" to="/home">Home</router-link>
            </li> 
             <hr class="mt-2 mb-4 ms-4" style="width: 70%; height: 2px; background-color: #fff" /> -->

            <li class="ms-4 d-flex align-items-center">
                <i class="fa-solid fa-table-list fa-lg text-white"></i>
                <router-link class="text-white text-decoration-none fs-5 ms-2" to="/my-worksheets">Minhas
                    Planilhas</router-link>
            </li>
            <hr class="mt-2 mb-4 ms-4" style="width: 70%; height: 2px; background-color: #fff;" />
        </ul>
    </div>
</template>

<script>
import { useAuthStore } from '../../store/index';
import handleCheckToken from '../../utils/checkToken';
import { jwtDecode } from 'jwt-decode';

export default {
    name: 'Sidebar',
    props: {
        isOpen: Boolean
    },
    data() {
        return {
            admin: true,
            token: null
        }
    },
    mounted() {
        this.checkAuth();
    },
    methods: {
        async checkAuth() {
            const auth = useAuthStore();
            auth.loadToken();

            const logged = await handleCheckToken(auth.token);
            if (!logged) {
                this.$router.push('/');
            } else {
                this.token = auth.token;
                const decoded = jwtDecode(auth.token);
                auth.setUser(decoded.user);
            }
        },
    },
}
</script>

<style scoped>
.sidebar {
    width: 250px;
    min-height: 100%;
    transition: width 0.3s ease;
    overflow: hidden;
    background-color: #212121;
}

.sidebar.collapsed {
    width: 0;
    padding: 0 !important;
    border: none !important;
}

.hide-list {
    opacity: 0;
    transition: opacity 0.1s ease;
    pointer-events: none;
}
</style>
