<template>
    <v-card flat>
            <v-card v-if="orderEmpty" flat>
            <v-card-text>Order history is empty.</v-card-text>
            </v-card>
            <v-skeleton-loader
            :loading="orders.length==0 && !orderEmpty"
            transition="fade-transition"
            height="94"
            type="list-item"
            >
            <v-expansion-panels>
                <OrderOverviewHistoryItem
                v-for="order in orders"
                :key="order.orderId"
                :orderId="order.orderId"
                :orderDate="order.orderDate"
                :productionDate="order.productionDate"
                :deliveryDate="order.deliveryDate"
                :deliveryOption="order.deliveryOption"
                :info="order.info"
                :status="order.status"
                :coffees="order.coffees"
                />
            </v-expansion-panels>
            </v-skeleton-loader>
        </v-card>
</template>

<script>
import orderService from "@/api/orders.api"
import OrderOverviewHistoryItem from '@/components/OrderOverview/OrderOverviewHistoryItem'

export default {
    name: 'OrderOverviewHistory',
    data(){
        return{
            orders: [],
            orderEmpty: false
        }
    },
    components: {
        OrderOverviewHistoryItem
    },
    methods: {
        init(){
            orderService.getOrders()
            .then((response) => {
                if(typeof response != 'undefined'){
                    response.data.map(coffeeOrderObj => {
                        /* Adds order to orders if orderId does not exist in orders */
                        if( this.orders.length==0 || (this.orders.find(order => order.orderId == coffeeOrderObj.order_id)) == undefined ){
                                const orderDate = new Date(coffeeOrderObj.order_date)
                                const formattedOrderDate = orderDate.getDate()+'/'+(orderDate.getMonth()+1)+'/'+orderDate.getFullYear()

                                const productionDate = new Date(coffeeOrderObj.production_date)
                                const formattedProductionDate = productionDate.getDate()+'/'+(productionDate.getMonth()+1)+'/'+productionDate.getFullYear()
                                
                                const deliveryDate = new Date(coffeeOrderObj.delivery_date)
                                const formattedDeliveryDate = deliveryDate.getDate()+'/'+(deliveryDate.getMonth()+1)+'/'+deliveryDate.getFullYear()

                                this.orders.push({
                                orderId: coffeeOrderObj.order_id,
                                orderDate: formattedOrderDate,
                                productionDate: formattedProductionDate, 
                                deliveryDate: formattedDeliveryDate,
                                deliveryOption: coffeeOrderObj.delivery_option,
                                info: coffeeOrderObj.info,
                                status: coffeeOrderObj.status_name,
                                coffees: []
                                })
                        }
                    })
                    /* Adds coffees to list order object in orders if orderId matches*/
                    for(let i=0; i<this.orders.length; i++){
                        response.data.map(coffee => {
                            if(coffee.order_id == this.orders[i].orderId){
                                this.orders[i].coffees.push({name: coffee.name, 
                                                groundLevel: coffee.level_name, 
                                                size: coffee.size, 
                                                quantity: coffee.quantity
                                                })
                            }
                        })
                    }

                    /* Sorts orders by date - newest first */
                    this.orders.sort(function compare(a, b) {
                        var dateA = new Date(a.orderDate);
                        var dateB = new Date(b.orderDate);
                        return dateB - dateA;
                    })

                    /* Sets boolean for v-card v-if orderEmpty if the no orders are received */
                    if(this.orders.length==0){
                        this.orderEmpty = true
                    }

                    console.log('ordreliste: ',this.orders)
                }else{
                    this.orderEmpty = true
                }
            })
            .catch((error) => {
                console.warn(error)
            })
        },
    },
    mounted(){
        this.init()
    }
}
</script>