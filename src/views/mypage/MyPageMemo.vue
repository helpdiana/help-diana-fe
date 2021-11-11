<template>
<div>
    <v-textarea
      name="input-7-1"
      outlined
      label="memo"
      auto-grow
      v-model="memo"
    ></v-textarea>
    <v-btn color="primary" class="memo-btn">
      메모저장
    </v-btn>
</div>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    memo:"",
    items: [
      { text: '폐암 검사지 기록지', icon: 'mdi-clock' },
      { text: '의사 소견서', icon: 'mdi-account' },
      { text: 'CT촬영 해석본', icon: 'mdi-flag' },
    ],
  }),
  computed : {

  },
  methods : {

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
