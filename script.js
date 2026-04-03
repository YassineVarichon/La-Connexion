class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 200;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
    }

    // Mobile Burger Menu Logic
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Coverflow Logic
let activeIndex = 0;
const cards = document.querySelectorAll('.card-3d');
const dots = document.querySelectorAll('.dot');

function updateCoverflow() {
    cards.forEach((card, index) => {
        // Reset classes
        card.classList.remove('active', 'next-card', 'prev-card');

        // Circular Logic for 2+ cards
        if (index === activeIndex) {
            card.classList.add('active');
        } else {
            // In a simple stack, everyone else is "next" (behind)
            // But to keep the style we just assign next-card to the one immediately following (circular)
            let nextIndex = (activeIndex + 1) % cards.length;
            if (index === nextIndex) {
                card.classList.add('next-card');
            }
        }
    });

    // Update Dots
    if (dots.length > 0) {
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[activeIndex]) {
            dots[activeIndex].classList.add('active');
        }
    }
}

// Global function for buttons - Circular Loop
window.moveCoverflow = function (direction) {
    activeIndex = (activeIndex + direction + cards.length) % cards.length;
    updateCoverflow();
}

// Init Coverflow
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active card to the first one for intuitive dot mapping
    activeIndex = 0;
    updateCoverflow();

    // Apple-style Scroll Fade Out for Hero Visual
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const cards = heroVisual.querySelectorAll('.card-3d');
            const scrollPos = window.scrollY;

            // Trigger point: 100px scroll
            if (scrollPos > 100) {
                cards.forEach(card => card.classList.add('scroll-fade-out'));
            } else {
                cards.forEach(card => card.classList.remove('scroll-fade-out'));
            }
        });
    }

    // General Scroll Trigger Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Optional: remove if you want it to disappear again when scrolling away
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-trigger-item').forEach(el => {
        observer.observe(el);
    });

    // Newsletter Popup Logic
    const popup = document.getElementById('newsletter-overlay');
    const closeBtn = document.getElementById('close-popup');

    if (popup && closeBtn) {
        // Check if popup has already been shown in this session
        if (!sessionStorage.getItem('popupShown')) {
            // Show after 0.5 seconds (Almost immediate)
            setTimeout(() => {
                popup.classList.add('visible');
                // Mark as shown so it doesn't appear again this session (until tab close)
                sessionStorage.setItem('popupShown', 'true');
            }, 500);
        }

        // Close logic
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('visible');
        });

        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('visible');
            }
        });
    }
});


/* -------------------------------------------------------------------------- */
/*                                BLOG LOGIC                                  */
/* -------------------------------------------------------------------------- */

