import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/all'

const getAll = () => {
    const result = axios.get(baseUrl)
    return result.then(response => response.data)
}
export default { getAll: getAll }