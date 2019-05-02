<template>
    <header id="header">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <router-link class="navbar-brand text-primary mb-0 h1" to="/">ANSWER ME</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li :class="`nav-item ${route == '/' ? 'active' : ''}`">
                        <router-link class="nav-link" to="/">
                            <i class="fas fa-home"></i>
                            Главная
                            <span class="sr-only">(current)</span>
                        </router-link>
                    </li>
                    <template v-if="user">
                        <li
                            :class="`nav-item ${route == item.path ? 'active' : ''}`"
                            v-for="(item, index, key) in nav"
                            :key="key"
                        >
                            <router-link class="nav-link" :to="item.path">
                                <i :class="item.icon"></i>
                                {{ item.title }}
                                <span class="sr-only">(current)</span>
                            </router-link>
                        </li>
                    </template>
                </ul>
                <div class="navigation-buttons">
                    <button
                        v-if="user"
                        class="btn btn-link text-danger my-3 my-sm-0"
                        data-toggle="modal"
                        data-target="#logout-modal"
                    >
                        Выйти
                    </button>
                    <router-link
                        v-if="!user"
                        :tag="'button'"
                        :class="'btn btn-outline-primary my-2 my-sm-0'"
                        to="/login"
                        >Вход</router-link
                    >
                    <router-link
                        v-if="!user"
                        :tag="'button'"
                        :class="'btn btn-outline-success my-3 my-sm-0'"
                        to="/registration"
                        >Регистрация</router-link
                    >
                </div>
            </div>
        </nav>
        <modal-confirm @confirm="logout()" :modal-name="'logout'">
            <template v-slot:modal-title>
                Выход из учетной записи
            </template>
            <template v-slot:modal-body>
                Подтвердите выход из учетной записи
            </template>
        </modal-confirm>
    </header>
</template>

<script>
import ModalConfirm from "./ModalConfirm";

export default {
    name: "Header",
    components: {
        "modal-confirm": ModalConfirm
    },
    data() {
        return {
            nav: {
                newPoll: {
                    title: "Новый опрос",
                    icon: "fas fa-plus-square",
                    path: "/newpoll"
                },
                myPools: {
                    title: "Мои опросы",
                    icon: "fas fa-list-alt",
                    path: "/mypolls"
                },
                profile: {
                    title: "Личный кабинет",
                    icon: "fas fa-id-card",
                    path: "/profile"
                }
            }
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        route() {
            return this.$route.path;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("logout");
        }
    }
};
</script>

<style>
.navigation-buttons .btn:nth-of-type(2) {
    margin-left: 5px;
}
</style>
