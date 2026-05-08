const fs = require('fs');

const reviews = [
  {
    id: 1, name: '김지윤', role: 'Wellness coach', country: 'Korea', flag: '🇰🇷',
    quote: '아침 비타민 D를 빵 먹기 전에 먹으면 흡수가 안 된다는 걸 처음 알려준 앱이에요. 한 달 만에 컨디션이 달라졌어요.',
  },
  {
    id: 2, name: 'Mehmet Yıldız', role: 'Yazılım mühendisi', country: 'Turkey', flag: '🇹🇷',
    quote: 'B12 ve C vitaminini birlikte alıyordum, SuppTime "ikisini 2 saat ayır" dedi. Yorgunluğum 10 günde gitti. Watch hatırlatması harika.',
  },
  {
    id: 3, name: 'Lukas Brandt', role: 'Triathlet', country: 'Germany', flag: '🇩🇪',
    quote: 'Endlich eine App, die D3 mit K2 koppelt und Magnesium am Abend timt. Schlaf-Score seit 4 Wochen konstant grün.',
  },
  {
    id: 4, name: '佐藤 美咲', role: '管理栄養士', country: 'Japan', flag: '🇯🇵',
    quote: '鉄分とカルシウムの相互作用まで知らせてくれる。患者さんに勧めるアプリ第一候補になりました。',
  },
  {
    id: 5, name: 'Camila Ribeiro', role: 'Nutricionista', country: 'Brazil', flag: '🇧🇷',
    quote: 'Indiquei para 30+ pacientes. A aderência à suplementação subiu de 50% para 90% em duas semanas. Sério.',
  },
  {
    id: 6, name: 'Sofía Navarro', role: 'Médico de familia', country: 'Spain', flag: '🇪🇸',
    quote: 'La detección de conflictos entre suplementos es lo mejor. Mis pacientes mayores por fin entienden cuándo tomar cada cosa.',
  },
  {
    id: 7, name: 'Andi Pratama', role: 'Personal trainer', country: 'Indonesia', flag: '🇮🇩',
    quote: 'Creatine pagi, magnesium malam, semua diatur otomatis. Recovery saya naik drastis. Watch reminder = game changer.',
  },
  {
    id: 8, name: 'Чен Дэвид', role: 'Биохакер', country: 'Russia', flag: '🇷🇺',
    quote: 'Перепробовал 6 приложений. SuppTime — единственное, где синергии и конфликты работают по-настоящему. Подписка стоит каждой копейки.',
  },
  {
    id: 9, name: 'Anna Kowalska', role: 'Pielęgniarka', country: 'Poland', flag: '🇵🇱',
    quote: 'Polecam pacjentom z niedoborem żelaza. Aplikacja sama mówi "kawa za 2h" — nikt z nas o tym nie pamięta.',
  },
];

