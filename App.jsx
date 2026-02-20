import { useState } from "react";
import Dashboard from "./dashboard.jsx";
import Offer from "./page2.jsx";
import CV from "./page3.jsx";
import Roadmap from "./page4.jsx";
import PdfPage from "./PdfPage.jsx";

const C = {
    bg: "#080808",
    card: "#131313",
    line: "#2a2a2a",
    gold: "#C9A84C",
    white: "#FFFFFF",
    sub: "#B8B4AC",
};

const TABS = [
    { id: "dashboard", label: "DASHBOARD", component: <Dashboard /> },
    { id: "offer", label: "THE OFFER", component: <Offer /> },
    { id: "cv", label: "UNCONVENTIONAL CV", component: <CV /> },
    { id: "roadmap", label: "ROADMAP", component: <Roadmap /> },
    { id: "report", label: "AUDIT REPORT", component: <PdfPage /> },
];

export default function App() {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div style={{
            minHeight: "100vh",
            background: C.bg,
            color: C.white,
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* GLOBAL NAVIGATION */}
            <div style={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                background: C.bg + "F6",
                backdropFilter: "blur(20px)",
                borderBottom: `2px solid ${C.gold}`,
                padding: "0 40px"
            }}>
                <div style={{
                    maxWidth: 1360,
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 0" }}>
                        <div style={{ width: 3, height: 30, background: C.gold, borderRadius: 2 }} />
                        <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 24, letterSpacing: 3 }}>
                            TRIFID MEDIA HUB
                        </span>
                    </div>

                    <div style={{ display: "flex" }}>
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "24px 20px",
                                    fontSize: 12,
                                    fontWeight: 800,
                                    letterSpacing: 2,
                                    color: activeTab === tab.id ? C.gold : C.sub,
                                    borderBottom: activeTab === tab.id ? `4px solid ${C.gold}` : "4px solid transparent",
                                    transition: "all 0.2s",
                                    marginTop: 4
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <main>
                {TABS.find(t => t.id === activeTab).component}
            </main>
        </div>
    );
}
