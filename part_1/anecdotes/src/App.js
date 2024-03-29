import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} type='button'>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ]

  const startPoints = anecdotes.map(() => 0)

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(startPoints)

  const handleNextClick = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const getIndexOfMaxPoint = () => {
    const maxPoint = [...points].sort((prev, next) => next - prev)[0]
    return points.indexOf(maxPoint)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <div>
        <Button onClick={handleVoteClick} text='vote' />
        <Button onClick={handleNextClick} text='next anecdote' />
      </div>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[getIndexOfMaxPoint()]}</div>
      <div>has {points[getIndexOfMaxPoint()]} votes</div>
    </div>
  )
}

export default App
