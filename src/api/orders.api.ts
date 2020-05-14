import httpClient from './httpClient'

class OrderService {

    private END_POINT = '/order'

    /* Gets all orders connected to customer logged in (token sent in http header) */
    async getOrders(){
        return httpClient.get(this.END_POINT)
        .then(function (response) {
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    /* 
    Gets all active recurring order connected to customer logged in (token sent in http header) 
    '/fixed-order/active/1' returns active orders
    '/fixed-order/active/0' returns inactive orders
    */
    async getActiveRecurringOrders(){
        return httpClient.get(this.END_POINT+'/fixed-order/active/1')
        .then(function (response) {
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    /* Takes in orderId and sets active attribute of the order to 0 (not active) */
    async cancelRecOrderById(orderId: number){
        const obj = {
            active: 0,
            order_id: orderId
        }
        const jsonObj = JSON.stringify(obj)
        return httpClient.put(this.END_POINT, jsonObj)
        .then(function (response) {
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }
    
    /*
    Posts recurring order if interval and delivery day (day_of_week) are chosen, if not: posts one-time order
    */
    async postOrder(items: [], delivery_id: number, order_interval: number|undefined, day_of_week: number|undefined, info: String){
        let obj
        if(order_interval!=undefined && day_of_week!=undefined){
            obj = {
                info: info,
                delivery_date: '2020-08-09',
                production_date: '2020-08-09',
                customer_id: 1,
                status_id: 1,
                delivery_id: delivery_id,
                ref_id: 1,
                list: items,
                order_interval: order_interval,
                day_of_week: day_of_week
            }
        }else{
            obj = {
                info: info,
                delivery_date: '2020-08-09',
                production_date: '2020-08-09',
                customer_id: 1,
                status_id: 1,
                delivery_id: delivery_id,
                ref_id: 1,
                list: items
            }
        }
        const jsonObj = JSON.stringify(obj)
        return httpClient.post(this.END_POINT, jsonObj)
        .then(function (response) {
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }

}
const orderService = new OrderService
export default orderService