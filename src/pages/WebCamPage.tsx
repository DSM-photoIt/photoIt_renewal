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
  ONE,
  TWO,
  THREE,
  FOUR,
} from "../assets"

type FrameKey = string

const COUNT_IMAGES = [ONE, TWO, THREE, FOUR]
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
  const [isModal, setIsModal] = useState(false)
  const [displayIndex, setDisplayIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!id) {
      setFrameArray(EMPTY_FRAMES)
      return
    }
    setFrameArray(FRAME_MAP[id] ?? EMPTY_FRAMES)
  }, [id])

  const handleCapture = () => {
    if (capturedImages.length >= TOTAL_SHOTS) {
      navigate(`/result/${id}`)
      return
    }

    if (!webcamRef.current) return

    const imageSrc = webcamRef.current.getScreenshot()
    if (!imageSrc) return

    setDisplayIndex(shotIndex)
    setIsModal(true)

    setTimeout(() => {
      setIsModal(false)
      setDisplayIndex(null)
    }, 1500)

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

      <CameraBtn src={CAMERABTN} alt="camera" onClick={handleCapture} />

      {isModal && displayIndex !== null && (
        <ModalBack>
          <Number
            src={COUNT_IMAGES[displayIndex]}
            alt={`count-${displayIndex + 1}`}
          />
        </ModalBack>
      )}
    </Flex>
  )
}

const Number = styled.img`
  width: 120px;
`

const ModalBack = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00000043;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`

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
