import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

import Home from "../views/Home";
import NewPoll from "../views/NewPoll";
import MyPolls from "../views/MyPolls";
import Profile from "../views/Profile";
import Registration from "../views/Registration";
import Login from "../views/Login";
import PollView from "../views/PollView";
import StatisticsView from "../views/StatisticsView";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                requiresAuth: false,
                requiresGuest: false
            }
        },
        {
            path: "/newpoll",
            name: "newpoll",
            component: NewPoll,
            meta: {
                requiresAuth: true,
                requiresGuest: false
            }
        },
        {
            path: "/mypolls",
            name: "mypolls",
            component: MyPolls,
            meta: {
                requiresAuth: true,
                requiresGuest: false
            }
        },
        {
            path: "/profile",
            name: "profile",
            component: Profile,
            meta: {
                requiresAuth: true,
                requiresGuest: false
            }
        },
        {
            path: "/registration",
            name: "registration",
            component: Registration,
            meta: {
                requiresAuth: false,
                requiresGuest: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                requiresAuth: false,
                requiresGuest: true
            }
        },
        {
            path: "/poll/:poll_id",
            name: "poll-view",
            component: PollView,
            meta: {
                requiresAuth: true,
                requiresGuest: false
            }
        },
        {
            path: "/statistics/:poll_id",
            name: "statistics-view",
            component: StatisticsView,
            meta: {
                requiresAuth: true,
                requiresGuest: false
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    firebase.auth().onAuthStateChanged(user => {
        if (to.meta.requiresAuth && !to.meta.requiresGuest) {
            if (user) {
                next();
            } else {
                next({
                    path: "/login"
                });
            }
        } else if (!to.meta.requiresAuth && to.meta.requiresGuest) {
            if (user) {
                next({
                    path: "/"
                });
            } else {
                next();
            }
        } else {
            next();
        }
    });
});

export default router;
