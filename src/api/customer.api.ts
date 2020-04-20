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

    async login(username: string, password: string){
        const loginInfo = {
            email: username,
            password: password
        }
        const jsonLoginInfo = JSON.stringify(loginInfo)
        return httpClient.post(this.END_POINT+'/login', jsonLoginInfo)
        .then(function (response){
            console.log(response)
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    async register(customer: Customer){
        const jsonCustomer = JSON.stringify(customer)
        return httpClient.post(this.END_POINT, jsonCustomer)
        .then(function(response){
            console.log(response)
            return response.status
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    async logout(){
        return httpClient.post(this.END_POINT+'/logout')
        .then(function (response){
            console.log(response)
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    async logoutAll(){
        return httpClient.post(this.END_POINT+'/logout-all')
        .then(function (response){
            console.log(response)
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    async updateCustomer(customer: Customer){
        const jsonCustomer = JSON.stringify(customer)
        return httpClient.put(this.END_POINT, jsonCustomer)
        .then(function (response){
            console.log(response)
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    async updatePassword(oldPassword: String, newPassword: String){
        const passUpdate = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        const jsonPassUpdate = JSON.stringify(passUpdate)
        return httpClient.put(this.END_POINT+'/sensitive', jsonPassUpdate)
        .then(function (response){
            console.log(response)
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }
}
const customerService = new CustomerService
export default customerService