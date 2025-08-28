<template>
    <div class="d-flex" style="min-height: 100vh;">
        <Sidebar :isOpen="isSidebarOpen" class="flex-shrink-0" />

        <div class="flex-grow-1 d-flex flex-column" style="min-height: 100vh;">
            <Navbar :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />

            <div class="flex-grow-1 p-4" style="padding-bottom: 60px;">
                <div class="card">
                    <MainAlertView v-if="alertVisible" :message="alertMessage" :title="alertTitle" :type="alertType"
                        class="mb-3" style="display: flex; justify-content: start !important; margin: 10px;" />
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="fw-semibold mt-2">Planilhas</h4>
                        <MainButton customClass="fw-medium " :width="'160px'" :height="'40px'" text="Criar planilha"
                            :onClick="handleModalCreateWorksheet" :isLoading="false" data-bs-toggle="modal"
                            data-bs-target="#createWorksheetModal" :isDisabled="false" />
                    </div>
                    <div class="card-body mt-4">
                        <div class="d-flex gap-2 flex-wrap justify-content-center">
                            <MainCard v-for="worksheet in visibleWorksheets" :key="worksheet.id" :width="'20%'"
                                :redirect="() => handleWorksheet(worksheet.id)" :title="worksheet.nome"
                                :date="worksheet.createdAt" />
                        </div>
                        <div class="d-flex justify-content-center mt-4" v-if="currentLimit < myWorksheets.length">
                            <MainButton customClass="fw-medium " :width="'160px'" :height="'40px'" text="Ver Mais"
                                :onClick="handleMore" :isLoading="false" :isDisabled="false" />
                        </div>
                    </div>
                </div>

                <CreateWorksheetModal id="createWorksheetModal" title="Criar Planilha" customClass="">
                    <template #default>
                        <MainInput v-model="input1" label="Nome da Planilha" placeholder="nome" />
                    </template>

                    <template #footer>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <MainButton customClass="fw-medium" :width="'100px'" :height="'40px'" text="Criar"
                            :onClick="handleCreateWorksheet" :isLoading="isLoading" :isDisabled="isLoading"
                            data-bs-dismiss="modal" />
                    </template>
                </CreateWorksheetModal>

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
import CreateWorksheetModal from '../../components/modals/CreateWorksheetModal.vue'
import MainInput from '../../components/inputs/MainInput.vue'
import MainCard from '../../components/cards/MainCard.vue'
import { useAuthStore } from '../../store'
import api from "../../services/api/worksheets/index"
import MainAlertView from '../../components/alerts/MainAlertView.vue'

export default {
    name: 'MyWorksheets',
    components: { Sidebar, Navbar, Footer, MainButton, MainInput, CreateWorksheetModal, MainCard, MainAlertView },
    data() {
        return {
            isSidebarOpen: true,
            user: null,
            myWorksheets: [],

            input1: "",

            alertVisible: false,
            alertMessage: "",
            alertTitle: "",
            alertType: "",
            isLoading: false,

            itemsPerPage: 10,
            currentLimit: 10,
        }
    },
    mounted() {
        this.getUser();

        this.getMyWorksheets();
    },
    computed: {
        visibleWorksheets() {
            return this.myWorksheets.slice(0, this.currentLimit);
        },
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen
        },

        async getUser() {
            const auth = useAuthStore();
            auth.loadToken();

            this.user = auth.user;
        },
        getMyWorksheets() {
            api.getMyWorkSheets(this.user.id).then(res => {
                console.log(res.data);
                if (res.status === 200) {
                    this.myWorksheets = res.data;
                }
            })
        },
        handleModalCreateWorksheet() { },
        handleCreateWorksheet() {
            this.isLoading = true
            let nome = this.input1
            let userId = this.user.id

            if (!nome) {
                this.isLoading = false
                this.alertMessage = "Por favor, insira um nome para a planilha."
                this.alertTitle = "Aviso"
                this.alertType = "warning"
                this.alertVisible = true

                setTimeout(() => {
                    this.alertVisible = false
                    this.alertMessage = ""
                    this.alertTitle = ""
                    this.alertType = ""
                }, 3000);
                return;
            }

            api.createWorkSheets(nome, userId).then(res => {
                if (res.status === 201) {
                    this.alertMessage = "Planilha criada com sucesso!"
                    this.alertTitle = "Sucesso"
                    this.alertType = "success"
                    this.alertVisible = true
                    this.getMyWorksheets()

                    setTimeout(() => {
                        this.alertVisible = false
                        this.alertMessage = ""
                        this.alertTitle = ""
                        this.alertType = ""
                        this.isLoading = false
                    }, 2000);
                } else {
                    this.isLoading = false
                    this.alertMessage = "Erro ao criar a planilha. Tente novamente mais tarde."
                    this.alertTitle = "Erro"
                    this.alertType = "danger"
                    this.alertVisible = true

                    setTimeout(() => {
                        this.alertVisible = false
                        this.alertMessage = ""
                        this.alertTitle = ""
                        this.alertType = ""
                    }, 3000);
                }
            }).catch(err => {
                this.isLoading = false
                this.alertMessage = "Erro ao criar a planilha. Tente novamente mais tarde."
                this.alertTitle = "Erro"
                this.alertType = "danger"
                this.alertVisible = true

                setTimeout(() => {
                    this.alertVisible = false
                    this.alertMessage = ""
                    this.alertTitle = ""
                    this.alertType = ""
                }, 3000);
            })
        },
        handleMore() {
            this.currentLimit += this.itemsPerPage;
        },
        handleWorksheet(id) {
            this.$router.push({ name: 'Worksheet', params: { id } });
        },
    }
}
</script>
