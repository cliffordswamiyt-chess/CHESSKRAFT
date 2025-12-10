// About Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeAboutPage();
    initializeTeamAnimations();
    initializeGalleryInteractions();
});

function initializeAboutPage() {
    // Initialize chessboard for story section
    const storyChessboard = document.getElementById('story-chessboard');
    if (storyChessboard) {
        const startingPosition = [
            ['♜', '', '♝', '♛', '♚', '♝', '♞', '♜'],
            ['♟', '♟', '♟', '', '♟', '♟', '♟', '♟'],
            ['', '', '♞', '', '', '', '', ''],
            ['', '', '', '♟', '', '', '', ''],
            ['', '', '', '♙', '', '', '', ''],
            ['', '', '♘', '', '', '', '', ''],
            ['♙', '♙', '♙', '', '♙', '♙', '♙', '♙'],
            ['♖', '', '♗', '♕', '♔', '♗', '', '♖']
        ];
        
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const square = document.createElement('div');
                square.className = `square ${(i + j) % 2 === 0 ? 'light' : 'dark'}`;
                
                if (startingPosition[i][j]) {
                    square.textContent = startingPosition[i][j];
                }
                
                storyChessboard.appendChild(square);
            }
        }
    }
    
    // Animate achievement counters
    const achievementCounters = document.querySelectorAll('.achievement-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    achievementCounters.forEach(counter => {
        observer.observe(counter);
    });
}

function initializeTeamAnimations() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(member);
    });
}

function initializeGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create modal view for gallery item
            createGalleryModal(this);
        });
        
        // Add keyboard navigation
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                createGalleryModal(this);
            }
        });
        
        // Make gallery items focusable
        item.setAttribute('tabindex', '0');
    });
}

function createGalleryModal(galleryItem) {
    const caption = galleryItem.querySelector('.gallery-caption').textContent;
    const placeholder = galleryItem.querySelector('.image-placeholder').cloneNode(true);
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    `;
    
    // Modal content
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px; width: 100%; text-align: center;">
            <div class="modal-image" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); 
                     padding: 40px; border-radius: 15px; margin-bottom: 20px;">
            </div>
            <div class="modal-caption" style="color: var(--light-square); font-size: 1.2rem; margin-bottom: 30px;">
                ${caption}
            </div>
            <button class="btn btn-primary close-modal">Close</button>
        </div>
    `;
    
    // Add the placeholder content to modal
    const modalImage = modal.querySelector('.modal-image');
    modalImage.appendChild(placeholder);
    
    // Add close functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
    });
    
    // Close on Escape key
    const closeModal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
    };
    
    const handleEscape = (e) => {
        if (e.key === 'Escape') closeModal();
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Add to page
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Focus the close button for accessibility
    closeBtn.focus();
}

function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Parallax effect for hero section
function initializeParallax() {
    const aboutHero = document.querySelector('.about-hero');
    if (aboutHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            aboutHero.style.transform = `translateY(${parallax}px)`;
        });
    }
}

window.addEventListener('load', initializeParallax);