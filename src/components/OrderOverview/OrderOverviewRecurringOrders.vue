<template>
    <v-card flat>
            <v-card v-if="recurringOrdersEmpty" flat>
            <v-card-text>No recurring orders found.</v-card-text>
            </v-card>
            <v-skeleton-loader
            :loading="recurringOrders.length==0 && !recurringOrdersEmpty"
            transition="fade-transition"
            height="94"
            type="list-item"
            >
            <v-expansion-panels>
                <v-card width="100%" tile>
                <v-card-text v-if="!recurringOrdersEmpty">
                    <div class="primary-color inline">You have {{recurringOrders.length}} active recurring order<div class="inline" v-if="recurringOrders.length>1">s</div>.</div>
                </v-card-text>
                </v-card>
                <OrderOverviewRecurringOrdersItem
                v-for="order in recurringOrders"
                v-on:remove-order="removeOrder"
                :key="order.orderId"
                :orderId="order.orderId"
                :orderDate="order.orderDate"
                :productionDate="order.productionDate"
                :deliveryDate="order.deliveryDate"
                :deliveryOption="order.deliveryOption"
                :info="order.info"
                :status="order.status"
                :coffees="order.coffees"
                :dayOfWeek="order.dayOfWeek"
                :interval="order.interval"
                />
            </v-expansion-panels>
            </v-skeleton-loader>
        </v-card>
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
import orderService from "@/api/orders.api"
import OrderOverviewRecurringOrdersItem from '@/components/OrderOverview/OrderOverviewRecurringOrdersItem'

export default {
    name: 'OrderOverviewRecurringOrders',
    data(){
        return{
            recurringOrders: [],
            recurringOrdersEmpty: false,
        }
    },
    components:{
        OrderOverviewRecurringOrdersItem
    },
    methods:{
        init(){
            orderService.getActiveRecurringOrders()
            .then((response) => {
            if(typeof response != 'undefined'){
                    response.data.map(coffeeOrderObj => {
                        /* Adds order to recurringOrders if orderId does not exist in recurringOrders */
                        if( this.recurringOrders.length==0 || (this.recurringOrders.find(order => order.orderId == coffeeOrderObj.order_id)) == undefined ){
                                this.recurringOrders.push({
                                orderId: coffeeOrderObj.order_id,
                                orderDate: new Date(coffeeOrderObj.order_date),
                                productionDate: new Date(coffeeOrderObj.production_date), 
                                deliveryDate: new Date(coffeeOrderObj.delivery_date),
                                deliveryOption: coffeeOrderObj.delivery_option,
                                info: coffeeOrderObj.info,
                                status: coffeeOrderObj.status_name,
                                interval: this.findInterval(coffeeOrderObj.order_interval),
                                dayOfWeek: this.findDayOfWeek(coffeeOrderObj.day_of_week),
                                coffees: []
                                })
                        }
                    })
                    /* Adds coffees to list order object in recurringOrders if orderId matches*/
                    for(let i=0; i<this.recurringOrders.length; i++){
                        response.data.map(coffee => {
                            if(coffee.order_id == this.recurringOrders[i].orderId){
                                this.recurringOrders[i].coffees.push({name: coffee.name, 
                                                groundLevel: coffee.level_name, 
                                                size: coffee.size, 
                                                quantity: coffee.quantity
                                                })
                            }
                        })
                    }

                    /* Sorts recurringOrders by date - newest first */
                    this.recurringOrders.sort(function compare(a, b) {
                        var dateA = new Date(a.orderDate);
                        var dateB = new Date(b.orderDate);
                        return dateB - dateA;
                    })

                    /* Sets boolean for v-card v-if recurringOrdersEmpty if the no recurringOrders are received */
                    if(this.recurringOrders.length==0){
                        this.recurringOrdersEmpty = true
                    }

                    console.log('faste ordre: ',this.recurringOrders)
                }else{
                    this.recurringOrdersEmpty = true
                }
            })
            .catch((error) => {
                console.warn(error)
            })
        },
        findDayOfWeek(number){
            if(number==1){
                return 'Monday'
            }else if(number==2){
                return 'Tuesday'
            }else if(number==3){
                return 'Wednesday'
            }else if(number==4){
                return 'Thursday'
            }else if(number==5){
                return 'Friday'
            }else return 'Invalid'
        },
        findInterval(number){
            if(number==1){
                return 'Every week'
            }else if(number==2){
                return 'Every other week'
            }else if(number==3){
                return 'Every third week'
            }else if(number==4){
                return 'Every month'
            }else return 'Invalid'
        },
        removeOrder(orderId){
            this.recurringOrders.splice(this.recurringOrders.find(({orderId}) => orderId == orderId),1)
            if(this.recurringOrders.length==0){
                this.recurringOrdersEmpty=true
            }
        }
    },
    mounted(){
        this.init()
    }
}
</script>