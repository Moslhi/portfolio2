
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'
import { useI18n } from '../i18n'
import { links, whatsappLink, whatsappDisplay, whatsappSecondary } from '../data/projects'
import { Reveal, SectionHead } from './Section'

const schema = z.object({
  name: z.string().min(2, 'required'),
  email: z.string().email('invalid'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(2, 'required'),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  preferredContact: z.string().optional(),
  message: z.string().min(10, 'required'),
  consent: z.literal(true, { errorMap: () => ({ message: 'required' }) }),
  website: z.string().optional(), // honeypot
})

type FormData = z.infer<typeof schema>

export default function Contact() {
  const { t, lang } = useI18n()
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  const {
    register, handleSubmit, reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('ok')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const errMsg = (e?: { message?: string }) =>
    e?.message === 'invalid' ? t('contact.invalidEmail') : e ? t('contact.required') : undefined

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHead label={t('contact.label')} title="" />
        <Reveal>
          <div className="cta-block">
            <h2 className="cta-title">
              {lang === 'ar' ? (
                <>عندك فكرة؟<br /><span className="grad">يلا نبنيها.</span></>
              ) : (
                <>HAVE AN IDEA?<br /><span className="grad">LET'S BUILD IT.</span></>
              )}
            </h2>
            <p className="cta-desc">{t('contact.desc')}</p>
            <div className="cta-btns">
              <a className="btn btn-primary" href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} /> {t('contact.whatsappMe')}
              </a>
              <a className="btn btn-ghost" href={`mailto:${links.email}`}>
                <Mail size={16} /> {t('contact.emailMe')}
              </a>
            </div>
          </div>
        </Reveal>

        <div className="contact-grid">
          <div>
            <Reveal delay={0.05}>
              <a className="contact-info-card" href={`mailto:${links.email}`}>
                <div className="ci"><Mail size={19} /></div>
                <div>
                  <h4>EMAIL</h4>
                  <span className="val">{links.email}</span>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <a className="contact-info-card" href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <div className="ci"><MessageCircle size={19} /></div>
                <div>
                  <h4>WHATSAPP</h4>
                  <span className="val">{whatsappDisplay}</span><br />
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{whatsappSecondary}</span>
                </div>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form className="form-card" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="c-name">{t('contact.f.name')} *</label>
                  <input id="c-name" {...register('name')} autoComplete="name" />
                  {errors.name && <div className="err">{errMsg(errors.name)}</div>}
                </div>
                <div className="field">
                  <label htmlFor="c-email">{t('contact.f.email')} *</label>
                  <input id="c-email" type="email" {...register('email')} autoComplete="email" />
                  {errors.email && <div className="err">{errMsg(errors.email)}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="c-phone">{t('contact.f.phone')}</label>
                  <input id="c-phone" {...register('phone')} autoComplete="tel" />
                </div>
                <div className="field">
                  <label htmlFor="c-company">{t('contact.f.company')}</label>
                  <input id="c-company" {...register('company')} autoComplete="organization" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="c-subject">{t('contact.f.subject')} *</label>
                <input id="c-subject" {...register('subject')} />
                {errors.subject && <div className="err">{errMsg(errors.subject)}</div>}
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="c-type">{t('contact.f.projectType')}</label>
                  <select id="c-type" {...register('projectType')}>
                    {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={t(`contact.opt.type${n}`)}>{t(`contact.opt.type${n}`)}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="c-budget">{t('contact.f.budget')}</label>
                  <select id="c-budget" {...register('budget')}>
                    {[1, 2, 3, 4, 5].map((n) => <option key={n} value={t(`contact.opt.b${n}`)}>{t(`contact.opt.b${n}`)}</option>)}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="c-pref">{t('contact.f.pref')}</label>
                <select id="c-pref" {...register('preferredContact')}>
                  {[1, 2, 3].map((n) => <option key={n} value={t(`contact.opt.c${n}`)}>{t(`contact.opt.c${n}`)}</option>)}
                </select>
              </div>

              <div className="field">
                <label htmlFor="c-message">{t('contact.f.message')} *</label>
                <textarea id="c-message" {...register('message')} />
                {errors.message && <div className="err">{errMsg(errors.message)}</div>}
              </div>

              <div className="hp-field" aria-hidden>
                <label>Website<input {...register('website')} tabIndex={-1} autoComplete="off" /></label>
              </div>

              <label className="consent">
                <input type="checkbox" {...register('consent')} />
                <span>{t('contact.f.consent')} *</span>
              </label>
              {errors.consent && <div className="err" style={{ marginTop: -12, marginBottom: 12 }}>{errMsg(errors.consent)}</div>}

              <motion.button
                className="btn btn-primary"
                type="submit"
                disabled={status === 'sending'}
                whileTap={{ scale: 0.97 }}
                style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
              >
                {status === 'sending' ? <Loader2 size={16} className="spin" /> : <Send size={16} style={lang === 'ar' ? { transform: 'scaleX(-1)' } : undefined} />}
                {status === 'sending' ? t('contact.sending') : t('contact.submit')}
              </motion.button>

              {status === 'ok' && (
                <motion.div className="form-status ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="status">
                  <CheckCircle2 size={20} color="var(--success)" style={{ flexShrink: 0 }} />
                  <div><h4>{t('contact.success.t')}</h4><p>{t('contact.success.d')}</p></div>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div className="form-status bad" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="alert">
                  <AlertTriangle size={20} color="var(--danger)" style={{ flexShrink: 0 }} />
                  <div>
                    <h4>{t('contact.error.t')}</h4>
                    <p>{t('contact.error.d')}</p>
                    <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                      <a className="btn btn-ghost btn-sm" href={`mailto:${links.email}`}><Mail size={13} /> {t('contact.emailMe')}</a>
                      <a className="btn btn-ghost btn-sm" href={whatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle size={13} /> {t('contact.whatsappMe')}</a>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
