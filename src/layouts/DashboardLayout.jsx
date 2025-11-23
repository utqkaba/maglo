import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({ children, title }) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div className="flex w-full min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col w-full min-w-0 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6">
            <Header title={title} />
          </div>

          <main className="flex-1 mt-3 sm:mt-4 md:mt-5 lg:mt-6 pb-6 sm:pb-8 overflow-x-hidden">
            <div className="w-full max-w-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
