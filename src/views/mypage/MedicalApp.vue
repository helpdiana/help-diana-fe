<template>
  <v-list >
    <v-list-item-group
      color="primary"
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-item-content>
          <span></span>
          <v-list-item-title class="medical-item-title">
            <span class="medic-dot"></span>{{item.text}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    items: [
      { text: '10:00~11:00 / 중앙대학교 병원 피부과 / 김태환', icon: 'mdi-clock' },
      { text: '10:30~11:00 / 중앙대학교 신경외과 / 김보경', icon: 'mdi-account' },
      { text: '12:00 ~ 13:00 / 중앙대학교 정신과 / 김상렬', icon: 'mdi-account' },
      { text: '15:00 ~ 16:00 / 중앙대학교 병원 안과 / 채희선', icon: 'mdi-account' },
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
