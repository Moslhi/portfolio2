
export type Localized = { en: string; ar: string }

export type Project = {
  slug: string
  title: string
  category: Localized
  description: Localized
  technologies: string[]
  image: string
  accent: string
  live?: string
  github?: string
  demoData?: boolean
  disclaimer?: 'glocima' | 'baby'
  architecture: string[]
  caseStudy: { problem: Localized; goal: Localized; solution: Localized; features: Localized[]; notes: Localized }
}

export const projects: Project[] = [
  {
    slug: 'nova-dashboard',
    title: 'NOVA Dashboard System',
    category: { en: 'Industrial IoT', ar: 'إنترنت الأشياء الصناعي' },
    description: {
      en: 'Industrial IoT monitoring dashboard for cold-room operations, designed to work above existing PLC/SCADA systems.',
      ar: 'لوحة مراقبة IoT صناعية لغرف التبريد، مصممة للعمل كطبقة فوق أنظمة PLC/SCADA الموجودة.',
    },
    technologies: ['React', 'TypeScript', 'ASP.NET Core', 'PostgreSQL', 'Docker', 'MQTT', 'EMQX'],
    image: '/images/nova-dashboard.png',
    accent: '#22d3ee',
    architecture: ['PLC / SCADA (existing layer)', 'Industrial Gateway', 'MQTT broker · EMQX', 'ASP.NET Core API', 'PostgreSQL', 'NOVA React Dashboard'],
    caseStudy: {
      problem: {
        en: 'Cold-room operations generate critical telemetry from PLC/SCADA systems, but operators lack a modern layer to monitor, analyze trends, and report on that data.',
        ar: 'عمليات غرف التبريد بتنتج بيانات حيوية من أنظمة PLC/SCADA، لكن المشغّلين ماعندهمش طبقة حديثة لمراقبة البيانات وتحليل الاتجاهات وعمل تقارير عنها.',
      },
      goal: {
        en: 'Build a monitoring and analytics dashboard that sits above the existing control layer — without replacing PLC control.',
        ar: 'بناء لوحة مراقبة وتحليلات فوق طبقة التحكم الموجودة — من غير استبدال نظام PLC نفسه.',
      },
      solution: {
        en: 'A React + TypeScript dashboard connected to an ASP.NET Core backend and PostgreSQL, with JWT authentication, role-based access control, multi-tenant data handling, audit-oriented workflows, and MQTT/EMQX gateway telemetry integration.',
        ar: 'لوحة React + TypeScript متوصلة بباك إند ASP.NET Core و PostgreSQL، مع مصادقة JWT، صلاحيات RBAC، عزل بيانات متعدد المستأجرين، سير عمل تدقيقي، ودمج تليمتري عن طريق MQTT/EMQX.',
      },
      features: [
        { en: 'Factory & cold-room management', ar: 'إدارة المصانع وغرف التبريد' },
        { en: 'Sensor telemetry — temperature, humidity, equipment status', ar: 'تليمتري الحساسات — حرارة ورطوبة وحالة المعدات' },
        { en: 'Alarms, trends and reports', ar: 'إنذارات واتجاهات وتقارير' },
        { en: 'Gateway & PLC integration via MQTT/EMQX', ar: 'دمج البوابات و PLC عن طريق MQTT/EMQX' },
        { en: 'JWT auth, RBAC, multi-tenant architecture', ar: 'مصادقة JWT وصلاحيات RBAC وبنية متعددة المستأجرين' },
        { en: 'Audit-oriented workflows', ar: 'سير عمل موجّه للتدقيق' },
      ],
      notes: {
        en: 'NOVA is designed as a supervision layer over existing PLC/SCADA infrastructure — it visualizes and audits data; it does not perform autonomous machine control.',
        ar: 'NOVA مصممة كطبقة إشراف فوق البنية التحتية الموجودة — بتعرض البيانات وتراجعها، ولا تتحكم في المعدات بشكل ذاتي.',
      },
    },
  },
  {
    slug: 'wayflow-erp',
    title: 'Wayflow — Logistics & Financial ERP',
    category: { en: 'Enterprise ERP', ar: 'نظام ERP' },
    description: {
      en: 'Integrated ERP for logistics companies with role-based access, wallet management, financial transactions, and real-time notifications.',
      ar: 'نظام ERP متكامل لشركات اللوجستيات مع صلاحيات حسب الدور، إدارة محفظة، معاملات مالية، وإشعارات لحظية.',
    },
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Shadcn/UI', 'TanStack Query', 'Zod', 'Supabase', 'PostgreSQL'],
    image: '/images/wayflow.png',
    accent: '#3b82f6',
    live: 'https://wayflow-assist.lovable.app',
    github: 'https://github.com/mdoga607-dev/wayflow-assist.git',
    demoData: true,
    architecture: ['React SPA', 'TanStack Query + Zod', 'Supabase Auth & APIs', 'PostgreSQL triggers & RLS', 'Real-time notifications'],
    caseStudy: {
      problem: {
        en: 'Logistics companies juggle shipments, wallets and user roles across disconnected tools, with no single auditable system.',
        ar: 'شركات اللوجستيات بتدير الشحنات والمحافظ والأدوار في أدوات منفصلة، من غير نظام موحّد قابل للتدقيق.',
      },
      goal: {
        en: 'Deliver one integrated dashboard covering logistics, finance, user management and support workflows.',
        ar: 'تقديم لوحة واحدة متكاملة تغطي اللوجستيات والمالية وإدارة المستخدمين وتذاكر الدعم.',
      },
      solution: {
        en: 'A React + TypeScript ERP with Tailwind and Shadcn/UI, TanStack Query for server state, Zod-validated forms, and Supabase/PostgreSQL on the backend — including automated financial logic via PostgreSQL triggers and real-time notifications.',
        ar: 'نظام ERP بـ React + TypeScript مع Tailwind و Shadcn/UI، و TanStack Query لحالة السيرفر، ونماذج متحقق منها بـ Zod، و Supabase/PostgreSQL في الباك إند — بما فيها أتمتة المنطق المالي بـ triggers في PostgreSQL وإشعارات لحظية.',
      },
      features: [
        { en: 'Shipments, transactions & wallet management', ar: 'الشحنات والمعاملات وإدارة المحفظة' },
        { en: 'Users, reports & settings', ar: 'المستخدمين والتقارير والإعدادات' },
        { en: 'Authentication & RBAC per role', ar: 'مصادقة وصلاحيات حسب الدور' },
        { en: 'Automated business logic via PostgreSQL triggers', ar: 'أتمتة منطق الأعمال بـ PostgreSQL triggers' },
        { en: 'Support tickets, notifications & audit flows', ar: 'تذاكر دعم وإشعارات وسير عمل تدقيقي' },
      ],
      notes: {
        en: 'All figures shown in the interface are demo data. Financial automation is enforced at the database level so business rules hold regardless of the client.',
        ar: 'كل الأرقام الظاهرة في الواجهة بيانات تجريبية. الأتمتة المالية مطبقة على مستوى قاعدة البيانات عشان قواعد العمل تفضل ثابتة مهما كان العميل.',
      },
    },
  },
  {
    slug: 'glocima',
    title: 'Eye Diagnostics Pro — Glocima',
    category: { en: 'Medical AI', ar: 'ذكاء اصطناعي طبي' },
    description: {
      en: 'AI-powered retinal image classification workflow supporting early identification of common retinal conditions.',
      ar: 'سير عمل لتحليل صور الشبكية بالذكاء الاصطناعي لدعم الكشف المبكر عن أمراض الشبكية الشائعة.',
    },
    technologies: ['Python', 'Deep Learning', 'Computer Vision', 'CNN'],
    image: '/images/glocima.png',
    accent: '#8b5cf6',
    disclaimer: 'glocima',
    architecture: ['Retinal scan upload', 'Image preprocessing', 'CNN model', 'Classification', 'Heatmap + confidence report'],
    caseStudy: {
      problem: {
        en: 'Common retinal conditions such as Glaucoma, CNV, DME and DRUSEN benefit from earlier attention, but specialized analysis is not always immediately accessible.',
        ar: 'أمراض الشبكية الشائعة زي الجلوكوما و CNV و DME و DRUSEN بتحتاج اكتشاف مبكر، لكن التحليل المتخصص مش متاح دايمًا بسرعة.',
      },
      goal: {
        en: 'Explore an AI-assisted workflow that classifies retinal scans and highlights suspicious regions for review.',
        ar: 'استكشاف سير عمل بالذكاء الاصطناعي يصنّف صور الشبكية ويبرز المناطق المشتبه فيها للمراجعة.',
      },
      solution: {
        en: 'A Python deep-learning pipeline using convolutional neural networks and computer vision: scans are preprocessed, classified into Glaucoma / CNV / DME / DRUSEN, and visualized with heatmaps and confidence indicators.',
        ar: 'خط معالجة بلغة Python باستخدام الشبكات العصبية الالتفافية ورؤية حاسوبية: الصور بتتعالج وتتصنّف (جلوكوما / CNV / DME / DRUSEN) وتتعرض مع heatmap ومؤشر ثقة.',
      },
      features: [
        { en: 'Classification into Glaucoma, CNV, DME, DRUSEN', ar: 'تصنيف إلى جلوكوما و CNV و DME و DRUSEN' },
        { en: 'Confidence visualization', ar: 'عرض درجة الثقة' },
        { en: 'Heatmap highlighting of suspicious regions', ar: 'خريطة حرارية للمناطق المشتبه فيها' },
        { en: 'Original vs analysis comparison view', ar: 'مقارنة بين الصورة الأصلية والتحليل' },
      ],
      notes: {
        en: 'Built as a decision-support exploration. It does not claim medical certification, clinical deployment, or doctor replacement.',
        ar: 'مبني كاستكشاف لدعم القرار. لا يدّعي اعتمادًا طبيًا ولا نشرًا سريريًا ولا بديلًا عن الطبيب.',
      },
    },
  },
  {
    slug: 'baby-cry-analyzer',
    title: 'Baby Cry Analyzer',
    category: { en: 'Mobile AI · Healthcare', ar: 'ذكاء اصطناعي موبايل · صحة' },
    description: {
      en: 'Mobile healthcare application that analyzes infant crying and provides supporting care features.',
      ar: 'تطبيق موبايل صحي يحلل بكاء الرضّع ويقدم مميزات داعمة للعناية.',
    },
    technologies: ['Flutter', 'Dart', 'Supabase', 'Google ML Kit'],
    image: '/images/baby-cry-analyzer.png',
    accent: '#e879f9',
    disclaimer: 'baby',
    architecture: ['Microphone input', 'Audio analysis · ML Kit', 'Cry classification', 'Care recommendations', 'PDF health report'],
    caseStudy: {
      problem: {
        en: 'New parents often struggle to interpret why their baby is crying, especially during stressful nights.',
        ar: 'الأهل الجداد كتير بيعانوا في تفسير سبب بكاء طفلهم، خصوصًا في الليالي الصعبة.',
      },
      goal: {
        en: 'Provide a friendly mobile assistant that analyzes crying patterns and suggests possible causes with calming support features.',
        ar: 'تقديم مساعد موبايل ودود يحلل أنماط البكاء ويقترح أسباب محتملة مع مميزات تهدئة.',
      },
      solution: {
        en: 'A Flutter app using Google ML Kit for on-device audio analysis, Supabase for data, plus smart nanny sounds, a medical chatbot, IoT simulation and PDF health reports.',
        ar: 'تطبيق Flutter بيستخدم Google ML Kit لتحليل الصوت على الجهاز، و Supabase للبيانات، مع أصوات تهدئة و chatbot طبي ومحاكاة Ioت وتقارير PDF.',
      },
      features: [
        { en: 'AI baby-cry analysis', ar: 'تحليل ذكي لبكاء الرضيع' },
        { en: 'Smart nanny sounds (lullabies, white noise)', ar: 'أصوات تهدئة (تهويد وأصوات بيضاء)' },
        { en: 'Medical chatbot guidance', ar: 'إرشاد عبر chatbot طبي' },
        { en: 'IoT simulation for monitoring', ar: 'محاكاة IoT للمراقبة' },
        { en: 'PDF health reports', ar: 'تقارير صحية PDF' },
      ],
      notes: {
        en: 'Presented as a parenting-assist prototype — not a medically validated diagnostic system.',
        ar: 'مقدّم كنموذج مساعد للأهل — مش نظام تشخيصي معتمد طبيًا.',
      },
    },
  },
  {
    slug: 'ai-chatbot',
    title: 'AI Chatbot',
    category: { en: 'Conversational AI', ar: 'ذكاء اصطناعي محادثي' },
    description: {
      en: 'AI chatbot application with streaming responses and support for multiple AI providers.',
      ar: 'تطبيق chatbot بالذكاء الاصطناعي مع ردود متدفقة ودعم لعدة مزودي AI.',
    },
    technologies: ['Next.js', 'TypeScript', 'AI SDK', 'Vercel'],
    image: '/images/ai-chatbot.png',
    accent: '#60a5fa',
    architecture: ['Next.js UI', 'AI SDK', 'Provider adapter layer', 'Streaming response', 'Vercel edge deployment'],
    caseStudy: {
      problem: {
        en: 'Conversational interfaces need to feel instant — waiting for a full response before rendering breaks the experience.',
        ar: 'واجهات المحادثة لازم تحس إنها فورية — الاستنارة للرد الكامل قبل العرض بيكسر التجربة.',
      },
      goal: {
        en: 'Build a chat interface with streaming responses and a provider layer that can switch between AI backends.',
        ar: 'بناء واجهة محادثة بردود متدفقة وطبقة مزودين تقدر تتبديل بين خدمات AI.',
      },
      solution: {
        en: 'A Next.js + TypeScript chatbot using the AI SDK for streaming, with a clean conversational interface, deployed on Vercel.',
        ar: 'تطبيق Next.js + TypeScript بيستخدم AI SDK للردود المتدفقة، مع واجهة محادثة نظيفة، منشور على Vercel.',
      },
      features: [
        { en: 'Streaming AI responses', ar: 'ردود AI متدفقة' },
        { en: 'Multiple AI provider integration', ar: 'دمج عدة مزودي AI' },
        { en: 'Conversational interface', ar: 'واجهة محادثة' },
      ],
      notes: {
        en: 'Streaming is implemented at the route level so tokens render as they arrive — perceived latency drops dramatically.',
        ar: 'التدفق مطبق على مستوى الـ route عشان الرموز تظهر أول بأول — فوقت الانتظار المُحسوس بيقل بشكل كبير.',
      },
    },
  },
]

