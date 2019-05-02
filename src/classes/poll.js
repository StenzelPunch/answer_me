import Question from "./question";
export default class Poll {
    constructor(obj) {
        this.author = null;
        this.title = null;
        this.description = null;
        this.date = null;
        this.questions = [];
        this.answers = [];
        this.end = false;

        for (let key in obj) {
            if (key !== "questions") {
                this[key] = obj[key];
            } else {
                for (let question in obj.questions) {
                    this.questions.push(new Question(obj.questions[question]));
                }
            }
        }
    }
    addQuestion(payload) {
        this.questions.push(new Question(payload));
    }
    delQuestion(index) {
        this.questions.splice(index, 1);
    }
    data() {
        const questions = this.questions;
        return {
            author: this.author,
            title: this.title,
            description: this.description,
            date: this.date,
            answers: this.answers,
            end: this.end,
            get questions() {
                let questionObj = [];
                for (let question in questions) {
                    questionObj.push(questions[question].data());
                }
                return questionObj;
            }
        };
    }
    get questionsSum() {
        return this.questions.length;
    }
    get answersSum() {
        return this.answers.length;
    }
}
