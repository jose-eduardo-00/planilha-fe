<template>
    <div v-if="isVisible" :class="'alert-' + type" role="alert"
        class="alert d-flex align-items-center justify-content-between px-5 py-3">
        <i v-if="type === 'danger'" class="fa-solid fa-ban me-1"></i>
        <i v-if="type === 'warning'" class="fa-solid fa-exclamation me-1"></i>
        <i v-if="type === 'success'" class="fa-solid fa-check me-1"></i>
        <span class="fw-bold" style="font-size: 18px;"> {{ title }} | </span>
        <span class="ms-2" style="font-size: 16px;"> {{ message }}</span>
    </div>
</template>

<script>
export default {
    name: "MainAlertView",
    props: {
        message: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: "info"
        },
        isVisible: {
            type: Boolean,
            default: true
        },
        class: {
            type: String,
            default: ""
        },
    },
}
</script>