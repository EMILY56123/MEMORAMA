const availableCards = ['A', 'K', 'Q', 'J'];
let totalCards = 12; // Valor por defecto
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;
let pairsFound = 0; // Añadir esta variable
let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
    if (currentMove < 2) {
        if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
            e.target.classList.add('active');
            selectedCards.push(e.target);

            if (++currentMove == 2) {
                currentAttempts++;
                document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

                if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
                    pairsFound++;
                    selectedCards = [];
                    currentMove = 0;

                    if (pairsFound === totalCards / 2) {
                        alert('¡Felicidades! Has encontrado todas las parejas.');
                        resetGame(); // Reiniciar el juego
                    }
                } else {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

function randomValue() {
    let rnd = Math.floor(Math.random() * (totalCards / 2));
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2) {
        valuesUsed.push(rnd);
    } else {
        randomValue();
    }
}

function getFaceValue(value) {
    return value < availableCards.length ? availableCards[value] : value;
}

function resetGame() {
    cards = [];
    selectedCards = [];
    valuesUsed = [];
    currentMove = 0;
    currentAttempts = 0;
    pairsFound = 0;

    document.querySelector('#game').innerHTML = '';

    for (let i = 0; i < totalCards; i++) {
        let div = document.createElement('div');
        div.innerHTML = cardTemplate;
        cards.push(div);
        document.querySelector('#game').append(cards[i]);
        randomValue();
        cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
        cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
    }

    document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';
}

function setDifficulty(level) {
    switch (level) {
        case 'easy':
            totalCards = 8; // 4 pares
            break;
        case 'medium':
            totalCards = 12; // 6 pares
            break;
        case 'hard':
            totalCards = 16; // 8 pares
            break;
    }
    resetGame();
}

// Llama a resetGame al cargar la página para inicializar el juego
resetGame();
