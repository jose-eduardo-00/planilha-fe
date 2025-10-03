<template>
    <div class="d-flex flex-column">
        <label v-if="label" class="form-label">{{ label }}</label>

        <div class="position-relative d-inline-block" ref="pickerWrapper">

            <div class="color-display border rounded cursor-pointer" :style="{
                backgroundColor: modelValue,
                width: width,
                height: height
            }" @click="togglePalette"></div>

            <div v-if="isOpen"
                class="color-palette position-absolute top-100 start-0 mt-2 bg-white border rounded p-3 shadow-lg d-grid gap-2 z-index-1"
                style="grid-template-columns: repeat(6, 1fr); width: 220px;">
                <div v-for="color in palette" :key="color" class="color-swatch rounded cursor-pointer"
                    :style="{ backgroundColor: color }" @click="selectColor(color)"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ColorInput',
    props: {
        modelValue: { type: String, required: true },
        label: { type: String, default: '' },
        width: { type: String, default: '40px' },
        height: { type: String, default: '40px' },
        palette: {
            type: Array,
            default: () => [
                // Vermelhos
                '#f8d7da', '#dc3545', '#842029', '#ff2c2c',
                // Verdes
                '#d1e7dd', '#198754', '#0f5132', '#5ce65c',
                // Azuis
                '#cfe2ff', '#0d6efd', '#084298', '#0000e5',
                // Amarelos
                '#fff3cd', '#ffc107', '#664d03', '#ffea00',
                // Cianos
                '#cff4fc', '#0dcaf0', '#055160', '#00e5ff',
                // Roxos
                '#e2d9f3', '#6f42c1', '#492b7c', '#b366ff',
                // Laranjas
                '#ffe5d0', '#fd7e14', '#8a450b', '#ff9e59',
                // Cinzas
                '#f8f9fa', '#adb5bd', '#343a40', '#6c757d'
            ],
        },
    },
    data() {
        return { isOpen: false };
    },
    methods: {
        togglePalette() { this.isOpen = !this.isOpen; },
        selectColor(color) {
            this.$emit('update:modelValue', color);
            this.isOpen = false;
        },
        handleClickOutside(event) {
            if (this.$refs.pickerWrapper && !this.$refs.pickerWrapper.contains(event.target)) {
                this.isOpen = false;
            }
        }
    },
    watch: {
        isOpen(value) {
            if (value) { document.addEventListener('click', this.handleClickOutside); }
            else { document.removeEventListener('click', this.handleClickOutside); }
        }
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
};
</script>

<style scoped>
.color-swatch {
    width: 25px;
    height: 25px;
    transition: transform 0.1s ease;
}

.color-swatch:hover {
    transform: scale(1.15);
}

.cursor-pointer {
    cursor: pointer;
}
</style>