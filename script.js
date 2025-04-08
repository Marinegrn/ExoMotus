const baseWord = 'dictionnaire';
let attempts = 0;
let gameOver = false;

function initGame() {
  // Créer les cases pour le mot à deviner
  const wordDisplay = document.getElementById("word-display");
  wordDisplay.innerHTML = '';
  
  for (let i = 0; i < baseWord.length; i++) {
    const letterBox = document.createElement("div");
    letterBox.className = "letter-box";
    letterBox.id = `letter-${i}`;
    
    // Montrer la première lettre comme indice
    if (i === 0) {
      letterBox.textContent = baseWord[0].toUpperCase();
      letterBox.classList.add("first-letter");
    }
    
    wordDisplay.appendChild(letterBox);
  }
  
  // Focus sur l'input
  document.getElementById("word").focus();
}

function tryWord(word, base) {
  word = word.trim().toLowerCase();
  base = base.trim().toLowerCase();
  
  if (word === base) {
    return true;
  } else {
    let wellPlaced = [];
    let notInWord = [];
    let missplaced = [];
    
    let arrayBase = base.split('');
    let arrayWord = word.split('');
    
    // Vérifie les lettres bien placées
    for (let i = 0; i < arrayBase.length; i++) {
      if (arrayWord[i] && arrayBase[i] === arrayWord[i]) {
        wellPlaced.push({ letter: arrayWord[i], position: i });
      } else if (arrayWord[i] && arrayBase.includes(arrayWord[i])) {
        // Vérifie si la lettre est dans le mot mais mal placée
        missplaced.push({ letter: arrayWord[i], position: i });
      }
    }
    
    // Vérifie les lettres qui ne sont pas dans le mot
    for (let i = 0; i < arrayWord.length; i++) {
      const char = arrayWord[i];
      if (!arrayBase.includes(char)) {
        notInWord.push({ letter: char, position: i });
      }
    }
    
    return { wellPlaced: wellPlaced, missplaced: missplaced, notInWord: notInWord };
  }
}

function guess() {
  if (gameOver) return;
  
  let word = document.getElementById("word").value.trim();
  
  // Validation de base
  if (word.length === 0) {
    alert("Veuillez entrer un mot !");
    return;
  }
  
  if (word.length !== baseWord.length) {
    alert(`Le mot doit contenir ${baseWord.length} lettres !`);
    return;
  }
  
  attempts++;
  document.getElementById("try-count").innerText = attempts;
  
  let result = tryWord(word, baseWord);
  document.getElementById("word").value = '';
  
  // Mise à jour de l'affichage du mot
  updateWordDisplay(word, result);
  
  // Mise à jour des résultats
  updateResults(result);
  
  // Vérifier si le joueur a gagné
  if (result === true || (result.wellPlaced && result.wellPlaced.length === baseWord.length)) {
    document.getElementById("win").innerHTML = `<div>🎉 Bien joué ! 🎉</div>`;
    gameOver = true;
    confetti();
  }
}

function updateWordDisplay(word, result) {
  const wordDisplay = document.getElementById("word-display");
  
  // Reset l'affichage
  for (let i = 0; i < baseWord.length; i++) {
    const box = document.getElementById(`letter-${i}`);
    box.textContent = i === 0 ? baseWord[0].toUpperCase() : '';
    box.className = i === 0 ? "letter-box first-letter" : "letter-box";
  }
  
  if (result === true) {
    // Toutes les lettres sont correctes
    for (let i = 0; i < baseWord.length; i++) {
      const box = document.getElementById(`letter-${i}`);
      box.textContent = baseWord[i].toUpperCase();
      box.classList.add("letter-correct");
    }
  } else {
    // Ajouter les lettres bien placées
    result.wellPlaced.forEach(item => {
      const box = document.getElementById(`letter-${item.position}`);
      box.textContent = item.letter.toUpperCase();
      box.classList.add("letter-correct");
    });
    
    // Ajouter les lettres mal placées
    result.missplaced.forEach(item => {
      const box = document.getElementById(`letter-${item.position}`);
      box.textContent = item.letter.toUpperCase();
      box.classList.add("letter-misplaced");
    });
    
    // Ajouter les lettres qui ne sont pas dans le mot
    result.notInWord.forEach(item => {
      const box = document.getElementById(`letter-${item.position}`);
      box.textContent = item.letter.toUpperCase();
      box.classList.add("letter-incorrect");
    });
  }
}

function updateResults(result) {
  if (result === true) {
    document.getElementById("well").innerHTML = '';
    document.getElementById("miss").innerHTML = '';
    document.getElementById("not").innerHTML = '';
    return;
  }
  
  // Bien placé
  const wellContainer = document.getElementById("well");
  wellContainer.innerHTML = '';
  result.wellPlaced.forEach(item => {
    const chip = document.createElement("span");
    chip.className = "letter-chip well-placed";
    chip.textContent = item.letter;
    wellContainer.appendChild(chip);
  });
  
  // Mal placé
  const missContainer = document.getElementById("miss");
  missContainer.innerHTML = '';
  result.missplaced.forEach(item => {
    const chip = document.createElement("span");
    chip.className = "letter-chip misplaced";
    chip.textContent = item.letter;
    missContainer.appendChild(chip);
  });
  
  // Pas dans le mot
  const notContainer = document.getElementById("not");
  notContainer.innerHTML = '';
  result.notInWord.forEach(item => {
    const chip = document.createElement("span");
    chip.className = "letter-chip not-in-word";
    chip.textContent = item.letter;
    notContainer.appendChild(chip);
  });
}

// Des pitis confettis !
function confetti() {
  const colors = ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557', '#ffd700'];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = -20 + 'px';
    confetti.style.borderRadius = '50%';
    confetti.style.zIndex = '1000';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate(
      [
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${Math.random() * 100 - 50}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ],
      {
        duration: Math.random() * 3000 + 2000,
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
      }
    );
    
    animation.onfinish = () => {
      confetti.remove();
    };
  }
}

// Gestion des événements sur la touche entrée
document.getElementById("word").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    guess();
  }
});

// Initialiser le jeu au chargement
window.onload = initGame;
