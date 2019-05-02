<template>
    <div class="loading">
        <div class="spinner-border text-primary" style="" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Loading",
    data() {
        return {};
    }
};
</script>

<style scoped>
.loading {
    margin-top: 100px;
    text-align: center;
}
.spinner-border {
    width: 3rem;
    height: 3rem;
}
</style>
