import { Flex } from "flex-yeo"
import { SnowEffect } from "../components"
import styled from "@emotion/styled"
import { BREAD, EXITBTN, HAT, SELECTBUTTON } from "../assets"
import { useNavigate } from "react-router-dom"

export const FrameSelectPage = () => {
  const navigate = useNavigate();

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <ExitBtn src={EXITBTN} onClick={() => navigate(-1)}/>
      <Flex alignItems="end" gap={60}>
        <Flex isColumn gap={12} alignItems="center">
          <Img src={BREAD} alt="붕어빵"/>
          <BtnImg onClick={() => navigate('/winter-snack-frame')} src={SELECTBUTTON} alt="셀렉트 버튼"/>
        </Flex>
        <Flex isColumn gap={12}>
          <Img src={HAT} alt="산타모자"/>
          <BtnImg onClick={() => navigate('/christmas-frame')} src={SELECTBUTTON} alt="셀렉트 버튼"/>
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