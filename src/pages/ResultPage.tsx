import styled from "@emotion/styled"
import { BREADFRAME, EXITBTN, PRINTBTN, RUDOLPHFRAME, SANTAFRAME, SHAREBTN, SWEETPOTATOFRAME } from "../assets"
import { Flex } from "flex-yeo"
import { useParams } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import html2canvas from 'html2canvas'
import { saveAs } from "file-saver"
import { QRCodeCanvas } from "qrcode.react";


const FRAME_IMAGES: Record<string, string> = {
  sweetpotato1: SWEETPOTATOFRAME,
  bread1: BREADFRAME,
  santa1: SANTAFRAME,
  rudolph1: RUDOLPHFRAME,
}

export const ResultPage = () => {
  const {id} = useParams()
  const frameRef = useRef<HTMLDivElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isModal, setIsModal] = useState<boolean>(false)

  const frameImage = id ? FRAME_IMAGES[id] : null
  const photos = localStorage.getItem("webcamPhotos")

  const webcamPhotos: string[] = photos
    ? JSON.parse(photos)
    : []

  // 이미지 로딩 확인
  useEffect(() => {
    const images = frameRef.current?.querySelectorAll('img')
    if (!images || images.length === 0) return

    let loadedCount = 0
    const totalImages = images.length

    const checkAllLoaded = () => {
      loadedCount++
      if (loadedCount === totalImages) {
        setImagesLoaded(true)
      }
    }

    images.forEach((img) => {
      if (img.complete) {
        checkAllLoaded()
      } else {
        img.addEventListener('load', checkAllLoaded)
      }
    })

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', checkAllLoaded)
      })
    }
  }, [webcamPhotos, frameImage])

  const printClick = async () => {
    if (!frameRef.current || !imagesLoaded) {
      alert('이미지가 아직 로딩 중입니다. 잠시만 기다려주세요.')
      return
    }

    try {
      const canvas = await html2canvas(frameRef.current, {
        backgroundColor: '#ffffff',
        scale: 3,
        useCORS: true, 
        logging: false,
        imageTimeout: 0,
      })
      
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'photoIt.png')
        }
      })
    } catch (error) {
      console.error('캡처 실패:', error)
      alert('이미지 다운로드에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <Flex width="100vw" height="100vh" alignItems="center" justifyContent="center">
      <Flex isColumn gap={24} alignItems="center">
        <FrameWrapper ref={frameRef}>
          <Flex isColumn gap={17} paddingTop="50px" paddingLeft="17px">
            {webcamPhotos.map((photo, index) => (
              <FrameContent 
                key={index}
                src={photo} 
                alt={`${index + 1}번째 사진`}
                onError={(e) => {
                  console.error(`이미지 ${index + 1} 로드 실패`)
                  e.currentTarget.style.backgroundColor = '#f0f0f0'
                }}
                crossOrigin="anonymous"
              />
            ))}
          </Flex>
          {frameImage && <FrameImg src={frameImage} alt="frame" crossOrigin="anonymous" />}
        </FrameWrapper>
        <Flex gap={12} alignItems="center">
          <PrintBtn 
            onClick={printClick} 
            src={PRINTBTN} 
            alt="print"
            style={{ 
              opacity: imagesLoaded ? 1 : 0.5,
              cursor: imagesLoaded ? 'pointer' : 'not-allowed'
            }}
          />
          {/* <ShareBtn onClick={() => setIsModal(true)} src={SHAREBTN} alt="share"/> */}
        </Flex>
      </Flex>
      {/* {isModal && (
      <QRModal>
        <ExitBtn src={EXITBTN} onClick={() => setIsModal(false)}/>
        <QRCodeCanvas
          value="https://photoit.vercel.app/result/123"
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </QRModal>
      )} */}
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

const QRModal = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: #0000004f;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FrameContent = styled.img`
  width: 165px;
  height: 106px;
  filter: brightness(1.1) contrast(1) saturate(1.25) sepia(0.07);
`

const FrameWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 600px;
  background-color: white;
`

const FrameImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 200px;
  z-index: 5;
`

const PrintBtn = styled.img`
  cursor: pointer;
  max-width: 200px;
  width: 100%;
  min-width: 70px;
`

const ShareBtn = styled.img`
  width: 80px;
  cursor: pointer;
`