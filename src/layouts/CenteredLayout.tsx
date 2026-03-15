import { Outlet } from "react-router-dom";

function CenteredLayout() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-white">
      <div className="w-full max-w-10/12 px-6">
        <Outlet />
      </div>
    </main>
  );
}

export default CenteredLayout;
