<template>
    <v-dialog
    v-model="dialog"
    width="500">
    <template v-slot:activator="{ on }">
        <v-container>
            <v-card>
                <v-form class="registerForm" ref="form">
                    <h2>Register new user</h2>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            v-model="name"
                            label="Organisation name"
                            prepend-icon="mdi-briefcase-account"
                            :rules="nameRules"
                            required
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                            type="number"
                            v-model="orgNumber"
                            label="Organisation number"
                            prepend-icon="mdi-numeric"
                            :rules="orgNumberRules"
                            required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            v-model="phone"
                            label="Phone number"
                            type="number"
                            prepend-icon="mdi-phone"
                            :rules="phoneRules"
                            required
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                            v-model="email"
                            label="Email address"
                            prepend-icon="mdi-at"
                            :rules="emailRules"
                            required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            v-model="address"
                            label="Address"
                            prepend-icon="mdi-home-city"
                            :rules="addressRules"
                            required
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                            v-model="zipCode"
                            label="Zip code"
                            prepend-icon="mdi-map-marker"
                            :rules="zipCodeRules"
                            type="number"
                            required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            label="Province"
                            prepend-icon="mdi-city"
                            v-model="province"
                            :rules="provinceRules"
                            readonly
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-checkbox
                        v-model="subscription"
                        false-value='0'
                        true-value='1'
                        label="We would like to receice weekly emails with news and updates">
                        </v-checkbox>
                    </v-row>
                    <v-btn
                    outlined=""
                    color="primary"
                    to="/login"
                    class="mr-4">
                        Back to login
                    </v-btn>
                    <v-btn
                    color="primary"
                    v-on="on"
                    @click="registerIfValid"
                    class="mr-4">
                        Register
                    </v-btn>
                </v-form>
            </v-card>
        </v-container>
    </template>
    <v-card v-if="failedPostDialog">
        <v-card-title
          color="primary"
        >
          Could not register
        </v-card-title>

        <v-card-text>
          Something went wrong. Please contakt Jacobsen and Svart to register.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            @click="dialog = false; failedPostDialog=false"
          >
            OK
          </v-btn>
    </v-card-actions>
      </v-card>
      <v-card v-if="successFulPostDialog">
        <v-card-title
          color="primary"
        >
          Success! Check email for temporary password.
        </v-card-title>

        <v-card-text>
          You will very soon receive an email with your username and password.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            @click="dialog = false; successFulPostDialog=false; $router.push('/login')">
            Go to login page
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="notValidFormDialog">
        <v-card-title
          color="primary"
        >
          Registration not valid
        </v-card-title>

        <v-card-text>
          Check if you have filled out all the required fields and try again.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            @click="dialog = false; notValidFormDialog=false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<style scoped>
.registerForm{
    padding: 8%;
    color: #59c8a5;
}
.province{
    color: black;
    padding-bottom: 0;
    margin-bottom: 0;
    align-self: baseline;
}
</style>

<script>
import { mapActions } from 'vuex'
import customerService from '@/api/customer.api'
import placeService from '@/api/place.api'

export default {
    name: 'Register',
    data: () => ({
        name: '',
        address: '',
        phone: '',
        orgNumber: '',
        email: '',
        zipCode: '',
        province: '',
        subscription: '1',
        nameRules: [
            v => !!v || 'Organisation name is required'
        ],
        addressRules: [
            v => !!v || 'Address is required'
        ],
        phoneRules: [
            v => !!v || 'Phone number is required'
        ],
        orgNumberRules: [
            v => !!v || 'Organisation number is required',
            v => v.toString().length==9 || 'Organisation number must be 9 digits'
        ],
        emailRules: [
            v => !!v || 'Email address is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        provinceRules: [
            v => !!v || 'Province is required'
        ],
        zipCodeRules: [
            v => !!v || 'Zip code is required'
        ],
        failedPostDialog: false,
        successFulPostDialog: false,
        notValidFormDialog: false,
        dialog: false,
    }),
    methods: {
        ...mapActions('account', ['getProvinceByZip', 'register']),
        registerIfValid(){
            if(this.$refs.form.validate()){
                customerService.register({name: this.name, address: this.address , phone: this.phone, org_number: this.orgNumber, email: this.email, zip_code: this.zipCode, subscription: this.subscription})
                .then(response => {
                    if(response == 201 || response == 200){
                        this.failedPostDialog = false
                        this.successFulPostDialog = true
                    }else{
                        this.failedPostDialog=true
                        this.successFulPostDialog=false
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }else{
                this.notValidFormDialog=true
            }
        }
    },
    watch: {
        zipCode: function(newVal, oldVal){
            if(newVal.length==0){
                this.province=''
            }else if(newVal.length>=4){
                placeService.getProvinceByZip(newVal)
                .then(response => {
                    console.log(response)
                    if(response!=undefined){
                        this.province=response[0].province
                    }else this.province=''
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
}
</script>