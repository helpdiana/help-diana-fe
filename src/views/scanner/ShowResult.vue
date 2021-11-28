<template>
<v-container>
    <v-row><p class="text-2xl mb-6"> 결과보기 </p></v-row>
    <v-row>
      <v-btn class="mr-1" color="primary" small @click="saveResult()">결과 저장</v-btn>
      <v-btn class="mr-1" color="primary" small @click="requestQuestion()">설명 요청</v-btn>
      <v-btn class="mr-1" color="success" small @click="saveReportResult()">
        <v-icon>{{icons.mdiFileDocument}}</v-icon>보고서 확인</v-btn>
    </v-row>
    <v-row>
      <v-col class="result-body">
        <v-expansion-panels accordion>
          <v-expansion-panel
            v-for="i in rawText.length"
            :key="i"
          >
            <v-expansion-panel-header class="panel-header">
              <div class="process-trans-text">{{processTransText[i-1]}}</div>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="panel-content">
              <div class="process-raw-text">{{processRawText[i-1]}}</div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

</v-container>
</template>

<script>
import {mdiFileDocument} from "@mdi/js"
import Api from '@/api/api'

export default {
  components : {
  },
  data(){
    return {
      icons:{
        mdiFileDocument
      },
      selected: [2],
      rawText : "", 
      trans_after: ""

    }
  },
  computed :{
    processRawText : function(){
      return this.rawText.map(x => x[0]) 
    },
    processTransText : function(){
      return this.trans_after.map(x => x[0])
    },
    diagnose(){
      return this.$store.state.diagnose
    }
  },
  methods:{
    getDiagnoseAll(){
      let data = {
        diagnose_id : this.diagnose.diagnose_id
      }
      Api.getDiagnoseAll(data)
      .then((res) => {
        console.log(res)
        this.rawText = res.data[0].diagnose_bf[0]
        this.trans_after = res.data[1].diagnose_af[0]
      })
    }

  },
  mounted(){
    this.getDiagnoseAll()
  },
  created(){
  }
};
</script>

<style lang="scss">
.result-body{
  padding : 12px 0;
  
  .result-body-list{
    padding : 0;
  }
  .process-trans-text{
    line-height : 20px;
    font-weight: bold;
  }
  .process-raw-text{
    line-height : 16px;
    font-size: 13px;
  }
  .process-trans-text{
    line-height : 16px;
    font-size : 13px;
  }
}
</style>