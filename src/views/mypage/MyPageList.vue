<template>
  <v-list >
    <v-list-item-group
      color="primary"
    >
      <v-list-item
        v-for="(diagnose, i) in diagnoselist"
        :key="i"
      >
        <v-list-item-content @click="gotoResult(diagnose)">
          <span></span>
          <v-list-item-title class="item-title" v-text="diagnose.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
const moment = require('moment')

export default {
  props : ['diagnoses'],
  components: {
  },
  data: () => ({
    items: [
      { text: '폐암 검사지 기록지', icon: 'mdi-clock' },
      { text: '의사 소견서', icon: 'mdi-account' },
      { text: 'CT촬영 해석본', icon: 'mdi-flag' },
    ],
  }),
  computed : {
    diagnoselist(){

      return this.diagnoses
    }
  },
  methods : {
    gotoResult(i){
      let store_data = {
        diagnose_id : i.id,
        diagnose_name : i.name,
        diagnose_date : i.date
      }

      this.$store.commit("storeDiagnose", store_data)
      this.$router.push('show-result')
    }
  },
  mounted(){

  },
  created(){

  }
}
</script>

<style lang="scss">
.v-list-item{
  padding : 0 0 0 10px;
  .item-title{
    font-size : 14px;
    font-weight: bold;
  }
}


</style>
