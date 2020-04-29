<template>
    <v-container>
        <h3 class="heading">Choose Delivery</h3>
        <v-radio-group
        v-model="chosenDeliveryOption"
        required>
            <v-radio 
            v-for="deliveryOption in deliveryOptions"
            :label="deliveryOption.delivery_option"
            :key="deliveryOption.delivery_id"
            :value="deliveryOption.delivery_id"
            ></v-radio>
        </v-radio-group>
        <div v-if="chosenDeliveryOption==1">Delivery price: {{findDeliveryPrice()}} kr</div>
        <div v-else-if="chosenDeliveryOption==2">Delivery price: {{pickUpPrice}} kr</div>
        <div v-else-if="chosenDeliveryOption==3">Delivery price: {{homeDeliveryPrice}} kr</div>
        <div v-else>Contact Jacobsen og Svart for delivery price.</div>
    </v-container>
</template>

<style scoped>
.heading{
    color: #59c8a5;
}
</style>

<script>
import { mapState, mapGetters } from 'vuex'
import deliveryService from '@/api/delivery.api'

export default {
    name: 'NewOrderDelivery',
    data: () => ({
        deliveryOptions: [],
        postDeliveryPrice: 0,
        homeDeliveryPrice: 100,
        pickUpPrice: 0,
        postUpTo2kgPrice: 49,
        postUpTo10kgPrice: 149,
        postUpTo25kgPrice: 269,
        postUpTo35kgPrice: 389,
        chosenDeliveryOption: 1
    }),
    computed: {
        ...mapGetters('order', ['totalWeightGrams'])
    },
    methods: {
        init(){
            deliveryService.getAllDeliveryOptions()
            .then(deliveryOptions => {
                if(typeof deliveryOptions != 'undefined'){
                    this.deliveryOptions = deliveryOptions
                }
            })
            .catch((error) => {
                console.warn(error)
            })
        },
        setDeliveyOptions(){
            this.allDeliveryOptions.map(deliveyOption => {
                this.deliveyOptions.push(deliveyOption.delivery_option)
            })
        },
        findDeliveryPrice(){
            if(this.totalWeightGrams.totalWeightGrams <= 2000){
                this.postDeliveryPrice = this.postUpTo2kgPrice
            }else if(this.totalWeightGrams.totalWeightGrams <= 10000){
                this.postDeliveryPrice = this.postUpTo10kgPrice
            }else if(this.totalWeightGrams.totalWeightGrams <= 25000){
                this.postDeliveryPrice = this.postUpTo25kgPrice
            }else if(this.totalWeightGrams.totalWeightGrams <= 35000){
                this.postDeliveryPrice = this.postUpTo35kgPrice
            }else this.postDeliveryPrice = "The package is too heavy for post."
            return this.postDeliveryPrice
        }
    },
    watch: {
        chosenDeliveryOption: function(newValue, oldValue){
            this.$store.dispatch('order/chooseDelivery', newValue)
        }
    },
    beforeMount(){
        this.init()
    }
}
</script>