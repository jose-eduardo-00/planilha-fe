<template>
    <button class="btn btn-dark" :class="customClass" :onClick="onClick">
        {{ text }}
    </button>
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
        onClick: {
            type: Function,
            required: false
        }
    },
    data() {
        return {

        }
    },
}
</script>