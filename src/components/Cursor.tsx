
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let x = -100, y = -100, rx = -100, ry = -100
    let raf = 0
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`
    }
    const loop = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('a, button, .node, .project-card, input, select, textarea')
      ring.current?.classList.toggle('is-hover', !!t)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
    </>
  )
}
