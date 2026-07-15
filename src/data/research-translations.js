// Public-safe display labels for the section navigation. These are plain
// section ordinals, not real repository or file paths.
export const researchFileTree = [
  { id: 'asset', file_ar: '٠١', file_en: '01' },
  { id: 'consultation', file_ar: '٠٢', file_en: '02' },
  { id: 'expression', file_ar: '٠٣', file_en: '03' },
  { id: 'domains', file_ar: '٠٤', file_en: '04' },
  { id: 'context', file_ar: '٠٥', file_en: '05' },
  { id: 'work', file_ar: '٠٦', file_en: '06' },
  { id: 'skills', file_ar: '٠٧', file_en: '07' },
  { id: 'techSkills', file_ar: '٠٨', file_en: '08' },
  { id: 'maturity', file_ar: '٠٩', file_en: '09' },
];

export const researchI18n = {
  ar: {
    page_title: 'من الخبرة الحقيقية إلى صياغة مهنية تُفهم — عبدالرحمن عسيري',
    meta_description: 'بحث تطبيقي يدرس الفجوة بين ما يفعله الشخص فعلًا وما يظهر في ملفه المهني، ويستكشف كيف تُفهم الخبرة وتُصاغ بوضوح أقوى دون تجاوز ما يمكن تأكيده.',

    filetree_label: 'أقسام البحث',

    hero: {
      kicker: 'بحث تطبيقي في فهم الخبرة المهنية',
      title: 'بين ما يفعله الشخص فعليًا وما يظهر في ملفه المهني فجوة تستحق الفهم.',
      subtitle: 'كثيرون يحملون مسؤوليات مهنية ذات قيمة حقيقية، لكن الصياغة اليومية لا تنقل هذه القيمة إلى مسؤولي التوظيف أو الأنظمة الشائعة التي تفرز السير الذاتية.',
      intro: 'أدوات السير الذاتية التقليدية، وحتى الذكاء الاصطناعي التوليدي العام، قد تُحسّن شكل الصياغة، لكنها غالبًا لا تفهم السياق الحقيقي خلف العمل، وقد تقبل ادعاءات غامضة أو مبالغًا فيها، أو تضيف مسؤوليات ومقاييس لم يؤكدها صاحب الخبرة. يبدأ هذا البحث من نقطة أسبق: كيف نفهم الخبرة فهمًا دقيقًا قبل إعادة صياغتها.',
      statusNote: 'بحث تطبيقي خاص، لا يزال قيد البناء والتحقق.',
    },

    sections: {
      asset: {
        title: 'ما الذي يبحثه هذا العمل؟',
        body: [
          'يبدأ هذا العمل من ملاحظة متكررة: كثير من الناس يؤدّون عملًا مهنيًا حقيقيًا، لكن ملفّهم المهني لا ينقله بوضوح. الفجوة ليست في الخبرة نفسها، بل في التعبير عنها.',
          'لذلك يدرس البحث سؤالًا سابقًا على الكتابة: كيف نفهم خبرة الشخص فهمًا دقيقًا قبل إعادة صياغتها؟ الفكرة أن نبني أولًا أصلًا مهنيًا واضحًا — تمثيلًا منظمًا لما فعله الشخص فعلًا وأكّده بنفسه — ثم نبني عليه أي صياغة لاحقة.',
        ],
        list: [
          'ما أكّده الشخص عن عمله الفعلي.',
          'السياق الذي يوضّح قيمة هذا العمل.',
          'ما يحتاج إلى سؤال أو توضيح قبل اعتماده.',
        ],
      },

      consultation: {
        title: 'كيف تجري الاستشارة؟',
        body: [
          'تبدأ الاستشارة بقراءة المعلومات المهنية المتاحة، ثم تحديد المواضع الضعيفة أو الغامضة أو الناقصة. بدل توليد نص جاهز مباشرة، تُطرح أسئلة مركّزة تكشف ما وراء الوصف اليومي العادي، ثم يُقترح فهم أوضح وصياغة أقوى. يبقى القرار الأخير لصاحب الخبرة: يؤكّد، أو يصحّح، أو يرفض.',
        ],
        noteLabel: 'ملاحظة',
        note: 'الأسلوب استشاري وهادئ: يساعد على فهم العمل الفعلي، ولا يُصدر حكمًا نهائيًا على صاحبه.',
      },

      expression: {
        title: 'صياغة أقوى دون مبالغة',
        body: [
          'تقع كثير من الصياغات المهنية بين طرفين: لغة ضعيفة تُخفي قيمة عمل حقيقي، ولغة مبالغ فيها لا يستطيع صاحبها الدفاع عنها في مقابلة. يستهدف البحث المنطقة الوسطى: صياغة أقوى داخل ما يستطيع صاحب الخبرة تأكيده والدفاع عنه.',
        ],
        examplesLabel: 'أمثلة توضيحية',
        examplesIntro: 'توضح هذه الأمثلة كيف يكشف فهم سياق العمل مسؤوليات لا تظهر في الوصف المختصر، دون إضافة إنجازات أو صلاحيات غير مؤكدة.',
        beforeLabel: 'قبل',
        afterLabel: 'بعد فهم سياق العمل',
        examples: [
          {
            directionLabel: 'المالية والمحاسبة',
            before: 'أراجع الفواتير.',
            after: 'أراجع الفواتير وأطابق بياناتها مع المستندات المؤيدة، وأوثّق أي فروقات قبل إحالتها للمعالجة.',
          },
          {
            directionLabel: 'إدارة الأعمال والعمليات',
            before: 'أتابع الطلبات.',
            after: 'أتابع الطلبات عبر مراحلها، وأنسّق مع الأطراف المعنية، وأوثّق حالات التعثر حتى اكتمال الإجراء أو تصعيده.',
          },
          {
            directionLabel: 'الدعم التقني والتقنية الرقمية',
            before: 'أتابع مشكلات النظام وأرفعها للفريق التقني.',
            after: 'أحلل بلاغات المستخدمين، وأحدد أين تظهر المشكلة، وأوثّق خطوات إعادة إنتاجها قبل تصعيد الحالات التي تحتاج إلى تدخل تقني.',
          },
        ],
        noteLabel: 'الحد الفاصل',
        note: 'الهدف صياغة أقرب إلى الواقع، لا أعلى صوتًا: لا نُسقط ما أنجزه الشخص فعلًا، ولا نضيف ما لم يؤكّده.',
      },

      domains: {
        title: 'خمسة اتجاهات مهنية',
        intro: 'اللغة المهنية والقيمة لا تُعبَّر عنها بالطريقة نفسها في كل مجال. لذلك يدرس البحث خمسة اتجاهات واسعة، لكل منها مفرداته وأولوياته:',
        list: [
          { title: 'الدعم التقني والتقنية الرقمية', body: 'يدرس الخبرات المرتبطة بدعم الأنظمة والتطبيقات، وتحليل البلاغات والأعطال، وتوثيق المشكلات، والتنسيق مع الفرق التقنية، ودعم استمرارية الخدمة وتجربة المستخدم.' },
          { title: 'إدارة الأعمال والعمليات', body: 'يدرس الخبرات المرتبطة بسير العمل، وتنسيق المهام بين الأطراف، ومتابعة التنفيذ، وتطبيق الإجراءات، وتحسين الكفاءة التشغيلية.' },
          { title: 'المبيعات والتجزئة وتجربة العميل', body: 'يدرس الخبرات المرتبطة بفهم احتياجات العميل، وإدارة تفاعلات البيع والخدمة، وجودة التجربة، ومعالجة الملاحظات، وبناء العلاقة مع العميل.' },
          { title: 'المالية والمحاسبة والتأمين', body: 'يدرس الخبرات المرتبطة بدقة المعاملات والسجلات، وإعداد التقارير، والالتزام بالإجراءات والضوابط، وتحمل المسؤولية ضمن نطاق الدور.' },
          { title: 'السياحة والضيافة والفعاليات', body: 'يدرس الخبرات المرتبطة بتشغيل الخدمة، وتجربة الضيف، والتنسيق الميداني، وتنفيذ الفعاليات، والتعامل المهني مع المواقف المتغيرة.' },
        ],
        noteLabel: 'توضيح',
        note: 'يساعد اختيار الاتجاه على قراءة الخبرة ضمن سياقها المهني، ولا يحدد مسمى وظيفيًا أو هوية مهنية نهائية.',
      },

      context: {
        title: 'السياق المهني السعودي وقواعد الثقة',
        body: [
          'يسترشد البحث بمراجعة منظمة لمصادر سعودية رسمية ومهنية متاحة، ومقارنة عدة مصادر تتصل بعدد من الأدوار والقطاعات. الهدف أن يقترب التحليل والصياغة من لغة سوق العمل السعودي، لا أن يُضيف معلومات إلى خبرة الشخص أو يصنّفها.',
          'قاعدة المصادر ما تزال قيد المراجعة، دون ادعاء اعتماد رسمي أو تغطية شاملة لكل معايير التوظيف. المصادر تساعد على فهم اللغة المهنية، لكنها لا تُثبت ما فعله شخص بعينه.',
        ],
        trustTitle: 'قواعد أساسية',
        trustIntro: 'هذه ليست قواعد قانونية أو رقابية، بل حدود عملية تحدّد ما يمكن اقتراحه، وما يحتاج تأكيد الشخص، وما لا يصح تحويله إلى ادعاء مهني.',
        trustList: [
          'ما يؤكّده الشخص عن خبرته هو المرجع الأعلى.',
          'المصادر تعطي سياقًا مهنيًا، ولا تتحول إلى حقيقة عن الشخص.',
          'كل اقتراح يبقى اقتراحًا حتى يراجعه الشخص ويقرر بشأنه.',
          'حين تنقص المعلومة، يُطرح سؤال بدل افتراض جاهز.',
        ],
      },

      work: {
        title: 'ما الذي أُنجز فعليًا؟',
        intro: 'تجاوز العمل مرحلة الفكرة إلى تنفيذ حقيقي. حتى الآن شمل:',
        list: [
          { title: 'تحديد سؤال البحث ونطاقه', body: 'صياغة المشكلة بشكل قابل للدراسة، وتحديد ما يقع خارج النطاق الحالي.' },
          { title: 'تصميم الاستشارة الموجّهة', body: 'بناء تجربة تقرأ وتسأل وتقترح، دون أن تتحول إلى نموذج طويل.' },
          { title: 'تحديد حدود التأكيد والصياغة', body: 'تحديد ما يحتاج تأكيدًا صريحًا قبل استخدامه في أي نص.' },
          { title: 'دراسة خمسة اتجاهات مهنية', body: 'مراعاة اختلاف اللغة والأولويات بين المجالات.' },
          { title: 'مراجعة مصادر مهنية سعودية', body: 'مقارنة عدة مراجع لفهم لغة الأدوار في السوق المحلي.' },
          { title: 'بناء بنية خلفية قابلة للاختبار', body: 'تقسيم النظام إلى طبقات يمكن اختبار كل منها على حدة.' },
          { title: 'تطوير سيناريوهات سلوكية واختبارات آلية', body: 'اختبار السلوك في مواقف تشبه الاستخدام الحقيقي.' },
          { title: 'توثيق القرارات والمخاطر والأسئلة المفتوحة', body: 'الاحتفاظ بسجل واضح لما تقرّر وما بقي دون حسم.' },
        ],
      },

      skills: {
        title: 'قدرات طوّرها البحث',
        intro: 'ظهرت هذه القدرات من العمل نفسه: من البحث والتصميم واتخاذ القرار، لا من كلمات مفتاحية في سيرة ذاتية.',
        list: [
          { title: 'تأطير المشكلة وتحديد نطاق البحث', body: 'إعادة قراءة مشكلة "كتابة السيرة الذاتية" كمسألة أعمق تتعلق بفهم العمل والتعبير عنه بمسؤولية، ثم تحويلها إلى اتجاه بحثي واضح.' },
          { title: 'البحث المهني وتوليف المصادر', body: 'مراجعة مصادر متعددة ومقارنتها، وتحويلها إلى فهم قابل للاستخدام بدل نقلها كما هي.' },
          { title: 'تصميم تجربة استشارة موجّهة', body: 'ترتيب تجربة تقود الشخص عبر القراءة والسؤال والاقتراح والتأكيد، بخطوات واضحة.' },
          { title: 'تصميم تجربة تراعي اختلاف المجالات', body: 'مراعاة أن لكل اتجاه مهني لغته وأدلته، لا معاملة كل المسارات بالطريقة نفسها.' },
          { title: 'وضع حدود الأدلة والادعاءات', body: 'الفصل بوضوح بين ما أكّده الشخص، وما هو اقتراح، وما لا يصح تقديمه كحقيقة.' },
          { title: 'تصميم التقييم السلوكي', body: 'ابتكار مواقف اختبار واقعية مثل الصياغة الضعيفة، ونقص المعلومة، والمبالغة غير المدعومة، لقياس السلوك لا الشكل.' },
          { title: 'إدارة القرارات والنطاق والمخاطر', body: 'التمييز بين ما صُمّم وما نُفّذ وما اختُبر وما بقي مفتوحًا، مع استخدام أدوات الذكاء الاصطناعي في التنفيذ وبقاء القرار النهائي لدى صاحب المبادرة.' },
        ],
      },

      techSkills: {
        title: 'مهارات تقنية تطورت بالممارسة',
        intro: 'إلى جانب البحث، تطوّرت مهارات هندسية فعلية من خلال البناء والاختبار والتوثيق.',
        list: [
          { title: 'هندسة البرمجيات والبنية', body: 'طبّقت مبادئ فصل الاهتمامات وتقسيم النظام إلى طبقات مستقلة قابلة للاختبار والاستبدال، وتعاملت عمليًا مع حدود تفصل التكامل مع الذكاء الاصطناعي عن باقي المنطق، بحيث يمكن استبدال مكوّن التوليد دون المساس ببقية النظام.' },
          { title: 'تطوير الخدمات وواجهات API', body: 'بنيت خدمة خلفية فعلية شملت عقود طلب واستجابة، والتحقق من المدخلات، ومعالجة الأخطاء، ومسارات بلا حالة، مع اختبارات تكامل لها.' },
          { title: 'الاختبارات وضمان الجودة', body: 'كتبت اختبارات وحدة وتكامل، واختبرت السلوك في سيناريوهات واقعية لا مجرد تنفيذ الكود، عبر مجموعة اختبارات نمت مع العمل.' },
          { title: 'الأتمتة وسير العمل التقني', body: 'استخدمت التحكم بالإصدارات بانضباط: مراجعة الفروقات قبل كل حفظ، وتغييرات محدودة وقابلة للتتبع، ونصوص صغيرة لأتمتة مهام مثل التحقق من الأنواع.' },
          { title: 'التوثيق الهندسي وإدارة القرارات', body: 'حوّلت القرارات والمخاطر والافتراضات والحدود إلى وثائق هندسية قابلة للمراجعة، بدل تركها في محادثات مؤقتة.' },
          { title: 'البيانات وSQL', body: 'تعاملت عمليًا مع نمذجة بيانات علائقية عبر مخطّطات فعلية وسلسلة ترحيلات متتابعة، شملت ملفات ترحيل بلغة SQL، وفهمًا للعلاقات بين الكيانات وقيود سلامة البيانات.' },
        ],
      },

      maturity: {
        title: 'الحالة الحالية',
        intro: 'هذا بحث تطبيقي قيد التطوير النشط، وليس خدمة جاهزة.',
        list: [
          'خاص، وغير متاح للاستخدام العام.',
          'صُمّم ونُفّذ واختُبر جزء حقيقي منه، وما يزال العمل مستمرًا.',
          'لا توجد بيانات علنية عن مستخدمين أو نمو أو إيرادات أو نتائج.',
          'ليس خدمة استشارة مهنية مرخّصة.',
          'لا يَعِد بتوظيف أو مقابلات أو اجتياز أنظمة الفرز الآلي.',
          'لا يعتمد كل توصية مراجعٌ بشري مستقل.',
          'تبقى مراجعة الشخص وتأكيده ضروريين.',
          'تبقى المراجعات القانونية والمهنية والخاصة بالخصوصية وحماية البيانات مطلوبة قبل أي استخدام عام واسع.',
        ],
      },
    },
  },

  en: {
    page_title: 'From Real Experience to Professional Wording That Gets Understood — Abdulrahman Asiri',
    meta_description: 'Applied research into the gap between what a person actually does and what appears in their professional profile, exploring how experience can be understood and expressed more clearly without exceeding what can be confirmed.',

    filetree_label: 'Research sections',

    hero: {
      kicker: 'Applied Research into Professional Experience',
      title: 'There is a gap between what people actually do and what appears in their professional profiles — a gap worth understanding.',
      subtitle: "Many people carry real professional responsibility, but everyday wording doesn't convey that value to recruiters or the systems commonly used to screen resumes.",
      intro: "Traditional CV tools, and even generic generative AI, may polish the surface wording, but they often miss the real context behind the work, accept vague or inflated claims, or add responsibilities and metrics the person never confirmed. This research starts from an earlier point: how to understand experience accurately before rewriting it.",
      statusNote: 'Private applied research, still under construction and validation.',
    },

    sections: {
      asset: {
        title: 'What Is This Work Studying?',
        body: [
          'This work starts from a recurring observation: many people do real professional work, yet their professional profile fails to convey it clearly. The gap is not in the experience itself, but in how it is expressed.',
          "So the research begins with a question that comes before any writing: how do we understand a person's experience accurately before rewriting it? The idea is to first build a clear professional foundation — a structured representation of what the person actually did and confirmed themselves — and then base any later wording on it.",
        ],
        list: [
          'What the person has confirmed about their real work.',
          'The context that shows the value of that work.',
          'What still needs a question or clarification before it is used.',
        ],
      },

      consultation: {
        title: 'How the Consultation Works',
        body: [
          'The consultation begins by reading the available professional information, then identifying what is weak, ambiguous, or missing. Instead of generating finished text right away, focused questions surface what lies behind an everyday description, and a clearer understanding and stronger wording are suggested. The final decision stays with the person: confirm, correct, or reject.',
        ],
        noteLabel: 'A note',
        note: 'The tone is advisory and calm: it helps make sense of the real work, without passing a final judgment on the person behind it.',
      },

      expression: {
        title: 'Stronger Wording, Without Inflation',
        body: [
          'Much professional wording sits between two extremes: language too weak to reflect real work, and language inflated beyond what its author could defend in an interview. The research targets the middle ground: stronger wording within what the person can confirm and stand behind.',
        ],
        examplesLabel: 'Illustrative Examples',
        examplesIntro: 'These examples show how understanding the work context can reveal responsibilities hidden by a brief description, without adding unsupported achievements or authority.',
        beforeLabel: 'Before',
        afterLabel: 'After clarifying the work context',
        examples: [
          {
            directionLabel: 'Finance and Accounting',
            before: 'I review invoices.',
            after: 'I review invoices, match their details against supporting documents, and document discrepancies before referring them for further action.',
          },
          {
            directionLabel: 'Business Administration and Operations',
            before: 'I follow up on requests.',
            after: 'I track requests through their stages, coordinate with the relevant parties, and document blockers until the process is completed or escalated.',
          },
          {
            directionLabel: 'Technical Support and Digital Technology',
            before: 'I follow up on system issues and escalate them to the technical team.',
            after: 'I analyze user-reported issues, identify where the problem appears, and document the steps to reproduce it before escalating cases that require technical intervention.',
          },
        ],
        noteLabel: 'The line',
        note: "The goal is wording closer to reality, not louder: we don't drop what the person actually did, and we don't add what they haven't confirmed.",
      },

      domains: {
        title: 'Five Professional Directions',
        intro: 'Professional language and value are not expressed the same way in every field. The research therefore studies five broad directions, each with its own vocabulary and priorities:',
        list: [
          { title: 'Technical Support & Digital Technology', body: 'Examines experience related to supporting systems and applications, analyzing incidents, documenting technical issues, coordinating with technical teams, and supporting service continuity and the end-user experience.' },
          { title: 'Business Management & Operations', body: 'Examines experience related to workflows, coordination across teams, execution follow-up, procedures, and operational improvement.' },
          { title: 'Sales, Retail & Customer Experience', body: 'Examines experience related to understanding customer needs, managing sales and service interactions, service quality, handling feedback, and maintaining customer relationships.' },
          { title: 'Finance, Accounting & Insurance', body: 'Examines experience related to transaction and record accuracy, reporting, procedural controls, and accountability within the scope of the role.' },
          { title: 'Tourism, Hospitality & Events', body: 'Examines experience related to service operations, guest experience, field coordination, event delivery, and professional judgment in changing situations.' },
        ],
        noteLabel: 'To be clear',
        note: 'Selecting a direction helps interpret experience within its professional context; it does not assign a final job title or fixed professional identity.',
      },

      context: {
        title: 'Saudi Professional Context and Trust Rules',
        body: [
          "The research is guided by a structured review of publicly available Saudi official and professional sources, comparing several sources tied to a number of roles and sectors. The aim is to bring its analysis and wording closer to the language of the Saudi labor market — not to add information to a person's experience or classify it.",
          'The source base remains under review, with no claim of official accreditation or comprehensive coverage of every hiring standard. Sources help make sense of professional language, but they do not prove what any particular person has done.',
        ],
        trustTitle: 'A few basic rules',
        trustIntro: "These are not legal or regulatory rules, but practical limits on what can be suggested, what needs the person's confirmation, and what should never become a professional claim.",
        trustList: [
          'What the person confirms about their experience is the highest authority.',
          'Sources provide professional context; they never become a fact about the person.',
          'Every suggestion stays a suggestion until the person reviews it and decides.',
          'When information is missing, a question is asked instead of a ready assumption.',
        ],
      },

      work: {
        title: 'What Has Actually Been Done',
        intro: 'The work moved past the idea stage into real implementation. So far it has included:',
        list: [
          { title: 'Defining the research question and scope', body: 'Framing the problem so it can be studied, and marking what falls outside the current scope.' },
          { title: 'Designing the guided consultation', body: 'Building an experience that reads, asks, and suggests, without turning into a long form.' },
          { title: 'Defining confirmation and wording boundaries', body: 'Deciding what needs explicit confirmation before it is used in any text.' },
          { title: 'Studying five professional directions', body: 'Accounting for how language and priorities differ across fields.' },
          { title: 'Reviewing Saudi professional sources', body: 'Comparing several references to understand the language of roles in the local market.' },
          { title: 'Building a testable backend architecture', body: 'Splitting the system into layers that can each be tested on their own.' },
          { title: 'Developing behavioral scenarios and automated tests', body: 'Testing behavior in situations that resemble real use.' },
          { title: 'Documenting decisions, risks, and open questions', body: 'Keeping a clear record of what was decided and what remains unresolved.' },
        ],
      },

      skills: {
        title: 'Capabilities the Research Developed',
        intro: 'These capabilities came out of the work itself — from research, design, and decision-making, not from keywords on a résumé.',
        list: [
          { title: 'Problem framing and research scoping', body: "Re-reading the apparent 'CV-writing' problem as a deeper question about understanding work and expressing it responsibly, then turning it into a clear research direction." },
          { title: 'Professional research and source synthesis', body: 'Reviewing and comparing multiple sources and turning them into usable understanding rather than copying them as they are.' },
          { title: 'Designing a guided consultation experience', body: 'Arranging an experience that leads the person through reading, questioning, suggestion, and confirmation, in clear steps.' },
          { title: 'Designing for differences across fields', body: 'Recognizing that each direction has its own language and evidence, rather than treating all paths the same way.' },
          { title: 'Setting evidence and claim boundaries', body: 'Clearly separating what the person confirmed, what is a suggestion, and what should not be presented as fact.' },
          { title: 'Designing behavioral evaluation', body: 'Creating realistic test situations such as weak wording, missing information, and unsupported inflation, to measure behavior rather than surface form.' },
          { title: 'Managing decisions, scope, and risk', body: 'Distinguishing what was designed, implemented, tested, and left open, while using AI tools in execution with the final decision remaining with the founder.' },
        ],
      },

      techSkills: {
        title: 'Technical Skills Developed Through Practice',
        intro: 'Alongside the research, real engineering skills developed through building, testing, and documentation.',
        list: [
          { title: 'Software architecture', body: 'I applied separation-of-concerns principles and split the system into independent, testable, and replaceable layers, and worked hands-on with boundaries that keep the AI integration separate from the rest of the logic, so the generation component can be replaced without affecting the rest of the system.' },
          { title: 'Backend and API development', body: 'I built a real backend service, including request and response contracts, input validation, error handling, and stateless routes, with integration tests for them.' },
          { title: 'Testing and quality assurance', body: 'I wrote unit and integration tests and tested behavior in realistic scenarios rather than just code execution, through a test suite that grew with the work.' },
          { title: 'Automation and engineering workflow', body: 'I used version control with discipline: reviewing diffs before each save, keeping changes small and traceable, and writing small scripts to automate tasks such as type-checking.' },
          { title: 'Engineering documentation and decision management', body: 'I turned decisions, risks, assumptions, and limits into reviewable engineering documents, instead of leaving them in temporary conversations.' },
          { title: 'Data and SQL', body: 'I worked hands-on with relational data modeling through real schemas and a sequence of migrations, including SQL migration files, and an understanding of entity relationships and data-integrity constraints.' },
        ],
      },

      maturity: {
        title: 'Current Status',
        intro: 'This is applied research under active development, not a ready-made service.',
        list: [
          'Private, and not available for public use.',
          'A real part has been designed, implemented, and tested, and the work is ongoing.',
          'No public data on users, growth, revenue, or outcomes.',
          'Not a licensed professional-consultation service.',
          'Makes no promise of employment, interviews, or passing automated screening.',
          'No independent human reviewer approves every recommendation.',
          "The person's review and confirmation remain essential.",
          'Legal, professional, privacy, and data-protection reviews remain required before any broad public use.',
        ],
      },
    },
  },
};
