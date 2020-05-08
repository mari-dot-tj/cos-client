<template>
    <v-container class="padding-right">
        <v-row>
            <v-col :cols="orderType=='recurringOrder' ? 6 : 12">
                <h4 class="heading">Delivery</h4>
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
                <br>
            </v-col>
            <v-col cols="6" v-if="orderType=='recurringOrder'">
                <v-tooltip 
                top
                color="#ffffff">
                    <template v-slot:activator="{ on }">
                        <h4 class="heading">Interval
                            <v-icon
                            v-on="on"
                            color="primary">mdi-information-outline</v-icon>
                        </h4>
                    </template>
                    <v-card width="250px">
                        <v-card-text>The interval between coffee deliveries</v-card-text>
                    </v-card>
                </v-tooltip>
                <v-select
                ref="intervalSelect"
                color="primary"
                :items="intervalOptions"
                label="--Select interval--"
                single-line
                v-model="interval"
                :rules="intervalRules"
                v-on:change="resetIntervalValidation()"
                ></v-select>
                <v-tooltip 
                top
                color="#ffffff">
                    <template v-slot:activator="{ on }">
                        <h4 class="heading">Delivery day
                            <v-icon
                            v-on="on"
                            color="primary">mdi-information-outline</v-icon>
                        </h4>
                    </template>
                    <v-card width="250px">
                        <v-card-text>The day of week you would like to receive your coffee based on the interval you select.</v-card-text>
                    </v-card>
                </v-tooltip>
                <v-select
                ref="dayOfWeekSelect"
                color="primary"
                :items="dayOfWeekOptions"
                label="--Select day of week--"
                single-line
                v-model="dayOfWeek"
                :rules="dayOfWeekRules"
                v-on:change="resetDayOfWeekValidation()"
                ></v-select>
            </v-col>
        </v-row>
            <h4 class="heading">
                Additional info?<small>(Optional. Maks 200 characters.)</small>
            </h4>
            <v-textarea outlined counter="200" @paste="onPaste" @keydown="onKeyDown" v-model="info" :rules="infoRules" height="100px" color="primary">{{info}}</v-textarea>
        
    </v-container>
</template>

<style scoped>
.heading{
    color: #59c8a5;
}

.padding-right {
    padding-right: 5%;
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
        chosenDeliveryOption: 1,
        dayOfWeekOptions: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
        ],
        intervalOptions: [
            'Every week',
            'Every other week',
            'Every third week',
            'Every month'
        ],
        dayOfWeek: 0,
        interval: 0,
        info: '',
        infoMaxChar: 200,
        intervalRules: [
            v => (v == 'Every week' || v =='Every other week' || v =='Every third week' || v == 'Every month') || 'Select an interval'
        ],
        dayOfWeekRules: [
            v => (v == 'Monday' || v == 'Tuesday' || v=='Wednesday' || v=='Thursday' || v=='Friday') || 'Select a delivery day'
        ],
        infoRules: [
            v => v.length <= 200 || 'Description must be 200 characters or less'
        ]
    }),
    computed: {
        ...mapGetters('order', ['totalWeightGrams']),
        ...mapState('order', ['orderType'])
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
        resetIntervalValidation(){
            this.$refs.intervalSelect.resetValidation()
        },
        resetDayOfWeekValidation(){
            this.$refs.dayOfWeekSelect.resetValidation()
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
        },
        onKeyDown(evt){
            if (this.info.length >= this.infoMaxChar) {
                if (evt.keyCode == 32 || evt.keyCode >= 186 || evt.keyCode >= 48 && evt.keyCode <= 90) {
                    evt.preventDefault()
                    return
                }
            }
        },
        onPaste(evt){
            evt.preventDefault()
            this.info = evt.clipboardData.getData('text/plain').slice(0, this.infoMaxChar)
        }
    },
    watch: {
        chosenDeliveryOption: function(newValue){
            this.$store.dispatch('order/chooseDelivery', newValue)
        },
        interval: function(newValue){
            const newInterval = this.intervalOptions.indexOf(newValue)+1
            this.$store.dispatch('order/changeInterval', newInterval)
        },
        dayOfWeek: function(newValue){
            const newWeekDay = this.dayOfWeekOptions.indexOf(newValue)+1
            this.$store.dispatch('order/changeDayOfWeek', newWeekDay)
        },
        info: function(newValue){
            this.$store.dispatch('order/changeInfo', newValue)
        }
    },
    beforeMount(){
        this.init()
    }
}
</script>