
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import CaseStudy from './components/CaseStudy'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import type { Project } from './data/projects'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState<Project | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark'
    document.documentElement.dataset.theme = saved
  }, [])

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects onOpen={setActive} />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <AnimatePresence>
        {active && <CaseStudy project={active} onClose={() => setActive(null)} onNext={(p) => setActive(p)} />}
      </AnimatePresence>
    </>
  )
}
