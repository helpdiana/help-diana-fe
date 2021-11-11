<template>
  <v-list class="v-list-container">
    <v-list-item-group
      color="primary"
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-item-content>
          <span></span>
          <v-list-item-title class="test-item-title">
            <span class="test-dot"></span>{{item.text}}
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
      { text: '10:00 ~ 11:00 / CT촬영', icon: 'mdi-clock' },
      { text: '10:00 ~ 11:00 / X-ray 검사', icon: 'mdi-account' },
      { text: '10:00 ~ 11:00 / Full-Battery', icon: 'mdi-flag' },
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
