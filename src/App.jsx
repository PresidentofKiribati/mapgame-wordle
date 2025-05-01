import React from 'react';
import Game from '../logic/Game';
import {Menubar} from 'primereact/menubar'
import "../src/App.css"


const Menu = ({items}) => {
  return (
    <Menubar model={items}/>
  )
}

function App() {

  const menuitems = [
    {
      label:"EU4",  
      command: () => alert("EU4")
    },
    {
      label:"Anbennar",  
      command: () => alert("Anbennar")
    },
    {
      label:"HOI4",  
      command: () => alert("HOI4")
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
      <Game />
    </div>
  );
}

export default App
