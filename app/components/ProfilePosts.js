import Axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import StateContext from "../StateContext"
import LoadingDotsIcon from "./LoadingDotsIcon"
import Post from "./Post"

function ProfilePosts() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const appState = useContext(StateContext)

  useEffect(() => {
    const ourReq = Axios.CancelToken.source()

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, { cancelToken: ourReq.token })
        setPosts(response.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
    return () => {
      ourReq.cancel()
    }
  }, [username])

  if (isLoading) return <LoadingDotsIcon />

  // DELETE POSTS
  // async function deleteReq(item) {
  //   const response = await Axios.delete(`/post/${item._id}`, { data: { token: appState.user.token } })
  //   console.log(response.data)
  // }

  // function handleDelete() {
  //   posts.map((item) => {
  //     return deleteReq(item)
  //   })
  // }
  //DELETE POSTS

  return (
    <div className="list-group">
      {/* <button onClick={handleDelete}> fake delete</button> */}
      {posts.map((post) => {
        return <Post post={post} key={post._id} noAuthor={true} />
      })}
    </div>
  )
}

export default ProfilePosts
