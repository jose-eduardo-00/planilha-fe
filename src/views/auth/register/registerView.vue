<template>
    <main class="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <MainAlertView v-if="alertVisible" :message="alertMessage" :title="alertTitle" :type="alertType" class="mb-3" />
        <div class="card shadow-sm p-0 d-flex flex-row" style="width: 60%;">
            <div class="text-white d-flex flex-column align-items-center justify-content-between px-4"
                style="min-height: 50vh; width: 50%; background: linear-gradient(180deg, #0d6efd, #66b2ff);">
                <h4 class="text-center fs-1 fw-semibold mt-5">Cadastro</h4>

                <div class="" style="margin-top: -5rem;">
                    <h3 class="text-center fs-4">Bem vindo!</h3>

                    <p class="text-center" style="font-size: 12px;">Esse é um site que serve para você poder gerenciar e
                        acompanhar suas
                        planilhas.</p>
                </div>

                <div v-if="step1" class="d-flex align-items-center justify-content-center mb-4"
                    style="margin-top: -4rem;">
                    <router-link to="/" class="fs-6 fw-normal text-white text-decoration-none" style="cursor: pointer;">
                        Já possui conta?
                    </router-link>
                </div>
                <div v-if="step2"></div>
            </div>
            <div class="d-flex flex-column justify-content-center px-4 py-5" style="width: 50%;">

                <div v-if="step1">
                    <MainInput v-model="name" label="Nome" placeholder="Nome" :success="successName"
                        :error="errorName" />
                    <MainInput v-model="email" label="Email" placeholder="seu@email.com" :success="successEmail"
                        :error="errorEmail" />
                    <div class="mb-2">
                        <MainInput v-model="password" label="Senha" placeholder="**********" type="password"
                            style="margin-bottom: 0px !important;" :success="successPassword" :error="errorPassword" />
                        <span v-if="!successPassword" class="text-danger" style="font-size: 10px;">A senha precisa
                            conter o seguintes
                            itens:
                            símbolo, letra
                            maiúscula, e
                            número.</span>
                    </div>
                    <div class="mb-3">
                        <MainInput v-model="confPassword" label="Confimar Senha" placeholder="**********"
                            type="password" style="margin-bottom: 0px !important;" :success="successConfPassword"
                            :error="errorConfPassword" />
                        <span v-if="!successConfPassword && confPassword !== password && confPassword != ''"
                            class="text-danger" style="font-size: 10px;">A confirmação da
                            senha precisa ser igual a senha</span>
                    </div>
                </div>

                <div v-if="step1" class="d-flex align-items-center justify-content-center mt-2">
                    <MainButton customClass="fw-medium bg-dark border border-dark" text="Cadastrar" :width="'80%'"
                        :height="'40px'" :onClick="handleRegister" :isLoading="isLoading" :isDisabled="isLoading" />
                </div>

                <div v-if="step2" class="d-flex align-items-center justify-content-center">
                    <MainInput v-model="code" :modelValue="code" label="" placeholder="000000"
                        customClass="text-center ps-5" style="width: 80% !important;" type="text"
                        :maskFunction="maskCode" maxLength="6" :success="successCode" :error="errorCode" />
                </div>

                <div v-if="step2" class="d-flex align-items-center justify-content-center mt-2">
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

