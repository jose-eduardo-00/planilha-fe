<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th class="text-center fw-bold">Nome</th>
                <th class="text-center fw-bold">Email</th>
                <th class="text-center fw-bold">Tipo</th>
                <th class="text-center fw-bold">Status</th>
                <th class="text-center fw-bold">Data de Registro</th>
                <th class="text-center fw-bold">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td class="text-center fw-medium">{{ user.name }}</td>
                <td class="text-center fw-medium pt-2">{{ user.email }}</td>

                <td v-if="user.type == 1" class="text-center fw-medium pt-2">Admin</td>
                <td v-if="user.type == 2" class="text-center fw-medium pt-2">Cliente</td>

                <td v-if="user.status == 1" class="text-center"><span
                        class="bg-success py-1 px-2 rounded text-white fw-medium">Ativo</span></td>
                <td v-if="user.status == 2" class="text-center pt-2"><span
                        class="bg-danger py-1 px-2 rounded text-white fw-medium">Inativo</span></td>

                <td class="text-center fw-medium pt-2">{{ formatDate(user.createdAt) }}</td>
                <td class="text-center fw-medium pt-2">
                    <button v-if="user.status == 2" class="btn btn-sm btn-success" @click="handleActiveUser(user)"><i
                            class="fa-solid fa-check"></i></button>
                    <button v-if="user.status == 1" class="btn btn-sm btn-danger" @click="handleDesactiveUser(user)"><i
                            class="fa-solid fa-ban"></i></button>
                    <button class="btn btn-sm btn-warning ms-1" @click="openEditModal(user)" data-bs-toggle="modal"
                        :data-bs-target="`#profileModal${user.id}`"><i
                            class="fa-solid fa-pen-to-square text-white"></i></button>
                    <button class="btn btn-sm btn-primary ms-1" @click="openDeleteModal(user)" data-bs-toggle="modal"
                        :data-bs-target="`#deleteModal${user.id}`"><i class="fa-solid fa-trash"></i></button>
                </td>

            </tr>
        </tbody>
    </table>

    <EditProfileModal v-for="user in users" :key="user.id" :id="`profileModal${user.id}`" title="Editar Perfil"
        customClass="">
        <template #default>
            <MainInput v-model="nomeEdit" label="Nome" placeholder="Seu nome" />
            <MainInput v-model="emailEdit" label="Email" placeholder="seu@email.com" />
        </template>

        <template #footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <MainButton customClass="fw-medium" text="Salvar" :width="'100px'" :height="'40px'"
                :onClick="handleEditProfile" :isLoading="false" :isDisabled="false" />
        </template>
    </EditProfileModal>

    <DeleteModal v-for="user in users" :key="user.id" :id="`deleteModal${user.id}`" title="Deletar Perfil"
        customClass="">
        <template #default>
            <h4 class="fs-6 fw-normal text-center py-3">Deseja deletar esse usuário: {{ user.name }}</h4>
        </template>

        <template #footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <MainButton customClass="fw-medium bg-danger border border-danger" text="Deletar" :width="'100px'"
                :height="'40px'" :onClick="deleteProfile" :isLoading="false" :isDisabled="false" />
        </template>
    </DeleteModal>

</template>

<script>
import MainButton from '../buttons/MainButton.vue';
import MainInput from '../inputs/MainInput.vue';
import DeleteModal from '../modals/DeleteModal.vue';
import EditProfileModal from '../modals/EditProfileModal.vue';

export default {
    name: 'UsersTable',
    props: {
        users: {
            type: Array,
            required: true
        }
    },
    components: { EditProfileModal, MainButton, MainInput, DeleteModal },
    data() {
        return {
            nomeEdit: "",
            emailEdit: "",
            userEditing: null,
            userDeleting: null,
        }
    },
    methods: {
        openEditModal(user) {
            this.userEditing = user;
            this.nomeEdit = user.name;
            this.emailEdit = user.email;
        },
        openDeleteModal(user) {
            this.userDeleting = user;
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('pt-BR');
        },
        handleEditProfile() { },
        deleteProfile() { },
        handleActiveUser() { },
        handleDesactiveUser() { },
    }
}
</script>
