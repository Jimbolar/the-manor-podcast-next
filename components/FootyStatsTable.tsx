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
    // Hide any branding footer
    if (
      el.className?.toString().includes('footer') ||
      el.className?.toString().includes('powered') ||
      el.className?.toString().includes('brand')
    ) {
      el.style.display = 'none'
    }
  })
}

export default function FootyStatsTable() {
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
    ;(window as any)['fsStandingsEmbed'] = 'mw'
    ;(window as any)['mw'] = (window as any)['mw'] || function (...args: any[]) {
      ((window as any)['mw'].q = (window as any)['mw'].q || []).push(args)
    }
    ;(window as any).mw('params', { leagueID: 14930 })

    const observer = new MutationObserver(() => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      // Wait until rows are present before acting
      const rows = wrapper.querySelectorAll<HTMLTableRowElement>('table tbody tr')
      if (rows.length === 0) return

      // Apply dark theme once
      applyDarkTheme(wrapper)

      // Highlight Oxford United row and scroll to it
      let oxfordRow: HTMLTableRowElement | null = null
      rows.forEach((row) => {
        if (row.innerText.includes('Oxford United')) {
          oxfordRow = row
          row.style.setProperty('background-color', '#422006', 'important')
          row.style.setProperty('font-weight', 'bold', 'important')
          // Include div so nested elements inside cells don't break the highlight
          row.querySelectorAll<HTMLElement>('td, div, a, span').forEach((el) => {
            el.style.setProperty('background-color', '#422006', 'important')
            el.style.setProperty('color', '#facc15', 'important')
          })
        }
      })

      if (oxfordRow) {
        // Only disconnect once Oxford United is found; if not found yet, keep
        // watching in case the widget renders rows incrementally.
        observer.disconnect()
        const rowEl = oxfordRow as HTMLTableRowElement
        // Use setTimeout so the widget has time to finish its own layout passes
        // before we read offsetTop values.
        setTimeout(() => {
          const w = wrapperRef.current
          if (!w) return
          // Walk offsetParent chain to get the true offset from the scroll container
          let offsetTop = 0
          let el: HTMLElement | null = rowEl
          while (el && el !== w) {
            offsetTop += el.offsetTop
            el = el.offsetParent as HTMLElement | null
          }
          w.scrollTop = offsetTop - w.clientHeight / 2 + rowEl.offsetHeight / 2
        }, 400)
      }
    })

    const standingsDiv = document.getElementById('fs-standings')
    if (standingsDiv) {
      observer.observe(standingsDiv, { childList: true, subtree: true })
    }

    const script = document.createElement('script')
    script.id = 'mw'
    script.src = 'https://cdn.footystats.org/embeds/standings.js'
    script.async = true

    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode?.insertBefore(script, firstScript)

    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      id="fs-standings-wrapper"
      style={{ height: '400px', overflowY: 'auto', backgroundColor: '#030712' }}
      className="border border-gray-800 rounded-xl overflow-hidden"
    >
      <div id="fs-standings" />
    </div>
  )
}
