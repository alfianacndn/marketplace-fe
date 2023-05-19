import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import store from './store/index.js'
import JsonExcel from "vue-json-excel"
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
Vue.component("downloadExcel", JsonExcel);
Vue.use(Toast);
Vue.config.productionTip = false
Vue.prototype.$http = axios;

Vue.prototype.$http.defaults.baseURL = 'http://159.223.57.121:8090'
Vue.prototype.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data';
Vue.prototype.$http.defaults.headers.common['Content-Type'] = 'application/json';

new Vue({
  render: h => h(App),
  vuetify,
  router,
  store
}).$mount('#app')
