<template>
    <main class="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div class="card shadow-sm p-0 d-flex flex-row" style="width: 60%;">
            <div class="text-white d-flex flex-column align-items-center justify-content-between px-4"
                style="width: 50%; background: linear-gradient(180deg, #0d6efd, #66b2ff);">
                <h4 class="text-center fs-1 fw-semibold mt-5">Cadastro</h4>

                <div class="" style="margin-top: -5rem;">
                    <h3 class="text-center fs-4">Bem vindo!</h3>

                    <p class="text-center" style="font-size: 12px;">Esse é um site que serve para você poder gerenciar e
                        acompanhar suas
                        planilhas.</p>
                </div>

                <div class="d-flex align-items-center justify-content-center mb-4" style="margin-top: -4rem;">
                    <router-link to="/" class="fs-6 fw-normal text-white text-decoration-none" style="cursor: pointer;">
                        Já possui conta?
                    </router-link>
                </div>
            </div>
            <div class="d-flex flex-column px-4 py-5" style="width: 50%;">

                <div>
                    <MainInput v-model="name" label="Nome" placeholder="Nome" />
                    <MainInput v-model="email" label="Email" placeholder="seu@email.com" />
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

                <div class="d-flex align-items-center justify-content-center mt-2">
                    <MainButton customClass="fw-medium bg-dark border border-dark" text="Cadastrar" :width="'80%'"
                        :height="'40px'" :onClick="handleRegister" :isLoading="false" :isDisabled="false" />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import MainButton from '../../../components/buttons/MainButton.vue';
import MainInput from '../../../components/inputs/MainInput.vue';

export default {
    name: 'RegisterView',
    components: { MainButton, MainInput },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confPassword: '',
            isLoading: false,
            errorMessage: ''
        };
    },
    methods: {
        handleRegister() {
            this.$router.push({ name: 'Login' });
        },
    },
}
</script>