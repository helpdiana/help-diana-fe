import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

import axios from 'axios'

// router setup
import router from './routes/router';
import store from "./store";

import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
//axios setup
Vue.prototype.$axios = axios
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = "GET, DELETE, PUT, POST";
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
