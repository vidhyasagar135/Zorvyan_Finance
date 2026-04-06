import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

// ─── Data ─────────────────────────────────────────────────────────────────────

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

const FILTER_TABS = [
  { key: "all",       label: "All",              icon: "⊞" },
  { key: "received",  label: "Received",         icon: "↓" },
  { key: "sent",      label: "Sent",             icon: "↑" },
  { key: "merchant",  label: "Merchant Payment", icon: "🏪" },
  { key: "gold",      label: "Gold",             icon: "◈" },
  { key: "cashback",  label: "Cashbacks",        icon: "⟳" },
  { key: "insurance", label: "Insurance",        icon: "⛨" },
  { key: "recharge",  label: "Recharge & Bills", icon: "⚡" },
];

const allTransactions = [
  { id: 1,  activity: "Flight Ticket Booking",  category: "Travel",        filterType: "merchant",  icon: "✈️", iconBg: "bg-blue-50",    orderId: "INV_000075", date: "15 Apr, 2026", time: "11:30 AM", amount: -32750.00, type: "Expense" },
  { id: 2,  activity: "Freelance Project",       category: "Income",        filterType: "received",  icon: "💼", iconBg: "bg-green-50",   orderId: "INV_000076", date: "14 Apr, 2026", time: "09:15 AM", amount:   4500.00, type: "Income"  },
  { id: 3,  activity: "Fine Dining Restaurant",  category: "Food",          filterType: "merchant",  icon: "🍔", iconBg: "bg-orange-50",  orderId: "RCP_000821", date: "12 Apr, 2026", time: "08:45 PM", amount:   -245.50, type: "Expense" },
  { id: 4,  activity: "Electric Bill",           category: "Utilities",     filterType: "recharge",  icon: "⚡", iconBg: "bg-yellow-50",  orderId: "INV_000077", date: "10 Apr, 2026", time: "10:00 AM", amount:   -185.00, type: "Expense" },
  { id: 5,  activity: "Spotify Subscription",   category: "Entertainment", filterType: "merchant",  icon: "🎵", iconBg: "bg-green-50",   orderId: "SUB_000342", date: "08 Apr, 2026", time: "12:00 PM", amount:     -9.99, type: "Expense" },
  { id: 6,  activity: "Salary Credit",           category: "Income",        filterType: "received",  icon: "💰", iconBg: "bg-emerald-50", orderId: "SAL_000101", date: "05 Apr, 2026", time: "08:00 AM", amount:   8500.00, type: "Income"  },
  { id: 7,  activity: "Amazon Shopping",         category: "Shopping",      filterType: "merchant",  icon: "🛒", iconBg: "bg-orange-50",  orderId: "AMZ_009821", date: "03 Apr, 2026", time: "03:20 PM", amount:   -340.00, type: "Expense" },
  { id: 8,  activity: "Gym Membership",          category: "Health",        filterType: "merchant",  icon: "🏋️", iconBg: "bg-purple-50",  orderId: "GYM_000055", date: "01 Apr, 2026", time: "07:00 AM", amount:    -49.00, type: "Expense" },
  { id: 9,  activity: "Gold Investment",         category: "Investment",    filterType: "gold",      icon: "🥇", iconBg: "bg-yellow-50",  orderId: "GLD_000011", date: "28 Mar, 2026", time: "10:00 AM", amount:  -5000.00, type: "Expense" },
  { id: 10, activity: "Cashback Reward",         category: "Rewards",       filterType: "cashback",  icon: "🎁", iconBg: "bg-pink-50",    orderId: "CBK_000099", date: "25 Mar, 2026", time: "02:00 PM", amount:    120.00, type: "Income"  },
  { id: 11, activity: "Health Insurance",        category: "Insurance",     filterType: "insurance", icon: "🏥", iconBg: "bg-red-50",     orderId: "INS_000031", date: "20 Mar, 2026", time: "09:30 AM", amount:   -850.00, type: "Expense" },
  { id: 12, activity: "Mobile Recharge",         category: "Recharge",      filterType: "recharge",  icon: "📱", iconBg: "bg-indigo-50",  orderId: "RCH_000204", date: "18 Mar, 2026", time: "07:45 PM", amount:   -299.00, type: "Expense" },
  { id: 13, activity: "Money Transfer to Amit",  category: "Transfer",      filterType: "sent",      icon: "↗️", iconBg: "bg-blue-50",    orderId: "TRF_000411", date: "15 Mar, 2026", time: "11:00 AM", amount:  -2000.00, type: "Expense" },
  { id: 14, activity: "Car Insurance Premium",   category: "Insurance",     filterType: "insurance", icon: "🚗", iconBg: "bg-gray-50",    orderId: "INS_000032", date: "10 Mar, 2026", time: "03:00 PM", amount:  -1200.00, type: "Expense" },
  { id: 15, activity: "Gold Redemption",         category: "Investment",    filterType: "gold",      icon: "🪙", iconBg: "bg-yellow-50",  orderId: "GLD_000012", date: "05 Mar, 2026", time: "01:00 PM", amount:   3200.00, type: "Income"  },
  { id: 16, activity: "Received from Rahul",     category: "Transfer",      filterType: "received",  icon: "👤", iconBg: "bg-teal-50",    orderId: "TRF_000412", date: "01 Mar, 2026", time: "06:30 PM", amount:   1500.00, type: "Income"  },
  { id: 17, activity: "Internet Bill",           category: "Utilities",     filterType: "recharge",  icon: "🌐", iconBg: "bg-cyan-50",    orderId: "RCH_000205", date: "25 Feb, 2026", time: "10:15 AM", amount:   -699.00, type: "Expense" },
  { id: 18, activity: "Credit Card Cashback",    category: "Rewards",       filterType: "cashback",  icon: "💳", iconBg: "bg-violet-50",  orderId: "CBK_000100", date: "20 Feb, 2026", time: "05:00 PM", amount:    250.00, type: "Income"  },
  { id: 19, activity: "Sent to Priya",           category: "Transfer",      filterType: "sent",      icon: "↗️", iconBg: "bg-rose-50",    orderId: "TRF_000413", date: "15 Feb, 2026", time: "12:45 PM", amount:   -500.00, type: "Expense" },
  { id: 20, activity: "Grocery Shopping",        category: "Food",          filterType: "merchant",  icon: "🛍️", iconBg: "bg-lime-50",    orderId: "MRT_000501", date: "10 Feb, 2026", time: "09:00 AM", amount:   -640.00, type: "Expense" },
];

