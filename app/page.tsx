"use client";
import { useState } from "react";
import Chatbot from "./components/Chatbot";

const S = {
  section: {
    padding: "3rem 1.25rem 0",
    maxWidth: 680,
    margin: "0 auto",
  } as React.CSSProperties,
  eyebrow: {
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.13em",
    textTransform: "uppercase" as const,
    color: "var(--muted)",
    marginBottom: "0.5rem",
  },
  h2: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "clamp(1.6rem, 4vw, 2rem)",
    lineHeight: 1.2,
    marginBottom: "0.5rem",
  },
  body: {
    fontSize: "0.95rem",
    color: "var(--muted)",
    lineHeight: 1.7,
    maxWidth: 560,
  },
  card: {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: "1.25rem",
  } as React.CSSProperties,
  divider: {
    height: 1,
    background: "var(--border)",
    maxWidth: 680,
    margin: "3rem auto 0",
  },
};

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: 11,
      padding: "4px 10px",
      borderRadius: 20,
      background: `${color}18`,
      color,
      fontWeight: 500,
      marginRight: 6,
      marginTop: 4,
    }}>{children}</span>
  );
}

function AccountCard({ id, name, rate, color, desc, tags }: {
  id: string; name: string; rate: string; color: string; desc: string; tags: string[];
}) {
  return (
    <div style={{ ...S.card, borderColor: `${color}30`, background: `${color}09` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color, background: color, padding: "3px 8px", borderRadius: 20, color: "#fff" }}>{id}</span>
          <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)", marginTop: 6 }}>{name}</div>
        </div>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.8rem", color, lineHeight: 1 }}>{rate}</div>
      </div>
      <p style={{ fontSize: "0.84rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: 10 }}>{desc}</p>
      <div>{tags.map(t => <Tag key={t} color={color}>{t}</Tag>)}</div>
    </div>
  );
}

export default function Home() {
  const [salary, setSalary] = useState(4000);
  const [raBalance, setRaBalance] = useState(213000);

  const contrib = Math.min(salary, 7400);
  const empPct = 20; const erPct = 17;
  const oa = Math.round(contrib * 0.23);
  const sa = Math.round(contrib * 0.06);
  const ma = Math.round(contrib * 0.08);
  const total = Math.round(contrib * 0.37);

  const ratio = raBalance / 213000;
  const stdPay = Math.round(1650 * ratio / 10) * 10;
  const escPay = Math.round(1440 * ratio / 10) * 10;
  const basicPay = Math.round(1270 * ratio / 10) * 10;

  const sumLabel =
    raBalance < 106500 ? { text: "Below BRS", color: "var(--ma)" } :
    raBalance < 213000 ? { text: "Between BRS and FRS", color: "var(--ma)" } :
    raBalance === 213000 ? { text: "At FRS — the default target", color: "var(--sa)" } :
    raBalance < 426000 ? { text: "Between FRS and ERS", color: "var(--sa)" } :
    { text: "At or above ERS — maximum income", color: "var(--ra)" };

  const ageRows = [
    { age: "≤ 55", emp: 20, er: 17, total: 37 },
    { age: "55–60", emp: 18, er: 16, total: 34 },
    { age: "60–65", emp: 12.5, er: 12.5, total: 25 },
    { age: "65–70", emp: 7.5, er: 9, total: 16.5 },
    { age: "> 70", emp: 5, er: 7.5, total: 12.5 },
  ];

  const faqs = [
    {
      q: "Can I withdraw CPF before 55?",
      a: "Generally no, with limited exceptions: permanent incapacity, terminal illness, leaving Singapore and Malaysia permanently, or death. From age 55 you can withdraw savings above your chosen retirement sum."
    },
    {
      q: "What happens to my CPF when I die?",
      a: "CPF is not covered by your will. Make a CPF Nomination to direct savings to your nominees. Without one, it goes to the Public Trustee's Office. CPF LIFE pays a bequest (unused premium minus payouts received) — you will never get less out in total than you put in."
    },
    {
      q: "I'm self-employed. Must I contribute?",
      a: "You must contribute to MediSave based on your net trade income. You are not required to contribute to OA or SA, but you can do so voluntarily via RSTU top-ups — and you'll get tax relief for doing so."
    },
    {
      q: "Should I invest my CPF (CPFIS)?",
      a: "Only if you're confident of beating 2.5–4% risk-free returns. CPF Board data shows many CPFIS investors underperform the guaranteed CPF rates after fees. If you're unsure, leaving money in CPF is often the smarter choice."
    },
    {
      q: "What's the accrued interest on housing?",
      a: "When you sell a property bought with CPF, you must refund the principal withdrawn plus 2.5% p.a. accrued interest back to your OA. This is your own retirement money being restored — not a penalty. The cash proceeds from the sale are yours to keep."
    },
    {
      q: "Can I use CPF for private property?",
      a: "Yes — OA savings can be used for private property down payments and loan installments. The property must have sufficient lease to cover the youngest buyer to age 95. Withdrawal limits (Valuation Limit) apply."
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ paddingBottom: "6rem" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "4rem 1.25rem 2rem", maxWidth: 680, margin: "0 auto" }}>
        <div style={S.eyebrow}>Singapore's social security system</div>
        <h1 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: "clamp(2.2rem, 6vw, 3.2rem)",
          lineHeight: 1.1,
          marginBottom: "1rem",
        }}>
          CPF <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Simplified</em>
        </h1>
        <p style={{ ...S.body, margin: "0 auto 1.5rem", textAlign: "center" }}>
          Singapore's Central Provident Fund explained clearly — contributions, accounts, retirement sums, CPF LIFE, and more. With an AI assistant to answer your questions.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          {["Contributions", "4 Accounts", "Retirement Sums", "CPF LIFE", "Housing", "MediSave"].map(t => (
            <span key={t} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 20, background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={S.divider} />

      {/* Three pillars */}
      <div style={S.section}>
        <div style={S.eyebrow}>The big picture</div>
        <h2 style={S.h2}>Three things CPF protects</h2>
        <p style={S.body}>CPF is your own savings — returned to you with guaranteed interest. It covers three core needs.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginTop: "1.5rem" }}>
          {[
            { icon: "🏠", title: "A paid-up home", desc: "Use OA savings for down payments and housing loan repayments.", color: "var(--oa)" },
            { icon: "🏥", title: "Healthcare", desc: "MediSave covers hospitalisation, surgery, and approved insurance premiums.", color: "var(--ma)" },
            { icon: "💰", title: "Lifelong income", desc: "CPF LIFE pays you monthly for life from age 65, no matter how long you live.", color: "var(--ra)" },
          ].map(p => (
            <div key={p.title} style={{ ...S.card, borderTop: `3px solid ${p.color}` }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{p.title}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={S.divider} />

      {/* Contribution calculator */}
      <div style={S.section}>
        <div style={S.eyebrow}>How contributions work</div>
        <h2 style={S.h2}>Every payslip, money flows in</h2>
        <p style={S.body}>You and your employer both contribute. Adjust the slider to see how much flows into each account.</p>
        <div style={{ ...S.card, marginTop: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Monthly salary</span>
            <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.2rem" }}>${salary.toLocaleString()}</span>
          </div>
          <input
            type="range" min={750} max={8000} step={50} value={salary}
            onChange={e => setSalary(+e.target.value)}
            style={{ width: "100%", marginBottom: "1rem", accentColor: "var(--accent)" }}
          />

          {/* Stacked bar */}
          <div style={{ borderRadius: 8, overflow: "hidden", display: "flex", height: 40, marginBottom: 6 }}>
            <div style={{ flex: empPct, background: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 600 }}>You {empPct}%</div>
            <div style={{ flex: erPct, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 600 }}>Employer {erPct}%</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginBottom: "1.25rem" }}>
            <span>Your contribution</span><span>Employer's contribution</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "OA · Ordinary", amt: oa, pct: "23%", color: "var(--oa)" },
              { label: "SA · Special", amt: sa, pct: "6%", color: "var(--sa)" },
              { label: "MA · MediSave", amt: ma, pct: "8%", color: "var(--ma)" },
              { label: "Total CPF", amt: total, pct: "37%", color: "var(--accent)", highlight: true },
            ].map(item => (
              <div key={item.label} style={{
                background: "var(--bg)", borderRadius: 12, padding: "0.85rem",
                border: `1px solid ${item.highlight ? item.color : "var(--border)"}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4, color: "var(--text)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, display: "inline-block", marginRight: 6 }} />
                  {item.label}
                </div>
                <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.3rem" }}>${item.amt.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{item.pct} of wage</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: "0.78rem", color: "var(--muted)" }}>
            * For employees aged 55 &amp; below. OW ceiling applies at $7,400/month.
          </div>
        </div>
      </div>

      <div style={S.divider} />

      {/* Accounts */}
      <div style={S.section}>
        <div style={S.eyebrow}>The four accounts</div>
        <h2 style={S.h2}>Where your money sits</h2>
        <p style={S.body}>Each account earns a guaranteed interest rate and serves a specific purpose.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "1.5rem" }}>
          <AccountCard id="OA" name="Ordinary Account" rate="2.5%" color="var(--oa)"
            desc="Most flexible. Use for housing, education, or investments. Lowest interest rate — consider keeping it here vs withdrawing."
            tags={["HDB & private housing", "Housing loan", "Education", "Investments"]} />
          <AccountCard id="SA" name="Special Account" rate="4.0%" color="var(--sa)"
            desc="Higher interest, ring-fenced for retirement. Closed at 55 and merged into your Retirement Account."
            tags={["Retirement savings", "Long-term investments"]} />
          <AccountCard id="MA" name="MediSave Account" rate="4.0%" color="var(--ma)"
            desc="Healthcare savings account. Capped at the Basic Healthcare Sum ($75,500 in 2025). Excess flows to SA or RA."
            tags={["Hospitalisation", "MediShield Life", "CareShield Life"]} />
          <AccountCard id="RA" name="Retirement Account" rate="4.0%" color="var(--ra)"
            desc="Created at age 55. Funds CPF LIFE monthly payouts from 65. First $30,000 earns up to 6% with extra interest bonus."
            tags={["Created at 55", "Feeds CPF LIFE", "Up to 6% effective"]} />
        </div>
        <div style={{ ...S.card, marginTop: 12, fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.7 }}>
          <strong style={{ color: "var(--text)" }}>Extra interest bonus:</strong> The first $60,000 of combined CPF balances earns +1% p.a. (capped at $20,000 from OA). Members 55+ earn +2% on first $30,000 → effective rate up to <strong style={{ color: "var(--ra)" }}>6% p.a.</strong>
        </div>
      </div>

      <div style={S.divider} />

      {/* Contribution rates by age */}
      <div style={S.section}>
        <div style={S.eyebrow}>Rates by age</div>
        <h2 style={S.h2}>Contributions taper as you age</h2>
        <p style={S.body}>Total contributions drop over time, giving you more take-home pay in later working years.</p>
        <div style={{ ...S.card, marginTop: "1.5rem", padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
            <thead>
              <tr style={{ background: "var(--bg)" }}>
                <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "1px solid var(--border)", fontWeight: 600, fontSize: 11, color: "var(--muted)", letterSpacing: "0.05em" }}>Age</th>
                <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "1px solid var(--border)", fontWeight: 600, fontSize: 11, color: "var(--muted)" }}>Employee</th>
                <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "1px solid var(--border)", fontWeight: 600, fontSize: 11, color: "var(--muted)" }}>Employer</th>
                <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "1px solid var(--border)", fontWeight: 600, fontSize: 11, color: "var(--muted)" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {ageRows.map((r, i) => (
                <tr key={r.age} style={{ borderBottom: i < ageRows.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td style={{ padding: "10px 14px", fontWeight: 500 }}>{r.age}</td>
                  <td style={{ padding: "10px 14px", textAlign: "right", color: "var(--muted)" }}>{r.emp}%</td>
                  <td style={{ padding: "10px 14px", textAlign: "right", color: "var(--muted)" }}>{r.er}%</td>
                  <td style={{ padding: "10px 14px", textAlign: "right" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <span style={{ display: "inline-block", width: Math.round((r.total / 37) * 64), height: 8, borderRadius: 4, background: "var(--accent)" }} />
                      <strong>{r.total}%</strong>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: 8 }}>Rates effective 1 January 2026 for wages above $750/month.</div>
      </div>

      <div style={S.divider} />

      {/* Retirement Sums */}
      <div style={S.section}>
        <div style={S.eyebrow}>At age 55 · Retirement sums</div>
        <h2 style={S.h2}>BRS, FRS, and ERS explained</h2>
        <p style={S.body}>When your Retirement Account is created at 55, you set aside a "retirement sum." This determines your monthly CPF LIFE payout for life.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "1.5rem" }}>
          {[
            { id: "BRS", name: "Basic Retirement Sum", amount: "$106,500", multi: "1×", color: "var(--ma)", payout: "~$860–$930/mo", note: "Only if you own property with ≥30 years lease remaining. Property acts as pledge/backup." },
            { id: "FRS", name: "Full Retirement Sum", amount: "$213,000", multi: "2×", color: "var(--sa)", payout: "~$1,540–$1,650/mo", note: "The default target. No property pledge required. Most members aim here.", highlight: true },
            { id: "ERS", name: "Enhanced Retirement Sum", amount: "$426,000", multi: "4×", color: "var(--ra)", payout: "~$3,300–$3,500/mo", note: "Maximum voluntary top-up. Raised from 3× to 4× BRS in 2025. Locked in — cannot be withdrawn." },
          ].map(rs => (
            <div key={rs.id} style={{ ...S.card, borderColor: rs.highlight ? "var(--sa)" : "var(--border)", borderWidth: rs.highlight ? 2 : 1 }}>
              {rs.highlight && <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sa)", marginBottom: 6 }}>Most common target</div>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, background: rs.color, color: "#fff", padding: "2px 8px", borderRadius: 20 }}>{rs.id} · {rs.multi} BRS</span>
                  <div style={{ fontWeight: 600, marginTop: 6 }}>{rs.name}</div>
                  <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.4rem", color: rs.color }}>{rs.amount}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, color: "var(--muted)" }}>Monthly payout (est.)</div>
                  <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1rem", color: rs.color }}>{rs.payout}</div>
                </div>
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>{rs.note}</div>
            </div>
          ))}
        </div>
        {/* Visual scale */}
        <div style={{ marginTop: "1.25rem" }}>
          <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", height: 28 }}>
            <div style={{ flex: 1, background: "var(--ma)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>BRS</div>
            <div style={{ flex: 1, background: "var(--sa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>FRS</div>
            <div style={{ flex: 2, background: "var(--ra)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>ERS (4×)</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", textAlign: "center", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
            <span>$106.5K</span><span>$213K</span><span>$426K</span>
          </div>
        </div>
        <div style={{ ...S.card, marginTop: 12, fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.7 }}>
          Retirement sums increase by ~3.5% each year. Your exact figure depends on the year you turn 55. Check your personal target in the MyCPF portal.
        </div>
      </div>

      <div style={S.divider} />

      {/* What happens at 55 */}
      <div style={S.section}>
        <div style={S.eyebrow}>The age-55 sequence</div>
        <h2 style={S.h2}>What happens to your CPF at 55</h2>
        <div style={{ position: "relative", marginTop: "1.5rem" }}>
          <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: "var(--border)" }} />
          {[
            { num: 1, title: "RA is created automatically", detail: "CPF Board opens your Retirement Account on your 55th birthday." },
            { num: 2, title: "SA transfers to RA first", detail: "Your entire Special Account balance moves to RA — up to your chosen retirement sum (BRS/FRS/ERS)." },
            { num: 3, title: "OA fills any shortfall", detail: "If SA alone doesn't cover the retirement sum, OA tops up the difference." },
            { num: 4, title: "SA is permanently closed", detail: "Once transferred, your Special Account closes for good. You cannot reopen it." },
            { num: 5, title: "Excess savings are yours to withdraw", detail: "Any OA/SA savings above the retirement sum can be withdrawn now or any time after." },
            { num: 6, title: "RA earns up to 6% p.a.", detail: "The first $30,000 in your RA earns 4% + 2% extra interest = 6% effective rate." },
          ].map((step, i) => (
            <div key={step.num} style={{ display: "flex", gap: "1rem", marginBottom: i < 5 ? "1.25rem" : 0 }}>
              <div style={{
                width: 42, height: 42, borderRadius: "50%", background: "var(--ra)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 14, color: "#fff", flexShrink: 0, zIndex: 1,
                border: "3px solid var(--bg)",
              }}>{step.num}</div>
              <div style={{ ...S.card, flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{step.title}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>{step.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={S.divider} />

      {/* CPF LIFE */}
      <div style={S.section}>
        <div style={S.eyebrow}>From age 65 · CPF LIFE</div>
        <h2 style={S.h2}>Your lifelong monthly income</h2>
        <p style={S.body}>CPF LIFE (Lifelong Income For the Elderly) is Singapore's national annuity. You pay a premium from your RA and receive monthly payouts — for life.</p>

        {/* Interactive payout estimator */}
        <div style={{ ...S.card, marginTop: "1.5rem" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: 6 }}>Estimate your monthly payout — drag your RA balance</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>RA balance at 65</span>
            <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.1rem" }}>${raBalance.toLocaleString()}</span>
          </div>
          <input type="range" min={80000} max={500000} step={5000} value={raBalance}
            onChange={e => setRaBalance(+e.target.value)}
            style={{ width: "100%", marginBottom: 8, accentColor: "var(--ra)" }} />
          <div style={{ fontSize: 11, background: "var(--bg)", borderRadius: 8, padding: "6px 10px", color: sumLabel.color, fontWeight: 600, marginBottom: "1rem" }}>
            {sumLabel.text}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { name: "Standard Plan", sub: "Highest payout, smaller bequest", pay: stdPay, color: "var(--ra)" },
              { name: "Escalating Plan", sub: "Rises 2%/yr — inflation hedge", pay: escPay, color: "var(--sa)" },
              { name: "Basic Plan", sub: "Lower payout, largest bequest", pay: basicPay, color: "var(--ma)" },
            ].map(plan => (
              <div key={plan.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg)", borderRadius: 10, padding: "10px 12px", border: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: "0.88rem" }}>{plan.name}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{plan.sub}</div>
                </div>
                <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.1rem", color: plan.color }}>~${plan.pay.toLocaleString()}<span style={{ fontFamily: "inherit", fontSize: 11, color: "var(--muted)", fontWeight: 400 }}>/mo</span></div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 8 }}>Illustrative estimates based on CPF's published ranges. Actual payouts vary.</div>
        </div>

        {/* Three plans */}
        <div style={{ marginTop: "1.5rem" }}>
          <div style={{ fontWeight: 600, marginBottom: "0.75rem" }}>Which plan should you choose?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                plan: "Standard", color: "var(--ra)", icon: "💪",
                when: "Best for most people. Highest payout. Bequest = unused premium minus payouts already received. Choose this if you want maximum income.",
              },
              {
                plan: "Escalating", color: "var(--sa)", icon: "📈",
                when: "Starts 10–15% lower than Standard but rises 2%/yr. After ~8–10 years it overtakes Standard. Best if you're worried about inflation in a long retirement.",
              },
              {
                plan: "Basic", color: "var(--ma)", icon: "🎁",
                when: "Lowest payout, largest bequest. Choose if leaving savings to family is the priority and income from other sources covers daily needs.",
              },
            ].map(p => (
              <div key={p.plan} style={{ ...S.card, display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ fontSize: 24 }}>{p.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, color: p.color, marginBottom: 4 }}>{p.plan} Plan</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>{p.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deferral bonus */}
        <div style={{ ...S.card, marginTop: 12, background: "rgba(124,58,237,0.05)", borderColor: "rgba(124,58,237,0.2)" }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>💡 Defer payouts for more money</div>
          <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>
            You can delay CPF LIFE payouts from the default age 65 up to age 70. Every year you defer adds roughly 6–7% to your monthly payout. Deferring 5 years (65→70) boosts payouts by ~35%. Your RA earns 4–6% while you wait.
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {["Age 65: 100%", "Age 67: ~114%", "Age 70: ~135%"].map(t => (
              <div key={t} style={{ flex: 1, background: "var(--card)", borderRadius: 8, padding: "8px", textAlign: "center", fontSize: 11, fontWeight: 500, color: "var(--ra)", border: "1px solid rgba(124,58,237,0.2)" }}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={S.divider} />

      {/* Government support */}
      <div style={S.section}>
        <div style={S.eyebrow}>Government top-ups</div>
        <h2 style={S.h2}>Singapore adds money for you</h2>
        <p style={S.body}>Beyond your own contributions, several schemes top up your CPF — especially if you earn less or are nearing retirement.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "1.5rem" }}>
          {[
            { name: "Workfare Income Supplement (WIS)", who: "For SCs aged 30+ earning ≤ $3,000/month", what: "Cash + CPF top-ups from government. Older workers receive more. Up to ~$4,000+/year.", color: "var(--ma)" },
            { name: "Matched Retirement Savings Scheme (MRSS)", who: "For SCs aged 55–70 below BRS", what: "Government matches every dollar of cash top-up to RA, dollar-for-dollar, up to $2,000/year. Lifetime cap of $20,000.", color: "var(--sa)" },
            { name: "Matched MediSave Scheme (MMSS)", who: "For eligible SCs aged 55–70 below BHS", what: "From 2026: government matches cash top-ups to MediSave, up to $1,000/year.", color: "var(--ma)" },
            { name: "Silver Support Scheme (SSS)", who: "For elderly SCs with low lifetime earnings", what: "Quarterly cash supplements to top up retirement income for those with less.", color: "var(--ra)" },
          ].map(s => (
            <div key={s.name} style={{ ...S.card }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <div style={{ width: 4, minHeight: 40, borderRadius: 2, background: s.color, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: s.color, fontWeight: 500, marginBottom: 4 }}>{s.who}</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>{s.what}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={S.divider} />

      {/* FAQ */}
      <div style={S.section}>
        <div style={S.eyebrow}>Common questions</div>
        <h2 style={S.h2}>Quick answers</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "1.5rem" }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ ...S.card, padding: 0, overflow: "hidden" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%", padding: "1rem", display: "flex", justifyContent: "space-between",
                  alignItems: "center", gap: 8, background: "none", border: "none",
                  cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                }}
              >
                <span style={{ fontWeight: 500, fontSize: "0.88rem", color: "var(--text)" }}>{f.q}</span>
                <span style={{ color: "var(--muted)", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s", fontSize: 20, lineHeight: 1 }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 1rem 1rem", fontSize: "0.84rem", color: "var(--muted)", lineHeight: 1.7 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={S.divider} />

      {/* Tax relief */}
      <div style={S.section}>
        <div style={S.eyebrow}>Tax benefits</div>
        <h2 style={S.h2}>Top up and save on tax</h2>
        <p style={S.body}>Voluntary top-ups to your SA/RA and MediSave give you dollar-for-dollar income tax relief, up to the limits below.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: "1.5rem" }}>
          {[
            { label: "Own SA/RA top-up", amount: "$8,000", detail: "Relief per year on cash top-ups to your own SA (below 55) or RA (55+)" },
            { label: "Family member top-up", amount: "$8,000", detail: "Additional relief for topping up parents', spouse's or siblings' SA/RA" },
            { label: "Own MediSave top-up", amount: "Up to $8,000", detail: "Combined with RSTU relief — total capped at $16,000/year" },
            { label: "MRSS bonus", amount: "Up to $2,000", detail: "Free money from government — matched dollar-for-dollar into your RA (ages 55–70)" },
          ].map(t => (
            <div key={t.label} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "0.9rem" }}>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>{t.label}</div>
              <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.2rem", color: "var(--accent)", marginBottom: 4 }}>{t.amount}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.5 }}>{t.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div style={{ maxWidth: 680, margin: "3rem auto 0", padding: "0 1.25rem" }}>
        <div style={{
          background: "var(--ra)", borderRadius: 20, padding: "2rem 1.5rem",
          textAlign: "center", color: "#fff",
        }}>
          <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.5rem", marginBottom: 8 }}>
            Still have questions?
          </div>
          <div style={{ fontSize: "0.9rem", opacity: 0.85, marginBottom: "1.25rem", lineHeight: 1.6 }}>
            The CPF Assistant in the bottom right corner knows everything — contributions, retirement sums, CPF LIFE plans, housing, MediSave, tax relief, and more.
          </div>
          <button
            onClick={() => {
              const btn = document.querySelector<HTMLButtonElement>('[aria-label="Open CPF assistant"]');
              btn?.click();
            }}
            style={{
              background: "#fff", color: "var(--ra)", border: "none", borderRadius: 10,
              padding: "0.75rem 1.5rem", fontWeight: 600, cursor: "pointer",
              fontSize: "0.95rem", fontFamily: "inherit",
            }}
          >
            💬 Ask the CPF Assistant
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "2.5rem 1.25rem 1rem", fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.8 }}>
        Data sourced from CPF Board (cpf.gov.sg). Figures are 2025 unless noted. This site is for general education — verify personal figures at <a href="https://www.cpf.gov.sg" style={{ color: "var(--sa)", textDecoration: "none" }}>cpf.gov.sg</a> or via the MyCPF app.
      </div>

      <Chatbot />
    </div>
  );
}
