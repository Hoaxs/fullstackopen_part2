import { useState } from 'react'

const Filter = ({ inputChange, searchName }) => {

  return (<>filter shown with <input value={searchName} onChange={inputChange} /></>)
}

const Persons = ({ persons }) => {

  return (<div>
    {persons.map((person) => {
      return (<span key={person.name}><br />{person.name}  {person.number}</span>)
    })}

  </div>)

}
function App() {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter searchName={searchName} inputChange={handleInputChange} />
      </div>
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
      <h2>Numbers</h2>
      < Persons persons={filter()} />
    </div>
  );
}

export default App;
