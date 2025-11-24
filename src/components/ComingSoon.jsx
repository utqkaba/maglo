export default function ComingSoon({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <img
        src="../public/comingSoon.jpg"
        alt="Coming Soon"
        className="w-auto h-80"
      />

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title} Page</h1>

      <p className="text-gray-500 text-lg">
        This page is under construction. New features will be available soon.
      </p>
    </div>
  );
}
