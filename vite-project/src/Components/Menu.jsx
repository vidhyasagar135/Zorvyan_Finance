import { useState } from "react";

export default function Menu() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "📊" },
    { name: "Analytics", icon: "📈" },
    { name: "Insights", icon: "💡" },
    { name: "Updates", icon: "⏱️" },
    { name: "Chat", icon: "💬", badge: 20 },
  ];

  const generalItems = [
    { name: "Settings", icon: "⚙️" },
    { name: "Help Desk", icon: "❓" },
    { name: "Integration", icon: "🔌" },
  ];

  return (
    <div className="w-56 h-screen bg-gray-50 border-r border-gray-200 flex flex-col px-3 py-3">
      
      {/* TOP CONTENT */}
      <div>
        {/* MENU */}
        <p className="text-[10px] text-gray-400 font-semibold mb-2 tracking-wide">
          MENU
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[12px] transition ${
                active === item.name
                  ? "bg-gray-200 text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{item.icon}</span>
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* GENERAL */}
        <p className="text-[10px] text-gray-400 font-semibold mt-5 mb-2 tracking-wide">
          GENERAL
        </p>

        <div className="space-y-1">
          {generalItems.map((item) => (
            <button
              key={item.name}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] text-gray-600 hover:bg-gray-100"
            >
              <span className="text-sm">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* BOTTOM CARD (MOVED UP) */}
      {/* <div className="mt-auto mb-6 bg-white border rounded-lg p-2 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center text-white text-xs font-bold">
            W
          </div>
          <p className="text-[12px] font-semibold">Upgrade</p>
        </div>

        <p className="text-[10px] text-gray-400 mb-2">
          Boost productivity
        </p>

        <button className="w-full bg-gray-900 text-white text-[11px] py-1.5 rounded-md hover:bg-black">
          Upgrade
        </button>
      </div> */}
    </div>
  );
}