import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import Api from '../api/api'
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken : null,

    diagnose : {
      diagnose_id : "",
      diagnose_name : "",
      diagnose_date : "",
    },

    controlValue: {
      showLayout: false,
      floatLayout: true,
      enableDownload: true,
      previewModal: true,
      paginateElementsByHeight: 1100,
      manualPagination: false,
      filename: 'Hee Hee',
      pdfQuality: 2,
      pdfFormat: 'a4',
      pdfOrientation: 'portrait',
      pdfContentWidth: '800px'
    }
  },
  getters:{
    isAuthenticated (state) {
      state.accessToken = state.accessToken || localStorage.accessToken
      return state.accessToken
    },
    getField

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
    updateField

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
