// Suggestions under the input
const SuggestionMap = ({suggestions}) => {
    return (
            <ul className={suggestions.length > 0 ? "suggestionsopen" : "suggestions"}>
                {suggestions.map((s,i) => (
                    <li key={i} className="suggestion">
                        {s}
                    </li>
                ))}
            </ul>
    )
}

export default SuggestionMap;