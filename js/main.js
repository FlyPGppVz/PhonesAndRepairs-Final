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

    console.log("App initialized.");
});
