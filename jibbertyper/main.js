var settingLength = 15;
var settingTime = 3;

function jibber(length = 1, punctuate = false, punctuationMarks = [".", "!", "?", "..."], wordLengthLimit, mimicEnglishPractices, debug = false) {
    const cv = 'aeiou';
    const cc = 'bcdfghjklmnprstvw';
    const ccx = 'qxzy';
    const cca = 'bcdfghjklmnpqrstvwxyz';
    const nonEnglishCombinations = ['mp', 'lw', 'wp', 'kg', 'fz', 'uo', 'aa', 'bx', 'cx', 'dx', 'fx', 'gx', 'hx', 'hh', 'jx', 'jj', 'kx', 'kk', 'lx', 'mx', 'nx', 'px', 'rx', 'sx', 'tx', 'vx', 'vv', 'wx', 'ww', 'bz', 'cq', 'fq', 'gj', 'jq', 'jz', 'kq', 'qv', 'qj', 'qx', 'qz', 'vx', 'vz', 'wx', 'wz', 'xz', 'zx', 'uu', 'ii'];

    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function getPunctuation() {
        return getRandomElement(punctuationMarks);
    }

    function returnUniqueRandomChar(lastTwo, possibleCharacters) {
        let unique;
        while (true) {
            unique = getRandomElement(possibleCharacters);
            if (!lastTwo.includes(unique)) {
                break;
            }
        }
        return unique;
    }

    function addV(letterHistory) {
        let proposal;
        if (letterHistory[0] === letterHistory[1]) {
            proposal = returnUniqueRandomChar(letterHistory.join(''), cv);
        } else {
            proposal = getRandomElement(cv);
        }
        word.push(proposal);
    }

    function addC(letterHistory) {
        if (Math.floor(Math.random() * 10) === 0) {
            let proposal;
            if (letterHistory[0] === letterHistory[1]) {
                proposal = returnUniqueRandomChar(letterHistory.join(''), ccx);
            } else {
                proposal = getRandomElement(ccx);
            }
            word.push(proposal);
        } else {
            let proposal;
            if (letterHistory[0] === letterHistory[1]) {
                proposal = returnUniqueRandomChar(letterHistory.join(''), cc);
            } else {
                proposal = getRandomElement(cc);
            }
            word.push(proposal);
        }
    }

    function modifyLetters(inputLetter) {
        const isDoubleConsonant = (chars) => chars.some((c, i) => i < chars.length - 1 && cca.includes(c) && c === chars[i + 1]);
        const getRandomVowel = () => getRandomElement(cv);

        let modifiedLetter = inputLetter;

        if (modifiedLetter.length >= 2 && isDoubleConsonant(modifiedLetter.slice(0, 2))) {
            modifiedLetter.splice(0, 1, getRandomVowel());
        }

        modifiedLetter = modifiedLetter.replace(/([aeiou])\1+/gi, '$1').split('');

        modifiedLetter.forEach((char, i, arr) => {
            if (/[aeiou]/.test(char) && arr[i - 1] === char) {
                arr[i] = Math.random() < 0.5 ? '' : char;
            }
        });

        return modifiedLetter;
    }

    function logStep(step, output) {
        console.log(`Step ${step}: ${output}`);
    }

    let sentence = [];
    let word = [];
    let bounty = 0;
    let step = 1;

    for (let i = 0; i < length; i++) {
        const letterCount = wordLengthLimit ? wordLengthLimit : Math.floor(Math.random() * 10) + 2;

        for (let i = 0; i < letterCount; i++) {
            const rollBountyClaim = Math.floor(Math.random() * bounty);
            const lastTwoLetters = word.slice(-2);

            if (rollBountyClaim === 0) {
                if (Math.random() < 0.5) {
                    addV(lastTwoLetters);
                    bounty = 10;
                } else {
                    addC(lastTwoLetters);
                    bounty = -10;
                }
            } else if (rollBountyClaim > 0) {
                addV(lastTwoLetters);
                bounty = bounty - 33;
            } else if (rollBountyClaim < 0) {
                addC(lastTwoLetters);
                bounty = bounty + 33;
            }
        }

        if (mimicEnglishPractices) {
            word = word.filter((char, i) => char !== word[i - 1] || char !== word[i - 2] || i < 2)
                .join('')
                .replace(/([aeiou])\1{1,3}/gi, '$1')
                .replace(/[aeiou]/gi, (char) => Math.random() < 0.5 ? '' : char)
                .replace(/([aeiou])\1+/gi, '$1')
                .split('')
                .map(modifyLetters)
                .map((letter) => (letter === 'q' ? 'qu' : letter));

            for (let i = 0; i < word.length * 20; i++) {
                word = word.map((letter, i) => {
                    const twoLetterItem = word.slice(i, i + 2).join('');
                    const combination = nonEnglishCombinations.find((item) => item === twoLetterItem);
                    if (combination === undefined) {
                        return letter;
                    }
                    if (combination) {
                        const replacementLetter = combination.charAt(Math.floor(Math.random() * 2) + 1);
                        const randomVowel = getRandomElement(cv);
                        return replacementLetter + randomVowel;
                    }
                    return letter;
                });
            }

            if (word.length <= 4 && RegExp(`^[${cca}]+$`).test(word.join(''))) {
                const randomVowel = getRandomElement(cv);
                const randomIndex = Math.floor(Math.random() * (word.length + 1));
                word.splice(randomIndex, 0, randomVowel);
            }
        }

        sentence.push(word.join(''));

        if (debug) {
            logStep(step, sentence[i]);
            step++;
        }

        word = [];
    }

    if (punctuate) {
        function punctuateWord(word) {
            if (Math.floor(Math.random() * 2) === 0) {
                word = word + getPunctuation();
            } else {
                word = word + ',';
            }
            return word;
        }

        let bounty = 0;

        for (let i = 0; i < sentence.length; i++) {
            const rollBountyClaim = Math.floor(Math.random() * bounty);
            if (rollBountyClaim <= 0) {
                bounty++;
            } else {
                sentence[i] = punctuateWord(sentence[i]);
                if (punctuationMarks.includes(sentence[i].charAt(sentence[i].length - 1)) && i !== sentence.length - 1) {
                    sentence[i + 1] = sentence[i + 1].charAt(0).toUpperCase() + sentence[i + 1].slice(1);
                    bounty = bounty - 10;
                } else {
                    bounty = bounty - 5;
                }
            }
        }

        sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);

        if (punctuationMarks.includes(sentence.join(' ').charAt(sentence.join(' ').length - 1))) {
            sentence[sentence.length - 1] = sentence[sentence.length - 1].replace(/.$/, '.');
        } else {
            sentence[sentence.length - 1] = sentence[sentence.length - 1] + getPunctuation();
        }
    }

    if (debug) {
        console.log('Final Output:', sentence.join(' '));
    }

    return sentence.join(' ');
}

