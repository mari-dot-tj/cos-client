import httpClient from './httpClient'

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
            return response.status
        })
        .catch((error) => {
            console.warn(error)
        })
    }
}
const customerService = new CustomerService
export default customerService