import Profile from "../classes/profile";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
    state: {
        user: null,
        _user: null,
        profile: null,
        loginError: null,
        regError: null
    },
    mutations: {
        setUser(state, payload) {
            if (payload) {
                state.user = payload.uid;
                state["_user"] = payload;
            } else {
                state.user = payload;
            }
        },
        setProfile(state, payload) {
            state.profile = payload;
        },
        setLoginError(state, payload) {
            state.loginError = payload;
        },
        setRegError(state, payload) {
            state.regError = payload;
        }
    },
    actions: {
        setUser({ commit }, payload) {
            commit("setUser", payload);
        },
        login({ commit }, payload) {
            try {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(payload.email, payload.password)
                    .then(user => {
                        commit("setUser", user);
                        commit("setLoginError", null);
                    })
                    .catch(error => {
                        commit("setLoginError", error);
                    });
            } catch (error) {
                commit("setLoginError", error);
            }
        },
        registration({ commit }, payload) {
            try {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        payload.email,
                        payload.password
                    )
                    .then(user => {
                        const profile = createUserProfile(
                            payload,
                            user.user.uid
                        );
                        firebase
                            .firestore()
                            .collection("users")
                            .doc(`${user.user.uid}`)
                            .set(profile.data());
                        commit("setUser", user.user);
                        commit("setRegError", null);
                        commit("setProfile", profile);
                    })
                    .catch(error => {
                        commit("setRegError", error);
                    });
            } catch (error) {
                commit("setRegError", error);
            }
        },
        logout({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit("setUser", null);
                });
        },
        setProfile({ commit }, payload) {
            if (payload) {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(payload.uid)
                    .get()
                    .then(doc => {
                        commit("setProfile", new Profile(doc.data()));
                    });
            } else {
                commit("setProfile", null);
            }
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        loginError(state) {
            return state.loginError;
        },
        regError(state) {
            return state.regError;
        }
    }
};

function createUserProfile(regData, uid) {
    const profile = {
        email: regData.email,
        firstName: regData.firstName,
        lastName: regData.lastName,
        id: uid
    };
    return new Profile(profile);
}
