import React from "react"
import Page from "./Page"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <Page title="not found">
      <div className="text-center">
        <h2>we cannot find the page that you are looking for!</h2>
        <p>
          you can always go back to the <Link to="/">homepage</Link>
        </p>
      </div>
    </Page>
  )
}

export default NotFound
