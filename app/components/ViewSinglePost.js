import Axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ReactTooltip from "react-tooltip"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import LoadingDotsIcon from "./LoadingDotsIcon"
import NotFound from "./NotFound"
import Page from "./Page"

function viewSinglePost() {
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()

  useEffect(() => {
    const ourReq = Axios.CancelToken.source()

    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, { cancelToken: ourReq.token })
        setPost(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log("request was canceled")
      }
    }
    fetchPost()
    return () => {
      ourReq.cancel()
    }
  }, [])

  //loading is complete and post state is undefined.
  if (!isLoading && !post) {
    return <NotFound />
  }

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    )
  const date = new Date(post.createdDate)
  const dateFormated = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  function isOwner() {
    if (appState.loggedIn) {
      return appState.user.username == post.author.username
    }
    return false
  }

  async function handleClick() {
    const areYouSure = window.confirm("do you really want to delete this post")
    if (areYouSure) {
      try {
        const response = await Axios.delete(`/post/${id}`, { data: { token: appState.user.token } })
        if (response.data == "Success") {
          //display flashmessage
          appDispatch({ type: "flashMessage", value: "this post was succefully deleted" })
          //redirect to current user profile
          navigate(`/`)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        {isOwner() && (
          <span className="pt-2">
            <Link data-tip="Edit" data-for="edit" to={`/post/${post._id}/edit`} className="text-primary mr-2">
              <i className="fas fa-edit"></i>
            </Link>
            <ReactTooltip id="edit" className="custom-tooltip" />{" "}
            <a onClick={handleClick} data-tip="Delete" data-for="delete" className="delete-post-button text-danger">
              <i className="fas fa-trash"></i>
            </a>
            <ReactTooltip id="delete" className="custom-tooltip" />
          </span>
        )}
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormated}
      </p>

      <div className="body-content">{post.body}</div>
    </Page>
  )
}

export default viewSinglePost
