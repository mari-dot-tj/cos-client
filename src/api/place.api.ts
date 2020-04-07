import httpClient from './httpClient'

class PlaceService {

    private END_POINT = '/place'

    async getProvinceByZip(zip: number): Promise<object>{
        return httpClient.get(this.END_POINT+'/'+zip)
        .then(function (response) {
            console.log(response)
            return response.data
        })
        .catch((error) => {
            console.warn(error)
        })
    }
}

const placeService = new PlaceService
export default placeService