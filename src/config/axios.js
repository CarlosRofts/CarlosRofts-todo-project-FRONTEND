import axios from 'axios'

// contiene la url base (var)
const clientAxios = axios.create({ 
    baseURL : process.env.REACT_APP_BACKEND_URL
})
export default clientAxios