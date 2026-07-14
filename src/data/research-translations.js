// Public-safe display labels for the dossier navigation. These are plain
// section ordinals, not real repository or file paths.
export const researchFileTree = [
  { id: 'overview', file_ar: '٠١', file_en: '01' },
  { id: 'question', file_ar: '٠٢', file_en: '02' },
  { id: 'authority', file_ar: '٠٣', file_en: '03' },
  { id: 'verification', file_ar: '٠٤', file_en: '04' },
  { id: 'gates', file_ar: '٠٥', file_en: '05' },
  { id: 'boundaries', file_ar: '٠٦', file_en: '06' },
  { id: 'evaluation', file_ar: '٠٧', file_en: '07' },
  { id: 'findings', file_ar: '٠٨', file_en: '08' },
];

// Language-independent status codes for the current-findings matrix, mapped
// to a localized display label per language so the visible chip always
// follows the selected reading language.
export const statusLabels = {
  ar: {
    implemented: 'تم التحقق بالتنفيذ',
    mock: 'تم التحقق بمحاكاة مضبوطة',
    not_connected: 'غير موصول بالمسار الفعلي',
    under_validation: 'قيد التحقق التجريبي',
    out_of_scope: 'خارج نطاق الدراسة',
  },
  en: {
    implemented: 'VERIFIED IN IMPLEMENTATION',
    mock: 'VERIFIED THROUGH CONTROLLED SIMULATION',
    not_connected: 'NOT CONNECTED TO THE LIVE PATH',
    under_validation: 'UNDER EXPERIMENTAL VALIDATION',
    out_of_scope: 'OUTSIDE THE STUDY SCOPE',
  },
};

