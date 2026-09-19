import { Link } from "react-router-dom";

// Love pages hide the app navbar; the pages that replace them keep a way home.
function MinimalHeader() {
  return (
    <header className="absolute inset-x-0 top-0 px-4 pt-4 text-left">
      <Link
        to="/"
        className="glass-light inline-flex items-center gap-2 rounded-full py-1.5 pl-3 pr-4 text-lg font-bold leading-none tracking-[-0.05em]"
      >
        <img src="/heart.svg" alt="" className="h-5 w-5" />
        why?
      </Link>
    </header>
  );
}

export default MinimalHeader;
