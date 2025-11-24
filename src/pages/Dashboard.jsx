import DashboardLayout from "../layouts/DashboardLayout";
import DashboardStats from "../components/DashboardStats";
import RecentTransactions from "../components/RecentTransactions";
import ScheduledTransfers from "../components/ScheduledTransfers";

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="w-full max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-7 xl:gap-8">
          {/* ---------------- SOL SÜTUN ---------------- */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <DashboardStats />

            {/* Working Capital */}
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-5 lg:p-6 min-h-60 lg:min-h-[291px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
                <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                  Working Capital
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    <span className="text-[10px] sm:text-xs text-gray-600">
                      Income
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <span className="text-[10px] sm:text-xs text-gray-600">
                      Expenses
                    </span>
                  </div>
                  <select className="text-[10px] sm:text-xs border border-gray-200 rounded-lg px-2 py-1">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                  </select>
                </div>
              </div>

              <div className="h-44 sm:h-48 lg:h-52 bg-gray-50 rounded-lg flex items-center justify-center text-xs sm:text-sm text-gray-400">
                Chart goes here
              </div>
            </section>

            {/* Recent Transactions */}
            <RecentTransactions />
          </div>

          {/* ---------------- SAĞ SÜTUN ---------------- */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* Wallet */}
            <section className="bg-white p-4 sm:p-5 lg:p-6 min-h-[280px] lg:min-h-[359px]">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-sm sm:text-base font-semibold">Wallet</h2>
                <button className="text-gray-400 hover:text-gray-600">
                  •••
                </button>
              </div>
              <div className="h-56 sm:h-64 lg:h-72 flex items-center justify-center text-gray-300 text-xs sm:text-sm">
                Wallet content
              </div>
            </section>
            {/* Scheduled Transfers */}
            <ScheduledTransfers />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
