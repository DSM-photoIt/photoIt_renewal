import styled from "@emotion/styled"
import { BACKGROUND } from "../assets"
import { Outlet } from "react-router-dom"

export const AppLayout = () => {
  return (
    <div>
      <Main>
        <Outlet/>
      </Main>
    </div>
  )
}
const Main = styled.main `
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${BACKGROUND});
`

