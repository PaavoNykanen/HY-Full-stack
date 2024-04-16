import { useState } from 'react'

// a proper place to define a component
const Statistics = ({good, neutral, bad, all, average, positive}) => {
  return (
    <div>
      <h1>statistics</h1>
      {all === 0 ? (
        <p>
          No feedback given
        </p>
      ) : (
        <>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {all}</p>
          <p>average {average}</p>
          <p>positive {positive} %</p>
        </>
      )}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodFeedback = () => {
    const newGood = good + 1
    const newAll = all + 1
    setGood(newGood)
    setAll(newAll)
    setAverage((newGood - bad) / newAll) // No need to calculate with neutral, since its value is 0
    setPositive((newGood / newAll) * 100)
  }

  const handleNeutralFeedback = () => {
    const newNeutral = neutral + 1
    const newAll = all + 1
    setNeutral(newNeutral)
    setAll(newAll)
    setAverage((good - bad) / newAll)
    setPositive((good / newAll) * 100)
  }

  const handleBadFeedback = () => {
    const newBad = bad + 1
    const newAll = all + 1
    setBad(newBad)
    setAll(newAll)
    setAverage((good - newBad) / newAll)
    setPositive((good / newAll) * 100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => handleGoodFeedback()}>good</button>
      <button onClick={() => handleNeutralFeedback()}>neutral</button>
      <button onClick={() => handleBadFeedback()}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App