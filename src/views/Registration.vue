<template>
    <div class="container reg-form">
        <h3 class="text-primary registration-title">Регистрация</h3>
        <div
            class="form-group"
            v-for="(item, index, key) in formData"
            :key="key"
        >
            <label :for="item.id">{{ item.title }}</label>
            <input
                v-model="item.value"
                :type="item.type"
                :class="item.class"
                :id="item.id"
                :placeholder="item.placeholder"
                @input="item.validate()"
                required
            />
            <div class="valid-feedback">
                Looks good!
            </div>
            <div class="invalid-feedback">
                {{ item.invalidFeedback }}
            </div>
        </div>
        <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
        </div>
        <small class="text-muted mr-auto">
            Уже есть аккаунт?
            <router-link to="/login"> Войдите</router-link>
        </small>
        <button
            @click="submit($event)"
            type="submit"
            class="btn btn-primary registration-btn"
            :disabled="!isActiveBtn"
        >
            Зарегистрироваться
        </button>
    </div>
</template>

<script>
import formData from "../classes/regInput";
import "firebase/firestore";

export default {
    name: "Registration",
    data() {
        return {
            formData: formData
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        error() {
            return this.$store.getters.regError;
        },
        isActiveBtn() {
            let count = 0;
            for (let input in this.formData) {
                this.formData[input].isValid ? count++ : false;
            }
            return count === 4 ? true : false;
        }
    },
    methods: {
        submit(event) {
            event.preventDefault();
            const regData = {
                email: this.formData.email.value,
                password: this.formData.password.value,
                firstName: this.formData.firstName.value,
                lastName: this.formData.lastName.value
            };
            this.$store.dispatch("registration", regData);
        }
    }
};
</script>

<style scoped>
.container {
    position: relative;
    margin-top: 20px;
    max-width: 500px;
}
.registration-title {
    margin-bottom: 10px;
}
.registration-btn {
    position: absolute;
    right: 15px;
}
</style>
