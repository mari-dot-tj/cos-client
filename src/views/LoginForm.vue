<template>
    <v-dialog
    v-model="dialog"
    width="500">
    <template v-slot:activator="{ on }">
        <v-container>
            <!--<v-img class="mx-auto"
            src= "client/public/JS-logo.jpg"
            width="200px"
            ></v-img>-->
            <v-card width="400" class="mx-auto mt-10">
                <v-card-title>
                    <h2 class="mx-auto font-weight-thin">
                        Business Login
                    </h2>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field
                        label="Username"
                        prepend-icon="mdi-account-circle"
                        :rules="emailRules"
                        required
                        v-model="username"
                        />
                        <v-text-field 
                        :type="showPassword? 'text' : 'password'"
                        label="Password"
                        prepend-icon="mdi-lock"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                        :rules="passwordRules"
                        required
                        v-model="password"
                        />
                    </v-form>
                </v-card-text>
                <br>
                <v-card-actions>
                    <v-btn 
                    tile 
                    large 
                    class="login-btn mx-auto"
                    color="primary"
                    @click="test"
                    v-on="on"
                    >
                        Login
                    </v-btn>
                </v-card-actions>
                <br>
                <v-card-actions>
                    <v-btn text color="primary">Forgot password?</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary">New customer?</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </template>
    <v-card v-if="failedLogin">
        <v-card-title
          color="primary"
        >
          Could not log in
        </v-card-title>

        <v-card-text>
          Username or password is wrong. Try again.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            @click="dialog = false; failedLogin=false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<style scoped>
.general {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.login-btn {
    width: 150px;
}
</style>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
    name: 'LoginForm',
    data: () => ({
        username: '',
        password: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
            v => !!v || 'Password is required'
        ],
        showPassword: false, //boolean for toggling the show password icon
        dialog: false,
        failedLogin: false
    }),
    methods: {
        ...mapActions('account', ['login']),
        checkIfValid(){
            if(this.$refs.form.validate()){
                return true
            }else return false
        },
        test(){
            if(this.checkIfValid()){
                this.login({username: this.username, password: this.password})
                .then(res => {
                    if(res == 200){
                        this.failedLogin = false
                        this.$router.push('/order-overview')
                    }else this.failedLogin=true
                })
            }
        }
    },
    computed: {
        ...mapState('account', ['loggedIn'])
    }
})
</script>