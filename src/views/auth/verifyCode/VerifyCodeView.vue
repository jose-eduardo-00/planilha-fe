<template>
    <main class="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <MainAlertView v-if="alertVisible" :message="alertMessage" :title="alertTitle" :type="alertType" class="mb-3" />
        <div class="card shadow-sm p-0 d-flex flex-row" style="width: 60%;">
            <div class="text-white d-flex flex-column align-items-center justify-content-between px-4"
                style="width: 50%; background: linear-gradient(180deg, #0d6efd, #66b2ff);">
                <h4 class="text-center fs-1 fw-semibold mt-5">Verificar Conta</h4>

                <div class="" style="margin-top: -5rem;">
                    <h3 class="text-center fs-4">Bem vindo!</h3>

                    <p class="text-center" style="font-size: 12px;">Esse é um site que serve para você poder gerenciar e
                        acompanhar suas
                        planilhas.</p>
                </div>

                <!-- <div class="d-flex align-items-center justify-content-center mb-4" style="margin-top: -4rem;">
                    <router-link to="/register" class="fs-6 fw-normal text-white text-decoration-none"
                        style="cursor: pointer;">
                        Ainda não possui conta?
                    </router-link>
                </div> -->
                <div></div>
            </div>
            <div class="d-flex flex-column px-4 py-5 my-4" style="width: 50%;">
                <div class="mt-4" v-if="step1">
                    <MainInput v-model="email" label="Email" placeholder="seu@email.com" :success="successEmail"
                        :error="errorEmail" />
                </div>

                <div class="d-flex flex-column align-items-center justify-content-center mb-4 mt-4" v-if="step1">
                    <MainButton customClass="fw-medium bg-dark border border-dark" text="Enviar" :width="'80%'"
                        :height="'40px'" :onClick="handleEmail" :isLoading="isLoading" :isDisabled="isLoading" />
                </div>

                <div class="d-flex align-items-center justify-content-center mt-4" v-if="step2">
                    <MainInput v-model="code" :modelValue="code" label="" placeholder="000000"
                        customClass="text-center ps-5" style="width: 80% !important;" type="text"
                        :maskFunction="maskCode" maxLength="6" :success="successCode" :error="errorCode" />
                </div>

                <span v-if="step2" class="text-center fw-medium mt-1 mb-2" style="font-size: 12px;"
                    :style="timer !== 0 ? 'color: gray' : 'color: #000; cursor: pointer;'"
                    @click="timer === 0 ? handleBack() : null">
                    Reenviar {{ timer !== 0 ? timer : '' }}</span>

                <div class="d-flex flex-column align-items-center justify-content-center mb-4 mt-3" v-if="step2">
                    <MainButton customClass="fw-medium bg-dark border border-dark" text="Verificar" :width="'80%'"
                        :height="'40px'" :onClick="handleCode" :isLoading="isLoadingCode" :isDisabled="isLoadingCode" />
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
import { jwtDecode } from 'jwt-decode';

