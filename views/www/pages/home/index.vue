<template>
    <div class="home">
        {{ text }}
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            text: null,
        };
    },
    async asyncData () {
        return {
            text: 'welcome to VUE -- SSR'
        };
    }
}
</script>

<style lang="less">
.home {
    height: 100vh;
    font-size: 50px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>