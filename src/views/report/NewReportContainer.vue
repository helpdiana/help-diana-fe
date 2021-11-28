<template>
<v-container class="report-container">
  <v-row>
    <v-col class="report-title"><p class="text-2xl mb-6">보고서</p></v-col>
    <v-spacer></v-spacer>
    <v-col class="report-pdf">
      <v-btn color="primary" @click="downloadPdf()">
        PDF 다운로드
      </v-btn>
    </v-col>
  </v-row>
  <v-card>
    <v-card-title class="align-start">
      <span>진단서 제목</span>
      <v-spacer></v-spacer>
      <span>2020.07.08</span>
      
    </v-card-title>


    <v-card-text class="report-body">
      <v-row v-for="index in 5" :key="index">
        <v-col cols="12" class="index">
          <span> {{index}} </span>
        </v-col>
        <v-col cols="12" class="cell origin">
          <span>on Clinical information: Lung cancer No evidence of distant metastasis in the abdomen and pelvis.</span>
        </v-col>
        <v-col cols="12" class="cell edit">
          <span>임상 정보: 폐암 복부와 골반에 원거리 전이가 있다는 증거는 없다.</span>
        </v-col>
        <v-col cols="12" class="cell highlight">
          <span>하이라이트</span>
        </v-col>
      </v-row>
    </v-card-text>
    

  </v-card>
</v-container>
</template>

<script>
export default {
  components: {
  },
  props : [],
  data(){
    return {
    }
  },
  computed : {
  },
  methods : {
    downloadPdf(){

    },
  },
  mounted(){
  }
}
</script>

<style lang="scss">
.report-container{
  .report-pdf{
    display: flex;
    flex-direction: row-reverse;
  }
  .report-body{
    .index{
      padding : 12px 12px 0 12px;
    }
    .cell{
      color : black;
      margin : 0 0 5px 0;
    }
    .origin{
      background : #fafafa;
      border-radius : 7px;
    }
    .edit{
      background : #f6fdff;
      border-radius : 7px;
    }
    .highlight{
      background : #f8f8fd;
      border-radius : 7px;

    }
  }
}
</style>