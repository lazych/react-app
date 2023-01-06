import React, { useEffect } from "react"
import Container from "./Container"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | complexApp`
    window.scrollTo(0, 0)
  }, [props.title])

  return <Container wide="true">{props.children}</Container>
}

export default Page
