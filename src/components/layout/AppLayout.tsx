import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Router-level scroll handling: jump to #hash targets, otherwise reset to the top.
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}

function AppLayout() {
  useScrollOnNavigate();
  const { pathname } = useLocation();

  // Love pages are full-screen experiences with their own frame
  const immersive = pathname.startsWith("/love/");

  return (
    <div className="flex min-h-dvh flex-col">
      {!immersive && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!immersive && <Footer />}
    </div>
  );
}

export default AppLayout;
