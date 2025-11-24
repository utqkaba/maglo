import MainLayout from "../layouts/MainLayout";
import DashboardStats from "../components/DashboardStats";
import RecentTransactions from "../components/RecentTransactions";
import ScheduledTransfers from "../components/ScheduledTransfers";
import WorkingCapital from "../components/WorkingCapital";
import Wallet from "../components/Wallet";

export default function Dashboard() {
  return (
    <MainLayout title="Dashboard">
      <div className="w-full max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-7 xl:gap-8">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <DashboardStats />
            <WorkingCapital />
            <RecentTransactions />
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3 sm:gap-4 lg:gap-5">
            <Wallet />
            <ScheduledTransfers />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
