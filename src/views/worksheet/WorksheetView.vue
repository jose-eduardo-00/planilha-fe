<template>
    <div class="d-flex" style="min-height: 100vh;">
        <Sidebar :isOpen="isSidebarOpen" />

        <div class="flex-grow-1 d-flex flex-column" style="min-height: 100vh;">
            <Navbar :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />

            <div class="flex-grow-1 p-5" style="padding-bottom: 60px;">
                <MainAlertView v-if="alertVisible" :message="alertMessage" :title="alertTitle" :type="alertType"
                    class="mb-3" style="display: flex; justify-content: start !important;" />

                <div class="d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-plus fa-lg me-4 text-dark" style="cursor: pointer;" data-bs-toggle="modal"
                        data-bs-target="#createModal"></i>
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
                        <CardWorksheet v-for="line in lines" :key="line.id" :id="line.id" :name="line.nome"
                            :type="line.tipo" :date="formatDate(line.data)" :value="formatarDinheiro(line.valor)" />
                    </div>
                </div>
            </div>

            <Footer />
        </div>

        <CreateWorksheetModal id="createModal" title="Criar Linha" customClass="">
            <template #default>
                <MainInput v-model="name" label="Nome da linha" placeholder="nome" />
                <div class="d-flex flex-row justify-content-between">
                    <SelectInput v-model="type" label="Tipo" placeholder="tipo" :options="typeOptions"
                        customClass="form-control-lg" customDivClass="" style="width: 45% !important;" />
                    <MainInput v-model="date" label="Vencimento" placeholder="vencimento" type="date"
                        style="width: 45% !important;" />
                </div>
                <MainInput v-model="value" label="Valor" placeholder="valor" :maskFunction="maskValue" />
            </template>

            <template #footer>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <MainButton customClass="fw-medium" :width="'100px'" :height="'40px'" text="Criar"
                    :onClick="handleCreateLine" :isLoading="isLoading" :isDisabled="isLoading"
                    data-bs-dismiss="modal" />
            </template>
        </CreateWorksheetModal>

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
import api from "../../services/api/worksheets/index"
import CreateWorksheetModal from '../../components/modals/CreateWorksheetModal.vue'
import MainInput from '../../components/inputs/MainInput.vue'
import SelectInput from '../../components/inputs/SelectInput.vue'
import MainAlertView from '../../components/alerts/MainAlertView.vue'

export default {
    name: 'WorksheetView',
    components: { Sidebar, Navbar, Footer, CardWorksheet, DeleteModal, MainButton, CreateWorksheetModal, MainInput, SelectInput, MainAlertView },
    data() {
        return {
            isSidebarOpen: true,
            title: 'Nome da Planilha',
            id: null,
            worksheet: null,
            lines: [],
            isLoading: false,

            name: "",
            type: "",
            date: "",
            value: "R$ 0,00",
            typeOptions: [
                { value: 'Fixa', label: 'Fixa' },
                { value: 'Variavel', label: 'Variável' },
            ],

            alertVisible: false,
            alertMessage: "",
            alertTitle: "",
            alertType: ""
        }
    },
    mounted() {
        let id = this.$route.params.id
        this.id = id

        this.getWorksheet(id)
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen
        },
        getWorksheet(id) {
            api.getMyWorkSheet(id).then(res => {
                console.log(res.status, res.data)
                if (res.status === 200) {
                    this.worksheet = res.data.planilha;
                    this.lines = res.data.planilha.linhas
                    this.title = res.data.planilha.nome
                }
            })
        },
        maskValue(val) {
            let numbers = val.replace(/\D/g, '')

            let num = parseInt(numbers || '0', 10);

            let reais = (num / 100).toFixed(2);

            const formatted = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
            }).format(reais);

            return formatted;
        },
        formatDate(date) {
            const options = {
                timeZone: 'UTC',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            };

            return new Date(date).toLocaleDateString('pt-BR', options);
        },
        formatarDinheiro(valor) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(valor);
        },
        formatValueForBackend(value) {
            if (typeof value !== 'string' || value === '') {
                return null;
            }

            let newValue = value.replace(/R\$\s*/, '');
            newValue = newValue.replace(/\./g, '');
            newValue = newValue.replace(',', '.');

            if (newValue === '') {
                return null;
            }
            return parseFloat(newValue);
        },
        handleCreateLine() {
            let nome = this.name
            let tipo = this.type
            let vencimento = this.date
            let valor = this.formatValueForBackend(this.value)

            if (nome === "" || tipo === "" || vencimento === "" || valor === "R$ 0,00" || valor === "") {
                this.alertVisible = true
                this.alertMessage = "Por favor, preencha todos os campos."
                this.alertTitle = "Aviso"
                this.alertType = "warning"

                setTimeout(() => {
                    this.alertVisible = false
                    this.alertMessage = ""
                    this.alertTitle = ""
                    this.alertType = ""
                }, 3000);
                return
            }

            api.createLine(this.id, nome, tipo, vencimento, valor).then(res => {
                console.log(res.status, res.data)
                if (res.status === 201) {
                    this.alertVisible = true
                    this.alertMessage = "Linha adicionada com sucesso!"
                    this.alertTitle = "Sucesso"
                    this.alertType = "success"

                    this.name = ""
                    this.type = ""
                    this.date = ""
                    this.value = "R$ 0,00"

                    this.getWorksheet(this.id)

                    setTimeout(() => {
                        this.alertVisible = false
                        this.alertMessage = ""
                        this.alertTitle = ""
                        this.alertType = ""
                    }, 3000);
                } else {
                    this.alertVisible = true
                    this.alertMessage = "Erro ao criar linha. Tente novamente mais tarde."
                    this.alertTitle = "Erro"
                    this.alertType = "danger"

                    setTimeout(() => {
                        this.alertVisible = false
                        this.alertMessage = ""
                        this.alertTitle = ""
                        this.alertType = ""
                    }, 3000);
                }
            }).catch(err => {
                console.log(err)
                this.alertVisible = true
                this.alertMessage = "Erro de conexão. Tente novamente mais tarde."
                this.alertTitle = "Erro"
                this.alertType = "danger"
            })

        },
        openDeleteModal() { },
        deletePlanilha() { },
    }
}
</script>
