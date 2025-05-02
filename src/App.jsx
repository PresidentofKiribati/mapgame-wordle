import React from 'react';
import { useState } from 'react';
import Game from '../logic/Game';
import {Menubar} from 'primereact/menubar'
import "../src/App.css"


const Menu = ({items}) => {
  return (
    <Menubar model={items}/>
  )
}

function App() {
  const[pickedGame, setPickedGame] = useState("EU4");

  const menuitems = [
    {
      label:"EU4",  
      command: () => setPickedGame("EU4")
    },
    {
      label:"Anbennar",  
      command: () => setPickedGame("ANBENNAR")
    },
    {
      label:"HOI4",  
      command: () => setPickedGame("HOI4")
    },
    {
      label:"Scoreboard",  
      command: () => alert("Scoreboard")
    }
  ]

  return (


    <div>
      <Menu items={menuitems}/>
      <h1>EU4 hoi4 wordle</h1>
      <Game pickedTitle={pickedGame}/>
    </div>
  );
}

export default App
