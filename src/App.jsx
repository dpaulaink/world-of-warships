import { useState } from "react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⚓" },
  { id: "ships", label: "Navios", icon: "🚢" },
  { id: "commanders", label: "Comandantes", icon: "🎖️" },
  { id: "resources", label: "Recursos", icon: "📦" },
  { id: "camouflages", label: "Camuflagens", icon: "🎨" },
  { id: "clan", label: "Clã", icon: "⚔️" },
  { id: "settings", label: "Configurações", icon: "⚙️" },
];

const NATIONS = {
  usa: { flag: "🇺🇸", label: "EUA" },
  japan: { flag: "🇯🇵", label: "Japão" },
  ussr: { flag: "🇷🇺", label: "URSS" },
  germany: { flag: "🇩🇪", label: "Alemanha" },
  uk: { flag: "🇬🇧", label: "Reino Unido" },
  france: { flag: "🇫🇷", label: "França" },
};

const SHIPS = [
  { id: 1, name: "Yamato", tier: "X", nation: "japan", type: "Encouraçado", xp: 128400, battles: 342, winRate: 58.2, color: "#c0392b" },
  { id: 2, name: "Iowa", tier: "IX", nation: "usa", type: "Encouraçado", xp: 94200, battles: 218, winRate: 54.7, color: "#2980b9" },
  { id: 3, name: "Bismarck", tier: "VIII", nation: "germany", type: "Encouraçado", xp: 76500, battles: 415, winRate: 61.3, color: "#7f8c8d" },
  { id: 4, name: "Zao", tier: "X", nation: "japan", type: "Cruzador", xp: 110200, battles: 289, winRate: 56.9, color: "#c0392b" },
  { id: 5, name: "Des Moines", tier: "X", nation: "usa", type: "Cruzador", xp: 88700, battles: 176, winRate: 52.1, color: "#2980b9" },
  { id: 6, name: "Grozovoi", tier: "X", nation: "ussr", type: "Destruidor", xp: 67300, battles: 201, winRate: 49.8, color: "#e74c3c" },
];

const TIER_COLORS = {
  X: "#f39c12",
  IX: "#e67e22",
  VIII: "#e74c3c",
  VII: "#9b59b6",
  VI: "#3498db",
};

