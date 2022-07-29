import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [roll, setRoll] = React.useState(0)
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }
    
    function rollDice() {
        setRoll( roll => roll + 1)
        if(tenzies) {
            setRoll(0);
            setDice(allNewDice());
            setTenzies(!tenzies)
        }else{
        setDice(dices => dices.map( oldDice => oldDice.isHeld ? oldDice : 
        {value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()}
        ))
        }
        console.log(roll);
    }
   
    
    React.useEffect(()=>{
        localStorage
        const all_isheld = dice.every(oldDice => oldDice.isHeld);
        const firstValue = dice[0].value
        const all_valueEqual = dice.every(oldDice => oldDice.value === firstValue)
        if(all_isheld && all_valueEqual){
            setTenzies(true)
        }
    }, [dice, roll])
/**
 * Challenge: Update the `holdDice` function to flip
 * the `isHeld` property on the object in the array
 * that was clicked, based on the `id` prop passed
 * into the function.
 * 
 * Hint: as usual, there's > 1 way to accomplish this.
 * I'll be using `dice.map()` and checking for the `id`
 * of the die to determine which one to flip `isHeld` on,
 * but you can do whichever way makes the most sense to you.
 */
    function holdDice(id) {
        setDice( dices => dices.map( oldDice => oldDice.id === id ? {...oldDice, isHeld : !oldDice.isHeld} 
        : {...oldDice}))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h3> Dice Rolled : {roll} times </h3>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}