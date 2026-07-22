# Architecture and Schema Inventory

This document captures the current, repository-backed architecture and schema surface for Health Force Academy. It is intentionally based on files that exist in this repository today, so gaps are called out explicitly instead of assumed.

## Repository status

The repository currently contains project metadata and configuration for a Next.js application, but it does **not** contain the `src/` application implementation, Supabase migration files, database schema files, or API route definitions yet.

## Intended product scope

The project is described as a healthcare career counselling platform for students after class 12. The README lists the intended product capabilities as:

- Premium landing page and hero section
- Multi-step lead generation form
- AI chatbot integration
- Admin dashboard for lead management
- Partner management system
- Course catalog
- Lead routing and assignment
- Supabase integration
- SEO optimization and sitemap support

## Technology architecture

### Runtime and framework

- **Next.js 14** is the application framework.
- **React 18** is the UI library.
- **TypeScript 5** is used with strict compiler settings.
- **Tailwind CSS 3** is the styling system.
- **Supabase JavaScript client** is included for backend/database integration.

### Application layers

```text
Browser
  |
  | React UI / Next.js pages or app router
  v
Next.js application
  |-- UI components and forms
  |-- SEO/sitemap configuration
  |-- API routes or server actions (not present yet)
  |
  v
External services
  |-- Supabase database/auth/storage (dependency and env vars present; schema not present)
  |-- Telegram bot integration (env var present; implementation not present)
  |-- WhatsApp contact flow (env var present; implementation not present)
  |-- Admin email notifications (env var present; implementation not present)
```

### Frontend architecture discovered

Tailwind scans these application paths:

- `src/pages/**/*.{js,ts,jsx,tsx,mdx}`
- `src/components/**/*.{js,ts,jsx,tsx,mdx}`
- `src/app/**/*.{js,ts,jsx,tsx,mdx}`

Those directories are not currently present, so the configured architecture supports either the Next.js Pages Router, App Router, or both, but the implementation has not been checked in.

### Styling architecture discovered

The Tailwind theme extends the default design system with:

- Brand colors: `primary`, `secondary`, and `accent`
- A `gradient-primary` background image
- Larger rounded corners: `lg` and `2xl`
- Soft box shadows: `soft` and `soft-lg`

### Image architecture discovered

Next.js image optimization allows remote images from:

- `images.unsplash.com`
- `cdn.example.com`

## Configuration schema

### Environment variables

| Variable | Purpose | Exposure | Required for |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Public client-side | Supabase integration |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Public client-side | Supabase integration |
| `NEXT_PUBLIC_API_URL` | Base application/API URL | Public client-side | API calls |
| `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` | Telegram bot token | Public client-side | Telegram bot integration |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp phone number | Public client-side | WhatsApp contact flow |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Admin contact email | Public client-side | Admin notifications/contact |

> Security note: `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` is exposed to browser bundles by design because of the `NEXT_PUBLIC_` prefix. If this token is a real bot secret, move it to a server-only variable such as `TELEGRAM_BOT_TOKEN` and call Telegram from a server-side API route or server action.

### TypeScript compiler schema

The TypeScript configuration enforces strictness, including:

- `strict`
- `noImplicitAny`
- `strictNullChecks`
- `noUnusedLocals`
- `noUnusedParameters`
- `noImplicitReturns`
- `noFallthroughCasesInSwitch`
- `forceConsistentCasingInFileNames`

A path alias is configured:

```json
{
  "@/*": ["./src/*"]
}
```

## Data schema inventory

No database schema artifacts were found in the repository. Specifically, this repository currently lacks:

- Supabase migrations
- SQL schema files
- ORM models
- Generated Supabase TypeScript database types
- API request/response DTOs
- Form validation schemas such as Zod/Yup definitions

### Recommended initial data model

Based on the documented product scope, the likely core entities are:

```text
students/leads
  |-- lead profile and class 12 background
  |-- preferred courses and location
  |-- counselling status and source attribution

courses
  |-- healthcare program metadata
  |-- eligibility, duration, fees, and career outcomes

partners
  |-- college/institute/channel partner information
  |-- assigned territories and course offerings

lead_assignments
  |-- routing result from lead to counsellor or partner
  |-- assignment status and timestamps

counsellors/admin_users
  |-- admin dashboard users
  |-- ownership and follow-up workflow

chat_sessions/chat_messages
  |-- AI chatbot conversation history
  |-- lead capture handoff metadata
```

## Recommended next implementation steps

1. Add the missing Next.js application directory (`src/app` or `src/pages`) and choose one routing pattern as the primary architecture.
2. Add Supabase migration files under a conventional directory such as `supabase/migrations/`.
3. Generate and commit Supabase TypeScript types, for example under `src/types/database.ts`.
4. Define form validation schemas for lead capture and partner onboarding.
5. Move secrets such as Telegram bot tokens to server-only environment variables.
6. Add API routes or server actions for lead submission, routing, chatbot handoff, and admin dashboard reads/writes.
