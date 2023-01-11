import React, { useContext, useEffect } from "react"
import Page from "./Page"
import { NavLink, Route, Routes, useParams } from "react-router-dom"
import Axios from "axios"
import StateContext from "../StateContext"
import { useImmer } from "use-immer"

//components
import ProfilePosts from "./ProfilePosts"
import ProfileFollowers from "./ProfileFollowers"
import ProfileFollowing from "./ProfileFollowing"

function Profile() {
  const [state, setState] = useImmer({
    followActionLoading: false,
    startFollowingReqCount: 0,
    stopFollowingReqCount: 0,
    profiledata: {
      profileUsername: "...",
      profileAvatar: "https://gravatar.com/avatar/placeholder?s128",
      isFollowing: false,
      counts: { postCount: "", followerCount: "", followingCount: "" },
    },
  })
  const appState = useContext(StateContext)
  const { username } = useParams()

  useEffect(() => {
    const ourReq = Axios.CancelToken.source()

    async function fetchData() {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token }, { cancelToken: ourReq.token })
        setState((draft) => {
          draft.profiledata = response.data
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    return () => {
      ourReq.cancel()
    }
  }, [username])

  //start following feature

  function handleFollowing() {
    setState((draft) => {
      draft.startFollowingReqCount++
      console.log(draft.startFollowingReqCount)
    })
  }

  useEffect(() => {
    if (state.startFollowingReqCount) {
      const ourReq = Axios.CancelToken.source()
      setState((draft) => {
        draft.followActionLoading = true
      })

      async function fetchData() {
        try {
          await Axios.post(`/addFollow/${state.profiledata.profileUsername}`, { token: appState.user.token }, { cancelToken: ourReq.token })
          setState((draft) => {
            draft.profiledata.isFollowing = true
            draft.profiledata.counts.followerCount++
            draft.followActionLoading = false
          })
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
      return () => {
        ourReq.cancel()
      }
    }
  }, [state.startFollowingReqCount])

  //stop following feature

  function handleStopFollowing() {
    setState((draft) => {
      draft.stopFollowingReqCount++
    })
  }

  useEffect(() => {
    if (state.stopFollowingReqCount) {
      const ourReq = Axios.CancelToken.source()
      setState((draft) => {
        draft.followActionLoading = true
      })

      async function fetchData() {
        try {
          await Axios.post(`/removeFollow/${state.profiledata.profileUsername}`, { token: appState.user.token }, { cancelToken: ourReq.token })
          setState((draft) => {
            draft.profiledata.isFollowing = false
            draft.profiledata.counts.followerCount--
            draft.followActionLoading = false
          })
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
      return () => {
        ourReq.cancel()
      }
    }
  }, [state.stopFollowingReqCount])

  return (
    <Page title="Profile">
      <h2>
        <img className="avatar-small" src={state.profiledata.profileAvatar} /> {state.profiledata.profileUsername}
        {appState.loggedIn && !state.profiledata.isFollowing && appState.user.username != state.profiledata.profileUsername && state.profiledata.profileUsername != "..." && (
          <button disabled={state.followActionLoading} onClick={handleFollowing} className="btn btn-primary btn-sm ml-2">
            Follow <i className="fas fa-user-plus"></i>
          </button>
        )}
        {appState.loggedIn && state.profiledata.isFollowing && appState.user.username != state.profiledata.profileUsername && state.profiledata.profileUsername != "..." && (
          <button disabled={state.followActionLoading} onClick={handleStopFollowing} className="btn btn-danger btn-sm ml-2">
            stop Following <i className="fas fa-user-times"></i>
          </button>
        )}
      </h2>
      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <NavLink to={`/profile/${state.profiledata.profileUsername}`} end className="nav-item nav-link">
          Posts: {state.profiledata.counts.postCount}
        </NavLink>
        <NavLink to={`/profile/${state.profiledata.profileUsername}/followers`} className="nav-item nav-link">
          Followers: {state.profiledata.counts.followerCount}
        </NavLink>
        <NavLink to={`/profile/${state.profiledata.profileUsername}/following`} className="nav-item nav-link">
          Following: {state.profiledata.counts.followingCount}
        </NavLink>
      </div>

      <Routes>
        <Route path="/" element={<ProfilePosts />} />
        <Route path="followers" element={<ProfileFollowers />} />
        <Route path="following" element={<ProfileFollowing />} />
      </Routes>
    </Page>
  )
}

export default Profile
