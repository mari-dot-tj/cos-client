<template>
    <v-container>
        <NewOrderProductFields/>
        <NewOrderProductListItem
        v-for="coffee in coffees"
        v-on:add-to-order="addToOrder"
        :key="coffee.coffee_id"
        :coffeeId="coffee.coffee_id"
        :coffeeName="coffee.name"
        :coffeeDescription="coffee.description"
        :weightDropdown="weightDropdown"
        :groundLevelDropdown="groundLevelDropdown"/>
        <v-snackbar 
        v-model="addedToOrderSnackBar"
        :timeout=4000>
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
import bagService from '@/api/bags.api'
import groundLevelService from '@/api/groundLevels.api'

export default {
    name: 'NewOrderProductList',
    computed: {
        ...mapState('order', ['itemId'])
    },
    data: () => ({
        itemIdCopy: 0,
        addedToOrderSnackBar: false,
        addedToOrderSnackBarText: "",
        coffees: [],
        bags: [],
        allGroundLevels: [],
        weightDropdown: [],
        groundLevelDropdown: [],
    }),
    methods: {
        /* gets coffee, bags and groundlevels from server and and sets local variables */
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

            bagService.getCustomerBags()
            .then(bags => {
                    if(typeof bags != 'undefined'){
                        this.bags = bags
                        //pushes only size in bag object to weight dropdown
                        this.bags.map(bagObj => {
                        this.weightDropdown.push(bagObj.size)
                    })
                }
            })
            .catch((error) => {
                console.warn(error)
            })

            groundLevelService.getAllGroundLevels()
            .then(groundLevels => {
                    if(typeof groundLevels != 'undefined'){
                        this.allGroundLevels = groundLevels
                        //pushes only level name in ground level object to ground level dropdown
                        this.allGroundLevels.map(groundLevelObj => {
                        this.groundLevelDropdown.push(groundLevelObj.level_name)
                    })
                }
            })
            .catch((error) => {
                console.warn(error)
            })

            //sets local iten id to state item id
            this.itemIdCopy = this.itemId
        },
        /* finds grams, bag id, ground level id of selected options and adds to state order */
        addToOrder: function(coffeeId, coffeeName, weight, groundLevel, amount){
            let text = "Failed to add to order."

            const grams = this.getGramsOfWeight(weight)
            const bag_id = this.findBagIdByWeight(weight)
            const ground_level_id = this.findGroundLevelIdbyGroundLevel(groundLevel)

            if(this.$store.dispatch('order/addProductToOrder', {item_id: this.itemIdCopy, coffee_id: coffeeId, coffee_name: coffeeName, weight, grams, bag_id, ground_level: groundLevel, ground_level_id, amount})){
                text = "Added " + coffeeName + " to order!"
            }else{
                text = "Failed to add to order"
            }
            this.addedToOrderSnackBarText = text
            this.addedToOrderSnackBar=true

            this.$store.dispatch('order/incrementItemId')
            this.itemIdCopy = this.itemId
        },
        /* finds grams of selected weight */
        getGramsOfWeight(weight){
            const index = this.bags.map(bagObj => {
                return bagObj.size
            }).indexOf(weight)
            return this.bags[index].grams
        },
        /* finds bag id of selected weight */
        findBagIdByWeight(weight){
            const index = this.bags.map(bagObj => {
                return bagObj.size
            }).indexOf(weight)
            return this.bags[index].bag_id
        },
        /* finds ground level id of selected ground level */
        findGroundLevelIdbyGroundLevel(groundLevel){
            const index = this.allGroundLevels.map(groundLevelObj => {
                return groundLevelObj.level_name
            }).indexOf(groundLevel)
            return this.allGroundLevels[index].ground_level_id
        }
    },
    mounted() {
        this.init()
    },
    components: {
        NewOrderProductFields,
        NewOrderProductListItem
    }
}
</script>