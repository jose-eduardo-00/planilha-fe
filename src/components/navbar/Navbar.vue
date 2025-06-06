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

            <ul v-if="showDropDown" class="dropdown-menu dropdown-menu-end mt-2 text-center"
                style="min-width: 250px; position: absolute; right: -20px; top: 40px; z-index: 100; display: block;">
                <li class="text-center w-100" style="display: flex; align-items: center; justify-content: center;">
                    <router-link to="/profile" class="dropdown-item border-bottom border-dark py-2 mb-1 w-100 px-2"
                        style="width: 90% !important;">
                        Perfil
                    </router-link>
                </li>
                <li class="text-center w-100" style="display: flex; align-items: center; justify-content: center;">
                    <router-link to="/configuracoes"
                        class="dropdown-item border-bottom border-dark py-2 mb-1 w-100 px-2"
                        style="width: 90% !important;">
                        Configurações
                    </router-link>
                </li>
                <li class="mt-4">
                    <button class="btn btn-dark text-white" @click="handleLogout" style="width: 90%;">Sair</button>
                </li>
            </ul>
        </div>
    </nav>
</template>


<script>
export default {
    name: 'Navbar',
    props: {
        isSidebarOpen: Boolean,
    },
    data() {
        return {
            showDropDown: false,
        }
    },
    mounted() {
        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    methods: {
        toggleDropdown() {
            this.showDropDown = !this.showDropDown
        },
        handleLogout() {
            this.$router.push('/');
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
