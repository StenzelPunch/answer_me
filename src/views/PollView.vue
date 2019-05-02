<template>
    <div id="poll-view" class="container">
        <transition name="fade" mode="out-in">
            <app-alert v-if="status === 'Not found'" :type="'secondary'">
                Опрос не найден
            </app-alert>
            <app-alert v-else-if="status === 'Completed'" :type="'success'">
                Опрос успешно пройден. Спасибо за участие.
            </app-alert>
            <app-alert v-else-if="status === 'Completed before'" :type="'warning'">
                Опрос был пройден вами ранее.
            </app-alert>
            <app-alert v-else-if="status === 'End'" :type="'secondary'">
                Опрос был завершен.
            </app-alert>
            <app-loading v-else-if="status === 'Loading'"> </app-loading>
            <form v-else-if="status === 'Loaded'" class="poll" key="Loaded" @submit="submit($event)">
                <div class="poll-head">
                    <h4>{{ data.title }}</h4>
                    <p>{{ data.description }}</p>
                </div>
                <div v-for="(question, index) in data.questions" class="poll-question" :key="index">
                    <h5>{{ question.title }}</h5>
                    <div
                        v-for="(variant, key) in question.variants"
                        :class="`custom-control custom-${type(question.type)}`"
                        :key="key"
                    >
                        <input
                            class="custom-control-input"
                            :type="type(question.type)"
                            :id="`${type(question.type)}-${index}-${key}`"
                            :name="'-group-' + index"
                            @input="select(index, key, $event)"
                        />
                        <label class="custom-control-label" :for="`${type(question.type)}-${index}-${key}`">{{
                            variant
                        }}</label>
                    </div>
                </div>
                <div class="poll-footer">
                    <div v-if="showError" class="alert alert-danger" role="alert">
                        Необходимо ответить на все вопросы!
                    </div>
                    <button type="submit" class="btn btn-primary btn-reply">
                        Ответить
                    </button>
                </div>
            </form>
        </transition>
    </div>
</template>

<script>
import Poll from "../classes/poll";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import firebase from "firebase/app";
import "firebase/firestore";

export default {
    name: "poll-view",
    components: {
        "app-alert": Alert,
        "app-loading": Loading
    },
    data() {
        return {
            data: null,
            answers: {},
            showError: false,
            completed: false,
            completedBefore: false
        };
    },
    computed: {
        status() {
            if (this.data === null) {
                return "Loading";
            } else if (this.data === undefined) {
                return "Not found";
            } else if (this.data.end === true) {
                return "End";
            } else if (this.completed) {
                return "Completed";
            } else if (this.completedBefore) {
                return "Completed before";
            } else {
                return "Loaded";
            }
        }
    },
    methods: {
        type(type) {
            if (type === "fewof") {
                return "checkbox";
            } else if (type === "oneof") {
                return "radio";
            }
        },
        select(index, variant) {
            this.answers[index] = variant;
        },
        check() {
            return Object.keys(this.answers).length === this.data.questions.length ? true : false;
        },
        submit(e) {
            e.preventDefault();
            if (this.check()) {
                let answer = {
                    u: this.$store.getters.user,
                    d: new Date(),
                    values: this.answers
                };
                firebase
                    .firestore()
                    .collection("polls")
                    .doc(this.$route.params["poll_id"])
                    .update({
                        answers: firebase.firestore.FieldValue.arrayUnion(answer)
                    });
                this.completed = true;
            } else {
                this.showError = true;
            }
        }
    },
    beforeMount() {
        const pollId = this.$route.params["poll_id"];
        firebase
            .firestore()
            .collection("polls")
            .doc(pollId)
            .get()
            .then(data => {
                if (data.data()) {
                    for (let i in data.data().answers) {
                        if (this.$store.getters.user === data.data().answers[i].u) {
                            this.completedBefore = true;
                        }
                    }
                    this.data = new Poll(data.data());
                } else {
                    this.data = undefined;
                }
            });
    }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}

.poll-head,
.poll-question {
    margin: 20px 0;
    padding: 10px;
    border: #f8f9fa 2px solid;
    border-radius: 6px;
    transition: 0.5s;
}
.poll-head:focus-within,
.poll-question:focus-within {
    box-shadow: 0px 0px 30px 0px #a1a1a1;
    border-color: #ffffff;
    transition: 0.5s;
}
.poll-footer {
    position: relative;
}

.btn-reply {
    position: absolute;
    right: 0;
}
</style>
