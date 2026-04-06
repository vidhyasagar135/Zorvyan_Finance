import { useState } from "react";

export default function Header({ pageTitle = "Overview" }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notifActive, setNotifActive] = useState(false);
  const [role, setRole] = useState("Viewer");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 px-5 h-14 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-6">

        {/* ── Updated Logo ── */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)" }}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <rect x="2"  y="2"  width="7" height="7" rx="1.5" fill="white" fillOpacity="0.95"/>
              <rect x="11" y="2"  width="7" height="7" rx="1.5" fill="white" fillOpacity="0.5"/>
              <rect x="2"  y="11" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.5"/>
              <rect x="11" y="11" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.78"/>
            </svg>
          </div>
          <span className="text-[15px] font-bold text-gray-900 tracking-tight">
            FinDash
          </span>
        </div>

        <div className="h-5 w-px bg-gray-200" />

        <span className="text-[14px] font-medium text-gray-700">
          {pageTitle}
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* SEARCH */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
            searchFocused
              ? "border-indigo-400 bg-white ring-2 ring-indigo-100 w-56"
              : "border-gray-200 bg-gray-50 w-48"
          }`}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* ROLE TOGGLE */}
        <div className="flex bg-gray-100 rounded-lg p-1 text-xs">
          <button
            onClick={() => setRole("Viewer")}
            className={`px-3 py-1 rounded transition-all ${
              role === "Viewer" ? "bg-white shadow text-gray-800 font-medium" : "text-gray-500"
            }`}
          >
            Viewer
          </button>
          <button
            onClick={() => setRole("Admin")}
            className={`px-3 py-1 rounded transition-all ${
              role === "Admin" ? "bg-indigo-100 text-indigo-700 font-medium" : "text-gray-500"
            }`}
          >
            Admin
          </button>
        </div>

        {/* NOTIFICATION */}
        <button
          onClick={() => setNotifActive(!notifActive)}
          className={`relative w-8 h-8 flex items-center justify-center rounded-lg border transition-colors ${
            notifActive
              ? "bg-indigo-50 border-indigo-200 text-indigo-600"
              : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-1 ring-white" />
        </button>

        {/* USER DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)" }}
            >
              AC
            </div>
            <span className="text-[13px] font-semibold text-gray-700">Alex</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="px-3 py-2.5 border-b border-gray-50">
                <p className="text-[12px] font-semibold text-gray-800">Alex Carter</p>
                <p className="text-[11px] text-gray-400">alex@findash.io</p>
              </div>
              <div className="py-1">
                <button className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  Profile
                </button>
                <button className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                  Settings
                </button>
                <div className="mx-2 my-1 border-t border-gray-50" />
                <button className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-[13px] text-red-500 hover:bg-red-50 transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}