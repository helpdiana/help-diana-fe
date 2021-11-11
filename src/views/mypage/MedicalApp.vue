<template>
  <v-list >
    <v-list-item-group
      color="primary"
    >
      <v-list-item
        v-for="(clinic, i) in cliniclist"
        :key="i"
      >
        <v-list-item-content>
          <span></span>
          <v-list-item-title class="medical-item-title">
            <span class="medic-dot"></span>{{clinic}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
const moment = require('moment')

export default {
  props : ["clinics"],
  components: {

  },
  data: () => ({
  }),
  computed : {
    cliniclist(){
      let items = []
      this.clinics.forEach((v)=>{
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
    console.log(this.clinics)
    console.log(this.cliniclist)
  },
  created(){

  }
}
</script>

<style lang="scss">
.v-list-item{
  padding : 0;
  .medical-item-title{
    font-size : 12px;
    font-weight: bold;

    .medic-dot{
      width: 7px;
      height: 7px;
      margin: 0px 10px 0 5px;
      border: solid 1px #348f50;
      background-color: #348f50;
      border-radius: 50%;
      display: inline-block;
      vertical-align: revert;
    }
  }
}


</style>
