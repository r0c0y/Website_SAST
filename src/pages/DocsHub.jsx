/* eslint-disable react/prop-types */
import React from "react"
import { useState, useMemo } from "react";
import { Link, Routes, Route, useLocation, useParams, Navigate } from "react-router-dom";

/* ------------------ spacing + helpers ------------------ */
const S = {
  pagePadX: "1.5rem",
  headerTop: "3rem",
  headerBottom: "2rem",
  headerPad: "2rem",
  cardRadius: "1.25rem",

  // sidebar
  sidebarMaxW: 280,   
  sidebarPad: "20px",
  listGap: "10px",

  // main content
  mainPad: "22px",
  mainMinH: "60vh",
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  paddingLeft: S.pagePadX,
  paddingRight: S.pagePadX,
};

const cn = (...c) => c.filter(Boolean).join(" ");

/* ------------------ placeholder docs (wire loader later) ------------------ */
const FALLBACK_DOCS = [
  { id: "about-sast", title: "About SAST", summary: "Community-first, open-source-first, and our goals.", html: "<p>Content coming soon…</p>" },
  { id: "guidelines", title: "Guidelines", summary: "Expectations while collaborating at SAST.", html: "<p>Content coming soon…</p>" },
  { id: "community-roles", title: "Community Roles", summary: "Roles and responsibilities across teams.", html: "<p>Content coming soon…</p>" },
];

/* ------------------ header ------------------ */
function DocsHeader() {
  return (
    <header
      className="relative w-full overflow-hidden border border-white/10 bg-white/5 shadow-[0_0_25px_rgba(0,0,0,0.35)]"
      style={{ marginTop: S.headerTop, marginBottom: S.headerBottom, padding: S.headerPad, borderRadius: S.cardRadius }}
    >
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(80% 60% at 10% 0%, rgba(16,185,129,.28), rgba(16,185,129,0) 60%), radial-gradient(80% 60% at 90% 0%, rgba(34,211,238,.28), rgba(34,211,238,0) 60%)",
          filter: "blur(24px)",
        }}
      />
      <div className="text-emerald-200/90 font-semibold" style={{ marginBottom: "6px" }}>
        Docs
      </div>
      <h1 className="text-white font-extrabold leading-tight tracking-[-0.02em]"
          style={{ fontSize: "38px", lineHeight: 1.1, margin: 0 }}>
        Community Handbook
      </h1>
      <p className="text-white/75"
         style={{ marginTop: "1rem", fontSize: "20px", lineHeight: 1.5, maxWidth: "70ch" }}>
        Your guide to contributing and learning with SAST.
      </p>
      <div
        className="bg-gradient-to-r from-cyan-500 to-emerald-500"
        style={{ height: "4px", width: "100%", borderRadius: "9999px", marginTop: "1rem", maxWidth: "680px" }}
      />
      <div className="flex flex-wrap items-center" style={{ gap: "10px", marginTop: "12px" }}>
        {["Open Source", "Guides", "Best Practices"].map((tag) => (
          <span
            key={tag}
            className="border border-white/15 bg-white/5 text-white/90 backdrop-blur"
            style={{ padding: "6px 12px", fontSize: "14px", borderRadius: "12px" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </header>
  );
}

/* ------------------ sidebar ------------------ */
function DocsSidebar({ docs, query, setQuery, activeId }) {
  return (
    <aside
      className="border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.25)]"
      style={{
        width: "100%",
        maxWidth: `${S.sidebarMaxW}px`,
        padding: S.sidebarPad,
        position: "sticky",
        top: "6.5rem",
        height: "calc(100vh - 8rem)",
        overflowY: "auto",
        borderRadius: S.cardRadius,
      }}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search in docs..."
        className="border border-white/15 bg-white/5 text-white/90 placeholder-white/50 outline-none hover:border-white/25 focus:border-white/30 w-full"
        style={{ padding: "12px 14px", borderRadius: "12px", fontSize: "14px", marginBottom: "16px" }}
      />
      <div className="text-white/80" style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.02em", marginBottom: "10px" }}>
        Docs Index
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: S.listGap }}>
        {docs.map((d) => {
          const active = activeId === d.id;
          return (
            <Link
              key={d.id}
              to={d.id}
              className={cn(
                "relative transition-all duration-200",
                active ? "text-white bg-white/[.06] ring-1 ring-white/10 shadow-inner" : "text-white/85 hover:bg-white/[.05]"
              )}
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "12px",
                padding: "10px 12px",
                fontSize: "15px",
                fontWeight: 500,
                lineHeight: 1.6,
                letterSpacing: "-0.01em",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "20px",
                  width: "6px",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                  background: active ? "linear-gradient(180deg, #22d3ee, #10b981)" : "transparent",
                }}
              />
              <span style={{ paddingLeft: "10px" }}>{d.title}</span>
            </Link>
          );
        })}
      </nav>
      <div
        className="border border-white/10 bg-white/5 text-white/70"
        style={{ marginTop: "16px", padding: "12px", borderRadius: "10px", fontSize: "12px", lineHeight: 1.5 }}
      >
        <strong className="text-white/85">Tip:</strong> rename files with{" "}
        <code className="bg-white/10" style={{ padding: "0 4px", borderRadius: "4px" }}>01-</code>,{" "}
        <code className="bg-white/10" style={{ padding: "0 4px", borderRadius: "4px" }}>02-</code>… to reorder.
      </div>
    </aside>
  );
}

