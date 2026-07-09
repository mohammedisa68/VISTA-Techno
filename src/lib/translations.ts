export interface Dictionary {
  signIn: string;
  secureEntrance: string;
  emailCoords: string;
  securePassword: string;
  createProfile: string;
  login: string;
  freeLogin: string;
  freeLoginDesc: string;
  languageSelect: string;
  needRegister: string;
  alreadyAccount: string;
  or: string;
  fullName: string;
  roleSimulator: string;
  roleSimulatorDesc: string;
  quickAdmin: string;
  quickStaff: string;
  logout: string;
  role: string;
  guest: string;
  navHome: string;
  navAbout: string;
  navPublisherServices: string;
  navMarket: string;
  navWebDevelopment: string;
  navLearning: string;
  navAnnouncements: string;
  navManagement: string;
  navContact: string;

  // Home Section
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDesc: string;
  exploreAcademy: string;
  creativePublishing: string;
  statsGrads: string;
  statsEnterprises: string;
  statsSatisfaction: string;
  statsInnovation: string;
  introOverview: string;
  introTitle: string;
  introDesc1: string;
  introDesc2: string;
  readStory: string;
  fourPillars: string;
  featuredServices: string;
  pillarPubTitle: string;
  pillarPubDesc: string;
  pillarWebTitle: string;
  pillarWebDesc: string;
  pillarMarketTitle: string;
  pillarMarketDesc: string;
  pillarLearnTitle: string;
  pillarLearnDesc: string;
  details: string;
  visionTitle: string;
  visionDesc: string;
  missionTitle: string;
  missionDesc: string;
  readyToAdvance: string;
  readyToAdvanceDesc: string;
  inquireWithTeam: string;
  registerForClass: string;
  newsHub: string;
  latestAnnouncements: string;
  latestAnnouncementsDesc: string;
  readAnnouncement: string;
  directSupport: string;
  contactInfo: string;
  contactDesc: string;
  joinTelegram: string;
  companyLocation: string;
  headquartersAddress: string;
  hotlineSupport: string;
  technicalEmail: string;

  // About Section
  aboutHeaderTitle: string;
  aboutHeaderDesc: string;
  aboutStoryTitle: string;
  aboutStoryDesc1: string;
  aboutStoryDesc2: string;
  aboutStoryDesc3: string;
  aboutValuesTitle: string;
  aboutValue1Title: string;
  aboutValue1Desc: string;
  aboutValue2Title: string;
  aboutValue2Desc: string;
  aboutValue3Title: string;
  aboutValue3Desc: string;
  aboutValue4Title: string;
  aboutValue4Desc: string;
  aboutTeamTitle: string;
  aboutTeamDesc: string;

  // General Interface Labels
  addToCart: string;
  removeFromCart: string;
  quantity: string;
  total: string;
  clearCart: string;
  checkout: string;
  cartIsEmpty: string;
  searchPlaceholder: string;
  filterAll: string;
  registerNow: string;
}

export type LanguageCode = 'EN' | 'AR' | 'OM' | 'AM';

