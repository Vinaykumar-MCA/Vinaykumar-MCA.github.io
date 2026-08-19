# EmailJS Setup Guide

Complete step-by-step guide to configure EmailJS for the contact form.

---

## What is EmailJS?

EmailJS lets you send emails directly from the browser using JavaScript — no backend server needed. The free tier allows **200 emails/month**.

---

## Step 1 — Create an EmailJS Account

1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Click **Sign Up** → create a free account
3. Verify your email address

---

## Step 2 — Add an Email Service

1. In the EmailJS dashboard → **Email Services** → **Add New Service**
2. Choose **Gmail** (recommended) or your preferred provider
3. Click **Connect Account** → authenticate with your Gmail
4. Name your service (e.g., `Portfolio Contact`)
5. Click **Create Service**
6. **Copy the Service ID** — it looks like `service_abc1234`

---

## Step 3 — Create an Email Template

1. EmailJS dashboard → **Email Templates** → **Create New Template**
2. Set up the template fields:

**Subject:**
```
New Portfolio Contact: {{subject}}
```

**Body (HTML or Text):**
```
Hello Vinay,

You have a new message from your portfolio website!

---
Name:    {{from_name}}
Email:   {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Reply directly to: {{from_email}}
```

**To Email:** Your personal email address (e.g., `vinaykumar@gmail.com`)
**From Name:** `{{from_name}}`
**Reply To:** `{{from_email}}`

3. Click **Save**
4. **Copy the Template ID** — it looks like `template_xyz9876`

> ⚠️ The template variable names MUST match exactly:
> `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`, `{{to_name}}`

---

## Step 4 — Get Your Public Key

1. EmailJS dashboard → top-right menu → **Account**
2. Scroll to **API Keys** section
3. **Copy your Public Key** — it looks like `A1b2C3d4E5f6G7h8`

---

## Step 5 — Add to Environment Variables

Add the three values to your `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz9876
VITE_EMAILJS_PUBLIC_KEY=A1b2C3d4E5f6G7h8
```

**For Vercel:** Add the same three variables in:
Vercel Dashboard → Project → Settings → Environment Variables

---

## Step 6 — Test the Form

1. Run `npm run dev`
2. Navigate to the Contact section
3. Fill in the form and click **Send Message**
4. Check your inbox for the test email
5. Verify the reply-to address works correctly

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Form shows "Failed to send" | Check Service ID, Template ID, and Public Key in `.env` |
| Email not received | Check spam folder; verify Gmail service is connected in EmailJS |
| Template variables missing | Ensure template uses `{{from_name}}` exactly (double braces) |
| Free tier limit (200/month) | Upgrade plan or add a second email service as backup |
| CORS error | EmailJS Public Key should be used, not Private Key |

---

## Free Tier Limits

| Plan | Emails/Month | Services | Templates |
|---|---|---|---|
| Free | 200 | 2 | 2 |
| Personal ($9/mo) | 1,000 | Unlimited | Unlimited |
| Professional ($29/mo) | 5,000 | Unlimited | Unlimited |

For a portfolio, the **free tier (200/month)** is more than sufficient.

---

## Security Note

The EmailJS Public Key is **safe to expose in client-side code** — it's designed for browser use. Only the Private Key (which you never use here) must be kept secret.

Your `.env` is gitignored and the Public Key is a read-only key that can only send emails through your configured templates — it cannot read your account data.
