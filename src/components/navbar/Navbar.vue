<template>
    <nav class="navbar text-white px-5 py-3 d-flex align-items-center" style="background-color: #212121;">
        <button @click="$emit('toggleSidebar')" class="btn btn-light">
            <i class="fa-solid fa-bars fa-lg"></i>
        </button>

        <div style="cursor: pointer;" class="position-relative" id="dropdownMenuButton" data-bs-toggle="dropdown"
            aria-expanded="false" @click="toggleDropdown">
            <i class="fa-solid fa-caret-down fa-lg me-3"></i>
            <!-- <i v-if="!showDropDown" class="fa-solid fa-caret-down fa-lg me-3"></i>
            <i v-else class="fa-solid fa-caret-up fa-lg me-3"></i> -->

            <span class="rounded bg-light d-inline-flex justify-content-center align-items-center"
                style="width: 40px; height: 40px;">
                <i class="fa-regular fa-user fa-lg" style="color: #212121;"></i>
            </span>

            <ul class="dropdown-menu dropdown-menu-end mt-2 text-center" aria-labelledby="dropdownMenuButton"
                style="min-width: 250px;">
                <li class="text-center w-100" style="display: flex; align-items: center; justify-content: center;">
                    <a href="#" class="dropdown-item border-bottom border-dark py-2 mb-1 w-100 px-2"
                        style="width: 90% !important;">Perfil</a>
                </li>
                <li class="text-center w-100" style="display: flex; align-items: center; justify-content: center;">
                    <a href="#" class="dropdown-item border-bottom border-dark py-2 mb-1 w-100 px-2"
                        style="width: 90% !important;">Configurações</a>
                </li>
                <li class="mt-4">
                    <button class="btn btn-dark text-white" style="width: 90%;">Sair</button>
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

    methods: {
        toggleDropdown() {
            this.showDropDown = !this.showDropDown
        },
    },
}
</script>
