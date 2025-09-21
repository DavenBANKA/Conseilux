// Menu mobile
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Animation au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animation des sections au scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .testimonial');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialisation des animations
window.addEventListener('load', () => {
    // Ajouter la classe loaded au body pour les animations de chargement
    document.body.classList.add('loaded');
    
    // Initialiser les styles pour l'animation
    const serviceCards = document.querySelectorAll('.service-card');
    const testimonials = document.querySelectorAll('.testimonial');
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    testimonials.forEach(testimonial => {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateY(20px)';
        testimonial.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Démarrer l'animation au chargement
    setTimeout(animateOnScroll, 500);
});

// Écouter l'événement de défilement
window.addEventListener('scroll', animateOnScroll);

// Gestion du slider de témoignages
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Changer de témoignage toutes les 5 secondes
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Initialiser le premier témoignage
showTestimonial(0);

// Animation du bouton de défilement vers le haut
const scrollToTopBtn = document.createElement('div');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '&uarr;';
document.body.appendChild(scrollToTopBtn);

// Afficher/masquer le bouton au défilement
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Défilement fluide vers le haut
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Ajout du style pour le bouton de défilement
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        font-size: 24px;
        z-index: 999;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .scroll-to-top:hover {
        background-color: var(--secondary-color);
        transform: translateY(-3px);
    }
    
    .no-scroll {
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Animation des liens du menu au survol
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    
    item.addEventListener('mouseenter', () => {
        link.style.color = 'var(--primary-color)';
    });
    
    item.addEventListener('mouseleave', () => {
        if (!link.classList.contains('active')) {
            link.style.color = '';
        }
    });
});

// Gestion du menu déroulant (si ajouté plus tard)
const hasSubmenu = document.querySelectorAll('.has-submenu');
hasSubmenu.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            submenu.classList.toggle('active');
        }
    });
});

// Fermer les sous-menus en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-submenu')) {
        document.querySelectorAll('.submenu').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});
