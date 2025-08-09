<template>
    <div class="d-flex" style="min-height: 100vh;">
        <Sidebar :isOpen="isSidebarOpen" />

        <div class="flex-grow-1 d-flex flex-column" style="min-height: 100vh;">
            <Navbar :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />

            <div class="flex-grow-1 p-5" style="padding-bottom: 60px;">

                <div class="d-flex align-items-center gap-3">
                    <h4 class="fw-semibold" style="margin-bottom: 2px;">Lista de Usuários</h4>
                    <i class="fa-solid fa-users fa-lg text-dark"></i>
                </div>

                <div class="card mt-2">
                    <div class="card-header">
                        <div style="width: 45%;" class="mt-3">
                            <SearchInput v-model="searchInput" placeholder="nome" />
                        </div>

                    </div>
                    <div class="card-body">
                        <UsersTable :users="paginatedUsers" />
                    </div>
                    <div class="card-footer d-flex justify-content-center gap-3 py-3">


                        <MainButton customClass="fw-medium" :width="'100px'" :height="'40px'" text="Anterior"
                            :onClick="previousPage" :isLoading="false" :isDisabled="currentPage === 1" />

                        <div class="bg-body-secondary text-black fw-semibold d-flex justify-content-center align-items-center rounded"
                            style="height: 40px; width: 35px ;">
                            {{ currentPage }}
                        </div>

                        <MainButton customClass="fw-medium" :width="'100px'" :height="'40px'" text="Próximo"
                            :onClick="nextPage" :isLoading="false" :isDisabled="currentPage === totalPages" />

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    </div>
</template>



<script>
import Sidebar from '../../components/sidebar/Sidebar.vue'
import Navbar from '../../components/navbar/Navbar.vue'
import Footer from '../../components/footer/Footer.vue'
import MainButton from '../../components/buttons/MainButton.vue'
import SearchInput from '../../components/inputs/SearchInput.vue'
import UsersTable from '../../components/tables/UsersTable.vue'
import api from '../../services/api/user/index.js'

export default {
    name: 'UsersList',
    components: { Sidebar, Navbar, Footer, SearchInput, MainButton, UsersTable },
    data() {
        return {
            isSidebarOpen: true,
            searchInput: "",
            currentPage: 1,
            itemsPerPage: 5,
            users: []
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredUsers.length / this.itemsPerPage)
        },
        filteredUsers() {
            return this.users.filter(user =>
                user.name.toLowerCase().includes(this.searchInput.toLowerCase())
            )
        },
        paginatedUsers() {
            const start = (this.currentPage - 1) * this.itemsPerPage
            const end = start + this.itemsPerPage
            return this.filteredUsers.slice(start, end)
        }
    },
    watch: {
        searchInput() {
            this.currentPage = 1
        }
    },
    mounted() {
        this.getAllUsers()
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--
            }
        },
        getAllUsers() {
            api.getAllUsers().then((res) => {
                if (res.status === 200) {
                    this.users = res.data.users
                }
            }).catch((error) => {
                console.error("Error fetching users:", error)
            })
        }
    }
}
</script>
