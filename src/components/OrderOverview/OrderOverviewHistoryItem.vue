<template>
    <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }" style="background:#EEFAF6;">
            <v-fade-transition leave-absolute>
                <v-row v-if="open">
                    <v-col cols="3">
                        <p class="inline">Order date: </p>{{orderDate.getDate()+'/'+orderDate.getMonth()+'/'+orderDate.getYear()}}
                    </v-col>

                    <v-col cols="3">
                        <p class="inline">Order number: </p>{{orderId}}
                    </v-col>
                </v-row>
            
                <v-row>
                    <v-col cols="3">
                        <p class="inline">Order date: </p>{{orderDate.getDate()+'/'+orderDate.getMonth()+'/'+orderDate.getYear()}}
                    </v-col>

                    <v-col cols="3">
                        <p class="inline">Order number: </p>{{orderId}}
                    </v-col>

                    <v-col cols="3">
                        Delivery date: {{deliveryDate.getDate()+'/'+deliveryDate.getMonth()+'/'+deliveryDate.getYear()}}
                    </v-col>

                    <v-col cols="3">
                        Status: {{status}}
                    </v-col>
                </v-row>
            </v-fade-transition>
        </v-expansion-panel-header>
        <v-expansion-panel-content color="59c8a5">
            <br>
            <p class="primary-color">Products</p>
            <OrderOverviewHistoryItemCoffee
            v-for="(coffee, index) in coffees"
            :key="`coffee-${index}`"
            :name="coffee.name"
            :groundLevel="coffee.groundLevel"
            :size="coffee.size"
            :quantity="coffee.quantity"
            />
            <v-divider></v-divider>
            <br>
            <v-row>
                <v-col cols="4">
                    <p class="primary-color">Delivery type</p> {{deliveryOption}}
                </v-col>

                <v-col cols="4">
                    <p class="primary-color">Delivery date </p>{{deliveryDate.getDate()+'/'+deliveryDate.getMonth()+'/'+deliveryDate.getYear()}}
                </v-col>

                <v-col cols="4">
                    <p class="primary-color">Status </p>{{status}}
                </v-col>
            </v-row>
            <br>
            <v-divider></v-divider>
            <br>
            <p class="inline primary-color">Additional info: </p>{{info}}
            <br><br>
            <v-divider></v-divider>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<style scoped>
.inline{
    display: inline;
}
.primary-color{
    color: #59c8a5;
}
</style>

<script>
import OrderOverviewHistoryItemCoffee from '@/components/OrderOverview/OrderOverviewHistoryItemCoffee'

export default {
    name: 'OrderOverviewHistoryItem',
    props: {
        orderDate:{
            type: Date
        },
        orderId: {
            type: Number
        },
        productionDate: {
            type: Date
        },
        deliveryDate: {
            type: Date
        },
        deliveryOption: {
            type: String
        },
        info: {
            type: String
        },
        coffees: {
            type: Array
        },
        status: {
            type: String
        }
    },
    components: {
        OrderOverviewHistoryItemCoffee
    }
}
</script>