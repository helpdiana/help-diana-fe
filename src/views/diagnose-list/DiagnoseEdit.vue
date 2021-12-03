
<template>
<v-container class="diagnose-list-container">
  <v-row>
    <v-col>
      <p class="text-2xl mb-6"> 진단서 수정 </p>
    </v-col>
    <v-col class="edit-diagnose">
      <v-btn color="primary" @click="updateDiagnoseTranslate()">
        결과저장
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
      <v-col class="result-body">
        <v-expansion-panels accordion>
          <v-expansion-panel
            v-for="i in rawText.length"
            :key="i"
          >
            <v-expansion-panel-header class="panel-header">
              <div>
                <span v-if="processTransText[i-1].edit == false" class="process-trans-text">
                  {{processTransText[i-1].value}}
                </span>
                <textarea @click.stop class="edit-trans-text" v-else 
                v-model = "processTransText[i-1].value">
                </textarea>
                <v-icon @click.stop="processTransText[i-1].edit = !processTransText[i-1].edit;
                  editTransText(); ">
                  {{icons.mdiPencil}}
                </v-icon>
              </div>
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
import {mdiPencil} from '@mdi/js'
import Api from '@/api/api'
export default {

  components : {
  },
  data(){
    return {
      icons:{
        mdiPencil
      },
      selected: [2],
      rawText : [], 
      trans_after: [],
      
      processRawText : [],
      processTransText : [],

    }
  },
  computed :{
    // diagnose(){
    //   return this.$store.state.diagnose
    // }
  },
  methods:{
    editTransText(){
      console.log("adsf")
    },
    updateDiagnoseTranslate(){
      let newJSON = []
      this.processTransText.forEach((v)=>{
        newJSON.push([v.value])
      })
      let data = {
        diagnose_id : this.$route.query.diagnose_id,
        newJson : JSON.stringify({
          diagnose_af : [newJSON]
        })
      }
      console.log(data)
      console.log(JSON.stringify(data))
      Api.updateDiagnoseTranslate(data)
      .then((res)=>{
        console.log(res)
      })
    },
    getDiagnoseAll(){
      let data = {
        diagnose_id : this.$route.query.diagnose_id
        //diagnose_id : 140
      }
      Api.getDiagnoseAll(data)
      .then((res) => {
        console.log(res)
        this.rawText = res.data[0].diagnose_bf[0]
        this.trans_after = res.data[1].diagnose_af[0]

        //initialize
        this.iniRawText()
        this.iniTransText()

        console.log(this.processTransText)
      })
    },
    saveReportResult(){
      this.$router.push("report")
    },
    iniRawText(){
      this.processRawText = this.rawText.map(x => x[0]) 
    },
    iniTransText(){
      this.processTransText = this.trans_after.map(x => ({
        'value' : x[0], 'edit' : false
        })) 
    }


  },
  mounted(){
    this.getDiagnoseAll()
  },
  created(){
  }
};
</script>
</script>

<style lang="scss">
.diagnose-list-container{
  .edit-diagnose{
    padding : 12px 0;
    display: flex;
    flex-direction: row-reverse;
  }
  .result-body{
    padding : 0;
    
    .result-body-list{
      padding : 0;
    }
    .process-trans-text{
      line-height : 16px;
      font-weight: bold;
      font-size : 13px;
    }
    .edit-trans-text{
      width : 100%;
      min-height : 100px;
      font-size : 13px;
      border: 1px solid #afafaf;
      border-radius: 5px;
      padding: 3px;
      overflow : auto;
    }
    .process-raw-text{
      line-height : 16px;
      font-size: 13px;
    }

  }
}
</style>
