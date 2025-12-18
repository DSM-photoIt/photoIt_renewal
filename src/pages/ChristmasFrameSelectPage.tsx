import styled from "@emotion/styled"
import { Flex } from "flex-yeo"
import { SnowEffect } from "../components"
import { RODOLPHFRAME, SELECTBUTTON, TREEFRAME } from "../assets"

export const ChristmasFrameSelectPage = () => {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Flex alignItems="end" gap={60}>
        <Flex isColumn gap={12} alignItems="center">
          <Img src={TREEFRAME} alt="산타"/>
          <BtnImg src={SELECTBUTTON} alt="셀렉트 버튼"/>
        </Flex>
        <Flex isColumn gap={12}>
          <Img src={RODOLPHFRAME} alt="루돌프"/>
          <BtnImg src={SELECTBUTTON} alt="셀렉트 버튼"/>
        </Flex>
      </Flex>
      <SnowEffect/>
    </Flex>
  )
}


const BtnImg = styled.img `
  cursor: pointer;
  max-width: 200px;
  width: 100%;
  min-width: 70px;
`

const Img = styled.img `
  max-width: 200px;
  width: 100%;
  min-height: 40px;
`