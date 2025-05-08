// React 
import React from 'react';
import { useState } from 'react';

// Components as well as actual game
import Game from './components/Game';
import Menu from './components/Menu';
import Scoreboard from './components/Scoreboard';

// Css styles
import "../src/App.css"


// App
function App() {
  const[pickedGame, setPickedGame] = useState("EU4");
  const[showScoreboard, setShowScoreboard] = useState(false);
  const[showGame, setShowGame] = useState(false);

  // Items that are used for the top menu bar aswell as what clicking them does
  const menuitems = [
    {
      label:<div style={{color:"#0f2027"}}>EU4</div>,  
      command: () => {
        setShowGame(true)
        setPickedGame("EU4")
        setShowScoreboard(false)
      }
    },
    {
      label:<div style={{color:"#0f2027"}}>Anbennar</div>,  
      command: () => {
        setShowGame(true)
        setPickedGame("ANBENNAR")
        setShowScoreboard(false)
      }
    },
    {
      label:<div style={{color:"#0f2027"}}>HOI4</div>,  
      command: () => {
        setShowGame(true)
        setPickedGame("HOI4")
        setShowScoreboard(false)
      }
    },
    {
      label:<div style={{color:"#0f2027"}}>Scoreboard</div>,  
      command: () => {
        setShowGame(false)
        setShowScoreboard(true)
      }
    }
  ]

  return (
    <div>
      <Menu items={menuitems}/>
      {showGame && <Game pickedTitle={pickedGame}/>}
      {showScoreboard && <Scoreboard/>}
    </div>
  );
}

export default App
