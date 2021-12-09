
<template>
<v-container class="diagnose-list-container">
  <v-row><p class="text-2xl mb-6"> 진단서 설명 요청 </p></v-row>
  <v-row>
    <v-card class="card-container">
      <v-data-table
        :headers="headers"
        :items="diag_list"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        :hide-default-footer="hideFooter"
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template v-slot:item.check="{ item }">
          <v-btn color="primary" @click="acceptDiagnose(item.id)">
            수락하기
          </v-btn>
        </template>
      </v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
          ></v-pagination>
        </div>
    </v-card>
  </v-row>
</v-container>
</template>

<script>
import Api from '@/api/api'
export default {
  components: {
  },
  props : [],
  data(){
    return {
        hideFooter : true,
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        headers: [
        {text : 'ID', sortable : false, value:'id', width:"50px"},
        {
          text: '날짜',
          align: 'start',
          sortable: true,
          value: 'date',
          width : "130px"
        },
        { text: '진단서 제목', sortable : false,value: 'name',  },
        { text: '수락', sortable : false, value: 'check', width:"200px" },
      ],
      diag_list: [
        {
          id : 1,
          date: '2021-12-03',
          title : "진단서1",
          check : "sample"
        },
        { 
          id : 2,
          date: '2021-12-04',
          title : "진단서2",
          check : "sample"
        },
        {
          id : 3,
          date: '2021-12-05',
          title : "진단서3",
          check : "sample"
        },
          
        ],
    }
  },
  computed : {

  },
  methods : {
    getDiagnoseList(){
      this.diag_list = []
      Api.getDiagnoseList()
      .then((res) => {
        this.diag_list = res.data
      })
    },
    acceptDiagnose(id){
      let data = {
        diagnose_id : id
      }
      Api.checkDiagnose(data)
      .then((res)=>{
        console.log(res)
        this.$router.push({name : "diagnose-edit", query:{"diagnose_id" : id}})
      })

    }
  },
  mounted(){
    this.getDiagnoseList()
  }
}
</script>

<style lang="scss">
.card-container{
  width : 100%;
}
</style>
