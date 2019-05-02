<template>
    <div class="container">
        <div v-if="isPublic" class="" role="alert">
            <div class="alert alert-primary well" role="alert">
                <h4 class="alert-heading">Опрос опубликован</h4>
                <p>
                    Вы можете просмотреть его в
                    <router-link to="/mypolls"> <strong>Моих опросах</strong>,</router-link>
                    поделиться ссылкой или создать
                    <strong class="newPollLink" @click="isPublic = false"
                        ><span class="text-primary"><strong>новый опроc</strong></span></strong
                    >
                </p>
                <hr />

                <div class="input-group mb-3">
                    <input
                        id="pollLink"
                        type="text"
                        class="form-control"
                        :placeholder="pollLink"
                        v-model="pollLink"
                        readonly
                    />
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="button" @click="copy()">Скопировать</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="constructor">
            <!-- constructor-head start-->
            <div class="constructor-head">
                <h3 class="constructor-title text-primary">Конструктор опроса</h3>
            </div>
            <!-- constructor-head end -->

            <!-- constructor-body start -->
            <div class="constructor-body">
                <div class="newpoll">
                    <!-- newpoll-head start  -->
                    <div class="newpoll-head">
                        <div class="newpoll-head-titles">
                            <div class="form-group row newpoll-title">
                                <label for="newpoll-title" class="col-sm-2 col-form-label">Заголовок:</label>
                                <div class="col-sm-10">
                                    <input
                                        v-model="poll.title"
                                        type="text"
                                        class="form-control"
                                        id="newpoll-title"
                                        placeholder="Заголовок вашего опроса"
                                    />
                                </div>
                            </div>
                            <div class="form-group row newpoll-description">
                                <label for="newpoll-description" class="col-sm-2 col-form-label">Описание:</label>
                                <div class="col-sm-10">
                                    <textarea
                                        v-model="poll.description"
                                        type="text"
                                        class="form-control"
                                        id="newpoll-description"
                                        placeholder="Описание вашего опроса"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- newpoll-head end -->

                    <!-- newpoll-nav start -->
                    <div class="newpoll-nav">
                        <button
                            id="add"
                            class="btn btn-link align-baseline text-primary"
                            type="button"
                            data-toggle="collapse"
                            data-target="#newpoll-nav-buttons"
                            aria-expanded="false"
                            aria-controls="collapse"
                        >
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                        <label for="add" class="col-form-label add-label">Добавить вопрос</label>
                        <div class="collapse" id="newpoll-nav-buttons">
                            <div class="newpoll-nav-buttons-wraper">
                                <button
                                    type="button"
                                    class="btn btn-link"
                                    @click="addQuestion('oneof', count)"
                                    data-toggle="collapse"
                                    data-target="#newpoll-nav-buttons"
                                    aria-expanded="false"
                                    aria-controls="collapseExample"
                                >
                                    Один вариант ответа
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-link"
                                    @click="addQuestion('fewof', count)"
                                    disabled
                                >
                                    <i>in progress..</i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- newpoll-nav end -->

                    <!-- newpoll-body start -->
                    <div class="newpoll-body">
                        <transition-group name="list" tag="div">
                            <div v-for="(item, index) in poll.questions" :key="'pollitem-div-' + item.id">
                                <fewof
                                    v-if="item.type === 'fewof'"
                                    v-on:delete-question="delQuestion(index)"
                                    :prop="item"
                                    :key="'pollitem' + item.id"
                                />

                                <oneof
                                    v-if="item.type === 'oneof'"
                                    v-on:delete-question="delQuestion(index)"
                                    :prop="poll.questions[index]"
                                    :key="'pollitem' + item.id"
                                />
                            </div>
                        </transition-group>
                    </div>

                    <!-- newpoll-body end -->

                    <!-- newpoll-footer start -->
                    <div class="newpoll-footer">
                        <div v-if="warning" class="alert alert-danger" role="alert">
                            {{ warningMessage }}
                        </div>
                    </div>
                    <!-- newpoll-footer end -->
                </div>
            </div>
            <!-- constructor-body end -->

            <!-- constructor-footer start -->

            <transition name="fade"> </transition>
            <div class="constructor-footer">
                <div class="constructor-footer-buttons">
                    <button class="btn btn-link text-danger" @click="clearPoll()">
                        Очистить
                    </button>
                    <!-- <button class="btn btn-link" @click="preview()">Предпросмотр</button> -->
                    <button class="btn btn-primary" @click="publication()" :disabled="!isBtnActive">
                        Опубликовать
                    </button>
                </div>
            </div>
            <!-- constructor-footer end -->
        </div>
    </div>
