// Menu mobile
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    // Recalculer la hauteur si le menu mobile s'ouvre
    updateHeaderOffset();
});

// ---- Category page: sliders (hero + refs) ----
window.addEventListener('load', () => {
    if (!window.Swiper) return;
    const heroEl = document.querySelector('.hero-swiper');
    if (heroEl) {
        new Swiper(heroEl, {
            loop: true,
            autoplay: { delay: 3200 },
            pagination: { el: heroEl.querySelector('.swiper-pagination'), clickable: true },
        });
    }
    const refsEl = document.querySelector('.refs-swiper');
    if (refsEl) {
        new Swiper(refsEl, {
            loop: true,
            autoplay: { delay: 3600 },
            pagination: { el: refsEl.querySelector('.swiper-pagination'), clickable: true },
        });
    }
});

// ---- Category page: filters + Load More ----
(function(){
    const grid = document.querySelector('.js-courses');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.js-course'));
    const filters = Array.from(document.querySelectorAll('.js-filter'));
    const clearBtn = document.querySelector('.js-clear-filters');
    const loadMoreBtn = document.querySelector('.js-load-more');

    let visibleCount = 6;

    function currentFilterMatch(card, active) {
        if (active.length === 0) return true;
        const cats = (card.getAttribute('data-cats') || '').toLowerCase();
        return active.some(a => cats.includes(a));
    }

    function apply() {
        const active = filters.filter(f => f.checked).map(f => f.value.toLowerCase());
        let shown = 0;
        cards.forEach(card => {
            const match = currentFilterMatch(card, active);
            if (match && shown < visibleCount) {
                card.style.display = '';
                shown++;
            } else if (match) {
                card.style.display = 'none';
            } else {
                card.style.display = 'none';
            }
        });
        if (loadMoreBtn) {
            const totalMatches = cards.filter(c => currentFilterMatch(c, active)).length;
            loadMoreBtn.style.display = shown < totalMatches ? '' : 'none';
        }
    }

    // init
    apply();
    filters.forEach(f => f.addEventListener('change', () => { visibleCount = 6; apply(); }));
    if (clearBtn) clearBtn.addEventListener('click', () => { filters.forEach(f => f.checked = false); visibleCount = 6; apply(); });
    if (loadMoreBtn) loadMoreBtn.addEventListener('click', () => { visibleCount += 6; apply(); });
})();

// Compteurs animés (stats)
(() => {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animateCounter = (el) => {
        if (el.__counted) return; // éviter double animation
        el.__counted = true;
        const start = parseFloat(el.getAttribute('data-start') || '0');
        const end = parseFloat(el.getAttribute('data-end') || '0');
        const duration = parseInt(el.getAttribute('data-duration') || '1500', 10);
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';

        const startTime = performance.now();

        const step = (now) => {
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / duration);
            const value = start + (end - start) * easeOutCubic(t);
            const formatted = Number(value).toLocaleString('fr-FR', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            });
            el.textContent = formatted + suffix;
            if (t < 1) {
                requestAnimationFrame(step);
            }
        };

        // petite animation d'apparition
        el.style.transform = 'translateY(6px) scale(0.98)';
        el.style.opacity = '0.8';
        el.style.transition = 'transform .6s ease, opacity .6s ease';
        requestAnimationFrame(() => {
            el.style.transform = 'translateY(0) scale(1)';
            el.style.opacity = '1';
        });

        requestAnimationFrame(step);
    };

    // Observer pour déclencher quand visible
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.35 });

    counters.forEach(el => io.observe(el));
})();

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
        header.style.padding = '12px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.06)';
    } else {
        header.style.padding = '18px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.06)';
    }
});

// Calcul dynamique du décalage d'en-tête pour éviter le chevauchement
function updateHeaderOffset() {
    const header = document.querySelector('.header');
    if (!header) return;
    const h = header.offsetHeight;
    document.documentElement.style.setProperty('--header-offset', h + 'px');
}

window.addEventListener('load', updateHeaderOffset);
window.addEventListener('resize', () => {
    // Throttle léger
    clearTimeout(window.__hdrRaf);
    window.__hdrRaf = setTimeout(updateHeaderOffset, 100);
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
const testimonialsSwiperEl = document.querySelector('.testimonials-swiper');
if (testimonialsSwiperEl && window.Swiper) {
    // Utiliser Swiper si disponible
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        loop: true,
        autoplay: { delay: 5000 },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            768: { slidesPerView: 1 },
            992: { slidesPerView: 1 }
        }
    });
} else {
    // Fallback: ancien slider simple si Swiper non présent
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    if (testimonials.length > 0) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        showTestimonial(0);
    }
}

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

// Gestion des sous-menus et méga-menus
const hasSubmenu = document.querySelectorAll('.has-submenu');
hasSubmenu.forEach(item => {
    const trigger = item.querySelector('.nav-link');
    const submenu = item.querySelector('.submenu');
    const megamenu = item.querySelector('.megamenu');

    // Ouverture/fermeture au clic (utile en mobile)
    item.addEventListener('click', (e) => {
        // éviter de suivre le lien si c'est un déclencheur de menu
        if (e.target.closest('.nav-link')) {
            e.preventDefault();
        }
        if (submenu) submenu.classList.toggle('active');
        if (megamenu) megamenu.classList.toggle('active');
        if (trigger) {
            const expanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', String(!expanded));
        }
    });

    // Accessibilité: fermer au focus out (desktop)
    item.addEventListener('focusout', (e) => {
        // si le focus sort du composant
        if (!item.contains(e.relatedTarget)) {
            if (submenu) submenu.classList.remove('active');
            if (megamenu) megamenu.classList.remove('active');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
        }
    });
});

// Fermer en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-submenu')) {
        document.querySelectorAll('.submenu').forEach(menu => menu.classList.remove('active'));
        document.querySelectorAll('.megamenu').forEach(menu => menu.classList.remove('active'));
        document.querySelectorAll('.has-submenu > .nav-link').forEach(link => link.setAttribute('aria-expanded', 'false'));
    }
});

// Gestion "Lire la suite" sur les cartes événements
document.addEventListener('click', (e) => {
    const link = e.target.closest('.event-read');
    if (!link) return;
    e.preventDefault();
    const body = link.closest('.event-body');
    if (!body) return;
    const more = body.querySelector('.event-more');
    if (!more) return;
    const isHidden = more.hasAttribute('hidden');
    if (isHidden) {
        more.removeAttribute('hidden');
        link.textContent = 'Lire moins';
    } else {
        more.setAttribute('hidden', '');
        link.textContent = 'Lire la suite';
    }
});
