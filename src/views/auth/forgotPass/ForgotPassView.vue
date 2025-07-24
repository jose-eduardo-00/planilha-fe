<template>
    <main class="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <MainAlertView v-if="alertVisible" :message="alertMessage" :title="alertTitle" :type="alertType" class="mb-3" />
        <div class="card shadow-sm p-0 d-flex flex-row" style="width: 60%;">
            <div class="text-white d-flex flex-column align-items-center justify-content-between px-4"
                style="width: 50%; background: linear-gradient(180deg, #0d6efd, #66b2ff); height: 60vh;">
                <h4 class="text-center fs-2 fw-semibold mt-5">Esqueceu sua senha?</h4>

                <div class="" style="margin-top: -5rem;">
                    <h3 class="text-center fs-4" v-if="step1">Sem Problemas, informe seu email</h3>
                    <h3 class="text-center fs-4" v-if="step2">Sem Problemas, informe o código de verificação</h3>
                    <h3 class="text-center fs-4" v-if="step3">Sem Problemas, informe sua nova senha</h3>

                    <p class="text-center" style="font-size: 12px;">Aqui você pode recuperar sua senha.</p>
                </div>

                <!-- <div class="d-flex align-items-center justify-content-center mb-4" style="margin-top: -4rem;">
                    <router-link to="/" class="fs-6 fw-normal text-white text-decoration-none" style="cursor: pointer;">
                        Voltar
                    </router-link>
                </div> -->
                <div class="mb-4" style="margin-top: -4rem;"></div>
            </div>
            <div class="d-flex flex-column justify-content-center px-4 py-5" style="width: 50%;">

                <div class="" v-if="step1">
                    <MainInput v-model="email" label="Email" placeholder="seu@email.com" :success="successEmail"
                        :error="errorEmail" />
                </div>

                <div class="d-flex flex-column align-items-center justify-content-center mb-4 mt-4" v-if="step1">
                    <MainButton customClass="fw-medium bg-dark border border-dark" text="Enviar" :width="'80%'"
                        :height="'40px'" :onClick="handleEmail" :isLoading="isLoadingEmail"
                        :isDisabled="isLoadingEmail" />
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

                <div class="" v-if="step3">
                    <div class="mb-2">
                        <MainInput v-model="password" label="Senha" placeholder="**********" type="password"
                            style="margin-bottom: 0px !important;" :success="successPassword" :error="errorPassword" />
                        <span class="text-danger" style="font-size: 10px;">A senha precisa conter o seguintes
                            itens:
                            símbolo, letra
                            maiúscula, e
                            número.</span>
                    </div>
                    <div class="mb-3">
                        <MainInput v-model="confPassword" label="Confimar Senha" placeholder="**********"
                            type="password" style="margin-bottom: 0px !important;" :success="successConfPassword"
                            :error="errorConfPassword" />
                    </div>
                </div>

                <div class="d-flex align-items-center justify-content-center mt-4" v-if="step3">
                    <MainButton customClass="fw-medium bg-dark border border-dark" :text="'Redefinir Senha'"
                        :width="'80%'" :height="'40px'" :onClick="handleChangePass" :isLoading="isLoading"
                        :isDisabled="false" />
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

