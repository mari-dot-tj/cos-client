<template>
    <v-dialog
    persistent
    v-model="dialog"
    width="600">
    <template v-slot:activator="{ on }">
        <v-container>
            <NavBar/>
            <v-card>
                <v-card-title id="profileHeading">
                    <h2>My profile</h2>
                </v-card-title>
                <v-form class="myProfileForm" ref="editForm">
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                v-model="name"
                                label="Organisation name"
                                prepend-icon="mdi-briefcase-account"
                                :rules="nameRules"
                                required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="orgNumber"
                                label="Organisation number"
                                prepend-icon="mdi-numeric"
                                :rules="orgNumberRules"
                                required>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            v-model="phone"
                            label="Phone number"
                            prepend-icon="mdi-phone"
                            :rules="phoneRules"
                            required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                            v-model="email"
                            label="Email address"
                            prepend-icon="mdi-at"
                            :rules="emailRules"
                            required>
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
                            required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                            v-model="zipCode"
                            label="Zip code"
                            prepend-icon="mdi-map-marker"
                            :rules="zipCodeRules"
                            required>
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
                            readonly>
                            {{province}}
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
                </v-form>
                <v-card grow>
                    <v-card-actions class="profileButtons">
                        <v-btn
                        color="primary"
                        v-on="on"
                        @click="updateCustomerIfValid()">
                        <v-icon left>mdi-content-save</v-icon>
                            Save
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                        color="primary"
                        v-on="on"
                        outlined
                        @click="changePasswordDialog=true">
                        <v-icon left>mdi-key</v-icon>
                            Change password
                        </v-btn>
                        <v-btn
                        color="primary"
                        @click="logoutAllDialog=true"
                        outlined
                        v-on="on">
                        <v-icon left>mdi-logout</v-icon>
                            Log out of all devices
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-card>
        </v-container>
    </template>
    <v-card v-if="changePasswordDialog">
        <v-card-title id="changePasswordHeading">
            <h2 class="mx-auto">Change password</h2>
        </v-card-title>
        <v-card-text>
            <v-form ref="passwordForm">
                <v-text-field 
                type="password"
                label="Old password"
                prepend-icon="mdi-lock"
                :rules="passwordRules"
                required
                v-model="oldPassword"/>
                <v-text-field 
                type="password"
                label="New password"
                prepend-icon="mdi-lock"
                :rules="passwordRules"
                required
                v-model="newPassword"/>
                <v-text-field 
                type="password"
                label="Repeat new password"
                prepend-icon="mdi-lock"
                :rules="passwordRules"
                required
                v-model="newPasswordRep"/>
                <v-btn
                color="primary"
                outlined
                class="mr-4"
                @click="changePasswordDialog=false; dialog=false">
                    Close
                </v-btn>
                <v-btn
                color="primary"
                class="mr-4"
                @click="updatePasswordIfValid();changePasswordDialog=false;">
                    Save
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
    <v-card v-if="logoutAllDialog">
        <v-card-title>Log out of all devices</v-card-title>
        <v-card-text>Are you sure you want to log out of all devices, including this one?</v-card-text>
        <v-card-actions class="cardButtons">
            <v-btn 
            outlined
            color="primary"
            class="mr-4"
            @click="logoutAllDialog=false; dialog=false">
                No
            </v-btn>
            <v-btn
            color="primary"
            class="mr-4"
            @click="logoutAll">
                Yes
            </v-btn>
        </v-card-actions>
    </v-card>
    <v-card v-if="changePasswordFeedbackDialog">
        <v-card-title>
            {{passwordChangeFeedbackTitle}}
        </v-card-title>
        <v-card-text>{{passwordChangeFeedbackMsg}}</v-card-text>
        <v-card-actions cardButtons>
            <v-btn
            right
            color="primary"
            @click="changePasswordFeedbackDialog=false; dialog=false">
                Ok
            </v-btn>
        </v-card-actions>
    </v-card>
    <v-card v-if="updateCustomerDialog">
        <v-card-title>
            {{updateCustomerFeedbackTitle}}
        </v-card-title>
        <v-card-text>{{updateCustomerFeedbackMsg}}</v-card-text>
        <v-card-actions cardButtons>
            <v-btn
            right
            color="primary"
            @click="updateCustomerDialog=false; dialog=false">
                Ok
            </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<style scoped>
.myProfileForm {
    padding-left: 8%;
    padding-right: 8%;
    color: #59c8a5;
}

#profileHeading {
    color: #59c8a5;
    padding-left: 8%;
    padding-top: 3%;
    margin-bottom: 1%;
    padding-bottom: 0;
}

#changePasswordHeading {
    color: #59c8a5;
}

.profileButtons {
    padding-left: 8%;
    padding-right: 8%;
    padding-top: 2%;
    padding-bottom: 2%;
}

.cardButtons {
    padding: 3%;
}
</style>

<script>
import NavBar from '../components/NavBar/NavBar.vue';
import { mapActions, mapGetters, mapState } from 'vuex'
import placeService from '@/api/place.api'
import customerService from '@/api/customer.api'

