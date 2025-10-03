<template>
    <div class="d-flex card-hover" data-bs-toggle="modal" :data-bs-target="`#editWorksheetModal${id}`"
        :style="`background-color: ${color}`">
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
            <MainInput v-model="inputName" label="Nome da linha" placeholder="nome" />
            <div class="d-flex flex-row justify-content-between">
                <SelectInput v-model="inputType" label="Tipo" placeholder="tipo" :options="typeOptions"
                    customClass="form-control-lg" customDivClass="" style="width: 45% !important;" />
                <MainInput v-model="inputDate" label="Vencimento" placeholder="vencimento" type="date"
                    style="width: 45% !important;" />
            </div>
            <div class="d-flex flex-row justify-content-between">
                <MainInput v-model="inputValue" label="Valor" placeholder="valor" :maskFunction="maskValue"
                    style="width: 85%;" />
                <ColorInput v-model="colorValue" label="Cor" width="40px" height="40px" />
            </div>

        </template>

        <template #footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <MainButton customClass="fw-medium bg-danger border border-danger" :width="'100px'" :height="'40px'"
                text="Deletar" :onClick="() => deleteFunction(id)" :isLoading="false" :isDisabled="false"
                data-bs-dismiss="modal" />
            <MainButton customClass="fw-medium" :width="'100px'" :height="'40px'" text="Editar"
                :onClick="() => editFunction(id, inputName, inputType, inputDate, inputValue, colorValue)"
                :isLoading="false" :isDisabled="false" data-bs-dismiss="modal" />
        </template>
    </CreateWorksheetModal>
</template>

<script>
import MainButton from '../buttons/MainButton.vue';
import ColorInput from '../inputs/ColorInput.vue';
import MainInput from '../inputs/MainInput.vue';
import SelectInput from '../inputs/SelectInput.vue';
import CreateWorksheetModal from '../modals/CreateWorksheetModal.vue';

export default {
    name: "CardWorksheet",
    components: { CreateWorksheetModal, MainButton, MainInput, SelectInput, ColorInput },
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
        color: {
            type: String,
            default: "#ffffff"
        },
        width: {
            type: String,
            default: '25%',
        },
        editFunction: Function,
        deleteFunction: Function,
    },
    data() {
        return {
            inputName: "",
            inputType: "",
            inputDate: "",
            inputValue: "",
            colorValue: "",
            typeOptions: [
                { value: 'Fixa', label: 'Fixa' },
                { value: 'Variavel', label: 'Variável' },
            ],
        };
    },
    mounted() {
        console.log(this.color)
        this.inputName = this.name;
        this.inputType = this.type;
        this.formatDateForInput()
        this.inputValue = this.value;
        this.colorValue = this.color;
    },
    methods: {
        formatDateForInput() {
            const parts = this.date.split('/');
            this.inputDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        },
    },
}
</script>
<style scoped>
.card-hover:hover {
    background-color: #eff1f3;
    transition: background-color 0.5s ease;
}
</style>