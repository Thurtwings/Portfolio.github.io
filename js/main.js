var language = language || 'fr';

function toggleLanguage() {
    if (language === 'fr') {
        document.getElementById('languageToggle').innerText = 'Switch to French';
        document.getElementById('main_title').innerText = 'Welcome to My Portfolio. This website is still under construction';
        document.getElementById('about_me_title').innerText = 'About Me';
        document.getElementById('about_nav').innerText = 'About Me';
        document.getElementById('skills_title').innerText = 'Skills';
        document.getElementById('skills_nav').innerText = 'Skills';
        document.getElementById('experience_title').innerText = 'Experience';
        document.getElementById('portfolio_title').innerText = 'Portfolio';
        document.getElementById('contact_title').innerText = 'Contact';
        document.getElementById('tagline').innerText = ' Unity and Web Applications Developer';
        document.getElementById('about_me_description').innerText = 'I am a passionate developer with experiences in Unity, C#, and web development.';
        document.getElementById('cv').innerText = 'See my CV';
        document.getElementById('software').innerText = 'Softwares';
        document.getElementById('prog_lang').innerText = 'Programming languages';
        language = 'en';
    } else {
        document.getElementById('languageToggle').innerText = 'Traduire en Anglais';
        document.getElementById('main_title').innerText = 'Bienvenue sur mon portfolio. Ce site web est encore en construction';
        document.getElementById('about_me_title').innerText = 'À propos de moi';
        document.getElementById('about_nav').innerText = 'À propos';
        document.getElementById('skills_title').innerText = 'Compétences';
        document.getElementById('skills_nav').innerText = 'Compétences';
        document.getElementById('experience_title').innerText = 'Expérience';
        document.getElementById('portfolio_title').innerText = 'Portfolio';
        document.getElementById('contact_title').innerText = 'Contact';
        document.getElementById('tagline').innerText = 'Développeur Unity et Applications Web ';
        document.getElementById('about_me_description').innerText = 'Je suis un développeur passionné avec une expériences en Unity, C# et développement web.';
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

function toggleDarkMode() {
    var body = document.body;
    var toggleButton = document.getElementById('darkModeToggle');
    var navLinks = document.querySelectorAll('.nav-link');

    if (body && toggleButton) {
        body.classList.toggle('dark-mode');
        toggleButton.innerText = body.classList.contains('dark-mode') ? 'Mode Clair' : 'Mode Sombre';

        if (body.classList.contains('dark-mode')) {
            // Passer au mode sombre
            navLinks.forEach(link => {
                link.classList.remove('text-dark');
                link.classList.add('text-white');
            });
        } else {
            // Passer au mode clair
            navLinks.forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-dark');
            });
        }
    }
}
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}


// Function to set up everything after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    toggleLanguage();

    // Initialize smooth scrolling
    smoothScroll();

    // Initialize dark mode toggle
    const slideThree = document.getElementById('darkModeToggle');
    if (slideThree) {
        slideThree.addEventListener('change', toggleDarkMode);
    } else {
        console.error('Element with ID "slideThree" not found');
    }

});



