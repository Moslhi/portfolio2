
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'ar'

const en: Record<string, any> = {
  'nav.home': 'Home', 'nav.about': 'About', 'nav.skills': 'Skills', 'nav.projects': 'Projects',
  'nav.journey': 'Journey', 'nav.contact': 'Contact', 'nav.cv': 'CV', 'nav.menu': 'Menu', 'nav.close': 'Close',
  'hero.status': 'System Online', 'hero.tag': 'Available for opportunities',
  'hero.role': 'Full Stack Developer',
  'hero.desc': 'I build modern full-stack applications, enterprise systems, AI-powered products, and data-driven experiences.',
  'hero.viewProjects': 'View Projects', 'hero.contactMe': 'Contact Me', 'hero.downloadCV': 'Download CV',
  'hero.location': 'Benha, Qalyubia, Egypt',
  'about.label': 'Who I Am', 'about.title1': 'I build software across', 'about.title2': 'frontend, backend, AI, IoT and mobile.',
  'about.body': 'Full Stack Developer with hands-on experience building web and mobile applications using React, TypeScript, Node.js, ASP.NET Core, Flutter, PostgreSQL and Supabase. I enjoy turning complex technical requirements into usable products — from enterprise ERPs and industrial IoT dashboards to AI diagnostics and mobile healthcare apps.',
  'about.cap.frontend': 'Frontend', 'about.cap.frontend.d': 'React, Next.js, TypeScript, Tailwind',
  'about.cap.backend': 'Backend', 'about.cap.backend.d': 'Node.js, Express, ASP.NET Core, REST APIs',
  'about.cap.ai': 'AI', 'about.cap.ai.d': 'Python, Deep Learning, Computer Vision',
  'about.cap.iot': 'IoT', 'about.cap.iot.d': 'MQTT, EMQX, Industrial IoT',
  'about.cap.mobile': 'Mobile', 'about.cap.mobile.d': 'Flutter, Dart',
  'about.cap.db': 'Databases', 'about.cap.db.d': 'PostgreSQL, Supabase, MySQL',
  'skills.label': 'Capabilities', 'skills.title': 'Technology Constellation',
  'skills.hint': 'Hover a node to see how each technology is used across projects.',
  'skills.usedIn': 'Used in', 'skills.central': 'MAHMOUD · FULL STACK',
  'cat.frontend': 'Frontend', 'cat.backend': 'Backend', 'cat.database': 'Database',
  'cat.mobile': 'Mobile', 'cat.ai': 'AI', 'cat.iot': 'IoT', 'cat.tools': 'Tools',
  'projects.label': 'Selected Work', 'projects.title': 'Projects',
  'projects.demoNote': 'UI preview — demo data',
  'projects.viewCase': 'View Case Study', 'projects.live': 'Live Demo', 'projects.tech': 'TECH STACK',
  'journey.label': 'The Path', 'journey.title': 'Development Journey',
  'journey.edu.title': 'Delta Technological University',
  'journey.edu.d': 'B.Sc. Information Technology — Software Specialization · Graduated 2026 · 84.20%',
  'contact.label': 'Transmission', 'contact.title': "Have an idea? Let's build it.",
  'contact.desc': 'If you are working on a web application, enterprise system, AI product, IoT dashboard, or mobile experience — let\u2019s talk.',
  'contact.start': 'Start a Conversation', 'contact.emailMe': 'Email Me', 'contact.whatsappMe': 'WhatsApp Me',
  'contact.f.name': 'Name', 'contact.f.email': 'Email', 'contact.f.phone': 'Phone',
  'contact.f.company': 'Company', 'contact.f.subject': 'Subject', 'contact.f.projectType': 'Project Type',
  'contact.f.budget': 'Budget', 'contact.f.pref': 'Preferred Contact Method', 'contact.f.message': 'Message',
  'contact.f.consent': 'I agree to be contacted about my inquiry.',
  'contact.opt.type1': 'Web Application', 'contact.opt.type2': 'Enterprise System', 'contact.opt.type3': 'AI Product',
  'contact.opt.type4': 'IoT Dashboard', 'contact.opt.type5': 'Mobile App', 'contact.opt.type6': 'Other',
  'contact.opt.b1': 'Under $500', 'contact.opt.b2': '$500 – $1,000', 'contact.opt.b3': '$1,000 – $5,000',
  'contact.opt.b4': '$5,000+', 'contact.opt.b5': 'Not sure yet',
  'contact.opt.c1': 'Email', 'contact.opt.c2': 'WhatsApp', 'contact.opt.c3': 'Phone',
  'contact.submit': 'Send Message', 'contact.sending': 'Transmitting…',
  'contact.success.t': 'Message Transmitted', 'contact.success.d': 'Your message has been received. A confirmation email has been sent to your inbox.',
  'contact.error.t': 'Transmission Failed', 'contact.error.d': "We couldn't send your message. Please try again or contact Mahmoud directly.",
  'contact.required': 'This field is required', 'contact.invalidEmail': 'Invalid email address',
  'footer.tagline': 'Building digital systems with real engineering.',
  'footer.rights': 'All rights reserved.',
  'footer.sections': 'Sections', 'footer.connect': 'Connect',
  'float.whatsapp': 'Chat on WhatsApp',
  'loader.brand': 'MM', 'loader.init': 'Initializing portfolio…',
  'theme.toLight': 'Switch to light mode', 'theme.toDark': 'Switch to dark mode',
  'lang.switch': 'عربي',
  'case.problem': 'Problem', 'case.goal': 'Goal', 'case.solution': 'Solution',
  'case.arch': 'Architecture', 'case.features': 'Key Features', 'case.challenges': 'Engineering Notes',
  'case.links': 'Links', 'case.close': 'Close', 'case.next': 'Next Project',
  'case.disclaimer.glocima': 'Decision-support prototype. Not a certified medical device and not a replacement for professional diagnosis.',
  'case.disclaimer.baby': 'Parenting-assist prototype. Not a medically validated diagnostic system.',
}

