export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="container-app py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} SafarSaathi — AI-Powered Autonomous Travel Assistant</p>
        <p className="text-xs">Final Year Project • Frontend Foundation v0.1</p>
      </div>
    </footer>
  );
}
