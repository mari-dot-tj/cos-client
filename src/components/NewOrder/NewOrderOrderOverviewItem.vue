<template>
<v-container>
    <v-row>
        <v-col cols="2" class="rowOnLine amount">
            <v-text-field
            class="rowOnLine"
            ref="amountField"
            type="number"
            min=1
            v-model="newAmount"
            v-on:change="changeAmount()"
            ></v-text-field>
        </v-col>
        <v-col cols="2">
            <span class="rowOnLine">
                {{weight}}
            </span>
        </v-col>
        <v-col cols="2">
            <span class="rowOnLine">
                {{coffeeName}}
            </span>
        </v-col>
        <v-col cols="2">
            <span class="rowOnLine">
                {{groundLevel}}
            </span>
        </v-col>
        <v-col cols="4">
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn 
                    class="rowOnLine"
                    absolute
                    right
                    outlined color="primary"
                    v-on="on"
                    @click="removeFromOrder(itemId) & $emit('removed-from-order')">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
                <span>Remove item</span>
            </v-tooltip>
        </v-col>
    </v-row>
    <v-divider></v-divider>
    </v-container>
</template>

<style scoped>
.rowOnLine {
    margin-top: 0px;
    padding-top: 0px;
}

.amount {
    margin-top: 7px;
}
</style>

<script>
export default {
    name: 'NewOrderOrderOverviewItem',
    props: {
        itemId: {
            type: Number,
            required: true
        },
        coffeeId:{
            type: Number,
            required: true
        },
        coffeeName: {
            type: String,
            required: true
        },
        weight: {
            type: String,
            required: true,
        },
        groundLevel: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        },
    },
    data: function () {
        return{
            newAmount: this.amount,
            amountFieldRules: [
                v => v>0 || 'Amount must be over 0!'
            ]
        }
    },
    methods: {
        changeAmount(){
            this.$store.dispatch('order/changeItemAmount', {item_id: this.itemId, newAmount: parseInt(this.newAmount)});
        },
        removeFromOrder: function(itemId){
            this.$store.dispatch('order/removeProductFromOrder', itemId)
        },
        checkIfValid(){
            if((this.$refs.amountField).validate()){
                return true
            }else return false
        }
    }
}
</script>