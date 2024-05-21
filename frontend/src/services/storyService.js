import axios from "axios";

const baseUrl = '/api/stories'

const post = async (story, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.post(baseUrl, story, config)
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addCommentToStory = async (id, data, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.put(`${baseUrl}/${id}/comment`, data, config)
    return response.data
}

const update = async (id, newObject, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
}

export default { post, getOne, getAll, addCommentToStory, update }