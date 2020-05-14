import httpClient from './httpClient'

interface deliveryObject {
    delivery_id: number,
    delivery_option: String,
    price: number
}

interface mailPriceObject {
    mail_price_id: number,
    name: String,
    price: number
}

class DeliveryService {

    /* Gets all delivery options from server */
    async getAllDeliveryOptions(): Promise<Array<deliveryObject>> { 
        return httpClient.get('/delivery')
            .then(function (response) {
                return response.data
            })
            .catch((error) => {
                console.warn(error)
            })
    };

    /* Gets all mail prices from server */
    async getAllMailPrices(): Promise<Array<mailPriceObject>> { 
        return httpClient.get('/mail_price')
            .then(function (response) {
                return response.data
            })
            .catch((error) => {
                console.warn(error)
            })
    };
}
const deliveryService = new DeliveryService
export default deliveryService