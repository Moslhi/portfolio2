
// POST /api/contact — real email delivery via Resend.
// Deploy on Vercel. Set env vars: RESEND_API_KEY, CONTACT_EMAIL, EMAIL_FROM, EMAIL_REPLY_TO

type Body = Record<string, string | undefined>

const escapeHtml = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const trim = (v: unknown, max = 1000) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

// naive in-memory rate limit: 5 submissions / 10 min / IP
const hits = new Map<string, number[]>()
function rateLimited(ip: string) {
  const now = Date.now()
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000)
  if (list.length >= 5) return true
  list.push(now)
  hits.set(ip, list)
  return false
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || 'Portfolio <onboarding@resend.dev>',
      to: [to],
      reply_to: process.env.EMAIL_REPLY_TO || process.env.CONTACT_EMAIL,
      subject,
      html,
    }),
  })
  if (!res.ok) throw new Error(`Resend error: ${res.status}`)
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', process.env.SITE_ORIGIN || '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const ip = String(req.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim()
    if (rateLimited(ip)) {
      return res.status(429).json({ ok: false, error: 'Too many requests. Please try again later.' })
    }

    const b: Body = req.body || {}
    if (trim(b.website)) return res.status(200).json({ ok: true }) // honeypot: pretend success

    const name = trim(b.name, 120)
    const email = trim(b.email, 200)
    const subject = trim(b.subject, 200)
    const message = trim(b.message, 4000)
    const phone = trim(b.phone, 40)
    const company = trim(b.company, 120)
    const projectType = trim(b.projectType, 120)
    const budget = trim(b.budget, 120)
    const preferredContact = trim(b.preferredContact, 40)

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' })
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_EMAIL || 'mahmoudmoslhey932@gmail.com'
    if (!apiKey) {
      return res.status(500).json({ ok: false, error: 'Email service not configured' })
    }

    const row = (k: string, v: string) =>
      `<tr><td style="padding:6px 12px;color:#64748b;font-family:monospace;font-size:12px;text-transform:uppercase;vertical-align:top">${k}</td><td style="padding:6px 12px;font-size:14px">${escapeHtml(v) || '—'}</td></tr>`

    const ownerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
        <div style="background:#05070d;color:#22d3ee;padding:18px 24px;font-family:monospace;letter-spacing:2px">NEW PORTFOLIO MESSAGE</div>
        <table style="width:100%;border-collapse:collapse">
          ${row('Name', name)}${row('Email', email)}${row('Phone', phone)}${row('Company', company)}
          ${row('Project', projectType)}${row('Budget', budget)}${row('Preferred contact', preferredContact)}
          ${row('Subject', subject)}${row('Submitted', new Date().toLocaleString())}${row('Source', 'Portfolio')}
        </table>
        <div style="padding:18px 24px;background:#f8fafc;border-top:1px solid #e2e8f0">
          <div style="color:#64748b;font-family:monospace;font-size:12px;margin-bottom:8px">MESSAGE</div>
          <div style="white-space:pre-wrap;font-size:14px;line-height:1.6">${escapeHtml(message)}</div>
        </div>
      </div>`

    const visitorHtml = `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
        <div style="background:#05070d;color:#22d3ee;padding:18px 24px;font-family:monospace;letter-spacing:2px">THANK YOU FOR CONTACTING MAHMOUD</div>
        <div style="padding:24px;font-size:14px;line-height:1.7;color:#1e293b">
          <p>Hi ${escapeHtml(name)},</p>
          <p>Your message has been received successfully.</p>
          <p>Mahmoud will review your message and follow up through the contact information you provided.</p>
          <p style="color:#64748b;font-size:12px;margin-top:18px">— Mahmoud Moslhey · Full Stack Developer</p>
        </div>
      </div>`

    await sendEmail(to, `Portfolio message from ${name}: ${subject}`, ownerHtml)
    try {
      await sendEmail(email, 'Thank you for contacting Mahmoud', visitorHtml)
    } catch {
      // visitor confirmation is best-effort — owner notification already succeeded
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
