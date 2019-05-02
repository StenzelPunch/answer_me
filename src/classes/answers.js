export default class Answers {
    constructor(poll) {
        for (let q in poll.questions) {
            const question = poll.questions[q];
            this[q] = [];
            for (let v in question.variants) {
                this[q][v] = 0;
            }
        }
        for (let a in poll.answers) {
            const answer = poll.answers[a].values;
            for (let q in answer) {
                const value = answer[q];
                this[q][value]++;
            }
        }
    }
}
