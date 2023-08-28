// Handle the skill progress bars
document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach((bar) => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.width = level + '%';
            bar.parentNode.style.opacity = 1;
            bar.parentNode.style.transform = 'translateY(0)';
        }, 500);
    });

    // Animate name in header
    setTimeout(() => {
        const nameElement = document.getElementById('nameAnimation');
        nameElement.textContent = 'Steeven Leneveu';
        nameElement.style.opacity = 1;
    }, 500);

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeToggle.textContent = document.body.classList.contains('dark-theme') ? 'Thème Clair' : 'Thème Sombre';
    });
});
