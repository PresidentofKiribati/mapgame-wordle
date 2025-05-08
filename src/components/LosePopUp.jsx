const LosePopUp = ({pickedCountryName, closeLosePopUp, showpopup, reset}) => {
    return (
        <div className={showpopup === true ? "winpopup open" : "winpopup"}>
            <div className="popupbox">
                <h2>Game Over. Out of Guesses!</h2>

                <p>
                    The correct country was: {pickedCountryName}
                </p>

                <button className="popupbutton" onClick={() => {closeLosePopUp(); reset();}}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default LosePopUp;