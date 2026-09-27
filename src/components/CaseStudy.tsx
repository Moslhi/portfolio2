
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, ExternalLink, Github, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useI18n } from '../i18n'
import { projects, type Project } from '../data/projects'
import ArchitectureDiagram from './ArchitectureDiagram'

export default function CaseStudy({
  project, onClose, onNext,
}: {
  project: Project
  onClose: () => void
  onNext: (p: Project) => void
}) {
  const { t, lang } = useI18n()
  const cs = project.caseStudy

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const next = projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length]

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 44, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="modal-hero">
          <img src={project.image} alt={project.title} />
          <button className="modal-close" onClick={onClose} aria-label={t('case.close')}><X size={18} /></button>
        </div>

        <div className="modal-body">
          <div className="modal-cat">{project.category[lang]} · {project.technologies.join(' · ')}</div>
          <h2 className="modal-title">{project.title}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>{project.description[lang]}</p>

          {project.disclaimer && (
            <div className="disclaimer" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{t(`case.disclaimer.${project.disclaimer}`)}</span>
            </div>
          )}

          <div className="modal-section pillars">
            <div className="pillar">
              <h4>{t('case.problem')}</h4>
              <p>{cs.problem[lang]}</p>
            </div>
            <div className="pillar">
              <h4>{t('case.goal')}</h4>
              <p>{cs.goal[lang]}</p>
            </div>
            <div className="pillar">
              <h4>{t('case.solution')}</h4>
              <p>{cs.solution[lang]}</p>
            </div>
          </div>

          <div className="modal-section">
            <h3>{t('case.arch')}</h3>
            <ArchitectureDiagram steps={project.architecture} />
          </div>

          <div className="modal-section">
            <h3>{t('case.features')}</h3>
            <ul className="feature-list">
              {cs.features.map((f) => <li key={f.en}>{f[lang]}</li>)}
            </ul>
          </div>

          <div className="modal-section">
            <h3>{t('case.challenges')}</h3>
            <div className="note-box">{cs.notes[lang]}</div>
          </div>

          {(project.live || project.github) && (
            <div className="modal-section">
              <h3>{t('case.links')}</h3>
              <div className="modal-links">
                {project.live && (
                  <a className="btn btn-primary btn-sm" href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} /> {t('projects.live')}
                  </a>
                )}
                {project.github && (
                  <a className="btn btn-ghost btn-sm" href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github size={14} /> GitHub
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="modal-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              <CheckCircle2 size={14} /> {t('case.close')}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => onNext(next)}>
              {t('case.next')}: {next.title} →
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