const PAGE_SIZE = 6;
const fmt  = (n) => new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(n));
const fmtK = (n) => n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconGrid     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
const IconBar      = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IconInfo     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const IconClock    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconChat     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IconSettings = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconHelp     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IconLink     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
const SearchIcon   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const MenuIcon     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const ChevronLeft  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevronRight = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>;

const menuItems   = [
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
      <div className="flex items-center gap-2.5 px-2 mb-7">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.9"/>
            <rect x="14" y="3" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.5"/>
            <rect x="3" y="14" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.5"/>
            <rect x="14" y="14" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.75"/>
          </svg>
        </div>
        <span className="text-[15px] font-bold text-gray-900 tracking-tight">FinDash</span>
      </div>

      <p className="text-[10px] text-gray-400 font-semibold mb-2 px-2 tracking-widest">MENU</p>
      <div className="space-y-0.5 mb-5">
        {menuItems.map((item) => (
          <button key={item.name} onClick={() => setActive(item.name)}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[12.5px] transition-all duration-150 ${
              active === item.name ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}>
            <div className="flex items-center gap-2.5">
              <span className={active === item.name ? "text-indigo-500" : "text-gray-400"}>{item.icon}</span>
              {item.name}
            </div>
            {item.badge && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${active === item.name ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"}`}>{item.badge}</span>
            )}
          </button>
        ))}
      </div>

      <p className="text-[10px] text-gray-400 font-semibold mb-2 px-2 tracking-widest">GENERAL</p>
      <div className="space-y-0.5">
        {generalItems.map((item) => (
          <button key={item.name} className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12.5px] text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all duration-150">
            <span className="text-gray-400">{item.icon}</span>{item.name}
          </button>
        ))}
      </div>

      <div className="mt-auto mx-1 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white text-[10px] font-bold">✦</div>
          <p className="text-[12px] font-semibold text-gray-800">Go Pro</p>
        </div>
        <p className="text-[10px] text-gray-400 mb-2.5 leading-tight">Unlock advanced analytics &amp; reports</p>
        <button className="w-full bg-indigo-600 text-white text-[11px] py-1.5 rounded-lg hover:bg-indigo-700 font-semibold transition-colors">Upgrade Plan</button>
      </div>
    </aside>
  );
}

// ─── Donut Chart ──────────────────────────────────────────────────────────────

