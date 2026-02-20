import { useState, useEffect } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, AreaChart, Area, RadarChart, Radar,
    PolarGrid, PolarAngleAxis, PieChart, Pie, Cell,
} from "recharts";

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const C = {
    bg: "#080808",
    card: "#131313",
    cardB: "#1a1a1a",
    line: "#2a2a2a",
    gold: "#C9A84C",
    goldLt: "#F0CC70",
    white: "#FFFFFF",
    offwht: "#F0EDE6",
    text: "#E8E4DC",    // ← primary body text: always readable
    sub: "#B8B4AC",    // ← secondary text: still very readable
    red: "#FF5A5A",
    green: "#4DD98A",
    blue: "#5AACF0",
    purple: "#A882DF",
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const weeklyPosts = [
    { w: "Oct W1", p: 3, v: 42 }, { w: "Oct W2", p: 5, v: 68 }, { w: "Oct W3", p: 4, v: 55 },
    { w: "Oct W4", p: 6, v: 91 }, { w: "Nov W1", p: 5, v: 74 }, { w: "Nov W2", p: 7, v: 112 },
    { w: "Nov W3", p: 4, v: 58 }, { w: "Nov W4", p: 6, v: 88 }, { w: "Dec W1", p: 8, v: 134 },
    { w: "Dec W2", p: 7, v: 109 }, { w: "Dec W3", p: 5, v: 71 }, { w: "Dec W4", p: 4, v: 52 },
    { w: "Jan W1", p: 6, v: 95 }, { w: "Jan W2", p: 7, v: 118 }, { w: "Jan W3", p: 8, v: 141 },
    { w: "Jan W4", p: 9, v: 168 }, { w: "Feb W1", p: 4, v: 390 }, { w: "Feb W2", p: 6, v: 172 },
    { w: "Feb W3", p: 1, v: 12 },
];

const topPosts = [
    { caption: "Hacks are great, but we are the place to go for anything MARKETING 🥹❤️", likes: 13469, views: 526712, comments: 648, date: "Aug 19, 2023", type: "VIRAL", er: 2.56 },
    { caption: "Saying jokes until our boss laughs 😂 @mahdiishafiei", likes: 21732, views: 290299, comments: 127, date: "Feb 4, 2026", type: "COMEDY", er: 7.48 },
    { caption: "She's got the full character set 😂", likes: 4312, views: 79775, comments: 89, date: "Feb 12, 2026", type: "COMEDY", er: 5.40 },
    { caption: "How long does it usually take to finish a shawarma?", likes: 3100, views: 61223, comments: 62, date: "Feb 11, 2026", type: "FOOD", er: 5.06 },
    { caption: "Who is smarter? 😂", likes: 2260, views: 53181, comments: 11, date: "Feb 5, 2026", type: "COMEDY", er: 4.26 },
    { caption: "The fastest burger eater in the UAE 🍔⚡️ @pickl.mena", likes: 2115, views: 51333, comments: 35, date: "Feb 13, 2026", type: "FOOD", er: 4.12 },
];

const traffic = [
    { name: "Search", pct: 50.41, fill: C.gold },
    { name: "Direct", pct: 37.84, fill: C.blue },
    { name: "Referrals", pct: 8.11, fill: C.green },
    { name: "Social", pct: 2.60, fill: C.purple },
    { name: "Paid", pct: 0.95, fill: C.red },
];

const countries = [
    { flag: "🇮🇳", name: "India", pct: 39.91 },
    { flag: "🇦🇪", name: "UAE", pct: 38.74 },
    { flag: "🇵🇰", name: "Pakistan", pct: 16.26 },
    { flag: "🇹🇷", name: "Turkey", pct: 3.71 },
    { flag: "🇫🇷", name: "France", pct: 0.69 },
];

const radar = [
    { s: "Audience Size", v: 90 }, { s: "Engagement Rate", v: 72 },
    { s: "Content Output", v: 85 }, { s: "Web Traffic", v: 38 },
    { s: "SEO", v: 15 }, { s: "Social→Web Funnel", v: 12 },
];

const TABS = ["OVERVIEW", "INSTAGRAM", "WEBSITE", "CONTENT", "STRATEGY"];
const fmt = n => n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(0)}K` : String(n);

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────

const SectionTitle = ({ children, accent = C.gold }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "48px 0 28px" }}>
        <div style={{ width: 4, height: 28, background: accent, borderRadius: 2, flexShrink: 0 }} />
        <span style={{ fontSize: 22, fontWeight: 800, color: C.white, letterSpacing: 1 }}>{children}</span>
        <div style={{ flex: 1, height: 1, background: C.line, marginLeft: 8 }} />
    </div>
);

const TT = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: "#111", border: `1px solid ${C.line}`, padding: "10px 16px", borderRadius: 4 }}>
            <div style={{ color: C.sub, fontSize: 13, marginBottom: 6 }}>{label}</div>
            {payload.map((p, i) => (
                <div key={i} style={{ color: p.color || C.gold, fontSize: 14, fontWeight: 700 }}>
                    {p.name}: {typeof p.value === "number" && p.value > 999 ? fmt(p.value) : p.value}
                </div>
            ))}
        </div>
    );
};

// ── KPI CARD ─────────────────────────────────────────────────────────────────
const Kpi = ({ label, value, sub, delta, accent = C.gold, delay = 0 }) => {
    const [vis, setVis] = useState(false);
    useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t); }, []);
    return (
        <div style={{
            background: C.card, border: `1px solid ${C.line}`,
            borderTop: `3px solid ${accent}`,
            padding: "28px 24px",
            opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease",
        }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: C.sub, marginBottom: 14, textTransform: "uppercase" }}>{label}</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: C.white, lineHeight: 1, fontFamily: "'Bebas Neue',cursive", letterSpacing: 1 }}>{value}</div>
            {sub && <div style={{ fontSize: 15, color: C.text, marginTop: 10, fontWeight: 500 }}>{sub}</div>}
            {delta !== undefined && (
                <div style={{ fontSize: 15, fontWeight: 700, color: delta > 0 ? C.green : C.red, marginTop: 10 }}>
                    {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}%
                </div>
            )}
        </div>
    );
};

// ── POST ROW ─────────────────────────────────────────────────────────────────
const PostRow = ({ post, rank }) => {
    const typeColor = post.type === "VIRAL" ? C.gold : post.type === "COMEDY" ? C.purple : C.green;
    return (
        <div style={{
            background: C.card, border: `1px solid ${C.line}`,
            padding: "20px 24px",
            display: "grid", gridTemplateColumns: "52px 1fr 130px", gap: 20, alignItems: "center",
        }}>
            <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 36, color: C.gold, lineHeight: 1 }}>#{rank}</div>
            <div>
                <div style={{ fontSize: 15, color: C.white, fontWeight: 600, lineHeight: 1.6, marginBottom: 10 }}>
                    {post.caption.length > 95 ? post.caption.slice(0, 95) + "…" : post.caption}
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: "3px 10px", background: `${typeColor}18`, border: `1px solid ${typeColor}60`, color: typeColor, borderRadius: 3 }}>{post.type}</span>
                    <span style={{ fontSize: 13, color: C.sub }}>{post.date}</span>
                    <span style={{ fontSize: 13, color: C.sub }}>💬 {post.comments} comments</span>
                </div>
            </div>
            <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: C.goldLt, fontFamily: "'Bebas Neue',cursive", lineHeight: 1 }}>{fmt(post.views)}</div>
                <div style={{ fontSize: 13, color: C.sub, marginBottom: 6 }}>views</div>
                <div style={{ fontSize: 15, color: C.green, fontWeight: 700 }}>♥ {fmt(post.likes)}</div>
                <div style={{ fontSize: 13, color: C.text }}>{post.er}% ER</div>
            </div>
        </div>
    );
};

// ── SCORE BAR ─────────────────────────────────────────────────────────────────
const ScoreBar = ({ label, score, color = C.gold, note = "" }) => (
    <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 16, color: C.white, fontWeight: 600 }}>{label}</span>
            <span style={{ fontSize: 18, color, fontWeight: 800 }}>{score}/100</span>
        </div>
        <div style={{ height: 6, background: C.line, borderRadius: 3 }}>
            <div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: 3 }} />
        </div>
        {note && <div style={{ fontSize: 13, color: C.sub, marginTop: 6 }}>{note}</div>}
    </div>
);

// ── ACTION BOARD ─────────────────────────────────────────────────────────────
const ActionBoard = () => {
    const cols = [
        {
            icon: "✓", label: "KEEP DOING", color: C.green,
            desc: "These are working. Lock them in.",
            items: [
                { title: "Comedy-First Reels", body: "7.5% engagement rate — nearly 3× the 2.8% industry average. The boss-jokes format works. Keep the recurring cast. This is your #1 asset." },
                { title: "7+ Posts Per Week", body: "High-output weeks consistently drive more views. Never drop below 4 posts/week. Post daily whenever possible." },
                { title: "Personality-Led Content", body: "@mahdiishafiei appearances drive 2–3× normal view counts. This parasocial equity is rare. Keep recurring faces front and centre." },
            ],
        },
        {
            icon: "+", label: "DO MORE", color: C.gold,
            desc: "Proven signals you're underusing. Scale now.",
            items: [
                { title: "Educational Marketing Content", body: "Your one marketing hacks reel got 526K views and 648 comments — your best post ever. You've made exactly ONE like it in 3 years. Publish 2 per month. This format attracts paying clients." },
                { title: "India Market Activation", body: "India is 39.91% of your website traffic — ahead of the UAE. You've never marketed there. Run a 30-day test with India-contextual posts and a WhatsApp CTA. The audience is already watching." },
                { title: "Cross-Branch Amplification", body: "You have 5 active branches (AU, LB, QR, KW, AR). Coordinate top reel cross-posts across all accounts. This multiplies reach by 3–5× at zero extra production cost." },
            ],
        },
        {
            icon: "✕", label: "STOP DOING", color: C.red,
            desc: "These are silently killing your growth.",
            items: [
                { title: "Sending Followers to Airtable", body: "Your bio link sends 1.45M people to an unbranded Airtable form with no services, no pricing, no proof. Replace it with a real landing page this week. This is your most urgent fix." },
                { title: "Zero Non-Branded SEO", body: "Every keyword you rank for is branded. You rank for nothing a new client would search. 'Social media agency Dubai' — your competitors own that. You don't exist in that search." },
                { title: "Ignoring the Broken Funnel", body: "1.45M followers. Only 2.6% of website visits from social. Fewer than 0.55% of followers ever reach your website. Add clear CTAs to captions, stories, and bio every week." },
            ],
        },
    ];

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3, background: C.line }}>
            {cols.map(col => (
                <div key={col.label} style={{ background: C.card, padding: "32px 28px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: "50%",
                            border: `2px solid ${col.color}`, color: col.color,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 18, fontWeight: 900,
                        }}>{col.icon}</div>
                        <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: 2, color: col.color }}>{col.label}</span>
                    </div>
                    <div style={{ width: 40, height: 3, background: col.color, margin: "12px 0 16px", borderRadius: 2 }} />
                    <p style={{ fontSize: 14, color: C.sub, marginBottom: 28, lineHeight: 1.6 }}>{col.desc}</p>
                    {col.items.map((item, i) => (
                        <div key={i} style={{ borderLeft: `3px solid ${col.color}40`, paddingLeft: 16, marginBottom: 24 }}>
                            <div style={{ fontSize: 16, fontWeight: 700, color: C.white, marginBottom: 8 }}>{item.title}</div>
                            <p style={{ fontSize: 14, color: C.text, lineHeight: 1.75, margin: 0 }}>{item.body}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

// ── TABS ──────────────────────────────────────────────────────────────────────

const OverviewTab = () => (
    <div>
        <SectionTitle>Success Metrics</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            <Kpi label="Instagram Followers" value="1.45M" sub="@trifidmedia" delta={12} delay={0} />
            <Kpi label="Total Posts" value="4,407" sub="Since founding" delay={80} />
            <Kpi label="Avg Reel Views" value="~80K" sub="Per recent post" delta={23} delay={160} />
            <Kpi label="Best Post Views" value="526K" sub="Marketing Hacks reel" accent={C.goldLt} delay={240} />
            <Kpi label="Website Visits / Mo" value="7.89K" sub="January 2026" delta={-15.8} accent={C.blue} delay={320} />
            <Kpi label="Followers : Following" value="62,980×" sub="Only 23 following" accent={C.green} delay={400} />
            <Kpi label="Global Site Rank" value="#2.82M" sub="SimilarWeb" accent={C.sub} delay={480} />
            <Kpi label="Countries Active" value="25+" sub="3 continents, 5 branches" accent={C.goldLt} delay={560} />
        </div>

        <SectionTitle>The Big Picture</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: C.card, border: `1px solid ${C.line}`, padding: 36 }}>
                <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={radar} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                        <PolarGrid stroke={C.line} />
                        <PolarAngleAxis dataKey="s" tick={{ fill: C.text, fontSize: 13, fontWeight: 600 }} />
                        <Radar dataKey="v" stroke={C.gold} fill={C.gold} fillOpacity={0.2} strokeWidth={2} />
                    </RadarChart>
                </ResponsiveContainer>
                <div style={{ textAlign: "center", fontSize: 14, color: C.sub, marginTop: 8 }}>Brand health across 6 dimensions (0–100)</div>
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.line}`, padding: 36 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, color: C.gold, marginBottom: 16 }}>THE ONE-PARAGRAPH VERDICT</div>
                <p style={{ fontSize: 18, color: C.white, fontWeight: 600, lineHeight: 1.8, marginBottom: 20 }}>
                    Trifid has <span style={{ color: C.goldLt }}>1.45M Instagram followers</span> and only <span style={{ color: C.red }}>7,887 website visits per month.</span>
                </p>
                <p style={{ fontSize: 15, color: C.text, lineHeight: 1.85, marginBottom: 20 }}>
                    The creative engine is world-class. The conversion infrastructure doesn't exist. Build it, and Trifid becomes a category-defining agency globally — not just regionally.
                </p>
                <div style={{ height: 1, background: C.line, margin: "24px 0" }} />
                <ScoreBar label="Audience & Reach" score={92} color={C.green} note="Top 1% of regional agencies" />
                <ScoreBar label="Content & Engagement" score={75} color={C.gold} note="Comedy format is class-leading" />
                <ScoreBar label="Lead Gen & Conversion" score={14} color={C.red} note="Critical — no funnel exists" />
            </div>
        </div>

        <SectionTitle>Action Board</SectionTitle>
        <ActionBoard />
    </div>
);