/* ------------------ content ------------------ */
function DocRenderer({ doc }) {
  return (
    <article>
      <h1 className="text-white" style={{ fontSize: "28px", fontWeight: 800, margin: 0 }}>
        {doc.title}
      </h1>
      <div
        className="text-white/85"
        style={{ marginTop: "14px", lineHeight: 1.7, fontSize: "16px" }}
        dangerouslySetInnerHTML={{ __html: doc.html }}
      />
    </article>
  );
}

function DocPage({ docs }) {
  const { slug } = useParams();
  const doc = docs.find((d) => d.id === slug);
  if (!doc) {
    return <div className="text-white/70">Document not found.</div>;
  }
  return <DocRenderer doc={doc} />;
}

/* ------------------ page ------------------ */
export default function DocsHub() {
  const location = useLocation();
  const [query, setQuery] = useState("");

  const allDocs = FALLBACK_DOCS;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return allDocs.filter((d) =>
      [d.title, d.summary].some((t) => (t || "").toLowerCase().includes(q))
    );
  }, [query, allDocs]);

  const activeId = useMemo(() => {
    const parts = location.pathname.replace(/^\/+|\/+$/g, "").split("/");
    const last = parts[parts.length - 1];
    return allDocs.find((d) => d.id === last)?.id || null;
  }, [location.pathname, allDocs]);

  return (
    <section className="w-full" style={{ paddingBottom: "6rem" }}>
      <div style={container}>
        <DocsHeader />

        {/* Single grid to keep both columns aligned at the top */}
        <div
          className="grid md:grid-cols-[280px_minmax(0,1fr)]"
          style={{
            gap: "24px",
            alignItems: "start",     // ← keep top-aligned
          }}
        >
          <DocsSidebar
            docs={filtered}
            query={query}
            setQuery={setQuery}
            activeId={activeId}
          />

          <main
            className="border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.25)]"
            style={{
              minHeight: S.mainMinH,
              padding: S.mainPad,
              borderRadius: S.cardRadius,
            }}
          >
            {/* Top-right action kept inside normal flow to avoid shifting */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
              <Link
                to="/docs"
                className="text-white border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25"
                style={{ padding: "8px 12px", borderRadius: "12px", fontSize: "14px" }}
              >
                Back to Index
              </Link>
            </div>

            <Routes>
              <Route
                index
                element={
                  filtered.length > 0 ? (
                    <Navigate to={filtered[0].id} replace />
                  ) : (
                    <div className="text-white/70">No docs yet.</div>
                  )
                }
              />
              <Route path=":slug" element={<DocPage docs={allDocs} />} />
            </Routes>
          </main>
        </div>
      </div>
    </section>
  );
}
