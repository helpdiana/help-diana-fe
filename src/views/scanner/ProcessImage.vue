<template>
<v-container>
    <v-row><p class="text-2xl mb-6"> 텍스트 추출 결과 확인 </p></v-row>
    <v-row>
      <v-btn color="primary mr-2" small @click="editText()"> 텍스트 수정</v-btn>
      <v-btn color="success mr-2" small @click="showResult()">결과 보기</v-btn>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            size="25"
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            {{icons.mdiInformationOutline}}
          </v-icon>
        </template>
        <span>{{tooltipContext}}</span>
      </v-tooltip>
    </v-row>
    <v-row v-if="!iseditting" class="ocr-list">
      <v-list class="ocr-list-content">
        <template v-for="(item, index) in editedText">
          <v-list-item :key="index">
            <v-list-item-content>
              <v-list-item-title class="item-text" v-text="item"></v-list-item-title>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
            <v-divider
              v-if="index < items.length - 1"
              :key="index"
            ></v-divider>
        </template>
      </v-list>
    </v-row>
    <v-row v-else class="ocr-textarea">
      <v-textarea
      class="ocr-textarea-inside"
      name="input-7-1"
      outlined
      auto-grow
      :hide-details="true"
      :readonly="false"
     v-model="ocrText"
      ></v-textarea>
    </v-row>
</v-container>
</template>

<script>
import Api from '@/api/api'
import { mdiInformationOutline } from '@mdi/js'
export default {
  components : {
  },
  data(){
    return {
      icons : {
        mdiInformationOutline
      },
      ocrText : "",
      rawText : "",
      editedText : "",
      readable : true,
      isedit : false,
      iseditting : false,
      tooltipContext : '원본 진단서 사진을 참고하여 잘못 추출된 text를 수정해 주세요. 원본 진단서 사진과 같은 줄바꿈 또는 한 문장씩 줄바꿈을 해 주시면 더 좋은 진단서 번역을 받을 수 있습니다.',

      items: [
        { text: 'Real-Time'},
        { text: 'Audience'},
        { text: 'Conversions'},
      ],
    }
  },
  watch : {
    ocrText(){
      this.editedText = this.ocrText.split("\n")
      console.log(this.editedText)
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
      this.isedit = true
      this.iseditting = !this.iseditting
      
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
      console.log("asdf")
      let processDataText = this.processDataText()
      if(this.isedit){
        console.log(processDataText)
        let data = {
          diagnose_id : this.diagnose.diagnose_id,
          name : this.diagnose.diagnose_name,
          date : this.diagnose.diagnose_date,
          newJson : processDataText
        }
        Api.updateDiagnoseOCR(data)
        .then((res) => {
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
.ocr-list{
  margin-top : 30px !important;
  .ocr-list-content{
    width : 100%;
    padding : 0;
    border-radius: 5px;

    .item-text{
      line-height : 1.6;
      font-size : 14px;
      font-weight : 600;
      overflow : visible;
      white-space : normal;

    }
    
  }
}
.ocr-textarea{
  margin-top:30px !important;
  .ocr-textarea-inside{
    background : white;
  }
}
</style>
