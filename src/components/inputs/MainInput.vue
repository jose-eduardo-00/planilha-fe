<template>
    <div class="mb-3 position-relative" :class="customDivClass">
        <label v-if="label" :for="inputId" class="form-label">{{ label }}</label>

        <input :id="inputId" :type="inputType" :placeholder="placeholder" class="form-control pe-5" :class="customClass"
            :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
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
    },
    data() {
        return {
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
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>
