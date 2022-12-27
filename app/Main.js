import React, { useState } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Axios from "axios"

Axios.defaults.baseURL = "http://localhost:8080"

//Components
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./components/Home"
import HomeGuest from "./components/HomeGuest"
import About from "./components/About"
import Terms from "./components/Terms"
import CreatePost from "./components/CreatePost"
import ViewSinglePost from "./components/ViewSinglePost"
import FlashMessages from "./components/FlashMessages"

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("appToken")))
  const [flashMessages, setFlashMessages] = useState([])

  function flashFunction(msg) {
    setFlashMessages((prev) => prev.concat(msg))
  }

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <FlashMessages messages={flashMessages} />
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
        <Route path="/About-us" element={<About />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/create-post" element={<CreatePost flashFunction={flashFunction} />} />
        <Route path="/post/:id" element={<ViewSinglePost />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

const root = createRoot(document.getElementById("app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
