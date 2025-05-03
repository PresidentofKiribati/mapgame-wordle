import React, { useEffect } from "react";
import { useState } from "react";
import eu4_data from "../src/data/eu4_data.json"
import anbennar_data from "../src/data/anbennar_data.json"
import hoi4_data from "../src/data/hoi4_data.json"
import "../src/App.css"
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, increment, updateDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId:import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId:import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const appX = initializeApp(firebaseConfig);
const dbX = getFirestore(appX);

const sendPlayer = async (playerName) => {
    
    const playerRef = doc(dbX, "scoreboard", playerName)

    await updateDoc(playerRef, {plays: increment(1)})
    console.log("Incremented")
}


const WinPopup = ({pickedCountryName, closeWinPopUp, showpopup}) => {

    return (
        <div className={showpopup === true ? "winpopup open" : "winpopup"}>
            <div className="popupbox">
                <h2>Congratulations!</h2>

                <p>
                    The correct country was: {pickedCountryName}
                </p>

                <form onSubmit={sendPlayer}>
                    <label>Give name:</label>
                </form>

                <button onClick={closeWinPopUp}> Close popup and start game again</button>
            </div>

        </div>
    )

}

const HigherLowerArrow = ({value, targetValue}) => {
    var v = parseInt(value)
    var t = parseInt(targetValue)

    if(v < t) {
        console.log("a")
        return (
            <img src="/images/arrowup.png"/>
        )
    } else {
        console.log("b")
        return (
            <img src="/images/arrowdown.png"/>
        )
    }
}

