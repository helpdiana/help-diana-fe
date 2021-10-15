import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import Api from '../api/api'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken : null,
  },
  getters:{
    isAuthenticated (state) {
      state.accessToken = state.accessToken || localStorage.accessToken
      return state.accessToken
    }
  },
  mutations: {
    LOGIN (state, {accessToken}) {
      state.accessToken = accessToken
      localStorage.accessToken = accessToken
    },
    GOOGLELOGIN(state, accessToken){

      state.accessToken = accessToken
      localStorage.accessToken = accessToken

    },

  },
  actions: {
    GOOGLELOGIN({commit}){
      this.$gAuth.getAuthCode()
      .then((authCode)=>{
        return this.$http.post('https://helpdiana.site/api/auth/login', { code: authCode, redirect_uri: 'url적어야 하는곳' })
      })
      .then((res)=>{

      })
      .catch((err) => {
      })
      
    },
    
  },
  modules: {},
});
