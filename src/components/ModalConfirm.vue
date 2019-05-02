<template>
    <!-- Modal -->
    <div
        class="modal fade"
        :id="modalName + '-modal'"
        tabindex="-1"
        role="dialog"
        :aria-labelledby="modalName + '-modal-label'"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-light">
                    <h5 class="modal-title text-primary" :id="modalName + '-modal-label'">
                        <slot name="modal-title"></slot>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot name="modal-body"></slot>
                </div>
                <div class="modal-footer bg-light">
                    <button type="button" class="btn btn-link text-danger" data-dismiss="modal" @click="cancel()">
                        Отмена
                    </button>
                    <button type="button" class="btn btn-success" data-dismiss="modal" @click="confirm()">
                        Подтведить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Confirm",
    props: {
        modalName: String
    },
    methods: {
        confirm() {
            this.$emit("confirm");
        },
        cancel() {
            this.$emit("cansel");
        },
        close() {
            this.$emit("close");
        }
    }
};
</script>
