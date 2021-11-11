<template>
<v-container>
    <v-row><p class="text-2xl mb-6"> 텍스트 추출 결과 확인 </p></v-row>
    <v-row>
      <v-btn color="primary mr-2" small @click="editText()"> 텍스트 수정</v-btn>
      <v-btn color="success" small @click="showResult()">결과 보기</v-btn>
    </v-row>
    <v-row class="ocr-textarea">
      <v-textarea
      name="input-7-1"
      filled
      auto-grow
      :readonly="readable"
     v-model="ocrText"
      ></v-textarea>
    </v-row>
</v-container>
</template>

<script>
import Api from '@/api/api'
export default {
  components : {
  },
  data(){
    return {
      ocrText : "",
      rawText : "",
      readable : true,
      isedit : false,
    }
  },
  computed : {
    diagnose(){
      return this.$store.state.diagnose
    }
  },
  methods:{
    processData(){
      for(let i = 0 ; i< this.rawText.length; i++){
        this.ocrText += this.rawText[i]
        if(i != this.rawText.length - 1){
          this.ocrText += "\n"
        }
      }
    },
    processDataText(){

      let tmp = []
      let diagnose_bf = this.ocrText.split("\n")
      diagnose_bf.forEach((v, i) => {
        tmp.push([v])
      })

      let edited_diagnose_bf = {
        diagnose_bf : [tmp]
      }

      return JSON.stringify(edited_diagnose_bf)
    }, 
    editText(){
      this.readable = !this.readable
      this.isedit = true
      
    },
    getDiagnoseOCR(){
      let data = {
        diagnose_id : this.diagnose.diagnose_id
      }
      Api.getDiagnoseOCR(data)
      .then((res) => {
        console.log(res.data)
        this.rawText = res.data.diagnose_bf[0]
        this.processData()
      })
    },


    showResult(){
      if(this.isedit){
        let processDataText = this.processDataText()
        let data = {
          diagnose_id : this.diagnose.diagnose_id,
          name : this.diagnose.diagnose_name,
          date : this.diagnose.diagnose_date,
          newJson : processDataText
        }
        Api.updateDiagnoseOCR(data)
        .then((res) => {
          console.log(res)
          this.$router.push('show-result')
        })
      }else{
        this.$router.push('show-result')
      }
    }
  },
  mounted(){

    console.log(this.diagnose)
    this.getDiagnoseOCR()
  },
  created(){
  }
};
</script>

<style lang="scss">
.ocr-textarea{
  margin-top:30px !important;
}
</style>
