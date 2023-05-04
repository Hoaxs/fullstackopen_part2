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
const remove = (id, obj) => {
    const objToDelete = obj.find(person => person.id === id)
    if (window.confirm(`Delete ${objToDelete.name}?`)) {
        axios.delete(`${baseUrl}/${id}`)
        console.log(`object with id ${id}  and name ${objToDelete.name} deleted`)
        //window.location.reload()
    }

}
export default { getAll, update, create, remove }