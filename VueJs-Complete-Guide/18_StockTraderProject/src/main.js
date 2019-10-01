import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { store } from './store/store';
import { routes } from './routes';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  mode: 'history',
  routes
});

Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString();
});

Vue.http.options.root = 'https://vue-complete-course.firebaseio.com/';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
