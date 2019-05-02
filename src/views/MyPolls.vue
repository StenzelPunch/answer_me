<template>
    <div class="container">
        <div class="mypolls-header d-flex align-items-center">
            <div class="mypolls-number mr-auto align-baseline">
                Количество опросов: <span class="text-primary">{{ pollsNumber }}</span>
            </div>
            <div class="dropdown align-baseline">
                <button
                    class="btn btn-link dropdown-toggle align-baseline"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Сортировка
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a
                        v-for="(item, index) in sortBtns"
                        :key="index"
                        :class="`dropdown-item ${item.criterion === sortCriterion ? 'active' : ''}`"
                        @click="pollSort(item.criterion)"
                        href="#"
                    >
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
        <div class="mypolls-body row">
            <div v-for="(poll, index) in polls" :key="index" :class="'mypolls-item-wraper col-md-6'">
                <div :class="'mypolls-item ' + endClass(index)">
                    <div class="mypolls-item-header d-flex align-items-center">
                        <p class="h5 mr-auto">
                            <router-link :to="`/statistics/${poll.id}`">{{ poll.title }}</router-link>
                        </p>
                        <button
                            class="btn btn-link text-info align-baseline"
                            type="button"
                            id="dropdown-actions"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdown-actions">
                            <button
                                class="dropdown-item btn btn-link text-success"
                                data-toggle="modal"
                                data-target="#resume-poll-modal"
                                v-if="isEnd(index)"
                                @click="writeBufer(index)"
                            >
                                Возобновить
                            </button>
                            <button
                                class="dropdown-item btn btn-link text-warning"
                                data-toggle="modal"
                                data-target="#end-poll-modal"
                                v-if="!isEnd(index)"
                                @click="writeBufer(index)"
                            >
                                Остановить
                            </button>
                            <button
                                class="dropdown-item btn btn-link text-danger"
                                data-toggle="modal"
                                data-target="#delete-poll-modal"
                                @click="writeBufer(index)"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>

                    <div>
                        <p><span class="text-secondary">Ответов:</span> {{ poll.answers.length }}</p>
                        <p><span class="text-secondary">Дата создания:</span> {{ date(poll.date) }}</p>
                        <p>
                            <a
                                class="text-info"
                                data-toggle="collapse"
                                :href="'#poll-link-collapse-' + index"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                            >
                                <i class="fas fa-link"></i> Ссылка на опрос
                            </a>
                        </p>
                    </div>

                    <div class="collapse" :id="'poll-link-collapse-' + index">
                        <div class="input-group input-group-sm mb-3">
                            <input
                                :id="'pollLink-' + index"
                                type="text"
                                class="form-control visually-hidden"
                                :placeholder="pollLink"
                                :value="pollLink(index)"
                                readonly
                            />
                            <div class="input-group-append">
                                <button
                                    class="btn btn-outline-primary"
                                    type="button"
                                    @click="copy(index)"
                                    data-toggle="collapse"
                                    :data-target="'#poll-link-collapse-' + index"
                                    aria-expanded="false"
                                    :aria-controls="'poll-link-collapse-' + index"
                                >
                                    Скопировать
                                </button>
                            </div>
                        </div>
                    </div>

                    <span v-if="isEnd(index)" class="badge badge-secondary">Остановлен</span>
                </div>
            </div>
        </div>

        <modal-confirm
            :modal-name="'delete-poll'"
            @confirm="
                deletePoll(bufferIndex);
                writeBufer('');
            "
            @cansel="writeBufer('')"
            @close="writeBufer('')"
        >
            <template v-slot:modal-title>
                Удаление опроса
            </template>
            <template v-slot:modal-body>
                После удаления статистика этого опроса будет недоступна. Чтобы не терять статистику, рекомендуется
                <strong>завершить</strong> опрос.
            </template>
        </modal-confirm>

        <modal-confirm
            :modal-name="'end-poll'"
            @confirm="
                endPoll(bufferIndex);
                writeBufer('');
            "
            @cansel="writeBufer('')"
            @close="writeBufer('')"
        >
            <template v-slot:modal-title>
                Завершение опроса
            </template>
            <template v-slot:modal-body>
                После завершения статистика этого опроса сохранится, но новых ответов поступать не будет. Вы можете
                возобновить опрос в дальнейшем.
            </template>
        </modal-confirm>

        <modal-confirm
            :modal-name="'resume-poll'"
            @confirm="
                resumePoll(bufferIndex);
                writeBufer('');
            "
            @cansel="writeBufer('')"
            @close="writeBufer('')"
        >
            <template v-slot:modal-title>
                Возобновление опроса
            </template>
            <template v-slot:modal-body>
                После возобновления, пользователи снова смогут давать ответы.
            </template>
        </modal-confirm>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import Poll from "../classes/poll.js";