export const researchI18n = {
  ar: {
    page_title: 'هندسة التحقق قبل القرار في الأنظمة المساعدة — عبدالرحمن عسيري',
    meta_description: 'يختبر هذا البحث فصل المعلومة المرشحة عن الحقيقة المعتمدة، وربط الانتقال إلى التوجيه بنقاط تحقق واضحة وقابلة للمراجعة. يركز النطاق الحالي على عقود القرار، وحالات التأكيد والرفض، ومستويات التنفيذ والتحقق، دون ادعاء اكتمال التحقق التجريبي أو التعميم خارج السياق المدروس.',

    filetree_label: 'أقسام البحث',

    hero: {
      kicker: 'بحث هندسي تطبيقي',
      title: 'هندسة التحقق قبل القرار في الأنظمة المساعدة',
      subtitle: 'دراسة تطبيقية لبناء حدود تمنع المعلومات غير المؤكدة من التحول إلى حقائق معتمدة أو أساس للتوجيه.',
      intro: 'يختبر هذا البحث فصل المعلومة المرشحة عن الحقيقة المعتمدة، وربط الانتقال إلى التوجيه بنقاط تحقق واضحة وقابلة للمراجعة. يركز النطاق الحالي على عقود القرار، وحالات التأكيد والرفض، ومستويات التنفيذ والتحقق، دون ادعاء اكتمال التحقق التجريبي أو التعميم خارج السياق المدروس.',
      statusNote: 'المسار الاستشاري الحالي يعمل بمحاكاة مضبوطة، ولا يوجد مزوّد توليدي حي متصل بالمسار العام حتى الآن.',
    },

    sections: {
      overview: {
        title: 'نظرة عامة',
        question: 'كيف يمكن منع اللغة المقنعة التي ينتجها النظام المساعد من التحول إلى حقيقة غير مؤكدة؟',
        body: [
          'لم يبدأ هذا البحث بسؤال: أي نموذج نربط؟ بل بسؤال أسبق: من يملك سلطة اعتماد المعلومة؟',
          'الصياغة المقترحة قد تبدو منطقية ومقنعة في السياقات المهنية، لكنها تظل استنتاجًا حتى تُعتمد صراحةً. لذلك بُني التنفيذ حول الفصل بين المدخل الخام، والمعلومة المرشحة، والمعلومة المعتمدة.',
        ],
        note: 'جودة المزوّد التوليدي مهمة، لكنها لا تكفي وحدها لحماية دقة المعلومة المعتمدة.',
      },

      question: {
        title: 'المشكلة البحثية',
        body: [
          'الأنظمة التي تولّد نصوصًا مهنية تواجه خطرًا محددًا: قد تنتقل المعلومة من "صياغة محتملة" إلى "حقيقة ضمنية" دون خطوة اعتماد واضحة. المشكلة ليست في وجود الاستنتاج، بل في منحه سلطة لا يملكها.',
          'بناءً على ذلك، حُددت ثلاثة حدود:',
        ],
        boundaries: [
          'المدخل الخام ليس حقيقة معتمدة.',
          'استنتاج النظام لا يساوي تأكيدًا صريحًا.',
          'لا يجوز الانتقال إلى مراحل لاحقة ما دامت فجوات مطلوبة قائمة.',
        ],
        notClaimed: 'لا يدّعي هذا البحث حل الهلوسة بصورة مطلقة، ولا يعتمد على جودة النموذج وحدها لحماية دقة المعلومة.',
      },

      authority: {
        title: 'سلطة الحقيقة',
        diagramTitle: 'من المدخل إلى المعلومة المعتمدة',
        nodes: ['مدخل خام', 'معلومة مرشحة', 'تأكيد أو تصحيح صريح', 'معلومة معتمدة', 'فحص الجاهزية', 'الانتقال المسموح'],
        branchFrom: 'تأكيد أو تصحيح صريح',
        branchLabel: 'رفض المعلومة',
        branchTarget: 'لا تُعتمد',
        caption: 'لا تنتقل المعلومة غير المؤكدة تلقائيًا إلى السجل المعتمد. الاعتماد يتطلب خطوة صريحة تمنح جهة التأكيد سلطة القبول أو التصحيح أو الرفض.',
        verifiedLabel: 'سلوك تم التحقق منه',
        verified: 'مسار التأكيد والترقية منفَّذ في التنفيذ ومربوط بمسار التشغيل.',
      },

      verification: {
        title: 'مسار التحقق',
        body: [
          'تعمل المعلومة المرشحة كمنطقة فاصلة بين ما استُخرج أو استُنتج وبين ما يمكن اعتماده، فتمنح النظام مساحة للتحليل دون حق تعديل الحقيقة المعتمدة مباشرة.',
        ],
        states: [
          { label: 'معلومة مرشحة', desc: 'غير معتمدة' },
          { label: 'معلومة معتمدة', desc: 'تم تأكيدها صراحةً' },
          { label: 'مرفوضة / مصححة', desc: 'رُفضت أو عُدّلت' },
        ],
        closing: 'هذا الفصل لا يمنع النظام من الاقتراح، لكنه يمنع الاقتراح من اكتساب صفة الحقيقة دون تأكيد صريح.',
      },

      gates: {
        title: 'بوابة الجاهزية في وقت التشغيل',
        body: 'عندما تبقى فجوات مطلوبة، تمنع بوابة الجاهزية الانتقال إلى المرحلة التالية، وتعيد حالة منظمة توضّح أن المتطلبات لم تكتمل — فلا يصل النظام إلى التوجيه قبل اكتمال أساس القرار، وهو الحد نفسه الذي يقوم عليه هذا البحث.',
        diagramNodes: ['طلب الانتقال', 'هل توجد فجوات مطلوبة؟'],
        diagramYes: 'نعم — حالة منع منظمة',
        diagramNo: 'لا — السماح بالانتقال',
        verifiedLabel: 'سلوك تم التحقق منه',
        verified: 'البوابة منفذة في وقت التشغيل ومغطاة بمسارات اختبار للحالة المسموحة والحالة الممنوعة.',
      },

      boundaries: {
        title: 'فصل منطق البحث عن المزوّد',
        body: 'لم يُربط منطق البحث مباشرة بمزوّد خارجي واحد؛ بُنيت حدود تفصل قواعد النظام وتدفقات التحقق عن المكوّن الذي قد ينفذ التوليد لاحقًا.',
        diagramNodes: ['واجهة البحث', 'منطق التطبيق', 'منفذ محايد'],
        diagramBranchA: 'مزوّد محاكى — متصل حاليًا',
        diagramBranchB: 'مزوّد حي — غير متصل بالمسار العام',
        limitationLabel: 'حدود حالية',
        limitation: 'وجود منفذ ومحوّل لمزوّد حي لا يعني أنه مربوط أو مستخدم فعليًا في المسار العام الحالي.',
        tradeoffLabel: 'الكُلفة والفائدة',
        tradeoffCost: 'التكلفة: مزيد من العقود والتركيب والاختبارات.',
        tradeoffBenefit: 'الفائدة: إمكانية اختبار منطق البحث بصورة مستقلة وتقليل الارتباط بمزوّد واحد.',
      },

      evaluation: {
        title: 'التقييم واختبارات الاتساق',
        types: [
          { title: 'اختبارات سلوك وقت التشغيل', body: 'تتحقق من مسارات تنفيذ فعلية مثل التأكيد وبوابة الجاهزية.' },
          { title: 'اختبارات اتساق وثيقة الحوكمة', body: 'تقرأ المرجع الحاكم وتتأكد من بقاء مفاهيم الثقة الأساسية داخله.' },
          { title: 'تقييم تركيبي / بيئات تجريبية', body: 'بيئات تجريبية ومحاكاة لا تعني تشغيلًا كاملًا مع مزوّد حي.' },
          { title: 'سلوك بمحاكاة مضبوطة', body: 'يسمح باختبار التدفقات الكاملة دون استدعاء خارجي فعلي لأي مزوّد حي.' },
        ],
        flowNodes: ['وثيقة حاكمة', 'اختبار اتساق', 'هل المفاهيم الأساسية موجودة؟'],
        flowYes: 'نعم — ينجح الاختبار',
        flowNo: 'لا — يفشل الاختبار',
        clarification: 'أضيف اختبار اتساق يقرأ وثيقة الحوكمة ويتحقق من بقاء مفاهيم الثقة الأساسية داخلها. هذا يمنع انجراف المرجع الحاكم بصمت، لكنه لا يعني أن جميع مبادئ الوثيقة منفذة تلقائيًا في وقت التشغيل.',

        evidenceFirst: {
          title: 'تجربة تبدأ بالأدلة',
          body: 'حدود التحقق نفسها تنعكس على واجهة التفاعل، لا على منطق التطبيق وحده. لا يُقدَّم حوار مفتوح بلا حدود؛ بل تبدأ التجربة بجمع مدخل مهني، ثم عرض ما استُخرج منه، ثم إتاحة مساحة للتأكيد أو التصحيح قبل اعتماد المعلومة.',
          note: 'الأدوات التي تعرض المنطق الداخلي مخصصة للفحص والتطوير، وليست تجربة التفاعل الافتراضية الحالية.',
        },

        boundedPreview: {
          title: 'معاينة مفيدة، لكنها غير نهائية',
          body: 'قبل اكتمال مسار التأكيد أعلاه، قد يحتاج التصميم إلى عرض شيء مفيد دون الادّعاء بأنه نتيجة نهائية. بدل عرض عيّنة ضعيفة عديمة القيمة، يعرض التنفيذ معاينة محدودة وذات معنى، مع وسم واضح بأنها ليست نتيجة نهائية.',
          rejectedLabel: 'المسار المرفوض',
          rejected: 'معاينة مبتورة عمدًا لا تحمل أي قيمة تحليلية فعلية',
          chosenLabel: 'المسار المختار',
          chosen: 'معاينة محدودة + قيمة تحليلية فعلية + حالة غير نهائية واضحة',
        },
      },

      findings: {
        title: 'مستويات التحقق وحدود التنفيذ',
        matrixCaption: 'ملخص مستوى التحقق ودلالته لكل مجال في التنفيذ الحالي',
        matrixHead: ['المجال', 'مستوى التحقق', 'دلالة التحقق'],
        matrix: [
          ['سلطة المعلومة', 'implemented', 'يثبت فصلًا فعليًا بين المعلومة المرشحة والمعتمدة.'],
          ['التأكيد الصريح', 'implemented', 'يثبت أن الاعتماد يتطلب تأكيدًا أو تصحيحًا أو رفضًا صريحًا.'],
          ['بوابة الجاهزية', 'implemented', 'يثبت أن التقدم يُمنع فعليًا عند بقاء فجوات مطلوبة.'],
          ['المسار الاستشاري', 'mock', 'يثبت سلوك المسار داخل محاكاة مضبوطة، لا داخل تشغيل حي.'],
          ['المزوّد التوليدي الحي', 'not_connected', 'لا يثبت شيئًا عن السلوك الفعلي؛ المزوّد الحي غير موصول بالمسار العام بعد.'],
          ['بعض طبقات التقييم', 'under_validation', 'نتائجها أولية، وما تزال قيد تحقق تجريبي أوسع.'],
          ['المعاينة المحدودة', 'implemented', 'يثبت أن المعاينة تُعرض بوسم صريح لحالتها غير النهائية.'],
          ['الجاهزية التجارية', 'out_of_scope', 'لا يقيسها هذا البحث، ولا يُستدل منه أي حكم عليها.'],
        ],
        verifiedTitle: 'ما تم التحقق منه',
        verifiedList: [
          'يمنع الترقية من معلومة مرشحة إلى معتمدة دون تأكيد صريح.',
          'بوابة الجاهزية تمنع التقدم إلى المرحلة التالية ما دامت فجوات مطلوبة قائمة.',
          'الفصل بين منطق التطبيق والمزوّد الخارجي يُبقي حدود القرار داخل التطبيق، بينما يبقى سلوك المزوّد الحي خارج المسار المُختبر.',
          'يتحقق اختبار الاتساق من بقاء مفاهيم الثقة الأساسية داخل وثيقة الحوكمة، دون أن يعني ذلك إنفاذها التلقائي في وقت التشغيل.',
          'تعرض المعاينة المحدودة بنية أولية دون تمثيلها كنتيجة نهائية معتمدة.',
        ],
        underStudyTitle: 'ما لا يزال تحت الدراسة',
        underStudyList: [
          'جودة السلوك مع مزوّد توليدي حي.',
          'التقييم الموسّع عبر سياقات مهنية متعددة.',
          'حدود الأداء والموثوقية عند استخدام واسع النطاق.',
          'المراجعات القانونية والخصوصية المطلوبة قبل أي استخدام عام.',
        ],
        notInferredTitle: 'ما لا يمكن استنتاجه',
        notInferredList: [
          'لا توجد مطالبة بالجاهزية التجارية.',
          'لا توجد مطالبة بدقة مكتملة.',
          'لا توجد مطالبة بنتائج توظيف أو قبول.',
          'لا توجد مطالبة بتحقق سوقي أو استخدام واسع النطاق.',
        ],
      },
    },

    conclusion: {
      title: 'ما تعلّمته من هذا البحث',
      body: [
        'يوضح التنفيذ حتى الآن أن بناء نظام مهني مساعد لا يبدأ من قدرة النموذج على الكتابة، بل من تحديد ما يحق للنظام اعتماده، وما يحتاج إلى تأكيد، ومتى يجب أن يتوقف.',
        'هذه النتيجة ليست إعلانًا عن تنفيذ مكتمل، بل أساس بحثي يختبر كيف يمكن وضع الحقيقة والوضوح قبل التوليد.',
      ],
    },

    cta_contact: 'تواصل معي',
  },

  en: {
    page_title: 'Engineering Verification Boundaries for Assistance Systems — Abdulrahman Asiri',
    meta_description: 'This research examines how candidate information can remain separate from established truth, and how guidance can be gated by explicit, reviewable verification steps. The current scope focuses on decision contracts, confirmation and rejection states, and implementation-validation levels without claiming complete experimental validation or general applicability.',

    filetree_label: 'Research sections',

    hero: {
      kicker: 'Applied Engineering Research',
      title: 'Engineering Verification Boundaries for Assistance Systems',
      subtitle: 'An applied study of how unverified information can be prevented from becoming established fact or a basis for guidance.',
      intro: 'This research examines how candidate information can remain separate from established truth, and how guidance can be gated by explicit, reviewable verification steps. The current scope focuses on decision contracts, confirmation and rejection states, and implementation-validation levels without claiming complete experimental validation or general applicability.',
      statusNote: 'The current advisory path runs on a controlled mock. No live generative provider is connected to the public path yet.',
    },

    sections: {
      overview: {
        title: 'Overview',
        question: 'How can persuasive, system-generated language be prevented from becoming unverified fact?',
        body: [
          "This research didn't start with which model to connect — it started with an earlier question: who holds the authority to approve a piece of information?",
          "A suggested phrasing can sound reasonable and convincing in professional contexts, yet it remains an inference until explicitly confirmed. The implementation is built around separating raw input, candidate information, and confirmed information.",
        ],
        note: "Provider quality matters, but it alone can't guarantee the accuracy of confirmed information.",
      },

      question: {
        title: 'The Research Problem',
        body: [
          'Systems that generate professional text face a specific risk: information can drift from "plausible phrasing" into "implied fact" without a clear approval step. The problem isn\'t that inference exists — it\'s granting inference an authority it doesn\'t have.',
          'From that, three boundaries were set:',
        ],
        boundaries: [
          'Raw input is not confirmed truth.',
          "A system's inference does not equal explicit confirmation.",
          'Progression to later stages is not allowed while required gaps remain.',
        ],
        notClaimed: "This research doesn't claim to solve hallucination absolutely, and doesn't rely on model quality alone to protect information accuracy.",
      },

      authority: {
        title: 'Truth Authority',
        diagramTitle: 'From input to confirmed information',
        nodes: ['Raw input', 'Candidate information', 'Explicit confirmation or correction', 'Confirmed information', 'Readiness check', 'Allowed transition'],
        branchFrom: 'Explicit confirmation or correction',
        branchLabel: 'Reject information',
        branchTarget: 'Not confirmed',
        caption: 'Unconfirmed information never moves automatically into the confirmed record. Approval requires an explicit step that grants the confirming authority the power to accept, correct, or reject it.',
        verifiedLabel: 'Verified behavior',
        verified: 'The confirmation-and-promotion path is implemented and wired into the running path.',
      },

      verification: {
        title: 'Verification Flow',
        body: [
          "Candidate information acts as a buffer between what was extracted or inferred and what can be confirmed — giving the system room to analyze without the right to alter confirmed truth directly.",
        ],
        states: [
          { label: 'CANDIDATE', desc: 'Not yet confirmed' },
          { label: 'CONFIRMED', desc: 'Explicitly confirmed' },
          { label: 'REJECTED / CORRECTED', desc: 'Rejected or edited' },
        ],
        closing: "This separation doesn't stop the system from suggesting — it stops a suggestion from acquiring the status of truth without explicit confirmation.",
      },

      gates: {
        title: 'The Runtime Readiness Gate',
        body: 'While required gaps remain, the readiness gate blocks progression to the next stage and returns a structured state explaining what is incomplete — keeping the system from reaching guidance before its decision basis is complete, the same boundary this research is built around.',
        diagramNodes: ['Transition requested', 'Are required gaps present?'],
        diagramYes: 'Yes — structured block state',
        diagramNo: 'No — transition allowed',
        verifiedLabel: 'Verified behavior',
        verified: 'The gate is implemented at runtime and covered by test paths for both the allowed and the blocked case.',
      },

      boundaries: {
        title: 'Separating Research Logic From the Provider',
        body: "The research logic was not wired directly to a single external provider; boundaries were built to keep the system's rules and verification flows independent of whichever component may eventually perform generation.",
        diagramNodes: ['Research interface', 'Application logic', 'Neutral port'],
        diagramBranchA: 'Mock provider — currently connected',
        diagramBranchB: 'Live provider — not connected to the public path',
        limitationLabel: 'Current limitation',
        limitation: "The existence of a port and an adapter for a live provider does not mean it is actually wired or in use on the current public path.",
        tradeoffLabel: 'Cost and benefit',
        tradeoffCost: 'Cost: more contracts, more composition, more tests.',
        tradeoffBenefit: 'Benefit: research logic can be tested independently, with less dependence on any single provider.',
      },

      evaluation: {
        title: 'Evaluation and Consistency Checks',
        types: [
          { title: 'Runtime behavior tests', body: 'Verify real execution paths such as confirmation and the readiness gate.' },
          { title: 'Governance-document consistency tests', body: 'Read the governing reference and confirm core trust concepts remain present in it.' },
          { title: 'Synthetic / harness evaluation', body: 'Trial environments and simulations — not a full run against a live provider.' },
          { title: 'Controlled-simulation behavior', body: 'Allows full flows to be tested without an actual external call to any live provider.' },
        ],
        flowNodes: ['Governing document', 'Consistency test', 'Are core concepts present?'],
        flowYes: 'Yes — test passes',
        flowNo: 'No — test fails',
        clarification: "A consistency test was added that reads the governance document and checks that core trust concepts remain present within it. This prevents the governing reference from silently drifting — but it does not mean every principle in the document is automatically enforced at runtime.",

        evidenceFirst: {
          title: 'An Evidence-First Experience',
          body: "These verification boundaries extend into the interaction itself, not just the application logic. There is no open-ended, unbounded dialogue — the experience begins with a professional input, shows what was extracted from it, then leaves room for confirmation or correction before information is approved.",
          note: 'Tools that expose internal logic are meant for inspection and development, not the current default interaction experience.',
        },

        boundedPreview: {
          title: 'A Useful, Non-Final Preview',
          body: "Before the confirmation path above is complete, the design may still need to show something useful without claiming it as a final result. Instead of a weak, valueless sample, the implementation shows a bounded, meaningful preview, clearly labeled as non-final.",
          rejectedLabel: 'Path rejected',
          rejected: 'A deliberately crippled preview carrying no real analytical value',
          chosenLabel: 'Path chosen',
          chosen: 'Bounded preview + real analytical value + a clearly non-final state',
        },
      },

      findings: {
        title: 'Verification Levels and Implementation Boundaries',
        matrixCaption: 'Summary of the verification level and its evidentiary meaning for each area of the current implementation',
        matrixHead: ['Area', 'Verification Level', 'What It Establishes'],
        matrix: [
          ['Information authority', 'implemented', 'Establishes an enforced separation between candidate and confirmed information.'],
          ['Explicit confirmation', 'implemented', 'Establishes that approval requires an explicit confirmation, correction, or rejection.'],
          ['Readiness gate', 'implemented', 'Establishes that progression is actually blocked while required gaps remain.'],
          ['Advisory path', 'mock', 'Establishes path behavior inside a controlled simulation, not a live run.'],
          ['Live generative provider', 'not_connected', "Establishes nothing about live behavior; the live provider isn't wired to the public path yet."],
          ['Some evaluation layers', 'under_validation', 'Results are preliminary and still under broader experimental validation.'],
          ['Bounded preview', 'implemented', 'Establishes that the preview is shown with an explicit non-final label.'],
          ['Commercial readiness', 'out_of_scope', 'Not measured by this research, and no judgment on it is implied.'],
        ],
        verifiedTitle: 'What Has Been Verified',
        verifiedList: [
          'Prevents promotion from candidate to confirmed information without explicit confirmation.',
          'The readiness gate blocks progression to the next stage while required gaps remain.',
          'Provider isolation preserves decision boundaries at the application level, while live-provider behavior remains outside the verified path.',
          "The consistency test confirms that core trust concepts remain present in the governance document, without implying their automatic enforcement at runtime.",
          'The bounded preview exposes provisional structure without representing it as a confirmed final result.',
        ],
        underStudyTitle: 'What Is Still Under Study',
        underStudyList: [
          'Behavior quality against a live generative provider.',
          'Extended evaluation across multiple professional contexts.',
          'Performance and reliability limits under wide-scale use.',
          'The legal and privacy review required before any public use.',
        ],
        notInferredTitle: 'What Cannot Be Inferred',
        notInferredList: [
          'No claim of commercial readiness.',
          'No claim of complete accuracy.',
          'No claim of hiring or acceptance outcomes.',
          'No claim of market validation or wide-scale use.',
        ],
      },
    },

    conclusion: {
      title: 'What This Research Taught Me',
      body: [
        "The implementation so far shows that building a professional assistance system doesn't start with how well a model can write — it starts with defining what the system is entitled to approve, what needs confirmation, and when it must stop.",
        "This is not an announcement of a finished system, but a research foundation testing how truth and clarity can be placed before generation.",
      ],
    },

    cta_contact: 'Get in touch',
  },
};
