import firebase from "firebase/app";
import "firebase/firestore";
import Poll from "../classes/poll";
import Answers from "../classes/answers";

export default function loadPoll(vm, pollId) {
    firebase
        .firestore()
        .collection("polls")
        .doc(pollId)
        .get()
        .then(data => {
            if (data.data() !== undefined) {
                if (data.data().author === vm.$store.getters.user) {
                    vm.access = true;
                    vm.data = new Poll(data.data());
                    vm.statistics = new Answers(vm.data);
                } else {
                    vm.access = false;
                }
            } else {
                vm.data = undefined;
            }
        });
}
