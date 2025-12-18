import styled from "@emotion/styled"
import { BUTTON, LOGO } from "../assets"
import { Flex } from "flex-yeo"
import { SnowEffect } from "../components"

export const Main = () => {
  return (
    <Back>
      <Flex isColumn gap={8} alignItems="center">
        <LogoImg src={LOGO} alt="logo" />
        <BtnImg src={BUTTON} alt="button"/> 
      </Flex>
      <SnowEffect/>
    </Back>
  )
}

const BtnImg = styled.img `
  cursor: pointer;
  max-width: 200px;
  width: 100%;
  min-width: 70px;
`
const Back = styled.div `
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LogoImg = styled.img `
  width: 100%;
  max-width: 700px;
  min-width: 100px;
`

