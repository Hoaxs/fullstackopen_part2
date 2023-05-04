import { useState } from 'react'
function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

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
    }

    if (isDoubleEntry()) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }

  }// addPersonEnd

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  return (

    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input type='text' value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person) => {
        return (<span key={person.name}><br />{person.name}</span>)
      })}
    </div>
  );
}

export default App;
