// Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
        
        // Back to Top Button
        const backToTopButton = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
        
        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                document.querySelector('.navbar').style.backgroundColor = 'rgba(17, 17, 17, 0.98)';
            } else {
                document.querySelector('.navbar').style.backgroundColor = 'rgba(17, 17, 17, 0.98)';
            }
        });
        
        // Video play button functionality
        document.querySelector('.video-play-btn').addEventListener('click', function() {
            const iframe = document.querySelector('.video-container iframe');
            iframe.src += "&autoplay=1";
            this.style.display = 'none';
        });
        
        // Vertical Amenities Slider
        document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.amenity-slide');
            const indicators = document.querySelectorAll('.amenity-indicator');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            let currentSlide = 0;
            
            // Function to show a specific slide
            function showSlide(index) {
                // Hide all slides
                slides.forEach(slide => {
                    slide.classList.remove('active');
                });
                
                // Remove active class from all indicators
                indicators.forEach(indicator => {
                    indicator.classList.remove('active');
                });
                
                // Show the selected slide
                slides[index].classList.add('active');
                
                // Activate the corresponding indicator
                indicators[index].classList.add('active');
                
                // Update current slide index
                currentSlide = index;
            }
            
            // Next slide function
            function nextSlide() {
                let nextIndex = currentSlide + 1;
                if (nextIndex >= slides.length) {
                    nextIndex = 0;
                }
                showSlide(nextIndex);
            }
            
            // Previous slide function
            function prevSlide() {
                let prevIndex = currentSlide - 1;
                if (prevIndex < 0) {
                    prevIndex = slides.length - 1;
                }
                showSlide(prevIndex);
            }
            
            // Event listeners for navigation buttons
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            // Event listeners for indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showSlide(index);
                });
            });
            
            // Auto slide every 5 seconds
            setInterval(nextSlide, 5000);
        });
        
        // Gallery animation on scroll
        function animateGalleryItems() {
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, index * 100);
                }
            });
        }
        
        // Video container animation on scroll
        function animateVideoContainer() {
            const videoContainer = document.querySelector('.video-container');
            const rect = videoContainer.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                videoContainer.classList.add('animated');
            }
        }
        
        // Scroll event listeners
        window.addEventListener('scroll', () => {
            animateGalleryItems();
            animateVideoContainer();
        });
        
        // Initial call to check elements in view on page load
        window.addEventListener('load', () => {
            animateGalleryItems();
            animateVideoContainer();
        });
        
        // Map centering function
        function centerMap() {
            const mapContainer = document.querySelector('.map-container');
            const mapIframe = document.getElementById('project-map');
            
            // Add a subtle animation to the map container
            mapContainer.style.transform = 'scale(0.95)';
            setTimeout(() => {
                mapContainer.style.transition = 'transform 0.5s ease';
                mapContainer.style.transform = 'scale(1)';
            }, 100);
            
            // Reload the iframe to ensure it's properly centered
            const currentSrc = mapIframe.src;
            mapIframe.src = currentSrc;
        }
        
        // Call centerMap when the map section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    centerMap();
                }
            });
        }, { threshold: 0.5 });
        
        const mapSection = document.getElementById('s8');
        if (mapSection) {
            observer.observe(mapSection);
        }