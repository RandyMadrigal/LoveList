import { Outlet } from "react-router-dom";

function PageLayout() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
    </main>
  );
}

export default PageLayout;
