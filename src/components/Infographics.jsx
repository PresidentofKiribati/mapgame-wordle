// Top bar of the wordle grid, for user readability
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
                    <div className="guessblock"><p>Continent</p></div>
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
                        <div className="guessblock"><p>Continent</p></div>
                    </div>
                )
                case "HOI4":
                    return (
                        <div className="guessgrid">
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

export default Infographics;