export default {
    name: 'VerifyCodeView',
    components: { MainButton, MainInput, MainAlertView },
    data() {
        return {
            email: '',
            password: '',
            isLoading: false,
            alertMessage: '',
            alertTitle: '',
            alertType: '',
            alertVisible: false,
            token: null,
            successEmail: false,
            errorEmail: false,
            successPassword: false,
            errorPassword: false,
            step1: false,
            step2: true,
            isLoadingCode: false,
            code: '',
            successCode: false,
            errorCode: false,
            user: null,
            userId: null,
            timer: 30,
            intervalId: null,
        };
    },
    mounted() {
        const token = localStorage.getItem('v');
        if (token) {
            const decoded = jwtDecode(token);
            this.user = decoded.user;
            this.email = decoded.user.email;
        }

    },
    methods: {
        maskCode(val) {
            return val.replace(/\D/g, '').slice(0, 6);
        },

        handleBack() {
            this.step2 = false;
            this.step1 = true;
            this.code = '';
            this.successCode = false;
            this.errorCode = false;
            clearInterval(this.intervalId);
            this.timer = 30;
        },

        handleEmail() {
            this.isLoading = true;

            let email = this.email

            if (!email) {
                this.alertMessage = 'Por favor, insira um email válido.';
                this.alertTitle = 'Erro';
                this.alertType = 'danger';
                this.alertVisible = true;
                this.errorEmail = true;
                this.isLoading = false;

                setTimeout(() => {
                    this.alertVisible = false;
                    this.alertMessage = '';
                    this.alertTitle = '';
                    this.alertType = '';
                }, 3000);
                return;
            }

            api.sendEmail(email)
                .then((res) => {
                    if (res.status === 200) {
                        this.errorEmail = false;
                        this.successEmail = true;

                        this.alertMessage = 'Código enviado com sucesso!';
                        this.alertTitle = 'Sucesso';
                        this.alertType = 'success';
                        this.alertVisible = true;

                        this.userId = res.data.userId;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                            this.successEmail = false;
                            this.step1 = false;
                            this.step2 = true;
                            this.isLoading = false;
                            this.intervalId = setInterval(() => {
                                if (this.timer > 0) {
                                    this.timer--;
                                } else {
                                    clearInterval(this.intervalId);
                                }
                            }, 1000);
                        }, 3000);

                    } else if (res.status === 400) {
                        this.isLoading = false;
                        this.errorEmail = true;
                        this.alertMessage = 'Email inválido ou não cadastrado.';
                        this.alertTitle = 'Erro';
                        this.alertType = 'danger';
                        this.alertVisible = true;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                            this.errorEmail = false;
                        }, 3000);
                    } else if (res.status === 401) {
                        this.isLoading = false;
                        this.errorEmail = true;
                        this.alertMessage = 'Email não encontrado na base de dados.';
                        this.alertTitle = 'Erro';
                        this.alertType = 'danger';
                        this.alertVisible = true;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                            this.errorEmail = false;
                        }, 3000);
                    } else if (res.status === 429) {
                        this.isLoading = false;
                        this.errorEmail = true;
                        this.alertMessage = 'Muitas tentativas. Tente novamente após 30 segundos.';
                        this.alertTitle = 'Aviso';
                        this.alertType = 'warning';
                        this.alertVisible = true;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                            this.errorEmail = false;
                        }, 3000);
                    } else {
                        this.isLoading = false;
                        this.errorEmail = true;
                        this.alertMessage = 'Erro de conexão. Tente novamente mais tarde.';
                        this.alertTitle = 'Erro';
                        this.alertType = 'danger';
                        this.alertVisible = true;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                            this.errorEmail = false;
                        }, 3000);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.isLoading = false;
                    this.errorEmail = true;

                    this.alertMessage = 'Erro ao enviar o código. Tente novamente mais tarde.';
                    this.alertTitle = 'Erro';
                    this.alertType = 'danger';
                    this.alertVisible = true;

                    setTimeout(() => {
                        this.alertVisible = false;
                        this.alertMessage = '';
                        this.alertTitle = '';
                        this.alertType = '';
                    }, 3000);
                });

        },

        handleCode() {
            this.isLoadingCode = true;
            let code = this.code;
            let id = this.userId;

            if (!code) {
                this.errorCode = true;
                this.alertMessage = 'Código inválido.';
                this.alertTitle = 'Erro';
                this.alertType = 'danger';
                this.alertVisible = true;

                setTimeout(() => {
                    this.alertVisible = false;
                    this.alertMessage = '';
                    this.alertTitle = '';
                    this.alertType = '';
                    this.errorCode = false;
                    this.isLoadingCode = false;
                }, 3000);
                return;
            }

            if (code.length < 6) {
                this.errorCode = true;
                this.alertMessage = 'O código deve ter 6 dígitos.';
                this.alertTitle = 'Erro';
                this.alertType = 'danger';
                this.alertVisible = true;

                setTimeout(() => {
                    this.alertVisible = false;
                    this.alertMessage = '';
                    this.alertTitle = '';
                    this.alertType = '';
                    this.errorCode = false;
                    this.isLoadingCode = false;
                }, 3000);
                return;
            }

            api.verifyCode(id, code).then((res) => {
                if (res.status === 200) {
                    this.successCode = true;
                    this.errorCode = false;

                    this.alertMessage = 'Código verificado com sucesso!';
                    this.alertTitle = 'Sucesso';
                    this.alertType = 'success';
                    this.alertVisible = true;

                    localStorage.removeItem('v');

                    setTimeout(() => {
                        this.isLoadingCode = false;
                        this.alertVisible = false;
                        this.alertMessage = '';
                        this.alertTitle = '';
                        this.alertType = '';
                        this.successCode = false;
                        this.$router.push('/');
                    }, 3000);
                } else if (res.status === 400) {
                    this.isLoadingCode = false;
                    this.errorCode = true;
                    this.successCode = false;

                    this.alertMessage = 'Código inválido ou expirado.';
                    this.alertTitle = 'Erro';
                    this.alertType = 'danger';
                    this.alertVisible = true;

                    setTimeout(() => {
                        this.alertVisible = false;
                        this.alertMessage = '';
                        this.alertTitle = '';
                        this.alertType = '';
                        this.errorCode = false;
                    }, 3000);
                } else if (res.status === 401) {
                    this.isLoadingCode = false;
                    this.errorCode = true;
                    this.successCode = false;

                    this.alertMessage = 'Código não encontrado ou já utilizado.';
                    this.alertTitle = 'Erro';
                    this.alertType = 'danger';
                    this.alertVisible = true;

                    setTimeout(() => {
                        this.alertVisible = false;
                        this.alertMessage = '';
                        this.alertTitle = '';
                        this.alertType = '';
                        this.errorCode = false;
                    }, 3000);
                } else {
                    this.isLoadingCode = false;
                    this.errorCode = true;
                    this.successCode = false;

                    this.alertMessage = 'Erro de conexão. Tente novamente mais tarde.';
                    this.alertTitle = 'Erro';
                    this.alertType = 'danger';
                    this.alertVisible = true;

                    setTimeout(() => {
                        this.alertVisible = false;
                        this.alertMessage = '';
                        this.alertTitle = '';
                        this.alertType = '';
                        this.errorCode = false;
                    }, 3000);
                }
            }).catch((error) => {
                console.error(error);
                this.isLoadingCode = false;
                this.errorCode = true;

                this.alertMessage = 'Erro ao verificar o código. Tente novamente mais tarde.';
                this.alertTitle = 'Erro';
                this.alertType = 'danger';
                this.alertVisible = true;

                setTimeout(() => {
                    this.alertVisible = false;
                    this.alertMessage = '';
                    this.alertTitle = '';
                    this.alertType = '';
                }, 3000);
            })
        }
    }
}
</script>