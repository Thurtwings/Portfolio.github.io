var language = language || 'fr';

function toggleLanguage() {
    if (language === 'fr') {
        document.getElementById('languageToggle').innerText = 'Switch to French';
        document.getElementById('main_title').innerText = 'Welcome to My Portfolio';
        document.getElementById('about_me_title').innerText = 'About Me';
        document.getElementById('about_nav').innerText = 'About Me';
        document.getElementById('skills_title').innerText = 'Skills';
        document.getElementById('skills_nav').innerText = 'Skills';
        document.getElementById('experience_title').innerText = 'Experience';
        document.getElementById('portfolio_title').innerText = 'Portfolio';
        document.getElementById('contact_title').innerText = 'Contact';
        document.getElementById('tagline').innerText = 'Experienced Unity and Web Developer';
        document.getElementById('about_me_description').innerText = 'I am a passionate developer with expertise in Unity, C#, and web development.';
        document.getElementById('cv').innerText = 'See my CV';
        document.getElementById('software').innerText = 'Softwares';
        document.getElementById('prog_lang').innerText = 'Programming languages';
        language = 'en';
    } else {
        document.getElementById('languageToggle').innerText = 'Traduire en Anglais';
        document.getElementById('main_title').innerText = 'Bienvenue sur mon portfolio';
        document.getElementById('about_me_title').innerText = 'À propos de moi';
        document.getElementById('about_nav').innerText = 'À propos';
        document.getElementById('skills_title').innerText = 'Compétences';
        document.getElementById('skills_nav').innerText = 'Compétences';
        document.getElementById('experience_title').innerText = 'Expérience';
        document.getElementById('portfolio_title').innerText = 'Portfolio';
        document.getElementById('contact_title').innerText = 'Contact';
        document.getElementById('tagline').innerText = 'Développeur Unity et Web expérimenté';
        document.getElementById('about_me_description').innerText = 'Je suis un développeur passionné avec une expertise en Unity, C# et développement web.';
        document.getElementById('cv').innerText = 'Consulter mon CV';
        document.getElementById('software').innerText = 'Logiciels';
        document.getElementById('prog_lang').innerText = 'Langages de programmation';
        language = 'fr';
    }
}
function toggleCardDetails(cardId)
{
    const card = document.getElementById(cardId);
    const details = card.querySelector('.card-details');

    if (details.style.display === 'none' || details.style.display === '')
    {
        details.style.display = 'block';
    }
    else
    {
        details.style.display = 'none';
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
function toggleExperience(id)
{
    var x = document.getElementById(id);

    if (x.style.display === "none")
    {
        x.style.display = "block";
    }
    else
    {
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