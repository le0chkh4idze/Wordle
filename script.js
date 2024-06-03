document.addEventListener('DOMContentLoaded', () => {
    const WORD_LIST = ["ატომი", "წყალი", "ჰაერი", "ქიმია", "ბმული", "მჟავა", "სითხე"];
    const selectedWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    let guesses = [];
    let wordRevealed = false;

    const guessInput = document.getElementById('guess-input');
    const submitGuessButton = document.getElementById('submit-guess');
    const revealWordButton = document.getElementById('reveal-word');
    const resultsDiv = document.getElementById('results');
    const revealedWordDiv = document.getElementById('revealed-word');

    submitGuessButton.addEventListener('click', () => {
        const guess = guessInput.value.toLowerCase();
        if (guess.length === 5 && !wordRevealed) {
            const result = [];
            for (let i = 0; i < guess.length; i++) {
                if (guess[i] === selectedWord[i]) {
                    result.push("correct");
                } else if (selectedWord.includes(guess[i])) {
                    result.push("present");
                } else {
                    result.push("absent");
                }
            }
            guesses.push({ guess, result });
            updateResults();
            guessInput.value = '';
        }
    });

    revealWordButton.addEventListener('click', () => {
        wordRevealed = true;
        revealedWordDiv.textContent = `დაშიფრული სიტყვა იყო: ${selectedWord}`;
        revealedWordDiv.style.display = 'block';
    });

    function updateResults() {
        resultsDiv.innerHTML = '';
        guesses.forEach(({ guess, result }) => {
            const row = document.createElement('div');
            row.classList.add('result-row', 'd-flex', 'justify-content-center', 'mb-2');
            for (let i = 0; i < guess.length; i++) {
                const span = document.createElement('span');
                span.textContent = guess[i];
                span.classList.add('result', result[i], 'px-2');
                row.appendChild(span);
            }
            resultsDiv.appendChild(row);
        });
    }
});
