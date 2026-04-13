import os
import re

# Snippets
ANTI_FLICKER = """    <script id="anti_flicker">
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

    # Skip files that are not true pages or already handled
    if 'id="themeToggle"' in content and 'id="anti_flicker"' in content and 'dark:bg-neutral-950' in content:
        return

    # 1. Update Colors
    content = content.replace('dark:bg-slate-950', 'dark:bg-neutral-950')
    content = content.replace('dark:bg-slate-900', 'dark:bg-neutral-900') # Better fallback for deep dark
    content = content.replace('dark:bg-slate-800', 'dark:bg-neutral-800')
    
    # 2. Inject Anti-Flicker in <head>
    if 'id="anti_flicker"' not in content:
        if '</head>' in content:
            content = content.replace('</head>', ANTI_FLICKER + '\n</head>')

    # 3. Inject Theme Toggle in Navbar
    if 'id="themeToggle"' not in content:
        # Search for the person icon button and its container
        # We look for the button with 'person' text and go up to its parent div if it has 'group' or 'relative'
        # Most files follow the pattern <div class="relative group"> ... person ... </div>
        
        # Try to find the person icon block
        # We look for a </div> that is followed by another </div> which usually closes the icon container flex
        person_pattern = r'(<button[^>]*>\s*person\s*</button>.*?(?:</div>\s*){1,2})'
        match = re.search(person_pattern, content, re.DOTALL)
        if match:
            # Insert after the match
            content = content[:match.end()] + "\n" + THEME_TOGGLE + content[match.end():]
        else:
            # Fallback to shopping_cart
            cart_pattern = r'(<a[^>]*href="[^"]*shopping-cart[^"]*"[^>]*>.*?</a>.*?(?:</div>\s*){1,2})'
            match = re.search(cart_pattern, content, re.DOTALL)
            if match:
                content = content[:match.end()] + "\n" + THEME_TOGGLE + content[match.end():]
            else:
                 print(f"Warning: Could not find insertion point in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Main
html_files = [f for f in os.listdir('.') if f.endswith('.html')]
for file in html_files:
    if file in ['index.html', 'shop-fully-connected.html', 'services-unified-nav.html']:
         # Core pages already have them but might need color updates
         pass
    
    # print(f"Processing {file}...") # Too much output
    process_file(file)

print("Batch update complete!")
