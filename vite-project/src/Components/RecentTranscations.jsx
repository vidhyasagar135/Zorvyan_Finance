import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const allTransactions = [
  {
    id: 1,
    activity: "Flight Ticket Booking",
    category: "Travel",
    icon: "✈️",
    iconBg: "bg-blue-50",
    orderId: "INV_000075",
    date: "15 Apr, 2026",
    time: "11:30 AM",
    amount: -32750.0,
    type: "Expense",
  },
  {
    id: 2,
    activity: "Freelance Project",
    category: "Income",
    icon: "💼",
    iconBg: "bg-green-50",
    orderId: "INV_000076",
    date: "14 Apr, 2026",
    time: "09:15 AM",
    amount: 4500.0,
    type: "Income",
  }, //new commit
  {
    id: 3,
    activity: "Fine Dining Restaurant",
    category: "Food",
    icon: "🍔",
    iconBg: "bg-orange-50",
    orderId: "RCP_000821",
    date: "12 Apr, 2026",
    time: "08:45 PM",
    amount: -245.5,
    type: "Expense",
  },
  {
    id: 4,
    activity: "Electric Bill",
    category: "Utilities",
    icon: "⚡",
    iconBg: "bg-yellow-50",
    orderId: "INV_000077",
    date: "10 Apr, 2026",
    time: "10:00 AM",
    amount: -185.0,
    type: "Expense",
  },
  {
    id: 5,
    activity: "Spotify Subscription",
    category: "Entertainment",
    icon: "🎵",
    iconBg: "bg-green-50",
    orderId: "SUB_000342",
    date: "08 Apr, 2026",
    time: "12:00 PM",
    amount: -9.99,
    type: "Expense",
  },
  {
    id: 6,
    activity: "Salary Credit",
    category: "Income",
    icon: "💰",
    iconBg: "bg-emerald-50",
    orderId: "SAL_000101",
    date: "05 Apr, 2026",
    time: "08:00 AM",
    amount: 8500.0,
    type: "Income",
  },
  {
    id: 7,
    activity: "Amazon Shopping",
    category: "Shopping",
    icon: "🛒",
    iconBg: "bg-orange-50",
    orderId: "AMZ_009821",
    date: "03 Apr, 2026",
    time: "03:20 PM",
    amount: -340.0,
    type: "Expense",
  },
  {
    id: 8,
    activity: "Gym Membership",
    category: "Health",
    icon: "🏋️",
    iconBg: "bg-purple-50",
    orderId: "GYM_000055",
    date: "01 Apr, 2026",
    time: "07:00 AM",
    amount: -49.0,
    type: "Expense",
  },
];

const PAGE_SIZE = 5;

const fmt = (n) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(n));

// ─── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="18" x2="12" y2="18"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const ChevronLeft = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function RecentTransactions() {
  const [search, setSearch]       = useState("");
  const [page, setPage]           = useState(1);
  const [selected, setSelected]   = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const filtered = allTransactions.filter(
    (t) =>
      t.activity.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.orderId.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleAll = () => {
    if (allChecked) {
      setSelected([]);
      setAllChecked(false);
    } else {
      setSelected(paginated.map((t) => t.id));
      setAllChecked(true);
    }
  };

  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <span className="text-gray-400"><MenuIcon /></span>
          <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">Recent Transactions</h2>
        </div>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 w-52 hover:border-gray-300 transition-colors">
            <span className="text-gray-400"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="bg-transparent outline-none text-[12.5px] text-gray-700 placeholder-gray-400 w-full"
            />
          </div>
          {/* Filter */}
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-xl text-[12.5px] font-medium text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all">
            Filter <FilterIcon />
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-50">
            <th className="w-10 px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleAll}
                className="w-3.5 h-3.5 rounded border-gray-300 accent-indigo-600 cursor-pointer"
              />
            </th>
            <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">
              Activity / Category
            </th>
            <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">
              Order ID
            </th>
            <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">
              Date &amp; Time
            </th>
            <th className="px-3 py-3 text-right text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase pr-8">
              Amount
            </th>
            <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">
              Status / Type
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {paginated.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-12 text-sm text-gray-400">
                No transactions found.
              </td>
            </tr>
          ) : (
            paginated.map((t) => (
              <tr
                key={t.id}
                className={`transition-colors ${selected.includes(t.id) ? "bg-indigo-50/40" : "hover:bg-gray-50/60"}`}
              >
                {/* Checkbox */}
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(t.id)}
                    onChange={() => toggleRow(t.id)}
                    className="w-3.5 h-3.5 rounded border-gray-300 accent-indigo-600 cursor-pointer"
                  />
                </td>

                {/* Activity */}
                <td className="px-3 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${t.iconBg}`}>
                      {t.icon}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-800">{t.activity}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{t.category}</p>
                    </div>
                  </div>
                </td>

                {/* Order ID */}
                <td className="px-3 py-4">
                  <span className="text-[12.5px] text-gray-500 font-medium">{t.orderId}</span>
                </td>

                {/* Date & Time */}
                <td className="px-3 py-4">
                  <p className="text-[12.5px] text-gray-700 font-medium">{t.date}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{t.time}</p>
                </td>

                {/* Amount */}
                <td className="px-3 py-4 text-right pr-8">
                  <span
                    className={`text-[13.5px] font-bold ${
                      t.amount >= 0 ? "text-emerald-500" : "text-gray-800"
                    }`}
                  >
                    {t.amount >= 0 ? "+" : "-"}${fmt(t.amount)}
                  </span>
                </td>

                {/* Status */}
                <td className="px-3 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      t.type === "Income"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        t.type === "Income" ? "bg-emerald-500" : "bg-red-400"
                      }`}
                    />
                    {t.type}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50">
        <p className="text-[12px] text-gray-400">
          Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
          {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} transactions
        </p>

        {/* Pagination */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-[12px] font-semibold transition-all ${
                page === p
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}