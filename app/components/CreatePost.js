import Axios from "axios"
import React, { useState, useContext } from "react"
import Page from "./Page"
import { useNavigate } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function createPost() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const [title, setTitle] = useState()
  const [content, setContent] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("/create-post", { title, body: content, token: appState.user.token })
      // redirect to new post URL
      navigate(`/post/${response.data}`)
      // show flash message
      appDispatch({ type: "flashMessage", value: "Congrats! your new post was published!" })
      console.log("post submitted!")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Page title="create new post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={(e) => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={(e) => setContent(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  )
}

export default createPost
