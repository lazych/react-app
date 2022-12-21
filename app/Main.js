import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"

//Components
import Footer from "./components/Footer"
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import About from "./components/About"
import Terms from "./components/Terms"

function Main() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeGuest />} exact />
        <Route path="/About-us" element={<About />} />
        <Route path="/Terms" element={<Terms />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

ReactDOM.render(<Main />, document.getElementById("app"))

if (module.hot) {
  module.hot.accept()
}
