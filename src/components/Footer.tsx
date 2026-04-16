import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-neutral-950">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 px-8 py-16 max-w-7xl mx-auto">
        <div className="col-span-2 lg:col-span-1">
          <div className="font-semibold text-slate-900 dark:text-white mb-4">PhonesAndRepairs</div>
          <p className="font-sans text-sm text-slate-500 dark:text-slate-400 max-w-xs text-balance">
            Precision engineering for your digital life. Repairs and accessories for the modern professional.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">Services</p>
          <a className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all" href="#">iPhone Repair</a>
          <a className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all" href="#">Android Repair</a>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">Legal</p>
          <a className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all" href="#">Privacy Policy</a>
          <a className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all" href="#">Terms</a>
        </div>
      </div>
      <div className="px-8 py-8 border-t border-slate-200/50 dark:border-slate-800/50 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-sm text-slate-500 dark:text-slate-400">© 2024 PhonesAndRepairs. All rights reserved.</p>
      </div>
    </footer>
  );
}
