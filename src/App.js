import React from 'react'
import './App.css'
import Dice from './Dice'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

  // Generating an object of 10 random numbers
  const [dice, setDice] = React.useState(diceNumbers())
  const [click, setClick] = React.useState(0)
  const [previous, setPrevious] = React.useState(0)
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    // Checking if all the dice is held . i.e all die.isHold == true
    const allHeld = dice.every(die => die.isHold)

    // Using the first die value to check all other dice values
    const firstValue = dice[0].value
    const equalValue = dice.every(die => firstValue === die.value)

    // checking if all dice are held and have equal values
    if (allHeld && equalValue) {
      setTenzies(true)
      console.log("You WON!")
    }
  }, [dice])

  
  React.useEffect(() => {
    const btn = document.querySelector(".roll-button")
    btn.addEventListener("click", function() {
      setClick(oldClick => oldClick + 1)
    })
  }, [])
  
  // Generate dice 
  function generateDie() {
    return ({
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHold: false
    })
  }
  
  function diceNumbers() {
    const numbers = []
    for (let i = 0; i < 10; i++) {
      numbers.push(generateDie())
    }
    return numbers
  }

  // Generating new dice
  const die = dice.map(die => {
    return <Dice 
      key={die.id} 
      value={die.value} 
      isHold={die.isHold}
      holdDice = {() => holdDice(die.id)}
    />
  })

  // Roll Dice
  function rollDice(id) {
    if (tenzies === false){
      setDice(oldDice => oldDice.map(die => {
        return die.isHold ? die : generateDie()
      }))
      setPrevious(click)
    } else {
      setTenzies(false)
      setDice(diceNumbers)
      setClick(0)
    }
  }

    // Holding Dice
    function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
        return die.id === id ?
        {...die, isHold : !die.isHold} :
        die
      }))
    }
  

  return (
    <main>
      <div className='score--board'>
        <h2 className='score'>{tenzies ? "Your Score" : "Clicks"} : {click}</h2>
        {
        click === 0 &&
        <h2 className='score previous'>Previous Score : {previous}</h2>
        }
      </div>
      <div className='container'>
        {/* Render Confetti when tenzies game is won */}
        {tenzies && <Confetti />}
        
        <div className='board'>
          <h2 className='title'>Tenzies</h2>
          <div className='die-container'>
            {die}
          </div>
          <button onClick={rollDice} className='roll-button'>{tenzies ? "Replay" : "Roll Dice"}</button>
        </div>
      </div>
    </main>
  )
}