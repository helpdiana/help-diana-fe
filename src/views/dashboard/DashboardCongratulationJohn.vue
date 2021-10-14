<template>
  <v-card class="greeting-card">
    <v-row class="ma-0 pa-0">
      <v-col cols="12">
        <v-card-title class="text-no-wrap pt-1 ps-2">
          진단서 등록하기
        </v-card-title>
        <v-card-subtitle class="text-no-wrap ps-2">
          아래버튼을 눌러서 진행
        </v-card-subtitle>
        <v-card-text class="d-flex align-center mt-2 pb-2 ps-2">
          <div>
            <p class="text-xl font-weight-semibold primary--text mb-2">
              AI 진단서 해석
            </p>
            <v-btn
              
              color="primary"
              @click="pictureUpload()"
            >
              진단서 등록
            </v-btn>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  components : {
  },
  data(){
    return {
    }
  },
  computed :{
    
  },
  methods:{
    cameraScan(){
      this.$router.push('camera-scan')
    },
    pictureUpload(){
      this.$router.push('search-image')
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
