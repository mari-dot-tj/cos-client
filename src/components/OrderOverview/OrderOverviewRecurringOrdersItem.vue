<template>
<v-dialog
    v-model="dialog"
    width="500"
    persistent>
    <template v-slot:activator="{ on }">
    <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }" style="background:#EEFAF6;">
            <v-fade-transition>
                <v-row v-if="open">
                    <v-col cols="3">
                        <p class="inline">Order date: </p>{{orderDate.getDate()+'/'+orderDate.getMonth()+'/'+orderDate.getFullYear()}}
                    </v-col>

                    <v-col cols="3">
                        <p class="inline">Order number: </p>{{orderId}}
                    </v-col>
                </v-row>
                
                <v-row v-else>
                    <v-col cols="3">
                        <p class="inline">Order date: </p>{{orderDate.getDate()+'/'+orderDate.getMonth()+'/'+orderDate.getFullYear()}}
                    </v-col>

                    <v-col cols="3">
                        <p class="inline">Order number: </p>{{orderId}}
                    </v-col>

                    <v-col cols="3">
                        Interval: {{interval}}
                    </v-col>

                    <v-col cols="3">
                        Delivery day: {{dayOfWeek}}
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
                    <p class="primary-color">Interval </p>{{interval}}
                </v-col>

                <v-col cols="4">
                    <p class="primary-color">Delivery day </p>{{dayOfWeek}}
                </v-col>
            </v-row>
            <br>
            <v-divider></v-divider>
            <br>
            <p class="inline primary-color">Additional info: </p>{{info == '' ? 'No additional info' : info}}
            <br><br>
            <v-divider></v-divider>
            <br>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="primary"
                v-on="on"
                @click="inactivateDialog=true">
                    <v-icon>mdi-close-circle</v-icon>
                    Inactivate
                </v-btn>
            </v-card-actions>
        </v-expansion-panel-content>
    </v-expansion-panel>
    </template>
    <v-card v-if="inactivateDialog">
        <v-card-title
          color="primary"
        >
          Inactivate order?
        </v-card-title>

        <v-card-text>
          Are you sure you want to inactivate this order?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            outlined
            color="primary"
            text
            @click="dialog = false"
          >
            No
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="dialog = false; inactivateDialog=false; inactivateOrder();"
          >
            Yes
          </v-btn>
        </v-card-actions>
    </v-card>
    <v-card v-if="inactivateFailedDialog">
        <v-card-title
          color="primary"
        >
          Request failed
        </v-card-title>

        <v-card-text>
          Could not inactivate the order. Try again later.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="dialog = false; inactivateFailedDialog=false"
          >
            OK
          </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<style scoped>
.inline{
    display: inline;
}
.primary-color{
    color: #59c8a5;
}

.orderInfo{
    padding-left: 3%;
    padding-right: 3%;
}
</style>

<script>
import OrderOverviewHistoryItemCoffee from '@/components/OrderOverview/OrderOverviewHistoryItemCoffee'
import orderService from "@/api/orders.api"

export default {
    name: 'OrderOverviewRecurringOrdersItem',
    data(){
        return{
            dialog: false,
            inactivateDialog: false,
            inactivateFailedDialog: false
        }
    },
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
        },
        dayOfWeek: {
            type: String
        },
        interval: {
            type: String
        }
    },
    methods: {
        inactivateOrder(){
            this.$store.dispatch('toggleLoader', true)
            orderService.inactivateOrderById(this.orderId)
            .then(response => {
                this.$store.dispatch('toggleLoader', false)
                if(typeof response != undefined && response.status == 200){
                    this.$emit('remove-order', this.orderId)
                }else{
                    this.inactivateFailedDialog=true
                    this.dialog=true
                }
            })
            .catch((error) => {
                this.inactivateFailedDialog=true
                this.dialog=true
                console.warn(error)
            })
        }
    },
    components: {
        OrderOverviewHistoryItemCoffee
    }
}
</script>