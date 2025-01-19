import React from "react";
import RegistrationForm from "./Components/Form/Form";
import Navbar from "./Components/Navbar/Navbar";
import Neuro from "./Components/Neuro/Neuro";
import Spiral from "./Components/Spiral/Spiral";
import Tap from "./Components/Tap/Tap";
import Reaction from "./Components/Reaction/Reaction";
import Voice from "./Components/Voice/Voice";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RegistrationForm />
    },
    {
      path: "/register",
      element:
        <div>
             <h2 className="text-center heading">🧠 Neuro Sketch - Health Assessment</h2>
          <Spiral />
          <Tap />
          <Reaction />
          <Voice />
          <Neuro />

        </div>

    }
  ]
)


const App = () => {
  return (
    <div>



      <div>
        <RouterProvider router={router} />
      </div>



    </div>
  )
}

export default App;
