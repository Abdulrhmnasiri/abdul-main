import type { Evidence, GateExample, GuideScreen, ProgressItem } from './types.ts';

// Claims here were verified against the project repositories and recorded
// pilot runs. A technology is listed only if the code actually imports it,
// not merely because it is installed. The User Guide is an internal client
// project, so its screens are illustrations with placeholder content.

export const guide = {
  screens: [
    {
      id: 'procedure',
      tab: { ar: 'الإجراء', en: 'Procedure' },
    },
    {
      id: 'assistant',
      tab: { ar: 'المساعد', en: 'Assistant' },
    },
    {
      id: 'support',
      tab: { ar: 'الدعم', en: 'Support' },
    },
    {
      id: 'permissions',
    },
  ] satisfies GuideScreen[],

  /** The two questions the assistant screen answers. */
  routes: [
    {
      phrase: { ar: 'كيف أبدأ الإجراء؟', en: 'How do I start the procedure?' },
      keyword: { ar: 'أبدأ', en: 'start' },
      destination: { ar: 'الخطوة الأولى', en: 'First step' },
      go: 'procedure',
    },
    {
      phrase: { ar: 'من يملك صلاحية الاعتماد؟', en: 'Who can approve a request?' },
      keyword: { ar: 'صلاحية', en: 'approve' },
      destination: { ar: 'الصلاحيات والاعتمادات', en: 'Permissions and approvals' },
      go: 'permissions',
    },
  ],

  evidence: {
    decisions: [
      {
        title: { ar: 'توسيع Material for MkDocs عبر overrides', en: 'Material for MkDocs, extended with overrides' },
        body: {
          ar: 'المحتوى في Markdown، وتعديلات الواجهة في overrides منفصلة؛ فيبقى الدليل سهل التحديث والترقية.',
          en: 'Content stays in Markdown and interface changes live in separate overrides, so the guide stays easy to update and upgrade.',
        },
      },
      {
        title: { ar: 'طبقة RTL كاملة', en: 'A complete RTL layer' },
        body: {
          ar: 'الهيدر والتنقل والشريط الجانبي وفهرس المحتوى وسلوك الجوال مصممة للعربية، أبعد من دعم الثيم الافتراضي.',
          en: 'Header, navigation, sidebar, table of contents and mobile behavior designed for Arabic, beyond the theme’s default RTL support.',
        },
      },
      {
        title: { ar: 'كلمات مفتاحية منسقة بدل نموذج لغوي', en: 'Curated keywords instead of a language model' },
        body: {
          ar: 'كل إجابة تقود إلى صفحة مُراجعة، فيبقى السلوك متوقعًا وقابلًا للتدقيق.',
          en: 'Every answer leads to a reviewed page, keeping behavior predictable and auditable.',
        },
      },
      {
        title: { ar: 'طلب الدعم كوحدات مستقلة', en: 'Support requests as independent modules' },
        body: {
          ar: 'التحقق والمرفقات وحالة الجلسة والمعاينة في وحدات JavaScript منفصلة عن المحتوى، لتسهل إضافة الربط مع backend لاحقًا.',
          en: 'Validation, attachments, session state and preview live in JavaScript modules separate from the content, so a backend can be connected later.',
        },
      },
    ],
    technologies: ['MkDocs', 'Material for MkDocs', 'Markdown', 'JavaScript', 'CSS', 'Python'],
    skills: [
      { ar: 'هندسة التوثيق (Docs-as-Code)', en: 'Documentation engineering (docs-as-code)' },
      { ar: 'هيكلة المعلومات', en: 'Information architecture' },
      { ar: 'تخصيص الواجهات RTL', en: 'RTL front-end customization' },
      { ar: 'التحقق من النماذج وإدارة الحالة', en: 'Form validation and state management' },
    ],
  } satisfies Evidence,
};

