<template>
    <div class="d-flex" style="min-height: 100vh;">
        <Sidebar :isOpen="isSidebarOpen" />

        <div class="flex-grow-1 d-flex flex-column" style="min-height: 100vh;">
            <Navbar :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />

            <div class="flex-grow-1 p-4" style="padding-bottom: 60px;">
                <div class="d-flex justify-content-around mt-5">
                    <div style="width: 40%;">
                        <h2>Perfil</h2>
                        <div class="card" style="width: 100%;">
                            <div class="card-header"></div>
                            <div class="card-body p-4">
                                <div class="mb-4">
                                    <h4>Nome</h4>
                                    <p class="border-bottom pb-2 border-black px-2 text-secondary-emphasis">José Eduardo
                                    </p>
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <p class="border-bottom pb-2 border-black px-2">example@gmail.com</p>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-end">
                                <MainButton customClass="fw-medium" :width="'100px'" :height="'40px'" text="Editar"
                                    data-bs-toggle="modal" data-bs-target="#profileModal" :isLoading="false" />
                            </div>

                            <EditProfileModal id="profileModal" title="Editar Perfil" customClass="">
                                <template #default>
                                    <MainInput v-model="nomeEdit" label="Nome" placeholder="Seu nome" />
                                    <MainInput v-model="emailEdit" label="Email" placeholder="seu@email.com" />
                                </template>

                                <template #footer>
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancelar</button>
                                    <MainButton customClass="fw-medium" text="Salvar" :width="'100px'" :height="'40px'"
                                        :onClick="handleEditProfile" :isLoading="false" />
                                </template>
                            </EditProfileModal>
                        </div>
                    </div>
                    <div style="width: 40%;">
                        <h2>Dados Base</h2>
                        <div class="card" style="width: 100%;">
                            <div class="card-header"></div>
                            <div class="card-body p-4">
                                <div class="mb-4">
                                    <h4>Salário</h4>
                                    <p class="border-bottom pb-2 border-black px-2 text-secondary-emphasis">{{
                                        formatarDinheiro(salario) }}
                                    </p>
                                </div>
                                <div>
                                    <h4>Outras Fontes</h4>
                                    <p class="border-bottom pb-2 border-black px-2">{{ formatarDinheiro(outrasFontes)
                                    }}</p>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-end">
                                <MainButton customClass="fw-medium" :width="'100px'" :height="'40px'" text="Editar"
                                    data-bs-toggle="modal" data-bs-target="#baseDataModal" :isLoading="false" />
                            </div>

                            <EditProfileModal id="baseDataModal" title="Editar Perfil" customClass="">
                                <template #default>
                                    <MainInput v-model="input1" label="Salário" placeholder="R$ 1000,00" />
                                    <MainInput v-model="input2" label="Outras Fontes" placeholder="R$ 1000,00" />
                                </template>

                                <template #footer>
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancelar</button>
                                    <MainButton customClass="fw-medium" :width="'100px'" :height="'40px'" text="Salvar"
                                        :onClick="handleEditBaseData" :isLoading="false" />
                                </template>
                            </EditProfileModal>

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
import MainButton from '../../components/buttons/MainButton.vue'
import EditProfileModal from '../../components/modals/EditProfileModal.vue'
import MainInput from '../../components/inputs/MainInput.vue'

export default {
    name: 'Profile',
    components: { Sidebar, Navbar, Footer, MainButton, EditProfileModal, MainInput },
    data() {
        return {
            isSidebarOpen: true,
            outrasFontes: 0,
            salario: 0,

            salarioEdit: 0,
            outrasFontesEdit: 0,
            nomeEdit: "",
            emailEdit: "",
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen
        },
        formatarDinheiro(valor) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(valor);
        },
        handleEditProfile() { },
        handleEditBaseData() { },
    }
}
</script>
