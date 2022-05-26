import React from 'react'
import './App.css'
import Dice from './Dice'

export default function App() {

  // Generating an object of 10 random numbers
  const [dice, setDice] = React.useState(diceNumbers())
  
  function diceNumbers() {
    const numbers = []
    for (let i = 0; i < 10; i++) {
      numbers.push(
        {
          id: `${i}id`,
          value: Math.ceil(Math.random() * 6),
          isHold: true
        }
      )
    }
    return numbers
  }

  // Generating new dice
  const die = dice.map(die => {
    return <Dice key={die.id} value={die.value}/>
  })

  function rollDice() {
      setDice(diceNumbers)
  }

  return (
    <main>
      <div className='board'>
        <h2 className='title'>Tenzies</h2>
        <div className='die-container'>
          {die}
        </div>
        <button onClick={rollDice} className='roll-button'>Roll Dice</button>
      </div>
    </main>
  )
}