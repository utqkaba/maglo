import { MdAccountBalanceWallet } from "react-icons/md";
import { useFinancialSummary } from "../hooks/useFinancialSummary";

export default function DashboardStats() {
  const { data, isLoading, isError, error } = useFinancialSummary();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-sm flex-1 h-[90px] sm:h-[100px] lg:h-[105px] bg-gray-100 animate-pulse"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-200"></div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-5 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center p-6 bg-red-50 rounded-xl text-red-600 text-sm">
        <p>
          Error loading financial summary: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: currency || "TRY",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const stats = [
    {
      label: "Total balance",
      value: formatCurrency(
        data?.data?.totalBalance?.amount,
        data?.data?.totalBalance?.currency
      ),
      icon: MdAccountBalanceWallet,
      highlight: true,
    },
    {
      label: "Total spending",
      value: formatCurrency(
        data?.data?.totalExpense?.amount,
        data?.data?.totalExpense?.currency
      ),
      icon: MdAccountBalanceWallet,
      highlight: false,
    },
    {
      label: "Total saved",
      value: formatCurrency(
        data?.data?.totalSavings?.amount,
        data?.data?.totalSavings?.currency
      ),
      icon: MdAccountBalanceWallet,
      highlight: false,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      {stats.map((s, i) => {
        const Icon = s.icon;

        return (
          <div
            key={i}
            className={`
              flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 
              rounded-xl sm:rounded-2xl shadow-sm flex-1
              h-[90px] sm:h-[100px] lg:h-[105px]
              ${
                s.highlight
                  ? "bg-[#363A3F] text-white"
                  : "bg-gray-100 text-gray-900"
              }
            `}
          >
            <div
              className={`
                w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0
                ${s.highlight ? "bg-(--color-maglo)" : "bg-gray-200"}
              `}
            >
              <Icon
                size={18}
                className={`sm:w-5 sm:h-5 ${
                  s.highlight ? "text-black" : "text-gray-600"
                }`}
              />
            </div>

            <div className="flex flex-col leading-tight ml-1">
              <span
                className={`text-sm sm:text-sm ${
                  s.highlight ? "text-gray-300" : "text-gray-400"
                }`}
              >
                {s.label}
              </span>
              <span className="text-base sm:text-xl lg:text-xl font-bold mt-1 sm:mt-2">
                {s.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
