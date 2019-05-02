import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

import config from "../private/config.js";
firebase.initializeApp(config);

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App),
    beforeMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.$store.dispatch("setUser", user);
            this.$store.dispatch("setProfile", user);
        });
    }
}).$mount("#app");
