import React from "react";
import { useState } from "react";
import eu4_data from "../src/data/eu4_data.json"
import "../src/App.css"

const getRandomCountry = () => {
    return(eu4_data[Math.floor(Math.random() * eu4_data.length)])
}

const getCountryList = () => {
    var list = [];
    list = eu4_data.map(a => a.country_name)
    return(list)
}


const WinPopup = ({pickedCountryName, closeWinPopUp, showpopup}) => {

    return (
        <div className={showpopup === true ? "winpopup open" : "winpopup"}>
            <div className="popupbox">
                <h2>Congratulations!</h2>

                <p>
                    The correct country was: {pickedCountryName}
                </p>

                <button onClick={closeWinPopUp}> Close popup</button>
            </div>

        </div>
    )

}

const WorldleGrid = ({guess, pickedCountry}) => {
    const guessObj = eu4_data.find((c) => c.country_name.toLowerCase() === guess.toLowerCase());

    if(!guessObj) {
        return;
    }

    return (
        <div className="guessgrid">
            <div className={guessObj.country_name === pickedCountry.country_name ? "guessblock2" : "guessblock"}>{guessObj.country_name}</div>
            <div className={guessObj.government === pickedCountry.government ? "guessblock2" : "guessblock"}>{guessObj.government}</div>
            <div className={guessObj.main_culture === pickedCountry.main_culture ? "guessblock2" : "guessblock"}>{guessObj.main_culture}</div>
            <div className={guessObj.religion === pickedCountry.religion ? "guessblock2" : "guessblock"}>{guessObj.religion}</div>
            <div className={guessObj.total_development === pickedCountry.total_development ? "guessblock2" : guessObj.total_development > pickedCountry.total_development ? "guessblocklower" : "guessblockhigher"}>{guessObj.total_development}</div>
        </div>
    )
}

const SuggestionMap = ({suggestions}) => {
    if(!suggestions) {
        return null;
    } else {
        return (
            <ul>
                {suggestions.map((s,i) => (
                    <li key={i}>
                        {s}
                    </li>
                ))}
            </ul>
        )
    }

}


function Game() {
    const[pickedCountry, setPickedCountry] = useState(getRandomCountry);
    const[oldGuesses, setOldGuesses] = useState([]);
    const[guess, setGuess] = useState('');
    const[openPopUp, setOpenPopUp] = useState(false);
    const[guessSuggestions, setGuessSuggestions] = useState([]);


    var countryNameList = getCountryList()

    const handleKeypress = (e) => {
        const word = e.target.value
        setGuess(word)
        
        console.log("Guess: ", guess)
        console.log("Word: ", word)

        if(word.length === 0) {
            setGuessSuggestions([])
            return;
        }


        const suggestions = eu4_data.map((a) => a.country_name).filter((value) => value.toLowerCase().startsWith(word.toLowerCase()))

        setGuessSuggestions(suggestions);
    }

    const tryGuessing = (e) => {
        e.preventDefault();

        if(guess === pickedCountry.country_name) {
            console.log("Picked correctly");
            setOldGuesses(prev => [...prev, guess]
            )
            setOpenPopUp(true);
        } else {
            console.log("Wrong");
            setOldGuesses(prev => [...prev, guess])
            setGuess("")
            setGuessSuggestions([])
        }

        console.log("Guessed");
    }

    return (
        <div>
        
            <p>{pickedCountry.country_name}</p>
        
            <form onSubmit={tryGuessing}>
                <label>Enter guess:</label>
                <input type="text" value={guess} onChange={handleKeypress}/>
                <SuggestionMap suggestions={guessSuggestions}/>
            </form>

            {oldGuesses.map((guess, index) =>
                <WorldleGrid key={index}guess={guess}pickedCountry={pickedCountry}/>
            )}


            {openPopUp && <WinPopup pickedCountryName={pickedCountry.country_name} closeWinPopUp={() => setOpenPopUp(false)} showpopup={openPopUp}/>}



        </div>
    )
}

export default Game