</template>

<script>
import fewof from "../components/polls/fewof";
import oneof from "../components/polls/oneof";
import Poll from "../classes/poll.js";

import firebase from "firebase/app";
import "firebase/firestore";

export default {
    name: "NewPoll",
    components: {
        fewof,
        oneof
    },
    data() {
        return {
            count: 0,
            poll: new Poll(),
            warning: false,
            warningMessage: "",
            isBtnActive: true,
            isPublic: false,
            id: ""
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        pollLink() {
            return `https://stenzelpunch.github.io/answer_me/#/poll/` + this.id;
        }
    },
    methods: {
        delQuestion(id) {
            this.poll.delQuestion(id);
        },
        addQuestion(type) {
            this.poll.addQuestion({ id: this.count, type: type });
            this.count++;
        },
        clearPoll() {
            this.poll = new Poll();
        },
        toggleWarning(boll, text) {
            this.warning = boll;
            this.warningMessage = text;
        },
        publication() {
            this.isBtnActive = false;

            if (this.isEmptyInput()) {
                const newPoll = firebase.firestore().collection("polls");

                this.poll.date = new Date();
                this.poll.author = this.user;

                newPoll.add(this.poll.data()).then(docRef => {
                    this.id = docRef.id;
                    firebase
                        .firestore()
                        .collection("users")
                        .doc(`${this.user}`)
                        .update({
                            polls: firebase.firestore.FieldValue.arrayUnion(`${docRef.id}`)
                        });
                    this.clearPoll();
                    this.showPublicationAlert();
                    this.isBtnActive = true;
                });
                this.clearPoll();
                this.showPublicationAlert();
                this.isBtnActive = true;
            } else {
                this.isBtnActive = true;
            }
        },
        isEmptyInput() {
            const title = this.poll.title;
            const questions = this.poll.questions;

            if (!title || title.trim() === "") {
                this.toggleWarning(true, "Не оставляете заголовок пустым");
                return false;
            } else if (!questions.length) {
                this.toggleWarning(true, "Добавьте хотя бы один вопрос");
                return false;
            } else {
                for (let item in questions) {
                    if (!questions[item].title) {
                        this.toggleWarning(true, "Не оставляейте вопросы пустыми");
                        return false;
                    } else {
                        if (!questions[item].variants.length) {
                            this.toggleWarning(true, "Остались вопросы без вариантов ответа");
                            return false;
                        } else {
                            for (let variant in questions[item].variants) {
                                if (questions[item].variants[variant].trim() === "") {
                                    this.toggleWarning(true, "Остались пустые варианты ответа");
                                    return false;
                                }
                            }
                        }
                    }
                }
                this.toggleWarning(false, "");
                return true;
            }
        },
        showPublicationAlert() {
            this.isPublic = true;
        },
        copy() {
            const link = document.getElementById("pollLink");
            link.select();
            document.execCommand("copy");
        }
    }
};
</script>

<style>
/* animation */
.alert {
    margin: 40px auto;
    max-width: 700px;
}
.list-item {
    display: block;
    margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
    transition: all 0.3s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
/* animation */

.constructor-head {
    margin-top: 20px;
}
.constructor-footer {
    height: 40px;
    position: relative;
}
.constructor-footer-buttons {
    position: absolute;
    right: 0;
}

.newpoll-head,
.newpoll-nav,
.newpoll-item {
    margin: 20px 0;
    padding: 10px;
    border: #f8f9fa 2px solid;
    border-radius: 6px;
    transition: 0.5s;
}
.newpoll-head:focus-within,
.newpoll-nav:focus-within,
.newpoll-item:focus-within {
    box-shadow: 0px 0px 30px 0px #a1a1a1;
    border-color: #ffffff;
    transition: 0.5s;
}

.newpoll-body .col-form-label,
.newpoll-head .col-form-label {
    color: #80bdff;
}
.newpoll-body .form-control,
.newpoll-head .form-control {
    border-color: #ffffff;
    box-shadow: 0px 3px 0px 0px #f8f9fa;
}

.newpoll-body .form-control:focus,
.newpoll-head .form-control:focus {
    border-radius: 0;
    box-shadow: 0px 3px 0px 0px rgba(128, 189, 255, 1);
}

.newpoll-body .add-label {
    color: #495057;
}
.newpoll-body .col-form-label-pd {
    padding-top: 4px;
}
.newpoll-body .form-control-mr {
    margin-bottom: 4px;
}

.newpoll-body .custom-control-label::before {
    top: 0.75rem;
}
.newpoll-body .custom-control-label::after {
    top: 0.75rem;
}
</style>
