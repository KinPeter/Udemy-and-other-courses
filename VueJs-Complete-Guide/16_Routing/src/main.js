import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes, // routes: routes
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return {x: 0, y: 0}
  }
});

router.beforeEach((to, from, next) => {
  console.log('global beforeEach');
  next(); // just continue
  // next('/path'); // redirects
  // next({name: 'home'});
});

new Vue({
  router, // router: router
  render: h => h(App),
}).$mount('#app');
