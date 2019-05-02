<template>
    <div id="statistics" class="container">
        <app-loading v-if="status === 'Loading'"> </app-loading>
        <app-alert v-if="status === 'Not found'" :type="'secondary'">
            Опрос не найден
        </app-alert>
        <app-alert v-if="status === 'No access'" :type="'warning'">
            Нет доступа
        </app-alert>
        <div v-else-if="status === 'Loaded'" class="questions">
            <div v-for="(question, index) in data.questions" :key="index" class="question">
                <h4>
                    <span class="question-number">{{ index + 1 }}.</span> {{ question.title }}
                </h4>
                <div>
                    <chart-view :variants="question.variants" :answers="statistics[index]" :index="index"></chart-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from "../components/Chart";
import loadPoll from "../functions/loadPoll";
import Alert from "../components/Alert";
import Loading from "../components/Loading";

export default {
    name: "statistics-view",
    components: {
        "chart-view": Chart,
        "app-alert": Alert,
        "app-loading": Loading
    },
    data() {
        return {
            data: null,
            statistics: {},
            access: null
        };
    },
    computed: {
        status() {
            if (this.data === null && this.access === null) {
                return "Loading";
            } else if (this.data === undefined) {
                return "Not found";
            } else if (this.access === false) {
                return "No access";
            } else {
                return "Loaded";
            }
        }
    },
    beforeMount() {
        const pollId = this.$route.params["poll_id"];
        loadPoll(this, pollId);
    },
    beforeRouteUpdate(to, from, next) {
        this.data = null;
        this.statistics = {};
        this.access = null;
        const pollId = to.params["poll_id"];
        loadPoll(this, pollId);
        next();
    }
};
</script>

<style scoped>
.questions {
    padding: 5px;
}
.question {
    margin: 10px 0;
    padding: 10px;
    border: #f8f9fa 2px solid;
    border-radius: 6px;
    transition: 0.5s;
}
.question:hover {
    box-shadow: 0px 0px 30px 0px #a1a1a1;
    border-color: #ffffff;
    transition: 0.5s;
}
</style>
