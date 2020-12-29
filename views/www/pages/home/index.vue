<template>
    <div>{{ count }}</div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            count: 0
        };
    },
    mounted() {
        console.log('aa');
        this.timmer = setInterval(() => {
            this.count ++;
        }, 500);
    },
    beforeDestroy() {
        clearInterval(this.timmer);
    }
}
</script>