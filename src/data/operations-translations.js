// Public-safe case-study copy for the Embedded Operational Knowledge & Support
// Center project. Content is intentionally domain-neutral: no client name,
// no ministry/government references, no internal system name, no real
// operational-module vocabulary from the source project.

// Fast-navigation entries for the case study. `id` matches the existing
// `ops-sec-*` article ids in operations-knowledge-center.html; `sectionKey`
// points to the matching key under `sections` below for the display title.
export const opsFileTree = [
  { id: 'problem', sectionKey: 'problem', num_ar: '٠١', num_en: '01' },
  { id: 'mkdocs', sectionKey: 'whyMkdocs', num_ar: '٠٢', num_en: '02' },
  { id: 'architecture', sectionKey: 'architecture', num_ar: '٠٣', num_en: '03' },
  { id: 'embedded', sectionKey: 'embedded', num_ar: '٠٤', num_en: '04' },
  { id: 'assistant', sectionKey: 'assistant', num_ar: '٠٥', num_en: '05' },
  { id: 'guidance', sectionKey: 'guidance', num_ar: '٠٦', num_en: '06' },
  { id: 'impact', sectionKey: 'impact', num_ar: '٠٧', num_en: '07' },
  { id: 'escalation', sectionKey: 'escalation', num_ar: '٠٨', num_en: '08' },
  { id: 'tradeoffs', sectionKey: 'tradeoffs', num_ar: '٠٩', num_en: '09' },
  { id: 'role', sectionKey: 'role', num_ar: '١٠', num_en: '10' },
  { id: 'current', sectionKey: 'current', num_ar: '١١', num_en: '11' },
];

