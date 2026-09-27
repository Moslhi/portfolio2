
import { MessageCircle } from 'lucide-react'
import { useI18n } from '../i18n'
import { whatsappLink } from '../data/projects'

export default function WhatsAppFloat() {
  const { t } = useI18n()
  return (
    <a className="wa-float" href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label={t('float.whatsapp')} title={t('float.whatsapp')}>
      <MessageCircle size={26} />
    </a>
  )
}
