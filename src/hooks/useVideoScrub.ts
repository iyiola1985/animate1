import { useCallback, useEffect, useRef, type RefObject } from 'react'

const SENSITIVITY = 0.8
const SEEK_EPSILON = 0.01

export function useVideoScrub(videoRef: RefObject<HTMLVideoElement | null>) {
  const prevXRef = useRef<number | null>(null)
  const targetTimeRef = useRef(0)
  const seekingRef = useRef(false)

  const seek = useCallback(() => {
    const video = videoRef.current
    if (!video || seekingRef.current) return

    const duration = video.duration
    if (!Number.isFinite(duration) || duration <= 0) return

    const nextTime = Math.min(Math.max(targetTimeRef.current, 0), duration)
    targetTimeRef.current = nextTime
    if (Math.abs(video.currentTime - nextTime) < SEEK_EPSILON) return

    seekingRef.current = true
    video.currentTime = nextTime
  }, [videoRef])

  const onSeeked = useCallback(() => {
    seekingRef.current = false
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration)) return
    if (Math.abs(video.currentTime - targetTimeRef.current) > SEEK_EPSILON) {
      seek()
    }
  }, [seek, videoRef])

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const currentX = event.clientX
      if (prevXRef.current === null) {
        prevXRef.current = currentX
        return
      }

      const delta = currentX - prevXRef.current
      prevXRef.current = currentX

      const video = videoRef.current
      if (!video || window.innerWidth <= 0) return

      const duration = video.duration
      if (!Number.isFinite(duration) || duration <= 0) return

      const offset = (delta / window.innerWidth) * SENSITIVITY * duration
      targetTimeRef.current = Math.min(
        Math.max(targetTimeRef.current + offset, 0),
        duration,
      )
      seek()
    }

    const onLoadedMetadata = () => {
      const video = videoRef.current
      if (!video || !Number.isFinite(video.duration)) return
      video.pause()
      targetTimeRef.current = Math.min(
        Math.max(video.currentTime, 0),
        video.duration,
      )
    }

    const video = videoRef.current
    window.addEventListener('mousemove', onMouseMove)
    video?.addEventListener('loadedmetadata', onLoadedMetadata)
    if (video && video.readyState >= 1) onLoadedMetadata()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      video?.removeEventListener('loadedmetadata', onLoadedMetadata)
    }
  }, [seek, videoRef])

  return onSeeked
}
