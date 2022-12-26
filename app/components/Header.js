import React, { useState } from "react"
import { Link } from "react-router-dom"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderLoggedout from "./HeaderLoggedout"

function Header() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("appToken")))

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            {" "}
            ComplexApp{" "}
          </Link>
        </h4>
        {loggedIn ? <HeaderLoggedIn logIn={setLoggedIn} /> : <HeaderLoggedout logIn={setLoggedIn} />}
      </div>
    </header>
  )
}

export default Header
