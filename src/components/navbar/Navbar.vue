<template>
    <nav class="navbar text-white px-5 py-3 d-flex align-items-center" style="background-color: #212121;">
        <button @click="$emit('toggleSidebar')" class="btn btn-light">
            <i class="fa-solid fa-bars fa-lg"></i>
        </button>

        <div style="cursor: pointer;" class="position-relative" @click="toggleDropdown">
            <i v-if="!showDropDown" class="fa-solid fa-caret-down fa-lg me-3"></i>
            <i v-else class="fa-solid fa-caret-up fa-lg me-3"></i>

            <span class="rounded bg-light d-inline-flex justify-content-center align-items-center"
                style="width: 40px; height: 40px;">
                <i class="fa-regular fa-user fa-lg" style="color: #212121;"></i>
            </span>

            <ul @click.stop v-if="showDropDown" class="dropdown-menu dropdown-menu-end mt-2 text-center"
                style="min-width: 250px; position: absolute; right: -20px; top: 40px; z-index: 100; display: block;">
                <li class="text-center w-100" style="display: flex; align-items: center; justify-content: center;">
                    <router-link to="/profile" class="dropdown-item border-bottom border-dark py-2 mb-1 w-100 px-2"
                        style="width: 90% !important;">
                        Perfil
                    </router-link>
                </li>
                <!-- <li class="text-center w-100" style="display: flex; align-items: center; justify-content: center;">
                    <router-link to="/configuracoes"
                        class="dropdown-item border-bottom border-dark py-2 mb-1 w-100 px-2"
                        style="width: 90% !important;">
                        Configurações
                    </router-link>
                </li> -->
                <li class="mt-4 d-flex justify-content-center">
                    <MainButton customClass="fw-medium" :width="'90%'" :height="'40px'" text="Sair"
                        :onClick="handleLogout" :isLoading="isLoadingLogout" :isDisabled="isLoadingLogout" />
                </li>
            </ul>
        </div>
    </nav>
</template>


<script>
import MainButton from '../buttons/MainButton.vue';
import api from "../../services/api/auth/index";
import { useAuthStore } from '../../store';

export default {
    name: 'Navbar',
    components: { MainButton },
    props: {
        isSidebarOpen: Boolean,
    },
    data() {
        return {
            showDropDown: false,
            isLoadingLogout: false,
            user: null,
            token: null
        }
    },
    mounted() {
        document.addEventListener('click', this.handleOutsideClick);

        this.checkAuth();
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    methods: {
        async checkAuth() {
            const auth = useAuthStore();
            auth.loadToken();

            this.user = auth.user;
            this.token = auth.token;
        },
        toggleDropdown() {
            this.showDropDown = !this.showDropDown
        },
        handleLogout() {
            this.isLoadingLogout = true;

            const userId = this.user.id
            const token = this.token

            const auth = useAuthStore();

            if (userId && token) {
                api.logout(userId, token)
                    .then((res) => {
                        if (res.status === 200) {
                            auth.logout()
                            this.showDropDown = false;
                            this.isLoadingLogout = false;
                            this.$router.push('/');
                        } else {
                            this.isLoadingLogout = false;
                        }
                    })
            } else {
                this.isLoadingLogout = false;
            }
        },
        handleOutsideClick(e) {
            const dropdown = this.$el.querySelector('.position-relative');
            if (dropdown && !dropdown.contains(e.target)) {
                this.showDropDown = false;
            }
        },
    },
}
</script>
