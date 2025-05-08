// The menu uses the Menubar from Primereact
import {Menubar} from 'primereact/menubar'


// Returns the top menu bar that allows changing between games. Cool self-made logo aswell
const Menu = ({items}) => {
  return (
    <Menubar model={items} start={<img src="images/logo.png" style={{height: "40px", marginRight: "50px"}}/>}/>
  )
}

export default Menu;