export default function App() {
  const [activeNav, setActiveNav] = useState("ships");
  const [hoveredShip, setHoveredShip] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={styles.root}>
      {/* Background texture */}
      <div style={styles.bgOverlay} />

      {/* Sidebar */}
      <aside style={{ ...styles.sidebar, width: sidebarOpen ? 220 : 64 }}>
        <div style={styles.sidebarLogo} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <>
              <span style={styles.logoIcon}>⚓</span>
              <div>
                <div style={styles.logoTitle}>LEGENDS</div>
                <div style={styles.logoSub}>FLEET COMMAND</div>
              </div>
            </>
          ) : (
            <span style={styles.logoIcon}>⚓</span>
          )}
        </div>

        <nav style={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                ...styles.navItem,
                ...(activeNav === item.id ? styles.navItemActive : {}),
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {sidebarOpen && <span style={styles.navLabel}>{item.label}</span>}
              {activeNav === item.id && <div style={styles.navIndicator} />}
            </button>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          {sidebarOpen && (
            <div style={styles.admiralCard}>
              <div style={styles.admiralAvatar}>🎖️</div>
              <div>
                <div style={styles.admiralName}>Almirante Silva</div>
                <div style={styles.admiralRank}>Rank VII</div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main style={styles.main}>
        {/* Top bar */}
        <header style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <div style={styles.pageTitle}>
              {NAV_ITEMS.find((n) => n.id === activeNav)?.icon}{" "}
              {NAV_ITEMS.find((n) => n.id === activeNav)?.label}
            </div>
            <div style={styles.pageBreadcrumb}>World of Warships Legends › {NAV_ITEMS.find((n) => n.id === activeNav)?.label}</div>
          </div>

          <div style={styles.statsRow}>
            <StatChip icon="🥈" label="Prata" value="1.240.500" color="#bdc3c7" />
            <StatChip icon="🥇" label="Ouro" value="4.800" color="#f1c40f" />
            <StatChip icon="⭐" label="XP Global" value="892.340" color="#3498db" />
            <StatChip icon="💸" label="Gasto Total" value="R$ 349,90" color="#e74c3c" />
          </div>
        </header>

        {/* Content */}
        <div style={styles.content}>
          {activeNav === "ships" && (
            <ShipsPanel
              ships={SHIPS}
              hoveredShip={hoveredShip}
              setHoveredShip={setHoveredShip}
            />
          )}
          {activeNav === "dashboard" && <DashboardPanel />}
          {activeNav !== "ships" && activeNav !== "dashboard" && (
            <PlaceholderPanel label={NAV_ITEMS.find((n) => n.id === activeNav)?.label} />
          )}
        </div>
      </main>

      <style>{globalCSS}</style>
    </div>
  );
}

function StatChip({ icon, label, value, color }) {
  return (
    <div style={{ ...styles.statChip, borderColor: color + "44" }}>
      <span style={styles.statIcon}>{icon}</span>
      <div>
        <div style={{ ...styles.statValue, color }}>{value}</div>
        <div style={styles.statLabel}>{label}</div>
      </div>
    </div>
  );
}

function ShipsPanel({ ships, hoveredShip, setHoveredShip }) {
  return (
    <div>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Minha Frota</h2>
        <div style={styles.sectionMeta}>{ships.length} navios no hangar</div>
      </div>
      <div style={styles.shipsGrid}>
        {ships.map((ship) => (
          <ShipCard
            key={ship.id}
            ship={ship}
            hovered={hoveredShip === ship.id}
            onHover={() => setHoveredShip(ship.id)}
            onLeave={() => setHoveredShip(null)}
          />
        ))}
      </div>
    </div>
  );
}

function ShipCard({ ship, hovered, onHover, onLeave }) {
  const nation = NATIONS[ship.nation];
  const tierColor = TIER_COLORS[ship.tier] || "#95a5a6";

  return (
    <div
      style={{
        ...styles.shipCard,
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${tierColor}44, inset 0 1px 0 rgba(255,255,255,0.08)`
          : `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
        borderColor: hovered ? tierColor + "88" : "rgba(255,255,255,0.06)",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Tier badge */}
      <div style={{ ...styles.tierBadge, background: tierColor, boxShadow: `0 0 16px ${tierColor}88` }}>
        <span style={styles.tierRoman}>{ship.tier}</span>
      </div>

      {/* Nation flag */}
      <div style={styles.nationBadge}>
        <span style={styles.nationFlag}>{nation.flag}</span>
        <span style={styles.nationLabel}>{nation.label}</span>
      </div>

      {/* Ship silhouette area */}
      <div style={{ ...styles.shipSilhouette, background: `linear-gradient(135deg, ${ship.color}22, transparent)` }}>
        <div style={styles.shipEmoji}>🚢</div>
        <div style={{ ...styles.shipGlow, background: `radial-gradient(circle, ${ship.color}33 0%, transparent 70%)` }} />
      </div>

      {/* Ship info */}
      <div style={styles.shipInfo}>
        <div style={styles.shipName}>{ship.name}</div>
        <div style={styles.shipType}>{ship.type}</div>

        <div style={styles.shipStats}>
          <div style={styles.shipStat}>
            <div style={styles.shipStatVal}>{ship.battles}</div>
            <div style={styles.shipStatLbl}>Batalhas</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.shipStat}>
            <div style={{ ...styles.shipStatVal, color: ship.winRate >= 55 ? "#2ecc71" : ship.winRate >= 50 ? "#f39c12" : "#e74c3c" }}>
              {ship.winRate}%
            </div>
            <div style={styles.shipStatLbl}>Vitórias</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.shipStat}>
            <div style={styles.shipStatVal}>{(ship.xp / 1000).toFixed(1)}k</div>
            <div style={styles.shipStatLbl}>XP</div>
          </div>
        </div>

        {/* XP bar */}
        <div style={styles.xpBarBg}>
          <div
            style={{
              ...styles.xpBarFill,
              width: `${Math.min((ship.xp / 130000) * 100, 100)}%`,
              background: `linear-gradient(90deg, ${tierColor}, ${tierColor}88)`,
              boxShadow: `0 0 8px ${tierColor}88`,
            }}
          />
        </div>

        <button
          style={{
            ...styles.camoBtn,
            borderColor: hovered ? tierColor : "rgba(255,255,255,0.15)",
            color: hovered ? tierColor : "#a0aec0",
            boxShadow: hovered ? `0 0 20px ${tierColor}44` : "none",
          }}
        >
          🎨 Ver Camuflagens
        </button>
      </div>
    </div>
  );
}

