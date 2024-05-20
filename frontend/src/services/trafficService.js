import axios from "axios";

const baseUrl = '/api/analytic'

const getTraffic = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { getTraffic }
