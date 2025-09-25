// Carousel Class - Sustainable and Reusable
class HeroCarousel {
    constructor(selector, options = {}) {
        this.container = document.querySelector(selector);
        if (!this.container) {
            console.warn('Carousel container not found');
            return;
        }
        
        // Default options
        this.options = {
            autoPlay: true,
            autoPlayInterval: 5000,
            transitionDuration: 800,
            enableSwipe: true,
            enableKeyboard: true,
            pauseOnHover: true,
            showProgress: true,
            ...options
        };
        
        // Elements
        this.track = this.container.querySelector('#carouselTrack');
        this.slides = this.container.querySelectorAll('.carousel-slide');
        this.prevBtn = this.container.querySelector('#carouselPrev');
        this.nextBtn = this.container.querySelector('#carouselNext');
        this.indicators = this.container.querySelectorAll('.indicator');
        this.playbackBtn = this.container.querySelector('#carouselPlayback');
        this.progressBar = this.container.querySelector('#carouselProgress');
        this.playIcon = this.playbackBtn?.querySelector('.play-icon');
        this.pauseIcon = this.playbackBtn?.querySelector('.pause-icon');
        
        // State
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isPlaying = this.options.autoPlay;
        this.autoPlayTimer = null;
        this.progressTimer = null;
        this.isTransitioning = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.progressStartTime = 0;
        
        // Initialize
        this.init();
    }
    
