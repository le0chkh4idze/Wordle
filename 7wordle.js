document.addEventListener('DOMContentLoaded', () => {
    const WORD_LIST = [
        { word: "პერიოდი", hint: "მენდელეევის პერიოდული სისტემა შედგება ..."},
        { word: "გოგირდი", hint: "მენდელეევის პერიოდული სისტემის VI ჯგუფის ელემენტი."},
        { word: "ინდექსი", hint: "ქიმიური ფორმულის(ნაერთის) ძირითადი შემადგენელი მახასიათებელი."},
        { word: "ფოსფორი", hint: "მენდელეევის პერიოდული სისტემის V ჯგუფის ელემენტი."},
        { word: "პროტონი", hint: "ატომის შემადგენელი ნაწილაკი."},
        { word: "იზოტოპი", hint: "ერთნაირი პროტონების რიცხვის მქონე ატომთა სახეობები."},
        { word: "ჰელიუმი", hint: "მენდელეევის პერიოდული სისტემის ელემენტი."},
        { word: "კათიონი", hint: "უარყოფითად დამუხტული იონი"},
        { word: "ლითიუმი", hint: "მენდელეევის პერიოდული სისტემის I ჯგუფის ელემენტი."},
        { word: "ვერცხლი", hint: "მენდელეევის პერიოდული სისტემის I ჯგუფის ელემენტი."},
        { word: "ცეზიუმი", hint: "მენდელეევის პერიოდული სისტემის I ჯგუფის ელემენტი."},
        { word: "კალიუმი", hint: "მენდელეევის პერიოდული სისტემის I ჯგუფის ელემენტი."}
    ];
    const selected = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    const selectedWord = selected.word;
    const selectedHint = selected.hint;
    let guesses = [];
    const maxGuesses = 4;
    let wordRevealed = false;

    const hintDiv = document.getElementById('hint');
    const guessInput = document.getElementById('guess-input');
    const submitGuessButton = document.getElementById('submit-guess');
    const revealWordButton = document.getElementById('reveal-word');
    const resultsDiv = document.getElementById('results');
    const revealedWordDiv = document.getElementById('revealed-word');

    hintDiv.textContent = `მინიშნება: ${selectedHint}`;

    submitGuessButton.addEventListener('click', () => {
        if (guesses.length >= maxGuesses || wordRevealed) {
            return;
        }
        const guess = guessInput.value.toLowerCase();
        if (guess.length === 7) {
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
            if (guesses.length >= maxGuesses) {
                revealWord();
            }
        }
    });

    revealWordButton.addEventListener('click', revealWord);

    function revealWord() {
        wordRevealed = true;
        revealedWordDiv.textContent = `დაშიფრული სიტყვა იყო: ${selectedWord}`;
        revealedWordDiv.style.display = 'block';
    }

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
