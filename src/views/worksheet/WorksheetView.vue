<template>
    <div class="d-flex" style="min-height: 100vh;">
        <Sidebar :isOpen="isSidebarOpen" />

        <div class="flex-grow-1 d-flex flex-column" style="min-height: 100vh;">
            <Navbar :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />

            <div class="flex-grow-1 p-5" style="padding-bottom: 60px;">
                <div class="d-flex align-items-center justify-content-center">
                    <h4 class="text-center mt-2 fw-semibold">
                        {{ title }}
                    </h4>
                    <i class="fa-solid fa-trash fa-lg ms-4 text-danger" style="cursor: pointer;" data-bs-toggle="modal"
                        :data-bs-target="`#deleteModal${id}`"></i>
                </div>

                <div class="card mt-4">
                    <div class="card-header d-flex justify-content-around align-items-center bg-dark text-white p-0"
                        style="height: 40px; ">
                        <div style="width: 25%; height: 100%;" class="d-flex align-items-center justify-content-center">
                            Nome
                        </div>
                        <div style="width: 25%; height: 100%;"
                            class="border-start border-white d-flex align-items-center justify-content-center">Tipo
                        </div>
                        <div style="width: 25%; height: 100%;"
                            class="border-start border-white d-flex align-items-center justify-content-center">
                            Vencimento
                        </div>
                        <div style="width: 25%; height: 100%;"
                            class="border-start border-white d-flex align-items-center justify-content-center">Valor
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <CardWorksheet id="1" name="Água" type="Variável" date="01/01/2024" value="R$ 40,00" />
                        <CardWorksheet id="2" name="Luz" type="Fixa" date="01/01/2024" value="R$ 240,00" />
                        <CardWorksheet id="3" name="Aluguel" type="Fixa" date="01/01/2024" value="R$ 1300,00" />
                    </div>
                </div>
            </div>

            <Footer />
        </div>

        <DeleteModal :id="`deleteModal${id}`" title="Deletar Perfil" customClass="">
            <template #default>
                <h4 class="fs-6 fw-normal text-center py-3">Deseja deletar essa planilha: {{ title }}</h4>
            </template>

            <template #footer>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <MainButton customClass="fw-medium bg-danger border border-danger" text="Deletar" :width="'100px'"
                    :height="'40px'" :onClick="deletePlanilha" :isLoading="false" :isDisabled="false" />
            </template>
        </DeleteModal>
    </div>
</template>



<script>
import Sidebar from '../../components/sidebar/Sidebar.vue'
import Navbar from '../../components/navbar/Navbar.vue'
import Footer from '../../components/footer/Footer.vue'
import CardWorksheet from '../../components/cards/CardWorksheet.vue'
import DeleteModal from '../../components/modals/DeleteModal.vue'
import MainButton from '../../components/buttons/MainButton.vue'

export default {
    name: 'WorksheetView',
    components: { Sidebar, Navbar, Footer, CardWorksheet, DeleteModal, MainButton },
    data() {
        return {
            isSidebarOpen: true,
            title: 'Nome da Planilha',
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen
        },

        openDeleteModal() { },
        deletePlanilha() { },
    }
}
</script>
