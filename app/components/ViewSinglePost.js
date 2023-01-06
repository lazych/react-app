import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"
import Page from "./Page"

function viewSinglePost() {
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

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    )
  const date = new Date(post.createdDate)
  const dateFormated = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
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
