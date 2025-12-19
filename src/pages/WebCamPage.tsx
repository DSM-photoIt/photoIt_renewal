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

const STAGE_WIDTH = 900
const STAGE_HEIGHT = 567
const TOTAL_SHOTS = 4

const COUNT_IMAGES = [ONE, TWO, THREE, FOUR]
const EMPTY_FRAMES = ["", "", "", ""]

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

    if (!webcamRef.current?.video) return

    const video = webcamRef.current.video

    const canvas = document.createElement("canvas")
    canvas.width = STAGE_WIDTH
    canvas.height = STAGE_HEIGHT

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const videoWidth = video.videoWidth
    const videoHeight = video.videoHeight

    const stageRatio = STAGE_WIDTH / STAGE_HEIGHT
    const videoRatio = videoWidth / videoHeight

    let sx = 0
    let sy = 0
    let sw = videoWidth
    let sh = videoHeight

    if (videoRatio > stageRatio) {
      sw = videoHeight * stageRatio
      sx = (videoWidth - sw) / 2
    } else {
      sh = videoWidth / stageRatio
      sy = (videoHeight - sh) / 2
    }

    ctx.save()
    ctx.translate(STAGE_WIDTH, 0)
    ctx.scale(-1, 1)

    ctx.drawImage(
      video,
      sx,
      sy,
      sw,
      sh,
      0,
      0,
      STAGE_WIDTH,
      STAGE_HEIGHT
    )

    ctx.restore()

    const frameSrc = frameArray[shotIndex]

    if (frameSrc) {
      const frameImg = new Image()
      frameImg.src = frameSrc
      frameImg.onload = () => {
        ctx.drawImage(frameImg, 0, 0, STAGE_WIDTH, STAGE_HEIGHT)
        saveCanvas(canvas)
      }
    } else {
      saveCanvas(canvas)
    }
  }

  const saveCanvas = (canvas: HTMLCanvasElement) => {
    const imageSrc = canvas.toDataURL("image/png", 1)

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
