import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const changeName = (event) => {
    setNewName(event.target.value)
  }
  
  const saveName = (event) => {
    event.preventDefault()
    const personExists = persons.some(person => person.name === newName)
    if (personExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPersons = persons.concat({ name: newName })
    setPersons(newPersons)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={changeName} />
        </div>
        <div>
          <button type="submit" onClick={saveName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  )
}

export default App