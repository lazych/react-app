import Axios from "axios"
import React, { useContext, useEffect } from "react"
import { useImmer } from "use-immer"
import StateContext from "../StateContext"
import LoadingDotsIcon from "./LoadingDotsIcon"
import Page from "./Page"
import Post from "./Post"

function Home() {
  const [state, setState] = useImmer({
    isLoading: true,
    feed: [],
  })
  const appState = useContext(StateContext)

  useEffect(() => {
    const ourReq = Axios.CancelToken.source()
    async function fetchPosts() {
      try {
        const response = await Axios.post("/getHomeFeed", { token: appState.user.token }, { cancelToken: ourReq.token })
        console.log(response.data)
        setState((draft) => {
          draft.isLoading = false
          draft.feed = response.data
        })
      } catch (error) {
        console.log(error)
        console.log(`there's an error fetching data`)
      }
    }
    fetchPosts()
    return () => {
      ourReq.cancel()
    }
  }, [])

  if (state.isLoading) {
    return <LoadingDotsIcon />
  }

  return (
    <Page title="Your feed">
      {state.feed.length && (
        <>
          <h2 className="text-center mb-4">The latest from those you follow</h2>
          <div className="list-group">
            {state.feed.map((post) => {
              return <Post post={post} key={post._id} />
            })}
          </div>
        </>
      )}
      {state.feed.length == 0 && (
        <>
          <h2 className="text-center">
            Hello <strong>{appState.user.username}</strong>, your feed is empty.
          </h2>
          <p className="lead text-muted text-center">Your feed displays the latest posts from the people you follow. If you don't have any friends to follow that's okay; you can use the "Search" feature in the top menu bar to find content written by people with similar interests and then follow them.</p>
        </>
      )}
    </Page>
  )
}

export default Home
