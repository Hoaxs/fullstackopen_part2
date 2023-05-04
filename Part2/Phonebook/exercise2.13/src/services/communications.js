import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'
const getAll = () => {
    const result = axios.get(baseUrl)
    return result.then(response => response.data)

}
const update = (id, newObject) => {
    const result = axios.put(`${baseUrl}/${id}`, newObject)
    return result.then(response => response.data)
}
const create = newObject => {
    const result = axios.post(baseUrl, newObject)
    return result.then(response => response.data)
}
const remove = (id) => {
    const result = axios.delete(`${baseUrl}/${id}`)
    console.log(`object with id ${id} deleted`)

}
export default { getAll, update, create, remove }