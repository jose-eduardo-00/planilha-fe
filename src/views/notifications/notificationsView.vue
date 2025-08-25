<template>
    <div class="d-flex" style="min-height: 100vh;">
        <Sidebar :isOpen="isSidebarOpen" />

        <div class="flex-grow-1 d-flex flex-column" style="min-height: 100vh;">
            <Navbar :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />

            <div class="flex-grow-1 p-5" style="padding-bottom: 60px;">
                <div class="container bg-white shadow-sm rounded p-4">
                    <MainAlertView v-if="alertVisible && activeTab === 2" :message="alertMessage" :title="alertTitle"
                        :type="alertType" class="mb-3" style="display: flex; justify-content: start !important;" />
                    <ul class="nav nav-tabs mb-4">
                        <li class="nav-item">
                            <a class="nav-link" :class="[activeTab === 1 ? 'active text-dark' : 'text-secondary']"
                                @click="activeTab = 1" href="#">
                                Notificações
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" :class="[activeTab === 2 ? 'active text-dark' : 'text-secondary']"
                                @click="activeTab = 2" href="#">
                                Criar Notificação
                            </a>
                        </li>
                    </ul>

                    <div v-if="activeTab === 1">
                        <div class="card p-3 border-0">
                            <h4>Notificações</h4>
                            <div class="d-flex justify-content-between align-items-center flex-wrap"
                                v-if="notifications.length > 0">

                                <div v-for="(item, index) in notifications" :key="index"
                                    class="card border-0 shadow rounded mt-4" style="width: 48%;">
                                    <h6 class="pt-2 card-header px-4 fw-semibold">{{ item.nome }}</h6>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="px-4 pt-2 fw-normal">{{ item.texto.length > 30 ? item.texto.slice(0,
                                            30) + '...' : item.texto }}</p>
                                        <span :class="[
                                            'text-white text-center rounded px-3 py-1 me-4',
                                            new Date(item.validade) >= new Date() ? 'bg-success' : 'bg-danger'
                                        ]" style="width: 90px; height: 35px;">{{ new Date(item.validade) >= new Date()
                                            ? 'Ativo' : 'Inativo' }}</span>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <p>Nenhuma notificação.</p>
                            </div>

                        </div>
                    </div>

                    <div v-if="activeTab === 2">
                        <div class="card p-3 border-0">
                            <h5>Criar Notificações</h5>
                            <div class="card mt-4">
                                <div class="card-body p-4">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <MainInput v-model="titulo" label="Título" placeholder="Titulo da notificação"
                                            customDivClass="" style="width: 55% !important;" />
                                        <SelectInput v-model="platform" label="Plataformas" placeholder="Todas"
                                            :options="platformOptions" customClass="form-control-lg" customDivClass=""
                                            style="width: 20% !important;" />

                                        <MainInput v-model="data" label="Vencimento" placeholder="22/10/2023"
                                            type="date" style="width: 20% !important;" />
                                    </div>
                                    <TextAreaInput v-model="mensagem" label="Mensagem" placeholder=""
                                        :height="'120px'" />
                                </div>

                                <div class="d-flex justify-content-end mb-2 me-4">
                                    <MainButton customClass="fw-medium" :width="'160px'" :height="'40px'" text="Criar"
                                        :onClick="handleCriar" :isLoading="isLoading" :isDisabled="isLoading" />
                                </div>
                            </div>
                        </div>
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
import MainInput from '../../components/inputs/MainInput.vue'
import TextAreaInput from '../../components/inputs/TextAreaInput.vue'
import MainButton from '../../components/buttons/MainButton.vue'
import SelectInput from '../../components/inputs/SelectInput.vue'
import MainAlertView from '../../components/alerts/MainAlertView.vue'
import api from '../../services/api/notification/index'
import { useAuthStore } from '../../store'

export default {
    name: 'Notification',
    components: { Sidebar, Navbar, Footer, MainInput, TextAreaInput, MainButton, SelectInput, MainAlertView },
    data() {
        return {
            isSidebarOpen: true,
            user: null,
            activeTab: 1,
            titulo: "",
            platform: "",
            data: "",
            mensagem: "",
            isLoading: false,
            platformOptions: [
                { value: 1, label: 'Web' },
                { value: 2, label: 'Mobile' },
                { value: 3, label: 'Todas' }
            ],

            alertVisible: false,
            alertMessage: "",
            alertTitle: "",
            alertType: "",

            notifications: [],

        }
    },
    mounted() {
        this.getUser();

        this.getNotifications()
    },
    methods: {
        async getUser() {
            const auth = useAuthStore();
            auth.loadToken();

            this.user = auth.user;
        },
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen
        },
        getNotifications() {
            api.getAllNotification().then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    this.notifications = res.data
                }
            })
        },
        handleCriar() {
            this.isLoading = true

            let titulo = this.titulo
            let plataforma = this.platform
            let data = this.data
            let mensagem = this.mensagem
            let userId = this.user.id

            if (!plataforma) {
                plataforma = "3"
            }

            if (!titulo || !data || !mensagem) {
                this.isLoading = false

                this.alertMessage = "Por favor, preencha todos os campos."
                this.alertTitle = "Aviso"
                this.alertType = "warning"
                this.alertVisible = true

                setTimeout(() => {
                    this.alertVisible = false
                    this.alertMessage = ""
                    this.alertTitle = ""
                    this.alertType = ""
                }, 3000);
                return
            }

            api.createNotification(titulo, mensagem, userId, data, plataforma).then((res) => {
                if (res.status === 201) {
                    this.getNotifications()

                    this.alertMessage = "Notificação criada com sucesso."
                    this.alertTitle = "Sucesso"
                    this.alertType = "success"
                    this.alertVisible = true

                    setTimeout(() => {
                        this.titulo = ""
                        this.platform = ""
                        this.data = ""
                        this.mensagem = ""

                        this.isLoading = false
                        this.alertVisible = false
                        this.alertMessage = ""
                        this.alertTitle = ""
                        this.alertType = ""
                    }, 3000);
                } else if (res.status === 400) {
                    this.isLoading = false
                    this.alertMessage = "Erro ao criar notificação, faltam campos obrigatórios."
                    this.alertTitle = "Erro"
                    this.alertType = "danger"
                    this.alertVisible = true

                    setTimeout(() => {
                        this.alertVisible = false
                        this.alertMessage = ""
                        this.alertTitle = ""
                        this.alertType = ""
                    }, 3000);
                } else {
                    this.isLoading = false
                    this.alertMessage = "Erro de conexão, tente novamente mais tarde."
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
            })
        },
    }
}
</script>
