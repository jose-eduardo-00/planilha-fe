<template>
    <main class="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div class="card shadow-sm p-0 d-flex flex-row" style="width: 60%;">
            <div class="text-white d-flex flex-column align-items-center justify-content-between px-4"
                style="width: 50%; background: linear-gradient(180deg, #0d6efd, #66b2ff); height: 60vh;">
                <h4 class="text-center fs-2 fw-semibold mt-5">Esqueceu sua senha?</h4>

                <div class="" style="margin-top: -5rem;">
                    <h3 class="text-center fs-4">Sem Problemas,
                        {{ step1 ? "informe seu email" : "informe sua nova senha" }}</h3>

                    <p class="text-center" style="font-size: 12px;">Aqui você pode recuperar sua senha.</p>
                </div>

                <div class="d-flex align-items-center justify-content-center mb-4" style="margin-top: -4rem;">
                    <router-link to="/" class="fs-6 fw-normal text-white text-decoration-none" style="cursor: pointer;">
                        Voltar
                    </router-link>
                </div>
            </div>
            <div class="d-flex flex-column justify-content-center px-4 py-5" style="width: 50%;">

                <div class="" v-if="step1">
                    <MainInput v-model="email" label="Email" placeholder="seu@email.com" />
                </div>

                <div class="" v-if="step2">
                    <div class="mb-2">
                        <MainInput v-model="password" label="Senha" placeholder="**********" type="password"
                            style="margin-bottom: 0px !important;" />
                        <span class="text-danger" style="font-size: 10px;">A senha precisa conter o seguintes
                            itens:
                            símbolo, letra
                            maiúscula, e
                            número.</span>
                    </div>
                    <div class="mb-3">
                        <MainInput v-model="confPassword" label="Confimar Senha" placeholder="**********"
                            type="password" style="margin-bottom: 0px !important;" />
                    </div>
                </div>

                <div class="d-flex align-items-center justify-content-center mt-4">
                    <MainButton customClass="fw-medium bg-dark border border-dark"
                        :text="step1 ? 'Enviar' : 'Redefinir Senha'" :width="'80%'" :height="'40px'"
                        :onClick="handleLogin" :isLoading="isLoading" :isDisabled="false" />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import MainButton from '../../../components/buttons/MainButton.vue';
import MainInput from '../../../components/inputs/MainInput.vue';

export default {
    name: 'ForgotPassView',
    components: { MainButton, MainInput },
    data() {
        return {
            email: '',
            password: '',
            confPassword: '',
            isLoading: false,
            errorMessage: '',
            step1: true,
            step2: false,
        };
    },
    methods: {
        handleLogin() {
            this.isLoading = true;

            if (this.step1) {
                setTimeout(() => {
                    this.isLoading = false;
                    this.step1 = false;
                    this.step2 = true;
                }, 1500);
            } else {
                setTimeout(() => {
                    this.isLoading = false;
                    this.step2 = false;
                    this.step1 = true;
                }, 1500);
            }
        }
    },
}
</script>