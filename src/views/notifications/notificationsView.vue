<template>
    <div class="d-flex" style="min-height: 100vh;">
        <Sidebar :isOpen="isSidebarOpen" />

        <div class="flex-grow-1 d-flex flex-column" style="min-height: 100vh;">
            <Navbar :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />

            <div class="flex-grow-1 p-5" style="padding-bottom: 60px;">
                <div class="container bg-white shadow-sm rounded p-4">
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
                            <div class="d-flex justify-content-between align-items-center flex-wrap">
                                <div class="card border-0 shadow rounded mt-4" style="width: 48%;">
                                    <h6 class="pt-2 card-header px-4 fw-semibold">Titulo</h6>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="px-4 pt-2 fw-normal">Descrição da notificação.</p>
                                        <span class="text-white bg-success text-center rounded px-3 py-1 me-4"
                                            style="width: 90px; height: 35px;">Ativo</span>
                                    </div>
                                </div>
                                <div class="card border-0 shadow rounded mt-4" style="width: 48%;">
                                    <h6 class="pt-2 card-header px-4 fw-semibold">Titulo</h6>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="px-4 pt-2 fw-normal">Descrição da notificação.</p>
                                        <span class="text-white bg-success text-center rounded px-3 py-1 me-4"
                                            style="width: 90px; height: 35px;">Ativo</span>
                                    </div>
                                </div>
                                <div class="card border-0 shadow rounded mt-4" style="width: 48%;">
                                    <h6 class="pt-2 card-header px-4 fw-semibold">Titulo</h6>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="px-4 pt-2 fw-normal">Descrição da notificação.</p>
                                        <span class="text-white bg-danger text-center rounded px-3 py-1 me-4"
                                            style="width: 90px; height: 35px;">Inativo</span>
                                    </div>
                                </div>
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
                                            customDivClass="w-75" />
                                        <MainInput v-model="data" label="Vencimento" placeholder="22/10/2023"
                                            type="date" />
                                    </div>
                                    <TextAreaInput v-model="descricao" label="Descrição" placeholder=""
                                        :height="'120px'" />
                                </div>

                                <div class="d-flex justify-content-end mb-2 me-4">
                                    <MainButton customClass="fw-medium" :width="'160px'" :height="'40px'" text="Criar"
                                        :onClick="handleCriar" :isLoading="false" :isDisabled="false" />
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

export default {
    name: 'Notification',
    components: { Sidebar, Navbar, Footer, MainInput, TextAreaInput, MainButton },
    data() {
        return {
            isSidebarOpen: true,
            activeTab: 1,
            titulo: "",
            data: "",
            descricao: "",
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen
        },
        handleCriar() { },
    }
}
</script>
