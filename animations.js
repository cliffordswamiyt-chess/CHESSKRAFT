// Advanced Animations for ChessKraft Website

document.addEventListener('DOMContentLoaded', function() {
    initializeParticleEffects();
    initializeChessPieceTrails();
    initializeInteractiveChessboard();
    initializeTypewriterEffect();
});

// Particle Effects for Background
function initializeParticleEffects() {
    const animatedBg = document.querySelector('.animated-bg');
    
    // Create additional floating particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'chess-particle';
        particle.innerHTML = '•';
        particle.style.cssText = `
            position: absolute;
            color: rgba(240, 217, 181, 0.1);
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 10}s infinite linear;
            animation-delay: ${Math.random() * 5}s;
        `;
        animatedBg.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0.1;
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
                opacity: 0.3;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
                opacity: 0.1;
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
                opacity: 0.3;
            }
        }
    `;
    document.head.appendChild(style);
}

// Chess Piece Trails
function initializeChessPieceTrails() {
    const pieces = document.querySelectorAll('.hero-piece');
    
    pieces.forEach(piece => {
        piece.addEventListener('mouseenter', function() {
            createTrailEffect(this);
        });
    });
    
    function createTrailEffect(element) {
        const rect = element.getBoundingClientRect();
        const trails = 5;
        
        for (let i = 0; i < trails; i++) {
            const trail = document.createElement('div');
            trail.innerHTML = element.innerHTML;
            trail.style.cssText = `
                position: absolute;
                font-size: ${parseInt(getComputedStyle(element).fontSize)}px;
                color: rgba(240, 217, 181, ${0.3 - (i * 0.05)});
                left: ${rect.left}px;
                top: ${rect.top}px;
                pointer-events: none;
                z-index: 1;
                transition: all 0.3s ease;
            `;
            
            document.body.appendChild(trail);
            
            // Animate trail
            setTimeout(() => {
                trail.style.transform = `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(0.8)`;
                trail.style.opacity = '0';
            }, 10);
            
            // Remove trail after animation
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 300);
        }
    }
}

// Interactive Chessboard
function initializeInteractiveChessboard() {
    const chessboard = document.getElementById('hero-chessboard');
    
    if (chessboard) {
        let isAnimating = false;
        
        chessboard.addEventListener('click', function() {
            if (isAnimating) return;
            isAnimating = true;
            
            // Animate a knight's move
            animateKnightMove(chessboard);
            
            setTimeout(() => {
                isAnimating = false;
            }, 2000);
        });
    }
}

function animateKnightMove(chessboard) {
    const squares = chessboard.querySelectorAll('.square');
    const knightPositions = [
        [1, 0], [2, 2], [4, 1], [3, 3], [5, 4]
    ];
    
    let currentPosition = 0;
    
    function moveKnight() {
        // Reset all squares
        squares.forEach(square => {
            square.style.backgroundColor = '';
            square.innerHTML = square.textContent; // Keep original pieces
        });
        
        const [row, col] = knightPositions[currentPosition];
        const index = row * 8 + col;
        
        if (squares[index]) {
            // Highlight the square
            squares[index].style.backgroundColor = 'rgba(52, 152, 219, 0.3)';
            
            // Add knight piece
            const originalContent = squares[index].innerHTML;
            squares[index].innerHTML = '♘';
            squares[index].style.fontSize = '28px';
            
            // Restore original content after a delay
            setTimeout(() => {
                squares[index].innerHTML = originalContent;
                squares[index].style.backgroundColor = '';
            }, 500);
        }
        
        currentPosition = (currentPosition + 1) % knightPositions.length;
        
        if (currentPosition < knightPositions.length) {
            setTimeout(moveKnight, 600);
        }
    }
    
    moveKnight();
}

// Typewriter Effect for Hero Title
function initializeTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
    // Start typing when hero section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(heroTitle);
    }
}

// Parallax Scrolling Effect
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.chess-piece-anim, .floating-pawns span');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize parallax on load
window.addEventListener('load', initializeParallax);

// Hover effects for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Audio feedback for interactions
function playChessSound() {
    // This would typically play a chess move sound
    console.log('Chess move sound played');
}

// Add to chessboard interactions
document.querySelectorAll('.chessboard').forEach(board => {
    board.addEventListener('click', playChessSound);
});