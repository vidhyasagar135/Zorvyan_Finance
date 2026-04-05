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
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            F
          </div>
          <span className="text-[15px] font-semibold text-gray-900">
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
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition ${
            searchFocused
              ? "border-indigo-400 bg-white ring-2 ring-indigo-100 w-56"
              : "border-gray-200 bg-gray-50 w-48"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* ROLE TOGGLE (WORKING) */}
        <div className="flex bg-gray-100 rounded-lg p-1 text-xs">
          <button
            onClick={() => setRole("Viewer")}
            className={`px-3 py-1 rounded ${
              role === "Viewer"
                ? "bg-white shadow text-gray-800"
                : "text-gray-500"
            }`}
          >
            Viewer
          </button>
          <button
            onClick={() => setRole("Admin")}
            className={`px-3 py-1 rounded ${
              role === "Admin"
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-500"
            }`}
          >
            Admin
          </button>
        </div>

        {/* NOTIFICATION (CLICKABLE) */}
        <button
          onClick={() => setNotifActive(!notifActive)}
          className={`relative w-8 h-8 flex items-center justify-center rounded-lg border ${
            notifActive
              ? "bg-indigo-50 text-indigo-600"
              : "bg-white text-gray-500"
          }`}
        >
          🔔
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* USER DROPDOWN (WORKING) */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">
              AC
            </div>
            <span className="text-sm font-medium">Alex</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
              <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                Profile
              </button>
              <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                Settings
              </button>
              <button className="block w-full text-left px-3 py-2 hover:bg-red-100 text-red-500">
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}