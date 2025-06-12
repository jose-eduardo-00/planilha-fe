<template>
    <div class="card card-overlay position-relative overflow-hidden shadow" :style="{ width }" style="cursor: pointer;">
        <div class="overlay position-absolute top-0 start-0 w-100 h-100"></div>

        <div class="card-header px-4 pt-3 text-white text-center" style="background-color: #212121 !important;">
            <h2 class="fw-medium fs-5">Titulo da planilha</h2>
        </div>
        <div class="card-body d-flex justify-content-center">
            <span class="py-1 fw-semibold fs-6">24/05/2010</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "MainCard",
    props: {
        title: {
            type: String,
            default: "Modal"
        },
        customClass: {
            type: String,
            default: ""
        },
        width: {
            type: String,
            default: '0px',
        },
    }
}
</script>

<style scoped>
.overlay {
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
    z-index: 1;
}

.card-overlay:hover .overlay {
    opacity: 1;
}

.card-header,
.card-body {
    position: relative;
    z-index: 2;
}
</style>