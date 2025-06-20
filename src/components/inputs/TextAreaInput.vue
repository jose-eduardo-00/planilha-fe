<template>
    <div class="mb-3" :class="customDivClass">
        <label v-if="label" :for="inputId" class="form-label">{{ label }}</label>
        <textarea :style="{ height: height }" :id="inputId" :type="type" :placeholder="placeholder" class="form-control"
            :class="customClass" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<script>
export default {
    name: 'TextAreaInput',
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
        height: String,
    },
    computed: {
        inputId() {
            // cria um id único simples para o input
            return `input-${this._uid}`
        }
    }
}
</script>
