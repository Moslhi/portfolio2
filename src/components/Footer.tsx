
import { Github, Linkedin, Mail, FileDown } from 'lucide-react'
import { useI18n } from '../i18n'
import { links } from '../data/projects'

const ids = ['home', 'about', 'skills', 'projects', 'journey', 'contact']

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }}>
              <span className="logo-mark">MM</span>
              <span>Mahmoud Moslhey</span>
            </a>
            <p>{t('footer.tagline')}</p>
          </div>
          <div>
            <h5>{t('footer.sections')}</h5>
            <ul>
              {ids.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id) }}>{t(`nav.${id}`)}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>{t('footer.connect')}</h5>
            <ul>
              <li><a href={links.github} target="_blank" rel="noopener noreferrer"><Github size={14} style={{ verticalAlign: -2, marginInlineEnd: 6 }} />GitHub</a></li>
              <li><a href={links.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={14} style={{ verticalAlign: -2, marginInlineEnd: 6 }} />LinkedIn</a></li>
              <li><a href={`mailto:${links.email}`}><Mail size={14} style={{ verticalAlign: -2, marginInlineEnd: 6 }} />{links.email}</a></li>
              <li><a href={links.cv} download><FileDown size={14} style={{ verticalAlign: -2, marginInlineEnd: 6 }} />{t('nav.cv')}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Mahmoud Mohammed Moslhey — {t('footer.rights')}</span>
          <span className="mono">FULL STACK · REACT · .NET · AI · IOT · FLUTTER</span>
        </div>
      </div>
    </footer>
  )
}
