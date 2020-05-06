<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <OrderOverviewHistory/>
      </v-tab-item>

      <v-tab-item>
        <OrderOverviewRecurringOrders/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<style scoped>
</style>

<script>
import OrderOverviewHistory from '@/components/OrderOverview/OrderOverviewHistory'
import OrderOverviewRecurringOrders from '@/components/OrderOverview/OrderOverviewRecurringOrders'

export default {
    name: 'OrderOverviewTab',
    data: function (){
        return{
            tab: null,
            items: ['Order history', 'Recurring orders']
        }
    },
    components: {
      OrderOverviewHistory,
      OrderOverviewRecurringOrders
    }
}
</script>