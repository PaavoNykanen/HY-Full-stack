import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: "123-456789",
    }
  ])
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  const changeName = (event) => {
    setNewName(event.target.value)
  }
  const changeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const changeFilterString = (event) => {
    const text = event.target.value
    setFilterString(text)
    setFilteredPersons(
      persons.filter(person =>
         person.name.toLowerCase()
          .includes(text.toLowerCase()
        )
      )
    )
  }
  
  const saveName = (event) => {
    event.preventDefault()
    const personExists = persons.some(person => person.name === newName)
    if (personExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPersons = persons.concat({ name: newName, number: newNumber})
    setPersons(newPersons)
    setFilteredPersons(
      newPersons.filter(person =>
         person.name.toLowerCase()
          .includes(filterString.toLowerCase()
        )
      )
    )
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filterString} onChange={changeFilterString} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={changeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={changeNumber} />
        </div>
        <div>
          <button type="submit" onClick={saveName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => (
        <div key={person.name}>{person.name} {person.number}</div>
      ))}
    </div>
  )
}

export default App