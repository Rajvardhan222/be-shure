import { Route, Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Search from "./pages/Search"
import ShopList from "./pages/ShopList"
import Product from "./pages/Product"
import Login from "./pages/Login"
import ShopLanding from "./pages/ShopLanding"

function App() {
  

  return (
    <>
      <Routes>
        {/* // public routes */}

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shops" element={<ShopLanding />} />


        {/* <Router path="/products" /> */}

        <Route path="/shops/:userId" element={<ShopList />} />

        <Route path="/product-list/:shopId" element={<Product />} />





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
