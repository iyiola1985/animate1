import { useRef } from 'react'
import { useVideoScrub } from '../hooks/useVideoScrub.ts'

const VIDEO_SRC = '/animate_also_in_the_same_ration_of_the_pic.mp4'

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const onSeeked = useVideoScrub(videoRef)

  return (
    <video
      ref={videoRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      onSeeked={onSeeked}
      aria-hidden="true"
    />
  )
}
