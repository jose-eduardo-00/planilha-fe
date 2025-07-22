<template>
    <main class="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <MainAlertView v-if="alertVisible" :message="alertMessage" :title="alertTitle" :type="alertType" class="mb-3" />
        <div class="card shadow-sm p-0 d-flex flex-row" style="width: 60%;">
            <div class="text-white d-flex flex-column align-items-center justify-content-between px-4"
                style="width: 50%; background: linear-gradient(180deg, #0d6efd, #66b2ff);">
                <h4 class="text-center fs-1 fw-semibold mt-5">Login</h4>

                <div class="" style="margin-top: -5rem;">
                    <h3 class="text-center fs-4">Bem vindo!</h3>

                    <p class="text-center" style="font-size: 12px;">Esse é um site que serve para você poder gerenciar e
                        acompanhar suas
                        planilhas.</p>
                </div>

                <div class="d-flex align-items-center justify-content-center mb-4" style="margin-top: -4rem;">
                    <router-link to="/register" class="fs-6 fw-normal text-white text-decoration-none"
                        style="cursor: pointer;">
                        Ainda não possui conta?
                    </router-link>
                </div>
            </div>
            <div class="d-flex flex-column px-4 py-5" style="width: 50%;">

                <div class="mt-4">
                    <MainInput v-model="email" label="Email" placeholder="seu@email.com" :success="successName"
                        :error="errorName" />
                    <MainInput v-model="password" label="Senha" placeholder="**********" type="password"
                        :success="successPassword" :error="errorPassword" />
                </div>

                <div class="d-flex align-items-center justify-content-center mt-2 mb-4 gap-3">
                    <router-link to="/forgot-pass" class="fs-6 fw-normal text-danger text-decoration-none"
                        style="cursor: pointer;">
                        Esqueceu sua senha?
                    </router-link>

                </div>

                <div class="d-flex flex-column align-items-center justify-content-center mb-4">
                    <MainButton customClass="fw-medium bg-dark border border-dark" text="Login" :width="'80%'"
                        :height="'40px'" :onClick="handleLogin" :isLoading="isLoading" :isDisabled="isLoading" />
                    <span v-if="errorVerify" class="text-danger mt-2 mb-2">ou</span>
                    <MainButton v-if="errorVerify" customClass="fw-medium bg-dark border border-dark"
                        text="Tentar verificar conta" :width="'80%'" :height="'40px'" :onClick="handleVerify"
                        :isLoading="isLoadingVerify" :isDisabled="isLoadingVerify" />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import MainAlertView from '../../../components/alerts/MainAlertView.vue';
import MainButton from '../../../components/buttons/MainButton.vue';
import MainInput from '../../../components/inputs/MainInput.vue';
import api from '../../../services/api/auth/index';
import { useAuthStore } from '../../../store/index';

export default {
    name: 'LoginView',
    components: { MainButton, MainInput, MainAlertView },
    data() {
        return {
            email: '',
            password: '',
            isLoading: false,
            isLoadingVerify: false,
            errorMessage: '',
            errorVerify: false,
            alertMessage: '',
            alertTitle: '',
            alertType: '',
            alertVisible: false,
            token: null,
            successName: false,
            errorName: false,
            successPassword: false,
            errorPassword: false,
        };
    },
    methods: {
        handleLogin() {
            this.isLoading = true;

            let email = this.email
            let password = this.password
            const auth = useAuthStore();

            if (!email || !password) {
                this.alertTitle = 'Erro';
                this.alertMessage = 'Todos os campos são obrigatórios.';
                this.alertType = 'danger';
                this.alertVisible = true;
                this.isLoading = false;

                this.errorName = true;
                this.errorPassword = true;

                setTimeout(() => {
                    this.alertVisible = false;
                    this.alertMessage = '';
                    this.alertTitle = '';
                    this.alertType = '';
                    this.errorName = false;
                    this.errorPassword = false;
                }, 3000);
                return
            }

            api.login(email, password)
                .then((res) => {
                    console.log(res.status)
                    if (res.status === 400 || res.status === 402) {
                        this.isLoading = false;
                        this.alertTitle = 'Erro';
                        this.alertMessage = 'Email ou senha inválidos.';
                        this.alertType = 'danger';
                        this.alertVisible = true;

                        this.errorName = true;
                        this.errorPassword = true;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                        }, 3000);
                        return;
                    }

                    if (res.status === 403) {
                        this.isLoading = false;
                        this.alertTitle = 'Erro';
                        this.alertMessage = 'Conta inválida. conta desativada ou banida.';
                        this.alertType = 'danger';
                        this.alertVisible = true;

                        this.errorName = true;
                        this.errorPassword = true;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                        }, 3000);
                        return;
                    }

                    if (res.status === 405) {
                        this.isLoading = false;
                        this.alertTitle = 'Aviso';
                        this.alertMessage = 'Conta não verificada.';
                        this.alertType = 'warning';
                        this.alertVisible = true;
                        this.token = res.data.token;
                        this.errorVerify = true;

                        this.errorName = true;
                        this.errorPassword = true;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                        }, 3000);
                        return;
                    }

                    if (res.status === 200) {
                        this.alertTitle = 'Sucesso';
                        this.alertMessage = 'Login realizado com sucesso.';
                        this.alertType = 'success';
                        this.alertVisible = true;

                        this.successName = true;
                        this.successPassword = true;

                        auth.setToken(res.data.token);

                        setTimeout(() => {
                            this.isLoading = false;
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';

                            this.$router.push('/Home');
                        }, 2000);
                    }
                })
                .catch((error) => {
                    this.isLoading = false;
                    this.alertTitle = 'Erro';
                    this.alertMessage = 'Ocorreu um erro ao fazer login. Tente novamente.';
                    this.alertType = 'danger';
                    this.alertVisible = true;

                });
        },

        handleVerify() {
            localStorage.setItem('v', this.token);

            this.$router.push('/verify-code');
        },
    },
}
</script>