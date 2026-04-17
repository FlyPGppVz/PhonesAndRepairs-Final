'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // On mount, check current theme
    const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const isDarkMode = theme === 'dark';
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    const theme = newMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[20px] hover:text-blue-500 transition-all p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 active:scale-90"
      aria-label="Toggle Night Mode"
    >
      {isDark ? 'light_mode' : 'dark_mode'}
    </button>
  );
}
