import { useState, useEffect } from "react";

const C = {
    bg: "#080808", card: "#131313", cardB: "#1a1a1a", line: "#2a2a2a",
    gold: "#C9A84C", goldLt: "#F0CC70", white: "#FFFFFF",
    text: "#E8E4DC", sub: "#B8B4AC",
    red: "#FF5A5A", green: "#4DD98A", blue: "#5AACF0", purple: "#A882DF",
};

const useReveal = (delay = 0) => {
    const [v, setV] = useState(false);
    useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, []);
    return v;
};

const Fade = ({ children, delay = 0, style = {} }) => {
    const v = useReveal(delay);
    return (
        <div style={{
            opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.55s ease", ...style
        }}>{children}</div>
    );
};

const phases = [
    {
        num: "01",
        range: "Month 1 – 3",
        title: "PROVE THE\nPLAYBOOK",
        role: "Content Operator",
        color: C.blue,
        headline: "Deploy fast. Win fast. Show what a revenue-first content system looks like inside Trifid.",
        deliverables: [
            "High-volume short-form content across one assigned vertical",
            "WhatsApp capture flow live and tracking within 30 days",
            "Content → lead attribution map built from day one",
            "First 3–5 qualified conversations tied to content",
            "Weekly performance dashboard shared with leadership",
        ],
        kpis: [
            { label: "Attributed leads", value: "10+" },
            { label: "Content output", value: "60+/mo" },
            { label: "System uptime", value: "100%" },
        ],
        outcome: "A repeatable content-to-revenue playbook that Trifid can deploy across any vertical or market.",
    },
    {
        num: "02",
        range: "Month 4 – 6",
        title: "OWN A\nVERTICAL",
        role: "Vertical Lead / Mini P&L Owner",
        color: C.gold,
        headline: "Stop executing the playbook. Start owning the P&L of one revenue vertical end to end.",
        deliverables: [
            "Full ownership of one revenue vertical — content, leads, pipeline",
            "SOPs written, documented, and stress-tested with junior team",
            "First two junior operators trained and running independently",
            "Revenue reporting tied directly to content activity",
            "Monthly optimization cycle: kill losers, double winners",
        ],
        kpis: [
            { label: "Vertical revenue", value: "Measurable" },
            { label: "Juniors trained", value: "2+" },
            { label: "SOPs shipped", value: "5+" },
        ],
        outcome: "Trifid gets a self-running revenue vertical. I get proof of the operator-to-partner track.",
    },
    {
        num: "03",
        range: "Month 7 – 12",
        title: "LAUNCH A\nMARKET",
        role: "Country-Level Operator → Partner",
        color: C.green,
        headline: "Take the proven system into Turkey or a MENA corridor. Build Trifid's next market from scratch.",
        deliverables: [
            "New market launch: Turkey or target MENA corridor identified by Month 6",
            "Local partnership network secured — creators, brands, distribution",
            "Localized content + conversion system running in-market",
            "Country-level P&L owned independently with agreed margin split",
            "Transition structure from operator to equity / revenue-share partner formalized",
        ],
        kpis: [
            { label: "Market live by", value: "Month 9" },
            { label: "Partnerships", value: "3+ signed" },
            { label: "Revenue share", value: "Agreed" },
        ],
        outcome: "Trifid expands into a new geography. I transition from operator to country-level partner with skin in the game.",
    },
];

const Metric = ({ label, value, color }) => (
    <div style={{
        background: color + "10", border: `1px solid ${color}30`,
        padding: "14px 18px", textAlign: "center"
    }}>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 30, color, lineHeight: 1, marginBottom: 4 }}>{value}</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.sub, letterSpacing: 2 }}>{label}</div>
    </div>
);

