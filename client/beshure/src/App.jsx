import { Route, Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"

function App() {
  

  return (
    <>
      <Routes>
        {/* // private routes */}

        <Route path="/" element={<Register />} />
        {/* <Router path="/products" /> */}





        {/* // public routes  */}

        {/* <Router path="/" />
        <Router path="/login" />
        <Router path="/register" />

        <Router path="add-your-shop" /> */}

      </Routes>
    </>
  )
}

export default App
