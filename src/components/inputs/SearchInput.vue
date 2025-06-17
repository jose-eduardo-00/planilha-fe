<template>
    <div class="mb-3 position-relative" :class="customDivClass">
        <label v-if="label" :for="inputId" class="form-label">{{ label }}</label>
        <input :id="inputId" :type="type" :placeholder="placeholder" class="form-control pe-5" :class="customClass"
            :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
        <i class="fas fa-search position-absolute text-secondary bg-light"
            style="right: 15px; top: 50%; transform: translateY(-50%); pointer-events: none"></i>
    </div>
</template>

<script>
export default {
    name: 'SearchInput',
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
            return `input-${this._uid}`;
        }
    }
}
</script>
