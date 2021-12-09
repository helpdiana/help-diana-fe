<template>
<div>
    <v-textarea
      name="input-7-1"
      outlined
      label="memo"
      auto-grow
      v-model="inner_memo"
    ></v-textarea>
    <v-btn color="primary" class="memo-btn" @click="updateMemo()">
      메모저장
    </v-btn>
</div>
</template>

<script>
import Api from '@/api/api'
export default {
  props : ["memos", "date"],
  components: {
  },
  watch : {
    memos(){
      this.initialize()
    }
  },
  computed(){

  },
  data: () => ({
    memo:"",
    items: [
      { text: '폐암 검사지 기록지', icon: 'mdi-clock' },
      { text: '의사 소견서', icon: 'mdi-account' },
      { text: 'CT촬영 해석본', icon: 'mdi-flag' },
    ],
    inner_memo : ""
  }),
  methods : {
    initialize(){
      this.inner_memo = ""
      this.inner_memo = this.memos.memo

    },
    updateMemo(){
      
      let data = {
        date : this.date,
        memo : this.inner_memo
      }
      Api.updateMemo(data)
      .then((res)=>{
        alert("메모가 저장되었습니다.")
      })
    }
  },
  mounted(){

  },
  created(){

  }
}
</script>

<style lang="scss">
.memo-btn{
  float: right;
}


</style>