function DashboardPanel() {
  return (
    <div>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Visão Geral</h2>
      </div>
      <div style={styles.dashGrid}>
        {[
          { label: "Batalhas Totais", value: "1.641", icon: "⚔️", color: "#3498db" },
          { label: "Taxa de Vitória", value: "55.2%", icon: "🏆", color: "#2ecc71" },
          { label: "Dano Médio", value: "42.380", icon: "💥", color: "#e74c3c" },
          { label: "Navios no Hangar", value: "6", icon: "🚢", color: "#f39c12" },
        ].map((stat) => (
          <div key={stat.label} style={{ ...styles.dashCard, borderColor: stat.color + "44" }}>
            <div style={styles.dashCardIcon}>{stat.icon}</div>
            <div style={{ ...styles.dashCardValue, color: stat.color }}>{stat.value}</div>
            <div style={styles.dashCardLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderPanel({ label }) {
  return (
    <div style={styles.placeholder}>
      <div style={styles.placeholderIcon}>🔒</div>
      <div style={styles.placeholderTitle}>{label}</div>
      <div style={styles.placeholderSub}>Módulo em desenvolvimento</div>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "#050d1a",
    fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
    color: "#e2e8f0",
    position: "relative",
    overflow: "hidden",
  },
  bgOverlay: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(20, 60, 120, 0.4) 0%, transparent 70%),
      repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.01) 40px, rgba(255,255,255,0.01) 41px),
      repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.01) 40px, rgba(255,255,255,0.01) 41px)
    `,
    pointerEvents: "none",
    zIndex: 0,
  },
  sidebar: {
    position: "relative",
    zIndex: 10,
    background: "linear-gradient(180deg, #0a1628 0%, #071020 100%)",
    borderRight: "1px solid rgba(52, 152, 219, 0.2)",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
    overflow: "hidden",
    flexShrink: 0,
    boxShadow: "4px 0 24px rgba(0,0,0,0.5)",
  },
  sidebarLogo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "24px 16px",
    borderBottom: "1px solid rgba(52,152,219,0.15)",
    cursor: "pointer",
    userSelect: "none",
  },
  logoIcon: { fontSize: 28, filter: "drop-shadow(0 0 8px #3498db)" },
  logoTitle: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.2em",
    color: "#3498db",
    textTransform: "uppercase",
  },
  logoSub: {
    fontSize: 9,
    letterSpacing: "0.3em",
    color: "#4a6fa5",
    textTransform: "uppercase",
    marginTop: 2,
  },
  nav: { flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 4 },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    borderRadius: 8,
    border: "none",
    background: "transparent",
    color: "#5a7fa8",
    cursor: "pointer",
    transition: "all 0.2s",
    position: "relative",
    whiteSpace: "nowrap",
    textAlign: "left",
    width: "100%",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.05em",
  },
  navItemActive: {
    background: "linear-gradient(90deg, rgba(52,152,219,0.2), rgba(52,152,219,0.05))",
    color: "#74b9ff",
    borderLeft: "2px solid #3498db",
  },
  navIcon: { fontSize: 18, minWidth: 24, textAlign: "center" },
  navLabel: { flex: 1 },
  navIndicator: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#3498db",
    boxShadow: "0 0 8px #3498db",
  },
  sidebarFooter: {
    padding: "16px",
    borderTop: "1px solid rgba(52,152,219,0.15)",
  },
  admiralCard: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  admiralAvatar: {
    fontSize: 28,
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "rgba(52,152,219,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(52,152,219,0.3)",
  },
  admiralName: { fontSize: 13, fontWeight: 700, color: "#e2e8f0" },
  admiralRank: { fontSize: 11, color: "#f39c12", letterSpacing: "0.1em" },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    zIndex: 5,
    overflow: "hidden",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 28px",
    background: "rgba(5,13,26,0.8)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(52,152,219,0.15)",
    flexWrap: "wrap",
    gap: 12,
  },
  topBarLeft: {},
  pageTitle: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: "#e2e8f0",
    textTransform: "uppercase",
  },
  pageBreadcrumb: {
    fontSize: 11,
    color: "#4a6fa5",
    letterSpacing: "0.1em",
    marginTop: 2,
  },
  statsRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  statChip: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid",
    borderRadius: 8,
    backdropFilter: "blur(8px)",
  },
  statIcon: { fontSize: 18 },
  statValue: { fontSize: 14, fontWeight: 700, letterSpacing: "0.03em" },
  statLabel: { fontSize: 10, color: "#5a7fa8", letterSpacing: "0.1em", textTransform: "uppercase" },
  content: {
    flex: 1,
    padding: "28px",
    overflowY: "auto",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: 16,
    marginBottom: 24,
    borderBottom: "1px solid rgba(52,152,219,0.1)",
    paddingBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#e2e8f0",
    margin: 0,
  },
  sectionMeta: { fontSize: 12, color: "#4a6fa5", letterSpacing: "0.1em" },
  shipsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
  },
  shipCard: {
    background: "linear-gradient(160deg, #0d1e36 0%, #071020 100%)",
    border: "1px solid",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
    cursor: "pointer",
  },
  tierBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 36,
    height: 36,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
  },
  tierRoman: {
    fontSize: 14,
    fontWeight: 900,
    color: "#fff",
    letterSpacing: "0.05em",
    textShadow: "0 1px 4px rgba(0,0,0,0.6)",
  },
  nationBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(6px)",
    borderRadius: 20,
    padding: "4px 10px",
    zIndex: 4,
    border: "1px solid rgba(255,255,255,0.08)",
  },
  nationFlag: { fontSize: 16 },
  nationLabel: { fontSize: 11, color: "#a0aec0", letterSpacing: "0.08em" },
  shipSilhouette: {
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  shipEmoji: { fontSize: 56, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.8))", zIndex: 2 },
  shipGlow: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
  },
  shipInfo: { padding: "14px 16px 16px" },
  shipName: {
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#e2e8f0",
  },
  shipType: {
    fontSize: 11,
    color: "#5a7fa8",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: 12,
    marginTop: 2,
  },
  shipStats: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    background: "rgba(255,255,255,0.03)",
    borderRadius: 8,
    padding: "10px 0",
    marginBottom: 12,
    border: "1px solid rgba(255,255,255,0.05)",
  },
  shipStat: { flex: 1, textAlign: "center" },
  shipStatVal: { fontSize: 16, fontWeight: 700, color: "#e2e8f0" },
  shipStatLbl: { fontSize: 10, color: "#4a6fa5", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 },
  statDivider: { width: 1, height: 32, background: "rgba(255,255,255,0.07)" },
  xpBarBg: {
    height: 4,
    background: "rgba(255,255,255,0.06)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 14,
  },
  xpBarFill: {
    height: "100%",
    borderRadius: 4,
    transition: "width 0.6s ease",
  },
  camoBtn: {
    width: "100%",
    padding: "9px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid",
    borderRadius: 8,
    color: "#a0aec0",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.1em",
    cursor: "pointer",
    transition: "all 0.25s",
    fontFamily: "inherit",
    textTransform: "uppercase",
  },
  dashGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 20,
  },
  dashCard: {
    background: "linear-gradient(160deg, #0d1e36 0%, #071020 100%)",
    border: "1px solid",
    borderRadius: 12,
    padding: "28px 20px",
    textAlign: "center",
    transition: "all 0.3s",
  },
  dashCardIcon: { fontSize: 36, marginBottom: 12 },
  dashCardValue: { fontSize: 28, fontWeight: 800, letterSpacing: "0.04em" },
  dashCardLabel: { fontSize: 12, color: "#5a7fa8", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 },
  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: 12,
    opacity: 0.4,
  },
  placeholderIcon: { fontSize: 60 },
  placeholderTitle: { fontSize: 24, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" },
  placeholderSub: { fontSize: 13, color: "#4a6fa5", letterSpacing: "0.15em" },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #050d1a; }
  ::-webkit-scrollbar-thumb { background: #1a3a5c; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #3498db; }

  @media (max-width: 768px) {
    .statsRow { flex-wrap: wrap; }
  }

  button:hover { opacity: 0.92; }
`;