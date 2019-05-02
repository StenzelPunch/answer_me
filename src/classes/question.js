export default class Question {
    constructor(obj) {
        this.id = null;
        this.title = "";
        this.type = "";
        this.variants = [""];
        for (let key in obj) {
            this[key] = obj[key];
        }
    }
    data() {
        return {
            id: this.id,
            title: this.title,
            type: this.type,
            variants: this.variants
        };
    }
    addType(type) {
        this.type = type;
    }
    addVariant(payload) {
        this.variants.push(payload);
    }
    delVariant(index) {
        this.variants.splice(index, 1);
    }
    get variantsSum() {
        return this.variants.length;
    }
}
