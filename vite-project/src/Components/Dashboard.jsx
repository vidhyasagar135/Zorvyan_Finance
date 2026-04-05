import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const monthlyData = [
  { month: "Jan", earning: 12000, spending: 8000 },
  { month: "Feb", earning: 18000, spending: 10000 },
  { month: "Mar", earning: 15000, spending: 12000 },
  { month: "Apr", earning: 22000, spending: 14000 },
  { month: "May", earning: 28000, spending: 16000 },
  { month: "Jun", earning: 24000, spending: 18000 },
  { month: "Jul", earning: 30000, spending: 20000 },
  { month: "Aug", earning: 35000, spending: 22000 },
  { month: "Sep", earning: 32000, spending: 24000 },
  { month: "Oct", earning: 38000, spending: 26000 },
  { month: "Nov", earning: 42000, spending: 28000 },
  { month: "Dec", earning: 45567, spending: 32000 },
];

const spendingCategories = [
  { label: "Food & Dining", value: 1240, color: "#f97316", pct: 35.7 },
  { label: "Transport",     value: 840,  color: "#6366f1", pct: 24.2 },
  { label: "Shopping",      value: 720,  color: "#a78bfa", pct: 20.7 },
  { label: "Utilities",     value: 675,  color: "#d1d5db", pct: 19.4 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt  = (n) => new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const fmtK = (n) => (n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`);

// ─── Sidebar Icons ────────────────────────────────────────────────────────────

const IconGrid = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);
const IconBar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconInfo = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconClock = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconChat = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconSettings = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const IconHelp = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconLink = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const menuItems = [
  { name: "Dashboard", icon: <IconGrid /> },
  { name: "Analytics", icon: <IconBar /> },
  { name: "Insights",  icon: <IconInfo /> },
  { name: "Updates",   icon: <IconClock /> },
  { name: "Chat",      icon: <IconChat />, badge: 20 },
];
const generalItems = [
  { name: "Settings",    icon: <IconSettings /> },
  { name: "Help Desk",   icon: <IconHelp /> },
  { name: "Integration", icon: <IconLink /> },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ active, setActive }) {
  return (
    <aside className="w-52 flex-shrink-0 h-screen bg-white border-r border-gray-100 flex flex-col px-3 py-5">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 mb-7">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect x="3"  y="3"  width="7" height="7" rx="1.5" fill="white" fillOpacity="0.9"/>
            <rect x="14" y="3"  width="7" height="7" rx="1.5" fill="white" fillOpacity="0.5"/>
            <rect x="3"  y="14" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.5"/>
            <rect x="14" y="14" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.75"/>
          </svg>
        </div>
        <span className="text-[15px] font-bold text-gray-900 tracking-tight">FinDash</span>
      </div>

      {/* MENU */}
      <p className="text-[10px] text-gray-400 font-semibold mb-2 px-2 tracking-widest">MENU</p>
      <div className="space-y-0.5 mb-5">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[12.5px] transition-all duration-150 ${
              active === item.name
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={active === item.name ? "text-indigo-500" : "text-gray-400"}>{item.icon}</span>
              {item.name}
            </div>
            {item.badge && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                active === item.name ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"
              }`}>{item.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* GENERAL */}
      <p className="text-[10px] text-gray-400 font-semibold mb-2 px-2 tracking-widest">GENERAL</p>
      <div className="space-y-0.5">
        {generalItems.map((item) => (
          <button
            key={item.name}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12.5px] text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all duration-150"
          >
            <span className="text-gray-400">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>

      {/* Upgrade Card */}
      <div className="mt-auto mx-1 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white text-[10px] font-bold">✦</div>
          <p className="text-[12px] font-semibold text-gray-800">Go Pro</p>
        </div>
        <p className="text-[10px] text-gray-400 mb-2.5 leading-tight">Unlock advanced analytics & reports</p>
        <button className="w-full bg-indigo-600 text-white text-[11px] py-1.5 rounded-lg hover:bg-indigo-700 font-semibold transition-colors">
          Upgrade Plan
        </button>
      </div>
    </aside>
  );
}

// ─── Donut Chart ──────────────────────────────────────────────────────────────

function DonutChart({ data, total }) {
  const size = 190, cx = size / 2, cy = size / 2, R = 68, r = 44;
  const tau = 2 * Math.PI;
  let cumPct = 0;
  const slices = data.map((d) => {
    const start = cumPct * tau - Math.PI / 2;
    cumPct += d.pct / 100;
    const end = cumPct * tau - Math.PI / 2;
    return { ...d, start: start + 0.03, end: end - 0.03 };
  });
  const arc = (s, e) => {
    const x1 = cx + R * Math.cos(s), y1 = cy + R * Math.sin(s);
    const x2 = cx + R * Math.cos(e), y2 = cy + R * Math.sin(e);
    const xi1 = cx + r * Math.cos(e), yi1 = cy + r * Math.sin(e);
    const xi2 = cx + r * Math.cos(s), yi2 = cy + r * Math.sin(s);
    const large = e - s > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${xi1} ${yi1} A ${r} ${r} 0 ${large} 0 ${xi2} ${yi2} Z`;
  };
  return (
    <svg width={size} height={size} className="mx-auto">
      {slices.map((s, i) => (
        <path key={i} d={arc(s.start, s.end)} fill={s.color} className="transition-opacity hover:opacity-80 cursor-pointer" />
      ))}
      <text x={cx} y={cy - 8}  textAnchor="middle" fill="#9ca3af" fontSize="10" fontFamily="'DM Sans',sans-serif">Total Spent</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#111827"  fontSize="15" fontWeight="700" fontFamily="'DM Sans',sans-serif">
        ${fmt(total).split(".")[0]}
      </text>
    </svg>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ iconBg, iconEl, amount, label, trend, trendUp }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 ${iconBg}`}>
          {iconEl}
        </div>
        <div className="text-[22px] font-bold text-gray-900 leading-tight tracking-tight">
          ${fmt(amount).split(".")[0]}
          <span className="text-sm font-normal text-gray-400">.{fmt(amount).split(".")[1]}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        <span className="text-[12px] font-medium text-gray-500">{label}</span>
        {trend ? (
          <span className={`text-[12px] font-semibold ${trendUp ? "text-emerald-500" : "text-red-400"}`}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        ) : (
          <button className="text-gray-300 hover:text-gray-400 text-lg leading-none">···</button>
        )}
      </div>
    </div>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3 text-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="text-xs font-medium">
          {p.name === "earning" ? "Earning" : "Spending"}: {fmtK(p.value)}
        </p>
      ))}
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [active,    setActive]    = useState("Dashboard");
  const [chartMode, setChartMode] = useState("Yearly");

  const chartData = chartMode === "Yearly" ? monthlyData : monthlyData.slice(-6);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f6fb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      {/* ── Left Sidebar ── */}
      <Sidebar active={active} setActive={setActive} />

      {/* ── Right Content ── */}
      <main className="flex-1 overflow-y-auto p-6">

        {/* Page Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Good Morning, Alex</h1>
            <p className="text-sm text-gray-400 mt-0.5">Here's an overview of your financial health and recent activity.</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-gray-300 shadow-sm transition-all">
              This Month
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-gray-300 shadow-sm transition-all">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <StatCard
            iconBg="bg-violet-500"
            iconEl={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
            }
            amount={45567} label="Total Balance" trend={null} trendUp={null}
          />
          <StatCard
            iconBg="bg-orange-400"
            iconEl={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
              </svg>
            }
            amount={8240} label="Monthly Income" trend="12.5%" trendUp={true}
          />
          <StatCard
            iconBg="bg-pink-500"
            iconEl={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
              </svg>
            }
            amount={3475} label="Monthly Expenses" trend="4.2%" trendUp={false}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-5 gap-4">

          {/* Transactions Overview */}
          <div className="col-span-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-[13px] font-semibold text-gray-500">Transactions Overview</p>
                <p className="text-[22px] font-bold text-gray-900 tracking-tight leading-snug">
                  $45,567
                  <span className="text-sm font-semibold text-emerald-500 ml-2">↑ 4.9%</span>
                </p>
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
                {["Monthly", "Yearly"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setChartMode(m)}
                    className={`px-3 py-1.5 text-[12px] font-semibold rounded-md transition-all ${
                      chartMode === m ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-3 justify-end">
              {[["#6366f1", "Earning"], ["#34d399", "Spending"]].map(([color, lbl]) => (
                <div key={lbl} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-[11px] text-gray-400 font-medium">{lbl}</span>
                </div>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradEarn"  x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#34d399" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={fmtK}  tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="earning"  stroke="#6366f1" strokeWidth={2.5} fill="url(#gradEarn)"  dot={false} activeDot={{ r: 4, fill: "#6366f1" }} />
                <Area type="monotone" dataKey="spending" stroke="#34d399" strokeWidth={2.5} fill="url(#gradSpend)" dot={false} activeDot={{ r: 4, fill: "#34d399" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Spending Breakdown */}
          <div className="col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] font-semibold text-gray-700">Spending Breakdown</p>
              <button className="text-gray-300 hover:text-gray-500 text-lg leading-none">···</button>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <DonutChart data={spendingCategories} total={3475} />
            </div>

            <div className="mt-2 space-y-1.5">
              {spendingCategories.slice(0, 2).map((cat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                  <span className="text-[11.5px] text-gray-500 flex-1">{cat.label}</span>
                  <span className="text-[12px] font-semibold text-gray-800">${cat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-50 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-400 text-sm flex-shrink-0">🍴</div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-gray-700">Highest Category</p>
                  <p className="text-[10px] text-gray-400">Food & Dining</p>
                </div>
                <span className="text-[12px] font-bold text-gray-800">$1,240</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-400 text-sm flex-shrink-0">📊</div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-gray-700">Vs Last Month</p>
                  <p className="text-[10px] text-gray-400">Overall spending</p>
                </div>
                <span className="text-[12px] font-bold text-red-400">-12%</span>
              </div>
            </div>
          </div>

        </div>
      </main>
      
    </div>
  );
}