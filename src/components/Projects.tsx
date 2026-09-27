
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../i18n'
import { projects, type Project } from '../data/projects'
import { Reveal, SectionHead } from './Section'

function Card({ p, onOpen, index }: { p: Project; onOpen: () => void; index: number }) {
  const { t, lang } = useI18n()
  return (
    <Reveal delay={(index % 2) * 0.08}>
      <article
        className="project-card"
        onClick={onOpen}
        onKeyDown={(e) => e.key === 'Enter' && onOpen()}
        tabIndex={0}
        role="button"
        aria-label={p.title}
      >
        <div className="project-media">
          {p.demoData && <span className="demo-badge">{t('projects.demoNote')}</span>}
          <img src={p.image} alt={p.title} loading="lazy" />
        </div>
        <div className="project-body">
          <div className="project-cat">{p.category[lang]}</div>
          <h3 className="project-title">{p.title}</h3>
          <p className="project-desc">{p.description[lang]}</p>
          <div className="project-tags">
            {p.technologies.slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}
          </div>
          <span className="project-cta">
            {t('projects.viewCase')} <ArrowUpRight size={15} style={lang === 'ar' ? { transform: 'scaleX(-1)' } : undefined} />
          </span>
        </div>
      </article>
    </Reveal>
  )
}

export default function Projects({ onOpen }: { onOpen: (p: Project) => void }) {
  const { t } = useI18n()
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead label={t('projects.label')} title={t('projects.title')} />
        <div className="projects-grid">
          {projects.map((p, i) => (
            <Card key={p.slug} p={p} index={i} onOpen={() => onOpen(p)} />
          ))}
        </div>
      </div>
    </section>
  )
}
