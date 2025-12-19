import styled from "@emotion/styled"
import { PRINTBTN, SHAREBTN } from "../assets"
import { Flex } from "flex-yeo"

export const ResultPage = () => {
  return (
    <Flex width="100vw" height="100vh" alignItems="center" justifyContent="center">
      <Flex isColumn gap={24} alignItems="center">
        <div></div>
        <Flex gap={12} alignItems="center">
          <PrintBtn src={PRINTBTN} alt="print"/>
          <ShareBtn src={SHAREBTN} alt="share"/>
        </Flex>
      </Flex>
    </Flex>
  )
}

const PrintBtn = styled.img `
  cursor: pointer;
  max-width: 200px;
  width: 100%;
  min-width: 70px;
`

const ShareBtn = styled.img`
  width: 80px;
  cursor: pointer;
`
