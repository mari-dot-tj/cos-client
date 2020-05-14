import axios from 'axios'

/* Http client used in all the other apis created */
const httpClient = axios.create({
    baseURL: (process.env.VUE_APP_BASE_URL !== undefined) ? process.env.VUE_APP_BASE_URL : '/',
    headers: {
        "Content-Type": "application/json",
    }
});

export default httpClient;
