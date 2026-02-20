export default function PdfPage() {
    return (
        <div style={{
            height: "calc(100vh - 80px)",
            width: "100%",
            background: "#080808",
            display: "flex",
            flexDirection: "column"
        }}>
            <div style={{
                padding: "20px 40px",
                background: "#131313",
                borderBottom: "1px solid #2a2a2a",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#C9A84C", letterSpacing: 2 }}>
                    TRIFID_MEDIA_AUDIT_REPORT.PDF
                </span>
                <a
                    href="/Trifid_Media_Audit_Report.pdf"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        fontSize: 12,
                        color: "#B8B4AC",
                        textDecoration: "none",
                        padding: "6px 16px",
                        border: "1px solid #2a2a2a",
                        borderRadius: 4
                    }}
                >
                    OPEN IN NEW TAB ↗
                </a>
            </div>
            <iframe
                src="/Trifid_Media_Audit_Report.pdf"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Trifid Media Audit Report"
            />
        </div>
    );
}
