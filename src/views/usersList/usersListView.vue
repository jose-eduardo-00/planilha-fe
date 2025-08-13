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
                    <div class="card-header d-flex flex-row justify-content-between align-items-center">
                        <div style="width: 45%;" class="mt-3">
                            <SearchInput v-model="searchInput" placeholder="nome" />
                        </div>
                        <div class="mt-3">
                            <MainAlertView v-if="alertVisible" :message="alertMessage" :title="alertTitle"
                                :type="alertType" class="mb-3"
                                style="padding-left: 80px !important; padding-right: 80px !important;" />
                        </div>
                    </div>
                    <div class="card-body">
                        <UsersTable :users="paginatedUsers" :funcEditUser="handleEditProfile"
                            :funcDeleteUser="deleteProfile" :funcBlockUser="handleDesactiveUser"
                            :funcActiveUser="handleActiveUser" :isLoadingActive="isLoadingActive"
                            :isLoadingEdit="isLoadingEdit" :isLoadingDelete="isLoadingDelete" />
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
import MainAlertView from '../../components/alerts/MainAlertView.vue'

export default {
    name: 'UsersList',
    components: { Sidebar, Navbar, Footer, SearchInput, MainButton, UsersTable, MainAlertView },
    data() {
        return {
            isSidebarOpen: true,
            searchInput: "",
            currentPage: 1,
            itemsPerPage: 5,
            users: [],

            alertVisible: false,
            alertMessage: "",
            alertTitle: "",
            alertType: "",

            isLoadingActive: false,
            isLoadingEdit: false,
            isLoadingDelete: false
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
        },

        handleEditProfile(id, name, email) {
            console.log(id, name, email)
            this.isLoadingEdit = true

            api.editUser(id, name, email).then((res) => {
                if (res.status === 200) {
                    this.isLoadingEdit = false
                    this.alertMessage = "Usuário editado com sucesso!"
                    this.alertTitle = "Sucesso"
                    this.alertType = "success"
                    this.getAllUsers()
                    this.alertVisible = true

                    setTimeout(() => {
                        this.alertVisible = false
                        this.alertMessage = ""
                        this.alertTitle = ""
                        this.alertType = ""
                    }, 3000);
                } else {
                    this.isLoadingEdit = false
                    this.alertMessage = "Erro ao editar usuario, tente novamente mais tarde!"
                    this.alertTitle = "Erro"
                    this.alertType = "error"
                    this.alertVisible = true
                }
            })
        },
        deleteProfile(user) {
            console.log(user)
            this.isLoadingDelete = true

            api.deleteUser(user.id).then((res) => {
                if (res.status === 200) {
                    this.isLoadingDelete = false
                    this.alertMessage = "Usuário deletado com sucesso!"
                    this.alertTitle = "Sucesso"
                    this.alertType = "success"
                    this.getAllUsers()
                    this.alertVisible = true

                    setTimeout(() => {
                        this.alertVisible = false
                        this.alertMessage = ""
                        this.alertTitle = ""
                        this.alertType = ""
                    }, 3000);
                } else {
                    this.isLoadingDelete = false
                    this.alertMessage = "Erro ao deletar usuario, tente novamente mais tarde!"
                    this.alertTitle = "Erro"
                    this.alertType = "error"
                    this.alertVisible = true
                }
            })
        },
        handleActiveUser(user) {
            console.log("Ativando o usuario ===>", user)
            this.isLoadingActive = true

            api.editStatusUser(user.id, true).then((res) => {
                if (res.status === 200) {
                    this.getAllUsers()
                    this.isLoadingActive = false
                    this.alertMessage = "Usuário ativado com sucesso!"
                    this.alertTitle = "Sucesso"
                    this.alertType = "success"
                    this.alertVisible = true

                    setTimeout(() => {
                        this.alertVisible = false
                        this.alertMessage = ""
                        this.alertTitle = ""
                        this.alertType = ""
                    }, 3000);
                } else {
                    this.isLoadingActive = false
                    this.alertMessage = "Erro ao ativar usuario, tente novamente mais tarde!"
                    this.alertTitle = "Erro"
                    this.alertType = "error"
                    this.alertVisible = true
                }
            })
        },
        handleDesactiveUser(user) {
            console.log("Desativando o usuario ===>", user)
            this.isLoadingActive = true

            api.editStatusUser(user.id, false).then((res) => {
                if (res.status === 200) {
                    this.isLoadingActive = false
                    this.getAllUsers()
                    this.alertMessage = "Usuário desativado com sucesso!"
                    this.alertTitle = "Sucesso"
                    this.alertType = "success"
                    this.alertVisible = true

                    setTimeout(() => {
                        this.alertVisible = false
                        this.alertMessage = ""
                        this.alertTitle = ""
                        this.alertType = ""
                    }, 3000);
                } else {
                    this.isLoadingActive = false
                    this.alertMessage = "Erro ao desativar usuario, tente novamente mais tarde!"
                    this.alertTitle = "Erro"
                    this.alertType = "error"
                    this.alertVisible = true
                }
            })
        },
    }
}
</script>
