<template>
    <div class="d-flex card-hover" data-bs-toggle="modal" :data-bs-target="`#editWorksheetModal${id}`">
        <div :style="{ width }" style="cursor: pointer;"
            class="d-flex align-items-center justify-content-center border-bottom border-start border-black py-2">
            {{ name }}</div>
        <div :style="{ width }" style="cursor: pointer;"
            class="d-flex align-items-center justify-content-center  border-bottom border-start border-black py-2">
            {{ type }}</div>
        <div :style="{ width }" style="cursor: pointer;"
            class="d-flex align-items-center justify-content-center  border-bottom border-start border-black py-2">
            {{ date }}</div>
        <div :style="{ width }" style="cursor: pointer;"
            class="d-flex align-items-center justify-content-center  border-bottom border-start border-end border-black py-2">
            {{ value }}</div>
    </div>

    <CreateWorksheetModal :id="`editWorksheetModal${id}`" title="Editar Linha da Planilha" customClass="">
        <template #default>
            <div class="d-flex gap-3">
                <MainInput v-model="inputName" label="Nome" placeholder="Nome" />
                <MainInput v-model="inputType" label="Tipo" placeholder="Fixa" />
            </div>
            <div class="d-flex gap-3 mt-3">
                <MainInput v-model="inputDate" label="Vencimento" placeholder="22/03/2022" type="date" class="w-50" />
                <MainInput v-model="inputValue" label="Valor" placeholder="R$ 100,00" />
            </div>
        </template>

        <template #footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <MainButton customClass="fw-medium" :width="'100px'" :height="'40px'" text="Criar"
                :onClick="handleEditWorksheet" :isLoading="false" :isDisabled="false" />
        </template>
    </CreateWorksheetModal>
</template>

<script>
import MainButton from '../buttons/MainButton.vue';
import MainInput from '../inputs/MainInput.vue';
import CreateWorksheetModal from '../modals/CreateWorksheetModal.vue';

export default {
    name: "CardWorksheet",
    components: { CreateWorksheetModal, MainButton, MainInput },
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            default: "Nome"
        },
        date: {
            type: String,
            default: "24/05/2010"
        },
        type: {
            type: String,
            default: "Fixa"
        },
        value: {
            type: String,
            default: "R$ 0,00"
        },
        width: {
            type: String,
            default: '25%',
        },
    },
    data() {
        return {
            inputName: this.name,
            inputType: this.type,
            inputDate: this.date,
            inputValue: this.value,
        };
    },
    methods: {
        handleEditWorksheet() {
            const dados = {
                id: this.id,
                name: this.inputName,
                type: this.inputType,
                date: this.inputDate,
                value: this.inputValue,
            };

            console.log("Dados Editados:", dados);
        }
    },
}
</script>
<style scoped>
.card-hover:hover {
    background-color: #eff1f3;
    transition: background-color 0.5s ease;
}
</style>