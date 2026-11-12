import type { Locale } from './types.ts';

const ar = {
  meta: {
    title: 'عبدالرحمن عسيري — مهندس دعم تقني',
    description: 'مهندس دعم تقني ودعم تطبيقات في الرياض بخبرة 6 سنوات. دليل مستخدم في Production، ومستشار مهني قيد البحث والتطوير.',
  },
  skipLink: 'انتقل إلى المحتوى',
  nav: { label: 'التنقل', work: 'الأعمال', contact: 'تواصل', cv: 'السيرة الذاتية' },
  switchLanguage: { label: 'English', hint: 'View in English' },
  hero: {
    role: 'مهندس دعم تقني',
    roleAlt: 'مهندس دعم تطبيقات',
    years: '6 سنوات خبرة',
    place: 'الرياض',
    line: 'أدعم التطبيقات وأحل مشكلات التشغيل، وأطوّر الأدوات والأنظمة التي تجعلها أسهل استخدامًا وأكثر موثوقية.',
    index: 'المشاريع',
  },
  guide: {
    title: 'دليل المستخدم',
    lede: 'دليل مدمج في نظام تشغيلي متعدد الوحدات، يجمع الإجراءات والصلاحيات والفيديو في مكان واحد.',
    illustration: 'نموذج تفاعلي توضيحي',
    screensLabel: 'شاشات الدليل',
  },
  evidence: {
    decisions: 'القرارات التقنية',
    technologies: 'التقنيات المستخدمة',
    skills: 'المهارات الهندسية',
    status: 'الحالة',
  },
  advisor: {
    title: 'مستشار مهني',
    lede: 'إرشاد مهني يُبقي السيرة الذاتية ضمن ما أكده صاحبها.',
    gateTitle: 'متى تُحفظ العبارة كحقيقة؟',
    gateHint: 'اختر عبارة',
    gateNote: 'مدخلات توضيحية. الفحوص منفّذة ومختبرة، وتعتمد على قواعد لا على الذكاء الاصطناعي.',
    nodes: { confirm: 'التأكيد', source: 'فحص المصدر', claim: 'فحص الادعاء', stored: 'الحفظ' },
    outcomes: {
      stored: 'حُفظت: أكدها صاحبها واجتازت الفحوص.',
      source: 'أُوقفت: اقتراحات السوق لا تُحفظ مباشرة كحقائق.',
      claim: 'أُوقفت: ادعاء أقدمية لا تسنده الحقائق المؤكدة.',
    },
    interactive: 'مثال تفاعلي',
    recorded: 'رد المستشار من تشغيل تجريبي مسجّل، وليس محادثة حية.',
    building: 'قيد التطوير',
    demoOn: 'Live Demo',
  },
  contact: {
    title: 'تواصل',
    message: 'أرسل رسالة',
    cv: 'السيرة الذاتية',
    form: {
      title: 'رسالة',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      body: 'الرسالة',
      submit: 'إرسال',
      close: 'إغلاق',
      required: 'يرجى إكمال الحقول المطلوبة.',
      captcha: 'يرجى إكمال التحقق قبل الإرسال.',
      sending: 'جارٍ الإرسال…',
      sent: 'وصلت رسالتك، شكرًا لك.',
      failed: 'تعذّر الإرسال حاليًا. يمكنك التواصل عبر LinkedIn.',
    },
  },
};

export type UiStrings = typeof ar;

const en: UiStrings = {
  meta: {
    title: 'Abdulrahman Asiri — Technical Support Engineer',
    description:
      'Technical Support and Application Support Engineer in Riyadh with 6 years of experience. A User Guide in production, and a Career Advisor in research and development.',
  },
  skipLink: 'Skip to content',
  nav: { label: 'Sections', work: 'Work', contact: 'Contact', cv: 'CV' },
  switchLanguage: { label: 'العربية', hint: 'عرض الصفحة بالعربية' },
  hero: {
    role: 'Technical Support Engineer',
    roleAlt: 'Application Support Engineer',
    years: '6 years',
    place: 'Riyadh',
    line: 'I support applications and resolve operational issues, and I build the tools and systems that make them easier to use and more reliable.',
    index: 'Projects',
  },
  guide: {
    title: 'User Guide',
    lede: 'An in-app guide for a multi-module operational system, bringing procedures, permissions and video into one place.',
    illustration: 'Interactive illustration',
    screensLabel: 'Guide screens',
  },
  evidence: {
    decisions: 'Technical Decisions',
    technologies: 'Technologies Used',
    skills: 'Applied Engineering Skills',
    status: 'Status',
  },
  advisor: {
    title: 'Career Advisor',
    lede: 'Career guidance that keeps a CV within what its owner has confirmed.',
    gateTitle: 'When does a statement become a fact?',
    gateHint: 'Choose a statement',
    gateNote: 'Example inputs. The checks are implemented and tested, and they are rule-based, not AI.',
    nodes: { confirm: 'Confirmed', source: 'Source check', claim: 'Claim check', stored: 'Stored' },
    outcomes: {
      stored: 'Stored: confirmed by its owner and passed every check.',
      source: 'Stopped: market suggestions are never stored directly as facts.',
      claim: 'Stopped: a seniority claim the confirmed facts do not support.',
    },
    interactive: 'Interactive example',
    recorded: 'The advisor reply is from a recorded test run, not a live conversation.',
    building: 'in development',
    demoOn: 'Live Demo',
  },
  contact: {
    title: 'Contact',
    message: 'Send a message',
    cv: 'CV',
    form: {
      title: 'Message',
      name: 'Name',
      email: 'Email',
      body: 'Message',
      submit: 'Send',
      close: 'Close',
      required: 'Please complete the required fields.',
      captcha: 'Please complete the verification before sending.',
      sending: 'Sending…',
      sent: 'Message sent. Thank you.',
      failed: "Couldn't send right now. You can reach me on LinkedIn.",
    },
  },
};

export const strings: Record<Locale, UiStrings> = { ar, en };
