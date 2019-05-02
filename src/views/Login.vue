<template>
    <div class="container">
        <h3 class="text-primary login-title">Войти</h3>
        <form>
            <div class="form-group">
                <label for="login-email">Адрес электронной почты</label>
                <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="login-email"
                    aria-describedby="emailHelp"
                    placeholder="Введите адрес электронной почты"
                />
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Введите пароль"
                />
            </div>
            <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
            </div>
            <small class="text-muted mr-auto">
                Нет аккаунта?
                <router-link to="/registration"> Зарегестрируйтесь</router-link>
            </small>
            <button
                type="submit"
                class="btn btn-primary login-btn"
                @click="login(email, password)"
                :disabled="!isBtnActive"
            >
                Войти
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            email: null,
            password: null
        };
    },
    computed: {
        error() {
            return this.$store.getters.loginError;
        },
        user() {
            return this.$store.getters.user;
        },
        isBtnActive() {
            return this.email && this.password ? true : false;
        }
    },
    methods: {
        login(email, password) {
            event.preventDefault();
            this.$store.dispatch("login", { email, password });
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
.login-title {
    margin-bottom: 10px;
}
.login-btn {
    position: absolute;
    right: 15px;
}
</style>
