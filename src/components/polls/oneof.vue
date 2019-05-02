<template>
    <div class="newpoll-item">
        <button
            @click="delQuestion()"
            type="button"
            class="btn btn-link text-danger del-item-btn"
        >
            <i class="fas fa-times-circle"></i>
        </button>
        <div class="form-group row newpoll-item-title">
            <label for="newpoll-item-title" class="col-sm-2 col-form-label"
                >Вопрос:</label
            >
            <div class="newpoll-item-title-input col-sm-10">
                <input
                    v-model="question.title"
                    type="text"
                    class="form-control"
                    placeholder="ваш вопрос"
                />
            </div>
        </div>
        <fieldset class="form-group">
            <div class="row">
                <legend class="col-form-label col-form-label-pd col-sm-2 pt-0">
                    Ответы:
                </legend>
                <div class="col-sm-10">
                    <div
                        v-for="(item, index) in question.variants"
                        class="custom-control custom-radio"
                        :key="'variant' + question.key + index"
                    >
                        <input
                            type="radio"
                            class="custom-control-input"
                            :id="'variant' + question.key + index"
                            :name="'radio-' + question.key"
                        />
                        <label
                            class="custom-control-label col"
                            :for="'variant' + question.key + index"
                        >
                            <textarea
                                type="text"
                                class="form-control form-control-mr"
                                placeholder="вариант ответа"
                                v-model="question.variants[index]"
                            >
                            </textarea>
                        </label>
                        <button
                            @click="delVariant(index)"
                            type="button"
                            class="btn btn-link text-danger del-variant-btn"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="add-variant">
                        <button
                            @click="addVariant()"
                            :id="'add-variant' + question.key"
                            class="btn btn-link align-baseline text-primary"
                        >
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                        <label
                            :for="'add-variant' + question.key"
                            class="col-form-label add-label"
                            >добавить вариант</label
                        >
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
export default {
    name: "fewof",
    props: ["prop"],
    beforeMount() {
        this.question = this.prop;
    },
    data() {
        return {
            question: null
        };
    },
    methods: {
        addVariant() {
            this.question.addVariant("");
        },
        delVariant(index) {
            this.question.delVariant(index);
        },
        delQuestion() {
            this.$emit("delete-question", this.question.id);
        }
    }
};
</script>

<style scoped>
.newpoll-item {
    position: relative;
}
.add-variant {
    position: relative;
    left: -11px;
}
.add-label {
    position: relative;
    left: 8px;
}
.newpoll-item-title-input {
    padding-right: 30px;
}
.del-item-btn {
    position: absolute;
    z-index: 1000;
    padding: 0 0 0 1px;
    /* font-size: 12px; */
    width: 25px;
    height: 25px;
    right: -13px;
    top: -13px;
}
.del-variant-btn {
    position: absolute;
    right: -12px;
}
</style>
