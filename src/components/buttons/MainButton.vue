<template>
    <div :style="{ width, height }">
        <button class="btn btn-dark w-100 h-100" :class="[customClass, animationClass]" @click="onClick"
            :disabled="isDisabled">
            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>{{ text }}</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'MainButton',
    props: {
        text: {
            type: String,
            required: true,
        },
        customClass: {
            type: String,
            default: '',
        },
        animationName: {
            type: String,
            default: '',
        },
        onClick: {
            type: Function,
            required: false
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '0px',
        },
        height: {
            type: String,
            default: '0px',
        },
    },
    computed: {
        // Usamos uma propriedade computada para gerar a classe CSS correta
        animationClass() {
            if (this.animationName === 'bounce') {
                return 'can-bounce';
            }
            if (this.animationName === 'pulse') {
                return 'can-pulse';
            }
            if (this.animationName === 'shakeX') {
                return 'can-shake';
            }
            if (this.animationName === 'zoomIn') {
                return 'can-zoom';
            }
            return '';
        }
    },
}
</script>