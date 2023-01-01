import React, { useReducer, useState } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Axios from "axios"

Axios.defaults.baseURL = "http://localhost:8080"

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

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
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("appToken")),
    flashMessages: [],
  }

  function ourReducer(state, action) {
    switch (action.type) {
      case "login":
        return { loggedIn: true, flashMessages: state.flashMessages }
      case "logout":
        return { loggedIn: false, flashMessages: state.flashMessages }
      case "flashMessage":
        return { loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value) }
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Header />
          <FlashMessages messages={state.flashMessages} />
          <Routes>
            <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
            <Route path="/About-us" element={<About />} />
            <Route path="/Terms" element={<Terms />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/post/:id" element={<ViewSinglePost />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const root = createRoot(document.getElementById("app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
