# Sacred Match — Deployment Checklist

Follow these steps to go fully live after the code is deployed.

---

## 1. Vercel (Frontend — `apps/web`)

### Required environment variable

| Variable | Value |
|---|---|
| `VITE_API_URL` | Your Railway API URL, e.g. `https://sacred-match-api.up.railway.app` |

**Steps:**
1. Open [Vercel dashboard](https://vercel.com) → your Sacred Match project → **Settings → Environment Variables**
2. Add `VITE_API_URL` = `<your Railway API public URL>` for **Production** (and Preview if you want)
3. Redeploy (Vercel → Deployments → click the latest → Redeploy)

---

## 2. Railway (Backend — `apps/api`)

### Required environment variables

| Variable | Example / Notes |
|---|---|
| `DATABASE_URL` | `postgresql://user:pass@host:5432/dbname` — already set if you provisioned a Railway Postgres plugin |
| `JWT_SECRET` | Random 32+ character string. Generate: `openssl rand -base64 32` |
| `CORS_ORIGIN` | Your Vercel URL, e.g. `https://sacred-match.vercel.app` |
| `NODE_ENV` | `production` |
| `PORT` | `4000` (Railway sets this automatically via `$PORT`) |

### Optional environment variables

| Variable | Purpose | Example |
|---|---|---|
| `RESEND_API_KEY` | Sends OTP & password reset emails (get from [resend.com](https://resend.com)) | `re_xxxxxxxxxxxx` |
| `EMAIL_FROM` | Sender address for transactional emails | `Sacred Match <noreply@sacredmatch.ng>` |
| `CLOUDINARY_URL` | Profile photo & ID doc uploads | `cloudinary://api_key:api_secret@cloud_name` |
| `S3_BUCKET` | Alternative to Cloudinary | `sacred-match-uploads` |
| `S3_REGION` | | `us-east-1` |
| `S3_ACCESS_KEY` | | |
| `S3_SECRET_KEY` | | |

**Steps:**
1. Open [Railway dashboard](https://railway.app) → your Sacred Match API service → **Variables**
2. Add each variable above
3. Confirm `CORS_ORIGIN` exactly matches your Vercel production URL (no trailing slash)
4. Railway will automatically redeploy after saving variables

---

## 3. Run Prisma DB Push on Railway

The database schema must be applied before the API can work.

### Option A — Railway CLI (recommended)

```bash
npm install -g @railway/cli
railway login
railway link          # select your project
railway run npx prisma db push --accept-data-loss
```

### Option B — Via Railway shell

1. Railway dashboard → API service → **Shell** tab
2. Run: `npx prisma db push`

> `db push` is used instead of `migrate deploy` because this project uses `prisma db push` as its schema management strategy (no migration files).

---

## 4. Custom Domain

### Frontend (Vercel)
1. Vercel → project → **Settings → Domains**
2. Add your domain (e.g. `sacredmatch.ng` or `app.sacredmatch.ng`)
3. Copy the DNS records Vercel shows and add them to your DNS provider (Cloudflare, GoDaddy, etc.)

### Backend (Railway)
1. Railway → API service → **Settings → Domains**
2. Add a subdomain like `api.sacredmatch.ng`
3. Add the CNAME record at your DNS provider
4. Update `CORS_ORIGIN` on Railway to your final frontend domain
5. Update `VITE_API_URL` on Vercel to your final API domain

---

## 5. Seed an Admin Account

After the DB is live, create the first admin user via the API or Railway shell:

```bash
# Via Railway shell
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  const hash = await bcrypt.hash('YourPassword123!', 12);
  const user = await prisma.user.create({
    data: {
      email: 'admin@sacredmatch.ng',
      firstName: 'Admin',
      lastName: 'User',
      passwordHash: hash,
      role: 'ADMIN',
      status: 'ACTIVE',
    }
  });
  console.log('Admin created:', user.id);
}
main().finally(() => prisma.\$disconnect());
"
```

Then log in at `https://your-domain/login` and navigate to `/admin`.

---

## 6. Post-Deploy Verification

Check these endpoints to confirm everything is working:

```
GET  /health                    → { ok: true, status: "healthy" }
POST /auth/login                → returns JWT token
GET  /admin/stats  (with token) → returns DB counts
```

---

## Quick Environment Summary

```
# Vercel
VITE_API_URL=https://api.sacredmatch.ng

# Railway
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://...
JWT_SECRET=<32+ char random string>
CORS_ORIGIN=https://sacredmatch.ng
RESEND_API_KEY=re_...
EMAIL_FROM=Sacred Match <noreply@sacredmatch.ng>
CLOUDINARY_URL=cloudinary://key:secret@cloudname
```
