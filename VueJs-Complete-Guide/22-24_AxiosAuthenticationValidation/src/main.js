import Vue from 'vue';
import App from './App.vue';
import { store } from './store/store';
import router from './router';
import axios from 'axios';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

axios.defaults.baseURL = 'https://vue-complete-course.firebaseio.com';
// axios.defaults.headers.common['Authorization'] = 'something';
axios.defaults.headers.get['Accepts'] = 'application/json';

const requestInterceptor = axios.interceptors.request.use((request) => {
  console.log('Request Interceptor: ', request);
  request.headers['SOMETHING'] = 'anything';
  return request;
});
const responseInterceptor = axios.interceptors.response.use((response) => {
  console.log('Response Interceptor: ', response);
  return response;
});

// cancel interceptors:
axios.interceptors.request.eject(requestInterceptor);
axios.interceptors.response.eject(responseInterceptor);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
