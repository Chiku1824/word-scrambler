const words = {
    easy: ['cat', 'dog', 'sun', 'moon', 'tree', 'book', 'fish', 'bird', 'house', 'car'],
    medium: ['apple', 'banana', 'orange', 'grape', 'lemon', 'melon', 'peach', 'cherry', 'mango', 'kiwi'],
    hard: ['javascript', 'python', 'algorithm', 'database', 'framework', 'variable', 'function', 'object', 'array', 'string']
};

let currentWord = '';
let scrambledWord = '';
let score = 0;
let highScore = 0;
let difficulty = 'easy';
let usedWords = [];

const scrambledWordEl = document.getElementById('scrambled-word');
const guessInputEl = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const messageEl = document.getElementById('message');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');

function scrambleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

function getRandomWord() {
    const availableWords = words[difficulty].filter(word => !usedWords.includes(word));
    if (availableWords.length === 0) {
        usedWords = [];
        return words[difficulty][Math.floor(Math.random() * words[difficulty].length)];
    }
    return availableWords[Math.floor(Math.random() * availableWords.length)];
}

function newGame() {
    currentWord = getRandomWord();
    usedWords.push(currentWord);
    scrambledWord = scrambleWord(currentWord);
    scrambledWordEl.textContent = scrambledWord;
    guessInputEl.value = '';
    messageEl.textContent = '';
}

function updateScore() {
    score++;
    scoreEl.textContent = score;
    if (score > highScore) {
        highScore = score;
        highScoreEl.textContent = highScore;
        localStorage.setItem('highScore', highScore);
    }
}

function loadHighScore() {
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
        highScore = parseInt(savedHighScore);
        highScoreEl.textContent = highScore;
    }
}

submitBtn.addEventListener('click', () => {
    const guess = guessInputEl.value.toLowerCase();
    if (guess === currentWord) {
        messageEl.textContent = 'Correct!';
        updateScore();
        setTimeout(newGame, 1500);
    } else {
        messageEl.textContent = 'Try again!';
    }
});

difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        difficulty = btn.dataset.difficulty;
        difficultyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        score = 0;
        scoreEl.textContent = score;
        usedWords = [];
        newGame();
    });
});

loadHighScore();
newGame();