export const opsI18n = {
  ar: {
    page_title: 'مركز معرفة ودعم تشغيلي مدمج داخل التطبيق — عبدالرحمن عسيري',
    meta_description: 'دراسة حالة تطبيقية لمركز معرفة تشغيلي مبني بـMarkdown وMkDocs، مدمج داخل تجربة تطبيق حقيقي بواجهة عربية مخصصة ومساعد تنقّل بالكلمات المفتاحية.',

    filetree_label: 'أقسام دراسة الحالة',

    hero: {
      kicker: 'عمل تطبيقي · هندسة معرفة وتجربة دعم',
      title: 'مركز معرفة ودعم تشغيلي مدمج داخل التطبيق',
      intro: 'حوّلت الإرشاد التشغيلي من ملفات متفرقة وإجابات متكررة إلى طبقة معرفة مدمجة داخل التطبيق. يعتمد الحل على Markdown وMkDocs، ويُستخدم داخل نظام تشغيلي متعدد الوحدات عبر واجهة عربية مخصصة ومسار دعم ذاتي قابل للصيانة.',
    },

    sections: {
      problem: {
        title: 'المشكلة التشغيلية وهدف التصميم',
        body: 'تظهر صعوبة الأنظمة التشغيلية عندما لا يعرف المستخدم المسار المناسب لحالته، أو الصلاحية المطلوبة، أو الخطوة التالية ومكان الاعتماد. هدف التصميم لم يكن إضافة توثيق جديد، بل جمع التعليمات، وإرشاد سير العمل والصلاحيات، ومراجع الفيديو، والتنقّل الموجّه في تجربة واحدة داخل التطبيق تقلل الحاجة للبحث خارج سياق العمل.',
      },

      whyMkdocs: {
        title: 'لماذا MkDocs',
        body: 'اختير MkDocs لثلاثة أسباب: تأليف سريع بـMarkdown، وفصل واضح بين المحتوى ومنطق التطبيق، ومخرجات ساكنة يمكن اختبارها ومراجعتها قبل الإصدار. أتاح Material for MkDocs تخصيص واجهة عربية RTL، بينما ساعدت الروابط النسبية على التضمين داخل التطبيق دون قاعدة بيانات لطبقة المعرفة. ومع نمو الوحدات، يتطلب هذا النهج حوكمة واضحة لشجرة التنقّل والمحتوى.',
        tradeoffLabel: 'المقايضة',
        tradeoffBody: 'كل تحديث للمحتوى يحتاج بناءً وإصدارًا جديدًا، والبحث الساكن لا يفهم الصياغات الحرة، كما تضيف تخصيصات JavaScript مسؤولية صيانة مستمرة.',
      },

      architecture: {
        title: 'المعمارية التقنية',
        layers: [
          { title: 'طبقة المحتوى', body: 'صفحات Markdown منظمة حسب الوحدات التشغيلية، تشمل خطوات العمل، وإرشاد الصلاحيات، ومراجع الفيديو.' },
          { title: 'طبقة البناء الساكن', body: 'يحوّل MkDocs وMaterial for MkDocs المحتوى إلى موقع ساكن بمسارات تنقّل نسبية.' },
          { title: 'طبقة التجربة', body: 'واجهة عربية RTL مخصصة، تشمل الهيدر، والتنقّل، والشريط الجانبي، وفهرس المحتوى، وسلوكًا مخصصًا للجوال.' },
          { title: 'طبقة الإرشاد', body: 'مساعد تنقّل قائم على الكلمات المفتاحية يوجّه المستخدم إلى صفحة أو قسم محدد.' },
          { title: 'طبقة التضمين داخل التطبيق', body: 'صُمم الدليل ليعمل كتجربة دعم مدمجة داخل التطبيق، لا كموقع مستقل.' },
          { title: 'امتداد تصعيد الدعم', body: 'تجربة أمامية لإنشاء التذاكر عندما تتجاوز الحالة حدود الإرشاد الذاتي.' },
        ],
      },

      embedded: {
        title: 'التجربة المدمجة والتخصيص العربي',
        body: 'صُمم الدليل ليعمل داخل التطبيق كطبقة دعم ذاتي. فرض ذلك مسارات نسبية، وتنقّلًا يحترم سياق التطبيق المضيف، وتخصيصًا يتجاوز مظهر MkDocs الافتراضي. شمل التخصيص اتجاه RTL، والعناصر التفاعلية، والهيدر، والشريط الجانبي، وفهرس المحتوى، وسلوك العرض على الجوال.',
      },

      assistant: {
        title: 'مساعد تنقّل قائم على الكلمات المفتاحية',
        body: [
          'اعتمدت مساعد تنقّل قائمًا على مفردات ووجهات منسقة يدويًا بدل نموذج لغة مفتوح، ليبقى سلوكه متوقعًا وقابلًا للمراجعة.',
          'يربط المساعد العبارات التشغيلية المتكررة بالصفحة أو القسم المناسب، ويكمل البحث الساكن بمسار مباشر إلى الإرشاد المطلوب.',
        ],
        exampleLabel: 'مثال مبسّط',
        examples: [
          { q: '«كيف أبدأ الإجراء؟»', a: 'توجيه مباشر إلى صفحة الخطوة الأولى في الوحدة المعنية.' },
          { q: '«من يملك صلاحية الاعتماد؟»', a: 'توجيه مباشر إلى صفحة الصلاحيات والاعتمادات.' },
        ],
      },

      guidance: {
        title: 'إرشاد سير العمل والصلاحيات والفيديو',
        body: 'يتجاوز المحتوى الشرح العام إلى توضيح ما يسبق كل خطوة، ومن يملك صلاحية تنفيذها أو اعتمادها، وما الذي يليها. وتظهر مراجع الفيديو داخل الصفحات نفسها عندما يكون العرض المرئي أوضح من النص، دون فصلها عن سياق التعليمات.',
      },

      impact: {
        title: 'الأثر التشغيلي',
        intro: 'أثر نوعي ناتج عن طبيعة التنفيذ، وليس قياسًا رقميًا موثقًا:',
        list: [
          'مركزة الإرشاد المكتوب والمرئي في تجربة واحدة منظمة.',
          'نقل الشرح المتكرر إلى مسار خدمة ذاتية داخل التطبيق.',
          'دعم اتساق التعليمات التشغيلية عبر مصدر منظم وقابل للصيانة.',
          'تقريب المستخدم من المسار أو الصفحة أو التعليمة المناسبة.',
          'تسهيل صيانة المحتوى عبر التأليف بـMarkdown والبناء الساكن.',
        ],
      },

      escalation: {
        title: 'امتداد لمسار تصعيد الدعم',
        body: 'صممت تجربة أمامية منظمة لتصعيد الحالات التي لا يحسمها المحتوى الإرشادي، تشمل التحقق من المدخلات، وإدارة حالة النموذج، والمرفقات، والمعاينة قبل الإرسال. بُنيت نقاط التكامل منفصلة عن طبقة المحتوى، وبقيت التجربة امتدادًا تطويريًا خارج المسار التشغيلي المعتمد.',
      },

      tradeoffs: {
        title: 'قرارات تقنية ومقايضاتها',
        list: [
          { title: 'مساعد كلمات مفتاحية بدل نموذج لغة مفتوح', body: 'سلوك متوقع وقابل للمراجعة، مقابل عدم فهم الصياغات الحرة خارج المفردات المنسقة.' },
          { title: 'فصل نقاط تكامل تصعيد الدعم عن طبقة المحتوى', body: 'يحافظ على استقلال طبقة المعرفة، ويتيح إضافة الربط لاحقًا دون إعادة بناء تجربة الإرشاد.' },
          { title: 'تخصيص عربي RTL كامل', body: 'تجربة عربية قابلة للاستخدام الفعلي، مقابل مسؤولية صيانة أعلى للتنسيقات والسكربتات المخصصة.' },
        ],
      },

      role: {
        title: 'دوري في هذا المشروع',
        body: 'هيكلت تجربة المعرفة من الأساس: أعددت MkDocs، وخصّصت Material for MkDocs، وصممت سلوك RTL والجوال، ونظمت المحتوى بحسب الوحدات ومسارات العمل. طورت مساعد التنقّل بالكلمات المفتاحية، وصممت واجهة تصعيد الدعم كامتداد منفصل. تركّز دوري على طبقة المعرفة والدعم داخل تطبيق أوسع، ولم يشمل بناء التطبيق المضيف أو تكاملاته الأصلية.',
      },

      current: {
        title: 'الحالة الحالية وما يثبته هذا العمل',
        body: 'مركز المعرفة مستخدم فعليًا داخل تطبيق تشغيلي متعدد الوحدات كطبقة دعم ذاتي. أما تجربة تصعيد الدعم فبقيت امتدادًا تطويريًا منفصلًا خارج المسار التشغيلي المعتمد. يوضح هذا العمل القدرة على تحويل مشكلة دعم تشغيلية إلى نظام معرفة قابل للصيانة والتوسع، واتخاذ قرارات تقنية واعية بحدودها.',
      },
    },
  },

  en: {
    page_title: 'Embedded Operational Knowledge & Support Center — Abdulrahman Asiri',
    meta_description: 'An applied case study of an operational knowledge center authored in Markdown with MkDocs, embedded inside a real application with a fully customized Arabic interface and a keyword-based navigation assistant.',

    filetree_label: 'Case Study Sections',

    hero: {
      kicker: 'Applied Systems Work · Knowledge Engineering & Support Experience',
      title: 'Embedded Operational Knowledge & Support Center',
      intro: 'I transformed scattered operational guidance and repeated support explanations into an embedded knowledge layer inside the application. Built with Markdown and MkDocs, it is used within a multi-module operational system through a fully customized Arabic interface and a maintainable self-service structure.',
    },

    sections: {
      problem: {
        title: 'The Operational Problem and Design Objective',
        body: "Operational systems become difficult when users cannot determine which workflow applies, what permission is required, what comes next, or where approval happens. The goal was not to add more documentation, but to bring instructions, workflow and permission guidance, video references, and guided navigation into one in-app experience that reduces the need to search outside the working context.",
      },

      whyMkdocs: {
        title: 'Why MkDocs',
        body: "MkDocs was selected for three reasons: fast Markdown authoring, clear separation between content and application logic, and static output that can be tested and reviewed before release. Material for MkDocs enabled a customized Arabic RTL interface, while relative links simplified embedding without requiring a database for the knowledge layer. As the number of modules grows, the approach also requires clear governance for navigation and content.",
        tradeoffLabel: 'Tradeoff',
        tradeoffBody: 'Every content update requires a new build and release; static search does not understand open-ended phrasing; and JavaScript customization adds ongoing maintenance responsibility.',
      },

      architecture: {
        title: 'Technical Architecture',
        layers: [
          { title: 'Content Layer', body: 'Markdown pages organized by operational unit, covering workflows, permission guidance, and video references.' },
          { title: 'Static Generation Layer', body: 'MkDocs and Material for MkDocs convert the content into a static site with relative navigation paths.' },
          { title: 'Experience Layer', body: 'A customized Arabic RTL interface covering the header, navigation, sidebar, table of contents, and dedicated mobile behavior.' },
          { title: 'Guidance Layer', body: 'A keyword-based navigation assistant that routes users to a specific page or section.' },
          { title: 'Application Embedding Layer', body: 'The guide was designed as an embedded support experience inside the application rather than as a standalone site.' },
          { title: 'Support Escalation Extension', body: 'A frontend ticket-creation experience for cases that go beyond self-service guidance.' },
        ],
      },

      embedded: {
        title: 'Embedded Experience and Arabic Customization',
        body: "The guide was designed as an in-app self-service layer. That required relative paths, navigation that respects the host application's context, and customization beyond the default MkDocs theme. The work covered RTL direction, interactive elements, the header, sidebar, table of contents, and dedicated mobile behavior.",
      },

      assistant: {
        title: 'Keyword-Based Navigation Assistant',
        body: [
          "I used a manually curated vocabulary and destination map instead of an open language model, keeping the behavior predictable and reviewable.",
          "The assistant maps recurring operational phrases to the relevant page or section and complements static search with a direct route to the required guidance.",
        ],
        exampleLabel: 'Simplified example',
        examples: [
          { q: '“How do I start the procedure?”', a: 'Direct routing to the first-step page of the relevant module.' },
          { q: '“Who holds approval permission?”', a: 'Direct routing to the permissions and approvals page.' },
        ],
      },

      guidance: {
        title: 'Workflow, Permission, and Video Guidance',
        body: "Content goes beyond general explanation by showing what precedes each step, who can execute or approve it, and what follows. Video references appear inside the relevant pages when visual demonstration is clearer than text, without separating the video from its written context.",
      },

      impact: {
        title: 'Operational Impact',
        intro: 'Qualitative impact based on the implementation, not documented quantitative measurement:',
        list: [
          'Centralized written and video guidance into one structured experience.',
          'Moved repeatable explanations into an in-app self-service path.',
          'Supported consistency through an organized and maintainable source of operational guidance.',
          'Brought users closer to the relevant workflow, page, or instruction.',
          'Simplified content maintenance through Markdown authoring and static generation.',
        ],
      },

      escalation: {
        title: 'Support Escalation Extension',
        body: "I designed a structured frontend support-escalation experience for cases not resolved by guidance. It includes input validation, form-state management, attachments, and submission preview. Integration points were kept separate from the content layer, and the experience remained a development extension outside the approved operational path.",
      },

      tradeoffs: {
        title: 'Technical Decisions and Tradeoffs',
        list: [
          { title: 'Curated Keyword Routing Instead of an Open Language Model', body: 'Predictable, reviewable behavior, with limited support for free-form phrasing outside the mapped vocabulary.' },
          { title: 'Separate Support-Escalation Integration Points', body: 'Preserves the independence of the knowledge layer and allows later connection without rebuilding the guidance experience.' },
          { title: 'Full Arabic RTL Customization', body: 'A genuinely usable Arabic experience, with higher maintenance responsibility for custom styles and scripts.' },
        ],
      },

      role: {
        title: 'My Role in This Project',
        body: "I structured the knowledge experience from the ground up: configured MkDocs, customized Material for MkDocs, designed RTL and mobile behavior, and organized content around operational modules and workflows. I developed the keyword-based navigation assistant and designed the frontend escalation experience as a separate extension. My role focused on the embedded knowledge and support layer within a wider application; it did not include building the host application or its original integrations.",
      },

      current: {
        title: 'Current State and What This Work Demonstrates',
        body: "The knowledge center is used inside a multi-module operational application as a self-service support layer. The support-escalation experience remained a separate development extension outside the approved operational path. This work demonstrates the ability to turn an operational-support problem into a maintainable, extensible knowledge system and to make technical decisions with clear implementation boundaries.",
      },
    },
  },
};
