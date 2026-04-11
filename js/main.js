/* 
 * CellphonesAndRepair - Main Logic
 * Handles global interactions like dropdowns, sidebars, and basic navigation functionality.
 */


// Initialize interactive elements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Search Functionality
    const searchInput = document.getElementById('navSearchInput');
    if (searchInput) {
        // Read URL parameters to re-populate search box if we are on the shop page
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery) {
            searchInput.value = searchQuery;
        }

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `shop-fully-connected.html?search=${encodeURIComponent(query)}`;
                } else {
                    window.location.href = 'shop-fully-connected.html';
                }
            }
        });
    }

    // Injection of Chatbot Script
    const chatbotScript = document.createElement('script');
    chatbotScript.src = './js/chatbot.js';
    document.body.appendChild(chatbotScript);

    // Dynamic Product Detail Handlers
    // 1. Storage Capacity Selector
    const storageButtons = document.querySelectorAll('.storage-btn');
    const priceDisplay = document.querySelector('.product-price');
    
    storageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset siblings
            const parent = btn.parentElement;
            parent.querySelectorAll('.storage-btn').forEach(b => {
                b.classList.remove('bg-primary-container', 'text-on-primary-container', 'ring-1', 'ring-primary', 'border-primary');
                b.classList.add('bg-surface-container-lowest', 'text-on-surface', 'border-outline-variant');
            });
            
            // Set active state
            btn.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'border-outline-variant');
            btn.classList.add('bg-primary-container', 'text-on-primary-container', 'ring-1', 'ring-primary', 'border-primary');
            
            // Update Price if dataset exists
            if (btn.dataset.price && priceDisplay) {
                priceDisplay.textContent = btn.dataset.price;
            }
        });
    });

    // 2. Color Selection Switcher
    const colorButtons = document.querySelectorAll('.color-btn');
    const mainImage = document.querySelector('.product-main-image');
    
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset siblings outlines
            const parent = btn.parentElement;
            parent.querySelectorAll('.color-btn').forEach(b => b.style.outline = 'none');
            
            // Set active outline
            btn.style.outline = '2px solid #2563eb';
            btn.style.outlineOffset = '2px';

            // Optional: slight opacity animation
            if (mainImage && btn.dataset.image) {
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.src = btn.dataset.image;
                    mainImage.style.opacity = '1';
                }, 150);
            }
        });
    });

    console.log("App and Chatbot initialized.");
});
