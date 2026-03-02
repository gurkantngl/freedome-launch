// ============================================
// FREEdome Launch System — KPI Dashboard
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Tab System ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            // Remove active from all
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Set active
            btn.classList.add('active');
            const targetContent = document.getElementById(target);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // --- KPI Bar Animations ---
    const kpiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.kpi-bar-fill');
                bars.forEach(bar => {
                    const width = bar.dataset.width || '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
                kpiObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.kpi-card').forEach(card => {
        kpiObserver.observe(card);
    });

    // --- Simulated Live Data ---
    const kpiData = {
        'landing-ctr': { current: 4.8, target: 4.0, unit: '%', status: 'good' },
        'form-rate': { current: 28.5, target: 25.0, unit: '%', status: 'good' },
        'lead-quality': { current: 72, target: 65, unit: '/100', status: 'good' },
        'activation': { current: 43.2, target: 40.0, unit: '%', status: 'good' },
        'viral-coeff': { current: 0.18, target: 0.15, unit: '', status: 'good' },
        'cpl': { current: 6.40, target: 8.0, unit: ' USD', status: 'good' },
        'email-open': { current: 44.1, target: 40.0, unit: '%', status: 'good' }
    };

    // Animate KPI values
    function animateValue(element, target, decimals = 1, duration = 1500) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = (target * eased).toFixed(decimals);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toFixed(decimals);
            }
        }

        requestAnimationFrame(update);
    }

    const valueObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const kpiId = el.closest('.kpi-card')?.dataset.kpi;
                if (kpiId && kpiData[kpiId]) {
                    const data = kpiData[kpiId];
                    const decimals = data.current % 1 !== 0 ? (kpiId === 'cpl' ? 2 : 1) : 0;
                    animateValue(el, data.current, decimals);
                }
                valueObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.kpi-animate-value').forEach(el => {
        valueObserver.observe(el);
    });

    // --- UTM Builder ---
    const utmInputs = document.querySelectorAll('.utm-param');
    const utmOutput = document.getElementById('utm-output');

    if (utmInputs.length > 0 && utmOutput) {
        function updateUTM() {
            const base = 'https://freedome.ai/launch';
            const params = [];

            utmInputs.forEach(input => {
                const value = input.value.trim();
                if (value) {
                    params.push(`${input.dataset.param}=${encodeURIComponent(value)}`);
                }
            });

            const url = params.length > 0 ? `${base}?${params.join('&')}` : base;
            utmOutput.textContent = url;
        }

        utmInputs.forEach(input => {
            input.addEventListener('input', updateUTM);
            input.addEventListener('change', updateUTM);
        });

        // Initial render
        updateUTM();
    }

    // --- Copy UTM ---
    const copyBtn = document.getElementById('utm-copy-btn');
    if (copyBtn && utmOutput) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(utmOutput.textContent).then(() => {
                const original = copyBtn.textContent;
                copyBtn.textContent = 'Kopyalandı!';
                copyBtn.style.background = 'var(--success)';
                setTimeout(() => {
                    copyBtn.textContent = original;
                    copyBtn.style.background = '';
                }, 2000);
            });
        });
    }
});
