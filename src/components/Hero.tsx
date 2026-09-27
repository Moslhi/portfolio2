
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, ArrowRight, FileDown } from 'lucide-react'
import { useI18n } from '../i18n'
import { links, whatsappLink, whatsappDisplay } from '../data/projects'
import HeroScene from './HeroScene'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const { t, lang } = useI18n()

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="home">
      <HeroScene />
      <div className="container hero-inner">
        <div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <span className="status-pill">
              <span className="status-dot" />
              {t('hero.status')} · {t('hero.tag')}
            </span>
          </motion.div>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            {lang === 'ar' ? (
              <>محمود <span className="grad">مصلحي</span></>
            ) : (
              <>MAHMOUD<br /><span className="grad">MOSLHEY</span></>
            )}
          </motion.h1>

          <motion.div
            className="hero-role"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }}
          >
            {t('hero.role')} · SYSTEMS / AI / IOT / WEB / MOBILE
          </motion.div>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease }}
          >
            {t('hero.desc')}
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease }}
          >
            <button className="btn btn-primary" onClick={() => go('projects')}>
              {t('hero.viewProjects')} <ArrowRight size={16} style={lang === 'ar' ? { transform: 'scaleX(-1)' } : undefined} />
            </button>
            <button className="btn btn-ghost" onClick={() => go('contact')}>{t('hero.contactMe')}</button>
            <a className="btn btn-ghost" href={links.cv} download>
              <FileDown size={16} /> {t('hero.downloadCV')}
            </a>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}
          >
            <a className="icon-btn" href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17} /></a>
            <a className="icon-btn" href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
            <a className="icon-btn" href={`mailto:${links.email}`} aria-label="Email"><Mail size={17} /></a>
          </motion.div>

          <motion.div
            className="hero-location mono"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.65 }}
          >
            <MapPin size={13} /> {t('hero.location')} · WhatsApp {whatsappDisplay}
          </motion.div>
        </div>

        <motion.div
          className="portrait-wrap"
          initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3, ease }}
        >
          <div className="portrait-frame">
            <img src="/images/portrait.jpg" alt="Mahmoud Mohammed Moslhey" loading="eager" />
          </div>
          <motion.div className="portrait-chip chip-1" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <b>5+ PROJECTS</b>
            ERP · IoT · AI · MOBILE
          </motion.div>
          <motion.div className="portrait-chip chip-2" animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <b>FULL STACK</b>
            REACT · .NET · NODE · FLUTTER
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
