'use client'

import { useState } from 'react'

type Props = {
  src: string
  title: string
  height: number
  allow?: string
  sandbox?: string
  referrerPolicy?: string
  className?: string
}

export default function EmbedFrame({ src, title, height, allow, sandbox, referrerPolicy, className = '' }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative w-full rounded-xl overflow-hidden ${className}`}>
      {/* Skeleton — same height as the iframe, shown only while loading */}
      {!loaded && (
        <div
          className="absolute inset-0 bg-gray-800 animate-pulse rounded-xl flex items-center justify-center"
          style={{ height }}
        >
          <div className="flex flex-col items-center gap-3 opacity-30">
            <div className="w-10 h-10 rounded-full bg-gray-600" />
            <div className="w-32 h-2 rounded bg-gray-600" />
            <div className="w-24 h-2 rounded bg-gray-600" />
          </div>
        </div>
      )}
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        frameBorder="0"
        allow={allow}
        sandbox={sandbox as any}
        referrerPolicy={referrerPolicy as any}
        allowFullScreen
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full block transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ height, display: 'block' }}
      />
    </div>
  )
}
