// Public-safe display labels for the section navigation. These are plain
// section ordinals, not real repository or file paths.
export const researchFileTree = [
  { id: 'asset', file_ar: '٠١', file_en: '01' },
  { id: 'consultation', file_ar: '٠٢', file_en: '02' },
  { id: 'expression', file_ar: '٠٣', file_en: '03' },
  { id: 'domains', file_ar: '٠٤', file_en: '04' },
  { id: 'work', file_ar: '٠٥', file_en: '05' },
  { id: 'skills', file_ar: '٠٦', file_en: '06' },
  { id: 'maturity', file_ar: '٠٧', file_en: '07' },
];

export const researchI18n = {
  ar: {
    page_title: 'من الخبرة الحقيقية إلى صياغة مهنية تُفهم — عبدالرحمن عسيري',
    meta_description: 'مبادرة بحث وتطوير تساعد أصحاب الخبرة الحقيقية على اكتشاف قيمتها المهنية والتعبير عنها بصياغة أقوى وأوضح، دون تجاوز حدود الحقيقة المهنية.',

    filetree_label: 'أقسام المبادرة',

    hero: {
      kicker: 'مبادرة بحث وتطوير لمنتج مهني',
      title: 'خبرتك حقيقية، وتستحق صياغة تُظهر قيمتها الفعلية.',
      subtitle: 'كثيرون يحملون مسؤوليات مهنية ذات قيمة حقيقية، لكن الصياغة اليومية لا تنقل هذه القيمة إلى مسؤولي التوظيف أو الأنظمة الشائعة التي تفرز السير الذاتية.',
      intro: 'أدوات السير الذاتية التقليدية، وحتى الذكاء الاصطناعي التوليدي العام، قد تُحسّن شكل الصياغة، لكنها غالبًا لا تفهم السياق الحقيقي خلف العمل، وقد تقبل ادعاءات غامضة أو مبالغًا فيها دون تحدٍّ، أو تضيف مسؤوليات ومقاييس لم يؤكدها صاحب الخبرة. تحاول هذه المبادرة مسارًا مختلفًا: مساعدة صاحب الخبرة على اكتشاف قيمتها الحقيقية، ومعايرتها، والتعبير عنها بقوة أكبر دون تجاوز حدود الحقيقة المهنية.',
      statusNote: 'مبادرة بحث وتطوير خاصة، لا تزال قيد البناء والتحقق.',
    },

    sections: {
      asset: {
        title: 'من الخبرة إلى أصل مهني قابل لإعادة الاستخدام',
        body: [
          'قبل إنتاج أي مستند، تبني هذه المبادرة أولًا ما يمكن تسميته أصلًا مهنيًا: تمثيلًا منظمًا لخبرة الشخص الحقيقية، لا مجرد نص جاهز للنسخ.',
        ],
        list: [
          'الخبرة المؤكدة من صاحبها.',
          'القيمة المهنية التي قد تكون مخفية خلف صياغة عادية.',
          'السياق ذو الصلة بالعمل الفعلي.',
          'صياغة مهنية أقوى وأوضح.',
          'اتجاه مهني محتمل يستحق الاستكشاف.',
          'نقاط تحتاج توضيحًا إضافيًا.',
          'حدود تمنع أي صياغة لا تدعمها الخبرة المؤكدة.',
        ],
        noteLabel: 'للتوضيح',
        note: 'هذا الأصل ليس وثيقة موثّقة قانونيًا أو معتمدة من جهة مستقلة؛ هو تمثيل يستند إلى ما أكده صاحب الخبرة.',
      },

      consultation: {
        title: 'استشارة مهنية موجّهة',
        body: [
          'تُقرأ المعلومات المهنية المتاحة أولًا، ثم تُحدَّد مواضع الصياغة الضعيفة أو الغموض أو نقص السياق. بدل توليد نص جاهز فورًا، تُطرح أسئلة مركّزة تكشف القيمة المهنية المختبئة خلف وصف يومي عادي، ثم تُقترح صياغة أقوى. يبقى القرار الأخير دائمًا لصاحب الخبرة: تأكيد، أو تصحيح، أو رفض.',
        ],
        noteLabel: 'أسلوب الاستشارة',
        note: 'الأسلوب هنا استشاري وهادئ، يركّز على فهم العمل الفعلي لا اختباره.',
      },

      expression: {
        title: 'صياغة أقوى دون مبالغة',
        body: [
          'كثير من الصياغات المهنية تقع بين طرفين غير مفيدين: صياغة ضعيفة تُقلّل من قيمة عمل حقيقي، أو صياغة مبالغ فيها لا يستطيع صاحبها الدفاع عنها لاحقًا. تسعى هذه المبادرة إلى نقطة وسط: صياغة قوية وآمنة داخل حدود الخبرة المهنية الفعلية.',
        ],
        exampleLabel: 'مثال مبسّط',
        beforeLabel: 'قبل',
        before: 'أرد على العملاء وأحل مشاكلهم.',
        afterLabel: 'بعد',
        after: 'تعامل يومي مع استفسارات العملاء المتكررة، مع تحديد أنماط المشكلات وتوثيقها لتسهيل حلها مستقبلًا — بعد تأكيد صاحب الخبرة لتفاصيل العمل الفعلي.',
        noteLabel: 'الحد الفاصل',
        note: 'الهدف ليس الصوت الأقوى، بل الصياغة الأقرب للحقيقة المهنية — دون حذف قيمة حقيقية أو إضافة قيمة غير مؤكدة.',
      },

      domains: {
        title: 'خمسة اتجاهات مهنية',
        intro: 'لا تُطبَّق صياغة عامة واحدة على كل مهنة. القيمة المهنية تُعبَّر عنها بشكل مختلف باختلاف المجال — قيمة الدعم التقني تختلف عن قيمة المبيعات، والمسؤولية المالية تحتاج لغة مختلفة عن عمليات الضيافة، وتجربة العميل لا تُقيَّم بنفس منظور العمليات.',
        list: [
          { title: 'الدعم التقني والتقنية الرقمية', body: 'فهم المشكلات التقنية المتكررة، وتوثيق الحلول، وتحسين تجربة المستخدم النهائي.' },
          { title: 'إدارة الأعمال والعمليات', body: 'تنظيم سير العمل، وتنسيق الفرق، وتحسين الكفاءة التشغيلية.' },
          { title: 'المبيعات والتجزئة وتجربة العميل', body: 'بناء علاقة مع العميل، وفهم احتياجاته، وتحويل التفاعل إلى قيمة فعلية.' },
          { title: 'المالية والمحاسبة والتأمين', body: 'الدقة في الأرقام، والالتزام بالإجراءات، وإدارة المسؤولية المالية بعناية.' },
          { title: 'السياحة والضيافة والفعاليات', body: 'إدارة تجربة الضيف أو الحدث، والتعامل مع مواقف متغيرة بسرعة وحسن تقدير.' },
        ],
        noteLabel: 'توضيح',
        note: 'اختيار المجال يساعد على فهم السياق المهني بشكل أوضح، لكنه لا يحدد تلقائيًا مسمى وظيفيًا نهائيًا أو هوية مهنية ثابتة.',
      },

      work: {
        title: 'العمل المُنجز والقرارات المتخذة',
        intro: 'هذا عمل منتج وهندسي فعلي، وليس مجرد فكرة. حتى الآن، شمل العمل:',
        list: [
          { title: 'تعريف المشكلة المهنية', body: 'صياغتها كمشكلة منتج قابلة للحل، لا كملاحظة عامة.' },
          { title: 'فرضية المنتج ونطاقه', body: 'تحديد ما تحاول المبادرة تحقيقه، وما يبقى خارج نطاقها الحالي.' },
          { title: 'تصميم الاستشارة الموجّهة', body: 'بناء تجربة تكتشف وتوضّح وتقترح، دون تحوّلها إلى نموذج طويل.' },
          { title: 'حدود تأكيد المستخدم', body: 'تحديد ما يحتاج تأكيدًا صريحًا قبل اعتماده في أي صياغة.' },
          { title: 'مبادئ الصياغة القوية والآمنة', body: 'وضع مبدأ الصياغة الأقوى داخل حدود الخبرة الفعلية.' },
          { title: 'تجربة متعددة المجالات المهنية', body: 'تصميم يراعي اختلاف القيمة المهنية بين خمسة اتجاهات.' },
          { title: 'معمارية قابلة للاختبار', body: 'بناء طبقات قابلة للفصل والاختبار المستقل.' },
          { title: 'تقييم سلوكي بسيناريوهات واقعية', body: 'اختبار الجودة عبر مواقف تعكس استخدامًا حقيقيًا.' },
          { title: 'توثيق تقني ومنتجي', body: 'تسجيل القرارات والمبادئ بشكل قابل للمراجعة لاحقًا.' },
          { title: 'تسجيل المخاطر والأسئلة المفتوحة', body: 'الاحتفاظ بسجل صريح لما لا يزال دون حل.' },
        ],
      },

      skills: {
        title: 'المهارات المُثبتة من خلال هذا العمل',
        intro: 'كل مهارة هنا مرتبطة بقرار أو تصميم فعلي داخل المبادرة، لا بمجرد كلمة مفتاحية في سيرة ذاتية.',
        list: [
          { title: 'صياغة استراتيجية المنتج واكتشافه', body: 'أُعيد تعريف مشكلة "كتابة السيرة الذاتية" الظاهرة كمشكلة أعمق تتعلق بالفهم المهني والثقة والتعبير المسؤول، بعد تقصٍّ للافتراضات ومشكلات المستخدمين الفعلية والفجوات المهنية، وتحويلها إلى اتجاه منتج واضح.' },
          { title: 'تصميم عرض القيمة والأصل المهني', body: 'حُدّدت قيمة المبادرة باكتشاف القيمة المهنية الحقيقية والتعبير عنها ضمن أصل مهني منظم، لا بمجرد توليد نص منمّق.' },
          { title: 'تصميم تجربة الاستشارة الموجّهة متعددة المجالات', body: 'صُممت التجربة لتوجيه المستخدم عبر الاكتشاف والتوضيح والاقتراح والتأكيد دون أن تتحول إلى نموذج طويل أو محادثة مفتوحة، مع مراعاة اختلاف هذه التجربة باختلاف خمسة اتجاهات مهنية بدل معاملة كل المسارات بالطريقة نفسها.' },
          { title: 'حوكمة المنتج وحدود الحقيقة المهنية', body: 'حُدّدت حدود واضحة بين المعلومة المؤكدة من المستخدم، واقتراح النظام، والافتراض غير المؤكد، والادعاء غير المدعوم، وسلطة القرار النهائي للمستخدم — مع فصل تصميمي بين ما أكده المستخدم وما هو اقتراح أو سياق ناقص، دون كشف بنية البيانات الداخلية أو قواعد ترجيح المصادر.' },
          { title: 'معمارية النظام والتكامل المستقل عن المزوّد', body: 'هُيكل المنتج في طبقات قابلة للفصل والاختبار، مع تجنّب الاعتماد على مزوّد ذكاء اصطناعي واحد.' },
          { title: 'التقييم السلوكي وضمان الجودة والاختبار الآلي', body: 'قُيِّمت الجودة عبر سلوكيات واقعية مثل الصياغة الضعيفة، ونقص السياق، والمبالغة غير المدعومة، وغموض الأقدمية الوظيفية، والطلبات غير الآمنة مهنيًا، وخضع سلوك النظام وحدود التنفيذ الهندسية للاختبار الآلي، دون نشر أعداد أو نسب تغطية داخلية.' },
          { title: 'التوثيق التقني وإدارة القرارات', body: 'وُثِّقت قواعد المنتج ومخاطره وقراراته وافتراضاته وحدوده بشكل قابل للمراجعة، بدل تركها داخل محادثات ذكاء اصطناعي مؤقتة.' },
          { title: 'إدارة النطاق والمخاطر والتنفيذ بمساعدة أدوات ذكاء اصطناعي', body: 'يُحافَظ على تمييز واضح بين ما تم تصميمه، وما نُفِّذ، وما اختُبر، وما لا يزال دون حل، وما يحتاج مراجعة متخصصة — مع مراعاة التعبير باللغة العربية والسياق المهني السعودي دون ادعاء تمثيل شامل للسوق، واستخدام أدوات ذكاء اصطناعي متعددة للبحث والتصميم والتنفيذ، بينما بقيت قرارات الاتجاه والقبول وتحمّل المخاطر والحكم النهائي بيد صاحب المبادرة.' },
        ],
        noteLabel: 'الصفة الدقيقة',
        note: 'الصفة الدقيقة هنا هي: مؤسس، ومالك قرار المنتج، ومصمم فلسفة المنتج ونهج تنفيذه المحكوم — لا مسمى مثل "مهندس برمجيات أول" أو "عالم أبحاث ذكاء اصطناعي" أو "مستشار مهني مرخّص".',
      },

      maturity: {
        title: 'الحالة الحالية وحدودها',
        intro: 'هذه مبادرة بحث وتطوير لمنتج مهني قيد البناء والتحقق.',
        list: [
          'خاصة، ولم تُطرح للاستخدام العام بعد.',
          'قيد التطوير الفعلي والمستمر.',
          'صُمم ونُفِّذ واختُبر جزء حقيقي منها.',
          'لا توجد بيانات علنية عن مستخدمين أو نمو أو إيرادات أو نتائج.',
          'ليست خدمة استشارة مهنية مرخّصة.',
          'لا تضمن التوظيف، أو المقابلات، أو اجتياز أنظمة الفرز الآلي.',
          'لا يوجد حاليًا مراجع بشري مستقل يعتمد كل توصية.',
          'مراجعة المستخدم وتأكيده يبقيان ضروريين.',
          'المراجعات القانونية والمهنية والخاصة بالخصوصية وحماية البيانات لا تزال مطلوبة قبل أي استخدام عام واسع.',
        ],
        closing: 'هذا الوضع لا يقلل من جدية العمل المنجز؛ هو وصف دقيق لمرحلته الحالية.',
      },
    },
  },

  en: {
    page_title: 'From Real Experience to Professional Wording That Gets Understood — Abdulrahman Asiri',
    meta_description: 'A research-and-development initiative helping people with genuine experience discover its professional value and express it more strongly and clearly, without exceeding their professional truth.',

    filetree_label: 'Initiative sections',

    hero: {
      kicker: 'A Product Research & Development Initiative',
      title: 'Real experience deserves wording that shows its true value.',
      subtitle: "Many people carry real professional responsibility, but everyday wording doesn't convey that value to recruiters or the systems commonly used to screen resumes.",
      intro: "Traditional CV tools, and even generic generative AI, may polish the surface wording, but they often miss the real context behind the work, and may accept vague or inflated claims without challenge, or add responsibilities and metrics the person never confirmed. This initiative takes a different path: helping people discover the real value of their experience, calibrate it, and express it more strongly without exceeding their professional truth.",
      statusNote: 'A private research-and-development initiative, still under active development.',
    },

    sections: {
      asset: {
        title: 'From Experience to a Reusable Professional Asset',
        body: [
          "Before producing any document, this initiative first builds what could be called a professional asset: a structured representation of a person's real experience, not just copy-ready text.",
        ],
        list: [
          'Experience confirmed by the person themselves.',
          'Professional value that may be hidden behind ordinary wording.',
          'Context relevant to the real work.',
          'Stronger, clearer professional wording.',
          'A possible professional direction worth exploring.',
          'Points that still need clarification.',
          'Boundaries that prevent wording unsupported by confirmed experience.',
        ],
        noteLabel: 'To be clear',
        note: "This asset is not a legally verified or independently certified document — it's a representation grounded in what the person has confirmed.",
      },

      consultation: {
        title: 'Guided Professional Consultation',
        body: [
          'Available professional signals are read first, then weak wording, ambiguity, or missing context is identified. Instead of generating finished text right away, focused questions surface the professional value hidden behind an everyday description, then stronger wording is suggested. The final decision always stays with the person: confirm, correct, or reject.',
        ],
        noteLabel: 'The tone of the consultation',
        note: 'The tone here is advisory and calm, focused on understanding the real work rather than testing the person behind it.',
      },

      expression: {
        title: 'Stronger Expression, Without Inflation',
        body: [
          "Much professional wording falls between two unhelpful extremes: language too weak to reflect real experience, or language inflated beyond what its author can defend later. This initiative aims for the middle ground: strong, safe wording within the true boundaries of professional experience.",
        ],
        exampleLabel: 'A simple example',
        beforeLabel: 'Before',
        before: 'I respond to customers and resolve their issues.',
        afterLabel: 'After',
        after: 'Handled recurring customer inquiries daily, identifying and documenting common issue patterns to speed up future resolution — after confirming the real work details with the person.',
        noteLabel: 'The boundary',
        note: "The goal isn't the loudest phrasing — it's wording closest to professional truth, without erasing real value or adding anything unconfirmed.",
      },

      domains: {
        title: 'Five Professional Directions',
        intro: "A single generic writing style isn't applied to every profession. Professional value reads differently across domains — the value of technical support differs from the value of sales, financial responsibility calls for different language than hospitality operations, and customer experience isn't judged through the same lens as business operations.",
        list: [
          { title: 'Technical Support & Digital Technology', body: 'Understanding recurring technical issues, documenting solutions, and improving the end-user experience.' },
          { title: 'Business Management & Operations', body: 'Organizing workflows, coordinating teams, and improving operational efficiency.' },
          { title: 'Sales, Retail & Customer Experience', body: 'Building customer relationships, understanding needs, and turning interaction into real value.' },
          { title: 'Finance, Accounting & Insurance', body: 'Accuracy in numbers, adherence to procedure, and careful management of financial responsibility.' },
          { title: 'Tourism, Hospitality & Events', body: "Managing the guest or event experience, and handling fast-changing situations with good judgment." },
        ],
        noteLabel: 'To be clear',
        note: "Selecting a domain supports clearer contextual understanding — it doesn't automatically assign a final job title or a fixed professional identity.",
      },

      work: {
        title: 'Work Completed and Decisions Made',
        intro: "This is real product and engineering work, not just an idea. So far, the work has included:",
        list: [
          { title: 'Defining the professional problem', body: 'Framing it as a solvable product problem, not a general observation.' },
          { title: 'The product thesis and scope', body: 'Defining what the initiative is trying to achieve, and what remains outside its current scope.' },
          { title: 'Designing the guided consultation', body: 'Building an experience that discovers, clarifies, and suggests, without becoming a long form.' },
          { title: 'User-confirmation boundaries', body: 'Defining what requires explicit confirmation before it can be used in any wording.' },
          { title: 'Strong-but-safe wording principles', body: 'Establishing the principle of stronger wording within the true boundaries of experience.' },
          { title: 'Multi-domain experience design', body: 'A design that accounts for how professional value differs across five directions.' },
          { title: 'A testable architecture', body: 'Building layers that can be separated and tested independently.' },
          { title: 'Behavioral evaluation with realistic scenarios', body: 'Testing quality against situations that reflect real use.' },
          { title: 'Technical and product documentation', body: 'Recording decisions and principles in a way that can be reviewed later.' },
          { title: 'Recording risks and open questions', body: 'Keeping an explicit record of what remains unresolved.' },
        ],
      },

      skills: {
        title: 'Skills Demonstrated Through This Work',
        intro: "Every skill here is tied to an actual decision or design inside the initiative, not just a keyword on a résumé.",
        list: [
          { title: 'Product Strategy, Discovery, and Problem Framing', body: "Reframed an apparent 'CV-writing' problem into a deeper product problem involving professional understanding, trust, and responsible expression, after investigating assumptions, real user problems, and professional gaps, and converting them into a clear product direction." },
          { title: 'Value Proposition and Professional-Asset Design', body: "Defined the initiative's value as discovering and expressing genuine professional value within a structured professional asset, rather than simply generating polished text." },
          { title: 'Guided Consultation UX and Multi-Domain Experience Design', body: 'Designed the experience to guide users through discovery, clarification, suggestion, and confirmation without becoming a long form or an open-ended chatbot, while accounting for how the experience differs across five professional directions instead of treating every career path the same way.' },
          { title: 'AI Product Governance and Professional-Truth Boundaries', body: "Defined clear boundaries between user-confirmed information, model suggestions, unconfirmed assumptions, unsupported claims, and the user's final decision authority — with a design-level separation between what's confirmed and what remains a suggestion or missing context, without exposing internal data structures or source-priority rules." },
          { title: 'System Architecture and Provider-Independent Integration', body: 'Structured the product into separable, testable layers, avoiding dependency on a single AI provider.' },
          { title: 'Behavioral Evaluation, Quality Assurance, and Automated Testing', body: 'Quality was evaluated through realistic behaviors such as weak wording, missing context, unsupported inflation, ambiguous seniority, and professionally unsafe requests, and both system behavior and engineering boundaries were covered by automated testing, without publishing internal counts or coverage figures.' },
          { title: 'Technical Documentation and Decision Management', body: 'Product rules, risks, decisions, assumptions, and limitations were documented and made reviewable, rather than left inside temporary AI conversations.' },
          { title: 'Scope, Risk, Trade-off, and AI-Assisted Execution Leadership', body: "A clear distinction is maintained between what's designed, implemented, tested, unresolved, and requiring specialized review — while considering Arabic-language expression and Saudi professional context without claiming comprehensive market authority, and using multiple AI tools for research, design, and implementation while direction, acceptance, risk ownership, and final judgment remained with the founder." },
        ],
        noteLabel: 'The accurate title',
        note: "The accurate description here is: founder, product-direction owner, and designer of the product's philosophy and governed execution approach — not titles like \"Senior Software Architect,\" \"AI Research Scientist,\" or \"Licensed Career Consultant.\"",
      },

      maturity: {
        title: 'Current Maturity and Limitations',
        intro: 'This is a research-and-development initiative for a professional product, currently being built and validated.',
        list: [
          'Private, and not yet publicly released.',
          'Under active, ongoing development.',
          'Real parts have been designed, implemented, and tested.',
          'No public data on users, growth, revenue, or outcomes.',
          'Not a licensed professional-advisory service.',
          'Does not guarantee employment, interviews, or automated-screening outcomes.',
          'No independent human reviewer currently certifies every recommendation.',
          'User review and confirmation remain essential.',
          'Legal, professional, privacy, and data-protection reviews remain required before broad public use.',
        ],
        closing: "This status doesn't diminish the seriousness of the work completed — it's an accurate description of where the initiative currently stands.",
      },
    },
  },
};
