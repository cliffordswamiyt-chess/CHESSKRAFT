// Courses Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeCoursesPage();
    initializeCourseFilter();
    initializeGalleryInteractions();
    initializePricingAnimations();
});

function initializeCoursesPage() {
    // Add animation to course cards
    const courseCards = document.querySelectorAll('.course-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    courseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add click handlers for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterCourses(category);
            
            // Update active filter button
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === category) {
                    btn.classList.add('active');
                }
            });
            
            // Scroll to courses section
            document.querySelector('.courses-grid-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function initializeCourseFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter courses
            const filter = this.getAttribute('data-filter');
            filterCourses(filter);
        });
    });
}

function filterCourses(category) {
    const courseCards = document.querySelectorAll('.course-card');
    const coursesContainer = document.querySelector('.courses-container');
    
    // Add loading animation
    coursesContainer.style.opacity = '0.5';
    coursesContainer.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        courseCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Restore container opacity
        coursesContainer.style.opacity = '1';
    }, 300);
}

function initializeGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            createCourseGalleryModal(this);
        });
        
        // Add keyboard navigation
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                createCourseGalleryModal(this);
            }
        });
        
        // Make gallery items focusable
        item.setAttribute('tabindex', '0');
    });
}

function createCourseGalleryModal(galleryItem) {
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

function initializePricingAnimations() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
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
    
    pricingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Course info modal functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('course-info')) {
        const courseCard = e.target.closest('.course-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        const courseDescription = courseCard.querySelector('.course-description').textContent;
        const courseFeatures = Array.from(courseCard.querySelectorAll('.course-features li')).map(li => li.textContent);
        
        createCourseInfoModal(courseTitle, courseDescription, courseFeatures);
    }
});

function createCourseInfoModal(title, description, features) {
    const modal = document.createElement('div');
    modal.className = 'course-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="background: var(--primary-dark); 
                 border-radius: 15px; padding: 40px; max-width: 600px; width: 100%; 
                 border: 1px solid var(--light-square); max-height: 80vh; overflow-y: auto;">
            <h2 style="color: var(--light-square); margin-bottom: 20px; text-align: center;">${title}</h2>
            <p style="color: #ccc; margin-bottom: 25px; line-height: 1.6;">${description}</p>
            <h3 style="color: var(--light-square); margin-bottom: 15px;">Course Features:</h3>
            <ul style="color: #ccc; margin-bottom: 30px; padding-left: 20px;">
                ${features.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
            </ul>
            <div style="text-align: center;">
                <a href="demo.html" class="btn btn-primary" style="margin-right: 10px;">Enroll Now</a>
                <button class="btn btn-outline close-course-modal">Close</button>
            </div>
        </div>
    `;
    
    // Add close functionality
    const closeBtn = modal.querySelector('.close-course-modal');
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
    
    // Focus the first button for accessibility
    modal.querySelector('.btn').focus();
}