export const skills = {
  frontend: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS', 'Shadcn/UI', 'HTML5', 'CSS3'],
  backend: ['Node.js', 'Express.js', 'ASP.NET Core', 'REST APIs', 'JWT', 'Auth & Authorization'],
  database: ['PostgreSQL', 'Supabase', 'MySQL', 'MongoDB (basics)'],
  mobile: ['Flutter', 'Dart'],
  ai: ['Python', 'Deep Learning', 'Computer Vision', 'AI integration'],
  iot: ['MQTT', 'EMQX', 'Industrial IoT', 'API Integration'],
  tools: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel'],
}

export const constellation: { name: string; category: string; x: number; y: number; projects: string[] }[] = [
  { name: 'React', category: 'frontend', x: 76, y: 16, projects: ['NOVA', 'Wayflow', 'AI Chatbot'] },
  { name: 'TypeScript', category: 'frontend', x: 90, y: 44, projects: ['NOVA', 'Wayflow', 'AI Chatbot'] },
  { name: '.NET Core', category: 'backend', x: 72, y: 78, projects: ['NOVA'] },
  { name: 'Node.js', category: 'backend', x: 33, y: 84, projects: ['Wayflow'] },
  { name: 'PostgreSQL', category: 'database', x: 10, y: 58, projects: ['NOVA', 'Wayflow'] },
  { name: 'Supabase', category: 'database', x: 16, y: 22, projects: ['Wayflow', 'Baby Cry Analyzer'] },
  { name: 'AI / CV', category: 'ai', x: 40, y: 8, projects: ['Glocima', 'Baby Cry Analyzer', 'AI Chatbot'] },
  { name: 'IoT', category: 'iot', x: 58, y: 6, projects: ['NOVA'] },
  { name: 'Flutter', category: 'mobile', x: 6, y: 38, projects: ['Baby Cry Analyzer'] },
  { name: 'Docker', category: 'tools', x: 92, y: 68, projects: ['NOVA'] },
]