export default {
  name: 'MyProfile',
  components: {
    NavBar
  },
  data: () => ({
        editMode: false,
        name: '',
        address: '',
        phone: '',
        orgNumber: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        newPasswordRep: '',
        zipCode: '',
        province: '',
        subscription: '',
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
            v => !!v || 'Email address is required'
        ],
        provinceRules: [
            v => !!v || 'Province is required'
        ],
        zipCodeRules: [
            v => !!v || 'Zip code is required'
        ],
        passwordRules: [
            v => !!v || 'This field is required'
        ],
        passwordChangeFeedbackMsg: '',
        passwordChangeFeedbackTitle: '',
        dialog: false,
        formDialog: false,
        logoutAllDialog: false,
        changePasswordDialog: false,
        changePasswordFeedbackDialog: false,
        updateCustomerDialog: false,
        updateCustomerFeedbackMsg: '',
        updateCustomerFeedbackTitle: '',
    }),
    methods: {
        init(){
            this.name = this.user.name
            this.orgNumber = this.user.org_number
            this.address = this.user.address
            this.phone = this.user.phone
            this.email = this.user.email
            this.active = this.user.active
            this.zipCode = this.user.zip_code
            this.subscription = (this.user.subscription).toString()
            placeService.getProvinceByZip(this.zipCode)
            .then(response => {
                console.log(response)
                if(response!=undefined){
                    this.province=response[0].province
                }else this.province=''
            })
            .catch(error => {
                console.log(error)
            })
        },
        resetPasswordField(){
            this.oldPassword = '',
            this.newPassword = '',
            this.newPasswordRep = ''
        },
        updateCustomerIfValid(){
            if(this.$refs.editForm.validate()){
                this.$store.dispatch('toggleLoader', true)
                customerService.updateCustomer({name: this.name, address: this.address , phone: this.phone, org_number: this.orgNumber, email: this.email, zip_code: this.zipCode, subscription: this.subscription})
                .then(response => {
                    this.$store.dispatch('toggleLoader', false)
                    if(typeof response != 'undefined' && response.status == 200){
                        const newUserInfo = {name: this.name, address: this.address , phone: this.phone, org_number: this.orgNumber, email: this.email, zip_code: this.zipCode, subscription: this.subscription}
                        this.$store.dispatch('account/updateUser', newUserInfo)
                        this.updateCustomerFeedbackMsg = "Your account information was successfully updated"
                        this.updateCustomerFeedbackTitle = "Successfully updated!"
                        this.updateCustomerDialog = true
                    }else{
                        this.updateCustomerFeedbackMsg = "Unable to change profile information. Try again."
                        this.updateCustomerFeedbackTitle = "Error"
                        this.updateCustomerDialog = true
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }else{
                this.updateCustomerFeedbackMsg = "Make sure the fields are filled in correctly"
                this.updateCustomerFeedbackTitle = "Form not valid"
                this.updateCustomerDialog = true
            }
        },
        updatePasswordIfValid(){
            if(this.$refs.passwordForm.validate()){
                if(this.newPassword!==this.newPasswordRep){
                    this.passwordChangeFeedbackTitle = 'Error'
                    this.passwordChangeFeedbackMsg = 'New password repetiotion does not match. Try again.'
                    this.changePasswordFeedbackDialog=true
                }else{
                this.$store.dispatch('toggleLoader', true)
                customerService.updatePassword(this.oldPassword, this.newPassword)
                .then(response => {
                    this.$store.dispatch('toggleLoader', false)
                    if(typeof response != 'undefined' && response.status == 200){
                        this.passwordChangeFeedbackTitle = 'Success'
                        this.passwordChangeFeedbackMsg = 'Password successfully changed.'
                        this.changePasswordFeedbackDialog=true
                    }else{
                        this.passwordChangeFeedbackTitle = 'Error'
                        this.passwordChangeFeedbackMsg = 'Unable to change old password. Try again.'
                        this.changePasswordFeedbackDialog=true
                    }
                })
                .catch(error => {
                    console.log(error)
                })
                }
                this.resetPasswordField()
            }else{
                this.passwordChangeFeedbackTitle = 'Error'
                this.passwordChangeFeedbackMsg = 'Request not valid. Fill in required fields and try again.'
                this.changePasswordFeedbackDialog=true
                this.resetPasswordField()
            }
        },
        logoutAll(){
            this.$store.dispatch('toggleLoader', true)
            customerService.logoutAll()
            .then(response => {
                this.$store.dispatch('toggleLoader', false)
                console.log(response)
                if(response.status==200){
                    this.$router.push('/login')
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        checkIfChange(){
            if(this.user.customer_id != -1){
                if(
                this.name == this.user.name &&
                this.orgNumber == this.user.org_number &&
                this.address == this.user.address &&
                this.phone == this.user.phone &&
                this.email == this.user.email &&
                this.zipCode == this.user.zip_code &&
                this.subscription == this.user.subscription){
                return false
                }
                else return true
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
    },
    computed: {
        ...mapGetters('account', ['isLoggedIn']),
        ...mapState('account', ['user']),
        ...mapActions('account', ['updateUser'])
    },
    created(){
        if (!this.isLoggedIn) {
            this.$router.push('/login');
        }
    },
    beforeRouteLeave(to, from, next) {
        // if(to.fullPath=='/login'){
        //     next()
        // }else 
        if (this.checkIfChange()) {
            if (!window.confirm("You have some unsaved changes. Leave without saving?")) {
                return
            }
        }
        next()
    },
    mounted(){
        this.init()
    }
}
</script>