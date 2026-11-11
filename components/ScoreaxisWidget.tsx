'use client'

import { useEffect, useRef } from 'react'

type Props = {
  widgetId: string
  src: string
  height?: number
}

export default function ScoreaxisWidget({ widgetId, src, height }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const script = document.createElement('script')
    script.src = src
    script.async = true
    container.insertBefore(script, container.firstChild)

    return () => {
      container.innerHTML = `<div class="widget-main-link" style="padding: 6px 12px;font-weight: 500;">Live data by <a href="https://www.scoreaxis.com/" style="color: inherit;">Scoreaxis</a></div>`
    }
  }, [src])

  return (
    <div
      ref={containerRef}
      id={`widget-${widgetId}`}
      className="scoreaxis-widget rounded-xl"
      style={{
        width: 'auto',
        height: height ?? 'auto',
        fontSize: 14,
        backgroundColor: '#ffffff',
        color: '#141416',
        border: '1px solid #ecf1f7',
        overflow: 'auto',
      }}
    >
      <div className="widget-main-link" style={{ padding: '6px 12px', fontWeight: 500 }}>
        Live data by{' '}
        <a href="https://www.scoreaxis.com/" style={{ color: 'inherit' }}>
          Scoreaxis
        </a>
      </div>
    </div>
  )
}
