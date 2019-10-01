<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Routing</h1>
                <hr>
                <app-header></app-header>
                <transition name="slide" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        
    </div>
</template>

<script>
    import Header from './components/Header.vue';
    export default {
        data() {
            return {
                
            }
        },
        components: {
            appHeader: Header
        },
        methods: {
            
        }
    }
</script>

<style>
.slide-leave-active {
    animation: slide-out 1s ease-out forwards;
}
.slide-enter-active {
    animation: slide-in 1s ease-out forwards;
}
@keyframes slide-out {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(30px); opacity: 0; }
}
@keyframes slide-in {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
</style>
