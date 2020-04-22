<template>
    <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
            <v-fade-transition>
                <v-row v-if="open">
                    <v-col cols="3">
                        Order date: {{orderDate.getDate()+'/'+orderDate.getMonth()+'/'+orderDate.getYear()}}
                    </v-col>

                    <v-col cols="3">
                        Order number: {{orderId}}
                    </v-col>
                </v-row>
            
                <v-row v-else>
                    <v-col cols="3">
                        Order date: {{orderDate.getDate()+'/'+orderDate.getMonth()+'/'+orderDate.getYear()}}
                    </v-col>

                    <v-col cols="3">
                        Order number: {{orderId}}
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
        <v-expansion-panel-content>
            <br>
            <p>Products:</p>
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
                    Delivery type: {{deliveryOption}}
                </v-col>

                <v-col cols="4">
                    Delivery date: {{deliveryDate.getDate()+'/'+deliveryDate.getMonth()+'/'+deliveryDate.getYear()}}
                </v-col>

                <v-col cols="4">
                    Status: {{status}}
                </v-col>
            </v-row>
            <br>
            <v-divider></v-divider>
            <br>
            Additional info: {{info}}
            <br><br>
            <v-divider></v-divider>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

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