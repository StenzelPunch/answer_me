<template>
    <div>
        <div class="container">
            <div class="profile-title">
                <h3>{{ user.email }}</h3>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="section">
                        <h5 class="text-primary">Информация о Вас</h5>
                        <ul class="user-list">
                            <li class="list-item text-info">
                                Имя: <span class="list-item--value text-dark">{{ user.firstName }}</span>
                            </li>
                            <li class="list-item text-info">
                                Фамилия: <span class="list-item--value text-dark">{{ user.lastName }}</span>
                            </li>
                            <li class="list-item text-info">
                                Email: <span class="list-item--value text-dark">{{ user.email }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="section">
                        <h5 class="text-primary">Краткая статистика:</h5>
                        Всего опросов: <span class="text-primary">{{ pollCreated }}</span> <br />
                        Всего ответов: <span class="text-primary">{{ pollCompleted }}</span
                        ><br />
                    </div>
                </div>
                <!--  -->
            </div>
        </div>
    </div>
</template>

<script>
import Poll from "../classes/poll.js";

import firebase from "firebase/app";
import "firebase/firestore";
export default {
    name: "Profile",
    data() {
        return {
            polls: [],
            db: firebase.firestore().collection("polls")
        };
    },
    computed: {
        user() {
            return this.$store.getters.profile;
        },
        pollCreated() {
            return this.polls.length;
        },
        pollCompleted() {
            let count = 0;
            for (let item of this.polls) {
                if (item.answers.length) {
                    count += item.answers.length;
                }
            }
            return count;
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
            });
    }
};
</script>

<style scoped>
.profile-title {
    margin-top: 20px;
    padding: 0 10px;
}
.section {
    margin: 10px 0;
    padding: 10px;
    border: #f8f9fa 2px solid;
    border-radius: 6px;
}
.user-list {
    list-style: none;
    padding: 0;
}
.list-item--value {
    display: block;
    text-align: right;
}
</style>
