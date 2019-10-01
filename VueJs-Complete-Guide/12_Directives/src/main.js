import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// Global directive
Vue.directive('highlight', {
    bind(el, binding, vnode) {
        // el.style.backgroundColor = 'lightgreen';
        // el.style.backgroundColor = binding.value;
        let delay = 0;
        if (binding.modifiers['delayed']) {
            delay = 3000;
        }
        console.log(vnode);
        setTimeout(() => {
            if (binding.arg == 'background') {
                el.style.backgroundColor = binding.value;
            } else {
                el.style.color = binding.value;
            }
        }, delay);
    }
});

new Vue({
    render: h => h(App),
}).$mount('#app');
