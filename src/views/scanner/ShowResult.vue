<template>
<v-container>
    <v-row><p class="text-2xl mb-6"> 결과보기 </p></v-row>
    <v-row>
      <v-btn class="mr-1" color="primary" small @click="saveResult()">결과 저장</v-btn>
      <v-btn class="mr-1" color="primary" small @click="requestQuestion()">설명 요청</v-btn>
      <v-btn class="mr-1" color="success" small @click="saveReportResult()">
        <v-icon>{{icons.mdiFileDocument}}</v-icon>보고서 저장</v-btn>
    </v-row>
    <v-row>
      <v-col class="result-body">
        <v-expansion-panels accordion>
          <v-expansion-panel
            v-for="i in rawText.length"
            :key="i"
          >
            <v-expansion-panel-header class="panel-header">
              <div class="process-trans-text">{{processTransText[i]}}</div>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="panel-content">
              <div class="process-raw-text">{{processRawText[i]}}</div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

</v-container>
</template>

<script>
import {mdiFileDocument} from "@mdi/js"
export default {
  components : {
  },
  data(){
    return {
      icons:{
        mdiFileDocument
      },
      selected: [2],
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
      ],
    trans_after: [
      [
        "[검사명] 흡인세포병리검사(tbna) [bp2c06] 【구분】 입원 [최종보고] [판독의1] 【검체】 lymph."
      ],
      [
        "노드 [ [967] P2022967 결 ( (219350) 수신된 시료 상태: 알코올 고정 1에서 4개의 미정 슬라이드."
      ],
      [
        "2 H&E 2 PAP 림프절입니다."
      ],
      [
        "미사#1"
      ],
      [
        "EBUS-트랜스브론치알 바늘 조직검사 : 암세포마 [사]] 생 1~3 [ [BP1A101] 【구 [최]1] [판]] 림프절 [병]] S2027692 결및2 및22 및2 및22 및222 및22 22222 222222 e e22 e e222222 e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e"
      ],
      [
        "림프절."
      ],
      [
        "미사#1"
      ],
      [
        "EBUS-트랜스브렌치얼 바늘 조직검사 : 전이성 저분화 암종 부록 (J20-06057)"
      ],
      [
        "2020-07-16 > (207876) 시료 상태: 파라핀 블록 << 면역역화학 결과 (J20-6057)"
      ],
      [
        "ALK CDx 검사(반반 alk(): 양성 및 음성 대조군에 대한 음성 얼룩."
      ],
      [
        "음성 시약 제어가 수행되었습니다."
      ],
      [
        "모든 컨트롤은 적절한 반응성을 나타냅니다."
      ]
    ]

    }
  },
  computed :{
    processRawText : function(){
      return this.rawText.map(x => x[0]) 
    },
    processTransText : function(){
      return this.trans_after.map(x => x[0])
    },
  },
  methods:{

  },
  mounted(){
    console.log(this.processRawText)
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