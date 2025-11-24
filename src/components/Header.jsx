import { MdSearch, MdNotifications, MdKeyboardArrowDown } from "react-icons/md";
import { useAuthStore } from "../store/authStore";
import { useProfile } from "../hooks/useAuth";

export default function Header({ title = "Dashboard" }) {
  const { user } = useAuthStore();

  // Profile'ı fetch et (background'da)
  useProfile();

  return (
    <header className="flex h-10 sm:h-12 lg:h-12 xl:h-13 shrink-0 items-center justify-between bg-white">
      <h1 className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-semibold truncate cursor-default">
        {title}
      </h1>

      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
        <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition">
          <MdSearch
            size={18}
            className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-600"
          />
        </button>

        <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition relative">
          <MdNotifications
            size={18}
            className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-600"
          />
          <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button className="flex items-center sm:gap-3 bg-gray-100 rounded-full px-2 py-1 transition">
          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-linear-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <span className="hidden sm:inline text-xs lg:text-sm font-medium max-w-[100px] md:max-w-[150px] xl:max-w-none truncate">
            {user?.fullName || "User"}
          </span>

          <MdKeyboardArrowDown
            size={18}
            className="hidden sm:block ml-3 mr-2 text-gray-600"
          />
        </button>
      </div>
    </header>
  );
}
