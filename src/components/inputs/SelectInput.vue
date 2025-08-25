<template>
    <div class="mb-3 position-relative" :class="customDivClass">
        <label v-if="label" :for="inputId" class="form-label">{{ label }}</label>

        <select :id="inputId" class="form-select" :class="customClass" :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)">
            <option v-if="placeholder" disabled value="">
                {{ placeholder }}
            </option>
            <option v-for="(option, index) in options" :key="index" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'SelectInput',
    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        },
        label: String,
        placeholder: String,
        options: {
            type: Array,
            default: () => []
        },
        customClass: String,
        customDivClass: String
    },
    computed: {
        inputId() {
            return `select-${this._uid}`;
        }
    }
}
</script>
