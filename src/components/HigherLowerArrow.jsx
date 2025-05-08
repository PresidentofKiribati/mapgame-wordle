// Integer checker. Returns the value + arrows in the direction that the target is in
const HigherLowerArrow = ({value, targetValue}) => {
    if(value > targetValue) {
        return (
            <div className="guessblocklower">↓ {value} ↓</div>
        )
    } else if(value < targetValue) {
        return (
            <div className="guessblockhigher">↑ {value} ↑</div>
        )
    } else {
        return <div className="guessblockCorrect">{value}</div>
    }
}

export default HigherLowerArrow;