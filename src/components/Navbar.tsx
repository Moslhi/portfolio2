
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Sun, Moon, FileDown } from 'lucide-react'
import { useI18n } from '../i18n'
import { links } from '../data/projects'

const ids = ['home', 'about', 'skills', 'projects', 'journey', 'contact']

export default function Navbar() {
  const { t, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.dataset.theme = next
  }

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }} aria-label="Home">
            <span className="logo-mark">MM</span>
            <span>MOSLHEY</span>
          </a>

          <ul className="nav-links">
            {ids.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id) }}>{t(`nav.${id}`)}</a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <a className="btn btn-ghost btn-sm" href={links.cv} download>
              <FileDown size={15} /> {t('nav.cv')}
            </a>
            <button
              className="icon-btn"
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              aria-label="Switch language"
              style={{ width: 'auto', padding: '0 12px' }}
            >
              {t('lang.switch')}
            </button>
            <button className="icon-btn" onClick={toggleTheme} aria-label={theme === 'dark' ? t('theme.toLight') : t('theme.toDark')}>
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button className="icon-btn menu-btn" onClick={() => setOpen(true)} aria-label={t('nav.menu')}>
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            aria-label="Mobile navigation"
          >
            <button className="icon-btn" style={{ position: 'absolute', top: 20, insetInlineEnd: 20 }} onClick={() => setOpen(false)} aria-label={t('nav.close')}>
              <X size={20} />
            </button>
            {ids.map((id, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                className="mm-link"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * i }}
                onClick={(e) => { e.preventDefault(); go(id) }}
              >
                {t(`nav.${id}`)}
                <span className="mm-index">0{i + 1}</span>
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
