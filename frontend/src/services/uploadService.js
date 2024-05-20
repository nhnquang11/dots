import axios from "axios";

const baseUrl = '/api/upload'

const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    const response = await axios.post(baseUrl, formData)
    return response.data
}

export default { uploadImage }
