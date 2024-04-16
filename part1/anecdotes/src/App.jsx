import { useState } from 'react'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { text: 'If it hurts, do it more often.', grade: 0},
    { text: 'Adding manpower to a late software project makes it later!', grade: 0},
    { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', grade: 0},
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', grade: 0},
    { text: 'Premature optimization is the root of all evil.', grade: 0},
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', grade: 0},
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', grade: 0},
    { text: 'The only way to go fast, is to go well.', grade: 0},
  ])
   
  const [selected, setSelected] = useState(0)

  const handleVote = () => {
    const newAnecdotes = [...anecdotes]
    newAnecdotes[selected].grade += 1
    setAnecdotes(newAnecdotes)
  }

  return (
    <div>
      <p>
        {anecdotes[selected].text}
      </p>
      <p>
        has {anecdotes[selected].grade} votes
      </p>
      <p>
        <button onClick={() => handleVote()}>
          Vote
        </button>
        <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>
          Next anecdote
        </button>
      </p>
    </div>
  )
}

export default App