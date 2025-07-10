<template>
    <div class="mb-3 position-relative" :class="customDivClass">
        <label v-if="label" :for="inputId" class="form-label">{{ label }}</label>

        <input :id="inputId" :type="inputType" :placeholder="placeholder" class="form-control pe-5"
            :class="[customClass, { 'is-valid': success && type != 'password', 'is-invalid': error && type != 'password' }]"
            v-model="localValue" :maxlength="maxLength" :style="{
                borderColor: success && type === 'password' ? '#198754'
                    : error && type === 'password' ? '#dc3545'
                        : '',
                boxShadow:
                    isFocused && success && type === 'password'
                        ? '0 0 0 0.25rem rgba(25, 135, 84, 0.25)'
                        : isFocused && error && type === 'password'
                            ? '0 0 0 0.25rem rgba(220, 53, 69, 0.25)'
                            : '',
            }" @focus="onFocus" @blur="onBlur" />

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
        success: Boolean,
        error: Boolean,
    },
    data() {
        return {
            localValue: this.modelValue,
            showPassword: false,
            isFocused: false,
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
        onFocus() {
            this.isFocused = true;
        },
        onBlur() {
            this.isFocused = false;
        },
    },
};
</script>