export default function Roadmap() {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        const l = document.createElement("link");
        l.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&display=swap";
        l.rel = "stylesheet"; document.head.appendChild(l);
        setTimeout(() => setReady(true), 80);
    }, []);

    return (
        <div style={{
            minHeight: "100vh", background: C.bg, color: C.white,
            fontFamily: "'Inter',sans-serif", opacity: ready ? 1 : 0, transition: "opacity 0.5s ease"
        }}>

            {/* TOP BAR */}
            <div style={{
                borderBottom: `1px solid ${C.line}`, padding: "0 56px",
                background: C.bg + "F6", backdropFilter: "blur(20px)"
            }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{
                        padding: "8px 0", textAlign: "center", fontSize: 13,
                        color: C.gold + "B0", borderBottom: `1px solid ${C.line}30`
                    }}>
                        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ width: 4, height: 42, background: C.gold, borderRadius: 2 }} />
                            <div>
                                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 28, letterSpacing: 5, color: C.white, lineHeight: 1 }}>TRIFID MEDIA</div>
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: C.sub, marginTop: 4 }}>COLLABORATION PROPOSAL — PAGE 04</div>
                            </div>
                        </div>
                        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 72, color: C.line, lineHeight: 1, userSelect: "none" }}>04</div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 56px 100px" }}>

                {/* HERO */}
                <Fade delay={100}>
                    <div style={{ marginBottom: 64 }}>
                        <div style={{
                            fontSize: 10, fontWeight: 800, letterSpacing: 4, color: C.gold, marginBottom: 16,
                            display: "flex", alignItems: "center", gap: 10
                        }}>
                            <div style={{ width: 20, height: 2, background: C.gold, borderRadius: 1 }} />
                            12-MONTH ROADMAP
                        </div>
                        <h1 style={{
                            fontFamily: "'Bebas Neue',cursive", fontSize: 72, lineHeight: 1.05,
                            color: C.white, letterSpacing: 2, margin: "0 0 20px"
                        }}>
                            FROM OPERATOR<br />TO COUNTRY PARTNER
                        </h1>
                        <p style={{ fontSize: 18, color: C.text, fontWeight: 500, lineHeight: 1.7, maxWidth: 660, margin: 0 }}>
                            Three phases. Clear ownership at each stage. Every transition unlocked by measurable outcomes — not time served.
                        </p>
                    </div>
                </Fade>

                {/* TIMELINE BAR */}
                <Fade delay={160}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3, background: C.line, marginBottom: 3 }}>
                        {phases.map(ph => (
                            <div key={ph.num} style={{
                                background: ph.color + "15", padding: "12px 20px",
                                display: "flex", justifyContent: "space-between", alignItems: "center"
                            }}>
                                <span style={{ fontSize: 12, fontWeight: 800, color: ph.color, letterSpacing: 2 }}>{ph.range}</span>
                                <span style={{ fontSize: 12, fontWeight: 600, color: C.sub }}>{ph.role}</span>
                            </div>
                        ))}
                    </div>
                    {/* Progress bar */}
                    <div style={{ height: 6, background: C.line, borderRadius: 3, marginBottom: 48, overflow: "hidden" }}>
                        <div style={{
                            height: "100%", width: "100%",
                            background: `linear-gradient(90deg, ${C.blue} 0%, ${C.gold} 50%, ${C.green} 100%)`,
                            borderRadius: 3
                        }} />
                    </div>
                </Fade>

                {/* PHASES */}
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {phases.map((ph, pi) => {
                        const v = useReveal(200 + pi * 120);
                        return (
                            <div key={ph.num} style={{
                                display: "grid", gridTemplateColumns: "180px 1fr",
                                background: C.card, border: `1px solid ${C.line}`,
                                overflow: "hidden",
                                opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)",
                                transition: "all 0.6s ease",
                            }}>
                                {/* LEFT PANEL */}
                                <div style={{
                                    background: ph.color + "10", borderRight: `1px solid ${C.line}`,
                                    padding: "36px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between"
                                }}>
                                    <div>
                                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, color: ph.color, marginBottom: 10 }}>PHASE</div>
                                        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 80, color: ph.color, lineHeight: 1, marginBottom: 16 }}>{ph.num}</div>
                                        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 24, color: C.white, lineHeight: 1.2, whiteSpace: "pre-line" }}>
                                            {ph.title}
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 24, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: C.sub }}>
                                        {ph.range}
                                    </div>
                                </div>

                                {/* RIGHT PANEL */}
                                <div style={{ padding: "36px 40px" }}>
                                    <p style={{ fontSize: 16, color: C.white, fontWeight: 700, lineHeight: 1.65, marginBottom: 28, margin: "0 0 28px" }}>
                                        {ph.headline}
                                    </p>

                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                                        {/* Deliverables */}
                                        <div>
                                            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, color: C.sub, marginBottom: 16 }}>DELIVERABLES</div>
                                            {ph.deliverables.map((d, i) => (
                                                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                                                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: ph.color, marginTop: 7, flexShrink: 0 }} />
                                                    <span style={{ fontSize: 14, color: C.text, lineHeight: 1.65 }}>{d}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* KPIs + Outcome */}
                                        <div>
                                            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, color: C.sub, marginBottom: 16 }}>TARGET METRICS</div>
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 3, marginBottom: 24 }}>
                                                {ph.kpis.map((k, i) => <Metric key={i} label={k.label} value={k.value} color={ph.color} />)}
                                            </div>
                                            <div style={{ background: ph.color + "12", border: `1px solid ${ph.color}30`, padding: "16px 18px" }}>
                                                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, color: ph.color, marginBottom: 8 }}>OUTCOME</div>
                                                <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, margin: 0 }}>{ph.outcome}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CLOSING THESIS */}
                <Fade delay={700}>
                    <div style={{ marginTop: 3, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, background: C.line }}>
                        <div style={{ background: C.card, padding: "32px 36px", borderTop: `3px solid ${C.gold}` }}>
                            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 4, color: C.gold, marginBottom: 16 }}>THE DEAL STRUCTURE</div>
                            <p style={{ fontSize: 16, color: C.text, fontWeight: 500, lineHeight: 1.8, margin: 0 }}>
                                Month 1–3: wage-based. Prove the system works.<br />
                                Month 4–6: vertical P&amp;L ownership with performance upside.<br />
                                Month 7–12: country-level revenue share. Partner, not employee.
                            </p>
                        </div>
                        <div style={{ background: C.card, padding: "32px 36px", borderTop: `3px solid ${C.green}` }}>
                            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 4, color: C.green, marginBottom: 16 }}>WHY THIS WORKS FOR TRIFID</div>
                            <p style={{ fontSize: 16, color: C.text, fontWeight: 500, lineHeight: 1.8, margin: 0 }}>
                                Zero risk in Phase 1 — performance-gated progression means Trifid only deepens commitment when results are proven. Every phase delivers standalone value even if the roadmap stops there.
                            </p>
                        </div>
                    </div>
                </Fade>

                {/* FINAL LINE */}
                <Fade delay={820}>
                    <div style={{
                        marginTop: 3, background: C.card, border: `1px solid ${C.line}`,
                        padding: "22px 36px", display: "flex", alignItems: "center", justifyContent: "space-between"
                    }}>
                        <p style={{ fontSize: 18, color: C.white, fontWeight: 700, margin: 0 }}>
                            Ready to start Week 1 of Phase 1 whenever Trifid is.
                        </p>
                        <div style={{ display: "flex", gap: 3 }}>
                            {[["Phase 1", C.blue], ["Phase 2", C.gold], ["Phase 3", C.green]].map(([l, c]) => (
                                <div key={l} style={{ padding: "8px 20px", background: `${c}15`, border: `1px solid ${c}40` }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: c }}>{l}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Fade>

            </div>
        </div>
    );
}