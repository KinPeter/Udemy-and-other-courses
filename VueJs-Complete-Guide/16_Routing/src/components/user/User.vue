<template>
    <div>
        <h1>The User Page</h1>
        <hr>
        <button class="btn btn-success" @click="navigateToHome">Go to home</button>
        <hr>
        <router-view></router-view>
    </div>

</template>

<script>
export default {
    // data() {
    //     return {
    //         id: this.$route.params.id
    //     }
    // },
    // watch: {
    //     '$route'(to, from) {
    //         this.id = to.params.id
    //     }
    // },
    methods: {
        navigateToHome() {
            this.$router.push('/');
            // this.$router.push({ path: '/', params: {any: 'any'} });
            // this.$router.push({ name: 'home'});
        }
    }
}
</script>