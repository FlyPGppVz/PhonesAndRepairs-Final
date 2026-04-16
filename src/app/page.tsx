import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <div className="max-w-3xl space-y-8">
        <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
          New Next.js Era
        </span>
        <h1 className="text-[5rem] font-bold tracking-tight leading-[0.9] text-balance">
          PhonesAndRepairs.<br/>
          <span className="text-slate-400">Reimagined for Web.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-xl mx-auto text-balance">
          Experience the ultimate fusion of performance and design. Our new Next.js platform brings precision to every interaction.
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <Link 
            href="/admin/shop" 
            className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl"
          >
            Go to Admin CRUD
          </Link>
          <Link 
            href="/shop/iphone-17-pro-max" 
            className="cupertino-glass px-12 py-5 rounded-full font-bold text-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
          >
            View Demo Product
          </Link>
        </div>
      </div>
    </main>
  );
}
