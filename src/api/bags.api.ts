import httpClient from './httpClient'

interface bagObject {
    bag_id: number,
    size: String,
    grams: number
}

class BagService {

    private END_POINT = '/bag'

    /* Gets all bags from server, independent of customer */
    async getAllBags(): Promise<Array<bagObject>> { 
        return httpClient.get(this.END_POINT)
            .then(function (response) {
                return response.data
            })
            .catch((error) => {
                console.warn(error)
            })
    }

    /* Gets bags connected to customer logged in (token sent with http header)*/
    async getCustomerBags(): Promise<Array<bagObject>> { 
        return httpClient.get(this.END_POINT+'/me')
            .then(function (response) {
                return response.data
            })
            .catch((error) => {
                console.warn(error)
            })
    }

}
const bagService = new BagService
export default bagService