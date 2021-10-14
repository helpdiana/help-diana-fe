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
     :value="ocrText"
      ></v-textarea>
    </v-row>
</v-container>
</template>

<script>
export default {
  components : {
  },
  data(){
    return {
      ocrText : "",
      rawText : [
		[
			" [검사명] 흡인세포병리검사(TBNA) [BP2C06] 【구분】 입원 [최종보고] [판독의1] 【검체】 Lymph."
		],
		[
			"node [병리번호] P2022967 결론 및 진단 (219350) Received specimen status: 4 unstained slides in alcohol-fixed 1."
		],
		[
			"2 H&E 2 PAP Lymph node."
		],
		[
			"mass#1."
		],
		[
			"EBUS-transbrcnchial needle biopsy : Positive for malignant cells Consistent with CARCINOMA [검사명] 생검 1~3개 [BP1A101] 【구분】 입원 [최종보고] [판독의1] [검체] Lymph node [병리번호] S2027692 결론 및 진단 (219350) 1."
		],
		[
			"Lymph node."
		],
		[
			"mass#1."
		],
		[
			"EBUS-transbrnchial needle biopsy : Metastatic poorly differentiated carcinoma Addendum (J20-06057)."
		],
		[
			"2020-07-16 >> (207876) Specimen condition: paraffin block << Results of immunohistochemistry (J20-6057) ."
		],
		[
			"ALK CDx assay(동반진단검사): Negative Staining for positive and negative control."
		],
		[
			"and negative reagent control was performed."
		],
		[
			"All controls show appropriate reactivity."
		]
	]

    }
  },
  computed :{
    
  },
  methods:{
    processData(){
      
      for(let i = 0 ; i< this.rawText.length; i++){
        this.ocrText += this.rawText[i]
        this.ocrText += "\n\n"
      }
    },
    editText(){

    },
    showResult(){
      this.$router.push('show-result')
    }

  },
  mounted(){
    this.processData()
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
