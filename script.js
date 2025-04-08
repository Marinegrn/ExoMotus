function tryWord(word, base) {
    //DONE: jeu sensible à la casse
    word = word.trim().toLowerCase();
    base = base.trim().toLowerCase();

	if (word === base) {
		return true
  } else {
  	let wellPlaced = [];
    let notInWord = [];
    let missplaced = [];
    
  	let arrayBase = base.split('');
    let arrayWord = word.split('');
    
  for (let i = 0; i < arrayBase.length; i++) {
      if (arrayBase[i] === arrayWord[i]) {
        wellPlaced.push(arrayWord[i]);
    } else {
        missplaced.push(arrayWord[i]);
      }
    }
    
    for (const char of arrayWord) {
    	if (arrayBase.includes(char) === false) {
      	notInWord.push(char)
      }
    }
    
    return { wellPlaced: wellPlaced, missplaced: missplaced, notInWord: notInWord }
  }
};

function guess() {
    let base = 'dictionnaire';
    let word = document.getElementById("word").value.trim();
    let result = tryWord(word, base);
    document.getElementById("word").value = '';
    document.getElementById("try").innerText = word;
    document.getElementById("well").innerText = 'Bien placé: ' + (result.wellPlaced ? result.wellPlaced.join(', ') : '');
    document.getElementById("miss").innerText = 'Mal placé: ' + (result.missplaced ? result.missplaced.join(', ') : '');
    document.getElementById("not").innerText = 'Pas dans le mot: ' + (result.notInWord ? result.notInWord.join(', ') : '');
    //TODO: débagogage, message de victoire
    if (result.wellPlaced && result.wellPlaced.length === base.length) {
        document.getElementById("win").innerText = 'Vous avez gagné';
    } else {
        document.getElementById("win").innerText = '';
    }
};
