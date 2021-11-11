import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import Api from '../api/api'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken : null,

    diagnose : {
      diagnose_id : 18,
      diagnose_name : "harry",
      diagnose_date : "2021-11-05",
    }
  },
  getters:{
    isAuthenticated (state) {
      state.accessToken = state.accessToken || localStorage.accessToken
      return state.accessToken
    }
  },
  mutations: {
    storeDiagnose(state, diagnose){
      state.diagnose = diagnose
    },
    LOGIN (state, {accessToken}) {
      state.accessToken = accessToken
      localStorage.accessToken = accessToken
    },
    GOOGLELOGIN(state, accessToken){

      state.accessToken = accessToken
      localStorage.accessToken = accessToken

    },
    LOGOUT (state) {
      state.accessToken = null
      delete localStorage.accessToken
    },

  },
  actions: {
    GOOGLELOGIN({commit}){
      
      this.$gAuth.getAuthCode()
      .then((authCode)=>{
        
        return this.$http.post('https://helpdiana.site/api/auth/login', { code: authCode, redirect_uri: 'postmessage' })
      })
      .then((res)=>{
        
      })
      .catch((err) => {
      })
      
    },
    LOGOUT({commit}){
      axios.defaults.headers.common['Authorization'] = undefined
      commit('LOGOUT')
    }

    
  },
  modules: {},
});
