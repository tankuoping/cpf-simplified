# CPF Simplified 🇸🇬

> Singapore's CPF system explained clearly, with an AI-powered assistant.

A mobile-first Next.js web app that explains Singapore's Central Provident Fund (CPF) through interactive infographics, and includes a Claude AI-powered chatbot backed by a deep CPF knowledge base.

## Features

- 📊 **Interactive contribution calculator** — drag to see OA/SA/MA allocations at any salary
- 🏦 **Four account deep-dives** — OA, SA, MA, RA with rates and use cases
- 🎯 **BRS / FRS / ERS retirement sums** — visual scale with payout estimates
- 💡 **CPF LIFE payout estimator** — interactive RA slider with all three plan comparisons
- 📅 **Age-55 sequence explainer** — step-by-step what happens to your accounts
- 💸 **Government grants** — WIS, MRSS, MMSS, Silver Support
- 🧾 **Tax relief guide** — top-up limits and benefits
- 🤖 **AI chatbot** — Claude AI backed by a comprehensive CPF knowledge base, with streaming responses
- 🌙 **Dark mode** — automatic, respects system preference
- 📱 **Mobile-first** — works great on any screen size

---

## Quick Start (Local)

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/cpf-simplified.git
cd cpf-simplified
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your Anthropic API key

```bash
cp .env.example .env.local
```

Open `.env.local` and replace `your_anthropic_api_key_here` with your real key from [console.anthropic.com](https://console.anthropic.com/).

```
ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel (Recommended)

### Option A — Vercel CLI (fastest)

```bash
npm i -g vercel
vercel
```

Follow the prompts. When asked for environment variables, add `ANTHROPIC_API_KEY`.

### Option B — GitHub + Vercel Dashboard

1. Push this repo to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/cpf-simplified.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo

3. In **Environment Variables**, add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your key from [console.anthropic.com](https://console.anthropic.com/)

4. Click **Deploy** — done in ~60 seconds ✅

### Option C — One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/cpf-simplified&env=ANTHROPIC_API_KEY&envDescription=Get%20your%20key%20at%20console.anthropic.com)

---

## Project Structure

```
cpf-simplified/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # Claude API endpoint (streaming)
│   ├── components/
│   │   └── Chatbot.tsx         # Floating chat UI with streaming
│   ├── lib/
│   │   └── knowledge.ts        # CPF knowledge base (system prompt)
│   ├── globals.css             # Global styles + dark mode
│   ├── layout.tsx              # Root layout + metadata
│   └── page.tsx                # Main page with all infographic sections
├── .env.example                # Copy to .env.local
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## Customising the Knowledge Base

The AI's knowledge lives in `app/lib/knowledge.ts`. It's a comprehensive system prompt covering:

- All four CPF accounts (OA, SA, MA, RA) with rates and rules
- Contribution rates by age (2026 rates)
- Retirement sums — BRS, FRS, ERS (2025 figures)
- CPF LIFE — all three plans, deferral, bequests
- Housing — withdrawal limits, accrued interest, lease rules
- MediSave — what's covered, MediShield Life, CareShield Life
- CPFIS investment scheme
- Government grants — WIS, MRSS, MMSS, Silver Support
- Tax relief on top-ups
- CPF nomination rules
- Common misconceptions

To update figures or add content, edit `app/lib/knowledge.ts` directly.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| AI | Anthropic Claude claude-sonnet-4-20250514 |
| Streaming | Edge Runtime + ReadableStream |
| Styling | Inline styles + CSS variables (no extra deps) |
| Fonts | DM Serif Display + DM Sans (Google Fonts) |
| Deployment | Vercel |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | ✅ | Your Anthropic API key |

---

## Disclaimer

This site is for general educational purposes. CPF rules, rates, and figures change over time. Always verify your personal situation at [cpf.gov.sg](https://www.cpf.gov.sg) or consult a licensed financial adviser.

---

## License

MIT
