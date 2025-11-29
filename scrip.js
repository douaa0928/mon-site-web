const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const catImage = document.getElementById('cat');

const responses = {
  "bonjour": "Bonjour ! Comment puis-je t'aider, petit chat ?",
  "comment tu t'appelles": "Je m'appelle Mino, le chaton mignon !",
  "tu aimes quoi": "J'adore jouer avec des pelotes de laine et dormir au soleil.",
  "au revoir": "A bientôt, petite amie humaine !"
};

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message ' + sender;
  msgDiv.innerText = text;
  messagesContainer.appendChild(msgDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getResponse(input) {
  const lowerInput = input.toLowerCase();
  for (let key in responses) {
    if (lowerInput.includes(key)) {
      return responses[key];
    }
  }
  return "Miaou ? Je ne comprends pas trop, peux-tu reformuler ?";
}

function animateCat() {
  // Mouvement léger
  catImage.classList.add('bounce');
  setTimeout(() => {
    catImage.classList.remove('bounce');
  }, 1000);
  // Clignotement
  catImage.classList.add('blink');
  setTimeout(() => {
    catImage.classList.remove('blink');
  }, 2000);
}

// Événement lors de l'envoi
sendBtn.addEventListener('click', () => {
  const userText = userInput.value.trim();
  if (userText === "") return;

  addMessage(userText, 'user');
  userInput.value = '';

  // Réponse automatique
  const reply = getResponse(userText);
  setTimeout(() => {
    addMessage(reply, 'bot');
    animateCat();
  }, 500);
});

// Entrée avec touche Enter
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});

// Animation initiale
window.onload = () => {
  animateCat();
};