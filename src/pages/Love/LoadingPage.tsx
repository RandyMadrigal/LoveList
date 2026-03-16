export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="text-center">
        {/* Spinner animado usando Tailwind */}
        <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>

        <p className="text-xl font-semibold text-pink-600">Loading...</p>
      </div>
    </div>
  );
}
