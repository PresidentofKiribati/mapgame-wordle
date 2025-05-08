// React and it's parts
import React, { useEffect, useState } from "react";


// Data from json-files
import eu4_data from "../data/eu4_data.json"
import anbennar_data from "../data/anbennar_data.json"
import hoi4_data from "../data/hoi4_data.json"

// Firebase
import { initializeApp } from "firebase/app";
import {doc, getDoc, getFirestore, increment, setDoc, updateDoc} from "firebase/firestore";

// Comps
import LosePopUp from "./LosePopUp";
import WorldleGrid from "./WordleGrid";
import SuggestionMap from "./SuggestionMap";
import Infographics from "./Infographics";


// Firebase keys from .env
const firebaseConfig = {
    apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId:import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId:import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};


// Firebase initialization and sendPlayer, which sends the name of the player to Firebase
const appX = initializeApp(firebaseConfig);
const dbX = getFirestore(appX);

const sendPlayer = async (playerName) => {
    try {
        const playerRef = doc(dbX, "scoreboard", playerName)
        const playerSnap = await getDoc(playerRef)
    
        if(playerSnap.exists()) {
            updateDoc(playerRef, {plays: increment(1)})
        } else {
            setDoc(playerRef, {plays: 1})
        }
    } catch(error) {
        console.error("Error sending score to firebase: ", error)
    }
}



// Pop up on guessing the correct country
const WinPopup = ({pickedCountryName, closeWinPopUp, showpopup, reset}) => {
    const [playerName, setPlayerName] = useState('');

    const trySubmitting = (e) => {
        closeWinPopUp()
        sendPlayer(playerName)
        reset()
    }

    return (
        <div className={showpopup === true ? "winpopup open" : "winpopup"}>
            <div className="popupbox">
                <h2>Congratulations!</h2>

                <p>
                    The correct country was: {pickedCountryName}
                </p>

                <form onSubmit={trySubmitting}>
                    <label>Give name:</label>
                    <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)}></input>
                    <button className="popupbutton" type="submit">Submit and close</button>
                </form>
            </div>

        </div>
    )

}

// ACtual game
function Game({pickedTitle}) {
    let pickedGame = eu4_data;


    // Country data setters, used for useEffect hook
    if(pickedTitle === "EU4") {
        pickedGame = eu4_data;
    } else if(pickedTitle === "HOI4") {
        pickedGame = hoi4_data;
    } else if(pickedTitle === "ANBENNAR") {
        pickedGame = anbennar_data;
    }

    // Picks random country for replayability
    const getRandomCountry = () => {
        return(pickedGame[Math.floor(Math.random() * pickedGame.length)])
    }


    // useState-pile
    const[pickedCountry, setPickedCountry] = useState(getRandomCountry());
    const[oldGuesses, setOldGuesses] = useState([]);
    const[guess, setGuess] = useState('');
    const[openWinPopUp, setOpenWinPopUp] = useState(false);
    const[openLosePopup, setOpenLosePopup] = useState(false);
    const[guessSuggestions, setGuessSuggestions] = useState([]);
    const[guessesLeft, setGuessesLeft] = useState(5);

    
    // Resets the game when game title is changed
    useEffect(() => {
        resetGame()
    }, [pickedTitle]);


    // Game reset function. Used elsewhere aswell
    const resetGame = () => {
        const newCountry = getRandomCountry()
        setPickedCountry(newCountry)
        setOldGuesses([])
        setOpenWinPopUp(false)
        setGuessSuggestions([])
        setGuess('')
        setGuessesLeft(5)
        
        // CHEAT CONSOLE LOG IF GAME IF TOO HARD (IT IS)
        console.log("Picked country:", newCountry.country_name)
    }


    // Updates guess-input on keypress as well as changes suggestions
    const handleKeypress = (e) => {
        const word = e.target.value
        setGuess(word)

        if(word.length === 0) {
            setGuessSuggestions([])
            return;
        }
        
        const suggestions = pickedGame.map((a) => a.country_name).filter((value) => value.toLowerCase().startsWith(word.toLowerCase()))

        setGuessSuggestions(suggestions);
    }

    // Autocomplete from tab. Easily the best addition ↓↓
    const handleTabCheck = (e) => {
        if(e.key === "Tab" && guessSuggestions.length > 0) {
            e.preventDefault();
            setGuess(guessSuggestions[0]);
            setGuessSuggestions([])
        }
    }

    // Handles guessing
    const tryGuessing = (e) => {
        e.preventDefault();


        // If the guess is wrongly written, doesn't remove guesses
        if(!(pickedGame.find((country) => country.country_name.toLowerCase() === guess.toLowerCase()))) {
            return;
        }

        // Checking if guess is correct or if guesses are out
        if(guess.toLowerCase() === pickedCountry.country_name.toLowerCase()) {
            setOldGuesses(prev => [...prev, guess]);
            setOpenWinPopUp(true);
        } else {
            var guessesleftMinus = guessesLeft - 1
            setGuessesLeft(guessesleftMinus)
            if(guessesLeft > 1) {
                setOldGuesses(prev => [...prev, guess])
                setGuess("")
                setGuessSuggestions([])
            } else {
                setOldGuesses(prev => [...prev, guess])
                setOpenLosePopup(true);
            }
            }
    }

    return (
        <div>
            <h2 className="titlecard">GUESS THE COUNTRY: {pickedTitle}</h2>
            <div className="guessbar">
                <form onSubmit={tryGuessing}>
                    <label>Enter guess:</label>
                    <input type="text" value={guess} onChange={handleKeypress} onKeyDown={handleTabCheck}/>
                    <SuggestionMap suggestions={guessSuggestions}/>
                </form>
                <p>Guesses left: {guessesLeft}</p>
            </div>


            <Infographics pickedTitle={pickedTitle}/>

            {oldGuesses.map((guess, index) =>
                <WorldleGrid key={index}guess={guess}pickedCountry={pickedCountry} pickedGame={pickedGame} pickedTitle={pickedTitle}/>
            )}


            {openWinPopUp && <WinPopup pickedCountryName={pickedCountry.country_name} closeWinPopUp={() => setOpenWinPopUp(false)} showpopup={openWinPopUp} reset={resetGame}/>}
            {openLosePopup && <LosePopUp pickedCountryName={pickedCountry.country_name} closeLosePopUp={() => setOpenLosePopup(false)} showpopup={openLosePopup} reset={resetGame}/>}


        </div>
    )
}

export default Game