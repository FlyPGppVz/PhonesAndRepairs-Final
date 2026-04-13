import os
import re

# Snippets
ANTI_FLICKER = """    <script id="anti-flicker">
        (function() {
            const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            if (theme === 'dark') document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
        })();
    </script>"""

THEME_TOGGLE = """    <!-- Theme Toggle Toggle -->
    <button id="themeToggle" class="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group overflow-hidden focus:outline-none ml-1 shadow-sm border border-slate-200/50 dark:border-slate-700/50" aria-label="Toggle Theme">
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
    </button>"""

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Colors
    # Replace slate-950 with neutral-950 (or equivalent) in classes
    content = content.replace('dark:bg-slate-950', 'dark:bg-neutral-950')
    content = content.replace('dark:bg-slate-900', 'dark:bg-[#0a0a0a]') # Using the requested black
    
    # 2. Inject Anti-Flicker in <head>
    if 'id="anti-flicker"' not in content:
        if '</head>' in content:
            content = content.replace('</head>', ANTI_FLICKER + '\n</head>')
        else:
            print(f"Warning: No </head> tag found in {filepath}")

    # 3. Inject Theme Toggle in Navbar
    if 'id="themeToggle"' not in content:
        # Looking for the right-aligned icon container
        # Pattern usually ends with person icon
        person_icon_pattern = r'(<button[^>]*>person</button>\s*(?:</div>\s*){1,2}</div>)'
        if re.search(person_icon_pattern, content):
            # Insert before the last </div> of that group
            content = re.sub(person_icon_pattern, r'\1\n' + THEME_TOGGLE, content, 1)
        else:
            # Fallback: search for justify-end and end of that div
            fallback_pattern = r'(justify-end[^>]*>.*?(?:material-symbols-outlined.*?>.*?){2,3}.*?)(</div>)'
            if re.search(fallback_pattern, content, re.DOTALL):
                 content = re.sub(fallback_pattern, r'\1\n' + THEME_TOGGLE + r'\2', content, 1, re.DOTALL)
            else:
                 print(f"Warning: Could not find insertion point for theme toggle in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Main
html_files = [f for f in os.listdir('.') if f.endswith('.html')]
for file in html_files:
    print(f"Processing {file}...")
    try:
        process_file(file)
    except Exception as e:
        print(f"Error processing {file}: {e}")

print("Done!")
