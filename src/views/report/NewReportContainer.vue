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
    <div ref="document">
    <div class="report-img-container" >
      <img class="report-img" :src="require(`@/assets/images/logos/helpdiana-new.png`)"/>
    </div>
    <v-card-title class="align-start">
      <span>{{report_title}}</span>
      <v-spacer></v-spacer>
      <span>{{report_date}}</span>
      
    </v-card-title>


    <v-card-text class="report-body">
      <v-row v-for="i in rawText.length" :key="i">
        <v-col cols="12" class="index">
          <span> #{{ i }} </span>
        </v-col>
        <v-col cols="12" class="cell origin">
          <span class="report-span-header">원문</span>
          <span>{{ processRawText[i-1] }}</span>
        </v-col>
        <v-col cols="12" class="cell edit">
          <span class="report-span-header">다이애나 해석</span>
          <span>{{ processTransText[i-1] }}</span>
        </v-col>
        <v-col cols="12" class="cell highlight">
          <span class="report-span-header">다이애나 하이라이트</span>
          <span>{{highlight_text[i-1]}}</span>
        </v-col>
      </v-row>
    </v-card-text>
    
  </div>
  </v-card>
</v-container>
</template>

<script>
import html2pdf from 'html2pdf.js'
import Api from '@/api/api'

export default {
  components: {
  },
  props : [],
  data(){
    return {
      report_title : "진단서 제목",
      report_date : "YYYY.MM.DD",
      rawText : [],
      trans_after : [],
      highlight_text : [],
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
  methods : {
    downloadPdf(){
      console.log("download")
			html2pdf(this.$refs.document, {
				margin: 1,
				filename: 'diana.pdf',
				image: { type: 'jpeg', quality: 2 },
				html2canvas: { scale: 0.8,dpi: 500, letterRendering: true, allowTaint: true, useCORS: true },
				jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compressPDF:true }
			})
    },
    getDiagnoseAll(){
      let data = {
        //diagnose_id : this.diagnose.diagnose_id
        diagnose_id : 140
      }
      Api.getDiagnoseAll(data)
      .then((res) => {
        console.log(res)
        this.rawText = res.data[0].diagnose_bf[0]
        this.trans_after = res.data[1].diagnose_af[0]
      })
    },

    getHighlightWord(){
      let data = {
        //diagnose_id : this.diagnose.diagnose_id
        diagnose_id : 140
      }
      Api.getDiagnoseEngOCR(data)
      .then((res) => {
        let word_data = {
          data : res.data.diagnose_eng_af
        }
        Api.getHighlightWord(JSON.stringify(word_data))
        .then((res) => {
          this.modifyHighlight(res.data.data)
        })
      })
    },
    modifyHighlight(data){

      data.forEach((v)=>{
        console.log(v)
        if(v.length){

          let highlight_text_cell = ""
          v.forEach((value)=>{
            let highlight_list = Object.values(value)[0][0]
            console.log("하이라이트")
            console.log(highlight_list)
            highlight_text_cell += 
            `${highlight_list[0]}(${highlight_list[1]}) : ${highlight_list[2]} \n\n`
          })

          this.highlight_text.push(highlight_text_cell)

        }else{
          this.highlight_text.push("하이라이트 단어가 검출되지 않았습니다.")
        }
      })

      console.log(this.highlight_text)
    },
    initialize(){
      //this.report_title = this.diagnose.diagnose_name
      //this.report_date = this.diagnose.diagnose_date

      this.rawText = []
      this.trans_after = []
      this.highlight_text = []
    },
  },
  mounted(){
    this.initialize()
    this.getHighlightWord()
    this.getDiagnoseAll()
    console.log(this.diagnose)
  }
}
</script>

<style lang="scss">
.report-container{
  .report-img-container{
    padding-top : 20px;
    .report-img{
    display : block;
    width : 100px;
    margin : 0px auto;
    }

  }
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
    .report-span-header{
      display : block;
      font-size : 10px;
      color : #001489;
      font-weight : 600;
    }
  }
}
</style>