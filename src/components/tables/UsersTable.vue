<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th class="text-center fw-bold">Nome</th>
                <th class="text-center fw-bold">Email</th>
                <th class="text-center fw-bold">Nível</th>
                <th class="text-center fw-bold">Origem</th>
                <th class="text-center fw-bold">Status</th>
                <th class="text-center fw-bold">Data de Registro</th>
                <th class="text-center fw-bold">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id" class="align-middle">
                <td class="text-center fw-medium">{{ user.name }}</td>
                <td class="text-center fw-medium">{{ user.email }}</td>

                <td v-if="user.nivel == 1" class="text-center">
                    <span class="fw-medium rounded bg-black py-1 px-2 text-white">Admin</span>
                </td>
                <td v-if="user.nivel == 2" class="text-center">
                    <span class="fw-medium rounded bg-primary py-1 px-2 text-white">Cliente</span>
                </td>

                <td v-if="user.origin == 1" class="text-center fw-medium">Desktop</td>
                <td v-if="user.origin == 2" class="text-center fw-medium">Mobile</td>

                <td v-if="user.status == 1" class="text-center"><span
                        class="bg-success py-1 px-2 rounded text-white fw-medium">Ativo</span></td>
                <td v-if="user.status == 2" class="text-center"><span
                        class="bg-danger py-1 px-2 rounded text-white fw-medium">Inativo</span></td>

                <td class="text-center fw-medium pt-2">{{ formatDate(user.createdAt) }}</td>
                <td class="text-center fw-medium pt-2">
                    <button v-if="user.status == 2" class="btn btn-sm btn-success" data-bs-toggle="modal"
                        :data-bs-target="`#blockedModal${user.id}`" @click="handleActiveUser(user)"><i
                            class="fa-solid fa-check"></i></button>
                    <button v-if="user.status == 1" class="btn btn-sm btn-danger" data-bs-toggle="modal"
                        :data-bs-target="`#blockedModal${user.id}`" @click="handleDesactiveUser(user)"><i
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

    <EditProfileModal v-for="user in users" :key="user.id" :id="`blockedModal${user.id}`" title="Editar Perfil"
        customClass="">
        <template #default>
            <div class="align-items-center text-center mt-3">
                <p>Deseja {{ user.status == 1 ? 'desbloquear' : 'bloquear' }} o usuário {{ user.name }} ?</p>
            </div>
        </template>

        <template #footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <MainButton
                :customClass="'fw-medium ' + (user.status == 1 ? 'bg-danger border border-danger' : 'bg-success border border-success')"
                :text="user.status == 1 ? 'Desbloquear' : 'Bloquear'" :width="''" :height="'40px'"
                :onClick="user.status == 1 ? handleDesactiveUser : handleActiveUser" :isLoading="false"
                :isDisabled="false" />
        </template>
    </EditProfileModal>

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