    init() {
        if (this.totalSlides === 0) {
            console.warn('No slides found in carousel');
            return;
        }
        
        this.bindEvents();
        this.setupAccessibility();
        this.updateUI();
        
        if (this.isPlaying) {
            this.startAutoPlay();
        }
        
        // Preload images
        this.preloadImages();
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn?.addEventListener('click', () => this.previousSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Playback control
        this.playbackBtn?.addEventListener('click', () => this.togglePlayback());
        
        // Keyboard navigation
        if (this.options.enableKeyboard) {
            document.addEventListener('keydown', (e) => this.handleKeydown(e));
        }
        
        // Touch/Swipe events
        if (this.options.enableSwipe) {
            this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        }
        
        // Mouse events for pause on hover
        if (this.options.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
            this.container.addEventListener('mouseleave', () => this.resumeAutoPlay());
        }
        
        // Visibility API for performance
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
        
        // Window focus/blur for performance
        window.addEventListener('focus', () => this.handleWindowFocus());
        window.addEventListener('blur', () => this.handleWindowBlur());
        
        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
    }
    
    setupAccessibility() {
        // Set ARIA attributes
        this.container.setAttribute('role', 'region');
        this.container.setAttribute('aria-label', 'Carrusel de imágenes');
        
        this.slides.forEach((slide, index) => {
            slide.setAttribute('role', 'group');
            slide.setAttribute('aria-roledescription', 'slide');
            slide.setAttribute('aria-label', `${index + 1} de ${this.totalSlides}`);
        });
        
        // Indicators accessibility
        this.indicators.forEach((indicator, index) => {
            indicator.setAttribute('role', 'tab');
            indicator.setAttribute('aria-controls', `slide-${index}`);
        });
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }
    
    previousSlide() {
        if (this.isTransitioning) return;
        
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }
    
    goToSlide(index) {
        if (index === this.currentSlide || this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide]?.classList.remove('active');
        
        // Add transition classes
        if (index > this.currentSlide) {
            this.slides[this.currentSlide].classList.add('prev');
            this.slides[index].classList.add('next');
        } else {
            this.slides[this.currentSlide].classList.add('next');
            this.slides[index].classList.add('prev');
        }
        
        // Update current slide
        this.currentSlide = index;
        
        // Activate new slide
        setTimeout(() => {
            this.slides.forEach(slide => {
                slide.classList.remove('prev', 'next');
            });
            
            this.slides[this.currentSlide].classList.add('active');
            this.indicators[this.currentSlide]?.classList.add('active');
            
            this.isTransitioning = false;
            this.updateUI();
            
            // Restart autoplay timer
            if (this.isPlaying) {
                this.startAutoPlay();
            }
        }, 50);
        
        // Reset progress
        this.resetProgress();
        
        // Announce to screen readers
        this.announceSlideChange();
    }
    
    togglePlayback() {
        if (this.isPlaying) {
            this.pauseAutoPlay();
        } else {
            this.startAutoPlay();
        }
        
        this.updatePlaybackButton();
    }
    
    startAutoPlay() {
        if (!this.options.autoPlay) return;
        
        this.clearTimers();
        this.isPlaying = true;
        this.progressStartTime = Date.now();
        
        // Auto advance timer
        this.autoPlayTimer = setTimeout(() => {
            this.nextSlide();
        }, this.options.autoPlayInterval);
        
        // Progress bar animation
        if (this.options.showProgress && this.progressBar) {
            this.startProgressAnimation();
        }
        
        this.updatePlaybackButton();
    }
    
    pauseAutoPlay() {
        this.clearTimers();
        this.isPlaying = false;
        this.updatePlaybackButton();
    }
    
    resumeAutoPlay() {
        if (this.options.autoPlay && !document.hidden) {
            this.startAutoPlay();
        }
    }
    
    clearTimers() {
        if (this.autoPlayTimer) {
            clearTimeout(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
            this.progressTimer = null;
        }
    }
    
    startProgressAnimation() {
        if (!this.progressBar) return;
        
        const startTime = Date.now();
        const duration = this.options.autoPlayInterval;
        
        this.progressTimer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            
            this.progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(this.progressTimer);
            }
        }, 16); // ~60fps
    }
    
    resetProgress() {
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
        }
    }
    
    updateUI() {
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
            indicator.setAttribute('aria-selected', index === this.currentSlide);
        });
    }
    
    updatePlaybackButton() {
        if (!this.playbackBtn || !this.playIcon || !this.pauseIcon) return;
        
        if (this.isPlaying) {
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'block';
            this.playbackBtn.setAttribute('aria-label', 'Pausar carrusel');
        } else {
            this.playIcon.style.display = 'block';
            this.pauseIcon.style.display = 'none';
            this.playbackBtn.setAttribute('aria-label', 'Reanudar carrusel');
        }
    }
    
    // Event Handlers
    handleKeydown(e) {
        if (!this.container.matches(':hover') && !this.container.contains(document.activeElement)) {
            return;
        }
        
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case ' ':
                e.preventDefault();
                this.togglePlayback();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides - 1);
                break;
        }
    }
    
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }
    
    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            this.pauseAutoPlay();
        } else if (this.options.autoPlay) {
            this.resumeAutoPlay();
        }
    }
    
    handleWindowFocus() {
        if (this.options.autoPlay && !this.isPlaying) {
            this.resumeAutoPlay();
        }
    }
    
    handleWindowBlur() {
        this.pauseAutoPlay();
    }
    
    handleResize() {
        // Debounce resize handler
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            this.updateUI();
        }, 250);
    }
    
    announceSlideChange() {
        // Create announcement for screen readers
        const announcement = `Slide ${this.currentSlide + 1} de ${this.totalSlides}`;
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.textContent = announcement;
        
        document.body.appendChild(announcer);
        
        setTimeout(() => {
            document.body.removeChild(announcer);
        }, 1000);
    }
    
    preloadImages() {
        this.slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img && !img.complete) {
                const preloadImg = new Image();
                preloadImg.src = img.src;
            }
        });
    }
    
    // Public API methods
    play() {
        this.startAutoPlay();
    }
    
    pause() {
        this.pauseAutoPlay();
    }
    
    next() {
        this.nextSlide();
    }
    
    prev() {
        this.previousSlide();
    }
    
    goto(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.goToSlide(index);
        }
    }
    
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
    
    isAutoPlaying() {
        return this.isPlaying;
    }
    
    destroy() {
        this.clearTimers();
        
        // Remove event listeners
        this.prevBtn?.removeEventListener('click', () => this.previousSlide());
        this.nextBtn?.removeEventListener('click', () => this.nextSlide());
        this.playbackBtn?.removeEventListener('click', () => this.togglePlayback());
        
        document.removeEventListener('keydown', (e) => this.handleKeydown(e));
        document.removeEventListener('visibilitychange', () => this.handleVisibilityChange());
        window.removeEventListener('focus', () => this.handleWindowFocus());
        window.removeEventListener('blur', () => this.handleWindowBlur());
        window.removeEventListener('resize', () => this.handleResize());
        
        this.container.removeEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.container.removeEventListener('touchend', (e) => this.handleTouchEnd(e));
        this.container.removeEventListener('mouseenter', () => this.pauseAutoPlay());
        this.container.removeEventListener('mouseleave', () => this.resumeAutoPlay());
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main hero carousel
    window.heroCarousel = new HeroCarousel('.hero-carousel', {
        autoPlay: true,
        autoPlayInterval: 6000,
        transitionDuration: 800,
        enableSwipe: true,
        enableKeyboard: true,
        pauseOnHover: true,
        showProgress: true
    });
    
    // Handle smooth scrolling for carousel CTAs
    const carouselCTAs = document.querySelectorAll('.carousel-slide a[href^="#"]');
    carouselCTAs.forEach(cta => {
        cta.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement && window.navigationMenu) {
                window.navigationMenu.scrollToSection(targetElement);
            }
        });
    });
});

// Utility functions for external control
function pauseCarousel() {
    if (window.heroCarousel) {
        window.heroCarousel.pause();
    }
}

function playCarousel() {
    if (window.heroCarousel) {
        window.heroCarousel.play();
    }
}

function nextCarouselSlide() {
    if (window.heroCarousel) {
        window.heroCarousel.next();
    }
}

function prevCarouselSlide() {
    if (window.heroCarousel) {
        window.heroCarousel.prev();
    }
}

function goToCarouselSlide(index) {
    if (window.heroCarousel) {
        window.heroCarousel.goto(index);
    }
}

// Add screen reader only styles
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#carousel-sr-styles')) {
        const styles = document.createElement('style');
        styles.id = 'carousel-sr-styles';
        styles.textContent = `
            .sr-only {
                position: absolute !important;
                width: 1px !important;
                height: 1px !important;
                padding: 0 !important;
                margin: -1px !important;
                overflow: hidden !important;
                clip: rect(0, 0, 0, 0) !important;
                white-space: nowrap !important;
                border: 0 !important;
            }
        `;
        document.head.appendChild(styles);
    }
});