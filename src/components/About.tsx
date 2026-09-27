
import { Monitor, Server, Brain, Radio, Smartphone, Database } from 'lucide-react'
import { useI18n } from '../i18n'
import { Reveal, SectionHead } from './Section'

const caps = [
  { key: 'frontend', icon: Monitor },
  { key: 'backend', icon: Server },
  { key: 'ai', icon: Brain },
  { key: 'iot', icon: Radio },
  { key: 'mobile', icon: Smartphone },
  { key: 'db', icon: Database },
]

export default function About() {
  const { t } = useI18n()
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <div>
            <SectionHead label={t('about.label')} title="" />
            <Reveal delay={0.05}>
              <h2 className="about-title">
                {t('about.title1')}<br />
                <span className="grad-text">{t('about.title2')}</span>
              </h2>
              <p className="about-body">{t('about.body')}</p>
            </Reveal>
          </div>
          <div className="cap-grid">
            {caps.map((c, i) => (
              <Reveal key={c.key} delay={i * 0.06}>
                <div className="cap-card">
                  <div className="cap-icon"><c.icon size={20} /></div>
                  <h4>{t(`about.cap.${c.key}`)}</h4>
                  <p>{t(`about.cap.${c.key}.d`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