import ModalConfirm from "../components/ModalConfirm";

export default {
    name: "MyPolls",
    components: {
        "modal-confirm": ModalConfirm
    },
    data() {
        return {
            polls: [],
            bufferIndex: "",
            db: firebase.firestore().collection("polls"),
            sortBtns: [{ title: "Дата", criterion: "date" }, { title: "Ответы", criterion: "answers" }],
            sortCriterion: "date"
        };
    },
    computed: {
        pollsNumber() {
            return this.polls.length;
        }
    },
    methods: {
        date(date) {
            const dateObj = new Date(date.seconds * 1000);
            let month = dateObj.getUTCMonth() + 1; //months from 1-12
            let day = dateObj.getUTCDate();
            const year = dateObj.getUTCFullYear();

            day = day < 10 ? "0" + day : day;
            month = month < 10 ? "0" + month : month;

            return day + "." + month + "." + year;
        },
        isEnd(i) {
            return this.polls[i].end;
        },
        endClass(i) {
            return this.polls[i].end ? "end" : "";
        },
        writeBufer(payload) {
            this.bufferIndex = payload;
        },
        deletePoll(i) {
            this.polls.splice(i, 1);
            this.db.doc(this.polls[i].id).delete();
        },
        pollLink(i) {
            return `https://stenzelpunch.github.io/answer_me/#/poll/` + this.polls[i].id;
        },
        copy(i) {
            const link = document.getElementById("pollLink-" + i);
            link.select();
            document.execCommand("copy");
        },
        endPoll(i) {
            this.polls[i].end = true;
            this.db.doc(this.polls[i].id).update({
                end: true
            });
        },
        resumePoll(i) {
            this.polls[i].end = false;
            this.db.doc(this.polls[i].id).update({
                end: false
            });
        },
        pollSort(criterion) {
            this.sortCriterion = criterion;
            this.polls.sort(function(a, b) {
                if (a[criterion] > b[criterion]) {
                    return -1;
                }
                if (a[criterion] < b[criterion]) {
                    return 1;
                }
                // a должно быть равным b
                return 0;
            });
        }
    },
    beforeMount() {
        const user = this.$store.getters.user;
        this.db
            .where("author", "==", user)
            .get()
            .then(data => {
                const array = data.docs;
                for (let item of array) {
                    const poll = new Poll(item.data());
                    poll.id = item.id;
                    this.polls.push(poll);
                }
                this.pollSort(this.sortCriterion);
            });
    }
};
</script>

<style scoped>
.badge {
    margin-left: auto;
}
p {
    margin-bottom: 3px;
}
.mypolls-item-header p {
    padding: 5px 0 0 0;
}
.col-md-6 {
    padding: 0;
}
.col-md-6:nth-of-type(2n - 1) {
    padding-right: 10px;
}
.col-md-6:nth-of-type(2n) {
    padding-left: 10px;
}

@media screen and (max-width: 768px) {
    .col-md-6:nth-of-type(2n - 1) {
        padding-right: 0;
    }
    .col-md-6:nth-of-type(2n) {
        padding-left: 0;
    }
}
.mypolls-body {
    margin: 20px 0;
}
.dropdown .btn {
    margin-left: auto;
}

.mypolls-item,
.mypolls-header {
    margin: 10px 0;
    padding: 10px;
    border: #f8f9fa 2px solid;
    border-radius: 6px;
    transition: 0.5s;
}

.mypolls-item:hover {
    box-shadow: 0px 0px 20px 0px #a1a1a1;
    border-color: #ffffff;
    transition: 0.5s;
}
.dropdown-menu {
    border: #f8f9fa 2px solid;
    box-shadow: 0px 0px 20px 0px #a1a1a1;
}

.end p,
.end a,
.end i {
    color: #a1a1a1;
}
</style>