export const translations: Record<LanguageCode, Dictionary> = {
  EN: {
    signIn: 'VISTA Sign In',
    secureEntrance: 'Secure Core Entrance',
    emailCoords: 'Email Account Coordinates',
    securePassword: 'Secure Password',
    createProfile: 'Create Profile Account',
    login: 'Log In',
    freeLogin: '✨ Free Login (Instant Access)',
    freeLoginDesc: 'One-click bypass for instant exploration as Admin!',
    languageSelect: 'Language Select',
    needRegister: 'Need to register? Create Profile',
    alreadyAccount: 'Already hold an account? Sign In',
    or: 'OR',
    fullName: 'Full Identity Name',
    roleSimulator: 'Review Role Simulator:',
    roleSimulatorDesc: 'You can cycle user roles instantly using the dropdown in the top Navbar.',
    quickAdmin: 'Quick Admin Form',
    quickStaff: 'Quick Staff Form',
    logout: 'Logout',
    role: 'Role',
    guest: 'Guest',
    navHome: 'Home',
    navAbout: 'About VISTA',
    navPublisherServices: 'Publisher Services',
    navMarket: 'VISTA Market',
    navWebDevelopment: 'Website Development',
    navLearning: 'VISTA Learning',
    navAnnouncements: 'Announcements',
    navManagement: 'Company Management',
    navContact: 'Contact',

    // Home Section
    heroBadge: 'Advancing Tech & Design in East Africa',
    heroTitle: 'VISTA',
    heroSubtitle: 'Vision of Innovative Systems and Technologies for Advancement',
    heroDesc: 'VISTA is a premier digital solutions ecosystem. We operate at the intersection of professional branding, full-stack software development, surveillance hardware sales, and technical academy classes.',
    exploreAcademy: 'Explore Academy',
    creativePublishing: 'Creative Publishing',
    statsGrads: 'Academy Graduates',
    statsEnterprises: 'Branded Enterprises',
    statsSatisfaction: 'Student Satisfaction',
    statsInnovation: 'Years of Innovation',
    introOverview: 'Overview',
    introTitle: 'Introduction to VISTA',
    introDesc1: 'Founded in Addis Ababa, Ethiopia, VISTA (Vision of Innovative Systems and Technologies for Advancement) acts as a dynamic tech startup geared to empower businesses, state agencies, and ambitious individuals.',
    introDesc2: 'We close the traditional gap between creative design and technical engineering. Our facility features heavy industrial machinery for bulk banner or apparel prints alongside modern programming labs dedicated to teaching, testing, and full-stack software deployments.',
    readStory: 'Read our story',
    fourPillars: 'Four Pillars of VISTA',
    featuredServices: 'Featured Services',
    pillarPubTitle: 'Publisher Services',
    pillarPubDesc: 'Bulk wide-format banner prints, custom rigid plastic corporate badges, engraved stamp seals, and full digital branding kits.',
    pillarWebTitle: 'Website Development',
    pillarWebDesc: 'Highly responsive school portal frameworks, NGO directories, landing pages, redesign packages, and continuous SSL setups.',
    pillarMarketTitle: 'VISTA Market',
    pillarMarketDesc: 'Retail computers, commercial-spec developer laptops, surveillance multi-channel CCTV grids, and corporate network routers.',
    pillarLearnTitle: 'VISTA Learning',
    pillarLearnDesc: 'Verified technical training programs covering foundational PC tools, Photoshop layouts, full-stack React, and cybersecurity.',
    details: 'Details',
    visionTitle: 'Vision Statement',
    visionDesc: 'To stand as East Africa\'s most unified technological advancement center, where physical corporate printing fabrication aligns beautifully with pristine full-stack software deployments. We strive to mold ambitious students into verified technical leads, bridging digital structures seamlessly.',
    missionTitle: 'Mission Statement',
    missionDesc: 'To deliver elite corporate printing materials, optimized custom web platforms, and original certified electronic accessories. We are dedicated to maintaining structured, physical computer labs that provide verified skill certificates, lifelong alumni portals, and direct enterprise routing.',
    readyToAdvance: 'Ready to Advance Your Personal Tech Skills?',
    readyToAdvanceDesc: 'Connect with our academic registrar or book a printing design consultation. We offer fully customized, robust packages to suit startups, NGOs, and students alike.',
    inquireWithTeam: 'Inquire with team',
    registerForClass: 'Register for class',
    newsHub: 'VISTA News Hub',
    latestAnnouncements: 'Latest announcements',
    latestAnnouncementsDesc: 'Read recently dispatched technical articles and educational announcements from our directors.',
    readAnnouncement: 'Read announcement',
    directSupport: 'Direct Support',
    contactInfo: 'Contact Information',
    contactDesc: 'Our central customer support lines and physical headquarters are based in Addis Ababa, Ethiopia. Drop by our office or write directly to our departments.',
    joinTelegram: 'Join VISTA Telegram Channel',
    companyLocation: 'Company Location',
    headquartersAddress: 'Headquarters Address',
    hotlineSupport: 'Hotline Support',
    technicalEmail: 'Technical Email',

    // About Section
    aboutHeaderTitle: 'About Our Enterprise',
    aboutHeaderDesc: 'Discover the vision, background history, values, and personnel that drive the Vision of Innovative Systems and Technologies for Advancement.',
    aboutStoryTitle: 'Our Story & Background',
    aboutStoryDesc1: 'Established in early 2024, VISTA was born out of a desire to create a multi-disciplinary technology sandbox. We noticed that companies were forced to consult separate vendors for corporate printing, software maintenance, hardware infrastructure, and training programs. This fragmentation led to massive communication leaks, inconsistent branding, and broken systems.',
    aboutStoryDesc2: 'VISTA (Vision of Innovative Systems and Technologies for Advancement) emerged as a unified answer. By housing full-stack web development, digital print prototyping, computer/ICT retail, and an active coding academy under one roof, we provide seamless digital transformation. Our clients enjoy synchronized brand aesthetics, durable computing infrastructure, and staff trained to command those systems.',
    aboutStoryDesc3: 'We started as a modest 5-person agency in Addis Ababa and have grown into a high-fidelity digital hub partnering with prestigious schools, non-profits, and growing local startups across Ethiopia and East Africa.',
    aboutValuesTitle: 'Our Core Operating Values',
    aboutValue1Title: 'Integrity First',
    aboutValue1Desc: 'We deliver on our promises, maintaining high ethics in billing, sourcing original electronics, and certifying students.',
    aboutValue2Title: 'Practical Innovation',
    aboutValue2Desc: 'Technology is only useful if it solves real-world needs. We focus on teaching actual coding skills and building commercial websites.',
    aboutValue3Title: 'Inclusive Learning',
    aboutValue3Desc: 'Digital literacy belongs to everyone. We create affordable pathways for school children, career changers, and local businesses.',
    aboutValue4Title: 'Quality Execution',
    aboutValue4Desc: 'From a simple flyer to a complex multi-database web app, we pay microscopic attention to alignment, stability, and aesthetics.',
    aboutTeamTitle: 'Our Team of Directors',
    aboutTeamDesc: 'VISTA is guided by a diverse leadership group blending high industrial fabrication, computer networks, and full-stack software development.',

    // General Interface Labels
    addToCart: 'Add to Cart',
    removeFromCart: 'Remove',
    quantity: 'Qty',
    total: 'Total',
    clearCart: 'Clear Cart',
    checkout: 'Checkout',
    cartIsEmpty: 'Your shopping cart is empty.',
    searchPlaceholder: 'Search items...',
    filterAll: 'All Items',
    registerNow: 'Register Now'
  },
  AR: {
    signIn: 'تسجيل دخول فيستا',
    secureEntrance: 'المدخل الآمن للنظام',
    emailCoords: 'إحداثيات حساب البريد الإلكتروني',
    securePassword: 'كلمة المرور الآمنة',
    createProfile: 'إنشاء حساب ملف شخصي',
    login: 'تسجيل الدخول',
    freeLogin: '✨ دخول مجاني (وصول فوري)',
    freeLoginDesc: 'تجاوز بنقرة واحدة للاستكشاف الفوري كمدير!',
    languageSelect: 'اختر اللغة',
    needRegister: 'تبحث عن تسجيل؟ إنشاء حساب',
    alreadyAccount: 'هل لديك حساب بالفعل؟ تسجيل دخول',
    or: 'أو',
    fullName: 'الاسم الكامل للهوية',
    roleSimulator: 'محاكي الأدوار:',
    roleSimulatorDesc: 'يمكنك تبديل أدوار المستخدمين فوراً من القائمة العلوية.',
    quickAdmin: 'نموذج مدير سريع',
    quickStaff: 'نموذج موظف سريع',
    logout: 'تسجيل الخروج',
    role: 'دور',
    guest: 'ضيف',
    navHome: 'الرئيسية',
    navAbout: 'حول فيستا',
    navPublisherServices: 'خدمات النشر',
    navMarket: 'سوق فيستا',
    navWebDevelopment: 'تطوير المواقع',
    navLearning: 'تعليم فيستا',
    navAnnouncements: 'الإعلانات',
    navManagement: 'إدارة الشركة',
    navContact: 'اتصل بنا',

    // Home Section
    heroBadge: 'تطوير التكنولوجيا والتصميم في شرق أفريقيا',
    heroTitle: 'فيستا',
    heroSubtitle: 'رؤية الأنظمة والتقنيات المبتكرة من أجل التقدم والازدهار',
    heroDesc: 'فيستا هي نظام بيئي رائد للحلول الرقمية. نحن نعمل في تقاطع العلامات التجارية المهنية، وتطوير البرمجيات المتكاملة، ومبيعات أجهزة المراقبة والأمن، ودروس الأكاديمية التقنية.',
    exploreAcademy: 'استكشف الأكاديمية',
    creativePublishing: 'النشر الإبداعي',
    statsGrads: 'خريجو الأكاديمية',
    statsEnterprises: 'الشركات المسجلة',
    statsSatisfaction: 'رضا الطلاب والعملاء',
    statsInnovation: 'سنوات من الابتكار',
    introOverview: 'لمحة عامة',
    introTitle: 'مقدمة إلى فيستا',
    introDesc1: 'تأسست في أديس أبابا، إثيوبيا، وتعمل فيستا كشركة ناشئة تقنية ديناميكية تهدف إلى تمكين الشركات والوكالات الحكومية والأفراد الطموحين.',
    introDesc2: 'نحن نغلق الفجوة التقليدية بين التصميم الإبداعي والهندسة التقنية. تمتاز منشأتنا بالآلات الصناعية الثقيلة لطباعة اللافتات الكبيرة والملابس إلى جانب مختبرات البرمجة الحديثة لتعليم وتطوير تطبيقات الويب المتكاملة.',
    readStory: 'اقرأ قصتنا ورؤيتنا',
    fourPillars: 'الركائز الأربع لشركة فيستا',
    featuredServices: 'الخدمات المميزة لدينا',
    pillarPubTitle: 'خدمات النشر والإعلان',
    pillarPubDesc: 'طباعة لافتات عريضة، شارات شركات بلاستيكية صلبة مخصصة، أختام منقوشة، وحزم هوية تجارية رقمية كاملة.',
    pillarWebTitle: 'تطوير مواقع الويب والبرمجيات',
    pillarWebDesc: 'بوابات المدارس سريعة الاستجابة، أدلة المنظمات غير الحكومية، صفحات الهبوط، وحزم إعادة التصميم وإعدادات شهادات SSL المستمرة.',
    pillarMarketTitle: 'سوق فيستا للتجارة',
    pillarMarketDesc: 'أجهزة الكمبيوتر المكتبية، أجهزة الكمبيوتر المحمولة المخصصة للمطورين والمصممين، شبكات كاميرات المراقبة، وأجهزة التوجيه والشبكات المؤسسية.',
    pillarLearnTitle: 'أكاديمية فيستا للتعليم',
    pillarLearnDesc: 'برامج تدريب تقنية معتمدة تغطي أدوات الكمبيوتر الأساسية، وتصميم الفوتوشوب، ولغة البرمجة React والأمن السيبراني.',
    details: 'تفاصيل الخدمة',
    visionTitle: 'بيان الرؤية',
    visionDesc: 'أن نكون المركز التكنولوجي الأكثر تكاملاً في شرق أفريقيا، حيث تتماشى عمليات التصنيع والطباعة المادية مع تطبيقات البرمجيات المتكاملة والحديثة والموثوقة.',
    missionTitle: 'بيان المهمة',
    missionDesc: 'تقديم مواد طباعة ممتازة، ومنصات ويب مخصصة ومحسنة، وإكسسوارات إلكترونية معتمدة، مع الحفاظ على مختبرات حاسوبية مهيكلة توفر شهادات مهارات حقيقية للمتدربين.',
    readyToAdvance: 'هل أنت جاهز لتطوير مهاراتك التقنية؟',
    readyToAdvanceDesc: 'اتصل بمسجل الأكاديمية أو احجز استشارة لتصميم الطباعة. نحن نقدم حزماً مخصصة بالكامل وقوية لتناسب الشركات الناشئة والمنظمات غير الحكومية والطلاب على حد سواء.',
    inquireWithTeam: 'استفسر من الفريق الآن',
    registerForClass: 'سجل في الدورة التقنية',
    newsHub: 'مركز أخبار فيستا',
    latestAnnouncements: 'أحدث الإعلانات والأخبار',
    latestAnnouncementsDesc: 'اقرأ المقالات التقنية المنشورة مؤخراً والإعلانات التعليمية الصادرة عن مديرينا.',
    readAnnouncement: 'اقرأ الإعلان بالكامل',
    directSupport: 'الدعم المباشر',
    contactInfo: 'معلومات الاتصال والأرقام',
    contactDesc: 'خطوط دعم العملاء المركزية والمقر الرئيسي للشركة تقع في أديس أبابا، إثيوبيا. تفضل بزيارة مكتبنا أو راسل أقسامنا مباشرة.',
    joinTelegram: 'انضم إلى قناة تيليجرام لشركة فيستا',
    companyLocation: 'موقع الشركة والبلد',
    headquartersAddress: 'عنوان المقر الرئيسي',
    hotlineSupport: 'الخط الساخن للدعم والمساعدة',
    technicalEmail: 'البريد الإلكتروني التقني الرسمي',

    // About Section
    aboutHeaderTitle: 'حول مؤسستنا التقنية',
    aboutHeaderDesc: 'اكتشف الرؤية والخلفية التاريخية والقيم الكامنة وراء سعينا في مجال التقنيات والأنظمة الحديثة للازدهار والتقدم.',
    aboutStoryTitle: 'قصتنا وخلفيتنا التاريخية',
    aboutStoryDesc1: 'تأسست فيستا في أوائل عام 2024، ونشأت من رغبة في إنشاء مختبر تقني متعدد التخصصات. لقد لاحظنا أن الشركات تضطر إلى استشارة بائعين منفصلين لخدمات الطباعة، وصيانة البرمجيات، وتوفير الأجهزة، والبرامج التدريبية مما تسبب في ضعف الأداء والتكامل.',
    aboutStoryDesc2: 'برزت فيستا كإجابة موحدة لتلك المشاكل. من خلال توفير خدمات التطوير المتكاملة، ونمذجة الطباعة الرقمية المتقدمة، وتجارة تكنولوجيا المعلومات والأجهزة، وأكاديمية برمجية نشطة تحت سقف واحد، نقدم تحولاً رقمياً سلساً يتمتع بالجمال والاستقرار.',
    aboutStoryDesc3: 'بدأنا كوكالة متواضعة تضم 5 أشخاص في أديس أبابا وتطورنا إلى مركز رقمي عالي الدقة يخدم المدارس المرموقة، والمنظمات غير الحكومية، والشركات الناشئة المتنامية في إثيوبيا وشرق أفريقيا ككل.',
    aboutValuesTitle: 'قيمنا الأساسية في العمل',
    aboutValue1Title: 'النزاهة والصدق أولاً',
    aboutValue1Desc: 'نحن نفي بوعودنا للعملاء، ونحافظ على أخلاقيات مهنية عالية في الفواتير وتوفير الإلكترونيات الأصلية واعتماد الطلاب.',
    aboutValue2Title: 'الابتكار العملي والمفيد',
    aboutValue2Desc: 'التكنولوجيا مفيدة فقط إذا كانت تحل احتياجات حقيقية. نحن نركز على تدريس مهارات البرمجة الفعلية وبناء منصات تجارية موثوقة.',
    aboutValue3Title: 'التعليم الشامل والمتاح',
    aboutValue3Desc: 'المعرفة الرقمية حق للجميع. نحن نخلق مسارات ميسورة التكلفة لأطفال المدارس، والمغيرين لمهنتهم، والشركات المحلية على حد سواء.',
    aboutValue4Title: 'جودة التنفيذ والجمال',
    aboutValue4Desc: 'من مجرد نشرة إعلانية بسيطة إلى تطبيق ويب معقد وقواعد بيانات متعددة، نولي اهتماماً دقيقاً للغاية للمحاذاة والاستقرار والجماليات.',
    aboutTeamTitle: 'فريق الإدارة والمديرين لدينا',
    aboutTeamDesc: 'يتم توجيه فيستا من قبل مجموعة قيادية متنوعة تمزج بين التصنيع الصناعي العالي وشبكات الكمبيوتر وتطوير البرمجيات المتكاملة الحديثة.',

    // General Interface Labels
    addToCart: 'أضف إلى السلة',
    removeFromCart: 'إزالة',
    quantity: 'الكمية',
    total: 'الإجمالي',
    clearCart: 'تفريغ السلة',
    checkout: 'الدفع والشراء',
    cartIsEmpty: 'سلة التسوق الخاصة بك فارغة حالياً.',
    searchPlaceholder: 'ابحث عن المنتجات والمعدات...',
    filterAll: 'جميع الأصناف والأقسام',
    registerNow: 'سجل الآن في الدورة'
  },
  OM: {
    signIn: 'VISTA Seeni',
    secureEntrance: 'Seensa Amansiisaa',
    emailCoords: 'Teessoo Imeelii Akkaawuntii',
    securePassword: 'Jecha Cukoo Amansiisaa',
    createProfile: 'Profaayilii Akkaawuntii Uumi',
    login: 'Seeni',
    freeLogin: '✨ Seensa Bilisaa (Daqiiqaa tokkotti)',
    freeLoginDesc: 'Cunqursaa tokkoon akka Admin-itti daqiiqaa tokkotti seenaa!',
    languageSelect: 'Afaan Filadhu',
    needRegister: 'Galmaa’uu barbaadduu? Profaayilii Uumi',
    alreadyAccount: 'Duraan akkaawuntii qabduu? Seenaa',
    or: 'YOKIIN',
    fullName: 'Maqaa Guutuu',
    roleSimulator: 'Gochoota Shooraa Simuleetii Gochuuf:',
    roleSimulatorDesc: 'Navbar gubbaa jiru fayyadamanii shoorawwan salphaatti jijjiiruu dandeessu.',
    quickAdmin: 'Foomii Admin Saffisaa',
    quickStaff: 'Foomii Hojjetaa Saffisaa',
    logout: 'Ba’i',
    role: 'Shoora',
    guest: 'Keessummaa',
    navHome: 'Hoom',
    navAbout: 'Waa’ee VISTA',
    navPublisherServices: 'Tajaajila Maxxansaa',
    navMarket: 'Gabaa VISTA',
    navWebDevelopment: 'Misooma Weebsaayitii',
    navLearning: 'Barnoota VISTA',
    navAnnouncements: 'Beeksisa',
    navManagement: 'Bulchiinsa Dhaabbataa',
    navContact: 'Quunnamtii',

    // Home Section
    heroBadge: 'Guddina Teeknooloojii fi Diizaayinii Afriikaa Bahaatti',
    heroTitle: 'VISTA',
    heroSubtitle: 'Mul’ata Sirnoota fi Teeknooloojiiwwan Haaromsaa Misoomaaf',
    heroDesc: 'VISTA-n sirna furmaata dijiitaalaa olaanaadha. Maxxansaa beeksisawwan gurguddoo, misooma weebsaayitii guutuu, meeshalee eegumsaa fi barumsa teeknikaa irratti xiyyeeffanna.',
    exploreAcademy: 'Akkaadaamii Ilaali',
    creativePublishing: 'Maxxansaa Kalaqaa',
    statsGrads: 'Eebbifamtoota Akkaadaamii',
    statsEnterprises: 'Dhaabbata Beeksifaman',
    statsSatisfaction: 'Quufiinsa Barattootaa',
    statsInnovation: 'Waggoota Haaromsaa',
    introOverview: 'Overview',
    introTitle: 'Seensa VISTA',
    introDesc1: 'Finfinnee, Itoophiyaatti kan hundeeffame, VISTA (Vision of Innovative Systems and Technologies for Advancement) teeknooloojii saffisaa misooma dhaabbata, qaama mootummaa fi dhuunfaaf dandeessisudha.',
    introDesc2: 'Garaagarummaa kalaqa diizaayinii fi injiniiringii teeknikaa gidduu jiru ni dhiphisna. Labsii pirograamiingii ammayyaa fi maashinaroota maxxansaa gurguddoo qabna.',
    readStory: 'Seenaa keenya dubbisi',
    fourPillars: 'Utuboota Afur kan VISTA',
    featuredServices: 'Tajaajilaalee Addaa',
    pillarPubTitle: 'Tajaajila Maxxansaa',
    pillarPubDesc: 'Maxxansaa fannoo gurguddoo, kaardii eenyummaa rigid pilaastikaa, chaappaa fi beeksisawwan kaampaanii guutuu.',
    pillarWebTitle: 'Misooma Weebsaayitii',
    pillarWebDesc: 'Weebsaayitiilee manneen barnootaa, NGO, marsariitii quunnamtii fi tajaajila SSL walitti fufiinsaan.',
    pillarMarketTitle: 'Gabaa VISTA',
    pillarMarketDesc: 'Kompitaroota dhuunfaa, Laptops hojjettoota, kaameeraa eegumsaa CCTV fi meeshalee neetworkii.',
    pillarLearnTitle: 'Barnoota VISTA',
    pillarLearnDesc: 'Leenjiiwwan teeknikaa mirkaneeffaman kan akka PC bu’uuraa, Photoshop, React fi eegumsa saayibarii.',
    details: 'Bal’ina',
    visionTitle: 'Mul’ata Keenya',
    visionDesc: 'Giddugala teeknooloojii tokkoomte ta’uun, misooma weebsaayitii qulqulluu fi maxxansaa dhaabbataa walitti hidhuu fi barattoota gara dandeettii olaanaatti ceesisuudha.',
    missionTitle: 'Ergama Keenya',
    missionDesc: 'Meeshalee maxxansaa beeksisawwan olaanoo, misooma weebsaayitii ammayyaa fi meeshalee elektirooniksii qulqulluu dhiyeessuu, akkasumas leenjii addaa kennuudha.',
    readyToAdvance: 'Dandeettii Teeknooloojii Keessan Guddisuuf Qophiidhaa?',
    readyToAdvanceDesc: 'Giddugala barumsaa keenya quunnamaa yokiin tajaajila maxxansaa keenyaaf oomishaalee gaafadhaa.',
    inquireWithTeam: 'Garee quunnami',
    registerForClass: 'Kilaasif galmaayi',
    newsHub: 'Oduu Haaraa VISTA',
    latestAnnouncements: 'Beeksisa Haaraa',
    latestAnnouncementsDesc: 'Barreeffamoota teeknikaa fi beeksisawwan barumsaa dhiyoo dhimmoota keenya gubbaa dubbisaa.',
    readAnnouncement: 'Beeksisa dubbisi',
    directSupport: 'Gargaarsa Kallattii',
    contactInfo: 'Odeeffannoo Quunnamtii',
    contactDesc: 'Teessoo fi gargaarsi keenya giddugala Finfinnee, Itoophiyaa jira. Waajira keenya koottu yokiin garee keenya quunnami.',
    joinTelegram: 'Telegram VISTA Seeni',
    companyLocation: 'Bakka Dhaabbataa',
    headquartersAddress: 'Teessoo Waajira Guddaa',
    hotlineSupport: 'Bilbila Gargaarsaa',
    technicalEmail: 'Imeelii Teeknikaa',

    // About Section
    aboutHeaderTitle: 'Waa’ee Dhaabbata Keenyaa',
    aboutHeaderDesc: 'Mul’ata, seenaa guddinaa, qajeelfamoota keenya fi garee namoota hoggansa keenya duuba jiran asitti daddabalanii ilaalaa.',
    aboutStoryTitle: 'Seenaa & Duubbee Keenya',
    aboutStoryDesc1: 'Hundeeffama bara 2024 jalqaba gubbaa, VISTA-n kan dhalate sababa garaagarummaa jiru dhiphisuufi. Dhaabbanni baay’een tajaajila adda addaaf qaama adda addaa bira deemuun rakkamaa turan, kunis wal-quunnamtii fi hojii qulqulluun qabamuu irratti dhibee uumaa ture.',
    aboutStoryDesc2: 'VISTA-n sirna furmaata dijiitaalaa tokkoomte ta’uun dhufe. Misooma weebsaayitii guutuu, maxxansaa beeksisawwan dijiitaalaa, daldala meeshalee kompitaraa fi akkaadaamii barnoota teeknikaa iddoo tokko jalatti walitti fidneerra.',
    aboutStoryDesc3: 'Namoota 5 qofaan Finfinneetti kan jalqabne ta’us, guddinni keenya gurguddoo ta’ee manneen barnootaa kabajamoof, NGO-f fi dhaabbata dhuunfaaf Itoophiyaa fi Afriikaa Bahaa keessatti hojjettoota gargaaraa jirra.',
    aboutValuesTitle: 'Qajeelfamoota Keenya Hojii',
    aboutValue1Title: 'Amanamtummaa Jalqabaa',
    aboutValue1Desc: 'Waadaa galle ni guunna, daldala qulqulluu fi barattoota keenyaaf ragaa barumsaa mirkaneeffamaa kennuu keessatti amanamaadha.',
    aboutValue2Title: 'Kalaqa Hojii Qabatamaa',
    aboutValue2Desc: 'Teeknooloojii faayidaa qaba kan jedhamu yoo rakkina dhuunfaa hiikedha. Nu barumsa qabatamaa fi weebsaayitii daldalaa irratti xiyyeeffanna.',
    aboutValue3Title: 'Barnoota Hundaaf Ga’u',
    aboutValue3Desc: 'Dandeettiin dijiitaalaa nama hundaaf barbachisaadha. Kafaltii madaalawaan ijoolleef, barattootaaf fi daldala xixiqqoof karaan ni uumna.',
    aboutValue4Title: 'Hojii Qulqullina Qabu',
    aboutValue4Desc: 'Beeksisa salphaa irraa kaasee hanga weebsaayitii fi kuusaa deetaa walxaxaa ta’etti, qulqullina diizaayinii fi deemsa isaa hunda microscopic dhaan hordofna.',
    aboutTeamTitle: 'Garee Daayirektooroota Keenyaa',
    aboutTeamDesc: 'VISTA hoggantoota dandeettii maxxansaa gurguddoo, neetworkii kompitaraa fi misooma weebsaayitiin bilchaataniin durfama.',

    // General Interface Labels
    addToCart: 'Gabaa Kaartitti Dabali',
    removeFromCart: 'Haqi',
    quantity: 'Baay’ina',
    total: 'Waliigala',
    clearCart: 'Kaartii Qulqulleessi',
    checkout: 'Kafaltii Xumuri',
    cartIsEmpty: 'Kaartiin keessan duwwaadha.',
    searchPlaceholder: 'Meeshalee barbaadi...',
    filterAll: 'Oomishaalee Hunda',
    registerNow: 'Amma Galmaayi'
  },
  AM: {
    signIn: 'VISTA መግቢያ',
    secureEntrance: 'ደህንነቱ የተጠበቀ መግቢያ',
    emailCoords: 'የኢሜይል አድራሻ',
    securePassword: 'የይለፍ ቃል',
    createProfile: 'አዲስ መለያ ፍጠር',
    login: 'ግባ',
    freeLogin: '✨ ነፃ መግቢያ (ያለይለፍ ቃል)',
    freeLoginDesc: 'ያለይለፍ ቃል በአንድ ጠቅታ እንደ አስተዳዳري (Admin) ለመግባት ያስችላል!',
    languageSelect: 'ቋንቋ ይምረጡ',
    needRegister: 'መመዝገብ ይፈልጋሉ? መለያ ፍጠሩ',
    alreadyAccount: 'ቀደም ሲል መለያ አለዎት? ይግቡ',
    or: 'ወይም',
    fullName: 'ሙሉ ስም',
    roleSimulator: 'የሚና ማስመሰያ:',
    roleSimulatorDesc: 'ከላይ ባለው ሜኑ በመጠቀም የሚና አይነት በቀላሉ መቀየር ይችላሉ።',
    quickAdmin: 'ፈጣን የአስተዳዳሪ ፎርም',
    quickStaff: 'ፈጣን የሰራተኛ ፎርም',
    logout: 'ውጣ',
    role: 'ሚና',
    guest: 'እንግዳ',
    navHome: 'መነሻ',
    navAbout: 'ስለ ቪስታ',
    navPublisherServices: 'የህትመት አገልግሎት',
    navMarket: 'ቪስታ ገበያ',
    navWebDevelopment: 'የድረ-ገጽ ልማት',
    navLearning: 'ቪስታ ስልጠና',
    navAnnouncements: 'ማስታወቂያዎች',
    navManagement: 'የድርጅት አስተዳደር',
    navContact: 'አድራሻ',

    // Home Section
    heroBadge: 'በምስራቅ አፍሪካ የቴክኖሎጂ እና የዲዛይን እድገት',
    heroTitle: 'VISTA',
    heroSubtitle: 'ለእድገት የፈጠራ ስርዓቶች እና ቴክኖሎጂዎች ራዕይ',
    heroDesc: 'ቪስታ ታዋቂ የዲጂታል መፍትሄዎች ድርጅት ነው። በባለሙያ ብራንዲንግ፣ በድረ-ገጽ ልማት፣ በደህንነት ካሜራዎች እና በቴክኒክ አካዳሚ ስልጠናዎች ላይ እንሰራለን።',
    exploreAcademy: 'ስልጠናዎችን ይመልከቱ',
    creativePublishing: 'የፈጠራ ህትመት',
    statsGrads: 'የአካዳሚው ምሩቃን',
    statsEnterprises: 'የታወቁ ድርጅቶች',
    statsSatisfaction: 'የተማሪዎች እርካታ',
    statsInnovation: 'የፈጠራ ዓመታት',
    introOverview: 'አጠቃላይ እይታ',
    introTitle: 'ስለ ቪስታ መግቢያ',
    introDesc1: 'አዲስ አበባ፣ ኢትዮጵያ ውስጥ የተመሰረተው ቪስታ (Vision of Innovative Systems and Technologies for Advancement) ድርጅቶችን፣ የመንግስት ተቋማትን እና ግለሰቦችን ለማብቃት የተቋቋመ የቴክኖሎጂ ስራ ፈጣሪ ነው።',
    introDesc2: 'በፈጠራ ዲዛይን እና በቴክኒክ ምህንድስና መካከል ያለውን ልዩነት እናጠባለን። ለትላልቅ ህትመቶች የሚሆኑ ዘመናዊ ማሽኖች እና የፕሮግራሚንግ ቤተ ሙከራዎች አሉን።',
    readStory: 'ታሪካችንን ያንብቡ',
    fourPillars: 'አራቱ የቪስታ ምሰሶዎች',
    featuredServices: 'ተለይተው የቀረቡ አገልግሎቶች',
    pillarPubTitle: 'የህትመት አገልግሎት',
    pillarPubDesc: 'ለትላልቅ ሰንደቆች ህትመት፣ የሰራተኞች ባጅ፣ ማህተሞች እና ሙሉ የብራንዲንግ ዲዛይኖች።',
    pillarWebTitle: 'የድረ-ገጽ ልማት',
    pillarWebDesc: 'የትምህርት ቤት ፖርታሎች፣ የNGO ድረ-ገጾች፣ የማስተዋወቂያ ገጾች እና የደህንነት SSL ጭነቶች።',
    pillarMarketTitle: 'ቪስታ ገበያ',
    pillarMarketDesc: 'ኮምፒውተሮች፣ የልማት ላፕቶፖች፣ የCCTV ደህንነት ካሜራዎች እና የኔትወርክ ራውተሮች።',
    pillarLearnTitle: 'ቪስታ ስልጠና',
    pillarLearnDesc: 'የተረጋገጡ የስልጠና ፕሮግራሞች ጨምሮ የኮምፒውተር መሠረታዊ፣ ፎቶሾፕ፣ React እና የሳይበር ደህንነት።',
    details: 'ዝርዝሮች',
    visionTitle: 'ራዕይ',
    visionDesc: 'በባለሙያ የህትመት አገልግሎት እና በድረ-ገጽ ምህንድስና መካከል ያለውን ትስስር በማጠናከር በምስራቅ አፍሪካ ታዋቂ የቴክኖሎጂ ማዕከል መሆን።',
    missionTitle: 'ተልዕኮ',
    missionDesc: 'ከፍተኛ ጥራት ያላቸው የህትመት ውጤቶች፣ የተሻሻሉ የድረ-ገጽ መድረኮች እና ኦሪጅናል ኤሌክትروኒክስ ማቅረብ፣ እንዲሁም በቴክኒክ የስልጠና ማዕከላችን ብቁ ባለሙያዎችን ማፍራት።',
    readyToAdvance: 'የቴክኖሎጂ ክህሎትዎን ለማሳደግ ዝግጁ ነዎት?',
    readyToAdvanceDesc: 'ከአካዳሚው አስተዳዳሪ ጋር ይገናኙ ወይም የህትመት ዲዛይን ምክክር ይያዙ። ለአነስተኛ ድርጅቶች፣ ለNGOዎች እና ለተማሪዎች የተዘጋጁ ልዩ ፓኬጆች አሉን።',
    inquireWithTeam: 'ቡድናችንን ያነጋግሩ',
    registerForClass: 'ለስልጠና ይመዝገቡ',
    newsHub: 'የቪስታ ዜና መጽሔት',
    latestAnnouncements: 'የቅርብ ጊዜ ማስታወቂያዎች',
    latestAnnouncementsDesc: 'በቅርብ ጊዜ በዳይሬክተሮቻችን የተለቀቁ የቴክኒክ ጽሑፎችን እና ትምህርታዊ ማስታወቂያዎችን ያንብቡ።',
    readAnnouncement: 'ማስታወቂያውን ያንብቡ',
    directSupport: 'ቀጥታ ድጋف',
    contactInfo: 'የአድራሻ መረጃ',
    contactDesc: 'ማዕከላዊ የደንበኞች ድጋፍ እና ዋና መስሪያ ቤታችን አዲስ አበባ، ኢትዮጵያ ውስጥ ይገኛል። ቢሮአችን ይጎብኙ ወይም በቀጥታ መልእክት ይላኩልን።',
    joinTelegram: 'የቪስታ ቴሌግራም ቻናል ይቀላቀሉ',
    companyLocation: 'የኩባንያው ቦታ',
    headquartersAddress: 'የዋናው ቢሮ አድራሻ',
    hotlineSupport: 'የድጋፍ ስልክ ቁጥር',
    technicalEmail: 'የቴክኒክ ኢሜይል',

    // About Section
    aboutHeaderTitle: 'ስለ ድርጅታችን',
    aboutHeaderDesc: 'ራዕያችንን ፣ የታሪክ አመጣጣችንን ፣ እሴቶቻችንን እና ከቪስታ ስኬት ጀርባ ያሉትን መሪዎች እዚህ ይወቁ።',
    aboutStoryTitle: 'ታሪካችን እና ዳራችን',
    aboutStoryDesc1: 'በ2024 መጀመሪያ ላይ የተመሰረተው ቪስታ በምስራቅ አፍሪካ የቴክኖሎጂ ፍላጎትን ለማርካት የተቋቋመ የፈጠራ ማዕከል ነው። ቀደም ሲል ድርጅቶች ለህትመት ፣ ለሶፍትዌር ልማት እና ለስልጠና የተለያየ ቦታ በመሄድ ይቸገሩ ነበር።',
    aboutStoryDesc2: 'ቪስታ ሁሉንም ዲጂታል አገልግሎቶች በአንድ ጣራ ስር በማምጣት ለዚህ ችግር እውነተኛ መፍትሄ ሆኗል። የድረ-ገጽ ልማትን ፣ የዲጂታል ህትመትን ፣ የኮምፒውተር ገበያን እና የአይቲ አካዳሚን በአንድ ላይ በማስተሳሰር ጥራት ያለው አገልግሎት እናቀርባለን።',
    aboutStoryDesc3: 'በአዲስ አበባ በ5 ሰዎች የጀመረው ስራችን አሁን ላይ በርካታ ታዋቂ ትምህርት ቤቶችን ፣ መንግስታዊ ያልሆኑ ድርጅቶችን (NGOs) እና አዳዲስ ድርጅቶችን በኢትዮጵያና በምስራቅ አፍሪካ ለማገልገል በቅቷል።',
    aboutValuesTitle: 'የምንመራባቸው ዋና እሴቶች',
    aboutValue1Title: 'ታማኝነት ቀዳሚ ነው',
    aboutValue1Desc: 'የገባነውን ቃል እንጠብቃለን፣ በፋይናንስ ፣ በኦሪጅናል ምርቶች አቅርቦት እና በተማሪዎች የምስክር ወረቀት ላይ ከፍተኛ የስነ-ምግባር ደረጃን እንከተላለን።',
    aboutValue2Title: 'ተግባራዊ ፈጠራ',
    aboutValue2Desc: 'ቴክኖሎጂ ጠቃሚ የሚሆነው እውነተኛ የሰዎችን ህይወትና የስራ ችግሮች መፍታት ሲችል ብቻ ነው። እውነተኛ የፕሮግራሚንግ ክህሎት ማስተማር ላይ እናተኩራለን።',
    aboutValue3Title: 'ሁሉን አቀፍ ስልጠና',
    aboutValue3Desc: 'ዲጂታል እውቀት ለሁሉም ሰው ይገባል። ለአነስተኛ ተማሪዎች ፣ ለሙያ ቀያሪዎች እና ለትናንሽ ንግዶች በተመጣጣኝ ዋጋ መንገዶችን እንፈጥራለን።',
    aboutValue4Title: 'የጥራት አፈጻጸም',
    aboutValue4Desc: 'ከቀላል በራሪ ወረቀት ህትመት እስከ ውስብስብ የድረ-ገጽ ልማት እና ዳታቤዝ ግንባታ ድረስ ለእያንዳንዱ ስራ ጥቃቅን ዝርዝሮች ከፍተኛ ጥንቃቄ እናደርጋለን።',
    aboutTeamTitle: 'የዳይሬክተሮች ቦርድ ቡድን',
    aboutTeamDesc: 'ቪስታ የሚመራው በዘመናዊ የህትመት ዲዛይን፣ በኔትወርክ ምህንድስና እና በሶፍትዌር ልማት በበለጸጉ የተለያየ የክህሎት ባለቤቶች ነው።',

    // General Interface Labels
    addToCart: 'ወደ ጋሪ ጨምር',
    removeFromCart: 'አስወግድ',
    quantity: 'ብዛት',
    total: 'ጠቅላላ',
    clearCart: 'ጋሪውን አጽዳ',
    checkout: 'ክፍያ ፈጽም',
    cartIsEmpty: 'የገዙት ዕቃ ጋሪ ባዶ ነው።',
    searchPlaceholder: 'ዕቃዎችን ይፈልጉ...',
    filterAll: 'ሁሉንም ዕቃዎች',
    registerNow: 'አሁን ይመዝገቡ'
  }
};
