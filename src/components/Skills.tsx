
import { useState } from 'react'
import { useI18n } from '../i18n'
import { skills, constellation } from '../data/projects'
import { Reveal, SectionHead } from './Section'

export default function Skills() {
  const { t } = useI18n()
  const [active, setActive] = useState<string | null>(null)

  const activeNode = constellation.find((n) => n.name === active)

  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHead label={t('skills.label')} title={t('skills.title')} />
        <Reveal delay={0.05}>
          <p style={{ color: 'var(--text-secondary)', marginTop: 14 }}>{t('skills.hint')}</p>
        </Reveal>

        <Reveal delay={0.1} className="constellation">
          <svg preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
            {constellation.map((n) => (
              <line
                key={n.name}
                x1="50" y1="50" x2={n.x} y2={n.y}
                className={`const-line ${active === n.name ? 'lit' : ''}`}
              />
            ))}
          </svg>

          <div className="node-core">{t('skills.central')}</div>

          {constellation.map((n) => (
            <button
              key={n.name}
              className={`node ${active === n.name ? 'active' : ''}`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              onMouseEnter={() => setActive(n.name)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(n.name)}
              onBlur={() => setActive(null)}
            >
              {n.name}
            </button>
          ))}

          {activeNode && (
            <div
              className="node-tip"
              style={{
                left: `${Math.min(activeNode.x, 62)}%`,
                top: `${Math.min(activeNode.y + 8, 66)}%`,
              }}
            >
              <span className="cat">{t(`cat.${activeNode.category}`)}</span>
              <h5>{activeNode.name}</h5>
              <div className="used">
                {t('skills.usedIn')}:
                {activeNode.projects.map((p) => <b key={p}>· {p}</b>)}
              </div>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.05}>
          <div className="skill-chips">
            {Object.entries(skills).flatMap(([cat, items]) =>
              items.map((s) => (
                <span key={s} className="skill-chip" title={t(`cat.${cat}`)}>{s}</span>
              ))
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
