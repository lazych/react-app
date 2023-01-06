import React, { useContext, useEffect, useState } from "react"
import Page from "./Page"
import { useParams } from "react-router-dom"
import Axios from "axios"
import StateContext from "../StateContext"

//components
import ProfilePosts from "./ProfilePosts"

function Profile() {
  const [profiledata, setProfiledata] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s128",
    isFollowing: false,
    counts: { postCount: "", followerCount: "", followingCount: "" },
  })
  const appState = useContext(StateContext)
  const { username } = useParams()

  useEffect(() => {
    const ourReq = Axios.CancelToken.source()

    async function fetchData() {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token }, { cancelToken: ourReq.token })
        setProfiledata(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    return () => {
      ourReq.cancel()
    }
  }, [])

  return (
    <Page title="Profile">
      <h2>
        <img className="avatar-small" src={profiledata.profileAvatar} /> {profiledata.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>
      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profiledata.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profiledata.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profiledata.counts.followingCount}
        </a>
      </div>
      <ProfilePosts />
    </Page>
  )
}

export default Profile
