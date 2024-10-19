import { useState } from 'react'

const StatisticLine = ({ value, text }) => <tr>{text}<td>{value}</td></tr>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <StatisticLine value={good} text={'good'}/>
      <StatisticLine value={neutral} text={'neutral'}/>
      <StatisticLine value={bad} text={'bad'}/>
      <StatisticLine value={average} text={'average'}/>
      <StatisticLine value={positive} text={'positive'}/>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const sumGood = () => setGood(good + 1)
  const sumNeutral = () => setNeutral(neutral + 1)
  const sumBad = () => setBad(bad + 1)
  


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={sumGood} text='good' />
      <Button onClick={sumNeutral} text='neutral' />
      <Button onClick={sumBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App