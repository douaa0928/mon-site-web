// ===== ANIMATIONS AU SCROLL =====
// Cette fonction ajoute une animation fade-in quand les éléments deviennent visibles

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Applique l'animation à tous les portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// ===== SMOOTH SCROLL POUR LES LIENS =====
// Permet un scroll fluide quand tu cliques sur les liens d'ancrage

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== HOVER EFFECTS SUR LES PORTFOLIO ITEMS =====
// Ajoute des effets visuels au survol

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
    });
});

// ===== ACTIVE LINK HIGHLIGHTING =====
// Marque le lien de navigation actif selon la section visible

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('main');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            navLinks.forEach(link => link.classList.remove('active'));
            // Ajoute la classe 'active' au lien correspondant si tu veux
        }
    });
});

// ===== MODIFIE: Ajoute tes propres interactions JavaScript ici =====

// Exemple 1: Filtrer les projets par catégorie
// Décommente et modifie si tu veux ajouter un système de filtrage

/*
document.querySelectorAll('.sidebar-section li').forEach(item => {
    item.addEventListener('click', function() {
        const category = this.textContent;
        console.log('Filtrer par:', category);
        // Ajoute ta logique de filtrage ici
    });
});
*/

// Exemple 2: Modal pour voir les détails d'un projet
// Décommente et modifie si tu veux ajouter des modals

/*
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('.portfolio-item-title').textContent;
        console.log('Ouvrir détails du projet:', title);
        // Ajoute ta logique de modal ici
    });
});
*/

// Exemple 3: Compteur de visite ou analytics
// Décommente si tu veux tracker les visites

/*
console.log('Portfolio de dK - Bienvenue!');
console.log('Visite le portfolio et découvre les projets incroyables');
*/

// ===== FONCTION UTILE: Ajouter un projet dynamiquement =====
// Utilise cette fonction pour ajouter des projets sans modifier le HTML

function addPortfolioItem(type, title, description, tags) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    const newItem = document.createElement('div');
    newItem.className = 'portfolio-item';
    
    const tagsHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    newItem.innerHTML = `
        <div class="portfolio-item-type">${type}</div>
        <h2 class="portfolio-item-title">${title}</h2>
        <p class="portfolio-item-description">${description}</p>
        <div class="portfolio-item-tags">
            ${tagsHTML}
        </div>
    `;
    
    portfolioGrid.appendChild(newItem);
    
    // Applique les animations au nouvel élément
    newItem.style.opacity = '0';
    newItem.style.transform = 'translateY(20px)';
    newItem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(newItem);
}

// Exemple d'utilisation:
// addPortfolioItem('📸 SNAPSHOT', 'Mon Nouveau Projet', 'Description du projet', ['Tag1', 'Tag2', 'Tag3']);

// ===== FONCTION UTILE: Changer le thème (dark/light) =====
// Décommente si tu veux ajouter un toggle dark mode

/*
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Vérifie si l'utilisateur préfère le dark mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
*/