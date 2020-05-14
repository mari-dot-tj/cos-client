import httpClient from './httpClient'

class CoffeeService {

    private END_POINT = '/coffee'

    /* Gets all coffees from server, independent of customer */
    async getAllCoffees(): Promise<Array<object>> { 
        return httpClient.get(this.END_POINT)
            .then(function (response) {
                return response.data
            })
            .catch((error) => {
                console.warn(error)
            })
    }

    /* Gets coffees connected to customer logged in (token sent with http header)*/
    async getCustomerCoffees(): Promise<Array<object>> { 
        return httpClient.get(this.END_POINT+'/me')
            .then(function (response) {
                return response.data
            })
            .catch((error) => {
                console.warn(error)
            })
    }

}
const coffeeService = new CoffeeService
export default coffeeService
