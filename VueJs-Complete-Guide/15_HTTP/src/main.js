import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.http.options.root = 'https://vue-complete-course.firebaseio.com/';
Vue.http.interceptors.push((request, next) => {
  console.log(request);
  // do anything with the request
  // if (request.method === 'POST') {
  //   request.method = 'PUT'
  // }
  next((response) => {
    console.log(response);
    // do anything with the response
    if (response.status === 200) {
      console.log('200 - Yeey!');
    }
  });
});

new Vue({
  render: h => h(App),
}).$mount('#app');
