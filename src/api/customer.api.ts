import httpClient from './httpClient'

interface Customer {
    name: string,
    address: string,
    phone: number,
    org_number: number,
    email: string,
    zip_code: number,
    subscription: number,
}

class CustomerService {

    private END_POINT = '/customer'

    /* Sendes username and password to server for login */
    async login(username: string, password: string){
        const loginInfo = {
            email: username,
            password: password
        }
        const jsonLoginInfo = JSON.stringify(loginInfo)
        return httpClient.post(this.END_POINT+'/login', jsonLoginInfo)
        .then(function (response){
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    /* Takes in customer object and sends to server for registering in database */
    async register(customer: Customer){
        const jsonCustomer = JSON.stringify(customer)
        return httpClient.post(this.END_POINT, jsonCustomer)
        .then(function(response){
            return response.status
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    /* Logs out, and current token gets deleted from database */
    async logout(){
        return httpClient.post(this.END_POINT+'/logout')
        .then(function (response){
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    /* Logs out of all devices - all tokens connected to the user logged in are deleted from database */
    async logoutAll(){
        return httpClient.post(this.END_POINT+'/logout-all')
        .then(function (response){
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    /* Takes in customer object and updates customer in database with the new one */
    async updateCustomer(customer: Customer){
        const jsonCustomer = JSON.stringify(customer)
        return httpClient.put(this.END_POINT, jsonCustomer)
        .then(function (response){
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    /* Takes in old and new password and updates if these are not the same, or incorrect */
    async updatePassword(oldPassword: String, newPassword: String){
        const passUpdate = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        const jsonPassUpdate = JSON.stringify(passUpdate)
        return httpClient.put(this.END_POINT+'/sensitive', jsonPassUpdate)
        .then(function (response){
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }
}
const customerService = new CustomerService
export default customerService