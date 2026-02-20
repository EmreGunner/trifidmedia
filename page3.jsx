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
            opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(18px)",
            transition: "all 0.55s ease", ...style
        }}>{children}</div>
    );
};

const sentences = [
    {
        num: "01",
        text: "3 years at PwC as a Technology Consultant — shipped enterprise automation across financial services, never once pitched a slide deck without a working prototype behind it.",
        tag: "FOUNDATION",
        color: C.blue,
    },
    {
        num: "02",
        text: "Built automation-driven lead systems in real estate and digital services — the kind that run while you sleep and report in the morning.",
        tag: "SYSTEMS",
        color: C.gold,
    },
    {
        num: "03",
        text: "Specialized in WhatsApp-first conversion funnels — because in Turkey, MENA, and the Gulf, the deal doesn't close on a website, it closes in a DM.",
        tag: "MARKET EDGE",
        color: C.green,
    },
    {
        num: "04",
        text: "Combines AI workflows with performance marketing — not as a gimmick, but as a production multiplier that cuts creative cycles from weeks to days.",
        tag: "AI + EXECUTION",
        color: C.purple,
    },
    {
        num: "05",
        text: "Focused on one outcome: turning audience attention into attributable, scalable revenue — then building the systems that make it repeatable.",
        tag: "NORTH STAR",
        color: C.goldLt,
    },
];

export default function CV() {
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
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: C.sub, marginTop: 4 }}>COLLABORATION PROPOSAL — PAGE 03</div>
                            </div>
                        </div>
                        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 72, color: C.line, lineHeight: 1, userSelect: "none" }}>03</div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 56px 100px" }}>

                {/* HEADER */}
                <Fade delay={100}>
                    <div style={{ marginBottom: 64 }}>
                        <div style={{
                            fontSize: 10, fontWeight: 800, letterSpacing: 4, color: C.gold, marginBottom: 16,
                            display: "flex", alignItems: "center", gap: 10
                        }}>
                            <div style={{ width: 20, height: 2, background: C.gold, borderRadius: 1 }} />
                            UNCONVENTIONAL CV
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "flex-end", gap: 24 }}>
                            <div>
                                <h1 style={{
                                    fontFamily: "'Bebas Neue',cursive", fontSize: 80, lineHeight: 1,
                                    color: C.white, letterSpacing: 2, margin: "0 0 16px"
                                }}>EMRE GUNNER</h1>
                                <p style={{ fontSize: 22, color: C.gold, fontWeight: 700, margin: 0, letterSpacing: 1 }}>
                                    Revenue Systems Builder
                                </p>
                            </div>
                            <div style={{ textAlign: "right", paddingBottom: 8 }}>
                                <div style={{ fontSize: 13, color: C.sub, fontWeight: 600, marginBottom: 6 }}>gunneremre.com</div>
                                <div style={{ fontSize: 13, color: C.sub, fontWeight: 600 }}>linkedin.com/in/emregunner</div>
                            </div>
                        </div>
                    </div>
                </Fade>

                {/* RULE */}
                <Fade delay={180}>
                    <div style={{ height: 1, background: `linear-gradient(90deg, ${C.gold}, transparent)`, marginBottom: 56 }} />
                </Fade>

                {/* FIVE SENTENCES */}
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {sentences.map((s, i) => {
                        const v = useReveal(260 + i * 100);
                        return (
                            <div key={i} style={{
                                display: "grid", gridTemplateColumns: "80px 1fr 120px",
                                gap: 0, background: C.card, border: `1px solid ${C.line}`,
                                overflow: "hidden",
                                opacity: v ? 1 : 0, transform: v ? "translateX(0)" : "translateX(-16px)",
                                transition: "all 0.6s ease",
                            }}>
                                {/* Number */}
                                <div style={{
                                    background: s.color + "15", borderRight: `1px solid ${C.line}`,
                                    display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 0"
                                }}>
                                    <span style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 40, color: s.color, lineHeight: 1 }}>
                                        {s.num}
                                    </span>
                                </div>
                                {/* Text */}
                                <div style={{ padding: "32px 36px", display: "flex", alignItems: "center" }}>
                                    <p style={{ fontSize: 18, color: C.text, lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
                                        {s.text}
                                    </p>
                                </div>
                                {/* Tag */}
                                <div style={{
                                    background: s.color + "10", borderLeft: `1px solid ${C.line}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    padding: "32px 16px"
                                }}>
                                    <span style={{
                                        fontSize: 10, fontWeight: 800, letterSpacing: 3, color: s.color,
                                        textAlign: "center", lineHeight: 1.6
                                    }}>{s.tag}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* FOOTER STRIP */}
                <Fade delay={800}>
                    <div style={{
                        marginTop: 48, display: "grid", gridTemplateColumns: "repeat(4,1fr)",
                        gap: 3, background: C.line
                    }}>
                        {[
                            { label: "Experience", value: "PwC + Startups", color: C.blue },
                            { label: "Specialty", value: "Revenue Systems", color: C.gold },
                            { label: "Channels", value: "WhatsApp + Social", color: C.green },
                            { label: "Markets", value: "MENA · TR · EU", color: C.purple },
                        ].map(x => (
                            <div key={x.label} style={{ background: C.card, padding: "22px 24px" }}>
                                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, color: C.sub, marginBottom: 8 }}>{x.label}</div>
                                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 26, color: x.color, letterSpacing: 1 }}>{x.value}</div>
                            </div>
                        ))}
                    </div>
                </Fade>

                {/* CLOSING LINE */}
                <Fade delay={900}>
                    <div style={{
                        marginTop: 3, background: C.card, border: `1px solid ${C.line}`,
                        borderTop: `3px solid ${C.gold}`, padding: "24px 36px",
                        display: "flex", alignItems: "center", justifyContent: "space-between"
                    }}>
                        <p style={{ fontSize: 16, color: C.text, fontWeight: 500, margin: 0, lineHeight: 1.6, maxWidth: 700 }}>
                            Not a hire. A <strong style={{ color: C.white }}>partner-track operator</strong> who builds the revenue layer Trifid's reach deserves — and owns the P&L of the markets they unlock.
                        </p>
                        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 18, color: C.gold, letterSpacing: 3, flexShrink: 0, marginLeft: 32 }}>
                            EMRE GUNNER
                        </div>
                    </div>
                </Fade>

            </div>
        </div>
    );
}