export default {
    name: 'ForgotPassView',
    components: { MainButton, MainInput, MainAlertView },
    data() {
        return {
            email: '',
            password: '',
            confPassword: '',
            isLoading: false,
            isLoadingEmail: false,
            errorMessage: '',
            step1: true,
            step2: false,
            step3: false,
            successEmail: false,
            errorEmail: false,
            successPassword: false,
            errorPassword: false,
            successConfPassword: false,
            errorConfPassword: false,
            alertMessage: '',
            alertTitle: '',
            alertType: '',
            alertVisible: false,
            user: null,
            userId: null,
            timer: 30,
            intervalId: null,
            isLoadingCode: false,
            code: '',
            successCode: false,
            errorCode: false,
        };
    },
    watch: {
        email(val) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.successEmail = emailRegex.test(val);
            this.errorEmail = val !== '' && !this.successEmail;
        },
        password(val) {
            const strongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/;

            this.successPassword = strongPassword.test(val);
            this.errorPassword = val !== '' && !this.successPassword;

            this.successConfPassword = this.confPassword === val && this.successPassword;
            this.errorConfPassword = this.confPassword !== '' && !this.successConfPassword;
        },
        confPassword(val) {
            this.confPassword = val;

            this.successConfPassword = val === this.password && this.successPassword;
            this.errorConfPassword = val !== '' && !this.successConfPassword;
        },
    },
    methods: {
        handleEmail() {
            this.isLoadingEmail = true;

            let email = this.email

            if (!email) {
                this.alertMessage = 'Por favor, insira um email válido.';
                this.alertTitle = 'Erro';
                this.alertType = 'danger';
                this.alertVisible = true;
                this.errorEmail = true;
                this.isLoadingEmail = false;

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
                            this.isLoadingEmail = false;
                            this.intervalId = setInterval(() => {
                                if (this.timer > 0) {
                                    this.timer--;
                                } else {
                                    clearInterval(this.intervalId);
                                }
                            }, 1000);
                        }, 3000);

                    } else if (res.status === 400) {
                        this.isLoadingEmail = false;
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
                        this.isLoadingEmail = false;
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
                        this.isLoadingEmail = false;
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
                        this.isLoadingEmail = false;
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
                    this.isLoadingEmail = false;
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

                    setTimeout(() => {
                        this.isLoadingCode = false;
                        this.alertVisible = false;
                        this.alertMessage = '';
                        this.alertTitle = '';
                        this.alertType = '';
                        this.successCode = false;
                        this.step2 = false;
                        this.step3 = true;
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
        },

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

        handleChangePass() {
            this.isLoading = true;

            let password = this.password;
            let confPassword = this.confPassword;
            let id = this.userId;

            if (!password || !confPassword) {
                this.errorPassword = true;
                this.errorConfPassword = true;
                this.alertMessage = 'Por favor, preencha todos os campos.';
                this.alertTitle = 'Erro';
                this.alertType = 'danger';
                this.alertVisible = true;

                setTimeout(() => {
                    this.alertVisible = false;
                    this.alertMessage = '';
                    this.alertTitle = '';
                    this.alertType = '';
                    this.isLoading = false;
                }, 3000);
                return;
            }

            if (password !== confPassword) {
                this.errorPassword = true;
                this.errorConfPassword = true;
                this.alertMessage = 'As senhas não coincidem.';
                this.alertTitle = 'Erro';
                this.alertType = 'danger';
                this.alertVisible = true;

                setTimeout(() => {
                    this.alertVisible = false;
                    this.alertMessage = '';
                    this.alertTitle = '';
                    this.alertType = '';
                    this.isLoading = false;
                }, 3000);
                return;
            }

            api.changePassword(id, password)
                .then((res) => {
                    if (res.status === 200) {
                        this.successPassword = true;
                        this.successConfPassword = true;
                        this.errorPassword = false;
                        this.errorConfPassword = false;

                        this.alertMessage = 'Senha alterada com sucesso!';
                        this.alertTitle = 'Sucesso';
                        this.alertType = 'success';
                        this.alertVisible = true;

                        setTimeout(() => {
                            this.isLoading = false;
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                            this.$router.push('/');
                        }, 3000);
                    } else if (res.status === 400) {
                        this.isLoading = false;
                        this.errorPassword = true;
                        this.errorConfPassword = true;

                        this.alertMessage = 'Senha não informada, preencha os campos corretamente.';
                        this.alertTitle = 'Erro';
                        this.alertType = 'danger';
                        this.alertVisible = true;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                        }, 3000);
                    } else if (res.status === 404) {
                        this.isLoading = false;
                        this.errorPassword = true;
                        this.errorConfPassword = true;

                        this.alertMessage = 'Erro ao alterar a senha. Tente novamente mais tarde.';
                        this.alertTitle = 'Erro';
                        this.alertType = 'danger';
                        this.alertVisible = true;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                        }, 3000);
                    } else {
                        this.alertMessage = 'Erro ao alterar a senha. Tente novamente mais tarde.';
                        this.alertTitle = 'Erro';
                        this.alertType = 'danger';
                        this.alertVisible = true;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                        }, 3000);
                    }
                })
                .catch((error) => {
                    this.isLoading = false;
                    this.errorPassword = true;
                    this.errorConfPassword = true;

                    this.alertMessage = 'Erro de conexão. Tente novamente mais tarde.';
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
        }
    },
}
</script>