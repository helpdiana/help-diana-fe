<template>
  <v-card class="greeting-card">
    <v-row class="ma-0 pa-0">
      <v-col cols="12" class="pb-0">
        <v-card-title class="text-no-wrap pt-1 ps-2 pb-0">
            의자 / 환자 계정 등록
        </v-card-title>
        <v-card-text class="d-flex align-center pb-0">
          <v-radio-group
            v-model="row"
            row
          >
            <v-radio
              label="나는 환자입니다."
              value=false
            ></v-radio>
            <v-radio
              label="나는 의사입니다."
              value=true
            ></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-col>
      <v-col cols="12" class="pt-0">
        <v-btn 
          color="secondary"
          @click="updateProfile()"
        >
          시작하기
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>

import Api from '@/api/api'


export default {
  components : {
  },
  data(){
    return {
      row:"false",
    }
  },
  computed :{
    
  },
  methods:{
    updateProfile(){
      
      let update_data = null
      Api.getProfile()
      .then((res)=>{
        update_data = res.data
        update_data.doctor = this.row == "true" ? 1 : 0
        
        Api.updateProfile(update_data)
        .then((res)=>{
          window.location.reload()
        })
        .catch((err)=>{
          alert("서버오류!")
        })

      })
      .catch((err)=>{
        alert("서버오류!")
      })
    },
    cameraScan(){
      this.$router.push('camera-scan')
    },
    pictureUpload(){
      this.$router.push('search-image')
    },
    goDiagnoseList(){
      this.$router.push('diagnose-list')
    }

  },
  mounted(){
  },
  created(){
  }
};
</script>
<style lang="scss" scoped>
.greeting-card {
  position: relative;
  .greeting-card-bg {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .greeting-card-trophy {
    position: absolute;
    bottom: 10%;
    right: 8%;
  }
}
// rtl
.v-application {
  &.v-application--is-rtl {
    .greeting-card-bg {
      right: initial;
      left: 0;
      transform: rotateY(180deg);
    }
    .greeting-card-trophy {
      left: 8%;
      right: initial;
    }
  }
}
</style>
