<template>
    <div class="mb-3 position-relative" :class="customDivClass">
        <label v-if="label" :for="inputId" class="form-label">{{ label }}</label>

        <input :id="inputId" :type="inputType" :placeholder="placeholder" class="form-control pe-5" :class="customClass"
            v-model="localValue" :maxlength="maxLength" />

        <i v-if="type === 'password'" :class="['fa-regular', showPassword ? 'fa-eye-slash' : 'fa-eye']"
            class="position-absolute" style="top: 45px; right: 15px; cursor: pointer; z-index: 10;"
            @click="togglePassword"></i>
    </div>
</template>

<script>
export default {
    name: 'MainInput',
    props: {
        modelValue: String,
        label: String,
        type: {
            type: String,
            default: 'text',
        },
        placeholder: String,
        customClass: String,
        customDivClass: String,
        maxLength: [String, Number],
        maskFunction: Function,
    },
    data() {
        return {
            localValue: this.modelValue,
            showPassword: false,
        };
    },
    computed: {
        inputId() {
            return `input-${this._uid}`;
        },
        inputType() {
            return this.type === 'password' && this.showPassword ? 'text' : this.type;
        },
    },
    watch: {
        modelValue(val) {
            this.localValue = val;
        },
        localValue(val) {
            let masked = this.maskFunction ? this.maskFunction(val) : val;

            // Evita loops infinitos
            if (masked !== this.modelValue) {
                this.$emit('update:modelValue', masked);
            }

            // Atualiza localValue se máscara modificou o valor
            if (masked !== val) {
                this.localValue = masked;
            }
        },
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>
