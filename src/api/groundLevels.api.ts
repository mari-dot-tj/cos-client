import httpClient from './httpClient'

interface groundLevelObject {
    ground_level_id: number,
    level_name: String,
    grinding_fee: number
}

class GroundLevelService {

    private END_POINT = '/ground_level'

    /* Gets all ground levels from server */
    async getAllGroundLevels(): Promise<Array<groundLevelObject>> { 
        return httpClient.get(this.END_POINT)
            .then(function (response) {
                return response.data
            })
            .catch((error) => {
                console.warn(error)
            })
    };

}
const groundLevelService = new GroundLevelService
export default groundLevelService