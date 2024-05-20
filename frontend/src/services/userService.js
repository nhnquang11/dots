import axios from 'axios'

const baseUrl = '/api/users'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newUser => {
    return axios.post(baseUrl, newUser).then(response => response.data)
}

const getOne = id => {
    return axios.get(`${baseUrl}/${id}`).then(response => response.data)
}

const update = (id, newUser) => {
    return axios.put(`${baseUrl}/${id}`, newUser).then(response => response.data)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove, getOne };
