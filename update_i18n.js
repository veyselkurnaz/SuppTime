const fs = require('fs');
let code = fs.readFileSync('i18n.js', 'utf8');

const translations = {
  en: {
    title: 'Subscribe safely with Apple.',
    sub: 'Full access to every feature. Secure payments via App Store.',
    bullets: "['Lifetime or Subscription', 'Apple Watch + iPhone', 'Secure payment']"
  },
  tr: {
    title: 'Apple ile güvenle abone olun.',
    sub: 'Tüm özelliklere tam erişim. App Store üzerinden güvenli ödeme.',
    bullets: "['Ömür Boyu veya Abonelik', 'Apple Watch + iPhone', 'Güvenli ödeme']"
  },
  ko: {
    title: 'Apple로 안전하게 구독하세요.',
    sub: '모든 기능에 대한 전체 액세스. App Store를 통한 안전한 결제.',
    bullets: "['평생 또는 구독', 'Apple Watch + iPhone', '안전한 결제']"
  },
  ja: {
    title: 'Appleで安全にサブスクリプション.',
    sub: 'すべての機能にフルアクセス。App Store経由の安全な支払い。',
    bullets: "['買い切りまたはサブスク', 'Apple Watch + iPhone', '安全な支払い']"
  },
  'zh-cn': {
    title: '使用 Apple 安全订阅。',
    sub: '完全访问所有功能。通过 App Store 安全付款。',
    bullets: "['买断或订阅', 'Apple Watch + iPhone', '安全付款']"
  },
  'zh-tw': {
    title: '使用 Apple 安全訂閱。',
    sub: '完全訪問所有功能。透過 App Store 安全付款。',
    bullets: "['買斷或訂閱', 'Apple Watch + iPhone', '安全付款']"
  },
  de: {
    title: 'Sicher abonnieren mit Apple.',
    sub: 'Voller Zugriff auf alle Funktionen. Sichere Zahlung über den App Store.',
    bullets: "['Einmalzahlung oder Abo', 'Apple Watch + iPhone', 'Sichere Zahlung']"
  },
  es: {
    title: 'Suscríbete de forma segura con Apple.',
    sub: 'Acceso total a todas las funciones. Pago seguro a través de la App Store.',
    bullets: "['De por vida o Suscripción', 'Apple Watch + iPhone', 'Pago seguro']"
  },
  'pt-br': {
    title: 'Assine com segurança com a Apple.',
    sub: 'Acesso total a todos os recursos. Pagamento seguro via App Store.',
    bullets: "['Vitalício ou Assinatura', 'Apple Watch + iPhone', 'Pagamento seguro']"
  },
  it: {
    title: 'Abbonati in modo sicuro con Apple.',
    sub: 'Accesso completo a tutte le funzionalità. Pagamento sicuro tramite App Store.',
    bullets: "['A vita o Abbonamento', 'Apple Watch + iPhone', 'Pagamento sicuro']"
  },
  nl: {
    title: 'Abonneer veilig met Apple.',
    sub: 'Volledige toegang tot alle functies. Veilige betaling via de App Store.',
    bullets: "['Levenslang of Abonnement', 'Apple Watch + iPhone', 'Veilige betaling']"
  },
  pl: {
    title: 'Subskrybuj bezpiecznie z Apple.',
    sub: 'Pełny dostęp do wszystkich funkcji. Bezpieczne płatności przez App Store.',
    bullets: "['Dożywotnio lub Subskrypcja', 'Apple Watch + iPhone', 'Bezpieczna płatność']"
  },
  ru: {
    title: 'Безопасная подписка через Apple.',
    sub: 'Полный доступ ко всем функциям. Безопасная оплата через App Store.',
    bullets: "['Навсегда или Подписка', 'Apple Watch + iPhone', 'Безопасная оплата']"
  },
  id: {
    title: 'Berlangganan dengan aman bersama Apple.',
    sub: 'Akses penuh ke semua fitur. Pembayaran aman melalui App Store.',
    bullets: "['Seumur Hidup atau Langganan', 'Apple Watch + iPhone', 'Pembayaran aman']"
  },
  vi: {
    title: 'Đăng ký an toàn với Apple.',
    sub: 'Quyền truy cập đầy đủ vào mọi tính năng. Thanh toán an toàn qua App Store.',
    bullets: "['Trọn đời hoặc Đăng ký', 'Apple Watch + iPhone', 'Thanh toán an toàn']"
  },
  th: {
    title: 'สมัครสมาชิกอย่างปลอดภัยด้วย Apple',
    sub: 'เข้าถึงทุกฟีเจอร์อย่างเต็มรูปแบบ ชำระเงินอย่างปลอดภัยผ่าน App Store',
    bullets: "['ตลอดชีพหรือสมัครสมาชิก', 'Apple Watch + iPhone', 'ชำระเงินปลอดภัย']"
  },
  ar: {
    title: 'اشترك بأمان مع Apple.',
    sub: 'وصول كامل إلى كل ميزة. دفع آمن عبر App Store.',
    bullets: "['مدى الحياة أو اشتراك', 'Apple Watch + iPhone', 'دفع آمن']"
  }
};

for (const [lang, trans] of Object.entries(translations)) {
  const langKeyRegex = new RegExp(`'${lang}':\\s*{[\\s\\S]*?download_cta:\\s*{([\\s\\S]*?)},`, 'g');
  
  code = code.replace(langKeyRegex, (match, ctaContent) => {
    // we need to replace title, sub, bullets inside ctaContent
    let newCtaContent = ctaContent
      .replace(/title:\s*'.*?'/, `title: '${trans.title}'`)
      .replace(/sub:\s*'.*?'/, `sub: '${trans.sub}'`)
      .replace(/bullets:\s*\[.*?\]/, `bullets: ${trans.bullets}`);
      
    return match.replace(ctaContent, newCtaContent);
  });
}

fs.writeFileSync('i18n.js', code, 'utf8');
console.log('Translations updated.');
