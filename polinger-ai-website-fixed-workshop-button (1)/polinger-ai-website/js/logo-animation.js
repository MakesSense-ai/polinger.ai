document.addEventListener('DOMContentLoaded', function() {
    // Logo files array with paths to client logos
    const logoFiles = [
        'images/clients/1.png',
        'images/clients/2.png',
        'images/clients/3.png',
        'images/clients/4.png',
        'images/clients/5.png',
        'images/clients/6.png',
        'images/clients/7.png',
        'images/clients/8.png',
        'images/clients/9.png',
        'images/clients/10.png',
        'images/clients/11.png',
        'images/clients/12.png',
        'images/clients/13.png',
        'images/clients/14.png',
        'images/clients/15.png',
        'images/clients/why logo for site.png'
    ];

    // Function to distribute logos evenly across two rows without repeats
    function distributeLogos() {
        // Remove any duplicates from the array
        const uniqueLogos = [...new Set(logoFiles)];
        
        // Calculate how many logos per row (divide evenly)
        const logosPerRow = Math.ceil(uniqueLogos.length / 2);
        
        // Create arrays for each row
        const row1Logos = uniqueLogos.slice(0, logosPerRow);
        const row2Logos = uniqueLogos.slice(logosPerRow);
        
        return [row1Logos, row2Logos];
    }

    // Get distributed logos
    const [row1Logos, row2Logos] = distributeLogos();

    // Function to create logo elements
    function createLogoElements(trackId, logos) {
        const track = document.getElementById(trackId);
        if (!track) return; // Safety check
        
        // Create logos
        logos.forEach(logo => {
            const logoItem = document.createElement('div');
            logoItem.className = 'logo-item';
            
            const img = document.createElement('img');
            img.src = logo;
            img.alt = 'Client Logo';
            
            logoItem.appendChild(img);
            track.appendChild(logoItem);
        });
        
        // Clone the entire track for seamless infinite scrolling
        const originalItems = Array.from(track.children);
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // Populate the two tracks with logos
    createLogoElements('track1', row1Logos);
    createLogoElements('track2', row2Logos);

    // Function to adjust animation speed based on screen width
    function adjustAnimationSpeed() {
        const root = document.documentElement;
        const width = window.innerWidth;
        
        // Adjust speed for different screen sizes
        if (width < 768) {
            root.style.setProperty('--animation-speed', '35s');
        } else if (width < 1200) {
            root.style.setProperty('--animation-speed', '40s');
        } else {
            root.style.setProperty('--animation-speed', '45s');
        }
    }

    // Initial adjustment and listen for resize events
    adjustAnimationSpeed();
    window.addEventListener('resize', adjustAnimationSpeed);
});
