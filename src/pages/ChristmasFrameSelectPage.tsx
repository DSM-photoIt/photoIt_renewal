import styled from "@emotion/styled"
import { Flex } from "flex-yeo"
import { SnowEffect } from "../components"
import { EXITBTN, RUDOLPHFRAMEIMG, SELECTBUTTON, TREEFRAME } from "../assets"
import { useNavigate } from "react-router-dom"

export const ChristmasFrameSelectPage = () => {
  const navigate = useNavigate();

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <ExitBtn src={EXITBTN} onClick={() => navigate(-1)}/>
      <Flex alignItems="end" gap={60}>
        <Flex isColumn gap={12} alignItems="center">
          <Img src={TREEFRAME} alt="산타"/>
          <BtnImg onClick={() => navigate('/capture/santa1')} src={SELECTBUTTON} alt="셀렉트 버튼"/>
        </Flex>
        <Flex isColumn gap={12}>
          <Img src={RUDOLPHFRAMEIMG} alt="루돌프"/>
          <BtnImg onClick={() => navigate('/capture/rudolph1')} src={SELECTBUTTON} alt="셀렉트 버튼"/>
        </Flex>
      </Flex>
      <SnowEffect/>
    </Flex>
  )
}

const ExitBtn = styled.img `
  cursor: pointer;
  width: 100%;
  max-width: 60px;
  min-height: 20px;
  position: fixed;
  top: 20px;
  left: 20px;
`


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