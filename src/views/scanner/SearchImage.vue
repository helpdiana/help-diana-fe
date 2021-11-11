<template>
<v-container>
  <v-row><p class="text-2xl mb-6"> 사진 올리기 </p></v-row>
  <v-row>
    <div>
      <v-btn
        color="primary"
        class="text-none mr-2"
        small
        depressed
        @click="onButtonClick"
      >
        <v-icon left>
          {{icons.mdiCloudUpload}}
        </v-icon>
        진단서 올리기
      </v-btn>
      <input
        ref="uploader"
        class="d-none"
        type="file"
        accept="image/*"
        @change="onFileChanged"
      >
      <v-btn
        color="success"
        small
        @click="checkDialog()"
      >
        진단서 저장 및 가공
      </v-btn>
    </div>
  </v-row>
  <v-row justify="center" align="center" v-if="!images.length" class="empty-message">
    <v-icon size="22">
        {{ icons.mdiArchiveArrowUpOutline }}
    </v-icon>
    <span>진단서 사진을 업로드 해주세요 </span>
  </v-row>
  <v-row class="card-view">
    <v-col class="card-view-image pa-2" cols="12" sm="6" md="4" lg="3" xl="2" v-for="(url,index) in this.url" :key=index>
      <!-- 카드 UI에 사진 담아내기-->
      <!-- <span class="card-view-number">
        {{index + 1}}
      </span> -->
      <v-card height="200px" outlined
      >
      <v-btn
        class="mx-2 delete-button"
        x-small
        fab
        color="red"
        @click="deleteImage(index)"
      >
      <v-icon dark>
        mdi-close
      </v-icon>
    </v-btn>
        <v-img :src="url" height="200px">
        </v-img>
      </v-card>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">진단서 업로드</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="진단서 제목"
                  required
                  v-model="dia_name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dia_date"
                      label="진단서 날짜"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                <v-date-picker
                  v-model="dia_date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-alert
          border="left"
          colored-border
          type="warning"
          elevation="2"
        >
          진단서에 개인정보로 식별될 수 있는 이름 생년 월 일등은 가리고 업로드 해주시기 바랍니다.
        </v-alert>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="processImage()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</v-container>
</template>

<script>
import Api from '@/api/api'
import { mdiCloudUpload, mdiArchiveArrowUpOutline } from '@mdi/js'
export default {
  components : {
  },
  data(){
    return {
      icons : {
        mdiCloudUpload,
        mdiArchiveArrowUpOutline
      },
      images:[],
      url : [],
      image : null,
      isSelecting : false,
      dia_name : "",
      dia_date : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dialog: false,
      menu2: false,
    }
  },
  computed :{
    
  },
  methods:{
    onButtonClick(){
      this.isSelecting = true
      window.addEventListener('visibilitychange', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
    },
    onFileChanged(e){
      this.images.push(e.target.files[0])
      this.url = []
      for(let i = 0; i<this.images.length; i++){
        this.url.push(URL.createObjectURL(this.images[i]))
      }
    },
    preview_image(){
      this.images.push(this.image)
      this.url = []
      for(let i = 0; i<this.images.length; i++){
        this.url.push(URL.createObjectURL(this.images[i]))
      }
    },
    checkDialog(){
      //Modal 띄우기
      this.dialog = true
    },
    processImage(){

      let data = {
        files : this.images,
        name : this.dia_name,
        date : this.dia_date
      }
      console.log("프로세스 이미지")
      Api.addDiagnose(data)
      .then((res) => {
        this.dialog = false
        
        console.log(res)

        
        
        let store_data = {
          diagnose_id : res.data.id,
          diagnose_name : data.name,
          diagnose_date : data.date
        }
      
        console.log(store_data)
        this.$store.commit("storeDiagnose", store_data)
        this.$router.push('process-image')
        
      })
      .catch((err) => {
        console.log(err)
        alert("업로드 오류 발생!")
      })
    },
    deleteImage(index){
      if(index > -1){
        this.url.splice(index,1)
        this.images.splice(index,1)
      }
    }
  },
  mounted(){
  },
  created(){
  }
};
</script>

<style lang="scss">
.card-view-image{
  padding : 12px 0;
  .delete-button{
    position:absolute;
    top : 10px;
    right:0;
    z-index:100;
    color : red;
  }
  .card-view-number{
    position:absolute;
    z-index:100;
    left:40px;
    color : blue;
    font-weight : bold;
  }
}
.empty-message{
  position: relative;
  top: 30vh;
}

</style>
