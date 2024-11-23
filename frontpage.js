document.addEventListener('DOMContentLoaded', () => {
    // Handle store selection
    const storeNameDropdown = document.getElementById('store-name');
    const storeSelectedDisplay = document.getElementById('store-selected');

    storeNameDropdown.addEventListener('change', () => {
        const selectedStore = storeNameDropdown.value;
        // Fix: Added proper template literal backticks
        storeSelectedDisplay.textContent = selectedStore
            ? `You have selected: ${selectedStore}`
            : 'Select a store from the dropdown above';
    });

    // Scroll-triggered animations
    const scrollElements = document.querySelectorAll('[data-scroll]');

    // Add throttling to prevent excessive scroll event firing
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    const scrollAnimation = () => {
        scrollElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                element.classList.add('data-scroll-visible');
            } else {
                element.classList.remove('data-scroll-visible');
            }
        });
    };

    // Add error handling and null checks
    try {
        if (!storeNameDropdown) {
            console.error('Store name dropdown element not found');
            return;
        }
        if (!storeSelectedDisplay) {
            console.error('Store selected display element not found');
            return;
        }

        // Add throttled scroll listener
        window.addEventListener('scroll', throttle(scrollAnimation, 100));
        
        // Initial check for elements in view
        scrollAnimation();

    } catch (error) {
        console.error('Error initializing store selector:', error);
    }
});