$antiFlickerText = @"
    <script id="anti_flicker">
        (function() {
            const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            if (theme === 'dark') document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
        })();
    </script>
"@

$themeToggleText = @"
        <!-- Theme Toggle Toggle -->
        <button id="themeToggle" class="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all group overflow-hidden focus:outline-none ml-1 shadow-sm border border-slate-200/50 dark:border-white/5" aria-label="Toggle Theme">
            <div class="relative w-[20px] h-[20px]">
                <!-- Sun Icon -->
                <svg class="absolute inset-0 w-full h-full text-amber-500 transition-all duration-300 transform dark:-rotate-180 dark:opacity-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <!-- Moon Icon -->
                <svg class="absolute inset-0 w-full h-full text-blue-400 transition-all duration-300 transform rotate-180 opacity-0 dark:rotate-0 dark:opacity-100 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
            </div>
        </button>
"@

Get-ChildItem -Filter *.html | ForEach-Object {
    $filepath = $_.FullName
    $content = [System.IO.File]::ReadAllText($filepath)
    
    # 1. Colors - Mass Replace
    $content = $content -replace 'dark:bg-slate-950', 'dark:bg-[#0a0a0a]'
    $content = $content -replace 'dark:bg-slate-900', 'dark:bg-[#0f0f0f]'
    
    # 2. Anti-flicker injection
    if ($content -notmatch 'id="anti_flicker"') {
        if ($content -match '</head>') {
            $content = $content -replace '</head>', "$antiFlickerText`n</head>"
        }
    }
    
    # 3. Theme Toggle injection - Robust Anchor
    if ($content -notmatch 'id="themeToggle"') {
        if ($content -match '(?s)</div>\s*</div>\s*</nav>') {
             $content = $content -replace '(</div>\s*</div>\s*</nav>)', "$themeToggleText`n`$1"
        }
    }
    
    [System.IO.File]::WriteAllText($filepath, $content)
}

Write-Host "Site-wide synchronization complete!"
