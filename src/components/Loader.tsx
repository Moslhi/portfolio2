
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n'

const steps = ['01 / LOAD EXPERIENCE', '02 / INITIALIZE 3D', '03 / LOAD PROJECTS', '04 / READY']

export default function Loader() {
  const { t } = useI18n()
  const [step, setStep] = useState(0)
  useEffect(() => {
    const i = setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 320)
    return () => clearInterval(i)
  }, [])
  return (
    <motion.div className="loader" exit={{ opacity: 0, transition: { duration: 0.5 } }}>
      <div className="loader-inner">
        <motion.div className="loader-brand" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          {t('loader.brand')}
        </motion.div>
        <div className="loader-bar">
          <motion.span animate={{ width: `${((step + 1) / steps.length) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
        <div className="loader-step">
          {t('loader.init')} · {steps[step]}
        </div>
      </div>
    </motion.div>
  )
}
