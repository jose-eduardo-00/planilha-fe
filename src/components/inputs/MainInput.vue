<template>
    <div class="mb-3" :class="customDivClass">
        <label v-if="label" :for="inputId" class="form-label">{{ label }}</label>
        <input :id="inputId" :type="type" :placeholder="placeholder" class="form-control" :class="customClass"
            :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
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
    computed: {
        inputId() {
            // cria um id único simples para o input
            return `input-${this._uid}`
        }
    }
}
</script>
