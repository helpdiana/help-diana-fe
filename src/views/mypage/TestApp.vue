<template>
  <v-list class="v-list-container">
    <v-list-item-group
      color="primary"
    >
      <v-list-item
        v-for="(examine, i) in examinelist"
        :key="i"
      >
        <v-list-item-content>
          <span></span>
          <v-list-item-title class="test-item-title">
            <span class="test-dot"></span>{{examine}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
const moment = require('moment')

export default {
  props : ["examines"],
  components: {
  },
  data: () => ({
    items: [
      { text: '10:00 ~ 11:00 / CT촬영', icon: 'mdi-clock' },
      { text: '10:00 ~ 11:00 / X-ray 검사', icon: 'mdi-account' },
      { text: '10:00 ~ 11:00 / Full-Battery', icon: 'mdi-flag' },
    ],
  }),
  computed : {
    examinelist(){
      let items = []
      this.examines.forEach((v)=>{
        let time = `${moment(v.startTime, "HH:mm").format("HH:mm")} 
        ~ ${moment(v.endTime, "HH:mm").format("HH:mm") }`
        let text = `${v.name}`
        items.push(`${time} / ${text}`)
      })

      return items
    }

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
.v-list-item{
  padding : 0;
  .test-item-title{
    font-size : 12px;
    font-weight: bold;

    .test-dot{
      width: 7px;
      height: 7px;
      margin: 0px 10px 0 5px;
      border: solid 1px #56b4d3;
      background-color: #56b4d3;
      border-radius: 50%;
      display: inline-block;
      vertical-align: revert;
    }
  }
}
</style>
