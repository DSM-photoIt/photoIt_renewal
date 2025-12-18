import styled from "@emotion/styled"
import { Flex } from "flex-yeo"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Webcam from "react-webcam"
import {
  RUDOLPHFRAMECONTENT,
  SANTAFRAMECONTENT,
  BREADFRAMECONTENT,
  CAMERABTN,
} from "../assets"

type FrameKey = string

const EMPTY_FRAMES = ["", "", "", ""]
const TOTAL_SHOTS = 4

const videoConstraints = {
  width: { ideal: 1920 },
  height: { ideal: 1080 },
  facingMode: "user",
}

const FRAME_MAP: Record<FrameKey, string[]> = {
  santa1: [
    SANTAFRAMECONTENT,
    RUDOLPHFRAMECONTENT,
    "",
    "",
  ],
  bread1: [
    "",
    BREADFRAMECONTENT,
    "",
    "",
  ],
}

export const WebCamPage = () => {
  const { id } = useParams<{ id: string }>()
  const webcamRef = useRef<Webcam>(null)
  const navigate = useNavigate()

  const [frameArray, setFrameArray] = useState<string[]>(EMPTY_FRAMES)
  const [shotIndex, setShotIndex] = useState(0)
  const [capturedImages, setCapturedImages] = useState<string[]>([])

  useEffect(() => {
    if (!id) {
      setFrameArray(EMPTY_FRAMES)
      return
    }
    setFrameArray(FRAME_MAP[id] ?? EMPTY_FRAMES)
  }, [id])

  const handleCapture = () => {
    if (capturedImages.length >= 4) {
      navigate("/result")
      return
    }

    if (!webcamRef.current) return

    const imageSrc = webcamRef.current.getScreenshot()
    if (!imageSrc) return

    const nextImages = [...capturedImages, imageSrc]
    setCapturedImages(nextImages)

    localStorage.setItem("webcamPhotos", JSON.stringify(nextImages))

    if (shotIndex < TOTAL_SHOTS - 1) {
      setShotIndex(prev => prev + 1)
    }
    
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      isColumn
      gap={20}
    >
      <CameraStage>
        <Webcam
          ref={webcamRef}
          audio={false}
          videoConstraints={videoConstraints}
          screenshotFormat="image/png"
          screenshotQuality={1}
          mirrored
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {frameArray[shotIndex] && (
          <FrameContent src={frameArray[shotIndex]} />
        )}
      </CameraStage>

      <CameraBtn
        src={CAMERABTN}
        alt="카메라 버튼"
        onClick={handleCapture}
      />
    </Flex>
  )
}


const CameraStage = styled.div`
  width: 900px;
  height: 567px;
  position: relative;
  overflow: hidden;
`

const FrameContent = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 900px;
  height: 567px;
  object-fit: contain;
  pointer-events: none;
  z-index: 2;
`

const CameraBtn = styled.img`
  width: 80px;
  cursor: pointer;
`
