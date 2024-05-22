import axios from "axios";

const baseUrl = '/api/topics'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const update = async (id, topic) => {
    const response = await axios.put(`${baseUrl}/${id}`, topic)
    return response.data
}

const createNew = async (topic) => {
    const response = await axios.post(baseUrl, topic)
    return response.data
}

export default { getAll, update, createNew }
