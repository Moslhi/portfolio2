
import { GraduationCap } from 'lucide-react'
import { useI18n } from '../i18n'
import { journey } from '../data/projects'
import { Reveal, SectionHead } from './Section'

export default function Journey() {
  const { t, lang } = useI18n()
  return (
    <section className="section" id="journey">
      <div className="container">
        <SectionHead label={t('journey.label')} title={t('journey.title')} />
        <div className="timeline">
          {journey.map((j, i) => (
            <Reveal key={j.en} delay={i * 0.05}>
              <div className="tl-item">
                <h4>{j[lang]}</h4>
                {j.detail && <p>{j.detail[lang]}</p>}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="edu-card">
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div className="cap-icon" style={{ marginBottom: 0 }}><GraduationCap size={20} /></div>
              <div>
                <h4>{t('journey.edu.title')}</h4>
                <p>{t('journey.edu.d')}</p>
                <span className="edu-grade">GRADE · 84.20% — GRADUATED 2026</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
