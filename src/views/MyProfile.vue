<template>
  <v-container>
    <NavBar/>
    <v-card>
      <form class="registerForm">
                <h2>My profile</h2>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                        v-model="name"
                        label="Organisation name"
                        prepend-icon="mdi-briefcase-account"
                        :rules="nameRules"
                        required
                        v-bind:readonly="!editMode"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                        v-model="orgNumber"
                        label="Organisation number"
                        prepend-icon="mdi-numeric"
                        :rules="nameRules"
                        required
                        v-bind:readonly="!editMode"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                        v-model="phone"
                        label="Phone number"
                        prepend-icon="mdi-phone"
                        :rules="nameRules"
                        required
                        v-bind:readonly="!editMode"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                        v-model="email"
                        label="Email address"
                        prepend-icon="mdi-at"
                        :rules="nameRules"
                        required
                        v-bind:readonly="!editMode"
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
                        v-bind:readonly="!editMode"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                        v-model="zipCode"
                        label="Zip code"
                        prepend-icon="mdi-map-marker"
                        :rules="zipCodeRules"
                        v-bind:readonly="!editMode"
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
                        readonly
                        >
                        {{province}}
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-btn
                color="primary"
                class="registerBtn"
                @click="editMode=!editMode">
                    Edit
                </v-btn>
            </form>
    </v-card>
  </v-container>
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
.registerBtn{
    align-self: center;
}
</style>

<script>
import NavBar from '../components/NavBar/NavBar.vue';
import { mapActions, mapGetters } from 'vuex'
import placeService from '@/api/place.api'

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
        active: '',
        password: '',
        zipCode: '',
        province: '',
        subscription: '',
        ref_id: '',
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
            v => !!v || 'Organisation number is required'
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
    }),
    methods: {
        ...mapActions('account', ['getProvinceByZip'])
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
        ...mapGetters('account', ['isLoggedIn'])
    },
    created(){
        if (!this.isLoggedIn) {
            this.$router.push('/login');
        }
    }
}
</script>