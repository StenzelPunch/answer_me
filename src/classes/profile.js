export default class Profile {
    constructor(obj) {
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.id = null;
        this.polls = [];
        for (let key in obj) {
            this[key] = obj[key];
        }
    }
    get fullName() {
        return this.firstName + " " + this.lastName;
    }
    get username() {
        return this.email.split("@")[0];
    }
    get pollSum() {
        return this.polls.length;
    }
    data() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            id: this.id,
            polls: this.polls
        };
    }
    addPoll(string) {
        this.polls.push(string);
    }
    delPoll(string) {
        for (let key in this.polls) {
            if (this.polls[key] === string) {
                this.polls.slice(parseInt(key), 1);
            }
        }
    }
}
