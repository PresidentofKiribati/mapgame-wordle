import React from "react";
import { useState } from "react";
import eu4_data from "../src/data/eu4_data.json"

const getRandomCountry = () => {
    return(eu4_data[Math.floor(Math.random() * eu4_data.length)])
}


const OldGuesses = ({oldGuesses}) => {
    return(
        <ul>
            {oldGuesses.map((item, index) =>
                <li key={index}>{item}</li>
            )}
        </ul>
    )
}


function Game() {
    const[pickedCountry, setPickedCountry] = useState(getRandomCountry);
    const[oldGuesses, setOldGuesses] = useState([]);
    const[guess, setGuess] = useState('');

    const tryGuessing = (e) => {
        e.preventDefault();

        if(guess === pickedCountry.country_name) {
            console.log("Picked correctly");
        } else {
            console.log("Wrong");
            setOldGuesses(prev => [...prev, guess]
            )
            setGuess("")
        }

        console.log("Guessed");
    }

    return (
        <div>
            <p>{pickedCountry.country_name}</p>
        
            <form onSubmit={tryGuessing}>
                <label>Enter guess:</label>
                <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)}/>
            </form>

            <OldGuesses oldGuesses={oldGuesses}/>



        </div>
    )
}

export default Game