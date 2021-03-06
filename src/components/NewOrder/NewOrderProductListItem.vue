<template>
<v-skeleton-loader
      :loading="groundLevelDropdown == undefined || weightDropdown == undefined"
      transition="fade-transition"
      height="94"
      type="text"
    >
    <v-row>
        <v-col :cols="$vuetify.breakpoint.lgAndUp ? 4 : 3">
            <v-tooltip 
            right
            color="#ffffff">
                <template v-slot:activator="{ on }">
                    <v-icon
                    v-on="on"
                    color="primary">mdi-information-outline</v-icon>
                    <span>
                        {{coffeeName}}
                    </span>
                </template>
                <v-card width="250px">
                    <v-card-title id="description-title">Description</v-card-title>
                    <v-card-text>{{coffeeDescription}}</v-card-text>
                </v-card>
            </v-tooltip>
        </v-col>
        <v-col cols="2">
            <v-select
            ref="weightSelect"
            class="rowOnLine"
            :items="weightDropdown"
            :label="selectLabel"
            single-line
            :error-messages="weightError"
            v-on:change="weightError=''"
            v-model="weight"
            ></v-select>
        </v-col>
        <v-col cols="3">
            <v-select
            ref="groundLevelSelect"
            class="rowOnLine"
            :items="groundLevelDropdown"
            :label="selectLabel"
            single-line
            :error-messages="groundLevelError"
            v-on:change="groundLevelError=''"
            v-model="groundLevel"
            ></v-select>
        </v-col>
        <v-col cols="1">
            <v-text-field
            class="rowOnLine"
            ref="amountField"
            type="number"
            min=0
            v-model="amount"
            :error-messages="amountError"
            v-on:change="amountError=''"
            ></v-text-field>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.lgAndUp ? 2 : 3">
            <v-btn 
            outlined color="primary" 
            class="rowOnLine"
            right
            absolute
            @click="checkIfValid() ? $emit('add-to-order', coffeeId, coffeeName, weight, groundLevel, parseInt(amount)) & resetFields() : valid=false">
                Add to order
            </v-btn>
        </v-col>
    </v-row>
</v-skeleton-loader>
</template>

<style scoped>
.rowOnLine {
    margin-top: 0px;
    padding-top: 0px;
}
.withOutSidePadding {
    padding-left: 0px;
    padding-right: 0px;
}

#description-title {
    color: #59c8a5;
}
</style>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import bagService from '@/api/bags.api'
import groundLevelService from '@/api/groundLevels.api'

export default {
    name: 'NewOrderProductListItem',
    props: {
        coffeeName: {
            type: String,
            required: true
        },
        coffeeId: {
            type: Number,
            required: true
        },
        coffeeDescription: {
            type: String
        },
        weightDropdown: {
            type: Array
        },
        groundLevelDropdown: {
            type: Array
        }
    },
    data: function (){
        return{
            valid: true,
            weight: '',
            grams: 0,
            groundLevel: '',
            amount: 0,
            selectLabel: '--Select option--',
            weightError: '',
            groundLevelError: '',
            amountError: ''
        }
    },
    methods: {
        /* resets all fields and error messeges */
        resetFields(){
            this.$refs.weightSelect.reset()
            this.$refs.groundLevelSelect.reset()
            this.amount = 0
            this.weight = ''
            this.groundLevel = ''
            this.$refs.amountField.resetValidation()
            this.amountError=''
            this.weightError=''
            this.groundLevelError=''
        },
        /* return true if amount, weight and ground level are valid. if not -> sets error messenges */
        checkIfValid(){
            if(this.amount>0 && this.weight!='' && this.groundLevel!=''){
                return true
            }else{
                if(this.weight==''){
                    this.weightError="Select weight berfore adding to order."
                }
                if(this.groundLevel==''){
                    this.groundLevelError="Select ground level berfore adding to order."
                }
                if(this.amount==0){
                    this.amountError="Amount must be over 0."
                }
                return false
            }
        },
    }
}
</script>