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
                                    <p v-if="user" class="border-bottom pb-2 border-black px-2 text-secondary-emphasis">
                                        {{ user.name }}</p>
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <p v-if="user" class="border-bottom pb-2 border-black px-2">{{ user.email }}</p>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-end">
                                <MainButton customClass="fw-medium" :width="'100px'" :height="'40px'" text="Editar"
                                    @click="openEditProfileModal" :isLoading="false" :isDisabled="false" />
                            </div>

                            <EditProfileModal id="profileModal" title="Editar Perfil" customClass="">
                                <template #default>
                                    <MainAlertView v-if="alertVisible" :message="alertMessage" :title="alertTitle"
                                        :type="alertType" class="mb-3" />

                                    <MainInput v-model="nomeEdit" label="Nome" placeholder="Seu nome"
                                        :success="successName" :error="errorName" />
                                    <MainInput v-model="emailEdit" label="Email" placeholder="seu@email.com"
                                        :success="successEmail" :error="errorEmail" />
                                </template>

                                <template #footer>
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancelar</button>
                                    <MainButton customClass="fw-medium" text="Salvar" :width="'100px'" :height="'40px'"
                                        :onClick="handleEditProfile" :isLoading="isLoadingEditUser"
                                        :isDisabled="isLoadingEditUser" />
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
                                    <p v-if="user" class="border-bottom pb-2 border-black px-2 text-secondary-emphasis">
                                        {{
                                            formatarDinheiro(user.salario) }}
                                    </p>
                                </div>
                                <div>
                                    <h4>Outras Fontes</h4>
                                    <p v-if="user" class="border-bottom pb-2 border-black px-2">{{
                                        formatarDinheiro(user.outras_fontes)
                                    }}</p>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-end">
                                <MainButton customClass="fw-medium" :width="'100px'" :height="'40px'" text="Editar"
                                    @click="openEditBaseModal" :isLoading="false" :isDisabled="false" />
                            </div>

                            <EditProfileModal id="baseDataModal" title="Editar Perfil" customClass="">
                                <template #default>
                                    <MainAlertView v-if="alertVisibleBaseData" :message="alertMessageBaseData"
                                        :title="alertTitleBaseData" :type="alertTypeBaseData" class="mb-3" />
                                    <MainInput v-model="salarioEdit" label="Salário" placeholder="R$ 1000,00"
                                        :success="successSalario" :error="errorSalario" type="text"
                                        :maskFunction="maskValue" />
                                    <MainInput v-model="outrasFontesEdit" label="Outras Fontes" placeholder="R$ 1000,00"
                                        :success="successOutrasFontes" :error="errorOutrasFontes" type="text"
                                        :maskFunction="maskValue" />
                                </template>

                                <template #footer>
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancelar</button>
                                    <MainButton customClass="fw-medium" :width="'100px'" :height="'40px'" text="Salvar"
                                        :onClick="handleEditBaseData" :isLoading="isLoadingEditBaseData"
                                        :isDisabled="isLoadingEditBaseData" />
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
import { useAuthStore } from '../../store'
import handleCheckToken from '../../utils/checkToken'
import api from "../../services/api/user/index";
import { Modal } from 'bootstrap'
import MainAlertView from '../../components/alerts/MainAlertView.vue'

