<template>
<v-container>
  <v-row><p class="text-2xl mb-6"> 프로필 </p></v-row>
  <v-row>
  <v-card
    flat
    class=""
  >
    <v-form class="multi-col-validation">
      <v-card-text class="pt-5">
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="profile"
              outlined
              rows="3"
              label="소개란"
            ></v-textarea>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="email"
              outlined
              disabled
              dense
              label="이메일"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="name"
              outlined
              dense
              label="이름"
            ></v-text-field>
          </v-col>


          <v-col
            cols="12"
            md="6"
          >
            <v-select
              v-model="isdoctor"
              outlined
              dense
              label="의사여부"
              :items="['Patient','Doctor']"
            ></v-select>
          </v-col>

        </v-row>
      </v-card-text>

      <v-card-text>
        <v-btn
          color="primary"
          class="me-3 mt-3"
          @click="updateProfile()"
        >
          저장하기
        </v-btn>
        <v-btn
          outlined
          class="mt-3"
          color="secondary"
          type="reset"
          @click.prevent="resetForm"
        >
          취소하기
        </v-btn>
      </v-card-text>
    </v-form>
  </v-card>
  </v-row>
</v-container>
</template>

<script>
import { ref } from '@vue/composition-api'
import Api from '@/api/api'


export default {
  props: {
    informationData: {
      type: Object,
      default: () => {},
    },
  },
  data(){
    return {
        profile : "",
        email : "",
        name : "",
        isdoctor : "",
    }
  },
  methods : {
    getProfile(){
      Api.getProfile()
      .then((res) => {
        console.log(res)
        this.profile = res.data.profile
        this.email = res.data.email
        this.name = res.data.name
        this.isdoctor = res.data.doctor == true ? "Doctor" : "Patient"
      })
      .catch((err)=>{
        alert("서버오류!")
      })
    },
    updateProfile(){

      let data = {
        name : this.name,
        doctor : this.isdoctor == "Doctor" ? 1 : 0,
        profile : this.profile
      }
      Api.updateProfile(data)
      .then((res)=>{
        alert("수정되었습니다.")
      })
      .catch((err)=>{
        alert("서버오류!")
      })
    },

  },
  mounted(){
    this.getProfile()
  }
}
</script>
