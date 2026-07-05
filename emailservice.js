/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║           THREAD CO. — Real Email 2FA Service                   ║
 * ║                                                                  ║
 * ║  HOW IT WORKS:                                                   ║
 * ║  • Your EmailJS account is the SENDER (your Gmail)              ║
 * ║  • The user's entered email is the RECEIVER                     ║
 * ║  • Every user gets their OWN unique code in THEIR inbox         ║
 * ║  • sara@gmail.com → gets her code                               ║
 * ║  • ali@yahoo.com  → gets his code                               ║
 * ║  • any@email.com  → gets their code                             ║
 * ║                                                                  ║
 * ║  SETUP (free, 3 minutes):                                        ║
 * ║  1. Go to https://emailjs.com → Sign up free                    ║
 * ║  2. Email Services → Add New Service → connect Gmail/Outlook    ║
 * ║  3. Email Templates → Create New Template (see below)           ║
 * ║  4. Account → API Keys → copy your Public Key                   ║
 * ║  5. Fill in the 3 values in TC_EMAIL_CONFIG below               ║
 * ║  6. Set CONFIGURED: true                                         ║
 * ║                                                                  ║
 * ║  EMAIL TEMPLATE (copy-paste this into EmailJS template editor): ║
 * ║  ────────────────────────────────────────────────────────────── ║
 * ║  Subject: Your THREAD CO. verification code                     ║
 * ║                                                                  ║
 * ║  Hi {{user_name}},                                               ║
 * ║                                                                  ║
 * ║  Your THREAD CO. sign-in verification code is:                  ║
 * ║                                                                  ║
 * ║       {{code}}                                                   ║
 * ║                                                                  ║
 * ║  This code expires in 10 minutes.                               ║
 * ║  If you did not request this, ignore this email.                ║
 * ║                                                                  ║
 * ║  — The Thread Co. Team                                          ║
 * ║  ────────────────────────────────────────────────────────────── ║
 * ║  IMPORTANT: In the "To Email" field of the template,            ║
 * ║  set it to:  {{to_email}}                                        ║
 * ║  This is what makes it go to EACH USER's own inbox.             ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// ── CONFIGURED FOR THREAD CO. ─────────────────────────────────────────────
const TC_EMAIL_CONFIG = {

  // From EmailJS → Email Services → ThreadCo Gmail → Service ID
  SERVICE_ID: 'lunalupa.threadco',

  // From EmailJS → Email Templates → One-Time Password → Template ID
  TEMPLATE_ID: 'template_1cgtd3a',

  // From EmailJS → Account → API Keys → Public Key
  PUBLIC_KEY: 'fo97OaqUzUalbgmlw',

  // Real emails are now live — every user gets their own code in their own inbox
  CONFIGURED: true

};
// ─────────────────────────────────────────────────────────────────────────


/**
 * Generates a cryptographically secure 6-digit OTP.
 * Uses Web Crypto API — not Math.random() which is predictable.
 */
function generateOTP() {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  // Range 100000–999999 (always exactly 6 digits)
  return String((arr[0] % 900000) + 100000);
}

/**
 * Stores the OTP in sessionStorage with a 10-minute expiry.
 * sessionStorage is per-tab and clears when the browser tab closes.
 */
function storeOTP(code) {
  sessionStorage.setItem('tc_otp', JSON.stringify({
    code,
    expires: Date.now() + 10 * 60 * 1000  // 10 minutes from now
  }));
}

/**
 * Validates what the user typed against the stored OTP.
 *
 * Returns one of:
 *   'ok'      — correct code, OTP cleared from storage
 *   'expired' — code existed but time ran out
 *   'wrong'   — code exists but digits don't match
 *   'missing' — no OTP was ever sent (edge case)
 */
