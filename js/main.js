var language = language || 'fr';

function toggleLanguage() {
    if (language === 'fr') {
        document.getElementById('languageToggle').innerText = 'Switch to French';
        document.getElementById('main_title').innerText = 'Welcome to My Portfolio';
        document.getElementById('about_me_title').innerText = 'About Me';
        document.getElementById('skills_title').innerText = 'Skills';
        document.getElementById('experience_title').innerText = 'Experience';
        document.getElementById('portfolio_title').innerText = 'Portfolio';
        document.getElementById('contact_title').innerText = 'Contact';
        document.getElementById('tagline').innerText = 'Experienced Unity and Web Developer';
        document.getElementById('about_me_description').innerText = 'I am a passionate developer with expertise in Unity, C#, and web development.';
        language = 'en';
    } else {
        document.getElementById('languageToggle').innerText = 'Traduire en Anglais';
        document.getElementById('main_title').innerText = 'Bienvenue sur mon portfolio';
        document.getElementById('about_me_title').innerText = 'À propos de moi';
        document.getElementById('skills_title').innerText = 'Compétences';
        document.getElementById('experience_title').innerText = 'Expérience';
        document.getElementById('portfolio_title').innerText = 'Portfolio';
        document.getElementById('contact_title').innerText = 'Contact';
        document.getElementById('tagline').innerText = 'Développeur Unity et Web expérimenté';
        document.getElementById('about_me_description').innerText = 'Je suis un développeur passionné avec une expertise en Unity, C# et développement web.';
        language = 'fr';
    }
}



function toggleExperience(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// Theme toggle button
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });
});