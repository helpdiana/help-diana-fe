<template>
  <v-card class="my-page-container">
    <v-container>
      <v-row><p class="text-2xl mb-6">마이 페이지</p>
      <v-spacer></v-spacer>
      <v-btn
        color="success"
        class="text-none mr-2"
        @click="addInfo()"
      >
        추가하기
      </v-btn>
      </v-row>
      <v-row>
        <span class="text-l mb-6">{{date}}</span>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
        <template v-slot:activator="{ on, attrs }">
        <v-icon @click="menu = !menu" v-bind="attrs" v-on="on" class="text-xl mb-6 pl-3 calendar">
          {{icons.mdiCalendar}}</v-icon>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="getDataDate()"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      </v-row>
      <v-row>
        <v-col class="mypage-cell" cols="12">
          <span class="text-xl mb-6">나의 기록({{diagnoses.length}})</span>
        </v-col>
        <v-col class="my-record">
          <my-page-list :diagnoses="diagnoses"></my-page-list>
        </v-col>
      </v-row>  
      <v-row>
        <v-col class="mypage-cell" cols="12">
          <span class="text-xl mb-6">진료예약({{clinics.length}})</span>
        </v-col>
        <v-col class="my-record">
          <medical-app :clinics="clinics"></medical-app>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mypage-cell" cols="12">
          <span class="text-xl mb-6">검사예약({{examines.length}})</span>
        </v-col>
        <v-col class="my-record">
          <test-app :examines="examines"></test-app>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mypage-cell" cols="12">
          <span class="text-xl mb-6">메모</span>
        </v-col>
        <v-col class="my-record">
          <my-page-memo :memos="memos" :date="date"></my-page-memo>
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
                <span class="text-h5">추가하기</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-radio-group
                        v-model="type"
                        row
                      >
                        <v-radio
                          label="진료예약"
                          value="medi"
                        ></v-radio>
                        <v-radio
                          label="검사예약"
                          value="test"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="진료/검사 내용"
                        required
                        v-model="name"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="time"
                          label="시간"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                        <v-time-picker
                          format="ampm"
                          v-model="time"
                          @input="menu2 = false"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
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
                  @click="addMyPageItem()"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
    </v-container>
  </v-card>
</template>

<script>

import MyPageList from './MyPageList.vue'
import MedicalApp from './MedicalApp.vue'
import TestApp from './TestApp.vue'
import MyPageMemo from './MyPageMemo.vue'
import Api from '@/api/api'
import {mdiCalendar} from '@mdi/js'

const moment = require('moment')

export default {
  components: {
    MyPageList,
    MedicalApp,
    TestApp,
    MyPageMemo
  },
  data(){
    return {
      icons : {
        mdiCalendar
      },
      date: moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD"),
      dialog: false,
      menu: false,
      menu2: false,
      isSelecting : false,
      type : "medi",
      name : "",
      time : "",
      
      diagnoses : [],
      clinics : [],
      examines : [],
      memos : [],
    }
  },
  methods : {
    getDataDate(){
      this.$refs.menu.save(this.date)

      let params = {
        date : this.date
      }

      Api.getMyPage(params)
      .then((res) => {
        this.diagnoses = res.data.diagnoses
        this.clinics = res.data.clinics
        this.examines = res.data.examines
        this.memos = res.data.memo
        console.log(this.memos)
      })
    },
    addInfo(){
      //Modal 띄우기
      this.dialog = true
    },
    addMyPageItem(){

      let startTime = moment(this.time, "HH:mm:ss").format("HH:mm:ss")
      let endTime = moment(this.time, "HH:mm:ss").add('60', 'minutes').format("HH:mm:ss")

      let data = {
        name : this.name,
        date : this.date,
        start : startTime,
        end : endTime
      }
      
      if(this.type == "medi"){
        //진료 예약
        Api.addClinic(data)
        .then((res) => {
          this.dialog = false
          this.name = ""
          this.time = ""
          this.type = "medi"
          this.getDataDate()
        })
        .catch((err)=>{
          alert("추가에 실패했습니다.")
        })
      }else{
        //검사 예약
        Api.addExamine(data)
        .then((res) => {
          this.dialog = false
          this.name = ""
          this.time = ""
          this.type = "medi"
          this.getDataDate()
        })
        .catch((err)=>{
          alert("추가에 실패했습니다.")
        })
      }
    }
  },
  mounted(){
    this.getDataDate()
  }
}
</script>

<style lang="scss">
.my-page-container{
  padding : 20px 15px;

  .mypage-cell{
    padding : 0;
  }
  .my-record{
    padding : 0;
  }
  .calendar{
    &:hover{
      cursor: pointer;
    }
  }
}


</style>
