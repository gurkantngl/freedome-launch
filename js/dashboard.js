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

    // ============================================
    // Chart.js — KPI Grafikleri
    // ============================================

    const chartColors = {
        purple: '#6c5ce7',
        lavender: '#a29bfe',
        blue: '#74b9ff',
        teal: '#00cec9',
        yellow: '#fdcb6e',
        red: '#ff6b6b',
        grid: 'rgba(255, 255, 255, 0.06)',
        text: '#a0a0b8'
    };

    // Shared defaults for dark theme
    Chart.defaults.color = chartColors.text;
    Chart.defaults.borderColor = chartColors.grid;
    Chart.defaults.font.family = "'Inter', sans-serif";

    // --- Simulated 72h data (every 6 hours = 12 data points) ---
    const hours = ['0h', '6h', '12h', '18h', '24h', '30h', '36h', '42h', '48h', '54h', '60h', '66h', '72h'];
    const trendData = {
        ctr: [2.1, 2.8, 3.2, 3.5, 3.8, 4.0, 3.9, 4.2, 4.5, 4.6, 4.7, 4.8, 4.8],
        formRate: [15, 18, 20, 22, 24, 24.1, 25, 26, 27, 27.5, 28, 28.2, 28.5],
        activation: [20, 25, 28, 30, 33, 35, 37, 38.5, 40, 41, 42, 42.8, 43.2]
    };

    function createTrendChart() {
        const ctx = document.getElementById('trendChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: hours,
                datasets: [
                    {
                        label: 'Landing CTR (%)',
                        data: trendData.ctr,
                        borderColor: chartColors.purple,
                        backgroundColor: 'rgba(108, 92, 231, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 3,
                        pointHoverRadius: 6,
                        pointBackgroundColor: chartColors.purple,
                        borderWidth: 2.5
                    },
                    {
                        label: 'Form Dolum (%)',
                        data: trendData.formRate,
                        borderColor: chartColors.teal,
                        backgroundColor: 'rgba(0, 206, 201, 0.08)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 3,
                        pointHoverRadius: 6,
                        pointBackgroundColor: chartColors.teal,
                        borderWidth: 2.5
                    },
                    {
                        label: 'Aktivasyon (%)',
                        data: trendData.activation,
                        borderColor: chartColors.blue,
                        backgroundColor: 'rgba(116, 185, 255, 0.08)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 3,
                        pointHoverRadius: 6,
                        pointBackgroundColor: chartColors.blue,
                        borderWidth: 2.5
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                interaction: { intersect: false, mode: 'index' },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { usePointStyle: true, padding: 20, font: { size: 12 } }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 10, 15, 0.9)',
                        titleColor: '#f0f0f5',
                        bodyColor: '#a0a0b8',
                        borderColor: 'rgba(108, 92, 231, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        padding: 12
                    }
                },
                scales: {
                    x: {
                        grid: { color: chartColors.grid },
                        ticks: { font: { size: 11 } }
                    },
                    y: {
                        grid: { color: chartColors.grid },
                        ticks: { font: { size: 11 } },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // --- Hook Performance Bar Chart ---
    function createHookChart() {
        const ctx = document.getElementById('hookChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Hook 1\nKıyaslama', 'Hook 2\nKimlik', 'Hook 3\nProvokasyon'],
                datasets: [
                    {
                        label: 'CTR (%)',
                        data: [5.2, 3.8, 4.5],
                        backgroundColor: [
                            'rgba(108, 92, 231, 0.8)',
                            'rgba(162, 155, 254, 0.8)',
                            'rgba(116, 185, 255, 0.8)'
                        ],
                        borderColor: [chartColors.purple, chartColors.lavender, chartColors.blue],
                        borderWidth: 2,
                        borderRadius: 8,
                        barPercentage: 0.6
                    },
                    {
                        label: 'CPL ($)',
                        data: [5.80, 7.20, 6.10],
                        backgroundColor: [
                            'rgba(0, 206, 201, 0.8)',
                            'rgba(253, 203, 110, 0.8)',
                            'rgba(0, 206, 201, 0.6)'
                        ],
                        borderColor: [chartColors.teal, chartColors.yellow, chartColors.teal],
                        borderWidth: 2,
                        borderRadius: 8,
                        barPercentage: 0.6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { usePointStyle: true, padding: 16, font: { size: 12 } }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 10, 15, 0.9)',
                        titleColor: '#f0f0f5',
                        bodyColor: '#a0a0b8',
                        borderColor: 'rgba(108, 92, 231, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        padding: 12
                    }
                },
                scales: {
                    x: { grid: { display: false }, ticks: { font: { size: 11 } } },
                    y: {
                        grid: { color: chartColors.grid },
                        ticks: { font: { size: 11 } },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // --- Lead Source Doughnut Chart ---
    function createSourceChart() {
        const ctx = document.getElementById('sourceChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Meta Ads', 'TikTok Ads', 'LinkedIn', 'E-posta', 'Referral'],
                datasets: [{
                    data: [18, 12, 8, 5, 4],
                    backgroundColor: [
                        chartColors.purple,
                        chartColors.teal,
                        chartColors.blue,
                        chartColors.yellow,
                        chartColors.lavender
                    ],
                    borderColor: 'rgba(10, 10, 15, 0.8)',
                    borderWidth: 3,
                    hoverBorderColor: '#f0f0f5',
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true, padding: 16, font: { size: 12 } }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 10, 15, 0.9)',
                        titleColor: '#f0f0f5',
                        bodyColor: '#a0a0b8',
                        borderColor: 'rgba(108, 92, 231, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        padding: 12,
                        callbacks: {
                            label: function (context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const pct = ((context.parsed / total) * 100).toFixed(1);
                                return ` ${context.label}: ${context.parsed} lead (${pct}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // --- Initialize charts when section is visible ---
    const chartSection = document.getElementById('kpi-charts');
    if (chartSection) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    createTrendChart();
                    createHookChart();
                    createSourceChart();
                    chartObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        chartObserver.observe(chartSection);
    }
});
