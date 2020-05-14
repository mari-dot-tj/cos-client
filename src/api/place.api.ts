import httpClient from './httpClient'

class PlaceService {

    private END_POINT = '/place'

    /* Gets name of postal area from server belonging to zip code sendt in */
    async getPostalAreaByZip(zip: number): Promise<object>{
        return httpClient.get(this.END_POINT+'/'+zip)
        .then(function (response) {
            return response.data
        })
        .catch((error) => {
            console.warn(error)
        })
    }
}

const placeService = new PlaceService
export default placeService