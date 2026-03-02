// ============================================
// FREEdome Launch System — Landing Page
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Counter Animation (4 gün → 40 saniye) ---
    function animateCounter(element, target, suffix = '', duration = 2000) {
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Observe counter elements
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const suffix = el.dataset.suffix || '';
                animateCounter(el, target, suffix);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-counter]').forEach(el => {
        counterObserver.observe(el);
    });

    // --- Lead Form ---
    const form = document.getElementById('lead-form');
    const formContainer = document.getElementById('form-container');
    const successContainer = document.getElementById('form-success');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('lead-email').value;
            const company = document.getElementById('lead-company').value;

            // Simple validation
            if (!email || !company) {
                alert('Lütfen zorunlu alanları doldurun.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Lütfen geçerli bir e-posta adresi girin.');
                return;
            }

            // Show success
            formContainer.style.display = 'none';
            successContainer.classList.add('show');

            // Scroll to success message
            successContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Parallax effect on hero ---
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const rate = scrollTop * 0.3;
            heroSection.style.setProperty('--parallax-offset', `${rate}px`);
        });
    }
});