const InstagramTab = () => (
    <div>
        <SectionTitle>Weekly Posting Timeline</SectionTitle>
        <div style={{ background: C.card, border: `1px solid ${C.line}`, padding: 32, marginBottom: 10 }}>
            <p style={{ fontSize: 15, color: C.text, lineHeight: 1.75, marginBottom: 24 }}>
                Posts per week (blue bars) vs. estimated weekly views (gold area). <strong style={{ color: C.white }}>Note Feb W1:</strong> only 4 posts yet 390K+ views — the boss-jokes reel alone drove 290K. Quality beats volume every time.
            </p>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyPosts} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                    <defs>
                        <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={C.gold} stopOpacity={0.25} />
                            <stop offset="95%" stopColor={C.gold} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke={C.line} strokeDasharray="4 4" />
                    <XAxis dataKey="w" tick={{ fill: C.sub, fontSize: 11 }} interval={1} />
                    <YAxis yAxisId="v" orientation="right" tick={{ fill: C.gold, fontSize: 11 }} />
                    <YAxis yAxisId="p" tick={{ fill: C.blue, fontSize: 11 }} domain={[0, 12]} />
                    <Tooltip content={<TT />} />
                    <Area yAxisId="v" type="monotone" dataKey="v" name="Views (K)" stroke={C.gold} strokeWidth={2} fill="url(#gv)" />
                    <Bar yAxisId="p" dataKey="p" name="Posts/wk" fill={`${C.blue}70`} radius={[3, 3, 0, 0]} />
                </AreaChart>
            </ResponsiveContainer>
        </div>

        <SectionTitle>Top Performing Posts</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {topPosts.map((p, i) => <PostRow key={i} post={p} rank={i + 1} />)}
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.gold}`, padding: "20px 28px", marginTop: 10 }}>
            <p style={{ fontSize: 15, color: C.text, lineHeight: 1.8, margin: 0 }}>
                <strong style={{ color: C.white }}>Pattern: </strong>Your top 5 recent posts are all comedy or food — zero agency content. This is fine. The playbook is: 5 entertainment posts, then 1 expert post. That mix attracts followers <em>and</em> clients simultaneously.
            </p>
        </div>

        <SectionTitle>Content Mix</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: C.card, border: `1px solid ${C.line}`, padding: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, color: C.sub, marginBottom: 20 }}>TYPE SPLIT</div>
                <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                        <Pie data={[{ v: 45, f: C.gold }, { v: 28, f: C.blue }, { v: 18, f: C.green }, { v: 9, f: C.purple }]}
                            cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="v" paddingAngle={4}>
                            {[C.gold, C.blue, C.green, C.purple].map((f, i) => <Cell key={i} fill={f} />)}
                        </Pie>
                        <Tooltip formatter={v => `${v}%`} contentStyle={{ background: C.card, border: `1px solid ${C.line}`, fontSize: 13 }} />
                    </PieChart>
                </ResponsiveContainer>
                {[["Comedy / Reaction", 45, C.gold], ["Brand / Sponsored", 28, C.blue], ["Food / Experience", 18, C.green], ["Educational", 9, C.purple]].map(([t, p, c]) => (
                    <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                            <span style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{t}</span>
                        </div>
                        <span style={{ fontSize: 16, color: c, fontWeight: 800 }}>{p}%</span>
                    </div>
                ))}
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.line}`, padding: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, color: C.sub, marginBottom: 20 }}>FORMAT PERFORMANCE</div>
                {[
                    { f: "REELS", views: "~55K", trend: "↑", color: C.green, note: "Every viral post is a Reel. Put all production budget here." },
                    { f: "IGTV", views: "~750", trend: "↓", color: C.red, note: "Legacy format dying. Stop investing here." },
                    { f: "STORIES", views: "—", trend: "→", color: C.sub, note: "Not tracked. Add 3× weekly CTA Stories — quick win." },
                ].map(r => (
                    <div key={r.f} style={{ borderBottom: `1px solid ${C.line}`, paddingBottom: 20, marginBottom: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <span style={{ fontSize: 22, fontFamily: "'Bebas Neue',cursive", color: r.color, letterSpacing: 2 }}>{r.f}</span>
                            <div style={{ textAlign: "right" }}>
                                <span style={{ fontSize: 22, color: C.white, fontWeight: 800 }}>{r.views}</span>
                                <span style={{ fontSize: 22, color: r.color, marginLeft: 16 }}>{r.trend}</span>
                            </div>
                        </div>
                        <p style={{ fontSize: 14, color: C.text, margin: 0, lineHeight: 1.65 }}>{r.note}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const WebsiteTab = () => (
    <div>
        <SectionTitle>Website Performance</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            <Kpi label="Monthly Visits" value="7.89K" sub="January 2026" delta={-15.8} accent={C.blue} delay={0} />
            <Kpi label="Bounce Rate" value="48.1%" sub="Industry avg: ~45%" accent={C.red} delay={80} />
            <Kpi label="Avg Session Time" value="0:48s" sub="Users leave in under 1 min" accent={C.red} delay={160} />
            <Kpi label="Pages Per Visit" value="1.76" sub="Target: 3.0+" accent={C.sub} delay={240} />
            <Kpi label="Social → Web" value="2.6%" sub="From 1.45M followers" accent={C.red} delay={320} />
            <Kpi label="UAE Country Rank" value="#41,178" sub="SimilarWeb" accent={C.blue} delay={400} />
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.line}`, borderLeft: `5px solid ${C.red}`, padding: "24px 32px", margin: "20px 0" }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 4, color: C.red, marginBottom: 12 }}>CRITICAL</div>
            <p style={{ fontSize: 18, color: C.white, fontWeight: 600, lineHeight: 1.8, margin: 0 }}>
                1.45M Instagram followers. 7,887 website visits per month. That means <span style={{ color: C.red, fontWeight: 900 }}>fewer than 0.55% of followers ever visit the website.</span> The funnel doesn't exist — and this is costing Trifid clients every single day.
            </p>
        </div>

        <SectionTitle>Traffic Sources</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: C.card, border: `1px solid ${C.line}`, padding: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, color: C.sub, marginBottom: 20 }}>WHERE VISITORS COME FROM</div>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie data={traffic} cx="50%" cy="50%" innerRadius={55} outerRadius={88} dataKey="pct" paddingAngle={3}>
                            {traffic.map((d, i) => <Cell key={i} fill={d.fill} />)}
                        </Pie>
                        <Tooltip formatter={v => `${v}%`} contentStyle={{ background: C.card, border: `1px solid ${C.line}`, fontSize: 13 }} />
                    </PieChart>
                </ResponsiveContainer>
                {traffic.map(s => (
                    <div key={s.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 10, height: 10, background: s.fill, borderRadius: "50%" }} />
                            <span style={{ fontSize: 15, color: C.text, fontWeight: 500 }}>{s.name}</span>
                        </div>
                        <span style={{ fontSize: 18, color: s.fill, fontWeight: 800 }}>{s.pct}%</span>
                    </div>
                ))}
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.line}`, padding: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, color: C.sub, marginBottom: 20 }}>TOP COUNTRIES</div>
                {countries.map((c, i) => (
                    <div key={c.name} style={{ marginBottom: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                            <span style={{ fontSize: 16, color: C.white, fontWeight: 600 }}>{c.flag} {c.name}</span>
                            <span style={{ fontSize: 18, color: i === 0 ? C.gold : C.text, fontWeight: 800 }}>{c.pct}%</span>
                        </div>
                        <div style={{ height: 6, background: C.line, borderRadius: 3 }}>
                            <div style={{ height: "100%", width: `${c.pct}%`, background: i === 0 ? C.gold : C.blue, borderRadius: 3 }} />
                        </div>
                    </div>
                ))}
                <div style={{ background: `${C.gold}12`, border: `1px solid ${C.gold}35`, padding: "16px 20px", borderRadius: 4, marginTop: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 3, color: C.gold, marginBottom: 8 }}>SIGNAL</div>
                    <p style={{ fontSize: 14, color: C.text, lineHeight: 1.75, margin: 0 }}>
                        India (39.91%) beats UAE (38.74%) as your #1 traffic source — with zero India-targeted marketing. This is an untapped market that's already interested in you.
                    </p>
                </div>
            </div>
        </div>

        <SectionTitle>SEO Audit</SectionTitle>
        <div style={{ background: C.card, border: `1px solid ${C.line}`, padding: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3, background: C.line, marginBottom: 24 }}>
                {[
                    { kw: "trifid media", vol: "1.68K", cpc: "$1.71", intent: "BRANDED", ic: C.gold },
                    { kw: "trifidmedia", vol: "420", cpc: "—", intent: "BRANDED", ic: C.gold },
                    { kw: "trifid", vol: "880", cpc: "$1.36", intent: "MIXED", ic: C.blue },
                    { kw: "trifid media apply", vol: "120", cpc: "—", intent: "JOBS", ic: C.green },
                    { kw: "trifid agency", vol: "110", cpc: "—", intent: "BRANDED", ic: C.gold },
                ].map(k => (
                    <div key={k.kw} style={{ background: C.card, padding: "20px 18px" }}>
                        <div style={{ fontSize: 14, color: C.white, fontWeight: 700, marginBottom: 10 }}>"{k.kw}"</div>
                        <div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>Vol: <span style={{ color: C.gold, fontWeight: 700 }}>{k.vol}</span></div>
                        <div style={{ fontSize: 13, color: C.sub, marginBottom: 14 }}>CPC: <span style={{ color: C.blue, fontWeight: 700 }}>{k.cpc}</span></div>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", background: `${k.ic}18`, border: `1px solid ${k.ic}55`, color: k.ic, borderRadius: 3 }}>{k.intent}</span>
                    </div>
                ))}
            </div>
            <div style={{ background: `${C.red}10`, border: `1px solid ${C.red}30`, padding: "20px 24px", borderRadius: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 3, color: C.red, marginBottom: 10 }}>THE SEO BLIND SPOT</div>
                <p style={{ fontSize: 15, color: C.text, lineHeight: 1.8, margin: 0 }}>
                    Every single keyword Trifid ranks for is branded — people already know the name. You rank for <strong style={{ color: C.white }}>zero category searches</strong> like "social media agency Dubai" or "influencer marketing UAE". Thousands of businesses search for those terms monthly. Right now, your competitors take all of it.
                </p>
            </div>
        </div>
    </div>
);

const ContentTab = () => (
    <div>
        <SectionTitle>Content Pillar Scores</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[
                {
                    icon: "🎭", title: "Comedy & Personality", score: 92, color: C.green,
                    desc: "7.5% avg engagement rate vs 2.8% industry average. The boss-jokes format with recurring personalities is your #1 weapon. Never compromise on this."
                },
                {
                    icon: "🍔", title: "Food & Experience", score: 74, color: C.gold,
                    desc: "Shawarma and burger challenges land well with UAE audiences. Branded integrations feel natural, not sponsored. Maintain this ratio."
                },
                {
                    icon: "📢", title: "Brand Education", score: 28, color: C.red,
                    desc: "Your best post ever (526K views, 648 comments) was one educational reel. You've made exactly ONE like it in 3 years. Fix this. 2 per month minimum."
                },
                {
                    icon: "🤳", title: "Influencer Collabs", score: 65, color: C.gold,
                    desc: "Strong relationships exist. But collabs are sporadic. Build a monthly recurring schedule — results compound with each appearance."
                },
                {
                    icon: "🏢", title: "B2B Agency Positioning", score: 15, color: C.red,
                    desc: "Almost zero content shows what Trifid does as an agency. No case studies. No results. The Instagram brand and the agency brand feel completely disconnected."
                },
                {
                    icon: "🔗", title: "CTA & Conversion", score: 12, color: C.red,
                    desc: "1.45M followers. Almost no calls-to-action. No funnels. No lead magnets. The single most urgent improvement in this entire audit."
                },
            ].map(c => (
                <div key={c.title} style={{ background: C.card, border: `1px solid ${C.line}`, padding: 28 }}>
                    <div style={{ fontSize: 38, marginBottom: 14 }}>{c.icon}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 16, color: C.white, fontWeight: 700 }}>{c.title}</span>
                        <span style={{ fontSize: 28, color: c.color, fontFamily: "'Bebas Neue',cursive" }}>{c.score}/100</span>
                    </div>
                    <div style={{ height: 5, background: C.line, borderRadius: 3, marginBottom: 16 }}>
                        <div style={{ height: "100%", width: `${c.score}%`, background: c.color, borderRadius: 3 }} />
                    </div>
                    <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8, margin: 0 }}>{c.desc}</p>
                </div>
            ))}
        </div>

        <SectionTitle>Posting Frequency (Last 14 Weeks)</SectionTitle>
        <div style={{ background: C.card, border: `1px solid ${C.line}`, padding: 32 }}>
            <p style={{ fontSize: 15, color: C.text, lineHeight: 1.75, marginBottom: 24 }}>
                <strong style={{ color: C.green }}>Green = 7+ posts.</strong> <strong style={{ color: C.gold }}>Gold = 4–6 posts.</strong> <strong style={{ color: C.red }}>Red = under 4 posts.</strong> Red weeks trigger algorithm suppression — recovery can take 7–10 days.
            </p>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyPosts.slice(-14)}>
                    <CartesianGrid stroke={C.line} strokeDasharray="4 4" />
                    <XAxis dataKey="w" tick={{ fill: C.sub, fontSize: 11 }} />
                    <YAxis tick={{ fill: C.sub, fontSize: 11 }} domain={[0, 12]} />
                    <Tooltip content={<TT />} />
                    <Bar dataKey="p" name="Posts/Week" radius={[4, 4, 0, 0]}>
                        {weeklyPosts.slice(-14).map((d, i) => (
                            <Cell key={i} fill={d.p >= 7 ? C.green : d.p >= 4 ? C.gold : C.red} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const StrategyTab = () => (
    <div>
        <SectionTitle>Strategic Recommendations</SectionTitle>
        {[
            {
                p: "P1", urgency: "THIS WEEK", color: C.red,
                title: "Replace the bio link with a real landing page",
                why: "You're sending 1.45M followers to an Airtable form. No branding, no services, no prices, no proof. Replace it this week — this is costing you clients right now.",
                actions: ["Build a one-page site: services, pricing, 3 client logos, 1 case study video, clear contact form", "Add social proof above the fold — followers, countries, client names", "A/B test two versions: one for brands, one for creators", "Add UTM tracking to every Instagram CTA from day one"]
            },
            {
                p: "P1", urgency: "THIS MONTH", color: C.red,
                title: "Launch a non-branded SEO program",
                why: "You rank for zero category keywords. Businesses searching 'social media agency Dubai' find your competitors, not you.",
                actions: ["Target 10 category keywords: 'social media agency Dubai', 'influencer marketing UAE', 'content production Middle East'", "Publish 2 long-form blog posts per month (1,500+ words)", "Create a Case Studies page — one real case study beats 90% of competitor sites", "Goal: page 1 ranking for 3 category keywords within 6 months"]
            },
            {
                p: "P2", urgency: "30 DAYS", color: C.gold,
                title: "Start the Marketing Decoded educational series",
                why: "One educational reel got 526K views and 648 comments — your best post ever. You've published exactly one like it in 3 years.",
                actions: ["Schedule 2 educational reels per month — agency secrets, marketing tips, campaign breakdowns", "Follow the proven formula: hook in 2 seconds, fast pacing, text overlays, real insight", "Track leads from these posts specifically — they attract clients, not just followers", "Repurpose top performers to LinkedIn where B2B decision-makers search"]
            },
            {
                p: "P2", urgency: "30 DAYS", color: C.gold,
                title: "Activate the India market",
                why: "India is 39.91% of your website traffic — your biggest source — with zero India-targeted marketing.",
                actions: ["Run a Stories poll: 'Where are you from?' to understand the audience", "If client interest: create India-specific landing page with local context and INR pricing", "If talent interest: build a creator pipeline for Indian market", "Test 4 India-contextual posts over 30 days and compare engagement vs. UAE content"]
            },
            {
                p: "P3", urgency: "60 DAYS", color: C.blue,
                title: "Redesign the website to retain visitors",
                why: "48-second average session. People arrive and leave. There's no reason to explore and no clear next step.",
                actions: ["Homepage: 30-second showreel → services → social proof → single CTA", "Add a portfolio with 6–8 campaigns showing measurable results", "Add live chat or WhatsApp — high-intent visitors need instant responses", "Target: 2+ minute sessions and 3+ pages per visit within 90 days"]
            },
            {
                p: "P3", urgency: "60 DAYS", color: C.blue,
                title: "Build the recurring influencer collab calendar",
                why: "Mahdi Shafiei appearances drive 2–3× normal view counts. It's proven. But it happens sporadically — availability-based, not strategy-based.",
                actions: ["Lock in 2 recurring monthly collab shoots regardless of schedule pressure", "Create a 'Trifid Cast' — named recurring characters with consistent presence", "Cross-post top collabs across all 5 branch accounts for free amplification", "Measure ER per collab — back the highest-performing talent, not the highest follower count"]
            },
        ].map(r => (
            <div key={r.title} style={{ background: C.card, border: `1px solid ${C.line}`, borderLeft: `5px solid ${r.color}`, padding: "28px 32px", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, padding: "4px 12px", background: `${r.color}20`, border: `1px solid ${r.color}60`, color: r.color, borderRadius: 3 }}>{r.p}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, padding: "4px 12px", background: `${r.color}20`, border: `1px solid ${r.color}60`, color: r.color, borderRadius: 3 }}>{r.urgency}</span>
                    <span style={{ fontSize: 18, color: C.white, fontWeight: 700 }}>{r.title}</span>
                </div>
                <p style={{ fontSize: 14, color: C.sub, lineHeight: 1.75, fontStyle: "italic", marginBottom: 20, paddingLeft: 14, borderLeft: `2px solid ${C.line}` }}>
                    Why: {r.why}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {r.actions.map((a, i) => (
                        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: r.color, marginTop: 7, flexShrink: 0 }} />
                            <span style={{ fontSize: 14, color: C.text, lineHeight: 1.75 }}>{a}</span>
                        </div>
                    ))}
                </div>
            </div>
        ))}

        <SectionTitle>90-Day Roadmap</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3, background: C.line }}>
            {[
                { phase: "PHASE 01", days: "Days 1–30", color: C.red, goals: ["New landing page — remove Airtable link", "UTM tracking across all Instagram CTAs", "First 2 SEO blog posts published", "Launch Marketing Decoded series", "India audience survey via Stories"] },
                { phase: "PHASE 02", days: "Days 31–60", color: C.gold, goals: ["India-specific landing page live", "Website redesign kickoff", "2 recurring monthly collab shoots locked in", "Backlink outreach — 5 UAE/MENA publications", "WhatsApp / live chat on website"] },
                { phase: "PHASE 03", days: "Days 61–90", color: C.green, goals: ["Website A/B test on CTAs", "SEO ranking review — double down on gains", "Top content coordinated across all 5 branches", "Full KPI review against targets", "Kill what didn't work. Scale what did."] },
            ].map(ph => (
                <div key={ph.phase} style={{ background: C.card, padding: "32px 28px" }}>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 34, color: ph.color, letterSpacing: 3, lineHeight: 1 }}>{ph.phase}</div>
                    <div style={{ fontSize: 14, color: C.sub, fontWeight: 600, marginBottom: 24, marginTop: 6 }}>{ph.days}</div>
                    {ph.goals.map((g, i) => (
                        <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                            <div style={{ width: 7, height: 7, background: ph.color, borderRadius: "50%", marginTop: 7, flexShrink: 0 }} />
                            <span style={{ fontSize: 14, color: C.text, lineHeight: 1.7 }}>{g}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>

        <SectionTitle>90-Day KPI Targets</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[
                { label: "WEBSITE VISITS / MONTH", now: "7.89K", goal: "25K+", color: C.blue },
                { label: "SOCIAL → WEBSITE TRAFFIC", now: "2.6%", goal: "15%", color: C.gold },
                { label: "AVG SESSION DURATION", now: "0:48s", goal: "2:00+", color: C.green },
                { label: "NON-BRANDED KEYWORDS", now: "0", goal: "5+ P.1", color: C.gold },
                { label: "INSTAGRAM FOLLOWERS", now: "1.45M", goal: "1.65M+", color: C.green },
                { label: "PAGES PER VISIT", now: "1.76", goal: "3.0+", color: C.blue },
            ].map(k => (
                <div key={k.label} style={{ background: C.card, border: `1px solid ${C.line}`, padding: "24px 26px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: C.sub, marginBottom: 14 }}>{k.label}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 22, color: C.sub, fontFamily: "'Bebas Neue',cursive" }}>{k.now}</span>
                        <span style={{ fontSize: 22, color: C.line }}>→</span>
                        <span style={{ fontSize: 36, color: k.color, fontFamily: "'Bebas Neue',cursive", fontWeight: 900 }}>{k.goal}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// ── APP ───────────────────────────────────────────────────────────────────────
export default function Dashboard() {
    const [tab, setTab] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        setTimeout(() => setReady(true), 80);
    }, []);

    const panels = [<OverviewTab />, <InstagramTab />, <WebsiteTab />, <ContentTab />, <StrategyTab />];

    return (
        <div style={{
            minHeight: "100vh", background: C.bg, color: C.white,
            fontFamily: "'Inter',sans-serif", opacity: ready ? 1 : 0, transition: "opacity 0.5s ease"
        }}>

            {/* STICKY HEADER */}
            <div style={{
                position: "sticky", top: 0, zIndex: 100,
                background: C.bg + "F6", backdropFilter: "blur(20px)",
                borderBottom: `1px solid ${C.line}`
            }}>
                <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 40px" }}>

                    {/* Bismillah */}
                    <div style={{
                        padding: "8px 0", textAlign: "center", fontSize: 13,
                        color: C.gold + "B0", borderBottom: `1px solid ${C.line}30`
                    }}>
                        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </div>

                    {/* Brand + Tags */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ width: 4, height: 42, background: C.gold, borderRadius: 2 }} />
                            <div>
                                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 30, letterSpacing: 5, color: C.white, lineHeight: 1 }}>
                                    TRIFID MEDIA
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, color: C.sub, marginTop: 4 }}>
                                    MARKETING AUDIT — FEBRUARY 2026
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            {[["INSTAGRAM", C.green], ["WEBSITE", C.blue], ["STRATEGY", C.gold]].map(([l, c]) => (
                                <span key={l} style={{
                                    fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: "5px 12px",
                                    border: `1.5px solid ${c}`, color: c, background: `${c}12`, borderRadius: 3
                                }}>{l}</span>
                            ))}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: "flex", borderTop: `1px solid ${C.line}` }}>
                        {TABS.map((t, i) => (
                            <button key={t} onClick={() => setTab(i)} style={{
                                background: "none", border: "none", cursor: "pointer", outline: "none",
                                padding: "14px 28px", fontSize: 13, fontWeight: tab === i ? 700 : 500,
                                letterSpacing: 2, color: tab === i ? C.gold : C.sub,
                                borderBottom: tab === i ? `3px solid ${C.gold}` : "3px solid transparent",
                                marginBottom: -1, transition: "all 0.2s",
                            }}>{t}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* PAGE CONTENT */}
            <div style={{ maxWidth: 1360, margin: "0 auto", padding: "40px 40px 100px" }}>
                {panels[tab]}
            </div>

            {/* FOOTER */}
            <div style={{
                borderTop: `1px solid ${C.line}`, padding: "20px 40px", textAlign: "center",
                fontSize: 12, fontWeight: 600, color: C.sub, letterSpacing: 2
            }}>
                TRIFID MEDIA — CONFIDENTIAL — DATA: INSTAGRAM + SIMILARWEB — FEB 2026
            </div>
        </div>
    );
}