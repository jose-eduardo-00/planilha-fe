<template>
    <main class="d-flex flex-column align-items-center justify-content-center vh-100 bg-light bg-imagem-cover">
        <MainAlertView v-if="alertVisible" :message="alertMessage" :title="alertTitle" :type="alertType" class="mb-3"
            style="width: 50% !important; justify-content: flex-start !important;" />
        <div class="card px-5 bg-white bg-opacity-25 border border-light border-opacity-25
            shadow-lg backdrop-blur" style="width: 50%;">
            <h4 class="text-center fs-1 fw-semibold mt-5">Login</h4>

            <div class="d-flex flex-column px-4 py-5">

                <div class="">
                    <MainInput v-model="email" label="Email" placeholder="seu@email.com" :success="successName"
                        :error="errorName" />
                    <MainInput v-model="password" label="Senha" placeholder="**********" type="password"
                        :success="successPassword" :error="errorPassword" @keydown.enter="handleLogin" />
                </div>

                <div class="d-flex align-items-center justify-content-center mt-2 mb-4 gap-3">
                    <router-link to="/forgot-pass" class="can-pulse fs-6 fw-normal text-danger text-decoration-none"
                        style="cursor: pointer;">
                        Esqueceu sua senha?
                    </router-link>

                </div>

                <div class="d-flex flex-column align-items-center justify-content-center mb-4">
                    <MainButton animationName="zoomIn" customClass="fw-medium bg-dark border border-dark" text="Login"
                        :width="'80%'" :height="'40px'" :onClick="handleLogin" :isLoading="isLoading"
                        :isDisabled="isLoading" />
                    <span v-if="errorVerify" class="text-danger mt-2 mb-2">ou</span>
                    <MainButton animationName="zoomIn" v-if="errorVerify"
                        customClass="fw-medium bg-dark border border-dark" text="Tentar verificar conta" :width="'80%'"
                        :height="'40px'" :onClick="handleVerify" :isLoading="isLoadingVerify"
                        :isDisabled="isLoadingVerify" />
                </div>

                <div class="d-flex align-items-center justify-content-center">
                    <router-link to="/register" class="can-pulse fs-6 fw-normal text-dark text-decoration-none"
                        style="cursor: pointer;">
                        Ainda não possui conta?
                    </router-link>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.bg-imagem-cover {
    background-image: url('../../../../assets/fundo2_planilhas_login.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}

.backdrop-blur {
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
}
</style>

<script>
import { jwtDecode } from 'jwt-decode';
import MainAlertView from '../../../components/alerts/MainAlertView.vue';
import MainButton from '../../../components/buttons/MainButton.vue';
import MainInput from '../../../components/inputs/MainInput.vue';
import api from '../../../services/api/auth/index';
import { useAuthStore } from '../../../store/index';
import handleCheckToken from '../../../utils/checkToken';

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
                const decoded = jwtDecode(auth.token);
                auth.setUser(decoded.user);
                this.$router.push('/my-worksheets');
            }
        },
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

                            this.$router.push('/my-worksheets');
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

        // handleCheckToken() {
        //     const auth = useAuthStore()

        //     const token = auth.token

        //     if (token) {
        //         api.checkToken(token)
        //             .then((res) => {
        //                 if (res.status === 200) {
        //                     this.$router.push('/Home');
        //                 } else {
        //                     auth.logout();
        //                 }
        //             })
        //             .catch((error) => {
        //                 auth.logout();
        //             });
        //     }
        // }
    },
}
</script>