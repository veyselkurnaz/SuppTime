const fs = require('fs');
let code = fs.readFileSync('i18n.js', 'utf8');

const t = {
  en: {
    sub: "You spend a fortune on supplements. Don't let them go to waste by mixing the wrong ones or forgetting a dose. Maximize your absorption with science-backed timing and smart interaction alerts.",
    f1_t: "Smart Interaction Alerts", f1_d: "Stop flushing your vitamins down the drain. SuppTime warns you instantly if supplements compete (like iron and calcium) or block absorption.",
    f2_t: "Expert Stacks & Timing", f2_d: "Explore 40+ supplements with expert timing recommendations. Use preset stacks for immunity, focus, or sleep—designed for maximum bio-availability.",
    f3_t: "Medication & Rx Support", f3_d: "Never confuse your medical treatment with your daily nutrition. Track prescription medications alongside your vitamin stack with dedicated Rx badges.",
    f4_t: "Wrist Control & 100% Private", f4_d: "Log your doses without opening your phone. No accounts, no servers, no tracking—your health data stays completely private on your iCloud."
  },
  tr: {
    sub: "Takviyelere yüzlerce dolar harcıyorsunuz. Onları yanlış zamanda veya yanlış kombinasyonlarla alarak çöpe atmayın. Bilimsel zamanlama ve çakışma uyarılarıyla sağlığınıza yaptığınız yatırımı en üst düzeye çıkarın.",
    f1_t: "Akıllı Çakışma Uyarıları", f1_d: "Vitaminlerinizi boşa harcamayın. Demir ve kalsiyum gibi birbirinin emilimini engelleyen takviyeleri aynı anda alırsanız anında uyarı alırsınız.",
    f2_t: "Bilimsel Zamanlama ve Kürler", f2_d: "40'tan fazla takviye için uzman zamanlama önerileri. Bağışıklık, odaklanma veya uyku için maksimum emilim sağlayacak hazır kürleri kullanın.",
    f3_t: "Reçeteli İlaç (Rx) Desteği", f3_d: "Tıbbi tedavilerinizle günlük vitaminlerinizi birbirine karıştırmayın. Özel Rx rozetleriyle ilaçlarınızı ve takviyelerinizi güvenle takip edin.",
    f4_t: "Bilekten Kontrol ve %100 Gizlilik", f4_d: "Telefonunuzu açmadan saatinizden dozlarınızı işaretleyin. Sunucu yok, takip yok. Tüm sağlık verileriniz yalnızca iCloud'unuzda gizli kalır."
  },
  ko: {
    sub: "영양제에 많은 돈을 쓰고 계십니다. 잘못 섞어 먹거나 시간을 놓쳐서 낭비하지 마세요. 과학 기반의 타이밍과 상호작용 경고로 흡수율을 극대화하세요.",
    f1_t: "스마트 상호작용 경고", f1_d: "비타민을 낭비하지 마세요. 철분과 칼슘처럼 흡수를 방해하는 영양제를 함께 복용하면 즉시 경고해 줍니다.",
    f2_t: "전문가 추천 타이밍", f2_d: "40가지 이상의 영양제에 대한 전문가의 타이밍 권장 사항. 면역, 집중력, 수면을 위한 맞춤형 루틴을 사용해 보세요.",
    f3_t: "처방약(Rx) 지원", f3_d: "치료용 약물과 매일 먹는 영양제를 혼동하지 마세요. 전용 Rx 배지로 처방약과 비타민을 함께 안전하게 관리하세요.",
    f4_t: "Apple Watch & 100% 프라이버시", f4_d: "휴대폰을 열지 않고도 손목에서 기록하세요. 서버나 추적이 없으며 모든 건강 데이터는 iCloud에 안전하게 보관됩니다."
  },
  ja: {
    sub: "サプリメントへの投資を無駄にしないでください。間違った組み合わせや飲み忘れを防ぎ、科学的なタイミングと相互作用アラートで吸収を最大化しましょう。",
    f1_t: "スマート相互作用アラート", f1_d: "ビタミンを無駄にしないでください。鉄分とカルシウムなど、吸収を妨げ合うサプリメントを同時に摂取すると警告します。",
    f2_t: "科学的なタイミング", f2_d: "40種類以上のサプリメントに対する専門家のタイミング推奨。免疫力、集中力、睡眠のための最適なルーティンを活用しましょう。",
    f3_t: "処方薬（Rx）サポート", f3_d: "治療用の薬と日常のサプリメントを混同しないでください。専用のRxバッジで処方薬とビタミンを安全に管理できます。",
    f4_t: "Apple Watch & 100%のプライバシー", f4_d: "iPhoneを開かずに手首から記録。サーバーも追跡もなく、健康データはiCloud上で完全にプライベートに保たれます。"
  },
  'zh-cn': {
    sub: "您在补剂上花费了大量金钱。不要因为错误的搭配或忘记服用而浪费它们。通过科学的时间安排和相互作用警告，最大化您的健康投资。",
    f1_t: "智能相互作用警告", f1_d: "不要浪费您的维生素。如果您同时服用相互竞争的补剂（如铁和钙），SuppTime 会立即警告您。",
    f2_t: "专家推荐时间", f2_d: "探索 40 多种补剂的专家时间建议。使用针对免疫、专注或睡眠的预设组合，实现最大吸收。",
    f3_t: "处方药 (Rx) 支持", f3_d: "切勿将您的医疗方案与日常营养混淆。使用专用的 Rx 徽章安全地管理处方药和维生素。",
    f4_t: "Apple Watch & 100% 隐私", f4_d: "无需打开手机即可在手腕上记录。没有服务器，没有追踪，您的健康数据完全保存在 iCloud 中。"
  },
  'zh-tw': {
    sub: "您在補劑上花費了大量金錢。不要因為錯誤的搭配或忘記服用而浪費它們。透過科學的時間安排和相互作用警告，最大化您的健康投資。",
    f1_t: "智能相互作用警告", f1_d: "不要浪費您的維生素。如果您同時服用相互競爭的補劑（如鐵和鈣），SuppTime 會立即警告您。",
    f2_t: "專家推薦時間", f2_d: "探索 40 多種補劑的專家時間建議。使用針對免疫、專注或睡眠的預設組合，實現最大吸收。",
    f3_t: "處方藥 (Rx) 支援", f3_d: "切勿將您的醫療方案與日常營養混淆。使用專用的 Rx 徽章安全地管理處方藥和維生素。",
    f4_t: "Apple Watch & 100% 隱私", f4_d: "無需打開手機即可在手腕上記錄。沒有伺服器，沒有追蹤，您的健康數據完全保存在 iCloud 中。"
  },
  de: {
    sub: "Du gibst ein Vermögen für Nahrungsergänzungsmittel aus. Verschwende sie nicht durch falsches Mischen oder Vergessen. Maximiere die Aufnahme mit wissenschaftlichem Timing.",
    f1_t: "Intelligente Warnungen", f1_d: "Verschwende deine Vitamine nicht. SuppTime warnt dich sofort, wenn sich Präparate gegenseitig blockieren.",
    f2_t: "Wissenschaftliches Timing", f2_d: "Expertenempfehlungen für 40+ Präparate. Nutze vorgefertigte Routinen für Immunität, Fokus oder Schlaf.",
    f3_t: "Medikamente & Rx Support", f3_d: "Verwechsle nie deine medizinische Behandlung mit täglichen Vitaminen. Verwalte Medikamente sicher mit Rx-Abzeichen.",
    f4_t: "Apple Watch & 100% Privat", f4_d: "Protokolliere Dosen direkt vom Handgelenk. Keine Server, kein Tracking – deine Gesundheitsdaten bleiben privat in deiner iCloud."
  },
  es: {
    sub: "Gastas una fortuna en suplementos. No los desperdicies por tomarlos a la hora equivocada o mezclarlos mal. Maximiza tu inversión con horarios respaldados por la ciencia.",
    f1_t: "Alertas de Interacción", f1_d: "No desperdicies tus vitaminas. SuppTime te advierte al instante si los suplementos compiten o bloquean la absorción.",
    f2_t: "Horarios Científicos", f2_d: "Recomendaciones de expertos para más de 40 suplementos. Usa rutinas preestablecidas para una máxima absorción.",
    f3_t: "Soporte de Medicamentos (Rx)", f3_d: "Nunca confundas tu tratamiento médico con tu nutrición. Rastrea medicamentos recetados junto con tus vitaminas.",
    f4_t: "Apple Watch y 100% Privado", f4_d: "Registra dosis desde tu muñeca sin abrir el teléfono. Sin servidores, sin rastreo: tus datos permanecen privados."
  },
  'pt-br': {
    sub: "Você gasta uma fortuna em suplementos. Não os desperdice tomando na hora errada ou misturando errado. Maximize a absorção com horários científicos.",
    f1_t: "Alertas de Interação", f1_d: "Não jogue suas vitaminas fora. O SuppTime avisa instantaneamente se os suplementos competem ou bloqueiam a absorção.",
    f2_t: "Horários Científicos", f2_d: "Recomendações de especialistas para mais de 40 suplementos. Use rotinas predefinidas visando máxima absorção.",
    f3_t: "Suporte a Medicamentos (Rx)", f3_d: "Nunca confunda seu tratamento médico com sua nutrição diária. Acompanhe medicamentos prescritos com suas vitaminas.",
    f4_t: "Apple Watch e 100% Privado", f4_d: "Registre doses do seu pulso sem abrir o telefone. Sem servidores, sem rastreamento - seus dados permanecem privados."
  },
  it: {
    sub: "Spendi una fortuna in integratori. Non sprecarli assumendoli nel momento sbagliato o mescolandoli male. Massimizza l'assorbimento con tempistiche scientifiche.",
    f1_t: "Avvisi di Interazione", f1_d: "Non sprecare le tue vitamine. SuppTime ti avvisa se gli integratori competono o bloccano l'assorbimento.",
    f2_t: "Tempistiche Scientifiche", f2_d: "Raccomandazioni degli esperti per oltre 40 integratori. Usa routine preimpostate per il massimo assorbimento.",
    f3_t: "Supporto Farmaci (Rx)", f3_d: "Non confondere mai le tue cure mediche con la nutrizione. Tieni traccia dei farmaci prescritti insieme alle vitamine.",
    f4_t: "Apple Watch e 100% Privato", f4_d: "Registra le dosi dal polso senza aprire il telefono. Nessun server, nessun tracciamento: i tuoi dati rimangono privati."
  },
  nl: {
    sub: "Je geeft een vermogen uit aan supplementen. Verspil ze niet door ze verkeerd te mengen of te vergeten. Maximaliseer de opname met wetenschappelijk onderbouwde timing.",
    f1_t: "Slimme Waarschuwingen", f1_d: "Gooi je vitamines niet weg. SuppTime waarschuwt je direct als supplementen met elkaar concurreren.",
    f2_t: "Wetenschappelijke Timing", f2_d: "Expert aanbevelingen voor 40+ supplementen. Gebruik kant-en-klare routines voor maximale opname.",
    f3_t: "Medicatie & Rx Support", f3_d: "Verwar medische behandelingen nooit met dagelijkse vitamines. Houd receptplichtige medicijnen veilig bij.",
    f4_t: "Apple Watch & 100% Privé", f4_d: "Registreer doses vanaf je pols zonder je telefoon te openen. Geen servers of tracking; je gezondheidsgegevens blijven privé."
  },
  pl: {
    sub: "Wydajesz fortunę na suplementy. Nie marnuj ich przez złe łączenie lub pomijanie dawek. Zmaksymalizuj wchłanianie dzięki naukowemu harmonogramowi.",
    f1_t: "Ostrzeżenia o Interakcjach", f1_d: "Nie marnuj witamin. SuppTime natychmiast ostrzega, gdy suplementy ze sobą konkurują lub blokują wchłanianie.",
    f2_t: "Naukowe Dawkowanie", f2_d: "Zalecenia ekspertów dla 40+ suplementów. Używaj gotowych planów dla maksymalnego wchłaniania.",
    f3_t: "Wsparcie Leków na Receptę (Rx)", f3_d: "Nigdy nie myl leczenia z codzienną suplementacją. Śledź leki na receptę razem z witaminami.",
    f4_t: "Apple Watch i 100% Prywatności", f4_d: "Zaznaczaj dawki z nadgarstka bez otwierania telefonu. Żadnych serwerów i śledzenia – Twoje dane zostają w iCloud."
  },
  ru: {
    sub: "Вы тратите состояние на добавки. Не тратьте их впустую из-за неправильного сочетания. Максимизируйте усвоение с помощью научных графиков приема.",
    f1_t: "Уведомления о Взаимодействии", f1_d: "Не тратьте витамины впустую. SuppTime мгновенно предупредит, если добавки мешают друг другу.",
    f2_t: "Научное Расписание", f2_d: "Рекомендации экспертов для 40+ добавок. Используйте готовые схемы для максимального усвоения.",
    f3_t: "Поддержка Лекарств (Rx)", f3_d: "Не путайте лечение с ежедневным питанием. Отслеживайте рецептурные препараты вместе с витаминами.",
    f4_t: "Apple Watch и 100% Приватность", f4_d: "Отмечайте прием с запястья, не открывая телефон. Никаких серверов и слежки — ваши данные надежно хранятся в iCloud."
  },
  id: {
    sub: "Anda menghabiskan banyak uang untuk suplemen. Jangan sia-siakan karena salah campur atau lupa. Maksimalkan penyerapan dengan jadwal berbasis sains.",
    f1_t: "Peringatan Interaksi", f1_d: "Jangan buang vitamin Anda. SuppTime langsung memperingatkan jika suplemen saling bersaing.",
    f2_t: "Jadwal Ilmiah", f2_d: "Rekomendasi ahli untuk 40+ suplemen. Gunakan rutinitas prasetel agar penyerapan maksimal.",
    f3_t: "Dukungan Obat (Rx)", f3_d: "Jangan tertukar antara perawatan medis dan nutrisi. Lacak obat resep bersama vitamin Anda.",
    f4_t: "Apple Watch & 100% Privat", f4_d: "Catat dosis dari pergelangan tangan tanpa membuka ponsel. Tanpa pelacakan—data kesehatan Anda tetap privat."
  },
  vi: {
    sub: "Bạn chi rất nhiều tiền cho thực phẩm bổ sung. Đừng lãng phí bằng cách trộn sai hoặc quên uống. Tối đa hóa sự hấp thụ bằng lịch trình khoa học.",
    f1_t: "Cảnh báo Tương tác", f1_d: "Đừng lãng phí vitamin của bạn. SuppTime cảnh báo ngay lập tức nếu các chất bổ sung cạnh tranh.",
    f2_t: "Lịch trình Khoa học", f2_d: "Khuyến nghị của chuyên gia cho hơn 40 loại thực phẩm bổ sung. Sử dụng các thói quen có sẵn.",
    f3_t: "Hỗ trợ Thuốc theo Toa (Rx)", f3_d: "Không bao giờ nhầm lẫn điều trị y tế với dinh dưỡng hàng ngày. Theo dõi thuốc theo toa cùng với vitamin.",
    f4_t: "Apple Watch & Riêng tư", f4_d: "Ghi lại liều lượng từ cổ tay. Không máy chủ, không theo dõi—dữ liệu sức khỏe của bạn được giữ riêng tư."
  },
  th: {
    sub: "คุณจ่ายเงินจำนวนมากไปกับอาหารเสริม อย่าให้มันสูญเปล่าจากการทานผิดเวลา หรือจับคู่ผิด เพิ่มการดูดซึมสูงสุดด้วยตารางเวลาทางวิทยาศาสตร์",
    f1_t: "แจ้งเตือนการทานคู่กัน", f1_d: "อย่าทิ้งวิตามินของคุณไปเปล่าๆ SuppTime แจ้งเตือนทันทีหากอาหารเสริมขัดขวางการดูดซึม",
    f2_t: "ตารางเวลาทางวิทยาศาสตร์", f2_d: "คำแนะนำจากผู้เชี่ยวชาญสำหรับอาหารเสริมกว่า 40 ชนิด ใช้สูตรสำเร็จเพื่อการดูดซึมสูงสุด",
    f3_t: "การจัดการยาตามใบสั่ง (Rx)", f3_d: "อย่าสับสนระหว่างการรักษาทางการแพทย์กับโภชนาการ ติดตามยาที่ต้องสั่งโดยแพทย์ควบคู่ไปกับวิตามินของคุณ",
    f4_t: "Apple Watch & เป็นส่วนตัว 100%", f4_d: "บันทึกการทานยาจากข้อมือโดยไม่ต้องเปิดโทรศัพท์ ไม่มีการติดตาม ข้อมูลสุขภาพของคุณเป็นส่วนตัวใน iCloud"
  },
  ar: {
    sub: "أنت تنفق ثروة على المكملات. لا تهدرها بخلط الخاطئ أو نسيان الجرعة. عزز الامتصاص بجدول زمني مبني على أسس علمية وتنبيهات التفاعلات.",
    f1_t: "تنبيهات التفاعلات", f1_d: "لا تهدر فيتاميناتك. يحذرك SuppTime فوراً إذا تعارضت المكملات أو منعت الامتصاص.",
    f2_t: "جداول مبنية على أسس علمية", f2_d: "توصيات الخبراء لأكثر من 40 مكمل. استخدم جداول جاهزة لتحقيق أقصى درجات الامتصاص.",
    f3_t: "دعم الأدوية الوصفية (Rx)", f3_d: "لا تخلط بين علاجك الطبي وتغذيتك اليومية. تتبع الأدوية الموصوفة جنباً إلى جنب مع فيتاميناتك.",
    f4_t: "Apple Watch وخصوصية %100", f4_d: "سجل جرعاتك من معصمك دون فتح هاتفك. لا خوادم ولا تتبع - بياناتك الصحية تظل خاصة تماماً."
  }
};

for (const [lang, val] of Object.entries(t)) {
  // Support either unquoted `lang:` or quoted `'lang':`
  const heroRegex = new RegExp(`(['"]?${lang}['"]?:\\s*{[\\s\\S]*?hero:\\s*{[\\s\\S]*?sub:\\s*').*?(')`);
  code = code.replace(heroRegex, `$1${val.sub}$2`);

  const featuresListRegex = new RegExp(`(['"]?${lang}['"]?:\\s*{[\\s\\S]*?features:\\s*{[\\s\\S]*?list:\\s*\\[)[\\s\\S]*?(\\]\\s*})`);
  
  const newList = `
        { title: '${val.f1_t}', desc: '${val.f1_d}' },
        { title: '${val.f2_t}', desc: '${val.f2_d}' },
        { title: '${val.f3_t}', desc: '${val.f3_d}' },
        { title: '${val.f4_t}', desc: '${val.f4_d}' }
      `;
      
  code = code.replace(featuresListRegex, `$1${newList}$2`);
}

fs.writeFileSync('i18n.js', code, 'utf8');
console.log('Marketing copy fully updated.');
