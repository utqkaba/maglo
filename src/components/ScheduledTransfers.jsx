import { useScheduledTransfers } from "../hooks/useScheduledTransfers";

export default function ScheduledTransfers() {
  const { data, isLoading, error } = useScheduledTransfers();

  // Loading state
  if (isLoading) {
    return (
      <section className="bg-white rounded-2xl shadow-sm p-6 min-h-[350px]">
        <div className="flex justify-between items-center mb-5">
          <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="space-y-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-none animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>

                <div className="flex flex-col gap-2">
                  <div className="h-3 w-28 bg-gray-200 rounded"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-white rounded-2xl shadow-sm p-6 min-h-[350px] flex items-center justify-center text-red-500">
        Failed to load.
      </section>
    );
  }

  const transfers = data?.data?.transfers || [];

  return (
    <section className="bg-white p-2 min-h-[350px]">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-[15px] font-semibold text-gray-900">
          Scheduled Transfers
        </h2>
        <button className="flex items-center gap-1 text-(--color-view) text-sm hover:text-teal-700">
          View All <span className="ml-1 mb-1">{">"}</span>
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {transfers.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-none"
          >
            <div className="flex items-center gap-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-8 h-8 rounded-full object-cover"
              />

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {t.name}
                </span>

                <span className="text-xs text-gray-400">
                  {new Date(t.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(t.date).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            {/* AMOUNT */}
            <span className="text-base font-semibold text-gray-900">
              {t.amount < 0 ? <span className="mr-2">-</span> : ""}
              {t.currency}
              {Math.abs(t.amount).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