export default {
    name: 'RegisterView',
    components: { MainButton, MainInput, MainAlertView },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confPassword: '',
            isLoading: false,
            alertMessage: '',
            alertTitle: '',
            alertType: '',
            alertVisible: false,
            step1: true,
            step2: false,
            code: '',
            isLoadingCode: false,
            userId: '',

            //verificações
            successName: false,
            errorName: false,
            successEmail: false,
            errorEmail: false,
            successPassword: false,
            errorPassword: false,
            successConfPassword: false,
            errorConfPassword: false,
            successCode: false,
            errorCode: false,
        };
    },
    watch: {
        name(val) {
            this.successName = !!val.trim();
            this.errorName = !this.successName;
        },
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
        code(val) {
            this.successCode = val.length === 6;
            this.errorCode = val !== '' && val.length < 6;
        }
    },
    methods: {
        handleRegister() {
            this.isLoading = true;

            let name = this.name
            let email = this.email
            let password = this.password
            let confPassword = this.confPassword

            if (!name || !email || !password || !confPassword) {
                this.alertTitle = 'Erro';
                this.alertMessage = 'Todos os campos são obrigatórios.';
                this.alertType = 'danger';
                this.alertVisible = true;
                this.isLoading = false;

                setTimeout(() => {
                    this.alertVisible = false;
                    this.alertMessage = '';
                    this.alertTitle = '';
                    this.alertType = '';
                }, 3000);
                return
            }

            if (password !== confPassword) {
                this.alertTitle = 'Aviso';
                this.alertMessage = 'As senhas não coincidem.';
                this.alertType = 'warning';
                this.alertVisible = true;
                this.isLoading = false;

                setTimeout(() => {
                    this.alertVisible = false;
                    this.alertMessage = '';
                    this.alertTitle = '';
                    this.alertType = '';
                }, 3000);
                return
            }

            api.createUser(name, email, password)
                .then((res) => {
                    if (res.status === 400) {
                        this.alertTitle = 'Aviso';
                        this.alertMessage = 'Esse e-mail já está cadastrado.';
                        this.alertType = 'warning';
                        this.alertVisible = true;
                        this.isLoading = false;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                        }, 3000);
                    } else if (res.status === 500) {
                        this.alertTitle = 'Erro';
                        this.alertMessage = 'Ocorreu um erro de conexão tente novamente mais tarde.';
                        this.alertType = 'danger';
                        this.alertVisible = true;
                        this.isLoading = false;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                        }, 3000);
                    } else if (res.status === 201) {
                        this.alertTitle = 'Sucesso';
                        this.alertMessage = 'Usuário cadastrado com sucesso.';
                        this.alertType = 'success';
                        this.alertVisible = true;
                        this.userId = res.data.user.id;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                            this.isLoading = false;
                            this.step1 = false;
                            this.step2 = true;
                        }, 3000);
                    }
                })
                .catch((error) => {
                    console.error('Error registering user:', error);
                    this.alertTitle = 'Erro';
                    this.alertMessage = 'Ocorreu um erro ao cadastrar o usuário.';
                    this.alertType = 'danger';
                    this.alertVisible = true;
                    this.isLoading = false;

                    setTimeout(() => {
                        this.alertVisible = false;
                        this.alertMessage = '';
                        this.alertTitle = '';
                        this.alertType = '';
                    }, 3000);
                });
        },

        handleCode() {
            let code = this.code;
            let userId = this.userId

            this.isLoadingCode = true;

            if (code == "") {
                this.alertTitle = 'Aviso';
                this.alertMessage = 'O código é obrigatório.';
                this.alertType = 'warning';
                this.alertVisible = true;
                this.isLoadingCode = false;

                setTimeout(() => {
                    this.alertVisible = false;
                    this.alertMessage = '';
                    this.alertTitle = '';
                    this.alertType = '';
                }, 3000);
                return
            }

            if (code.length < 6) {
                this.alertTitle = 'Aviso';
                this.alertMessage = 'O código precisa ter 6 dígitos.';
                this.alertType = 'warning';
                this.alertVisible = true;
                this.isLoadingCode = false;

                setTimeout(() => {
                    this.alertVisible = false;
                    this.alertMessage = '';
                    this.alertTitle = '';
                    this.alertType = '';
                }, 3000);
                return
            }

            api.verifyCode(userId, code)
                .then((res) => {
                    if (res.status === 400) {
                        this.alertTitle = 'Aviso';
                        this.alertMessage = 'Código inválido.';
                        this.alertType = 'warning';
                        this.alertVisible = true;
                        this.isLoadingCode = false;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                        }, 3000);
                    } else if (res.status === 500) {
                        this.alertTitle = 'Erro';
                        this.alertMessage = 'Ocorreu um erro de conexão tente novamente mais tarde.';
                        this.alertType = 'danger';
                        this.alertVisible = true;
                        this.isLoadingCode = false;

                        setTimeout(() => {
                            this.alertVisible = false;
                            this.alertMessage = '';
                            this.alertTitle = '';
                            this.alertType = '';
                        }, 3000);
                    } else if (res.status === 200) {
                        this.alertTitle = 'Sucesso';
                        this.alertMessage = 'Código verificado com sucesso.';
                        this.alertType = 'success';
                        this.alertVisible = true;

                        setTimeout(() => {
                            this.$router.push('/');
                            this.isLoadingCode = false;
                            this.step1 = true;
                            this.step2 = false;
                            this.name = '';
                            this.email = '';
                            this.password = '';
                            this.confPassword = '';
                            this.code = '';
                        }, 3000);
                    }
                })
                .catch((error) => {
                    console.error('Error verifying code:', error);
                    this.alertTitle = 'Erro';
                    this.alertMessage = 'Ocorreu um erro ao verificar o código.';
                    this.alertType = 'danger';
                    this.alertVisible = true;
                    this.isLoadingCode = false;

                    setTimeout(() => {
                        this.alertVisible = false;
                        this.alertMessage = '';
                        this.alertTitle = '';
                        this.alertType = '';
                    }, 3000);
                });
        },

        maskCode(val) {
            return val.replace(/\D/g, '').slice(0, 6);
        },
    },
}
</script>