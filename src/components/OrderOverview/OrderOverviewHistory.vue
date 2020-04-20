<template>
    <v-card flat>
        <v-expansion-panels>
            <OrderOverviewHistoryItem/>
        </v-expansion-panels>
    </v-card>
</template>

<script>
import orderService from "@/api/orders.api"
import OrderOverviewHistoryItem from '@/components/OrderOverview/OrderOverviewHistoryItem'

export default {
    name: 'OrderOverviewHistory',
    components: {
        OrderOverviewHistoryItem
    },
    methods: {
        init(){
            orderService.getOrders()
            .then(function (response) {
            })
            .catch((error) => {
                console.warn(error)
            })
        }
    },
    mounted(){
        this.init()
    }
}
</script>