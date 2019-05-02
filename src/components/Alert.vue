<template>
    <div id="404">
        <div key="Not-found" :class="'alert alert-' + type" role="alert">
            <h3><slot></slot></h3>
            <hr />
            <router-link class="alert-link" to="/"><i class="fas fa-arrow-left"></i> На главную</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
    props: ["type"],
    data() {
        return {};
    }
};
</script>

<style scoped>
.alert {
    margin: 40px auto;
    max-width: 500px;
    text-align: center;
}
</style>