function start(lengthSetting, timeSetting) {
    const raw = jibber(lengthSetting, true);
    const str = raw.trim() + ".";
    const text = document.querySelector(".text");
    const input = document.querySelector(".input");
    const progressBarTime = document.querySelector(".progress-bar-time");
    const progressBarProgress = document.querySelector(".progress-bar-progress");

    let timer = null;
    const charEls = [];

    function populateText(str) {
        for (const letter of str) {
            const span = document.createElement("span");
            span.textContent = letter;
            text.appendChild(span);
            charEls.push(span);
        }
    }
    populateText(str);

    function resetCharEls() {
        for (const charEl of charEls) {
            charEl.classList.remove("correct", "wrong");
        }
    }

    function handleTimeout() {
        if (
            confirm(
                "You ran out of time! You can close this notification to continue typing or press OK to retry."
            )
        ) {
            location.reload();
        }
    }

    function handleInput() {
        let totalTime = 0
        if (!timer) {
            progressBarTime.classList.add("active");
            progressBarProgress.classList.add("active");
            const time = str.length / timeSetting;
            totalTime = Math.round(time);
            const cssTime = `${time / 2}s animate linear`;
            const cssProgress = `${(input.value.length / str.length) * 100}%`;
            progressBarTime.style.animation = cssTime;
            progressBarProgress.style.width = cssProgress;
            const javaTime = (time / 2) * 1000;
            timer = setTimeout(handleTimeout, javaTime);
        }

        const val = input.value;
        resetCharEls();
        let errorCount = 0;
        let correctCount = 0;

        for (let i = 0; i < val.length; i++) {
            if (val[i] === str[i]) {
                charEls[i].classList.add("correct");
                correctCount++;
            } else {
                charEls[i].classList.add("wrong");
                errorCount++;
            }
        }

        if (val.length >= str.length) {
            const errorText = errorCount === 1 ? "error!" : "errors!";
            const resultText = `Well Done! You completed the test within the time limit of ${totalTime} seconds with ${errorCount} ${errorText}\n\nPress OK to restart and reload the page.`;

            if (confirm(resultText)) {
                location.reload();
            }

            clearTimeout(timer);
        }
    }

    input.addEventListener("input", handleInput);
}

function updateSettings() {
    const timeInput = document.getElementById("timeInput").value;
    const lengthInput = document.getElementById("lengthInput").value;

    if (timeInput.length === 0 || lengthInput.length === 0) {
        window.alert("Please input values in the setting boxes before generating a level.");
    } else {
        start(lengthInput, timeInput);
    }
}