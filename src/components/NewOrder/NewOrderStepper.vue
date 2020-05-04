<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent>
    <template v-slot:activator="{ on }">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
              Choose Coffee
        </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">Order Overview</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Delivery</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card
              flat
              class="scroll"
              height="400px"
            >
            <NewOrderProductList/>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              flat
              class="scroll"
              height="400px"
            >
            <NewOrderOrderOverview/>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              flat
              class="scroll"
              height="400px"
            >
            <NewOrderDelivery/>
            </v-card>
          </v-stepper-content>
            <v-card
            grow>
            <v-card-actions class="justify-center stepperButton">
              <v-btn
              v-if="e1 == 2 || e1 == 3"
              color="primary"
              outlined
              left
              absolute
              @click="e1 <=1? e1=1 : e1-=1"
            >
            <v-icon left>mdi-arrow-left-bold</v-icon>
            <span>Previous</span>
            </v-btn>
            <v-btn
                outlined
                color="primary" 
                @click="dialog=true;cancelOrderDialog=true"
                >
                <v-icon left>mdi-close-circle</v-icon>
                Cancel
            </v-btn>
          <v-btn
              v-if="e1 == 1 || e1 == 2"
              color="primary"
              right
              absolute
              @click="e1 == 3 ? e1=1 : e1+=1"
            >
            <v-icon left>mdi-arrow-right-bold</v-icon>
              Next
            </v-btn>
            <v-btn
              v-if="e1 == 3"
              color="primary"
              right
              absolute
              v-on="on"
            >
            <v-icon left>mdi-send</v-icon>
              Submit order
            </v-btn>
            </v-card-actions>
            </v-card>
        </v-stepper-items>
      </v-stepper>
    </template>
    <v-card v-if="!cancelOrderDialog && !checkIfOrderEmpty() && !httpRequestSent && !notValidReccuringOrderDialog">
        <v-card-title
          color="primary"
        >
          Submit order
        </v-card-title>

        <v-card-text>
          {{submitDialogText}}
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
            @click="dialog = false; submitOrder()"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="!cancelOrderDialog && checkIfOrderEmpty() && !httpRequestSent">
        <v-card-title
          color="primary"
        >
          Cannot submit empty order
        </v-card-title>

        <v-card-text>
          {{emptyOrderDialogText}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="httpPostSuccess">
        <v-card-title
          color="primary"
        >
          Order successfully registered!
        </v-card-title>

        <v-card-text>
          {{orderSuccessDialogText}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            @click="finishOrder();httpPostSuccess=false; dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="httpPostFailed">
        <v-card-title
          color="primary"
        >
          Could not register order.
        </v-card-title>

        <v-card-text>
          {{orderFailDialogText}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            @click="dialog = false; httpPostFailed=false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="cancelOrderDialog">
        <v-card-title
          color="primary"
        >
          Cancel order?
        </v-card-title>

        <v-card-text>
          {{cancelOrderDialogText}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            outlined
            color="primary"
            text
            @click="dialog = false; cancelOrderDialog=false"
          >
            No
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="dialog = false; cancelOrderDialog=false; cancelOrder()"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="notValidReccuringOrderDialog">
        <v-card-title
          color="primary"
        >
          Could not register order.
        </v-card-title>

        <v-card-text>
          {{notValidReccuringOrderText}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            @click="dialog = false; notValidReccuringOrderDialog=false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
      <Loader/>
    </v-dialog>
</template>

<style scoped>
  .scroll {
    overflow: auto;
  }
  .stepperButton {
    padding-top: 15px;
    padding-bottom: 15px;
  }
</style>

<script>
import NewOrderProductList from './NewOrderProductList.vue'
import NewOrderOrderOverview from './NewOrderOrderOverview.vue'
import NewOrderDelivery from './NewOrderDelivery.vue'
import { mapState, mapActions } from 'vuex'
import Loader from '@/components/Loader'

  export default {
    data () {
      return {
        e1: 1,
        dialog: false,
        httpPostSuccess: false,
        httpRequestSent: false,
        httpPostFailed: false,
        cancelOrderDialog: false,
        notValidReccuringOrderDialog: false,
        submitDialogText: "Are you sure you want to submit the order?",
        emptyOrderDialogText: "You cannot submit an empty order. Add coffees to your order before you submit.",
        orderSuccessDialogText: "Your order was successfully registered!",
        orderFailDialogText: "Something went wrong. Cound not register order",
        cancelOrderDialogText: "Are you sure you want to cancel the order?",
        notValidReccuringOrderText: "You have to choose interval and delivery day before registering recurring order."
      }
    },
    methods: {
      submitOrder(){
        if(this.orderType == 'recurringOrder'){
          if(this.checkIfIntervalAndDayChosen()){
            this.httpRequestSent = true
            this.$store.dispatch('toggleLoader', true)
            this.$store.dispatch('order/postOrder')
            .then(response => {
              this.$store.dispatch('toggleLoader', false)
              if(typeof response != 'undefined'){
                if(response.status==200){
                this.httpPostSuccess=true
                }else{
                  this.httpPostFailed = true
                }
              }
            })
          }else{
            this.notValidReccuringOrderDialog = true
          }
        }else{
        this.httpRequestSent = true
        this.$store.dispatch('toggleLoader', true)
        this.$store.dispatch('order/postOrder')
        .then(response => {
          this.$store.dispatch('toggleLoader', false)
          if(typeof response != 'undefined'){
            if(response.status==200){
            this.httpPostSuccess=true
          }else{
            httpPostFailed = true
          }
          }
        })
        }
        this.dialog = true
      },
      checkIfOrderEmpty(){
        if(this.items.length == 0){
          return true
        }else{
          return false
        }
      },
      checkIfIntervalAndDayChosen(){
        if(this.interval == 0 || this.dayOfWeek == 0){
          return false
        }else return true
      },
      cancelOrder(){
        this.$store.dispatch('order/cancelOrder')
        this.$router.push('/order-overview')
      },
      finishOrder(){
        this.$store.dispatch('order/resetOrderType')
        this.$router.push('/order-overview')
      }
    },
    computed: {
      ...mapState('order', ['items']),
      ...mapState('order', ['interval']),
      ...mapState('order', ['dayOfWeek']),
      ...mapState('order', ['orderType'])
    },
    components: {
        NewOrderProductList,
        NewOrderOrderOverview,
        NewOrderDelivery,
        Loader
    },
  }
</script>
1