export default {
    name: 'Profile',
    components: { Sidebar, Navbar, Footer, MainButton, EditProfileModal, MainInput, MainAlertView },
    data() {
        return {
            isSidebarOpen: true,

            salarioEdit: 0,
            outrasFontesEdit: 0,
            nomeEdit: "",
            emailEdit: "",
            token: null,
            user: null,
            isLoadingEditUser: false,
            isLoadingEditBaseData: false,

            successName: false,
            errorName: false,
            successEmail: false,
            errorEmail: false,
            successSalario: false,
            errorSalario: false,
            successOutrasFontes: false,
            errorOutrasFontes: false,

            alertVisible: false,
            alertMessage: "",
            alertTitle: "",
            alertType: "",

            alertVisibleBaseData: false,
            alertMessageBaseData: "",
            alertTitleBaseData: "",
            alertTypeBaseData: "",
        }
    },
    mounted() {
        this.checkAuth();
    },
    methods: {
        async checkAuth() {
            const auth = useAuthStore();
            auth.loadToken();

            const logged = await handleCheckToken(auth.token);

            if (!logged) {
                this.$router.push('/');
            } else {
                this.token = auth.token;
                this.user = auth.user;
                console.log(auth.user)

                this.nomeEdit = this.user.name || "";
                this.emailEdit = this.user.email || "";

                this.salarioEdit = this.formatarDinheiro(auth.user.salario);
                this.outrasFontesEdit = this.formatarDinheiro(auth.user.outras_fontes);
            }
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
        openEditProfileModal() {
            this.successName = false;
            this.errorName = false;
            this.successEmail = false;
            this.errorEmail = false;

            const modalEl = document.getElementById('profileModal');
            if (modalEl) {
                const modal = new Modal(modalEl); // cria a instância
                modal.show(); // abre o modal via JS
            }
        },
        openEditBaseModal() {
            this.successSalario = false;
            this.errorSalario = false;
            this.successOutrasFontes = false;
            this.errorOutrasFontes = false;

            const modalEl = document.getElementById('baseDataModal');
            if (modalEl) {
                const modal = new Modal(modalEl); // cria a instância
                modal.show(); // abre o modal via JS
            }
        },
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen
        },
        formatarDinheiro(valor) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(valor);
        },
        handleEditProfile() {
            const name = this.nomeEdit;
            const email = this.emailEdit;
            const userId = this.user.id;
            const auth = useAuthStore();

            this.isLoadingEditUser = true;

            if (name && email) {
                api.editUser(userId, name, email)
                    .then(res => {
                        if (res.status === 200) {

                            auth.setUser({
                                ...this.user,
                                name: res.data.user.name,
                                email: res.data.user.email
                            });
                            this.user = auth.user;
                            auth.setToken(res.data.token);

                            this.alertMessage = "Perfil atualizado com sucesso!";
                            this.alertTitle = "Sucesso";
                            this.alertType = "success";
                            this.alertVisible = true;
                            this.errorName = false;
                            this.errorEmail = false;
                            this.successName = true;
                            this.successEmail = true;

                            setTimeout(() => {
                                this.isLoadingEditUser = false;


                                const modalEl = document.getElementById('profileModal');
                                if (modalEl) {
                                    Modal.getOrCreateInstance(modalEl).hide();
                                }

                                this.alertVisible = false;
                                this.alertMessage = "";
                                this.alertTitle = "";
                                this.alertType = "";
                                this.successName = false;
                                this.successEmail = false;
                            }, 3000);

                        } else {
                            this.isLoadingEditUser = false;

                            this.errorName = true;
                            this.errorEmail = true;
                            this.successName = false;
                            this.successEmail = false;

                            this.alertMessage = "Falha ao atualizar perfil.";
                            this.alertTitle = "Erro";
                            this.alertType = "danger";
                            this.alertVisible = true;

                            setTimeout(() => {
                                this.alertVisible = false;
                                this.alertMessage = "";
                                this.alertTitle = "";
                                this.alertType = "";
                            }, 3000);
                        }
                    })
                    .catch(error => {
                        console.error("Erro ao atualizar perfil:", error);
                    });
            } else {
                this.isLoadingEditUser = false

                this.errorName = true;
                this.errorEmail = true;
                this.successName = false;
                this.successEmail = false;

                this.alertMessage = "Os campos não podem estar vazios.";
                this.alertTitle = "Aviso";
                this.alertType = "warning";
                this.alertVisible = true;

                setTimeout(() => {
                    this.alertVisible = false;
                    this.alertMessage = "";
                    this.alertTitle = "";
                    this.alertType = "";
                }, 3000);
            }
        },
        handleEditBaseData() {

            const salarioStr = this.salarioEdit.replace(/\D/g, '');
            const salarioNum = Number(salarioStr) / 100;

            const outrasFontesStr = this.outrasFontesEdit.replace(/\D/g, '');
            const outrasFontesNum = Number(outrasFontesStr) / 100;

            const userId = this.user.id;

            const auth = useAuthStore();
            this.isLoadingEditBaseData = true;

            if (salarioNum && outrasFontesNum) {
                api.editBaseData(userId, salarioNum, outrasFontesNum).then((res) => {
                    if (res.status === 200) {
                        auth.setUser({
                            ...this.user,
                            salario: res.data.user.salario,
                            outras_fontes: res.data.user.outras_fontes
                        });
                        this.user = auth.user;
                        auth.setToken(res.data.token);

                        this.alertMessageBaseData = "Dados base atualizados com sucesso!";
                        this.alertTitleBaseData = "Sucesso";
                        this.alertTypeBaseData = "success";
                        this.alertVisibleBaseData = true;
                        this.errorSalario = false;
                        this.errorOutrasFontes = false;
                        this.successSalario = true;
                        this.successOutrasFontes = true;

                        setTimeout(() => {
                            this.isLoadingEditBaseData = false;

                            const modalEl = document.getElementById('baseDataModal');
                            if (modalEl) {
                                Modal.getOrCreateInstance(modalEl).hide();
                            }

                            this.alertVisibleBaseData = false;
                            this.alertMessageBaseData = "";
                            this.alertTitleBaseData = "";
                            this.alertTypeBaseData = "";
                            this.successSalario = false;
                            this.successOutrasFontes = false;
                        }, 3000);
                    } else {
                        this.isLoadingEditBaseData = false;

                        this.errorSalario = true;
                        this.errorOutrasFontes = true;
                        this.successSalario = false;
                        this.successOutrasFontes = false;

                        this.alertMessageBaseData = "Falha ao atualizar dados base.";
                        this.alertTitleBaseData = "Erro";
                        this.alertTypeBaseData = "danger";
                        this.alertVisibleBaseData = true;

                        setTimeout(() => {
                            this.alertVisibleBaseData = false;
                            this.alertMessageBaseData = "";
                            this.alertTitleBaseData = "";
                            this.alertTypeBaseData = "";
                        }, 3000);
                    }
                }).catch(error => {
                    console.error("Erro ao atualizar dados base:", error);
                })
            } else {
                this.isLoadingEditBaseData = false;

                this.errorSalario = true;
                this.errorOutrasFontes = true;
                this.successSalario = false;
                this.successOutrasFontes = false;

                this.alertMessageBaseData = "Os campos não podem estar vazios.";
                this.alertTitleBaseData = "Aviso";
                this.alertTypeBaseData = "warning";
                this.alertVisibleBaseData = true;

                setTimeout(() => {
                    this.alertVisibleBaseData = false;
                    this.alertMessageBaseData = "";
                    this.alertTitleBaseData = "";
                    this.alertTypeBaseData = "";
                }, 3000);
            }
        },
    }
}
</script>
