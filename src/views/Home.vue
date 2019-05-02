<template>
    <div class="promo container">
        <div class="row align-items-center">
            <div class="col-md-6 text-center text-md-left pr-md-5">
                <h1 class="promo-title mb-3 text-primary">Answer me</h1>
                <p>Простой сервис для быстрого создания онлайн опросов.</p>
                <button type="button" class="btn btn-lg btn-primary" @click="go()">
                    Создать опрос
                </button>
            </div>
            <div class="promo-image col-md-6 text-center text-md-center">
                <img src="../assets/Promo-img.svg" alt />
            </div>
        </div>
    </div>
</template>

<script>
import "firebase/auth";

export default {
    methods: {
        go() {
            this.$router.push("/newpoll");
        }
    }
};
</script>

<style>
.promo {
    padding: 5rem 15px;
}
.promo-title {
    text-transform: uppercase;
}
@media screen and (max-width: 992px) {
    .promo-image img {
        width: 300px;
        height: 300px;
    }
    #main {
        padding: 3rem 15px;
    }
}
</style>
