import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"

function ProfilePosts() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`)
        setPosts(response.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [])

  if (isLoading) return <LoadingDotsIcon />

  return (
    <div className="list-group">
      {posts.map((posts) => {
        const date = new Date(posts.createdDate)
        const dateFormated = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

        return (
          <Link key={posts._id} to={`/post/${posts._id}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={posts.author.avatar} /> <strong>{posts.title}</strong>
            <span className="text-muted small"> on {dateFormated} </span>
          </Link>
        )
      })}
    </div>
  )
}

export default ProfilePosts