const WorldleGrid = ({guess, pickedCountry, pickedGame, pickedTitle}) => {
    const guessObj = pickedGame.find((c) => c.country_name.toLowerCase() === guess.toLowerCase());

    if(!guessObj) {
        return;
    }
    /*
    className={guessObj.total_development === pickedCountry.total_development ? "guessblock2" : guessObj.total_development > pickedCountry.total_development ? "guessblocklower" : "guessblockhigher"}
    */

    
    if(pickedTitle === "EU4" || pickedTitle === "ANBENNAR") {
        return (
            <div className="guessgrid">
                <div className={guessObj.country_name === pickedCountry.country_name ? "guessblock2" : "guessblock"}>{guessObj.country_name}</div>
                <div className={guessObj.government === pickedCountry.government ? "guessblock2" : "guessblock"}>{guessObj.government}</div>
                <div className={guessObj.main_culture === pickedCountry.main_culture ? "guessblock2" : "guessblock"}>{guessObj.main_culture}</div>
                <div className={guessObj.religion === pickedCountry.religion ? "guessblock2" : "guessblock"}>{guessObj.religion}</div>
                <div>{<HigherLowerArrow value={guessObj.total_development} targetValue={pickedCountry.total_development}/>}</div>
            </div>
        )
    } else if(pickedTitle === "HOI4") {
        return (
            <div className="guessgridHOI">
                <div className={guessObj.country_name === pickedCountry.country_name ? "guessblock2" : "guessblock"}>{guessObj.country_name}</div>
                <div>{<HigherLowerArrow value={guessObj.population} targetValue={pickedCountry.population}/>}</div>
                <div>{<HigherLowerArrow value={guessObj.military_factories} targetValue={pickedCountry.military_factories}/>}</div>
                <div>{<HigherLowerArrow value={guessObj.naval_dockyards} targetValue={pickedCountry.naval_dockyards}/>}</div>
                <div>{<HigherLowerArrow value={guessObj.civilian_factories} targetValue={pickedCountry.civilian_factories}/>}</div>
                <div className={guessObj.continent === pickedCountry.continent ? "guessblock2" : "guessblock"} >{guessObj.continent}</div>
            </div>
        )

    }
    
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

const Infographics = ({pickedTitle}) => {
    switch(pickedTitle) {
        case "EU4":
            return (
                <div className="guessgrid">
                    <div className="guessblock"><p>Country Name</p></div>
                    <div className="guessblock"><p>Government Form</p></div>
                    <div className="guessblock"><p>Main Culture</p></div>
                    <div className="guessblock"><p>Religion</p></div>
                    <div className="guessblock"><p>Development</p></div>
                </div>
            )
            case "ANBENNAR":
                return (
                    <div className="guessgrid">
                        <div className="guessblock"><p>Country Name</p></div>
                        <div className="guessblock"><p>Government Form</p></div>
                        <div className="guessblock"><p>Main Culture</p></div>
                        <div className="guessblock"><p>Religion</p></div>
                        <div className="guessblock"><p>Development</p></div>
                    </div>
                )
                case "HOI4":
                    return (
                        <div className="guessgridHOI">
                            <div className="guessblock"><p>Country Name</p></div>
                            <div className="guessblock"><p>Population</p></div>
                            <div className="guessblock"><p>Military Factories</p></div>
                            <div className="guessblock"><p>Naval Dockyards</p></div>
                            <div className="guessblock"><p>Civilian Factories</p></div>
                            <div className="guessblock"><p>Continent</p></div>
                        </div>
                    )
    }
}


function Game({pickedTitle}) {
    let pickedGame = eu4_data;

    if(pickedTitle === "EU4") {
        pickedGame = eu4_data;
    } else if(pickedTitle === "HOI4") {
        pickedGame = hoi4_data;
    } else if(pickedTitle === "ANBENNAR") {
        pickedGame = anbennar_data;
    }

    const getRandomCountry = () => {
        return(pickedGame[Math.floor(Math.random() * pickedGame.length)])
    }

    const getCountryList = () => {
        var list = [];
        list = pickedGame.map(a => a.country_name)
        return(list)
    }

    const[pickedCountry, setPickedCountry] = useState(getRandomCountry());
    const[oldGuesses, setOldGuesses] = useState([]);
    const[guess, setGuess] = useState('');
    const[openPopUp, setOpenPopUp] = useState(false);
    const[guessSuggestions, setGuessSuggestions] = useState([]);
    const[guessesLeft, setGuessesLeft] = useState(5);

    
    useEffect(() => {
        setPickedCountry(pickedGame)
        setPickedCountry(getRandomCountry())
        setOldGuesses([])
        setOpenPopUp(false)
        setGuessSuggestions([])
        setGuess('')
        setGuessesLeft(5)

    }, [pickedTitle]);
    

    const handleKeypress = (e) => {
        const word = e.target.value
        setGuess(word)
        
        console.log("Guess: ", guess)
        console.log("Word: ", word)

        if(word.length === 0) {
            setGuessSuggestions([])
            return;
        }
        
        const suggestions = pickedGame.map((a) => a.country_name).filter((value) => value.toLowerCase().startsWith(word.toLowerCase()))

        setGuessSuggestions(suggestions);
    }

    const tryGuessing = (e) => {
        e.preventDefault();

        if(guess.toLowerCase() === pickedCountry.country_name.toLowerCase()) {
            console.log("Picked correctly");
            setOldGuesses(prev => [...prev, guess]
            )
            setOpenPopUp(true);
        } else {
            var guessesleftMinus = guessesLeft - 1
            setGuessesLeft(guessesleftMinus)
            if(guessesLeft > 0) {
                console.log("Wrong");
                setOldGuesses(prev => [...prev, guess])
                setGuess("")
                setGuessSuggestions([])
            } else {
                setOldGuesses(prev => [...prev, guess])
                console.log("Game over!")
            }
            }



        console.log("Guessed");
    }

    return (
        <div>
        
            <p>Country: {pickedCountry.country_name}, Guesses: {guessesLeft}</p>
        
            <form onSubmit={tryGuessing}>
                <label>Enter guess:</label>
                <input type="text" value={guess} onChange={handleKeypress}/>
                <SuggestionMap suggestions={guessSuggestions}/>
            </form>

            <Infographics pickedTitle={pickedTitle}/>

            {oldGuesses.map((guess, index) =>
                <WorldleGrid key={index}guess={guess}pickedCountry={pickedCountry} pickedGame={pickedGame} pickedTitle={pickedTitle}/>
            )}


            {openPopUp && <WinPopup pickedCountryName={pickedCountry.country_name} closeWinPopUp={() => setOpenPopUp(false)} showpopup={openPopUp}/>}



        </div>
    )
}

export default Game