export const advisor = {
  /** Set to a public URL once a live build exists; the section shows it only then. */
  demoUrl: null as string | null,

  /**
   * A recorded exchange from the July 2026 pilot, on a synthetic test
   * statement. The candidate line is the test input; the advisor lines are
   * the model's recorded response, excerpted without rewording. The phone
   * replays it; it is not a live conversation. Arabic on both pages, as the
   * product speaks Arabic.
   */
  consult: {
    candidate: 'برد على تكتات الدعم وأسوي troubleshooting للمشاكل وأتابع الـ SLA مع الفريق',
    read: 'النقطة تصف مهام الدعم الفني بوضوح، لكن استخدام الصياغة الشفهية يُضعف قيمتها في السيرة.',
    wording: 'معالجة تذاكر الدعم الفني وتشخيص المشكلات التقنية (Troubleshooting)، مع متابعة الالتزام باتفاقيات مستوى الخدمة (SLA) بالتنسيق مع الفريق.',
    question: 'إذا كانت لديك نسبة معينة للالتزام بالـ SLA (مثل 95%+) أو عدد تقريبي للتذاكر التي تتعامل معها، هل تود إضافتها لتقوية الأثر؟',
  },

  gate: [
    {
      id: 'confirmed',
      statement: { ar: 'أطابق الفواتير مع أوامر الشراء شهريًا', en: 'I reconcile invoices against purchase orders monthly' },
      origin: { ar: 'أكده صاحب السيرة', en: 'Confirmed by the candidate' },
      stop: 'stored',
    },
    {
      id: 'market',
      statement: { ar: 'خبرة في أنظمة ERP', en: 'Experienced with ERP systems' },
      origin: { ar: 'مقترح من بيانات السوق', en: 'Suggested from market data' },
      stop: 'source',
    },
    {
      id: 'seniority',
      statement: { ar: 'قدت إدارة المالية', en: 'Led the finance department' },
      origin: { ar: 'ادعاء أقدمية دون سند', en: 'Seniority claim without support' },
      stop: 'claim',
    },
  ] satisfies GateExample[],

  status: [
    {
      label: { ar: 'خدمة Backend API مع مسار تحقق الحقائق', en: 'Backend API with the fact-verification pipeline' },
      note: { ar: 'مغطى باختبارات unit وintegration', en: 'covered by unit and integration tests' },
      state: 'done',
    },
    {
      label: { ar: 'تكامل حي مع Gemini API', en: 'Live Gemini API integration' },
      note: { ar: 'نُفّذت استدعاءات ناجحة على حالات اختبار في يوليو 2026', en: 'successful calls on test cases, July 2026' },
      state: 'done',
    },
    {
      label: { ar: 'واجهة ويب بـ React', en: 'React web client' },
      state: 'done',
    },
    {
      label: { ar: 'إطلاق عام للمستخدمين', en: 'Public release' },
      state: 'building',
    },
  ] satisfies ProgressItem[],

  evidence: {
    decisions: [
      {
        title: { ar: 'الحقيقة قبل الصياغة', en: 'Facts before wording' },
        body: {
          ar: 'لا تُحفظ العبارة إلا بعد تأكيد صاحبها واجتياز فحوص مبنية على قواعد؛ فتُرفض اقتراحات السوق وادعاءات الأقدمية غير المسندة.',
          en: 'A statement is stored only after its owner confirms it and rule-based checks pass, so market suggestions and unsupported seniority claims are rejected.',
        },
      },
      {
        title: { ar: 'مستويان من النماذج مع بوابة في الكود', en: 'Two model tiers behind a code gate' },
        body: {
          ar: 'نموذج سريع للتشخيص، ونموذج أعلى كلفة يبقى مقفلًا حتى تكتمل المعلومات المطلوبة، مع فحص لميزانية الاستخدام قبل كل استدعاء.',
          en: 'A fast model handles diagnosis; the costlier model stays locked until the required information is complete, and every call passes a usage-budget check.',
        },
      },
      {
        title: { ar: 'فصل مزودي الذكاء الاصطناعي عبر Ports وAdapters', en: 'Ports and adapters for AI providers' },
        body: {
          ar: 'المزود الحي يُختار عبر الإعدادات، وتعمل نسخ mock حتمية في التطوير المحلي والاختبارات، فلا تعتمد الاختبارات على استدعاء مدفوع.',
          en: 'The live provider is selected through configuration, while deterministic mocks run in local development and tests, so the test suite never depends on a paid call.',
        },
      },
      {
        title: { ar: 'التحقق من مخرجات النموذج بـ Zod', en: 'Model output validated with Zod' },
        body: {
          ar: 'تُطابق استجابة النموذج مع schema قبل استخدامها، فيفشل الخطأ بوضوح بدل أن يصل إلى المستخدم.',
          en: 'Responses are parsed against a schema before use, so malformed output fails loudly instead of reaching the user.',
        },
      },
    ],
    technologies: ['TypeScript', 'Node.js', 'Fastify', 'Prisma', 'Zod', 'Vitest', 'React', 'Gemini API'],
    skills: [
      { ar: 'Clean Architecture', en: 'Clean Architecture' },
      { ar: 'تصميم REST API والتحقق من المدخلات', en: 'REST API design and input validation' },
      { ar: 'تكامل AI API', en: 'AI API integration' },
      { ar: 'نمذجة البيانات وMigrations', en: 'Data modeling and migrations' },
      { ar: 'الاختبار الآلي', en: 'Automated testing' },
    ],
  } satisfies Evidence,
};