function DonutChart({ data, total }) {
  const size = 190, cx = size / 2, cy = size / 2, R = 68, r = 44, tau = 2 * Math.PI;
  let cum = 0;
  const slices = data.map((d) => {
    const s = cum * tau - Math.PI / 2; cum += d.pct / 100;
    const e = cum * tau - Math.PI / 2;
    return { ...d, s: s + 0.03, e: e - 0.03 };
  });
  const arc = (s, e) => {
    const lf = e - s > Math.PI ? 1 : 0;
    return `M${cx+R*Math.cos(s)} ${cy+R*Math.sin(s)} A${R} ${R} 0 ${lf} 1 ${cx+R*Math.cos(e)} ${cy+R*Math.sin(e)} L${cx+r*Math.cos(e)} ${cy+r*Math.sin(e)} A${r} ${r} 0 ${lf} 0 ${cx+r*Math.cos(s)} ${cy+r*Math.sin(s)} Z`;
  };
  return (
    <svg width={size} height={size} className="mx-auto">
      {slices.map((s, i) => <path key={i} d={arc(s.s, s.e)} fill={s.color} className="transition-opacity hover:opacity-80 cursor-pointer"/>)}
      <text x={cx} y={cy-8}  textAnchor="middle" fill="#9ca3af" fontSize="10" fontFamily="'DM Sans',sans-serif">Total Spent</text>
      <text x={cx} y={cy+10} textAnchor="middle" fill="#111827"  fontSize="15" fontWeight="700" fontFamily="'DM Sans',sans-serif">${fmt(total).split(".")[0]}</text>
    </svg>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ iconBg, iconEl, amount, label, trend, trendUp }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 ${iconBg}`}>{iconEl}</div>
        <div className="text-[22px] font-bold text-gray-900 leading-tight tracking-tight">
          ${fmt(amount).split(".")[0]}<span className="text-sm font-normal text-gray-400">.{fmt(amount).split(".")[1]}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        <span className="text-[12px] font-medium text-gray-500">{label}</span>
        {trend ? <span className={`text-[12px] font-semibold ${trendUp ? "text-emerald-500" : "text-red-400"}`}>{trendUp ? "↑" : "↓"} {trend}</span>
               : <button className="text-gray-300 hover:text-gray-400 text-lg leading-none">···</button>}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3 text-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color }} className="text-xs font-medium">{p.name === "earning" ? "Earning" : "Spending"}: {fmtK(p.value)}</p>)}
    </div>
  );
}

// ─── Filter Tab color helper ──────────────────────────────────────────────────

function getTabBadgeStyle(filterType) {
  const map = {
    received:  "bg-emerald-50 text-emerald-600",
    sent:      "bg-blue-50 text-blue-500",
    gold:      "bg-yellow-50 text-yellow-600",
    cashback:  "bg-pink-50 text-pink-500",
    insurance: "bg-red-50 text-red-500",
    recharge:  "bg-cyan-50 text-cyan-600",
    merchant:  "bg-indigo-50 text-indigo-500",
  };
  return map[filterType] || "bg-gray-50 text-gray-500";
}

// ─── Recent Transactions ──────────────────────────────────────────────────────

function RecentTransactions() {
  const [search,       setSearch]       = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [page,         setPage]         = useState(1);
  const [selected,     setSelected]     = useState([]);
  const [allChecked,   setAllChecked]   = useState(false);

  // Per-tab counts (always based on full data, ignoring search)
  const counts = useMemo(() => {
    const c = { all: allTransactions.length };
    FILTER_TABS.slice(1).forEach((tab) => {
      c[tab.key] = allTransactions.filter((t) => t.filterType === tab.key).length;
    });
    return c;
  }, []);

  // Filter by tab, then by search query
  const filtered = useMemo(() => {
    let list = activeFilter === "all"
      ? allTransactions
      : allTransactions.filter((t) => t.filterType === activeFilter);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (t) =>
          t.activity.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.orderId.toLowerCase().includes(q) ||
          t.date.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const saferPage  = Math.min(page, totalPages);
  const paginated  = filtered.slice((saferPage - 1) * PAGE_SIZE, saferPage * PAGE_SIZE);

  const reset = () => { setPage(1); setSelected([]); setAllChecked(false); };
  const handleFilterChange = (key) => { setActiveFilter(key); reset(); };
  const handleSearch       = (v)   => { setSearch(v); reset(); };

  const toggleAll = () => {
    if (allChecked) { setSelected([]); setAllChecked(false); }
    else            { setSelected(paginated.map((t) => t.id)); setAllChecked(true); }
  };
  const toggleRow = (id) => setSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const activeTabLabel = FILTER_TABS.find((t) => t.key === activeFilter)?.label ?? "All";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-4">

      {/* Header */}
      <div className="px-6 pt-4 pb-0 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-gray-400"><MenuIcon /></span>
            <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">Recent Transactions</h2>
            <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded-full border border-indigo-100">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Search */}
          <div className={`flex items-center gap-2 px-3 py-2 border rounded-xl w-60 transition-all ${search ? "border-indigo-300 bg-indigo-50/20" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}>
            <span className="text-gray-400 flex-shrink-0"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search name, ID, date…"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-transparent outline-none text-[12.5px] text-gray-700 placeholder-gray-400 w-full"
            />
            {search && (
              <button onClick={() => handleSearch("")}
                className="flex-shrink-0 w-4 h-4 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-white text-[9px] font-bold transition-colors">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Tab Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3" style={{ scrollbarWidth: "none" }}>
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.key;
            const count    = counts[tab.key] ?? 0;
            return (
              <button
                key={tab.key}
                onClick={() => handleFilterChange(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0 border ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/40"
                }`}
              >
                <span style={{ fontSize: 13 }}>{tab.icon}</span>
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none ${
                  isActive ? "bg-white/25 text-white" : "bg-gray-100 text-gray-400"
                }`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Search active hint */}
        {search && (
          <div className="flex items-center gap-1.5 pb-2 -mt-1">
            <span className="text-[11px] text-gray-400">Results for</span>
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">"{search}"</span>
            <span className="text-[11px] text-gray-400">in <strong className="text-gray-600">{activeTabLabel}</strong></span>
            <button onClick={() => handleSearch("")} className="ml-1 text-[10.5px] text-red-400 hover:text-red-600 font-semibold">Clear</button>
          </div>
        )}
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-50 bg-gray-50/50">
            <th className="w-10 px-6 py-3 text-left">
              <input type="checkbox" checked={allChecked} onChange={toggleAll}
                className="w-3.5 h-3.5 rounded border-gray-300 accent-indigo-600 cursor-pointer" />
            </th>
            <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Activity / Category</th>
            <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Order ID</th>
            <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Date &amp; Time</th>
            <th className="px-3 py-3 text-right text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase pr-8">Amount</th>
            <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {paginated.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-16">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl mb-1">📭</div>
                  <p className="text-[13.5px] font-semibold text-gray-600">No transactions found</p>
                  <p className="text-[12px] text-gray-400 max-w-xs text-center">
                    {search
                      ? `No results for "${search}" in ${activeTabLabel}`
                      : `No ${activeTabLabel} transactions yet`}
                  </p>
                  {(search || activeFilter !== "all") && (
                    <button
                      onClick={() => { handleSearch(""); handleFilterChange("all"); }}
                      className="mt-3 text-[12px] text-indigo-600 font-semibold border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 px-4 py-1.5 rounded-lg transition-colors">
                      Clear all filters
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ) : (
            paginated.map((t) => (
              <tr key={t.id}
                className={`transition-colors ${selected.includes(t.id) ? "bg-indigo-50/40" : "hover:bg-gray-50/60"}`}>
                <td className="px-6 py-3.5">
                  <input type="checkbox" checked={selected.includes(t.id)} onChange={() => toggleRow(t.id)}
                    className="w-3.5 h-3.5 rounded border-gray-300 accent-indigo-600 cursor-pointer" />
                </td>
                <td className="px-3 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${t.iconBg}`}>{t.icon}</div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-800">{t.activity}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <p className="text-[11px] text-gray-400">{t.category}</p>
                        <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-full ${getTabBadgeStyle(t.filterType)}`}>
                          {FILTER_TABS.find((tab) => tab.key === t.filterType)?.label ?? t.filterType}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3.5">
                  <span className="text-[12.5px] text-gray-500 font-medium font-mono">{t.orderId}</span>
                </td>
                <td className="px-3 py-3.5">
                  <p className="text-[12.5px] text-gray-700 font-medium">{t.date}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{t.time}</p>
                </td>
                <td className="px-3 py-3.5 text-right pr-8">
                  <span className={`text-[13.5px] font-bold ${t.amount >= 0 ? "text-emerald-500" : "text-gray-800"}`}>
                    {t.amount >= 0 ? "+" : "-"}${fmt(t.amount)}
                  </span>
                </td>
                <td className="px-3 py-3.5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    t.type === "Income" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${t.type === "Income" ? "bg-emerald-500" : "bg-red-400"}`} />
                    {t.type}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50">
        <div className="flex items-center gap-3">
          <p className="text-[12px] text-gray-400">
            {filtered.length === 0
              ? "No transactions"
              : `Showing ${Math.min((saferPage-1)*PAGE_SIZE+1, filtered.length)}–${Math.min(saferPage*PAGE_SIZE, filtered.length)} of ${filtered.length}`}
          </p>
          {selected.length > 0 && (
            <span className="text-[11.5px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              {selected.length} selected
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => Math.max(1, p-1))} disabled={saferPage === 1}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronLeft /></button>
          {Array.from({ length: totalPages }, (_, i) => i+1).map((p) => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-[12px] font-semibold transition-all ${
                p === saferPage ? "bg-indigo-600 text-white shadow-sm" : "border border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"
              }`}>{p}</button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p+1))} disabled={saferPage === totalPages}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronRight /></button>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [active,    setActive]    = useState("Dashboard");
  const [chartMode, setChartMode] = useState("Yearly");
  const chartData = chartMode === "Yearly" ? monthlyData : monthlyData.slice(-6);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f6fb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      <Sidebar active={active} setActive={setActive} />

      <main className="flex-1 overflow-y-auto p-6">

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Good Morning, Alex</h1>
            <p className="text-sm text-gray-400 mt-0.5">Here's an overview of your financial health and recent activity.</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-gray-300 shadow-sm transition-all">
              This Month <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-gray-300 shadow-sm transition-all">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5">
          <StatCard iconBg="bg-violet-500" iconEl={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>} amount={45567} label="Total Balance"/>
          <StatCard iconBg="bg-orange-400" iconEl={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>} amount={8240} label="Monthly Income" trend="12.5%" trendUp={true}/>
          <StatCard iconBg="bg-pink-500"   iconEl={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>} amount={3475} label="Monthly Expenses" trend="4.2%" trendUp={false}/>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-[13px] font-semibold text-gray-500">Transactions Overview</p>
                <p className="text-[22px] font-bold text-gray-900 tracking-tight leading-snug">$45,567 <span className="text-sm font-semibold text-emerald-500">↑ 4.9%</span></p>
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
                {["Monthly","Yearly"].map(m=>(
                  <button key={m} onClick={()=>setChartMode(m)}
                    className={`px-3 py-1.5 text-[12px] font-semibold rounded-md transition-all ${chartMode===m?"bg-indigo-600 text-white shadow-sm":"text-gray-500 hover:text-gray-700"}`}>{m}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3 justify-end">
              {[["#6366f1","Earning"],["#34d399","Spending"]].map(([c,l])=>(
                <div key={l} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{background:c}}/><span className="text-[11px] text-gray-400 font-medium">{l}</span></div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData} margin={{top:0,right:0,left:-10,bottom:0}}>
                <defs>
                  <linearGradient id="gradEarn"  x1="0" y1="0" x2="0" y2="1"><stop offset="5%"  stopColor="#6366f1" stopOpacity={0.18}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                  <linearGradient id="gradSpend" x1="0" y1="0" x2="0" y2="1"><stop offset="5%"  stopColor="#34d399" stopOpacity={0.15}/><stop offset="95%" stopColor="#34d399" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:11,fill:"#9ca3af"}} axisLine={false} tickLine={false}/>
                <YAxis tickFormatter={fmtK} tick={{fontSize:11,fill:"#9ca3af"}} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Area type="monotone" dataKey="earning"  stroke="#6366f1" strokeWidth={2.5} fill="url(#gradEarn)"  dot={false} activeDot={{r:4,fill:"#6366f1"}}/>
                <Area type="monotone" dataKey="spending" stroke="#34d399" strokeWidth={2.5} fill="url(#gradSpend)" dot={false} activeDot={{r:4,fill:"#34d399"}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] font-semibold text-gray-700">Spending Breakdown</p>
              <button className="text-gray-300 hover:text-gray-500 text-lg leading-none">···</button>
            </div>
            <div className="flex-1 flex items-center justify-center"><DonutChart data={spendingCategories} total={3475}/></div>
            <div className="mt-2 space-y-1.5">
              {spendingCategories.slice(0,2).map((c,i)=>(
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:c.color}}/>
                  <span className="text-[11.5px] text-gray-500 flex-1">{c.label}</span>
                  <span className="text-[12px] font-semibold text-gray-800">${c.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-50 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-sm flex-shrink-0">🍴</div>
                <div className="flex-1"><p className="text-[11px] font-semibold text-gray-700">Highest Category</p><p className="text-[10px] text-gray-400">Food &amp; Dining</p></div>
                <span className="text-[12px] font-bold text-gray-800">$1,240</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-sm flex-shrink-0">📊</div>
                <div className="flex-1"><p className="text-[11px] font-semibold text-gray-700">Vs Last Month</p><p className="text-[10px] text-gray-400">Overall spending</p></div>
                <span className="text-[12px] font-bold text-red-400">-12%</span>
              </div>
            </div>
          </div>
        </div>

        <RecentTransactions />
      </main>
    </div>
  );
}