export const journey: { en: string; ar: string; detail?: { en: string; ar: string } }[] = [
  { en: 'Software Development Learning', ar: 'بداية تعلّم تطوير البرمجيات' },
  { en: 'SEF Academy — Full Stack Trainee', ar: 'SEF Academy — متدرب Full Stack', detail: { en: 'Apr 2025 – Jul 2026 · 4+ full-stack team applications', ar: 'أبريل 2025 – يوليو 2026 · أكتر من 4 تطبيقات فول ستاك جماعية' } },
  { en: 'Team Projects', ar: 'مشاريع جماعية' },
  { en: 'Full Stack Development', ar: 'تطوير Full Stack' },
  { en: 'Enterprise ERP — Wayflow', ar: 'نظام ERP — Wayflow' },
  { en: 'Industrial IoT — NOVA', ar: 'IoT صناعي — NOVA' },
  { en: 'AI / Mobile Projects', ar: 'مشاريع الذكاء الاصطناعي والموبايل' },
]

export const links = {
  email: 'mahmoudmoslhey932@gmail.com',
  github: 'https://github.com/Moslhi',
  linkedin: 'https://www.linkedin.com/in/mahmoud-moslhey-272392367',
  cv: '/cv/mahmoud-moslhey-cv.pdf',
}

export const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '2011211117953'
export const whatsappDisplay = import.meta.env.VITE_WHATSAPP_DISPLAY || '+20 112 1111 7953'
export const whatsappSecondary = import.meta.env.VITE_WHATSAPP_SECONDARY || '+20 109 795 0437'
export const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Mahmoud, I found your portfolio and would like to discuss a project.')}`
