<template>
    <div class="d-flex" style="min-height: 100vh;">
        <Sidebar :isOpen="isSidebarOpen" class="flex-shrink-0" />

        <div class="flex-grow-1 d-flex flex-column" style="min-height: 100vh;">
            <Navbar :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />

            <div class="flex-grow-1 p-4" style="padding-bottom: 60px;">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="fw-semibold mt-2">Planilhas</h4>
                        <MainButton customClass="fw-medium " :width="'160px'" :height="'40px'" text="Criar planilha"
                            :onClick="handleModalCreateWorksheet" :isLoading="false" data-bs-toggle="modal"
                            data-bs-target="#createWorksheetModal" :isDisabled="false" />
                    </div>
                    <div class="card-body mt-4">
                        <div class="d-flex gap-2 flex-wrap justify-content-center">
                            <MainCard :width="'20%'" />
                            <MainCard :width="'20%'" />
                            <MainCard :width="'20%'" />
                            <MainCard :width="'20%'" />
                            <MainCard :width="'20%'" />
                            <MainCard :width="'20%'" />
                            <MainCard :width="'20%'" />
                            <MainCard :width="'20%'" />
                        </div>
                        <div class="d-flex justify-content-center mt-4">
                            <MainButton customClass="fw-medium " :width="'160px'" :height="'40px'" text="Ver Mais"
                                :onClick="handleMore" :isLoading="false" :isDisabled="false" />
                        </div>
                    </div>
                </div>

                <CreateWorksheetModal id="createWorksheetModal" title="Criar Planilha" customClass="">
                    <template #default>
                        <MainInput v-model="input1" label="Nome da PLanilha" placeholder="nome" />
                    </template>

                    <template #footer>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <MainButton customClass="fw-medium" :width="'100px'" :height="'40px'" text="Criar"
                            :onClick="handleCreateWorksheet" :isLoading="false" :isDisabled="false" />
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

export default {
    name: 'MyWorksheets',
    components: { Sidebar, Navbar, Footer, MainButton, MainInput, CreateWorksheetModal, MainCard },
    data() {
        return {
            isSidebarOpen: true
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen
        },
        handleModalCreateWorksheet() { },
        handleCreateWorksheet() { },
        handleMore() { },
    }
}
</script>
