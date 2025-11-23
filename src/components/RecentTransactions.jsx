import { useRecentTransactions } from "../hooks/useRecentTransactions";

export default function RecentTransactions() {
  const { data, isLoading, error } = useRecentTransactions();

  const transactions = data?.data?.transactions || [];

  // Loading state
  if (isLoading) {
    return (
      <section className="bg-white rounded-2xl shadow-sm p-6 min-h-[293px]">
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 pb-3 border-b border-gray-100 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-200"></div>
                <div className="flex flex-col gap-2">
                  <div className="h-3 bg-gray-200 rounded w-28"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16 justify-self-end"></div>
              <div className="h-3 bg-gray-200 rounded w-16 justify-self-end"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-white rounded-2xl shadow-sm p-6 min-h-[293px] flex items-center justify-center text-red-500 text-sm">
        Unauthorized - Missing or invalid token.
      </section>
    );
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 min-h-[293px]">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-[15px] font-semibold text-gray-900">
          Recent Transaction
        </h2>
        <button className="flex items-center gap-1 text-(--color-view) text-[13px]">
          View All <span className="ml-1 mb-1">{">"}</span>
        </button>
      </div>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-1 mb-3 text-[11px] font-medium text-gray-400">
        <span>NAME/BUSINESS</span>
        <span>TYPE</span>
        <span className="text-right">AMOUNT</span>
        <span className="text-right">DATE</span>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {transactions.slice(0, 3).map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center pb-3 border-b border-gray-100 last:border-none"
          >
            {/* NAME */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                <img src={row.image} className="w-6 h-6 object-contain" />
              </div>

              <div>
                <p className="text-[13px] font-medium text-gray-900">
                  {row.name}
                </p>
                <p className="text-[11px] text-gray-400">{row.business}</p>
              </div>
            </div>

            {/* TYPE */}
            <span className="text-[13px] text-gray-500">{row.type}</span>

            {/* AMOUNT */}
            <span
              className={`text-[13px] font-semibold text-right ${
                row.amount < 0 ? "text-red-500" : "text-green-600"
              }`}
            >
              {row.amount < 0
                ? `-₺${Math.abs(row.amount).toFixed(2)}`
                : `₺${row.amount.toFixed(2)}`}
            </span>

            {/* DATE */}
            <span className="text-[11px] text-right text-gray-400">
              {new Date(row.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
