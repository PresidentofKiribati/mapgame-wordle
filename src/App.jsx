import React from 'react';
import { useState } from 'react';
import Game from '../logic/Game';
import {Menubar} from 'primereact/menubar'
import "../src/App.css"
import Scoreboard from '../logic/Scoreboard';





const Menu = ({items}) => {
  return (
    <Menubar model={items}/>
  )
}

function App() {
  const[pickedGame, setPickedGame] = useState("EU4");
  const[showScoreboard, setShowScoreboard] = useState(false);
  const[showGame, setShowGame] = useState(false);


  const menuitems = [
    {
      label:"EU4",  
      command: () => {
        setShowGame(true)
        setPickedGame("EU4")
        setShowScoreboard(false)
      }
    },
    {
      label:"Anbennar",  
      command: () => {
        setShowGame(true)
        setPickedGame("ANBENNAR")
        setShowScoreboard(false)
      }
    },
    {
      label:"HOI4",  
      command: () => {
        setShowGame(true)
        setPickedGame("HOI4")
        setShowScoreboard(false)
      }
    },
    {
      label:"Scoreboard",  
      command: () => {
        setShowGame(false)
        setShowScoreboard(true)
      }
    }
  ]

  return (


    <div>
      <Menu items={menuitems}/>
      <h1>EU4 hoi4 wordle</h1>
      {showGame && <Game pickedTitle={pickedGame}/>}
      {showScoreboard && <Scoreboard/>}
    </div>
  );
}

export default App
