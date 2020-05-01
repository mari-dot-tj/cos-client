<template>
    <v-dialog
    persistent
    v-model="dialog"
    width="800">
    <template v-slot:activator="{ on }">
        <v-container>
            <NavBar/>
            <v-card>
                <v-card-text>
                    <v-form class="myProfileForm">
                        <h2 class="mx-auto" color="primary">My profile</h2>
                        <br>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="user.name"
                                    label="Organisation name"
                                    prepend-icon="mdi-briefcase-account"
                                    :rules="nameRules"
                                    disabled>
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="user.org_number"
                                    label="Organisation number"
                                    prepend-icon="mdi-numeric"
                                    :rules="orgNumberRules"
                                    disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                v-model="user.phone"
                                label="Phone number"
                                prepend-icon="mdi-phone"
                                :rules="phoneRules"
                                disabled>
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                v-model="user.email"
                                label="Email address"
                                prepend-icon="mdi-at"
                                :rules="emailRules"
                                disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                v-model="user.address"
                                label="Address"
                                prepend-icon="mdi-home-city"
                                :rules="addressRules"
                                disabled>
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                v-model="user.zip_code"
                                label="Zip code"
                                prepend-icon="mdi-map-marker"
                                :rules="zipCodeRules"
                                disabled>
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
                                disabled>
                                {{province}}
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-checkbox
                            v-model="subscription"
                            false-value='0'
                            true-value='1'
                            label="We would like to receice weekly emails with news and updates"
                            disabled>
                            </v-checkbox>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-btn
                                color="primary"
                                class="registerBtn"
                                v-on="on"
                                @click="formDialog=true">
                                    Edit information
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn
                                color="primary"
                                class="registerBtn"
                                v-on="on"
                                @click="changePasswordDialog=true">
                                    Change password
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn
                                color="primary"
                                class="registerBtn"
                                @click="logoutAllDialog=true"
                                v-on="on">
                                    Log out of all devices
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </template>
    <v-card v-if="formDialog">
        <v-form class="myProfileForm" ref="editForm">
            <h2>Edit information</h2>
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
            <v-btn
            color="primary"
            outlined
            class="mr-4"
            @click="formDialog=false; dialog=false">
                Close
            </v-btn>
            <v-btn
            color="primary"
            class="mr-4"
            @click="updateCustomerIfValid(); formDialog=false">
                Save
            </v-btn>
        </v-form>
    </v-card>
    <v-card v-if="changePasswordDialog">
        <v-card-title>
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
        <v-card-actions>
            <v-btn 
            outlined
            color="primary"
            @click="logoutAllDialog=false; dialog=false">
                No
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
            color="primary"
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
        <v-card-actions>
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
        <v-card-actions>
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
.myProfileForm{
    padding: 8%;
    color: #59c8a5;
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
        updateCustomerFeedbackTitle: ''
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
    mounted(){
        this.init()
    }
}
</script>