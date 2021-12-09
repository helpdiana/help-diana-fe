<template>
<div class="diagnose-container">
  <v-list>
    <v-list-item-group
      color="primary"
    >
      <v-list-item
        v-for="(diagnose, i) in diagnoselist"
        :key="i"
        class="list-item"
      >
        <v-list-item-content @click="gotoResult(diagnose)">
          <span></span>
          <v-list-item-title class="item-title" v-text="diagnose.name"></v-list-item-title>
        </v-list-item-content>
        <v-divider
          v-if="index < diagnoselist.length - 1"
          :key="index"
        ></v-divider>
      </v-list-item>
    </v-list-item-group>
  </v-list>
  <div class="empty-message" v-if="!diagnoselist.length">
    <span> 나의 기록이 존재하지 않습니다.</span>
  </div>
</div>
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
.diagnose-container{

  .v-list-item{
    padding : 0 0 0 10px;
    .item-title{
      font-size : 14px;
      font-weight: bold;
    }
  }
  .empty-message{
    text-align: center;
    color: #555555;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 16px;
  }
}


</style>
