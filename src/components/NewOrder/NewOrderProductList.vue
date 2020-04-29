<template>
    <v-container>
        <NewOrderProductFields/>
        <NewOrderProductListItem
        v-for="coffee in coffees"
        v-on:add-to-order="addToOrder"
        :key="coffee.coffee_id"
        :coffeeId="coffee.coffee_id"
        :coffeeName="coffee.name"
        />
        <v-snackbar v-model="addedToOrderSnackBar">
            {{ addedToOrderSnackBarText }}
            <v-btn
                color="primary"
                text
                @click="addedToOrderSnackBar = false"
            >
        Close
      </v-btn>
        </v-snackbar>
    </v-container>
</template>

<style scoped>
.rowOnLine {
    margin-top: 0px;
    padding-top: 0px;
}
</style>

<script>
import { mapState } from 'vuex'
import NewOrderProductListItem from './NewOrderProductListItem.vue'
import NewOrderProductFields from './NewOrderProductFields.vue'
import coffeeService from '@/api/coffees.api'

export default {
    name: 'NewOrderProductList',
    computed: {
        ...mapState('order', ['itemId'])
    },
    data: () => ({
        itemIdCopy: 0,
        addedToOrderSnackBar: false,
        addedToOrderSnackBarText: "",
        coffees: []
    }),
    methods: {
        init(){
            coffeeService.getCustomerCoffees()
            .then(coffees => {
                if(typeof coffees != 'undefined'){
                    this.coffees = coffees
                }
            })
            .catch((error) => {
                console.warn(error)
            })
            this.itemIdCopy = this.itemId
        },
        addToOrder: function(coffeeId, coffeeName, weight, grams, bagId, groundLevel, groundLevelId, amount){
            let text = "Failed to add to order."
            if(this.$store.dispatch('order/addProductToOrder', {item_id: this.itemIdCopy, coffee_id: coffeeId, coffee_name: coffeeName, weight, grams, bag_id: bagId, ground_level: groundLevel, ground_level_id: groundLevelId, amount})){
                text = "Added to order! Name: " + coffeeName + " , weight "+ weight + " , ground level: "+ groundLevel + ", amount: " + amount
            }else{
                text = "Failed to add to order"
            }
            this.addedToOrderSnackBarText = text
            this.addedToOrderSnackBar=true

            this.$store.dispatch('order/incrementItemId')
            this.itemIdCopy = this.itemId
        }
    },
    mounted() {
        this.init();
    },
    components: {
        NewOrderProductFields,
        NewOrderProductListItem
    }
}
</script>