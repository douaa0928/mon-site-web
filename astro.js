// Fonction pour créer des étoiles filantes - BEAUCOUP PLUS !
function createShootingStars() {
    const starsContainer = document.getElementById('starsContainer');
    const starCount = 50; // 50 étoiles au lieu de 8 !
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        // Position aléatoire
        const top = Math.random() * 100;
        const left = Math.random() * 20; // Commencent à différentes positions
        
        // Animation aléatoire
        const duration = 2 + Math.random() * 4; // 2-6 secondes
        const delay = Math.random() * 15; // Délai aléatoire jusqu'à 15 secondes
        
        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// Fonction pour calculer le signe astrologique
function getSigneAstrologique(jour, mois) {
    if ((mois === 3 && jour >= 21) || (mois === 4 && jour <= 19)) return "Bélier";
    if ((mois === 4 && jour >= 20) || (mois === 5 && jour <= 20)) return "Taureau";
    if ((mois === 5 && jour >= 21) || (mois === 6 && jour <= 20)) return "Gémeaux";
    if ((mois === 6 && jour >= 21) || (mois === 7 && jour <= 22)) return "Cancer";
    if ((mois === 7 && jour >= 23) || (mois === 8 && jour <= 22)) return "Lion";
    if ((mois === 8 && jour >= 23) || (mois === 9 && jour <= 22)) return "Vierge";
    if ((mois === 9 && jour >= 23) || (mois === 10 && jour <= 22)) return "Balance";
    if ((mois === 10 && jour >= 23) || (mois === 11 && jour <= 21)) return "Scorpion";
    if ((mois === 11 && jour >= 22) || (mois === 12 && jour <= 21)) return "Sagittaire";
    if ((mois === 12 && jour >= 22) || (mois === 1 && jour <= 19)) return "Capricorne";
    if ((mois === 1 && jour >= 20) || (mois === 2 && jour <= 18)) return "Verseau";
    if ((mois === 2 && jour >= 19) || (mois === 3 && jour <= 20)) return "Poissons";
    return "Inconnu";
}

let clickCount = 0;

// Créer les étoiles au chargement
document.addEventListener('DOMContentLoaded', function() {
    createShootingStars();
});

document.getElementById('astroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Reset des états
    clickCount = 0;
    document.getElementById('comicPhrase').style.display = 'none';
    document.getElementById('moreButton').style.transform = 'none';
    document.getElementById('moreButton').style.backgroundColor = '#4a90e2';
    
    // Récupération des valeurs
    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const dateNaissance = document.getElementById('dateNaissance').value;
    const heureNaissance = document.getElementById('heureNaissance').value;
    
    // Validation de la date
    const parts = dateNaissance.split('/');
    if (parts.length !== 3) {
        alert('Format de date invalide. Utilisez JJ/MM/AAAA.');
        return;
    }
    
    const jour = parseInt(parts[0]);
    const mois = parseInt(parts[1]);
    const annee = parseInt(parts[2]);
    
    // Validation améliorée de la date
    const dateObj = new Date(annee, mois - 1, jour);
    if (dateObj.getDate() !== jour || dateObj.getMonth() !== mois - 1 || dateObj.getFullYear() !== annee) {
        alert('Date invalide.');
        return;
    }
    
    // Validation de l'heure si fournie
    if (heureNaissance) {
        const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timePattern.test(heureNaissance)) {
            alert('Format d\'heure invalide. Utilisez HH:MM.');
            return;
        }
    }
    
    // Calcul du signe
    const signe = getSigneAstrologique(jour, mois);
    
    // Mise à jour des charts
    document.getElementById('centerSign').textContent = signe;
    document.getElementById('resultChart').querySelector('#centerSign').textContent = signe;
    
    // Changement du background selon le signe
    const signColors = {
        "Bélier": "ff4500", "Taureau": "32cd32", "Gémeaux": "ffd700", 
        "Cancer": "ffffff", "Lion": "ff8c00", "Vierge": "008000",
        "Balance": "ff69b4", "Scorpion": "8b0000", "Sagittaire": "1e90ff",
        "Capricorne": "a0522d", "Verseau": "00ced1", "Poissons": "4b0082"
    };
    
    const color = signColors[signe] || "4a90e2";
    document.body.style.background = `linear-gradient(to bottom, #0c0c0c, #${color})`;
    
    // Messages comiques par signe
    const messages = {
        "Bélier": "Vous êtes un feu follet... qui met le feu aux poudres !",
        "Taureau": "Solide comme un roc, mais attention aux cornes !",
        "Gémeaux": "Deux faces, une pour chaque conversation !",
        "Cancer": "Émotif comme une marée, mais toujours à l'heure pour le dîner.",
        "Lion": "Roi de la jungle... ou du canapé ?",
        "Vierge": "Parfait en tout, sauf quand vous oubliez de ranger.",
        "Balance": "Équilibré, mais penche souvent vers le chocolat.",
        "Scorpion": "Mystérieux, comme un scorpion dans une boîte.",
        "Sagittaire": "Aventurier, mais perd toujours ses flèches.",
        "Capricorne": "Ambition pur, grimpeur de montagnes... ou d'escaliers.",
        "Verseau": "Innovant, mais oublie parfois de payer l'électricité.",
        "Poissons": "Créatif, nage dans les rêves... et les flaques."
    };
    
    const message = messages[signe] || "Votre signe est cosmique !";
    
    // Affichage du résultat
    document.getElementById('resultTitle').textContent = `${prenom} ${nom}, votre signe est ${signe} !`;
    document.getElementById('resultMessage').textContent = message;
    
    // Infos supplémentaires si heure fournie
    if (heureNaissance) {
        const sunMoon = `Lever du soleil : 6h00, Coucher : 20h00. Lever de lune : 22h00. (Basé sur ${signe})`;
        const personality = `Traits : ${message}. Compatibilité : Avec tout le monde, si vous y croyez !`;
        document.getElementById('sunMoonInfo').textContent = sunMoon;
        document.getElementById('personalityInfo').textContent = personality;
        document.getElementById('extraInfo').style.display = 'block';
    } else {
        document.getElementById('extraInfo').style.display = 'none';
    }
    
    // Activation des résultats
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('chartContainer').style.display = 'flex';
    document.getElementById('mainContainer').classList.add('submitted');
});

// Gestionnaire pour le bouton "En savoir plus"
document.getElementById('moreButton').addEventListener('click', function() {
    clickCount++;
    const button = this;
    
    // Changement de couleur et position aléatoire
    const colors = ['#4a90e2', '#ff4500', '#32cd32'];
    button.style.backgroundColor = colors[clickCount % colors.length];
    button.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
    
    // Au 3e clic, afficher une phrase bête aléatoire
    if (clickCount === 3) {
        const prenom = document.getElementById('prenom').value;
        const phrases = [
            `${prenom}, tu es vraiment con pour sérieusement croire en astrologie !`,
            `${prenom}, aujourd'hui, tu vas renverser ton café... sur ton clavier.`,
            `${prenom}, bonne chance pour trouver tes clés, elles sont dans une autre dimension.`,
            `${prenom}, ton horoscope dit : évite les décisions importantes... comme toujours.`
        ];
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        document.getElementById('comicPhrase').textContent = randomPhrase;
        document.getElementById('comicPhrase').style.display = 'block';
        clickCount = 0;
    }
});