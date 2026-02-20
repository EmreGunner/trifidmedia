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
            opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease", ...style
        }}>{children}</div>
    );
};

const Label = ({ children, color = C.gold }) => (
    <div style={{
        fontSize: 10, fontWeight: 800, letterSpacing: 4, color,
        textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 10
    }}>
        <div style={{ width: 20, height: 2, background: color, borderRadius: 1 }} />
        {children}
    </div>
);

const Bullet = ({ children, icon = "→", color = C.gold, delay = 0 }) => {
    const v = useReveal(delay);
    return (
        <div style={{
            display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0",
            borderBottom: `1px solid ${C.line}`,
            opacity: v ? 1 : 0, transform: v ? "translateX(0)" : "translateX(-12px)",
            transition: "all 0.5s ease"
        }}>
            <span style={{ fontSize: 16, color, fontWeight: 900, flexShrink: 0, marginTop: 1 }}>{icon}</span>
            <span style={{ fontSize: 16, color: C.text, lineHeight: 1.65, fontWeight: 500 }}>{children}</span>
        </div>
    );
};

const WeekCard = ({ week, title, items, color = C.gold, delay = 0 }) => {
    const v = useReveal(delay);
    return (
        <div style={{
            background: C.card, border: `1px solid ${C.line}`, borderTop: `3px solid ${color}`,
            padding: "24px 22px",
            opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease"
        }}>
            <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 42, color, lineHeight: 1, marginBottom: 4 }}>{week}</div>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: C.sub, marginBottom: 16 }}>{title}</div>
            {items.map((it, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: C.text, lineHeight: 1.65 }}>{it}</span>
                </div>
            ))}
        </div>
    );
};

export default function Offer() {
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
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: C.sub, marginTop: 4 }}>COLLABORATION PROPOSAL — PAGE 02</div>
                            </div>
                        </div>
                        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 72, color: C.line, lineHeight: 1, userSelect: "none" }}>02</div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 56px 100px" }}>

                {/* HERO */}
                <Fade delay={100}>
                    <div style={{ marginBottom: 64 }}>
                        <Label color={C.gold}>The Offer</Label>
                        <h1 style={{
                            fontFamily: "'Bebas Neue',cursive", fontSize: 72, lineHeight: 1.05,
                            color: C.white, letterSpacing: 2, margin: "0 0 20px",
                            background: `linear-gradient(90deg, ${C.white} 60%, ${C.gold})`,
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                        }}>
                            EMRE GUNNER<br />× TRIFID MEDIA
                        </h1>
                        <p style={{ fontSize: 20, color: C.text, fontWeight: 500, lineHeight: 1.7, maxWidth: 680 }}>
                            Trifid moves fast and scales creators into real revenue.
                            My focus is making that content <strong style={{ color: C.white }}>measurable, monetizable,</strong> and tied to a repeatable system.
                        </p>
                    </div>
                </Fade>

                {/* WHAT I BRING */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 72 }}>
                    <Fade delay={200}>
                        <div>
                            <Label color={C.goldLt}>What I Bring</Label>
                            <div>
                                {[
                                    { icon: "⚡", text: "Revenue-first short-form engine — content tied directly to leads and pipeline, not vanity metrics" },
                                    { icon: "🤖", text: "AI + competitor intelligence to accelerate creative output and stay ahead of content cycles" },
                                    { icon: "💬", text: "WhatsApp-native conversion systems built for emerging markets where the deal closes in DMs" },
                                    { icon: "🌍", text: "Multilingual growth playbooks across Turkey, MENA, and EU corridors — not copy-paste, truly localized" },
                                    { icon: "📊", text: "Operator mindset: test fast, track hard, kill what doesn't convert, scale what does" },
                                ].map((b, i) => <Bullet key={i} icon={b.icon} color={C.gold} delay={280 + i * 60}>{b.text}</Bullet>)}
                            </div>
                        </div>
                    </Fade>

                    <Fade delay={300}>
                        <div>
                            <Label color={C.blue}>Why This Fits Trifid</Label>
                            <div style={{ background: C.card, border: `1px solid ${C.line}`, padding: 32, marginBottom: 16 }}>
                                <p style={{ fontSize: 16, color: C.text, lineHeight: 1.85, margin: 0 }}>
                                    Trifid already has the audience infrastructure — <strong style={{ color: C.white }}>1.45M followers, 25 countries, 5 branches.</strong>
                                    What's missing is the layer that turns that reach into a quantifiable revenue engine.
                                </p>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, background: C.line }}>
                                {[
                                    { label: "Trifid has", value: "Reach", color: C.gold },
                                    { label: "I add", value: "Revenue", color: C.green },
                                    { label: "Trifid has", value: "Scale", color: C.gold },
                                    { label: "I add", value: "Systems", color: C.green },
                                    { label: "Trifid has", value: "Brand", color: C.gold },
                                    { label: "I add", value: "Conversion", color: C.green },
                                    { label: "Trifid has", value: "Speed", color: C.gold },
                                    { label: "I add", value: "Structure", color: C.green },
                                ].map((x, i) => (
                                    <div key={i} style={{ background: C.card, padding: "14px 18px" }}>
                                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.sub, marginBottom: 4 }}>{x.label}</div>
                                        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 28, color: x.color, letterSpacing: 1 }}>{x.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Fade>
                </div>

                {/* 30-DAY PILOT */}
                <Fade delay={500}>
                    <Label color={C.green}>30-Day Pilot Structure</Label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 3, background: C.line, marginBottom: 24 }}>
                        <WeekCard week="W1" title="Audit & Map"
                            color={C.blue} delay={560}
                            items={["Deep-audit one content vertical", "Map content → lead path", "Identify top 3 conversion gaps"]} />
                        <WeekCard week="W2" title="Launch"
                            color={C.gold} delay={620}
                            items={["Deploy first 30–40 assets", "Activate WhatsApp capture flow", "Set tracking baseline"]} />
                        <WeekCard week="W3" title="Accelerate"
                            color={C.gold} delay={680}
                            items={["Push to 60 total assets", "A/B test hooks and CTAs", "Optimize WhatsApp funnel"]} />
                        <WeekCard week="W4" title="Report & Scale"
                            color={C.green} delay={740}
                            items={["Present qualified conversations", "Show attributed pipeline", "Deliver 3-month scale plan"]} />
                    </div>
                </Fade>

                {/* SUCCESS METRIC */}
                <Fade delay={800}>
                    <div style={{
                        background: C.card, border: `1px solid ${C.line}`,
                        borderLeft: `5px solid ${C.green}`, padding: "28px 36px",
                        display: "flex", justifyContent: "space-between", alignItems: "center"
                    }}>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 4, color: C.green, marginBottom: 10 }}>SUCCESS METRIC</div>
                            <p style={{ fontSize: 20, color: C.white, fontWeight: 700, margin: 0, lineHeight: 1.5 }}>
                                Qualified conversations and attributed revenue — not impressions, not reach.
                            </p>
                        </div>
                        <div style={{
                            fontFamily: "'Bebas Neue',cursive", fontSize: 88, color: C.green + "30", lineHeight: 1,
                            flexShrink: 0, marginLeft: 32
                        }}>30D</div>
                    </div>
                </Fade>

            </div>
        </div>
    );
}