import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Notification = ({ message, styles }) => {
  if (!message) {
    return null
  }

  return (
    <div style={styles}>
      {message}
    </div>
  )
}

const Filter = ({ filterString, changeFilterString }) => (
  <div>
    filter shown with: <input value={filterString} onChange={changeFilterString} />
  </div>
)

const PersonForm = ({ newName, changeName, newNumber, changeNumber, saveName }) => (
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
)

const Persons = ({ persons, deletePerson }) => (
  persons.map(person => (
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person)}>delete</button>
    </div>
  ))
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [successMessage, setSuccessMessage] = useState(undefined)


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
    const newPerson = { name: newName, number: newNumber }
    const personExists = persons.find(person => person.name === newPerson.name)
    if (personExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.updatePerson({...personExists, number: newNumber})
          .then(data => {
          console.log(data)
          // Update the person in the list of persons
          const newPersons = persons.map(person => person.id === data.id ? data : person)
          setPersons(newPersons)
          setFilteredPersons(
            newPersons.filter(person =>
               person.name.toLowerCase()
                .includes(filterString.toLowerCase()
              )
            )
          )
          setSuccessMessage(`Updated ${newPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }).catch(error => {
          console.log(error.response.data.error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      } else {
        return
      }
    } else {
      personService.create(newPerson)
        .then(data => {
          console.log(data)
          // Add new person to the list of persons
          const newPersons = persons.concat(newPerson)
          setPersons(newPersons)
          setFilteredPersons(
            newPersons.filter(person =>
               person.name.toLowerCase()
                .includes(filterString.toLowerCase()
              )
            )
          )
          setSuccessMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }).catch(error => {
          console.log(error.response.data.error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    console.log(person)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id)
      .then(data => {
        console.log(data)
        const newPersons = persons.filter(p => p.id !== person.id)
        setPersons(newPersons)
        setFilteredPersons(
          newPersons.filter(person =>
             person.name.toLowerCase()
              .includes(filterString.toLowerCase()
            )
          )
        )
      }).catch(error => {
        setErrorMessage(`Information of ${person.name} has already been removed from the server`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    }
  }

  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(data => {
        console.log('promise fulfilled')
        const newPersons = data
        setPersons(newPersons)
        setFilteredPersons(
          newPersons.filter(person =>
             person.name.toLowerCase()
              .includes(filterString.toLowerCase()
            )
          )
        )
      })
  }, [])


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification 
        styles={{
          color: 'red',
          background: 'lightgrey',
          fontSize: 20,
          borderStyle: 'solid',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }} 
        message={errorMessage} 
      />
      <Notification
        styles={{
          color: 'green',
          background: 'lightgrey',
          fontSize: 20,
          borderStyle: 'solid',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
        message={successMessage} 
      />
      <Filter filterString={filterString} changeFilterString={changeFilterString} />
      <h3>add a new</h3>
      <PersonForm 
        newName={newName}
        changeName={changeName}
        newNumber={newNumber}
        changeNumber={changeNumber}
        saveName={saveName}
     />
      
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App