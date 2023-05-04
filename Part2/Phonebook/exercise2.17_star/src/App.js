import { useState, useEffect } from 'react'
import comservice from './services/communications'

const Initial = ({ msg }) => {
  const initialStyle = {
    color: 'skyblue',
    background: 'grey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (<div style={initialStyle}>{msg}</div>)
}
const Create = ({ msg }) => {
  const createStyle = {
    color: 'green',
    background: 'lightblue',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (<div style={createStyle}>{msg}</div>)
}

const Update = ({ msg }) => {
  const updateStyle = {
    color: 'lightgreen',
    background: 'grey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (<div style={updateStyle}>{msg}</div>)
}
const Error = ({ msg }) => {
  const errorStyle = {
    color: 'red',
    background: 'white',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (<div style={errorStyle}>{msg}</div>)
}

const Notification = ({ notification }) => {
  // Props destructuring=>notification destruturing=>{message,type}
  const { message, type } = notification

  if (message === null) {
    return null
  }
  if (type === "create")
    return (<div><Create msg={message} /></div>)

  if (type === "update")
    return (<div><Update msg={message} /></div>)

  if (type === "error")
    return (<div><Error msg={message} /></div>)

  return (<div>
    <Initial msg={message} />
  </div >)
}

const Filter = ({ inputChange, searchName }) => {

  return (<>
    filter shown with <input value={searchName} onChange={inputChange} />
  </>)
}

const PersonForm = ({ addPerson, newName, handleNumberChange, newNumber, handleNameChange }) => {


  return (
    <div>
      <form onSubmit={addPerson}>
        <h2> Add a new</h2>
        <div>
          name: <input type='text' value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )

}// Person Form Component

const Persons = ({ persons, filteredPers }) => {

  return (<div>
    {persons.name} {persons.number} {<button type="button" onClick={() => comservice.remove(persons.id, filteredPers)}>delete</button>}
  </div>)

}


function App() {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState({ type: "initial", message: "Notifications appear here" })

  let filteredPersons = [...persons]

  //const baseUrl = 'http://localhost:3001/persons'

  //fetches 'persons' from db.json and returns a promise   
  useEffect(() => {
    comservice
      .getAll()
      .then(allData => setPersons(allData))

  }, [])

  const isDoubleEntry = () => {
    const arrIterator = persons.values();
    let found = false
    for (const value of arrIterator)
      if (value.name.trim().toLowerCase() === newName.trim().toLowerCase()) {
        found = true
        return found;
      }
    return found;

  }


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (isDoubleEntry()) {
      window.confirm(`${newName} is already added to phonebook,replace the old number with a new one ?`)
      // returns object containing new name
      const targetObject = persons.find(n => n.name.toLowerCase() === newName.toLowerCase())
      targetObject.number = newNumber

      console.log(targetObject.name, targetObject.id)

      comservice
        .update(targetObject.id, targetObject)
        .then(response => {
          setNotification({ type: 'update', message: `${response.name} is updated with ${response.number} ` })
          setNewName('')
          setNewNumber('')
          setTimeout(() => { setNotification({ message: "Notifications appear here" }) }, 5000)
        })
        .catch(error => {
          setNotification({ type: 'error', message: ` ${targetObject.name} has already been removed from phone book` })
          setNewName('')
          setNewNumber('')
          setTimeout(() => { setNotification({ message: "Notifications appear here" }) }, 5000)
          setPersons(persons.filter(n => n.id !== targetObject.id))
        })

      return
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      // send to server
      comservice
        .create(personObject)
        .then(response => response.data)
      setNewNumber('')
      setNotification({ type: 'create', message: `Added ${newName} ` })
      setTimeout(() => { setNotification({ message: "Notifications appear here" }) }, 5000)


    }

  }// addPersonEnd

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  function handleInputChange(event) {
    if ((event.target.value) === '')
      setSearchName('')
    else
      setSearchName(event.target.value)
  }
  // return matching characters using regex global and case insensitive flags



  // filter names by user input
  const regex = new RegExp(`${searchName}`, 'gi')
  let filtered = []
  const filter = () => {
    const keyWords = (objElement) => objElement.name.match(regex)
    for (const el in persons) {
      filtered = persons.filter(el => keyWords(el))
    }
    return filtered
  }
  filteredPersons = filter()

  return (

    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <div>
        <Filter searchName={searchName} inputChange={handleInputChange} />
      </div>
      <div>
        < PersonForm addPerson={addPerson} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} handleNameChange={handleNameChange} />
      </div>
      <h2>Numbers</h2>
      {filteredPersons.map(pers => <Persons key={pers.id} persons={pers} filteredPers={filteredPersons} />)}

    </div>
  );

}
export default App;
