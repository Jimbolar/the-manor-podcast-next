'use client'

import { useEffect, useRef } from 'react'

function applyDarkTheme(wrapper: HTMLElement) {
  wrapper.querySelectorAll<HTMLElement>('*').forEach((el) => {
    const tag = el.tagName.toLowerCase()

    // Base container elements — match card bg (gray-900)
    if (tag === 'table' || tag === 'div' || tag === 'section' || tag === 'span') {
      el.style.backgroundColor = '#111827'
      el.style.color = '#f9fafb'
      el.style.borderColor = '#1f2937'
    }
    if (tag === 'th') {
      el.style.backgroundColor = '#1f2937'
      el.style.color = '#9ca3af'
      el.style.borderColor = '#1f2937'
      el.style.padding = '0.6rem 0.75rem'
      el.style.textTransform = 'uppercase'
      el.style.fontSize = '0.7rem'
      el.style.letterSpacing = '0.08em'
    }
    if (tag === 'td') {
      el.style.backgroundColor = '#111827'
      el.style.color = '#f9fafb'
      el.style.borderColor = '#1f2937'
      el.style.padding = '0.5rem 0.75rem'
      el.style.fontSize = '0.875rem'
    }
    if (tag === 'tr') {
      el.style.backgroundColor = '#111827'
      el.style.borderColor = '#1f2937'
    }
    // Links use the site's yellow accent
    if (tag === 'a') {
      el.style.color = '#facc15'
      el.style.textDecoration = 'none'
    }
    if (
      el.className?.toString().includes('footer') ||
      el.className?.toString().includes('powered') ||
      el.className?.toString().includes('brand')
    ) {
      el.style.display = 'none'
    }
  })
}

export default function FootyStatsUpcoming() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const initialised = useRef(false)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        intersectionObserver.disconnect()
        if (initialised.current) return
        initialised.current = true
        init()
      },
      { rootMargin: '200px' }
    )
    intersectionObserver.observe(wrapper)
    return () => intersectionObserver.disconnect()

    function init() {
    ;(window as any)['fsUpcomingEmbed'] = 'fsUpcoming'
    ;(window as any)['fsUpcoming'] = (window as any)['fsUpcoming'] || function (...args: any[]) {
      ((window as any)['fsUpcoming'].q = (window as any)['fsUpcoming'].q || []).push(args)
    }
    ;(window as any).fsUpcoming('params', { teamID: 243 })

    const observer = new MutationObserver(() => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      // Wait until content has rendered
      const hasContent = wrapper.querySelector('table, [class]')
      if (!hasContent) return

      applyDarkTheme(wrapper)
      observer.disconnect()
    })

    const upcomingDiv = document.getElementById('fs-upcoming')
    if (upcomingDiv) {
      observer.observe(upcomingDiv, { childList: true, subtree: true })
    }

    const script = document.createElement('script')
    script.id = 'fsUpcoming'
    script.src = 'https://cdn.footystats.org/embeds/upcoming.js'
    script.async = true

    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode?.insertBefore(script, firstScript)

    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      id="fs-upcoming-wrapper"
      style={{ backgroundColor: '#030712' }}
      className="border border-gray-800 rounded-xl overflow-hidden"
    >
      <div id="fs-upcoming" />
    </div>
  )
}
