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

    // 2. Color Selection Switcher (Apple-style)
    const colorButtons = document.querySelectorAll('.color-btn');
    const mainProductImage = document.querySelector('.product-main-image');
    
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset all color buttons in the same container
            const container = btn.parentElement;
            container.querySelectorAll('.color-btn').forEach(b => {
                b.style.outline = 'none';
                b.classList.remove('active-color');
            });
            
            // Apply active blue ring
            btn.classList.add('active-color');
            btn.style.outline = '2px solid #063183';
            btn.style.outlineOffset = '3px';

            // Swap main product image
            const newImage = btn.getAttribute('data-image') || btn.dataset.image;
            if (mainProductImage && newImage) {
                mainProductImage.style.opacity = '0.4';
                setTimeout(() => {
                    mainProductImage.src = newImage;
                    mainProductImage.style.opacity = '1';
                }, 150);
            }

            // Optional: Update color title label
            const colorLabel = document.querySelector('.color-label');
            if (colorLabel && btn.getAttribute('aria-label')) {
                colorLabel.textContent = btn.getAttribute('aria-label');
            }
        });
    });

    console.log("App and Chatbot initialized.");
});
