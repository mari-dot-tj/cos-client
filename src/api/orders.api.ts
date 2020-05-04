import httpClient from './httpClient'


/*interface Order{
  info: String,
  delivery_date: Date,
  production_date: Date,
  customer_id: number,
  status_id: number,
  delivery_id: number,
  ref_id: number,
  items: [
      {
      coffee_id: number,
      bag_id: number,
      ground_level_id: number,
      quantity: number
      }
    ]
}*/

class OrderService {

    private END_POINT = '/order'

    async getOrders(){
        return httpClient.get(this.END_POINT)
        .then(function (response) {
            console.log(response)
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    async postOrder(items: [], delivery_id: number, order_interval: number|undefined, day_of_week: number|undefined){
        let obj
        if(order_interval!=undefined && day_of_week!=undefined){
            obj = {
                info: "Info",
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
                info: "Info",
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
            console.log("Post order request status: ",response.status)
            return response
        })
        .catch((error) => {
            console.warn(error)
        })
    }

}
const orderService = new OrderService
export default orderService