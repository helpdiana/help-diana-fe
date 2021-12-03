<template>
  <v-row>
    <v-col  cols="12" class="hello-comment">
      Hello. I'm DIANA.
    </v-col>
    <v-col cols="12" md="4" v-if="!isColdStart">
      <dashboard-cold-start :person=personalData></dashboard-cold-start>
    </v-col>
    <v-col
      cols="12"
      md="4"
      v-if="isColdStart"
    >
      <dashboard-congratulation-john></dashboard-congratulation-john>
    </v-col>
    <v-col
      cols="12"
      md="4"
      v-if="isDoctor"
    >
      <dashboard-doctor></dashboard-doctor>
    </v-col>


  </v-row>
</template>

<script>

import Api from '@/api/api'

// eslint-disable-next-line object-curly-newline
import { mdiPoll, mdiLabelVariantOutline, mdiCurrencyUsd, mdiHelpCircleOutline } from '@mdi/js'
import StatisticsCardVertical from '@/components/statistics-card/StatisticsCardVertical.vue'

// demos
import DashboardCongratulationJohn from './DashboardCongratulationJohn.vue'
import DashboardStatisticsCard from './DashboardStatisticsCard.vue'
import DashboardCardTotalEarning from './DashboardCardTotalEarning.vue'
import DashboardCardDepositAndWithdraw from './DashboardCardDepositAndWithdraw.vue'
import DashboardCardSalesByCountries from './DashboardCardSalesByCountries.vue'
import DashboardWeeklyOverview from './DashboardWeeklyOverview.vue'
import DashboardDatatable from './DashboardDatatable.vue'
import DashboardDoctor from './DashboardDoctor.vue'
import DashboardColdStart from './DashboardColdStart.vue'

export default {
  components: {
    StatisticsCardVertical,
    DashboardCongratulationJohn,
    DashboardStatisticsCard,
    DashboardCardTotalEarning,
    DashboardCardDepositAndWithdraw,
    DashboardCardSalesByCountries,
    DashboardWeeklyOverview,
    DashboardDatatable,
    DashboardDoctor,
    DashboardColdStart
  },
  setup() {
    const totalProfit = {
      statTitle: 'Total Profit',
      icon: mdiPoll,
      color: 'success',
      subtitle: 'Weekly Project',
      statistics: '$25.6k',
      change: '+42%',
    }

    const totalSales = {
      statTitle: 'Refunds',
      icon: mdiCurrencyUsd,
      color: 'secondary',
      subtitle: 'Past Month',
      statistics: '$78',
      change: '-15%',
    }

    // vertical card options
    const newProject = {
      statTitle: 'New Project',
      icon: mdiLabelVariantOutline,
      color: 'primary',
      subtitle: 'Yearly Project',
      statistics: '862',
      change: '-18%',
    }

    const salesQueries = {
      statTitle: 'Sales Quries',
      icon: mdiHelpCircleOutline,
      color: 'warning',
      subtitle: 'Last week',
      statistics: '15',
      change: '-18%',
    }

    return {
      totalProfit,
      totalSales,
      newProject,
      salesQueries,
    }
  },

  data(){
    return {
      isDoctor : false,
      name : "",
      personalData : null,
      isColdStart : true,

    }
  },
  computed : {
    
  },
  methods : {
    getProfile(){
      Api.getProfile()
      .then((res) => {
        this.personalData = res.data
        console.log(this.personalData)
        if(this.personalData.doctor == "null"){
          this.isColdStart = false
        }else if(this.personalData.doctor == 1){
          this.isDoctor = true
        }else{
          this.isDoctor = false
        }
      })
      .catch((err)=>{
        alert("서버오류!")
      })
    }
  },
  mounted(){
  },
  created(){
    this.getProfile()
  }
}
</script>
<style lang="scss">
.hello-comment{
  font-size : 2rem;
  font-weight : bold;
  color : #001489;
}
</style>