function validateOTP(entered) {
  const raw = sessionStorage.getItem('tc_otp');
  if (!raw) return 'missing';

  let payload;
  try { payload = JSON.parse(raw); }
  catch { sessionStorage.removeItem('tc_otp'); return 'missing'; }

  const { code, expires } = payload;

  if (Date.now() > expires) {
    sessionStorage.removeItem('tc_otp');
    return 'expired';
  }

  if (String(entered).trim() === String(code).trim()) {
    sessionStorage.removeItem('tc_otp');  // one-time use — clear immediately
    return 'ok';
  }

  return 'wrong';
}

/**
 * MAIN FUNCTION — call this whenever you need to send a 2FA code.
 *
 * It will:
 *   1. Generate a secure 6-digit code
 *   2. Store it with a 10-minute expiry
 *   3. Send it via EmailJS TO the user's own email address
 *      (not yours — THEIR inbox, whatever address they typed)
 *   4. Fall back to an on-screen banner if EmailJS is not yet configured
 *
 * @param {string}   toEmail    The user's email address (goes in {{to_email}})
 * @param {string}   userName   User's name for personalisation (goes in {{user_name}})
 * @param {function} onSuccess  Called after successful send: ({ real, email })
 * @param {function} onError    Called if EmailJS send fails: (errorObject)
 */
async function sendTwoFactorCode(toEmail, userName, onSuccess, onError) {

  // Sanitise inputs
  toEmail   = (toEmail   || '').trim();
  userName  = (userName  || 'there').trim();

  if (!toEmail || !toEmail.includes('@')) {
    if (onError) onError(new Error('Invalid email address: ' + toEmail));
    return;
  }

  // Generate + store the OTP
  const code = generateOTP();
  storeOTP(code);

  // ── PATH A: EmailJS is configured → send a REAL email ──────────────────
  if (TC_EMAIL_CONFIG.CONFIGURED) {

    // Make sure the EmailJS SDK has loaded
    if (typeof emailjs === 'undefined') {
      console.error('[TC 2FA] EmailJS SDK not loaded. Check your <script> tag.');
      showDevCodeBanner(code, toEmail, '⚠️ EmailJS SDK missing — see console');
      if (onSuccess) onSuccess({ real: false, code, email: toEmail });
      return;
    }

    try {
      await emailjs.send(
        TC_EMAIL_CONFIG.SERVICE_ID,
        TC_EMAIL_CONFIG.TEMPLATE_ID,
        {
          to_email:  toEmail,      // → {{to_email}}  in template  ← THIS IS THE USER'S INBOX
          code:      code,         // → {{code}}
          user_name: userName,     // → {{user_name}}
          site_name: 'THREAD CO.'  // → {{site_name}}
        },
        TC_EMAIL_CONFIG.PUBLIC_KEY
      );

      console.log(`[TC 2FA] Code sent to ${toEmail}`);
      if (onSuccess) onSuccess({ real: true, email: toEmail });

    } catch (err) {

      // EmailJS returned an error — show dev banner as fallback so the
      // user can still test, and log the full error for debugging
      console.error('[TC 2FA] EmailJS send failed:', err);
      const hint = err?.text || err?.message || 'Check Service ID / Template ID / Public Key';
      showDevCodeBanner(code, toEmail, '❌ EmailJS error: ' + hint);
      if (onError) onError(err);

    }
    return;
  }

  // ── PATH B: Not configured yet → show code on-screen ───────────────────
  // This is the DEVELOPMENT / TESTING fallback.
  // Once you fill in the 3 IDs above and set CONFIGURED: true, this path
  // is never reached and users only ever see their inbox code.
  showDevCodeBanner(code, toEmail);
  if (onSuccess) onSuccess({ real: false, code, email: toEmail });
}


/**
 * Shows a floating on-screen banner with the OTP code.
 * Used during development (before EmailJS is configured).
 * Auto-dismisses after 90 seconds.
 */
