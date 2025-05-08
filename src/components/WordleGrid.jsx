// HigherLowerArrow is imported for checking integers
import HigherLowerArrow from "./HigherLowerArrow.jsx";


// Actual wordle grid. Handles showcasing the guesses and checking if they are the same or different
const WorldleGrid = ({guess, pickedCountry, pickedGame, pickedTitle}) => {
    const guessObj = pickedGame.find((c) => c.country_name.toLowerCase() === guess.toLowerCase());

    if(!guessObj) {
        return null;
    }

    
    if(pickedTitle === "EU4" || pickedTitle === "ANBENNAR") {
        return (
            <div className="guessgrid">
                <div className={guessObj.country_name === pickedCountry.country_name ? "guessblockCorrect" : "guessblockWrong"}>{guessObj.country_name}</div>
                <div className={guessObj.government === pickedCountry.government ? "guessblockCorrect" : "guessblockWrong"}>{guessObj.government}</div>
                <div className={guessObj.main_culture === pickedCountry.main_culture ? "guessblockCorrect" : "guessblockWrong"}>{guessObj.main_culture}</div>
                <div className={guessObj.religion === pickedCountry.religion ? "guessblockCorrect" : "guessblockWrong"}>{guessObj.religion}</div>
                <div>{<HigherLowerArrow value={guessObj.total_development} targetValue={pickedCountry.total_development}/>}</div>
                <div className={guessObj.continent === pickedCountry.continent ? "guessblockCorrect" : "guessblockWrong"}>{guessObj.continent}</div>
            </div>
        )
    } else if(pickedTitle === "HOI4") {
        return (
            <div className="guessgrid">
                <div className={guessObj.country_name === pickedCountry.country_name ? "guessblockCorrect" : "guessblockWrong"}>{guessObj.country_name}</div>
                <div>{<HigherLowerArrow value={guessObj.population} targetValue={pickedCountry.population}/>}</div>
                <div>{<HigherLowerArrow value={guessObj.military_factories} targetValue={pickedCountry.military_factories}/>}</div>
                <div>{<HigherLowerArrow value={guessObj.naval_dockyards} targetValue={pickedCountry.naval_dockyards}/>}</div>
                <div>{<HigherLowerArrow value={guessObj.civilian_factories} targetValue={pickedCountry.civilian_factories}/>}</div>
                <div className={guessObj.continent === pickedCountry.continent ? "guessblockCorrect" : "guessblockWrong"} >{guessObj.continent}</div>
            </div>
        )

    }
    
}

export default WorldleGrid;