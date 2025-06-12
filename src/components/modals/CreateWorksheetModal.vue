<template>
    <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="`${id}Label`" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" :class="customClass">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="`${id}Label`">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div class="modal-body">
                    <slot />
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreateWorksheet",
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: "Modal"
        },
        customClass: {
            type: String,
            default: ""
        }
    }
}
</script>
