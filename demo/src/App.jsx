import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Neuro from "./Components/Neuro/Neuro";
import Spiral from "./Components/Spiral/Spiral";
import Tap from "./Components/Tap/Tap";
import Reaction from "./Components/Reaction/Reaction";
import Voice from "./Components/Voice/Voice";



const App = () => {
  return(
    <div>
      <Navbar/>
      <Neuro/>
      <Spiral/>
      <Tap/>
      <Reaction/>
      <Voice/>
      
      
    </div>
  )
}

export default App;