function showDevCodeBanner(code, email, errorMsg) {
  // Remove any existing banner first
  document.getElementById('tc-dev-otp')?.remove();

  // Build the digit boxes
  const digits = String(code).split('').map(d =>
    `<span style="
      width:40px;height:48px;
      background:rgba(255,255,255,.1);
      border:1.5px solid rgba(255,255,255,.22);
      border-radius:10px;
      display:inline-flex;align-items:center;justify-content:center;
      font-size:22px;font-weight:900;color:#fff;font-family:monospace;
      letter-spacing:0;cursor:pointer" onclick="copyCode('${code}')">${d}</span>`
  ).join('');

  const banner = document.createElement('div');
  banner.id = 'tc-dev-otp';

  banner.innerHTML = `
    <div style="display:flex;align-items:flex-start;gap:14px">
      <div style="font-size:26px;flex-shrink:0;margin-top:2px">${errorMsg ? '⚠️' : '📬'}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:800;font-size:14px;margin-bottom:4px;color:#fff">
          ${errorMsg || ('Code for: <span style="color:#fbbf24">' + email + '</span>')}
        </div>
        ${!errorMsg ? `
        <div style="font-size:12px;color:rgba(255,255,255,.55);margin-bottom:12px;line-height:1.5">
          EmailJS not yet configured — code shown here for testing.<br>
          Open <strong style="color:#f4a261">email-service.js</strong> and fill in your 3 IDs.
        </div>
        <div style="display:flex;gap:7px;margin-bottom:10px">${digits}</div>
        <div style="font-size:11px;color:rgba(255,255,255,.35)">
          Click digits to copy · Valid 10 min · Hides in <span id="tc-otp-timer">90</span>s
        </div>` : `
        <div style="font-size:12px;color:rgba(255,255,255,.6);margin-top:6px;line-height:1.5">
          Check your Service ID, Template ID, and Public Key in <strong>email-service.js</strong>.<br>
          Make sure CONFIGURED is set to <strong style="color:#f4a261">true</strong>.
        </div>`}
      </div>
      <button onclick="document.getElementById('tc-dev-otp').remove()" style="
        background:rgba(255,255,255,.1);border:none;border-radius:7px;
        color:rgba(255,255,255,.6);padding:5px 10px;cursor:pointer;
        font-size:13px;flex-shrink:0;font-family:DM Sans,sans-serif">✕</button>
    </div>`;

  banner.style.cssText = `
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:linear-gradient(135deg,#1a1a1a 0%,#2a1010 100%);
    border:1.5px solid rgba(230,57,70,.35);border-radius:18px;
    padding:20px 24px;z-index:99999;
    box-shadow:0 20px 60px rgba(0,0,0,.45);
    min-width:340px;max-width:500px;width:90vw;
    font-family:'DM Sans',sans-serif`;

  // Slide-in animation
  if (!document.getElementById('tc-otp-anim')) {
    const s = document.createElement('style');
    s.id = 'tc-otp-anim';
    s.textContent = `
      @keyframes tcSlideUp {
        from { opacity:0; transform:translateX(-50%) translateY(18px); }
        to   { opacity:1; transform:translateX(-50%) translateY(0); }
      }`;
    document.head.appendChild(s);
  }
  banner.style.animation = 'tcSlideUp .3s ease both';

  document.body.appendChild(banner);

  // Countdown + auto-dismiss
  if (!errorMsg) {
    let t = 90;
    const tick = setInterval(() => {
      t--;
      const el = document.getElementById('tc-otp-timer');
      if (el) el.textContent = t;
      if (t <= 0) { clearInterval(tick); banner.remove(); }
    }, 1000);
  }
}

/**
 * Copies the OTP code to clipboard when user clicks on a digit.
 */
function copyCode(code) {
  navigator.clipboard?.writeText(code).then(() => {
    const banner = document.getElementById('tc-dev-otp');
    if (!banner) return;
    const hint = banner.querySelector('[id="copy-hint"]') || document.createElement('div');
    hint.id = 'copy-hint';
    hint.style.cssText = 'font-size:11px;color:#10b981;font-weight:700;margin-top:6px';
    hint.textContent = '✓ Copied to clipboard!';
    banner.querySelector('div > div')?.appendChild(hint);
    setTimeout(() => hint.remove(), 2000);
  }).catch(() => {});
}