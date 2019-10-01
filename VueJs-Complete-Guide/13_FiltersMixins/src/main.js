import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// Global filter
Vue.filter('to-lowercase', (value) => {
    return value.toLowerCase();
});

// Global Mixin
Vue.mixin({
    created() {
        console.log('Global mixin "mixed in" and created automatically in every component! Use it with caution!');
    }
});

new Vue({
    render: h => h(App),
}).$mount('#app');
