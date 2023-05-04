import { useState, useEffect } from 'react'
import comservice from './services/communications'


const Filter = ({ inputChange, searchName }) => {

  return (<>
    filter shown with <input value={searchName} onChange={inputChange} />
  </>)
}

const PersonForm = ({ addPerson, newName, handleNumberChange, newNumber, handleNameChange }) => {


  return (
    <>
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
    </>
  )

}// Person Form Component

const Persons = ({ persons }) => {

  return (<div>
    {persons.name} {persons.number}
  </div>)

}


function App() {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [persons, setPersons] = useState([])


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
    }
    if (isDoubleEntry()) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      // send to server
      comservice
        .create(personObject)
        .then(response => response.data)

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


  const regex = new RegExp(`${searchName}`, 'gi')
  let filtered = []
  // filter names by user input
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
      <div>
        <Filter searchName={searchName} inputChange={handleInputChange} />
      </div>
      <div>
        < PersonForm addPerson={addPerson} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} handleNameChange={handleNameChange} />
      </div>
      <h2>Numbers</h2>
      {filteredPersons.map(pers => <Persons key={pers.id} persons={pers} />)}
    </div>
  );

}

export default App;
