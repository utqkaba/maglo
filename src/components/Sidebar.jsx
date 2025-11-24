import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  MdHomeFilled,
  MdInsertChart,
  MdDescription,
  MdAccountBalanceWallet,
  MdSettings,
  MdHelp,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";

import { useLogout } from "../hooks/useAuth";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: MdHomeFilled },
  { name: "Transactions", path: "/transactions", icon: MdInsertChart },
  { name: "Invoices", path: "/invoices", icon: MdDescription },
  { name: "My Wallets", path: "/wallets", icon: MdAccountBalanceWallet },
  { name: "Settings", path: "/settings", icon: MdSettings },
];

const bottomItems = [
  { name: "Help", path: "/help", icon: MdHelp },
  { name: "Logout", icon: MdLogout, isAction: true },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const isActive = (path) => location.pathname === path;

  const handleItemClick = (item) => {
    setIsOpen(false);

    if (item.isAction && item.name === "Logout") {
      logout();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        bg-(--color-sidebar-bg) flex flex-col
        w-[250px] md:w-[220px] lg:w-[248px] xl:w-[280px] 2xl:w-[320px]
        fixed inset-y-0 left-0 z-40
        overflow-y-auto
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0 lg:shrink-0
      `}
      >
        <div className="pt-6 md:pt-7 lg:pt-8 pb-2 px-6 md:px-7 lg:px-8 shrink-0">
          <img src="/Logo.png" alt="Maglo Logo" className="h-6 md:h-7 lg:h-8" />
        </div>

        <nav className="flex-1 px-4 md:px-5 lg:px-6 mt-6 md:mt-7 lg:mt-8 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-sm transition
                  ${
                    active
                      ? "bg-(--color-maglo) text-black font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 md:px-5 lg:px-6 pb-6 md:pb-8 lg:pb-24 shrink-0">
          {bottomItems.map((item) => {
            const Icon = item.icon;

            if (item.isAction) {
              return (
                <button
                  key={item.name}
                  type="button"
                  disabled={isLoggingOut}
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-3 text-sm text-gray-600 hover:bg-gray-100 transition ${
                    isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Icon size={20} />
                  <span>{isLoggingOut ? "Logging out..." : item.name}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-3 text-sm text-gray-600 hover:bg-gray-100 transition"
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
