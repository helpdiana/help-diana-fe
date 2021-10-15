import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
//axios
import axios from 'axios'
//google oauth2
import GAuth from 'vue-google-oauth2'

// router setup
import router from './routes/router';
import store from "./store";

import vuetify from "./plugins/vuetify";

Vue.use(GAuth, {clientId: process.env.VUE_APP_GOOGLE_KEY, scope: 'profile email', prompt:'select_account'})

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
