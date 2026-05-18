# Soma Christos Church PWA

**Your Spiritual Home in Dubai — Teachings, Prayer & Fellowship**

Built with Next.js 15, Tailwind CSS, TypeScript, and PWA support.

---

## Pages Built

### App Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Daily verse, greeting, announcements, quick access |
| Teachings | `/teachings` | Video teaching library with filters |
| Prayer | `/prayer` | 8 prayer types + audio + request form |
| Notes | `/notes` | Sermon notes journal (add/edit/delete) |
| Library | `/library` | Books & PDFs with categories |
| Donate | `/donate` | Donation form with AED/USD/ETB |
| Reminders | `/reminders` | Push notification reminders |
| Offline | `/offline` | PWA offline fallback |

### Admin Panel (`/admin`)
| Page | Route |
|------|-------|
| Login | `/admin` |
| Dashboard | `/admin/dashboard` |
| Announcements | `/admin/announcements` |
| Videos | `/admin/videos` |
| Prayers | `/admin/prayers` |
| Books | `/admin/books` |
| Prayer Requests | `/admin/prayer-requests` |
| Donations | `/admin/donations` |

**Demo admin login:**
- Email: `admin@somachristos.ae`
- Password: `admin123`

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Fonts**: Poppins + Noto Sans Ethiopic (Amharic)
- **PWA**: manifest.json + service worker
- **Database**: Supabase-ready (connect by adding env vars)
- **Auth**: Supabase Auth (ready to plug in)

---

## Installation & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment (Vercel — Recommended)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import the repo
4. Deploy — zero config needed

---

## Connect Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Recommended Tables

```sql
-- Videos
create table videos (
  id uuid primary key default gen_random_uuid(),
  title text, title_am text, category text,
  youtube_id text, duration text, date text,
  teacher text, emoji text, views int default 0,
  created_at timestamptz default now()
);

-- Prayer Requests
create table prayer_requests (
  id uuid primary key default gen_random_uuid(),
  name text, phone text, topic text, message text,
  privacy text default 'private', status text default 'new',
  created_at timestamptz default now()
);

-- Notes
create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid, title text, verse text,
  learned text, god_spoke text, action text, prayer_pt text,
  created_at timestamptz default now()
);

-- Books
create table books (
  id uuid primary key default gen_random_uuid(),
  title text, title_am text, author text,
  category text, lang text, pdf_url text,
  can_download boolean default true, cover text,
  created_at timestamptz default now()
);

-- Announcements
create table announcements (
  id uuid primary key default gen_random_uuid(),
  text text, text_am text, type text,
  active boolean default true,
  created_at timestamptz default now()
);

-- Donations
create table donations (
  id uuid primary key default gen_random_uuid(),
  name text, email text, phone text,
  amount numeric, currency text, purpose text,
  payment_method text, type text,
  created_at timestamptz default now()
);
```

---

## PWA Install

Users can install to home screen:
- **Android**: Chrome → "Add to Home Screen"
- **iPhone**: Safari → Share → "Add to Home Screen"

Icons: Add your church icon at:
- `public/icons/icon-192.png` (192×192)
- `public/icons/icon-512.png` (512×512)

---

## Stripe / PayPal Integration

Add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

> ⚠️ Before enabling public donations in UAE, confirm compliance with MOHRE and charity regulations.

---

## Colors

| Name | Hex |
|------|-----|
| Sky Blue | `#18AEEA` |
| Navy | `#073B5C` |
| Light Blue | `#e8f6fd` |
| Background | `#f0f8ff` |

---

## Language Support

Toggle EN ↔ አማርኛ from the home screen.
All translations in: `app/lib/translations.ts`

---

Built for Soma Christos Ethiopian Church, Dubai 🙏
