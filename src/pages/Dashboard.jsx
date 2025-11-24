import DashboardLayout from "../layouts/DashboardLayout";
import DashboardStats from "../components/DashboardStats";
import RecentTransactions from "../components/RecentTransactions";
import ScheduledTransfers from "../components/ScheduledTransfers";
import WorkingCapital from "../components/WorkingCapital";

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="w-full max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-7 xl:gap-8">
          {/* ---------------- SOL SÜTUN ---------------- */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <DashboardStats />
            {/* Working Capital */}
            <WorkingCapital />
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