const data = {
  en: {
    langName: 'English', dir: 'ltr',
    nav: { features: 'Features', watch: 'Apple Watch', reviews: 'Reviews', download: 'Download' },
    hero: {
      trial_badge: '1 week free — no card required',
      headline_1: 'Your wellness,',
      headline_2: 'timed to perfection.',
      sub: "You spend a fortune on supplements. Don't let them go to waste by mixing the wrong ones or forgetting a dose. Maximize your absorption with science-backed timing and smart interaction alerts.",
      meta1: 'Science-based timing',
      meta2: 'On-device privacy',
    },
    cta: { try_free: 'Start 1-week free trial', appstore_top: 'Download on the', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'Why SuppTime',
      title: 'Right pill.\nRight time.',
      sub: 'Most supplements only work when you time them right. SuppTime tells you exactly when — and reminds you to follow through.',
      list: [
        { title: 'Smart Interaction Alerts', desc: 'Stop flushing your vitamins down the drain. SuppTime warns you instantly if supplements compete (like iron and calcium) or block absorption.' },
        { title: 'Expert Stacks & Timing', desc: 'Explore 40+ supplements with expert timing recommendations. Use preset stacks for immunity, focus, or sleep—designed for maximum bio-availability.' },
        { title: 'Medication & Rx Support', desc: 'Never confuse your medical treatment with your daily nutrition. Track prescription medications alongside your vitamin stack with dedicated Rx badges.' },
        { title: 'Wrist Control & 100% Private', desc: 'Log your doses without opening your phone. No accounts, no servers, no tracking—your health data stays completely private on your iCloud.' }
      ]
    },
    screens: {
      title: 'Built around the moment you take it.',
      sub: 'Four screens. Four ways SuppTime keeps your stack working its hardest.',
      captions: ['Conflict-aware timing', 'Daily potency dashboard', 'Build your perfect stack', 'Visual progress history'],
    },
    watch: {
      title: 'SuppTime on your wrist.',
      sub: 'The perfect companion for your health routine. Get gentle taps on your wrist and log doses in a second.',
      bullets: ['Standalone Watch App', 'Syncs with iPhone', 'One-tap logging'],
    },
    reviews: {
      eyebrow: 'Loved worldwide',
      title: 'Trusted by people<br />who actually take their vitamins.',
      sub: 'Real reviews from real users across 60+ countries.',
    },
    download_cta: {
      title: 'Subscribe safely with Apple.',
      sub: 'Full access to every feature. Secure payments via App Store.',
      bullets: ['Lifetime or Subscription', 'Apple Watch + iPhone', 'Secure payment'],
      requires: 'Requires iOS 17 · watchOS 10 · iPhone 12 or later',
    },
    footer: { tag: 'Your wellness, timed to perfection.', links: ['Privacy', 'Terms', 'Support', 'Press'] },
  },
  tr: {
    langName: 'Türkçe', dir: 'ltr',
    nav: { features: 'Özellikler', watch: 'Apple Watch', reviews: 'Yorumlar', download: 'İndir' },
    hero: {
      trial_badge: '1 hafta ücretsiz — kart gerekmez',
      headline_1: 'Sağlığın,',
      headline_2: 'tam zamanında.',
      sub: 'Takviyelere yüzlerce dolar harcıyorsunuz. Onları yanlış zamanda veya yanlış kombinasyonlarla alarak çöpe atmayın. Bilimsel zamanlama ve çakışma uyarılarıyla sağlığınıza yaptığınız yatırımı en üst düzeye çıkarın.',
      meta1: 'Bilime dayalı zamanlama',
      meta2: 'Cihazda gizlilik',
    },
    cta: { try_free: '1 hafta ücretsiz dene', appstore_top: 'İndir', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'Neden SuppTime',
      title: 'Doğru hap.\nDoğru zaman.',
      sub: 'Çoğu takviye yalnızca doğru zamanda alındığında işe yarar. SuppTime sana tam olarak ne zaman olduğunu söyler ve hatırlatır.',
      list: [
        { title: 'Akıllı Çakışma Uyarıları', desc: 'Vitaminlerinizi boşa harcamayın. Demir ve kalsiyum gibi birbirinin emilimini engelleyen takviyeleri aynı anda alırsanız anında uyarı alırsınız.' },
        { title: 'Bilimsel Zamanlama ve Kürler', desc: "40'tan fazla takviye için uzman zamanlama önerileri. Bağışıklık, odaklanma veya uyku için maksimum emilim sağlayacak hazır kürleri kullanın." },
        { title: 'Reçeteli İlaç (Rx) Desteği', desc: 'Tıbbi tedavilerinizle günlük vitaminlerinizi birbirine karıştırmayın. Özel Rx rozetleriyle ilaçlarınızı ve takviyelerinizi güvenle takip edin.' },
        { title: 'Bilekten Kontrol ve %100 Gizlilik', desc: 'Telefonunuzu açmadan saatinizden dozlarınızı işaretleyin. Sunucu yok, takip yok. Tüm sağlık verileriniz yalnızca iCloud\'unuzda gizli kalır.' }
      ]
    },
    screens: {
      title: 'Aldığınız ana göre tasarlandı.',
      sub: 'Dört ekran. SuppTime\'ın kürünüzü en verimli halde tutmasının dört yolu.',
      captions: ['Çakışmaya duyarlı zamanlama', 'Günlük etkinlik panosu', 'Kendi kürünüzü oluşturun', 'Görsel ilerleme geçmişi'],
    },
    watch: {
      title: 'Bileğinizdeki SuppTime.',
      sub: 'Sağlık rutininiz için mükemmel bir yardımcı. Bileğinize hafif dokunuşlar alın ve dozları bir saniyede kaydedin.',
      bullets: ['Bağımsız Saat Uygulaması', 'iPhone ile Senkronize', 'Tek dokunuşla kayıt'],
    },
    reviews: {
      eyebrow: 'Dünya çapında seviliyor',
      title: 'Vitaminlerini gerçekten alanlar<br />tarafından güveniliyor.',
      sub: '60\'tan fazla ülkeden gerçek kullanıcı yorumları.',
    },
    download_cta: {
      title: 'Apple ile güvenle abone olun.',
      sub: 'Tüm özelliklere tam erişim. App Store üzerinden güvenli ödeme.',
      bullets: ['Ömür Boyu veya Abonelik', 'Apple Watch + iPhone', 'Güvenli ödeme'],
      requires: 'iOS 17 · watchOS 10 · iPhone 12 veya sonrası gerekir',
    },
    footer: { tag: 'Sağlığın, tam zamanında.', links: ['Gizlilik', 'Şartlar', 'Destek', 'Basın'] },
  },
  ko: {
    langName: '한국어', dir: 'ltr',
    nav: { features: '기능', watch: 'Apple Watch', reviews: '후기', download: '다운로드' },
    hero: {
      trial_badge: '1주일 무료 — 카드 등록 불필요',
      headline_1: '당신의 웰니스,',
      headline_2: '완벽한 타이밍에.',
      sub: '영양제에 많은 돈을 쓰고 계십니다. 잘못 섞어 먹거나 시간을 놓쳐서 낭비하지 마세요. 과학 기반의 타이밍과 상호작용 경고로 흡수율을 극대화하세요.',
      meta1: '과학 기반 타이밍',
      meta2: '온디바이스 프라이버시',
    },
    cta: { try_free: '1주일 무료로 시작', appstore_top: 'Download on the', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'SuppTime를 선택하는 이유',
      title: '올바른 영양제,\n올바른 시간에.',
      sub: '대부분의 영양제는 타이밍이 맞아야 효과가 있습니다. SuppTime이 정확한 시점을 알려드리고, 잊지 않도록 도와드립니다.',
      list: [
        { title: '스마트 상호작용 경고', desc: '비타민을 낭비하지 마세요. 철분과 칼슘처럼 흡수를 방해하는 영양제를 함께 복용하면 즉시 경고해 줍니다.' },
        { title: '전문가 추천 타이밍', desc: '40가지 이상의 영양제에 대한 전문가의 타이밍 권장 사항. 면역, 집중력, 수면을 위한 맞춤형 루틴을 사용해 보세요.' },
        { title: '처방약(Rx) 지원', desc: '치료용 약물과 매일 먹는 영양제를 혼동하지 마세요. 전용 Rx 배지로 처방약과 비타민을 함께 안전하게 관리하세요.' },
        { title: 'Apple Watch & 100% 프라이버시', desc: '휴대폰을 열지 않고도 손목에서 기록하세요. 서버나 추적이 없으며 모든 건강 데이터는 iCloud에 안전하게 보관됩니다.' }
      ]
    },
    screens: {
      title: '복용하는 순간을 위해 설계되었습니다.',
      sub: '네 개의 화면. SuppTime이 영양제 루틴을 최상으로 유지하는 네 가지 방법.',
      captions: ['충돌 방지 타이밍', '일일 효능 대시보드', '나만의 루틴 구축', '시각적 히스토리'],
    },
    watch: {
      title: '손목 위의 SuppTime.',
      sub: '당신의 건강 루틴을 위한 완벽한 동반자. 손목에 부드러운 탭을 받고 1초 만에 복용을 기록하세요.',
      bullets: ['독립형 워치 앱', 'iPhone과 동기화', '원탭 로깅'],
    },
    reviews: {
      eyebrow: '전 세계의 사랑을 받는',
      title: '영양제를 챙겨 먹는 사람들이<br />신뢰하는 앱.',
      sub: '60개국 이상의 실제 사용자 후기.',
    },
    download_cta: {
      title: 'Apple로 안전하게 구독하세요.',
      sub: '모든 기능 무제한 이용. App Store를 통한 안전한 결제.',
      bullets: ['평생 소장 또는 구독', 'Apple Watch + iPhone', '안전한 결제'],
      requires: 'iOS 17 · watchOS 10 · iPhone 12 이상 필요',
    },
    footer: { tag: '당신의 웰니스, 완벽한 타이밍에.', links: ['개인정보 처리방침', '이용약관', '지원', '프레스'] },
  },
  ja: {
    langName: '日本語', dir: 'ltr',
    nav: { features: '機能', watch: 'Apple Watch', reviews: 'レビュー', download: 'ダウンロード' },
    hero: {
      trial_badge: '1週間無料 — クレジットカード不要',
      headline_1: 'あなたのウェルネスを、',
      headline_2: '完璧なタイミングで。',
      sub: 'サプリメントへの投資を無駄にしないでください。間違った組み合わせや飲み忘れを防ぎ、科学的なタイミングと相互作用アラートで吸収を最大化しましょう。',
      meta1: '科学に基づくタイミング',
      meta2: '端末内プライバシー',
    },
    cta: { try_free: '1週間無料で試す', appstore_top: 'Download on the', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'SuppTimeの理由',
      title: '正しいサプリ、\n正しい 시간에。',
      sub: '多くのサプリはタイミングが合って初めて効果を発揮します。SuppTimeがその正確な瞬間をお知らせします。',
      list: [
        { title: 'スマート相互作用アラート', desc: 'ビタミンを無駄にしないでください。鉄分とカルシウムなど、吸収を妨げ合うサプリメントを同時に摂取すると警告します。' },
        { title: '科学的なタイミング', desc: '40種類以上のサプリメントに対する専門家のタイミング推奨。免疫力、集中力、睡眠のための最適なルーティンを活用しましょう。' },
        { title: '処方薬（Rx）サポート', desc: '治療用の薬と日常のサプリメントを混同しないでください。専用のRxバッジで処方薬とビタミンを安全に管理できます。' },
        { title: 'Apple Watch & 100%のプライバシー', desc: 'iPhoneを開かずに手首から記録。サーバーも追跡もなく、健康データはiCloud上で完全にプライベートに保たれます。' }
      ]
    },
    screens: {
      title: '服用する瞬間のために設計。',
      sub: '4つの画面。SuppTimeがあなたのサプリ生活を最大限に高める4つの方法。',
      captions: ['飲み合わせ考慮のタイミング', '毎日の効能ダッシュボード', '理想のスタックを構築', '視覚的な履歴'],
    },
    watch: {
      title: '手首の上のSuppTime。',
      sub: '健康ルーティンの完璧なパートナー。手首への優しいタップで、1秒で記録完了。',
      bullets: ['単体動作のウォッチアプリ', 'iPhoneと同期', 'ワンタップ記録'],
    },
    reviews: {
      eyebrow: '世界中で愛用',
      title: 'サプリを本気で飲む人に<br />信頼されています。',
      sub: '60カ国以上のリアルなユーザーの声。',
    },
    download_cta: {
      title: 'Appleで安全にサブスク登録。',
      sub: 'すべての機能にフルアクセス。App Store経由の安全な決済。',
      bullets: ['買い切りまたはサブスク', 'Apple Watch + iPhone', '安全な決済'],
      requires: 'iOS 17 · watchOS 10 · iPhone 12以降が必要',
    },
    footer: { tag: 'あなたのウェルネスを、完璧なタイミングで。', links: ['プライバシー', '規約', 'サポート', 'プレス'] },
  },
  'zh-cn': {
    langName: '简体中文', dir: 'ltr',
    nav: { features: '功能', watch: 'Apple Watch', reviews: '评价', download: '下载' },
    hero: {
      trial_badge: '免费试用 1 周 — 无需信用卡',
      headline_1: '您的健康',
      headline_2: '精准守时。',
      sub: '您在补剂上花费了大量金钱。不要因为错误的搭配或忘记服用而浪费它们。通过科学的时间安排和相互作用警告，最大化您的健康投资。',
      meta1: '基于科学的时间管理',
      meta2: '设备端隐私保护',
    },
    cta: { try_free: '免费试用 1 周', appstore_top: '下载于', appstore_bottom: 'App Store' },
    features: {
      eyebrow: '为什么选择 SuppTime',
      title: '正确的补剂，\n正确的时间。',
      sub: '大多数补剂只有在合适的时间服用才会起效。SuppTime 告诉您准确的时机，并提醒您完成。',
      list: [
        { title: '智能相互作用警告', desc: '不要浪费您的维生素。如果您同时服用相互竞争的补剂（如铁和钙），SuppTime 会立即警告您。' },
        { title: '专家推荐时间', desc: '探索 40 多种补剂的专家时间建议。使用针对免疫、专注或睡眠的预设组合，实现最大吸收。' },
        { title: '处方药 (Rx) 支持', desc: '切勿将您的医疗方案与日常营养混淆。使用专用的 Rx 徽章安全地管理处方药和维生素。' },
        { title: 'Apple Watch & 100% 隐私', desc: '无需打开手机即可在手腕上记录。没有服务器，没有追踪，您的健康数据完全保存在 iCloud 中。' }
      ]
    },
    screens: {
      title: '为您服用的那一刻而生。',
      sub: '四个屏幕。SuppTime 让您的补剂方案发挥最大作用的四种方式。',
      captions: ['识别冲突的时间安排', '每日效能仪表板', '构建完美方案', '可视化进度历史'],
    },
    watch: {
      title: '腕上的 SuppTime。',
      sub: '您健康常规的完美伴侣。腕部轻触提醒，一秒记录服用情况。',
      bullets: ['独立手表应用', '与 iPhone 同步', '一键记录'],
    },
    reviews: {
      eyebrow: '全球喜爱',
      title: '深受认真对待补剂的人士<br />信赖。',
      sub: '来自 60 多个国家的真实用户评价。',
    },
    download_cta: {
      title: '使用 Apple 安全订阅。',
      sub: '获取全部功能。通过 App Store 安全支付。',
      bullets: ['终身或订阅', 'Apple Watch + iPhone', '安全支付'],
      requires: '需要 iOS 17 · watchOS 10 · iPhone 12 或更高版本',
    },
    footer: { tag: '您的健康，精准守时。', links: ['隐私', '条款', '支持', '媒体'] },
  },
  'zh-tw': {
    langName: '繁體中文', dir: 'ltr',
    nav: { features: '功能', watch: 'Apple Watch', reviews: '評價', download: '下載' },
    hero: {
      trial_badge: '免費試用 1 週 — 無需信用卡',
      headline_1: '您的健康',
      headline_2: '精準守時。',
      sub: '您在補劑上花費了大量金錢。不要因為錯誤的搭配或忘記服用而浪費它們。透過科學的時間安排和相互作用警告，最大化您的健康投資。',
      meta1: '基於科學的時間管理',
      meta2: '裝置端隱私保護',
    },
    cta: { try_free: '免費試用 1 週', appstore_top: '下載於', appstore_bottom: 'App Store' },
    features: {
      eyebrow: '為什麼選擇 SuppTime',
      title: '正確的補劑，\n正確的時間。',
      sub: '大多數補劑只有在合適的時間服用才會起效。SuppTime 告訴您準確的时机，並提醒您完成。',
      list: [
        { title: '智能相互作用警告', desc: '不要浪費您的維生素。如果您同時服用相互競爭的補劑（如鐵和鈣），SuppTime 會立即警告您。' },
        { title: '專家推薦時間', desc: '探索 40 多種補劑的專家時間建議。使用針對免疫、專注或睡眠的預設組合，實現最大吸收。' },
        { title: '處方藥 (Rx) 支援', desc: '切勿將您的醫療方案與日常營養混淆。使用專用的 Rx 徽章安全地管理處方藥和維生素。' },
        { title: 'Apple Watch & 100% 隱私', desc: '無需打開手機即可在手腕上記錄。沒有伺服器，沒有追蹤，您的健康數據完全保存在 iCloud 中。' }
      ]
    },
    screens: {
      title: '為您服用的那一刻而生。',
      sub: '四個螢幕。SuppTime 讓您的補劑方案發揮最大作用的四種方式。',
      captions: ['識別衝突的時間安排', '每日效能儀表板', '構建完美方案', '視覺化進度歷史'],
    },
    watch: {
      title: '腕上的 SuppTime。',
      sub: '您健康常規的完美伴侶。腕部輕觸提醒，一秒記錄服用情況。',
      bullets: ['獨立手錶應用', '與 iPhone 同步', '一鍵記錄'],
    },
    reviews: {
      eyebrow: '全球喜愛',
      title: '深受認真對待補劑的人士<br />信賴。',
      sub: '來自 60 多個國家的真實用戶評價。',
    },
    download_cta: {
      title: '使用 Apple 安全訂閱。',
      sub: '獲取全部功能。透過 App Store 安全支付。',
      bullets: ['終身或訂閱', 'Apple Watch + iPhone', '安全支付'],
      requires: '需要 iOS 17 · watchOS 10 · iPhone 12 或更高版本',
    },
    footer: { tag: '您的健康，精準守時。', links: ['隱私', '條款', '支持', '媒體'] },
  },
  de: {
    langName: 'Deutsch', dir: 'ltr',
    nav: { features: 'Features', watch: 'Apple Watch', reviews: 'Bewertungen', download: 'Laden' },
    hero: {
      trial_badge: '1 Woche gratis — ohne Kreditkarte',
      headline_1: 'Deine Wellness,',
      headline_2: 'perfekt getimt.',
      sub: 'Du gibst ein Vermögen für Nahrungsergänzungsmittel aus. Verschwende sie nicht durch falsches Mischen oder Vergessen. Maximiere die Aufnahme mit wissenschaftlichem Timing.',
      meta1: 'Wissenschaftliches Timing',
      meta2: 'Datenschutz auf dem Gerät',
    },
    cta: { try_free: 'Gratiswoche starten', appstore_top: 'Laden im', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'Warum SuppTime',
      title: 'Richtige Pille.\nRichtige Zeit.',
      sub: 'Die meisten Präparate wirken nur bei richtigem Timing. SuppTime sagt dir genau wann – und erinnert dich daran.',
      list: [
        { title: 'Intelligente Warnungen', desc: 'Verschwende deine Vitamine nicht. SuppTime warnt dich sofort, wenn sich Präparate gegenseitig blockieren.' },
        { title: 'Wissenschaftliches Timing', desc: 'Expertenempfehlungen für 40+ Präparate. Nutze vorgefertigte Routinen für Immunität, Fokus oder Schlaf.' },
        { title: 'Medikamente & Rx Support', desc: 'Verwechsle nie deine medizinische Behandlung mit täglichen Vitaminen. Verwalte Medikamente sicher mit Rx-Abzeichen.' },
        { title: 'Apple Watch & 100% Privat', desc: 'Protokolliere Dosen direkt vom Handgelenk. Keine Server, kein Tracking – deine Gesundheitsdaten bleiben privat in deiner iCloud.' }
      ]
    },
    screens: {
      title: 'Für den Moment der Einnahme.',
      sub: 'Vier Screens. Vier Wege, wie SuppTime dein Stack optimiert.',
      captions: ['Interaktions-Timing', 'Tägliches Dashboard', 'Stack konfigurieren', 'Visueller Verlauf'],
    },
    watch: {
      title: 'SuppTime am Handgelenk.',
      sub: 'Der perfekte Begleiter. Sanfte Taps erinnern dich, Logging in einer Sekunde.',
      bullets: ['Eigenständige Watch App', 'Sync mit iPhone', 'One-Tap Logging'],
    },
    reviews: {
      eyebrow: 'Weltweit beliebt',
      title: 'Vertraut von Menschen,<br />die ihre Vitamine wirklich nehmen.',
      sub: 'Echte Bewertungen aus über 60 Ländern.',
    },
    download_cta: {
      title: 'Sicher abonnieren mit Apple.',
      sub: 'Voller Zugriff. Sichere Zahlung via App Store.',
      bullets: ['Lifetime oder Abo', 'Apple Watch + iPhone', 'Sichere Zahlung'],
      requires: 'Erfordert iOS 17 · watchOS 10 · iPhone 12 oder neuer',
    },
    footer: { tag: 'Wellness, perfekt getimt.', links: ['Datenschutz', 'AGB', 'Support', 'Presse'] },
  },
  es: {
    langName: 'Español', dir: 'ltr',
    nav: { features: 'Funciones', watch: 'Apple Watch', reviews: 'Reseñas', download: 'Descargar' },
    hero: {
      trial_badge: '1 semana gratis — sin tarjeta',
      headline_1: 'Tu bienestar,',
      headline_2: 'en el momento justo.',
      sub: 'Gastas una fortuna en suplementos. No los desperdicies por tomarlos a la hora equivocada o mezclarlos mal. Maximiza tu inversión con horarios respaldados por la ciencia.',
      meta1: 'Timing científico',
      meta2: 'Privacidad total',
    },
    cta: { try_free: 'Empezar semana gratis', appstore_top: 'Descargar en', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'Por qué SuppTime',
      title: 'Pastilla correcta.\nHora correcta.',
      sub: 'Muchos suplementos solo funcionan con el timing adecuado. SuppTime te dice cuándo y te lo recuerda.',
      list: [
        { title: 'Alertas de Interacción', desc: 'No desperdicies tus vitaminas. SuppTime te advierte al instante si los suplementos compiten o bloquean la absorción.' },
        { title: 'Horarios Científicos', desc: 'Recomendaciones de expertos para más de 40 suplementos. Usa rutinas preestablecidas para una máxima absorción.' },
        { title: 'Soporte de Medicamentos (Rx)', desc: 'Nunca confundas tu tratamiento médico con tu nutrición. Rastrea medicamentos recetados junto con tus vitaminas.' },
        { title: 'Apple Watch y 100% Privado', desc: 'Registra dosis desde tu muñeca sin abrir el teléfono. Sin servidores, sin rastreo: tus datos permanecen privados.' }
      ]
    },
    screens: {
      title: 'Diseñado para el momento.',
      sub: 'Cuatro pantallas. Cuatro formas de potenciar tu stack.',
      captions: ['Timing de conflictos', 'Panel de potencia diaria', 'Crea tu stack perfecto', 'Historial visual'],
    },
    watch: {
      title: 'SuppTime en tu muñeca.',
      sub: 'El compañero ideal. Toques suaves para recordar, registro en un segundo.',
      bullets: ['App independiente', 'Sincroniza con iPhone', 'Registro rápido'],
    },
    reviews: {
      eyebrow: 'Amado en todo el mundo',
      title: 'Confiado por quienes<br />realmente toman sus vitaminas.',
      sub: 'Reseñas reales de usuarios en 60+ países.',
    },
    download_cta: {
      title: 'Suscríbete seguro con Apple.',
      sub: 'Acceso total. Pago seguro vía App Store.',
      bullets: ['Vida o Suscripción', 'Apple Watch + iPhone', 'Pago seguro'],
      requires: 'Requiere iOS 17 · watchOS 10 · iPhone 12 o posterior',
    },
    footer: { tag: 'Tu bienestar, en el momento justo.', links: ['Privacidad', 'Términos', 'Soporte', 'Prensa'] },
  },
  'pt-br': {
    langName: 'Português', dir: 'ltr',
    nav: { features: 'Recursos', watch: 'Apple Watch', reviews: 'Avaliações', download: 'Baixar' },
    hero: {
      trial_badge: '1 semana grátis — sem cartão',
      headline_1: 'Seu bem-estar,',
      headline_2: 'na hora certa.',
      sub: 'Você gasta uma fortuna em suplementos. Não os desperdice tomando na hora errada ou misturando errado. Maximize a absorção com horários científicos.',
      meta1: 'Timing científico',
      meta2: 'Privacidade total',
    },
    cta: { try_free: 'Começar semana grátis', appstore_top: 'Baixar na', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'Por que SuppTime',
      title: 'Pílula certa.\nHora certa.',
      sub: 'Muitos suplementos só funcionam com o timing correto. O SuppTime diz quando e te lembra.',
      list: [
        { title: 'Alertas de Interação', desc: 'Não jogue suas vitaminas fora. O SuppTime avisa instantaneamente se os suplementos competem ou bloqueiam a absorção.' },
        { title: 'Horários Científicos', desc: 'Recomendações de especialistas para mais de 40 suplementos. Use rotinas predefinidas visando máxima absorção.' },
        { title: 'Suporte a Medicamentos (Rx)', desc: 'Nunca confunda seu tratamento médico com sua nutrição diária. Acompanhe medicamentos prescritos com suas vitaminas.' },
        { title: 'Apple Watch e 100% Privado', desc: 'Registre doses do seu pulso sem abrir o telefone. Sem servidores, sem rastreamento - seus dados permanecem privados.' }
      ]
    },
    screens: {
      title: 'Feito para o momento.',
      sub: 'Quatro telas. Quatro formas de otimizar seu stack.',
      captions: ['Timing de conflitos', 'Painel de potência', 'Monte seu stack', 'Histórico visual'],
    },
    watch: {
      title: 'SuppTime no seu pulso.',
      sub: 'O parceiro ideal. Toques suaves para lembrar, registro instantâneo.',
      bullets: ['App independente', 'Sincroniza com iPhone', 'Registro rápido'],
    },
    reviews: {
      eyebrow: 'Amado mundialmente',
      title: 'Confiado por quem<br />realmente toma vitaminas.',
      sub: 'Avaliações reais em 60+ países.',
    },
    download_cta: {
      title: 'Assine com segurança com a Apple.',
      sub: 'Acesso total. Pagamento seguro via App Store.',
      bullets: ['Vitalício ou Assinatura', 'Apple Watch + iPhone', 'Pagamento seguro'],
      requires: 'Requer iOS 17 · watchOS 10 · iPhone 12 ou posterior',
    },
    footer: { tag: 'Seu bem-estar, na hora certa.', links: ['Privacidade', 'Termos', 'Suporte', 'Imprensa'] },
  },
  it: {
    langName: 'Italiano', dir: 'ltr',
    nav: { features: 'Funzioni', watch: 'Apple Watch', reviews: 'Recensioni', download: 'Scarica' },
    hero: {
      trial_badge: '1 settimana gratis — no carta',
      headline_1: 'Il tuo benessere,',
      headline_2: 'al momento giusto.',
      sub: 'Spendi una fortuna in integratori. Non sprecarli assumendoli nel momento sbagliato o mescolandoli male. Massimizza l\'assorbimento con tempistiche scientifiche.',
      meta1: 'Timing scientifico',
      meta2: 'Privacy totale',
    },
    cta: { try_free: 'Inizia settimana gratis', appstore_top: 'Scarica su', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'Perché SuppTime',
      title: 'Pillola giusta.\nOra giusta.',
      sub: 'Molti integratori funzionano solo col timing corretto. SuppTime ti dice quando e ti avvisa.',
      list: [
        { title: 'Avvisi di Interazione', desc: 'Non sprecare le tue vitamine. SuppTime ti avvisa se gli integratori competono o bloccano l\'assorbimento.' },
        { title: 'Tempistiche Scientifiche', desc: 'Raccomandazioni degli esperti per oltre 40 integratori. Usa routine preimpostate per il massimo assorbimento.' },
        { title: 'Supporto Farmaci (Rx)', desc: 'Non confondere mai le tue cure mediche con la nutrizione. Tieni traccia dei farmaci prescritti insieme alle vitamine.' },
        { title: 'Apple Watch e 100% Privato', desc: 'Registra le dosi dal polso senza aprire il telefono. Nessun server, nessun tracciamento: i tuoi dati rimangono privati.' }
      ]
    },
    screens: {
      title: 'Pensato per il momento.',
      sub: 'Quattro schermate. Quattro modi per potenziare il tuo stack.',
      captions: ['Timing conflitti', 'Dashboard potenza', 'Crea il tuo stack', 'Cronologia visiva'],
    },
    watch: {
      title: 'SuppTime al polso.',
      sub: 'Il compagno ideale. Feedback aptico per ricordare, log in un secondo.',
      bullets: ['App indipendente', 'Sincronizza con iPhone', 'Log veloce'],
    },
    reviews: {
      eyebrow: 'Amato nel mondo',
      title: 'Scelto da chi<br />prende davvero le vitamine.',
      sub: 'Recensioni reali in 60+ paesi.',
    },
    download_cta: {
      title: 'Abbonati sicuro con Apple.',
      sub: 'Accesso completo. Pagamento sicuro via App Store.',
      bullets: ['Vitalizio o Abbonamento', 'Apple Watch + iPhone', 'Pagamento sicuro'],
      requires: 'Richiede iOS 17 · watchOS 10 · iPhone 12 o successivo',
    },
    footer: { tag: 'Benessere al momento giusto.', links: ['Privacy', 'Termini', 'Supporto', 'Stampa'] },
  },
  nl: {
    langName: 'Nederlands', dir: 'ltr',
    nav: { features: 'Functies', watch: 'Apple Watch', reviews: 'Reviews', download: 'Downloaden' },
    hero: {
      trial_badge: '1 week gratis — geen kaart',
      headline_1: 'Jouw wellness,',
      headline_2: 'perfect getimed.',
      sub: 'Je geeft een vermogen uit aan supplementen. Verspil ze niet door ze verkeerd te mengen of te vergeten. Maximaliseer de opname met wetenschappelijk onderbouwde timing.',
      meta1: 'Wetenschappelijke timing',
      meta2: 'Privacy op apparaat',
    },
    cta: { try_free: 'Start gratis week', appstore_top: 'Download in', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'Waarom SuppTime',
      title: 'Juiste pil.\nJuiste tijd.',
      sub: 'De meeste supplementen werken alleen bij de juiste timing. SuppTime vertelt je wanneer en herinnert je.',
      list: [
        { title: 'Slimme Waarschuwingen', desc: 'Gooi je vitamines niet weg. SuppTime waarschuwt je direct als supplementen met elkaar concurreren.' },
        { title: 'Wetenschappelijke Timing', desc: 'Expert aanbevelingen voor 40+ supplementen. Gebruik kant-en-klare routines voor maximale opname.' },
        { title: 'Medicatie & Rx Support', desc: 'Verwar medische behandelingen nooit met dagelijkse vitamines. Houd receptplichtige medicijnen veilig bij.' },
        { title: 'Apple Watch & 100% Privé', desc: 'Registreer doses vanaf je pols zonder je telefoon te openen. Geen servers of tracking; je gezondheidsgegevens blijven privé.' }
      ]
    },
    screens: {
      title: 'Gemaakt voor het moment.',
      sub: 'Vier schermen. Vier manieren om je stack te optimaliseren.',
      captions: ['Timing conflicten', 'Dashboard potentie', 'Bouw je stack', 'Visuele geschiedenis'],
    },
    watch: {
      title: 'SuppTime om je pols.',
      sub: 'De ideale hulp. Zachte trillingen herinneren je, loggen in een seconde.',
      bullets: ['Standalone Watch App', 'Sync met iPhone', 'Snel loggen'],
    },
    reviews: {
      eyebrow: 'Wereldwijd geliefd',
      title: 'Vertrouwd door wie<br />echt hun vitamines neemt.',
      sub: 'Echte reviews uit 60+ landen.',
    },
    download_cta: {
      title: 'Veilig abonneren via Apple.',
      sub: 'Volledige toegang. Veilige betaling via App Store.',
      bullets: ['Lifetime of Abo', 'Apple Watch + iPhone', 'Veilige betaling'],
      requires: 'Vereist iOS 17 · watchOS 10 · iPhone 12 of nieuwer',
    },
    footer: { tag: 'Wellness, perfect getimed.', links: ['Privacy', 'Voorwaarden', 'Support', 'Pers'] },
  },
  pl: {
    langName: 'Polski', dir: 'ltr',
    nav: { features: 'Funkcje', watch: 'Apple Watch', reviews: 'Opinie', download: 'Pobierz' },
    hero: {
      trial_badge: '1 tydzień gratis — bez karty',
      headline_1: 'Twoje zdrowie,',
      headline_2: 'w punkt.',
      sub: 'Wydajesz fortunę na suplementy. Nie marnuj ich przez złe łączenie lub pomijanie dawek. Zmaksymalizuj wchłanianie dzięki naukowemu harmonogramowi.',
      meta1: 'Naukowe dawkowanie',
      meta2: 'Prywatność danych',
    },
    cta: { try_free: 'Zacznij darmowy tydzień', appstore_top: 'Pobierz w', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'Dlaczego SuppTime',
      title: 'Odpowiednia pigułka.\nOdpowiedni czas.',
      sub: 'Suplementy działają tylko przy dobrym timingu. SuppTime mówi Ci kiedy i przypomina o tym.',
      list: [
        { title: 'Ostrzeżenia o Interakcjach', desc: 'Nie marnuj witamin. SuppTime natychmiast ostrzega, gdy suplementy ze sobą konkurują lub blokują wchłanianie.' },
        { title: 'Naukowe Dawkowanie', desc: 'Zalecenia ekspertów dla 40+ suplementów. Używaj gotowych planów dla maksymalnego wchłaniania.' },
        { title: 'Wsparcie Leków na Receptę (Rx)', desc: 'Nigdy nie myl leczenia z codzienną suplementacją. Śledź leki na receptę razem z witaminami.' },
        { title: 'Apple Watch i 100% Prywatności', desc: 'Zaznaczaj dawki z nadgarstka bez otwierania telefonu. Żadnych serwerów i śledzenia – Twoje dane zostają w iCloud.' }
      ]
    },
    screens: {
      title: 'Z myślą o momencie zażycia.',
      sub: 'Cztery ekrany. Cztery sposoby na optymalizację Twojego stacku.',
      captions: ['Timing interakcji', 'Dashboard potencji', 'Zbuduj swój stack', 'Historia wizualna'],
    },
    watch: {
      title: 'SuppTime na nadgarstku.',
      sub: 'Idealny kompan. Delikatne powiadomienia, zapis w sekundę.',
      bullets: ['Samodzielna aplikacja', 'Sync z iPhone', 'Szybki zapis'],
    },
    reviews: {
      eyebrow: 'Kochany na świecie',
      title: 'Zaufany przez tych,<br />którzy dbają o witaminy.',
      sub: 'Prawdziwe opinie z 60+ krajów.',
    },
    download_cta: {
      title: 'Subskrybuj bezpiecznie z Apple.',
      sub: 'Pełny dostęp. Bezpieczna płatność przez App Store.',
      bullets: ['Na zawsze lub Subskrypcja', 'Apple Watch + iPhone', 'Bezpieczna płatność'],
      requires: 'Wymaga iOS 17 · watchOS 10 · iPhone 12 lub nowszy',
    },
    footer: { tag: 'Twoje zdrowie, w punkt.', links: ['Prywatność', 'Regulamin', 'Pomoc', 'Prasa'] },
  },
  ru: {
    langName: 'Русский', dir: 'ltr',
    nav: { features: 'Функции', watch: 'Apple Watch', reviews: 'Отзывы', download: 'Скачать' },
    hero: {
      trial_badge: '1 неделя бесплатно — без карты',
      headline_1: 'Ваше здоровье,',
      headline_2: 'вовремя.',
      sub: 'Вы тратите состояние на добавки. Не тратьте их впустую из-за неправильного сочетания. Максимизируйте усвоение с помощью научных графиков приема.',
      meta1: 'Научный подход',
      meta2: 'Конфиденциальность',
    },
    cta: { try_free: 'Начать неделю бесплатно', appstore_top: 'Скачать в', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'Почему SuppTime',
      title: 'Та самая таблетка.\nВ то самое время.',
      sub: 'Добавки эффективны только при правильном приеме. SuppTime скажет когда и напомнит.',
      list: [
        { title: 'Уведомления о Взаимодействии', desc: 'Не тратьте витамины впустую. SuppTime мгновенно предупредит, если добавки мешают друг другу.' },
        { title: 'Научное Расписание', desc: 'Рекомендации экспертов для 40+ добавок. Используйте готовые схемы для максимального усвоения.' },
        { title: 'Поддержка Лекарств (Rx)', desc: 'Не путайте лечение с ежедневным питанием. Отслеживайте рецептурные препараты вместе с витаминами.' },
        { title: 'Apple Watch и 100% Приватность', desc: 'Отмечайте прием с запястья, не открывая телефон. Никаких серверов и слежки — ваши данные надежно хранятся в iCloud.' }
      ]
    },
    screens: {
      title: 'Для каждого приема.',
      sub: 'Четыре экрана. Четыре способа сделать ваш стек эффективнее.',
      captions: ['Тайминг конфликтов', 'Дашборд потенции', 'Создай свой стек', 'История прогресса'],
    },
    watch: {
      title: 'SuppTime на запястье.',
      sub: 'Идеальный компаньон. Мягкие уведомления, запись за секунду.',
      bullets: ['Автономное приложение', 'Синхронизация с iPhone', 'Запись в одно касание'],
    },
    reviews: {
      eyebrow: 'Любим во всем мире',
      title: 'Нам доверяют те,<br />кто правда пьет витамины.',
      sub: 'Реальные отзывы из 60+ стран.',
    },
    download_cta: {
      title: 'Безопасная подписка через Apple.',
      sub: 'Полный доступ. Безопасная оплата через App Store.',
      bullets: ['Навсегда или Подписка', 'Apple Watch + iPhone', 'Безопасная оплата'],
      requires: 'Нужен iOS 17 · watchOS 10 · iPhone 12 или новее',
    },
    footer: { tag: 'Ваше здоровье, вовремя.', links: ['Приватность', 'Условия', 'Поддержка', 'Пресса'] },
  },
  id: {
    langName: 'Bahasa Indonesia', dir: 'ltr',
    nav: { features: 'Fitur', watch: 'Apple Watch', reviews: 'Ulasan', download: 'Unduh' },
    hero: {
      trial_badge: '1 minggu gratis — tanpa kartu',
      headline_1: 'Wellness Anda,',
      headline_2: 'tepat waktu.',
      sub: 'Anda menghabiskan banyak uang untuk suplemen. Jangan sia-siakan karena salah campur atau lupa. Maksimalkan penyerapan dengan jadwal berbasis sains.',
      meta1: 'Jadwal berbasis sains',
      meta2: 'Privasi perangkat',
    },
    cta: { try_free: 'Mulai minggu gratis', appstore_top: 'Unduh di', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'Mengapa SuppTime',
      title: 'Pil yang tepat.\nWaktu yang tepat.',
      sub: 'Banyak suplemen baru bekerja jika waktunya pas. SuppTime memberitahu kapan tepatnya — dan mengingatkanmu.',
      list: [
        { title: 'Peringatan Interaksi', desc: 'Jangan buang vitamin Anda. SuppTime langsung memperingatkan jika suplemen saling bersaing.' },
        { title: 'Jadwal Ilmiah', desc: 'Rekomendasi ahli untuk 40+ suplemen. Gunakan rutinitas prasetel agar penyerapan maksimal.' },
        { title: 'Dukungan Obat (Rx)', desc: 'Jangan tertukar antara perawatan medis dan nutrisi. Lacak obat resep bersama vitamin Anda.' },
        { title: 'Apple Watch & 100% Privat', desc: 'Catat dosis dari pergelangan tangan tanpa membuka ponsel. Tanpa pelacakan—data kesehatan Anda tetap privat.' }
      ]
    },
    screens: {
      title: 'Dibuat untuk momen konsumsi.',
      sub: 'Empat layar. Empat cara SuppTime mengoptimalkan stack Anda.',
      captions: ['Timing konflik', 'Dashboard potensi', 'Bangun stack Anda', 'Riwayat visual'],
    },
    watch: {
      title: 'SuppTime di pergelangan tangan.',
      sub: 'Teman ideal. Ketukan lembut mengingatkan Anda, log dalam sedetik.',
      bullets: ['App Watch mandiri', 'Sinkron dengan iPhone', 'Log satu ketukan'],
    },
    reviews: {
      eyebrow: 'Dicintai di seluruh dunia',
      title: 'Dipercaya oleh orang<br />yang benar-benar minum vitamin.',
      sub: 'Ulasan nyata dari 60+ negara.',
    },
    download_cta: {
      title: 'Berlangganan aman dengan Apple.',
      sub: 'Akses penuh. Pembayaran aman via App Store.',
      bullets: ['Lifetime atau Langganan', 'Apple Watch + iPhone', 'Pembayaran aman'],
      requires: 'Perlu iOS 17 · watchOS 10 · iPhone 12 atau baru',
    },
    footer: { tag: 'Wellness Anda, tepat waktu.', links: ['Privasi', 'Ketentuan', 'Dukungan', 'Pers'] },
  },
  vi: {
    langName: 'Tiếng Việt', dir: 'ltr',
    nav: { features: 'Tính năng', watch: 'Apple Watch', reviews: 'Đánh giá', download: 'Tải về' },
    hero: {
      trial_badge: '1 tuần miễn phí — không cần thẻ',
      headline_1: 'Sức khỏe của bạn,',
      headline_2: 'đúng thời điểm.',
      sub: 'Bạn chi rất nhiều tiền cho thực phẩm bổ sung. Đừng lãng phí bằng cách trộn sai hoặc quên uống. Tối đa hóa sự hấp thụ bằng lịch trình khoa học.',
      meta1: 'Thời điểm khoa học',
      meta2: 'Riêng tư tuyệt đối',
    },
    cta: { try_free: 'Bắt đầu tuần miễn phí', appstore_top: 'Tải trên', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'Vì sao chọn SuppTime',
      title: 'Đúng viên.\nĐúng giờ.',
      sub: 'Thực phẩm bổ sung chỉ hiệu quả khi đúng thời điểm. SuppTime cho bạn biết chính xác khi nào.',
      list: [
        { title: 'Cảnh báo Tương tác', desc: 'Đừng lãng phí vitamin của bạn. SuppTime cảnh báo ngay lập tức nếu các chất bổ sung cạnh tranh.' },
        { title: 'Lịch trình Khoa học', desc: 'Khuyến nghị của chuyên gia cho hơn 40 loại thực phẩm bổ sung. Sử dụng các thói quen có sẵn.' },
        { title: 'Hỗ trợ Thuốc theo Toa (Rx)', desc: 'Không bao giờ nhầm lẫn điều trị y tế với dinh dưỡng hàng ngày. Theo dõi thuốc theo toa cùng với vitamin.' },
        { title: 'Apple Watch & Riêng tư', desc: 'Ghi lại liều lượng từ cổ tay. Không máy chủ, không theo dõi—dữ liệu sức khỏe của bạn được giữ riêng tư.' }
      ]
    },
    screens: {
      title: 'Dành cho khoảnh khắc uống.',
      sub: 'Bốn màn hình. Bốn cách tối ưu hóa stack của bạn.',
      captions: ['Timing xung đột', 'Bảng hiệu năng', 'Xây dựng stack', 'Lịch sử hình ảnh'],
    },
    watch: {
      title: 'SuppTime trên cổ tay.',
      sub: 'Người bạn đồng hành. Rung nhẹ nhắc nhở, ghi chép trong 1 giây.',
      bullets: ['Ứng dụng Watch độc lập', 'Đồng bộ iPhone', 'Ghi chép một chạm'],
    },
    reviews: {
      eyebrow: 'Được tin dùng toàn cầu',
      title: 'Được tin tưởng bởi những người<br />thực sự quan tâm sức khỏe.',
      sub: 'Đánh giá thực từ 60+ quốc gia.',
    },
    download_cta: {
      title: 'Đăng ký an toàn với Apple.',
      sub: 'Toàn quyền truy cập. Thanh toán qua App Store.',
      bullets: ['Vĩnh viễn hoặc Thuê bao', 'Apple Watch + iPhone', 'Thanh toán an toàn'],
      requires: 'Yêu cầu iOS 17 · watchOS 10 · iPhone 12 trở lên',
    },
    footer: { tag: 'Sức khỏe đúng thời điểm.', links: ['Riêng tư', 'Điều khoản', 'Hỗ trợ', 'Báo chí'] },
  },
  th: {
    langName: 'ไทย', dir: 'ltr',
    nav: { features: 'ฟีเจอร์', watch: 'Apple Watch', reviews: 'รีวิว', download: 'ดาวน์โหลด' },
    hero: {
      trial_badge: 'ฟรี 1 สัปดาห์ — ไม่ต้องใช้บัตร',
      headline_1: 'สุขภาพของคุณ',
      headline_2: 'ตรงเวลาเป๊ะ.',
      sub: 'คุณจ่ายเงินจำนวนมากไปกับอาหารเสริม อย่าให้มันสูญเปล่าจากการทานผิดเวลา หรือจับคู่ผิด เพิ่มการดูดซึมสูงสุดด้วยตารางเวลาทางวิทยาศาสตร์',
      meta1: 'เวลาตามวิทยาศาสตร์',
      meta2: 'ความเป็นส่วนตัวสูง',
    },
    cta: { try_free: 'เริ่มทดลองฟรี', appstore_top: 'ดาวน์โหลดบน', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'ทำไมต้อง SuppTime',
      title: 'ยาที่ใช่.\nเวลาที่ใช่.',
      sub: 'อาหารเสริมออกฤทธิ์เมื่อทานถูกเวลา SuppTime บอกคุณว่าเมื่อไหร่.',
      list: [
        { title: 'แจ้งเตือนการทานคู่กัน', desc: 'อย่าทิ้งวิตามินของคุณไปเปล่าๆ SuppTime แจ้งเตือนทันทีหากอาหารเสริมขัดขวางการดูดซึม' },
        { title: 'ตารางเวลาทางวิทยาศาสตร์', desc: 'คำแนะนำจากผู้เชี่ยวชาญสำหรับอาหารเสริมกว่า 40 ชนิด ใช้สูตรสำเร็จเพื่อการดูดซึมสูงสุด' },
        { title: 'การจัดการยาตามใบสั่ง (Rx)', desc: 'อย่าสับสนระหว่างการรักษาทางการแพทย์กับโภชนาการ ติดตามยาที่ต้องสั่งโดยแพทย์ควบคู่ไปกับวิตามินของคุณ' },
        { title: 'Apple Watch & เป็นส่วนตัว 100%', desc: 'บันทึกการทานยาจากข้อมือโดยไม่ต้องเปิดโทรศัพท์ ไม่มีการติดตาม ข้อมูลสุขภาพของคุณเป็นส่วนตัวใน iCloud' }
      ]
    },
    screens: {
      title: 'เพื่อช่วงเวลาที่คุณทาน.',
      sub: 'สี่หน้าจอ. สี่วิธีเพิ่มประสิทธิภาพให้ stack ของคุณ.',
      captions: ['ตารางเวลาเลี่ยงยาตีกัน', 'แดชบอร์ดความคุ้มค่า', 'สร้าง stack ของคุณ', 'ประวัติแบบรูปภาพ'],
    },
    watch: {
      title: 'SuppTime บนข้อมือ.',
      sub: 'คู่หูที่สมบูรณ์แบบ. สั่นเตือนเบาๆ บันทึกได้ในวินาทีเดียว.',
      bullets: ['แอป Watch แยกอิสระ', 'ซิงค์กับ iPhone', 'บันทึกในแตะเดียว'],
    },
    reviews: {
      eyebrow: 'รักโดยคนทั่วโลก',
      title: 'ได้รับความไว้วางใจจาก<br />คนที่ทานวิตามินตัวจริง.',
      sub: 'รีวิวจากผู้ใช้จริงใน 60+ ประเทศ.',
    },
    download_cta: {
      title: 'สมัครสมาชิกปลอดภัยด้วย Apple.',
      sub: 'เข้าถึงทุกฟีเจอร์. ชำระเงินผ่าน App Store.',
      bullets: ['ตลอดชีพหรือสมาชิก', 'Apple Watch + iPhone', 'ชำระเงินปลอดภัย'],
      requires: 'ต้องการ iOS 17 · watchOS 10 · iPhone 12 ขึ้นไป',
    },
    footer: { tag: 'สุขภาพดี ตรงเวลาเป๊ะ.', links: ['ส่วนตัว', 'เงื่อนไข', 'ช่วยเหลือ', 'ข่าว'] },
  },
  ar: {
    langName: 'العربية', dir: 'rtl',
    nav: { features: 'الميزات', watch: 'Apple Watch', reviews: 'التقييمات', download: 'تنزيل' },
    hero: {
      trial_badge: 'أسبوع مجاني — بدون بطاقة',
      headline_1: 'عافيتك،',
      headline_2: 'بتوقيت مثالي.',
      sub: 'أنت تنفق ثروة على المكملات. لا تهدرها بخلط الخاطئ أو نسيان الجرعة. عزز الامتصاص بجدول زمني مبني على أسس علمية وتنبيهات التفاعلات.',
      meta1: 'توقيت علمي',
      meta2: 'خصوصية تامة',
    },
    cta: { try_free: 'ابدأ أسبوعك المجاني', appstore_top: 'حمّل من', appstore_bottom: 'App Store' },
    features: {
      eyebrow: 'لماذا SuppTime',
      title: 'الحبّة الصحيحة.\nفي الوقت الصحيح.',
      sub: 'تعمل المكملات فقط بالتوقيت الصحيح. SuppTime يخبرك متى بالضبط.',
      list: [
        { title: 'تنبيهات التفاعلات', desc: 'لا تهدر فيتاميناتك. يحذرك SuppTime فوراً إذا تعارضت المكملات أو منعت الامتصاص.' },
        { title: 'جداول مبنية على أسس علمية', desc: 'توصيات الخبراء لأكثر من 40 مكمل. استخدم جداول جاهزة لتحقيق أقصى درجات الامتصاص.' },
        { title: 'دعم الأدوية الوصفية (Rx)', desc: 'لا تخلط بين علاجك الطبي وتغذيتك اليومية. تتبع الأدوية الموصوفة جنباً إلى جنب مع فيتاميناتك.' },
        { title: 'Apple Watch وخصوصية %100', desc: 'سجل جرعاتك من معصمك دون فتح هاتفك. لا خوادم ولا تتبع - بياناتك الصحية تظل خاصة تماماً.' }
      ]
    },
    screens: {
      title: 'مصمم للحظة التناول.',
      sub: 'أربع شاشات. أربع طرق لتحسين روتينك.',
      captions: ['توقيت التعارضات', 'لوحة الأداء اليومي', 'ابنِ روتينك المثالي', 'تاريخ مرئي'],
    },
    watch: {
      title: 'SuppTime على معصمك.',
      sub: 'الرفيق المثالي. تنبيهات هادئة وتسجيل خلال ثانية.',
      bullets: ['تطبيق مستقل للساعة', 'مزامنة مع iPhone', 'تسجيل بنقرة واحدة'],
    },
    reviews: {
      eyebrow: 'محبوب عالمياً',
      title: 'موثوق من قبل الأشخاص<br />الذين يتناولون فيتاميناتهم بجدية.',
      sub: 'تقييمات حقيقية من 60+ دولة.',
    },
    download_cta: {
      title: 'اشترك بأمان مع Apple.',
      sub: 'وصول كامل لكل الميزات. دفع آمن عبر App Store.',
      bullets: ['مدى الحياة أو اشتراك', 'Apple Watch + iPhone', 'دفع آمن'],
      requires: 'يتطلب iOS 17 · watchOS 10 · iPhone 12 أو أحدث',
    },
    footer: { tag: 'عافيتك بتوقيت مثالي.', links: ['الخصوصية', 'الشروط', 'الدعم', 'الصحافة'] },
  }
};

const output = `/* SuppTime — i18n (17 languages) + Reviews */
window.I18N = ${JSON.stringify(data, null, 2)};

window.REVIEWS = ${JSON.stringify(reviews, null, 2)};
`;

fs.writeFileSync('i18n.js', output, 'utf8');
console.log('i18n.js restored and updated with marketing weapons.');