const blogPosts = {
    1: {
        title: "Pourquoi le JJB explose à Nanterre ? 🚀",
        img: "assets/group_photo.jpg",
        content: `
            <h3>Un Phénomène Social</h3>
            <p>Ce n'est plus un secret : Nanterre est en train de devenir l'une des places fortes du Jiu-Jitsu Brésilien en Île-de-France. Mais pourquoi ici ? Pourquoi maintenant ?</p>
            <p>La réponse réside dans l'ADN même de la ville. Nanterre a toujours été une terre de combattants, de résilience et de solidarité. Le JJB, ce n'est pas juste du sport, c'est un langage universel qui parle à notre jeunesse.</p>
            
            <h3>L'Effet "La Connexion"</h3>
            <p>Depuis le lancement de l'association, nous avons vu des centaines de jeunes pousser la porte du dojo. Ils ne viennent pas juste pour apprendre à étrangler (même si c'est cool). Ils viennent chercher un cadre, une famille.</p>
            <p>Sur le tatami, il n'y a plus de quartiers, plus de statuts sociaux. Il y a juste toi, ton partenaire, et la vérité du combat. C'est cette authenticité qui attire massivement.</p>

            <h3>Le Futur est Brillant</h3>
            <p>Avec des événements rassemblant plus de 2000 personnes et des invités comme Imavov, nous prouvons que la banlieue a du talent à revendre. Nanterre n'est que le début.</p>
        `
    },
    2: {
        title: "Comprendre les Ceintures de JJB 🥋",
        img: "assets/blog_gi.png",
        content: `
            <h3>Le Long Chemin vers la Noire</h3>
            <p>Contrairement au Judo ou au Karaté, obtenir une ceinture noire de JJB est une odyssée qui prend souvent plus de 10 ans. C'est ce qui en fait sa valeur inestimable.</p>
            
            <h3>⚪ Blanche : La Survie</h3>
            <p>Vous êtes un requin dans un océan... mais vous êtes le petit poisson. Votre seul but : survivre. C'est l'étape la plus dure, celle où 90% des gens abandonnent. Ne lâchez pas.</p>

            <h3>🔵 Bleue : La Technique</h3>
            <p>Ça y est, vous savez nager. Vous commencez à piéger les débutants. Mais attention au "Blue Belt Blues", cette période de stagnation apparente.</p>

            <h3>🟣 Violette : La Créativité</h3>
            <p>C'est la ceinture du style. Vous développez votre propre jeu. Vous devenez dangereux pour tout le monde, y compris les noires.</p>

            <h3>🟤 Marron : L'Affûtage</h3>
            <p>La dernière marche. C'est le moment de corriger les détails invisibles.</p>

            <h3>⚫ Noire : Le Commencement</h3>
            <p>On pense que c'est la fin, mais c'est là que le vrai JJB commence.</p>
        `
    },
    3: {
        title: "JJB Paris vs Banlieue 🥊",
        img: "assets/blog_paris.png",
        content: `
            <h3>Deux Mondes, Une Passion</h3>
            <p>Il y a longtemps eu une fracture. Le JJB "chic" des clubs parisiens onéreux, et le JJB "roots" des clubs de banlieue. Aujourd'hui, les lignes bougent.</p>
            
            <h3>La "Hunger" de la Banlieue</h3>
            <p>Pourquoi les grands champions sortent-ils souvent de banlieue ? Parce qu'ils ont la faim. Quand tu n'as rien à perdre et tout à prouver, ton Jiu-Jitsu devient différent. Plus agressif, plus pragmatique.</p>
            
            <h3>L'Union fait la Force</h3>
            <p>À La Connexion, nous croyons aux ponts, pas aux murs. Nous accueillons tout le monde, de Paris ou d'ailleurs. Mais n'oubliez jamais : ici, on ne joue pas au Jiu-Jitsu, on le vit.</p>
        `
    },
    4: {
        title: "5 Leçons Brutales du Tatami 😤",
        img: "assets/blog_mental.png",
        content: `
            <h3>1. L'Ego est ton ennemi</h3>
            <p>Tu vas te faire soumettre par plus petit, plus vieux, ou plus faible que toi. Accepte-le.</p>
            
            <h3>2. Il n'y a pas de raccourcis</h3>
            <p>L'argent n'achète pas la technique. Seule la sueur paye.</p>
            
            <h3>3. Le confort est un piège</h3>
            <p>Si tu es à l'aise, tu ne progresses pas. Cherche la difficulté.</p>
        `
    },
    5: {
        title: "Gi ou No-Gi ? Le Choix Crucial 🤼",
        img: "assets/blog_gi.png",
        content: `
            <h3>Le Gi (Kimono)</h3>
            <p>C'est les échecs. Ça grippe, ça ralentit, ça demande de la stratégie. Idéal pour apprendre la défense et la rigueur.</p>
            
            <h3>Le No-Gi (Tenue de sport)</h3>
            <p>C'est les dames, mais en accéléré. Ça glisse, ça va vite, c'est explosif. Indispensable pour le MMA.</p>
            
            <h3>Le Verdict</h3>
            <p>Faites les deux. Un grappler complet ne choisit pas.</p>
        `
    }
};



window.openArticle = function (id) {
    const modal = document.getElementById('article-modal');
    const body = document.getElementById('modal-body');
    const data = blogPosts[id];

    if (data && modal && body) {
        body.innerHTML = `
            <div class="modal-article-header">
                <img src="${data.img}" alt="${data.title}">
            </div>
            <div class="modal-article-body">
                <h2>${data.title}</h2>
                ${data.content}
            </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling bg
    }
}

window.closeArticle = function () {
    const modal = document.getElementById('article-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('article-modal');
    if (e.target === modal) {
        window.closeArticle();
    }
});