const ar: Record<string, any> = {
  'nav.home': 'الرئيسية', 'nav.about': 'عنّي', 'nav.skills': 'المهارات', 'nav.projects': 'المشاريع',
  'nav.journey': 'المسيرة', 'nav.contact': 'تواصل', 'nav.cv': 'السيرة', 'nav.menu': 'القائمة', 'nav.close': 'إغلاق',
  'hero.status': 'النظام يعمل', 'hero.tag': 'متاح لفرص العمل',
  'hero.role': 'مطوّر Full Stack',
  'hero.desc': 'أبني تطبيقات ويب حديثة، أنظمة enterprise، منتجات مدعومة بالذكاء الاصطناعي، وتجارب قائمة على البيانات.',
  'hero.viewProjects': 'شوف المشاريع', 'hero.contactMe': 'كلمني', 'hero.downloadCV': 'حمّل السيرة الذاتية',
  'hero.location': 'بنها، القليوبية، مصر',
  'about.label': 'مين أنا', 'about.title1': 'أبني برمجيات تشمل', 'about.title2': 'الواجهات، الباك إند، الذكاء الاصطناعي، IoT والموبايل.',
  'about.body': 'مطوّر Full Stack بخبرة عملية في بناء تطبيقات ويب وموبايل باستخدام React و TypeScript و Node.js و ASP.NET Core و Flutter و PostgreSQL و Supabase. بيّلي أحوّل المتطلبات التقنية المعقّدة لمنتجات قابلة للاستخدام — من أنظمة ERP ولوحات مراقبة IoT صناعية لتطبيقات ذكاء اصطناعي وموبايل.',
  'about.cap.frontend': 'الواجهات', 'about.cap.frontend.d': 'React, Next.js, TypeScript, Tailwind',
  'about.cap.backend': 'الباك إند', 'about.cap.backend.d': 'Node.js, Express, ASP.NET Core, REST APIs',
  'about.cap.ai': 'الذكاء الاصطناعي', 'about.cap.ai.d': 'Python, تعلّم عميق, رؤية حاسوبية',
  'about.cap.iot': 'إنترنت الأشياء', 'about.cap.iot.d': 'MQTT, EMQX, IoT صناعي',
  'about.cap.mobile': 'الموبايل', 'about.cap.mobile.d': 'Flutter, Dart',
  'about.cap.db': 'قواعد البيانات', 'about.cap.db.d': 'PostgreSQL, Supabase, MySQL',
  'skills.label': 'القدرات', 'skills.title': 'كوكبة التقنيات',
  'skills.hint': 'مرّر على أي تقنية عشان تشوف استخدامها في المشاريع.',
  'skills.usedIn': 'مستخدمة في', 'skills.central': 'محمود · فول ستاك',
  'cat.frontend': 'واجهات', 'cat.backend': 'باك إند', 'cat.database': 'قواعد بيانات',
  'cat.mobile': 'موبايل', 'cat.ai': 'ذكاء اصطناعي', 'cat.iot': 'IoT', 'cat.tools': 'أدوات',
  'projects.label': 'أعمال مختارة', 'projects.title': 'المشاريع',
  'projects.demoNote': 'معاينة تصميم — بيانات تجريبية',
  'projects.viewCase': 'دراسة الحالة', 'projects.live': 'المعاينة الحية', 'projects.tech': 'التقنيات',
  'journey.label': 'الرحلة', 'journey.title': 'مسيرة التطوير',
  'journey.edu.title': 'جامعة الدلتا التكنولوجية',
  'journey.edu.d': 'بكالوريوس تكنولوجيا المعلومات — تخصص برمجيات · تخرج 2026 · 84.20%',
  'contact.label': 'إرسال', 'contact.title': 'عندك فكرة؟ يلا نبنيها.',
  'contact.desc': 'لو بتشتغل على تطبيق ويب، نظام enterprise، منتج ذكاء اصطناعي، لوحة IoT، أو تطبيق موبايل — كلمي.',
  'contact.start': 'ابدأ المحادثة', 'contact.emailMe': 'ابعت إيميل', 'contact.whatsappMe': 'واتساب',
  'contact.f.name': 'الاسم', 'contact.f.email': 'الإيميل', 'contact.f.phone': 'الموبايل',
  'contact.f.company': 'الشركة', 'contact.f.subject': 'الموضوع', 'contact.f.projectType': 'نوع المشروع',
  'contact.f.budget': 'الميزانية', 'contact.f.pref': 'طريقة التواصل المفضلة', 'contact.f.message': 'الرسالة',
  'contact.f.consent': 'أوافق على التواصل معي بخصوص استفساري.',
  'contact.opt.type1': 'تطبيق ويب', 'contact.opt.type2': 'نظام Enterprise', 'contact.opt.type3': 'منتج ذكاء اصطناعي',
  'contact.opt.type4': 'لوحة IoT', 'contact.opt.type5': 'تطبيق موبايل', 'contact.opt.type6': 'أخرى',
  'contact.opt.b1': 'أقل من 500$', 'contact.opt.b2': '500 – 1,000$', 'contact.opt.b3': '1,000 – 5,000$',
  'contact.opt.b4': 'أكتر من 5,000$', 'contact.opt.b5': 'مش متأكد لسه',
  'contact.opt.c1': 'إيميل', 'contact.opt.c2': 'واتساب', 'contact.opt.c3': 'مكالمة',
  'contact.submit': 'إرسال الرسالة', 'contact.sending': 'جاري الإرسال…',
  'contact.success.t': 'تم استلام رسالتك', 'contact.success.d': 'وصلت رسالتك بنجاح، وإيميل تأكيد اتبعتلك.',
  'contact.error.t': 'فشل الإرسال', 'contact.error.d': 'مقدرناش نبعت رسالتك. حاول تاني أو كلم محمود مباشرة.',
  'contact.required': 'الحقل ده مطلوب', 'contact.invalidEmail': 'إيميل غير صحيح',
  'footer.tagline': 'ببني أنظمة رقمية بهندسة حقيقية.',
  'footer.rights': 'كل الحقوق محفوظة.',
  'footer.sections': 'الأقسام', 'footer.connect': 'تواصل',
  'float.whatsapp': 'كلمني واتساب',
  'loader.brand': 'م', 'loader.init': 'جاري تجهيز البورتفوليو…',
  'theme.toLight': 'التبديل للوضع الفاتح', 'theme.toDark': 'التبديل للوضع الداكن',
  'lang.switch': 'EN',
  'case.problem': 'المشكلة', 'case.goal': 'الهدف', 'case.solution': 'الحل',
  'case.arch': 'البنية التقنية', 'case.features': 'أهم المميزات', 'case.challenges': 'ملاحظات هندسية',
  'case.links': 'الروابط', 'case.close': 'إغلاق', 'case.next': 'المشروع التالي',
  'case.disclaimer.glocima': 'نموذج داعم لاتخاذ القرار. ليس جهازًا طبيًا معتمدًا ولا يغني عن التشخيص المهني.',
  'case.disclaimer.baby': 'نموذج مساعد للأهل. ليس نظامًا تشخيصيًا معتمدًا طبيًا.',
}

const dict: Record<Lang, Record<string, any>> = { en, ar }

type I18nCtx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => any; dir: 'ltr' | 'rtl' }

const Ctx = createContext<I18nCtx>({ lang: 'en', setLang: () => {}, t: (k) => k, dir: 'ltr' })

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'en')
  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    document.title =
      lang === 'ar'
        ? 'محمود مصلحي | مطوّر Full Stack'
        : 'Mahmoud Mohammed Moslhey | Full Stack Developer'
  }, [lang, dir])
  const t = (key: string) => dict[lang][key] ?? dict.en[key] ?? key
  return <Ctx.Provider value={{ lang, setLang, t, dir }}>{children}</Ctx.Provider>
}

export const useI18n = () => useContext(Ctx)
