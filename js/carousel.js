// Image Carousel Component
class ProjectCarousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.images = Array.from(this.carousel.querySelectorAll('.carousel-image'));
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;
        
        this.init();
    }
    
    init() {
        this.createControls();
        this.createThumbnails();
        this.showImage(0);
        this.setupEventListeners();
        this.startAutoPlay();
    }
    
    createControls() {
        const controls = document.createElement('div');
        controls.className = 'carousel-controls';
        controls.innerHTML = `
            <button class="carousel-btn prev" aria-label="Previous image">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="carousel-btn next" aria-label="Next image">
                <i class="fas fa-chevron-right"></i>
            </button>
            <div class="carousel-counter">
                <span class="current">1</span> / <span class="total">${this.images.length}</span>
            </div>
        `;
        this.carousel.appendChild(controls);
    }
    
    createThumbnails() {
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = 'carousel-thumbnails';
        
        this.images.forEach((img, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'carousel-thumbnail';
            thumb.style.backgroundImage = `url(${img.src})`;
            thumb.setAttribute('data-index', index);
            thumb.addEventListener('click', () => this.showImage(index));
            thumbnailContainer.appendChild(thumb);
        });
        
        this.carousel.appendChild(thumbnailContainer);
    }
    
    setupEventListeners() {
        // Navigation buttons
        this.carousel.querySelector('.prev').addEventListener('click', () => this.prev());
        this.carousel.querySelector('.next').addEventListener('click', () => this.next());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.carousel.classList.contains('active')) {
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
                if (e.key === 'Escape') this.close();
            }
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) this.next();
            if (touchEndX > touchStartX + 50) this.prev();
        };
        
        this.handleSwipe = handleSwipe;
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    showImage(index) {
        // Hide all images
        this.images.forEach(img => img.classList.remove('active'));
        
        // Show selected image
        this.currentIndex = index;
        this.images[index].classList.add('active');
        
        // Update counter
        this.carousel.querySelector('.current').textContent = index + 1;
        
        // Update thumbnails
        const thumbnails = this.carousel.querySelectorAll('.carousel-thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }
    
    next() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(nextIndex);
    }
    
    prev() {
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(prevIndex);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize all carousels
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.project-carousel');
    carousels.forEach(carousel => new ProjectCarousel(carousel));
});
