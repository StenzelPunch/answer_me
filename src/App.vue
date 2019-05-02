<template>
    <div id="app">
        <transition appear name="header">
            <app-header></app-header>
        </transition>
        <main>
            <transition name="main" mode="out-in" appear>
                <router-view></router-view>
            </transition>
        </main>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
    components: {
        "app-header": Header,
        "app-footer": Footer
    }
};
</script>

<style>
.main-enter-active,
.main-leave-active {
    transition: opacity 0.3s ease;
}
.main-enter, .main-leave-to
/* .main-leave-active до версии 2.1.8 */ {
    opacity: 0;
}

.header-enter-active,
.header-leave-active {
    transition: top 0.3s ease;
}
.header-enter, .header-leave-to
/* .main-leave-active до версии 2.1.8 */ {
    position: relative;
    top: -100px;
}
</style>
