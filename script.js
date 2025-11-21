// Main JavaScript for ChessKraft Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeMobileMenu();
    initializeChessboards();
    initializeCounters();
    initializeProgressBars();
    initializeScrollAnimations();
});

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            mobileMenuBtn.innerHTML = navLinks.style.display === 'flex' ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 968) {
                    navLinks.style.display = 'none';
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 968) {
                navLinks.style.display = 'flex';
            } else {
                navLinks.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Initialize Chessboards
function initializeChessboards() {
    const chessboards = document.querySelectorAll('.chessboard');
    
    chessboards.forEach(chessboard => {
        // Only initialize if empty
        if (chessboard.children.length === 0) {
            const startingPosition = [
                ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
                ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
                ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
            ];
            
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const square = document.createElement('div');
                    square.className = `square ${(i + j) % 2 === 0 ? 'light' : 'dark'}`;
                    
                    if (startingPosition[i][j]) {
                        square.textContent = startingPosition[i][j];
                    }
                    
                    chessboard.appendChild(square);
                }
            }
        }
    });
}

// Animated Counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + (counter.getAttribute('data-count') === '98' ? '%' : '+');
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Progress Bars Animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width + '%';
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .course-card, .benefit-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add interactive chess piece animations
document.querySelectorAll('.hero-piece').forEach(piece => {
    piece.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
        
        // Add a bounce effect
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
});


