import axios from "axios";

const baseUrl = '/api/comments'

const post = async (comment, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.post(baseUrl, comment, config)
    return response.data
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const update = async (id, newObject, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
}

const remove = async (id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { post, getOne, update, getAll, remove }
