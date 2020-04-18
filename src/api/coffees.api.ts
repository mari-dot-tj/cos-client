import httpClient from './httpClient'

class CoffeeService {

    private END_POINT = '/coffee'

    async getAllCoffees(): Promise<Array<object>> { 
        return httpClient.get(this.END_POINT)
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch((error) => {
                console.warn(error)
            })
    }

    async getCustomerCoffees(): Promise<Array<object>> { 
        return httpClient.get(this.END_POINT+'/me')
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch((error) => {
                console.warn(error)
            })
    }

}
const coffeeService = new CoffeeService
export default coffeeService