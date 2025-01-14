let bot = null;
let isPlayerTurn = true;
let gameModeType = 'single';
let playerName = localStorage.getItem('playerName') || 'Hráč';

// Checkout combinations for score suggestions
const checkoutCombinations = {
    170: ['T20', 'T20', 'D25'],
    167: ['T20', 'T19', 'D25'],
    164: ['T20', 'T18', 'D25'],
    161: ['T20', 'T17', 'D25'],
    160: ['T20', 'T20', 'D20'],
    158: ['T20', 'T20', 'D19'],
    157: ['T20', 'T19', 'D20'],
    156: ['T20', 'T20', 'D18'],
    155: ['T20', 'T19', 'D19'],
    154: ['T20', 'T18', 'D20'],
    153: ['T20', 'T19', 'D18'],
    152: ['T20', 'T20', 'D16'],
    151: ['T20', 'T17', 'D20'],
    150: ['T20', 'T18', 'D18'],
    149: ['T20', 'T19', 'D16'],
    148: ['T20', 'T16', 'D20'],
    147: ['T20', 'T17', 'D18'],
    146: ['T20/T19', 'T18', 'D16'],
    145: ['T20', 'T15', 'D20'],
    144: ['T20/T18', 'T20', 'D12'],
    143: ['T19', 'T18', 'D16'],
    142: ['T20/T17', 'T14', 'D20'],
    141: ['T20', 'T19', 'D12'],
    140: ['T20', 'T20', 'D10'],
    139: ['T19', 'T14', 'D20'],
    138: ['T20', 'T18', 'D12'],
    137: ['T20', 'T19', 'D10'],
    136: ['T20', 'T20', 'D8'],
    135: ['T20', 'T17', 'D12'],
    134: ['T20', 'T14', 'D16'],
    133: ['T20', 'T19', 'D8'],
    132: ['T20', 'T16', 'D12'],
    131: ['T20', 'T13', 'D16'],
    130: ['T20', 'T20', 'D5'],
    129: ['T19', 'T16', 'D12'],
    128: ['T18', 'T14', 'D16'],
    127: ['T20', 'T17', 'D8'],
    126: ['T19', 'T19', 'D6'],
    125: ['T20', 'T19', 'D4'],
    124: ['T20', 'T16', 'D8'],
    123: ['T19', 'T16', 'D9'],
    122: ['T18', 'T20', 'D4'],
    121: ['T20', 'T11', 'D14'],
    120: ['T20', 'S20', 'D20'],
    119: ['T19', 'T12', 'D13'],
    118: ['T20', 'S18', 'D20'],
    117: ['T20', 'S17', 'D20'],
    116: ['T20', 'S16', 'D20'],
    115: ['T20', 'S15', 'D20'],
    114: ['T20', 'S14', 'D20'],
    113: ['T20', 'S13', 'D20'],
    112: ['T20', 'S12', 'D20'],
    111: ['T20', 'S11', 'D20'],
    110: ['T20', 'S10', 'D20'],
    109: ['T19', 'S12', 'D20'],
    108: ['T20', 'S8', 'D20'],
    107: ['T19', 'S10', 'D20'],
    106: ['T20', 'S6', 'D20'],
    105: ['T20', 'S5', 'D20'],
    104: ['T18', 'S10', 'D20'],
    103: ['T19', 'S6', 'D20'],
    102: ['T20', 'S10', 'D16'],
    101: ['T17', 'S10', 'D20'],
    100: ['T20', 'D20'],
    99: ['T19', 'S10', 'D16'],
    98: ['T20', 'D19'],
    97: ['T19', 'D20'],
    96: ['T20', 'D18'],
    95: ['T19', 'D19'],
    94: ['T18', 'D20'],
    93: ['T19', 'D18'],
    92: ['T20', 'D16'],
    91: ['T17', 'D20'],
    90: ['T20', 'D15'],
    89: ['T19', 'D16'],
    88: ['T16', 'D20'],
    87: ['T17', 'D18'],
    86: ['T18', 'D16'],
    85: ['T15', 'D20'],
    84: ['T20', 'D12'],
    83: ['T17', 'D16'],
    82: ['T14', 'D20'],
    81: ['T19', 'D12'],
    80: ['T20', 'D10'],
    79: ['T19', 'D11'],
    78: ['T18', 'D12'],
    77: ['T19', 'D10'],
    76: ['T20', 'D8'],
    75: ['T17', 'D12'],
    74: ['T14', 'D16'],
    73: ['T19', 'D8'],
    72: ['T16', 'D12'],
    71: ['T13', 'D16'],
    70: ['T20', 'D5'],
    69: ['T19', 'D6'],
    68: ['T20', 'D4'],
    67: ['T17', 'D8'],
    66: ['T14', 'D12'],
    65: ['T19/25', 'D4'],
    64: ['T16', 'D8'],
    63: ['T13', 'D12'],
    62: ['T10', 'D16'],
    61: ['T15', 'D8'],
    60: ['S20', 'D20'],
    59: ['S19', 'D20'],
    58: ['S18', 'D20'],
    57: ['S17', 'D20'],
    56: ['S16', 'D20'],
    55: ['S15', 'D20'],
    54: ['S14', 'D20'],
    53: ['S13', 'D20'],
    52: ['S12', 'D20'],
    51: ['S11', 'D20'],
    50: ['S10', 'D20'],
    49: ['S9', 'D20'],
    48: ['S8', 'D20'],
    47: ['S7', 'D20'],
    46: ['S6', 'D20'],
    45: ['S5', 'D20'],
    44: ['S4', 'D20'],
    43: ['S3', 'D20'],
    42: ['S10', 'D16'],
    41: ['S9', 'D16'],
    40: ['D20'],
    39: ['S7', 'D16'],
    38: ['D19'],
    37: ['S5', 'D16'],
    36: ['D18'],
    35: ['S3', 'D16'],
    34: ['D17'],
    33: ['S1', 'D16'],
    32: ['D16'],
    31: ['S7', 'D12'],
    30: ['D15'],
    29: ['S13', 'D8'],
    28: ['D14'],
    27: ['S11', 'D8'],
    26: ['D13'],
    25: ['S9', 'D8'],
    24: ['D12'],
    23: ['S7/S3', 'D8'],
    22: ['D11'],
    21: ['S5', 'D8'],
    20: ['D10'],
    19: ['S3', 'D8'],
    18: ['D9'],
    17: ['S1', 'D8'],
    16: ['D8'],
    15: ['S7', 'D4'],
    14: ['D7'],
    13: ['S5', 'D4'],
    12: ['D6'],
    11: ['S3', 'D4'],
    10: ['D5'],
    9: ['S1', 'D4'],
    8: ['D4'],
    7: ['S3', 'D2'],
    6: ['D3'],
    5: ['S1', 'D2'],
    4: ['D2'],
    3: ['S1', 'D1'],
    2: ['D1']
};

let currentScore = 501;
let throws = [];
let history = [{score: 501, throws: []}];
let activeMultiplier = 1;
let currentRound = 1;
let totalDarts = 0;
let voiceMode = 'none'; // 'none', 'total', 'perThrow'
let recognition = null;
let currentThrowIndex = 0;
const maxThrows = 3;
let gridVisible = true;
let winBanner;
let winBannerDisplayed = false;
let numberQueue = [];
let processingQueue = false;
let currentLeg = 1; //DEFAULT ACTIVE LEG
let currentSet = 1; //DEFAULT ACTIVE SET
let totalLegs = 1; //DEFAULT LEGS TO WIN    
let totalSets = 1; //DEFAULT SETS TO WIN   
let legsWon = 0;
let setsWon = 0;

const legsInput = document.getElementById('legs');
const setsInput = document.getElementById('sets');

document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Nastavení jména hráče
    const playerNameInput = document.getElementById('playerName');
    playerNameInput.value = playerName;
    document.querySelector('.player-score .score-label').textContent = playerName;

    playerNameInput.addEventListener('input', function() {
        playerName = this.value || 'Hráč';
        localStorage.setItem('playerName', playerName);
        document.querySelector('.player-score .score-label').textContent = playerName;
    });
});

function updateCheckoutSuggestions() {
    const remainingThrows = 3 - (voiceMode === 'total' ? 0 : throws.length);
    if (remainingThrows <= 0) return;

    // Clear only the upcoming throw displays
    for (let i = (voiceMode === 'total' ? 1 : throws.length + 1); i <= 3; i++) {
        const throwElement = document.getElementById(`throw${i}`);
        if (throwElement && !throwElement.hasAttribute('data-points')) {
            throwElement.textContent = '-';
            throwElement.classList.remove('checkout-suggestion');
        }
    }
    
    // Show checkout only if there's a possible combination
    if (checkoutCombinations[currentScore]) {
        const combination = checkoutCombinations[currentScore];
        // Display only for remaining throws
        for (let i = 0; i < remainingThrows; i++) {
            const throwIndex = voiceMode === 'total' ? i : throws.length + i;
            if (throwIndex < 3 && combination[i]) {
                const throwElement = document.getElementById(`throw${throwIndex + 1}`);
                if (throwElement) {
                    throwElement.textContent = combination[i];
                    throwElement.classList.add('checkout-suggestion');
                }
            }
        }
    }
}

function clearCheckoutDisplay() {
    const throwElements = [
        document.getElementById('throw1'),
        document.getElementById('throw2'),
        document.getElementById('throw3')
    ];
    
    throwElements.forEach(element => {
        if (element) {
            element.classList.remove('checkout-suggestion');
            if (!element.hasAttribute('data-points')) {
                element.textContent = '-';
            }
        }
    });
}

function convertSpokenNumberToCzech(text) {
    const numberWords = {
        'nula': 0, 'jedna': 1, 'dvě': 2, 'tři': 3, 'čtyři': 4,
        'pět': 5, 'pet': 5, 'šest': 6, 'sedm': 7, 'osm': 8, 'devět': 9,
        'deset': 10, 'jedenáct': 11, 'dvanáct': 12, 'třináct': 13,
        'čtrnáct': 14, 'patnáct': 15, 'šestnáct': 16, 'sedmnáct': 17,
        'osmnáct': 18, 'devatenáct': 19, 'dvacet': 20,
    };

    text = text.toLowerCase().trim();
    
    if (text === 'zpět' || text === 'zpet') {
        return 'undo';
    }
    
    // Nejdřív zkontrolujeme slovní vyjádření
    if (numberWords.hasOwnProperty(text)) {
        const num = numberWords[text];
        // Přidáme nulu před jednociferná čísla při výpisu do konzole
        if (num < 10) {
            console.log(`0${num}`);
        } else {
            console.log(num);
        }
        return num;
    }
    
    // Pokud je to číslo, převedeme na number
    const numericValue = parseInt(text.replace(/\D/g, ''));
    if (!isNaN(numericValue)) {
        // Pro jednotlivé zadávání rozdělíme čísla větší než 60
        if (voiceMode === 'perThrow' && numericValue > 60) {
            return String(numericValue).split('').map(Number);
        }
        // Přidáme nulu před jednociferná čísla při výpisu do konzole
        if (numericValue < 10) {
            console.log(`0${numericValue}`);
        } else {
            console.log(numericValue);
        }
        return numericValue;
    }
    
    return null;
}

function addManualScore() {
    const input = document.getElementById('manualInput');
    const value = parseInt(input.value);
    if (!isNaN(value) && value >= 0) {
        if (voiceMode === 'total') {
            addVoiceTotal(value);
        } else {
            addScore(value);
            
            // Pokud je aktivní bot a máme všechny tři hody
            if (bot && throws.length >= maxThrows) {
                console.log('Hráč dokončil tah (manuální vstup), přichází bot');
                setTimeout(() => {
                    throws = [];
                    currentRound++;
                    currentThrowIndex = 0;
                    saveState();
                    updateDisplay();
                    updateThrowIndicators();
                    
                    // Spustíme tah bota
                    isPlayerTurn = false;
                    playBotTurn();
                }, 1000);
            }
        }
        input.value = '';
    }
}

// Přidáme event listener pro Enter klávesu
document.getElementById('manualInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addManualScore();
    }
});

function addScore(points) {
    if (points > 60) {
        showErrorBanner('Nelze hodit více než 60 bodů jednou šipkou!');
        if (recognition) {
            setTimeout(() => {
                recognition.start();
            }, 1000);
        }
        return;
    }
    
    if (throws.length >= maxThrows) return;
    
    // Aplikovat multiplier na body
    const finalPoints = points * activeMultiplier;
    currentScore -= finalPoints;
    
    throws.push({
        base: points,
        multiplier: activeMultiplier,
        points: finalPoints
    });
    
    totalDarts++;
    saveState();
    updateDisplay();
    
    if (currentScore === 0) {
        checkWinCondition();
        return;
    }
    
    if (currentThrowIndex < maxThrows - 1) {
        currentThrowIndex++;
        updateThrowIndicators();
    }
    
    // Pokud jsou všechny tři hody dokončeny
    if (throws.length >= maxThrows) {
        if (bot) {
            console.log('Hráč dokončil tah, přichází bot');
            setTimeout(() => {
                throws = [];
                currentRound++;
                currentThrowIndex = 0;
                saveState();
                updateDisplay();
                updateThrowIndicators();
                
                // Spustíme tah bota
                isPlayerTurn = false;
                playBotTurn();
            }, 1000);
        } else {
            setTimeout(() => {
                throws = [];
                currentRound++;
                currentThrowIndex = 0;
                saveState();
                updateDisplay();
                updateThrowIndicators();
            }, 2000);
        }
    }
    updateCheckoutSuggestions();
}

function showErrorBanner(message) {
    playSound('error');
    const banner = document.getElementById('errorBanner');
    if (message.includes('Bot vyhrál')) {
        // Pokud bot vyhrál, zobrazíme jeho jméno
        message = `${bot.name} vyhrál leg!`;
    }
    banner.textContent = message;
    banner.style.display = 'block';
    setTimeout(() => {
        banner.style.display = 'none';
    }, 3000);
}

function addVoiceTotal(points) {
    if (points > 180) {
        showErrorBanner('Nelze hodit více než 180 bodů na tři šipky!');
        if (recognition) {
            setTimeout(() => {
                recognition.start();
            }, 1000);
        }
        return;
    }
    
    currentScore -= points;
    totalDarts += 3;
    
    // Přidat záznam do historie pro hlasové zadání
    const historyData = document.querySelector('.history-data');
    const historyEntry = document.createElement('div');
    historyEntry.className = 'history-entry';
    historyEntry.textContent = `${points}`;
    historyData.insertBefore(historyEntry, historyData.firstChild);
    
    history.push({
        score: currentScore,
        voiceTotal: points,
        round: currentRound,
        totalDarts: totalDarts
    });
    updateDisplay();
    
    // Kontrola vítězství po zadání celkového součtu
    if (currentScore === 0) {
        checkWinCondition();
        return;
    }
    
    // Přidat tah bota po hlasovém zadání
    if (bot) {
        setTimeout(() => {
            isPlayerTurn = false;
            playBotTurn();
        }, 1000);
    }
    
    updateCheckoutSuggestions();
    setTimeout(() => {
        currentRound++;
        throws = [];
        history.push({
            score: currentScore,
            voiceTotal: null,
            round: currentRound,
            totalDarts: totalDarts
        });
        updateDisplay();
        updateCheckoutSuggestions();
        if (voiceMode === 'total' && recognition) {
            recognition.start();
        }
    }, 2000);
}

function updateThrowIndicators() {
    for (let i = 1; i <= maxThrows; i++) {
        const throwElement = document.getElementById(`throw${i}`);
        if (i - 1 === currentThrowIndex) {
            throwElement.classList.add('current-throw-indicator');
            throwElement.classList.add('active-throw');
        } else {
            throwElement.classList.remove('current-throw-indicator');
            throwElement.classList.remove('active-throw');
        }
    }
}

function calculateAverages() {
    if (totalDarts === 0) return { avgPerThree: 0, };
    
    // Získání počátečního skóre z historie
    const initialScore = history[0].score;
    
    // Výpočet průměru na 3 šipky
    const totalScore = initialScore - currentScore;
    const avgPerThree = (totalScore / totalDarts) * 3;
    
    // Výpočet průměru prvních 9 šipek
    let firstNineScore = 0;
    if (totalDarts >= 9) {
        firstNineScore = initialScore - history[Math.min(3, history.length - 1)].score;
    } else {
        firstNineScore = initialScore - currentScore;
    }
    
    return {
        avgPerThree: Math.round(avgPerThree * 100) / 100,
    };
}

function updateDisplay() {
    const scoreElement = document.getElementById('currentScore');
    const oldScore = parseInt(scoreElement.textContent);
    // Kontrola možnosti zavření na 9 šipek
    if (canCheckoutIn9Darts(currentScore)) {
        // Animace skóre
        gsap.to(scoreElement, {
            innerHTML: currentScore,
            duration: 0.5,
            snap: { innerHTML: 1 }, // Zajistí celá čísla během animace
            onComplete: () => {
                // Po dokončení animace přidáme ikonu "9"
                scoreElement.innerHTML = `${currentScore}<span class="nine-darts">9</span>`;
            }
        });
    } else {
        // Základní animace skóre bez ikony "9"
        gsap.to(scoreElement, {
            innerHTML: currentScore,
            duration: 0.5,
            snap: { innerHTML: 1 } // Zajistí celá čísla během animace
        });
    }
    
    document.getElementById('roundCounter').textContent = currentRound;
    document.getElementById('totalDarts').textContent = totalDarts;

    // Aktualizace zobrazení stavu hry
    document.getElementById('currentSetDisplay').textContent = currentSet;
    document.getElementById('totalSetsDisplay').textContent = totalSets;
    document.getElementById('currentLegDisplay').textContent = currentLeg;
    document.getElementById('totalLegsDisplay').textContent = totalLegs;

    const averages = calculateAverages();
    document.getElementById('avgPerThree').textContent = averages.avgPerThree;
    
    document.getElementById('throwTotal').style.display = voiceMode === 'total' ? 'block' : 'none';
    
    if (voiceMode === 'total') {
        const lastState = history[history.length - 1];
        const totalValue = lastState.voiceTotal;
        document.getElementById('throwTotal').textContent = 
            totalValue !== null ? `${totalValue}` : '-';
            
        if (totalValue === 180) {
            playRussBray();
            create180Animation();
        }
    } else {
        const throwSum = throws.reduce((sum, t) => sum + t.points, 0);
        for (let i = 1; i <= maxThrows; i++) {
            const throwElement = document.getElementById(`throw${i}`);
            const throwValue = throws[i-1];
            if (throwValue) {
                throwElement.textContent = `${throwValue.points} (${throwValue.base}×${throwValue.multiplier})`;
                throwElement.classList.remove('checkout-suggestion');
            } else if (!throwElement.classList.contains('checkout-suggestion')) {
                throwElement.textContent = '-';
            }
        }
        
        if (throwSum === 180 && throws.length === 3) {
            playRussBray();
            create180Animation();
        }
        
        // Aktualizace historie pouze pro manuální zadávání (ne hlasové)
        if (throws.length === 3 && voiceMode === 'none') {
            updateHistory();
        }
    }
    
    updateThrowIndicators();
    if (currentScore > 1) {
        updateCheckoutSuggestions();
    } else {
        clearCheckoutDisplay();
    }
    
    // Kontrola vítězství
    checkWinCondition();

    // Aktualizace skóre hráče
    document.getElementById('currentScore').textContent = currentScore;
    
    // Aktualizace skóre bota a zobrazení/skrytí sekce bota
    const botScoreElement = document.querySelector('.bot-score');
    if (bot) {
        botScoreElement.style.display = 'block';
        document.getElementById('botScoreDisplay').textContent = bot.score;
    } else {
        botScoreElement.style.display = 'none';
    }
}

function saveState() {
    history.push({
        score: currentScore,
        throws: [...throws],
        round: currentRound,
        totalDarts: totalDarts
    });
}

function toggleMultiplier(value) {
    if (voiceMode === 'none') {
        activeMultiplier = activeMultiplier === value ? 1 : value;
        document.getElementById('doubleBtn').classList.toggle('active-multiplier', activeMultiplier === 2);
        document.getElementById('tripleBtn').classList.toggle('active-multiplier', activeMultiplier === 3);
        
        // Úprava: Deaktivace tlačítek pro nulu a 25 při triple
        const zeroButton = document.querySelector('.number-btn[data-value="0"]');
        const bull25Button = document.querySelector('.number-btn[data-value="25"]');
        
        if (zeroButton) {
            zeroButton.disabled = activeMultiplier !== 1;
            zeroButton.style.opacity = activeMultiplier === 1 ? '1' : '0.5';
            zeroButton.style.cursor = activeMultiplier === 1 ? 'pointer' : 'not-allowed';
        }
        
        if (bull25Button) {
            bull25Button.disabled = activeMultiplier === 3;
            bull25Button.style.opacity = activeMultiplier === 3 ? '0.5' : '1';
            bull25Button.style.cursor = activeMultiplier === 3 ? 'not-allowed' : 'pointer';
        }
    }
}

function selectNumber(num) {
    if (voiceMode !== 'none') return;
    if (throws.length >= maxThrows) return;
    
    playSound('click');
    
    const points = num * activeMultiplier;
    throws.push({
        base: num,
        multiplier: activeMultiplier,
        points: points
    });
    currentScore -= points;
    totalDarts++;
    saveState();
    
    if (currentThrowIndex < maxThrows - 1) {
        currentThrowIndex++;
    }
    updateDisplay();
    updateThrowIndicators();
    
    if (activeMultiplier !== 1) {
        toggleMultiplier(activeMultiplier);
    }
    
    // Pokud jsou všechny tři hody dokončeny
    if (throws.length >= maxThrows) {
        if (bot) {
            console.log('Hráč dokončil tah (kliknutí na čísla), přichází bot');
            setTimeout(() => {
                throws = [];
                currentRound++;
                currentThrowIndex = 0;
                saveState();
                updateDisplay();
                updateThrowIndicators();
                
                // Spustíme tah bota
                isPlayerTurn = false;
                playBotTurn();
            }, 1000);
        } else {
            setTimeout(() => {
                throws = [];
                currentRound++;
                currentThrowIndex = 0;
                saveState();
                updateDisplay();
                updateThrowIndicators();
            }, 2000);
        }
    }
}

function undoLastThrow() {
    if (history.length > 1) {
        history.pop();
        const lastState = history[history.length - 1];
        currentScore = lastState.score;
        throws = lastState.throws ? [...lastState.throws] : [];
        currentRound = lastState.round;
        totalDarts = lastState.totalDarts;
        
        // Přidaná kontrola - pokud se vrátíme na 501, resetujeme statistiky
        if (currentScore === 501) {
            currentRound = 1;
            totalDarts = 0;
            history = [{score: 501, throws: []}];
        }
        
        currentThrowIndex = throws.length;
        updateDisplay();
        updateThrowIndicators();
        updateCheckoutSuggestions();
        
        // Aktualizace historie v UI - odstraníme poslední záznam
        const historyData = document.querySelector('.history-data');
        if (historyData.firstChild) {
            historyData.removeChild(historyData.firstChild);
        }
    }
}

function resetGame() {
    currentScore = 501;
    throws = [];
    history = [{score: 501, throws: []}];
    activeMultiplier = 1;
    currentRound = 1;
    totalDarts = 0;
    currentThrowIndex = 0;
    setVoiceMode('none');
    toggleMultiplier(1);
    clearCheckoutDisplay();
    updateDisplay();
    
    // Reset leg/set počítadel
    currentLeg = 1;
    currentSet = 1;
    legsWon = 0;
    setsWon = 0;
    
    // Vymazání historie v UI
    const historyData = document.querySelector('.history-data');
    historyData.innerHTML = ''; // Přidáno - vymaže obsah historie
    
    if (winBanner) {
        winBanner.remove();
        winBannerDisplayed = false;
    }
}

function setVoiceMode(mode) {
    voiceMode = mode;
    const container = document.querySelector('.container');
    const voiceTotalBtn = document.getElementById('voiceTotalBtn');
    const voicePerThrowBtn = document.getElementById('voicePerThrowBtn');
    
    container.classList.toggle('voice-total-active', mode === 'total');
    voiceTotalBtn.classList.toggle('voice-btn-active', mode === 'total');
    voicePerThrowBtn.classList.toggle('voice-btn-active', mode === 'perThrow');
    
    if (recognition) {
        recognition.stop();
        if (mode !== 'none') {
            recognition.start();
        }
    }
    
    currentThrowIndex = 0;
    clearCheckoutDisplay();
    updateDisplay();
}

const numberGrid = document.getElementById('numberGrid');
const numbers = [...Array(20).keys()].map(i => i + 1);
numbers.push(25, 0);

for (const i of numbers) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'number-btn';
    btn.setAttribute('data-value', i);
    btn.onclick = () => selectNumber(i);
    numberGrid.appendChild(btn);
    
    if (i === 0) {
        const undoBtn = document.createElement('button');
        undoBtn.textContent = '↩️ Zpět';
        undoBtn.className = 'control-btn-back';
        undoBtn.onclick = undoLastThrow;
        undoBtn.style.gridColumn = 'span 6';
        numberGrid.appendChild(undoBtn);
    }
}

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    recognition.lang = 'cs-CZ';
    recognition.continuous = true;
    recognition.interimResults = true;
    
    let processingTimeout = null;
    let isProcessing = false;
    
    recognition.onresult = function(event) {
        if (isProcessing) return;
        
        clearTimeout(processingTimeout);
        const transcript = event.results[event.results.length - 1][0].transcript;
        console.log('Rozpoznaný text:', transcript);
        
        processingTimeout = setTimeout(() => {
            if (isProcessing) return;
            isProcessing = true;
            
            numberQueue = [];
            
            const cleanText = transcript.toLowerCase()
                .replace(/[.:,;]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
            console.log('Vyčištěný text:', cleanText);
            
            const words = cleanText.split(' ');
            console.log('Rozdělená slova:', words);
            
            if (voiceMode === 'total') {
                const result = convertSpokenNumberToCzech(words[0]);
                console.log('Celkový režim - výsledek:', result);
                if (result === 'undo') {
                    recognition.stop();
                    undoLastThrow();
                } else if (result !== null) {
                    addVoiceTotal(result);
                }
            } else if (voiceMode === 'perThrow') {
                console.log('Jednotlivý režim - zpracování slov');
                for (const word of words) {
                    const result = convertSpokenNumberToCzech(word);
                    console.log('Zpracování slova:', word, '-> výsledek:', result);
                    if (result === 'undo') {
                        recognition.stop();
                        undoLastThrow();
                        break;
                    } else if (result !== null) {
                        if (Array.isArray(result)) {
                            console.log('Rozdělení čísla na číslice:', result);
                            numberQueue.push(...result);
                        } else {
                            numberQueue.push(result);
                        }
                    }
                }
                
                console.log('Aktuální fronta čísel:', numberQueue);
                
                if (!processingQueue && numberQueue.length > 0) {
                    processNumberQueue();
                }
            }
            
            recognition.stop();
            setTimeout(() => {
                isProcessing = false;
                if (voiceMode !== 'none') {
                    recognition.abort();
                    recognition.start();
                }
            }, 1000);
        }, 1500);
    };

    recognition.onend = function() {
        if (voiceMode !== 'none' && !isProcessing) {
            setTimeout(() => {
                recognition.abort(); // Přidáno pro vyčištění výsledků
                recognition.start();
            }, 100);
        }
    };

    document.getElementById('voiceTotalBtn').onclick = () => {
        setVoiceMode(voiceMode === 'total' ? 'none' : 'total');
    };
    
    document.getElementById('voicePerThrowBtn').onclick = () => {
        setVoiceMode(voiceMode === 'perThrow' ? 'none' : 'perThrow');
    };

} else {
    console.log("Hlasové rozpoznávání není podporováno");
    document.getElementById('voiceTotalBtn').style.display = 'none';
    document.getElementById('voicePerThrowBtn').style.display = 'none';
}

document.getElementById('hideGridBtn').onclick = () => {
    const buttons = document.querySelectorAll('.number-btn, .control-btn-back, .control-btn:nth-child(n+2)');
    const hideGridBtn = document.getElementById('hideGridBtn');
    
    if (gridVisible) {
        buttons.forEach(btn => btn.style.display = 'none');
        hideGridBtn.textContent = '🔓 Odkrýt';
    } else {
        buttons.forEach(btn => btn.style.display = 'block');
        hideGridBtn.textContent = '🔒 Skrýt čísla';
    }
    
    gridVisible = !gridVisible;
};

function checkWinCondition() {
    if (currentScore === 0 && !winBannerDisplayed) {
        playSound('success');
        legsWon++;
        
        // Aktualizace zobrazení
        currentLeg++;
        
        // Kontrola výhry setu
        if (legsWon >= totalLegs) {
            setsWon++;
            legsWon = 0;
            currentLeg = 1; // Reset legů pro nový set
            
            // Kontrola výhry celé hry
            if (setsWon >= totalSets) {
               // showWinBanner();
                return; // Ukončíme funkci, protože hra skončila
            } else {
                // Začít nový set
                currentSet++;
            }
        }
        
        // Začít nový leg (ať už v rámci stejného setu nebo nového)
        startNewLeg();
    }
}

function startNewLeg() {
    currentScore = 501;
    throws = [];
    history = [{score: 501, throws: []}];
    currentRound = 1;
    currentThrowIndex = 0;
    totalDarts = 0; // Reset počtu šipek pro nový leg
    if (bot) bot.resetScore(); // Reset skóre bota při novém legu
    updateDisplay();
}

function startNewGame() {
    const newScore = parseInt(startingScoreInput.value);
    const newLegs = parseInt(legsInput.value);
    const newSets = parseInt(setsInput.value);
    // Změna získání herního módu
    gameModeType = document.querySelector('.game-mode-option.active').dataset.mode;
    
    if (newScore && newScore > 0 && newLegs && newLegs > 0 && newSets && newSets > 0) {
        currentScore = newScore;
        totalLegs = newLegs;
        totalSets = newSets;
        throws = [];
        history = [{score: newScore, throws: []}];
        activeMultiplier = 1;
        currentRound = 1;
        totalDarts = 0;
        currentThrowIndex = 0;
        currentLeg = 1;
        currentSet = 1;
        legsWon = 0;
        setsWon = 0;
        isPlayerTurn = true;
        
        // Vymazání historie v UI
        const historyData = document.querySelector('.history-data');
        historyData.innerHTML = ''; // Přidáno - vymaže obsah historie
        
        // Inicializace bota pokud je vybrán herní mód s botem
        if (gameModeType === 'bot') {
            const selectedDifficulty = document.querySelector('.difficulty-btn.selected');
            const botLevel = selectedDifficulty ? selectedDifficulty.dataset.level : 'medium';
            bot = new DartsBot(botLevel);
            
            document.getElementById('botNameDisplay').textContent = bot.name;
        } else {
            bot = null;
            document.getElementById('botNameDisplay').textContent = 'Bot';
        }
        
        setVoiceMode('none');
        toggleMultiplier(1);
        clearCheckoutDisplay();
        updateDisplay();
        
        if (winBanner) {
            winBanner.remove();
            winBannerDisplayed = false;
        }
        
        closeNewGameModal();
    } else {
        showErrorBanner('Zadejte platné hodnoty pro skóre, legy a sety!');
    }
}

resetGame();

const settingsButton = document.querySelector('.settings-button');
const settingsSidebar = document.querySelector('.settings-sidebar');
const overlay = document.querySelector('.overlay');

settingsButton.addEventListener('click', function() {
    const sidebar = document.querySelector('.settings-sidebar');
    const overlay = document.querySelector('.overlay');
    const settingsButton = document.querySelector('.settings-button');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    settingsButton.classList.toggle('sidebar-active');
});

overlay.addEventListener('click', () => {
    settingsSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('.settings-button').classList.remove('sidebar-active');
    closeNewGameModal();
});

// Nastavení zvuku
let soundEnabled = localStorage.getItem('soundEnabled') === 'true';
const soundToggle = document.getElementById('soundToggle');

// Načtení stavu zvuku z localStorage
soundToggle.checked = soundEnabled;

// Funkce pro přehrání zvuku
function playSound(type) {
    if (!soundEnabled) return;
    
    const sounds = {
        click: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADQABERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERE//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAkDxQpnpAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGQwD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ=='),
        error: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADQABERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERE//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAkC7LgjHAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGQwD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ=='),
        success: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADQABERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERE//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAkCf5s/YAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGQwD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==')
    };
    
    if (sounds[type]) {
        sounds[type].play().catch(e => console.log('Zvuk nelze přehrát:', e));
    }
}

// Event listener pro přepínač zvuku
soundToggle.addEventListener('change', (e) => {
    soundEnabled = e.target.checked;
    localStorage.setItem('soundEnabled', soundEnabled);
    
    // Přehrát testovací zvuk při zapnutí
    if (soundEnabled) {
        playSound('click');
    }
});

// Přidat přehrávání zvuků k existujícím akcím
function selectNumber(num) {
    if (voiceMode !== 'none') return;
    if (throws.length >= maxThrows) return;
    
    playSound('click');
    
    const points = num * activeMultiplier;
    throws.push({
        base: num,
        multiplier: activeMultiplier,
        points: points
    });
    currentScore -= points;
    totalDarts++;
    saveState();
    
    if (currentThrowIndex < maxThrows - 1) {
        currentThrowIndex++;
    }
    updateDisplay();
    updateThrowIndicators();
    
    if (activeMultiplier !== 1) {
        toggleMultiplier(activeMultiplier);
    }
    
    // Pokud jsou všechny tři hody dokončeny
    if (throws.length >= maxThrows) {
        if (bot) {
            console.log('Hráč dokončil tah (kliknutí na čísla), přichází bot');
            setTimeout(() => {
                throws = [];
                currentRound++;
                currentThrowIndex = 0;
                saveState();
                updateDisplay();
                updateThrowIndicators();
                
                // Spustíme tah bota
                isPlayerTurn = false;
                playBotTurn();
            }, 1000);
        } else {
            setTimeout(() => {
                throws = [];
                currentRound++;
                currentThrowIndex = 0;
                saveState();
                updateDisplay();
                updateThrowIndicators();
            }, 2000);
        }
    }
}

function showErrorBanner(message) {
    playSound('error');
    const banner = document.getElementById('errorBanner');
    if (message.includes('Bot vyhrál')) {
        // Pokud bot vyhrál, zobrazíme jeho jméno
        message = `${bot.name} vyhrál leg!`;
    }
    banner.textContent = message;
    banner.style.display = 'block';
    setTimeout(() => {
        banner.style.display = 'none';
    }, 3000);
}

function checkWinCondition() {
    if (currentScore === 0 && !winBannerDisplayed) {
        playSound('success');
        legsWon++;
        
        // Aktualizace zobrazení
        currentLeg++;
        
        // Kontrola výhry setu
        if (legsWon >= totalLegs) {
            setsWon++;
            legsWon = 0;
            currentLeg = 1; // Reset legů pro nový set
            
            // Kontrola výhry celé hry
            if (setsWon >= totalSets) {
               // showWinBanner();
                return; // Ukončíme funkci, protože hra skončila
            } else {
                // Začít nový set
                currentSet++;
            }
        }
        
        // Začít nový leg (ať už v rámci stejného setu nebo nového)
        startNewLeg();
    }
}

function startNewLeg() {
    currentScore = 501;
    throws = [];
    history = [{score: 501, throws: []}];
    currentRound = 1;
    currentThrowIndex = 0;
    totalDarts = 0; // Reset počtu šipek pro nový leg
    if (bot) bot.resetScore(); // Reset skóre bota při novém legu
    updateDisplay();
}

// Upravená funkce pro přehrání zvuku Russ Bray
function playRussBray() {
    if (!soundEnabled) return; // Kontrola, zda jsou zvuky povolené
    
    const russAudio = new Audio('./audio/russbray.mp3');
    russAudio.play().catch(e => console.log('Zvuk nelze přehrát:', e));
}

// Přidat na konec scriptu
function checkScore() {
    if (document.getElementById("currentScore").innerHTML === "0" && !winBannerDisplayed) {
        winBannerDisplayed = true; // Nastavíme na true před vytvořením banneru
        playSound('success');
        
        // Vytvoření banneru
        winBanner = document.createElement('div');
        winBanner.style.position = 'fixed';
        winBanner.style.top = '0';
        winBanner.style.left = '0';
        winBanner.style.width = '100%';
        winBanner.style.height = '100%';
        winBanner.style.backgroundColor = 'rgba(0, 128, 0, 0.8)';
        winBanner.style.color = 'white';
        winBanner.style.fontSize = '48px';
        winBanner.style.display = 'flex';
        winBanner.style.flexDirection = 'column';
        winBanner.style.alignItems = 'center';
        winBanner.style.justifyContent = 'center';
        winBanner.style.zIndex = '1000';
        
        // Přidání textu
        const titleText = document.createElement('div');
        titleText.textContent = 'Vyhráli jste!';
        winBanner.appendChild(titleText);
        
        // Přidání statistik
        const averages = calculateAverages();
        const statsText = document.createElement('div');
        statsText.style.fontSize = '24px';
        statsText.style.marginTop = '20px';
        statsText.textContent = `Průměr na 3 šipky: ${averages.avgPerThree}`;
        winBanner.appendChild(statsText);
        
        // Přidání tlačítka pro restart
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Znovu hrát';
        resetButton.style.marginTop = '20px';
        resetButton.style.padding = '10px 20px';
        resetButton.style.fontSize = '20px';
        resetButton.style.cursor = 'pointer';
        resetButton.onclick = () => resetGame(); // Přímé volání resetGame
        winBanner.appendChild(resetButton);
        
        // Přidání banneru do dokumentu
        document.body.appendChild(winBanner);
    }
}

// Vytvoření observeru pro sledování změn skóre
const scoreObserver = new MutationObserver(checkScore);
const scoreElement = document.getElementById("currentScore");

// Konfigurace observeru
const config = { childList: true, characterData: true, subtree: true };

// Spuštění observeru
scoreObserver.observe(scoreElement, config);

// Přidejte novou funkci pro zpracování fronty
function processNumberQueue() {
    if (numberQueue.length === 0 || processingQueue) return;
    
    processingQueue = true;
    console.log('Začátek zpracování fronty:', numberQueue);
    
    const processNext = () => {
        if (numberQueue.length === 0) {
            processingQueue = false;
            console.log('Fronta zpracována');
            // Přidáme aktualizaci historie po dokončení všech tří hodů
            if (throws.length === 3) {
                const throwSum = throws.reduce((sum, t) => sum + t.points, 0);
                const historyData = document.querySelector('.history-data');
                const historyEntry = document.createElement('div');
                historyEntry.className = 'history-entry';
                historyEntry.textContent = `${throwSum} (${throws.map(t => t.points).join(',')})`;
                historyData.insertBefore(historyEntry, historyData.firstChild);
            }
            return;
        }
        
        const number = numberQueue.shift();
        console.log('Zpracování čísla z fronty:', number);
        if (voiceMode === 'perThrow') {
            addScore(number);
        }
        
        if (numberQueue.length > 0 && throws.length < 3) {
            console.log('Zbývající čísla ve frontě:', numberQueue);
            setTimeout(processNext, 500);
        } else {
            processingQueue = false;
            // Přidáme aktualizaci historie i zde pro případ, že fronta končí třetím hodem
            if (throws.length === 3) {
                const throwSum = throws.reduce((sum, t) => sum + t.points, 0);
                const historyData = document.querySelector('.history-data');
                const historyEntry = document.createElement('div');
                historyEntry.className = 'history-entry';
                historyEntry.textContent = `${throwSum} (${throws.map(t => t.points).join(',')})`;
                historyData.insertBefore(historyEntry, historyData.firstChild);
            }
        }
    };
    
    processNext();
}

const newGameModal = document.getElementById('newGameModal');
const startingScoreInput = document.getElementById('startingScore');

document.querySelector('.new-game-button').addEventListener('click', () => {
    newGameModal.style.display = 'block';
    overlay.classList.add('active');
    startingScoreInput.value = currentScore; // předvyplní aktuální hodnotu
});

function closeNewGameModal() {
    newGameModal.style.display = 'none';
    overlay.classList.remove('active');
}

function startNewGame() {
    const newScore = parseInt(startingScoreInput.value);
    const newLegs = parseInt(legsInput.value);
    const newSets = parseInt(setsInput.value);
    // Změna získání herního módu
    gameModeType = document.querySelector('.game-mode-option.active').dataset.mode;
    
    if (newScore && newScore > 0 && newLegs && newLegs > 0 && newSets && newSets > 0) {
        currentScore = newScore;
        totalLegs = newLegs;
        totalSets = newSets;
        throws = [];
        history = [{score: newScore, throws: []}];
        activeMultiplier = 1;
        currentRound = 1;
        totalDarts = 0;
        currentThrowIndex = 0;
        currentLeg = 1;
        currentSet = 1;
        legsWon = 0;
        setsWon = 0;
        isPlayerTurn = true;
        
        // Vymazání historie v UI
        const historyData = document.querySelector('.history-data');
        historyData.innerHTML = ''; // Přidáno - vymaže obsah historie
        
        // Inicializace bota pokud je vybrán herní mód s botem
        if (gameModeType === 'bot') {
            const selectedDifficulty = document.querySelector('.difficulty-btn.selected');
            const botLevel = selectedDifficulty ? selectedDifficulty.dataset.level : 'medium';
            bot = new DartsBot(botLevel);
            
            document.getElementById('botNameDisplay').textContent = bot.name;
        } else {
            bot = null;
            document.getElementById('botNameDisplay').textContent = 'Bot';
        }
        
        setVoiceMode('none');
        toggleMultiplier(1);
        clearCheckoutDisplay();
        updateDisplay();
        
        if (winBanner) {
            winBanner.remove();
            winBannerDisplayed = false;
        }
        
        closeNewGameModal();
    } else {
        showErrorBanner('Zadejte platné hodnoty pro skóre, legy a sety!');
    }
}

// Upravit existující overlay click handler:
overlay.addEventListener('click', () => {
    settingsSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('.settings-button').classList.remove('sidebar-active');
    closeNewGameModal();
    historyModal.style.display = 'none'; // Přidat toto
});

// Dark mode logika
let darkMode = localStorage.getItem('darkMode') === 'true';
const darkModeToggle = document.getElementById('darkModeToggle');

// Načtení stavu dark mode z localStorage
darkModeToggle.checked = darkMode;
if (darkMode) {
    document.body.classList.add('dark-mode');
}

// Event listener pro přepínač dark mode
darkModeToggle.addEventListener('change', (e) => {
    darkMode = e.target.checked;
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
});

// Automatický dark mode
let autoDarkMode = localStorage.getItem('autoDarkMode') === 'true';
let darkModeStartTime = localStorage.getItem('darkModeStart') || '20:00';
let darkModeEndTime = localStorage.getItem('darkModeEnd') || '07:00';

const autoDarkModeToggle = document.getElementById('autoDarkModeToggle');
const darkModeStartInput = document.getElementById('darkModeStart');
const darkModeEndInput = document.getElementById('darkModeEnd');
const autoDarkModeTimesDiv = document.querySelector('.auto-dark-mode-times');

// Načtení uložených hodnot
autoDarkModeToggle.checked = autoDarkMode;
darkModeStartInput.value = darkModeStartTime;
darkModeEndInput.value = darkModeEndTime;
autoDarkModeTimesDiv.style.display = autoDarkMode ? 'block' : 'none';

// Funkce pro kontrolu, zda má být aktivní tmavý režim
function shouldBeDarkMode() {
    if (!autoDarkMode) return darkMode;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [startHours, startMinutes] = darkModeStartTime.split(':').map(Number);
    const [endHours, endMinutes] = darkModeEndTime.split(':').map(Number);
    
    const startTotal = startHours * 60 + startMinutes;
    const endTotal = endHours * 60 + endMinutes;

    if (startTotal > endTotal) {
        // Interval přes půlnoc
        return currentTime >= startTotal || currentTime <= endTotal;
    } else {
        // Normální interval
        return currentTime >= startTotal && currentTime <= endTotal;
    }
}

// Funkce pro aktualizaci dark mode
function updateDarkMode() {
    if (autoDarkMode) {
        const shouldBeDark = shouldBeDarkMode();
        document.body.classList.toggle('dark-mode', shouldBeDark);
        darkModeToggle.checked = shouldBeDark;
        darkMode = shouldBeDark;
    }
}

// Event listenery pro nastavení
autoDarkModeToggle.addEventListener('change', (e) => {
    autoDarkMode = e.target.checked;
    localStorage.setItem('autoDarkMode', autoDarkMode);
    autoDarkModeTimesDiv.style.display = autoDarkMode ? 'block' : 'none';
    updateDarkMode();
});

darkModeStartInput.addEventListener('change', (e) => {
    darkModeStartTime = e.target.value;
    localStorage.setItem('darkModeStart', darkModeStartTime);
    updateDarkMode();
});

darkModeEndInput.addEventListener('change', (e) => {
    darkModeEndTime = e.target.value;
    localStorage.setItem('darkModeEnd', darkModeEndTime);
    updateDarkMode();
});

// Kontrola každou minutu
setInterval(updateDarkMode, 1000);
    
// Počáteční kontrola
updateDarkMode();

// Upravit existující dark mode toggle handler
darkModeToggle.addEventListener('change', (e) => {
    if (!autoDarkMode) {
        darkMode = e.target.checked;
        localStorage.setItem('darkMode', darkMode);
        document.body.classList.toggle('dark-mode', darkMode);
    }
});

function create180Animation() {
    const container = document.querySelector('.container');
    const numberOfElements = 40; // Zvýšeno na 40
    const containerRect = container.getBoundingClientRect();

    for (let i = 0; i < numberOfElements; i++) {
        const element = document.createElement('div');
        element.textContent = '180';
        element.style.position = 'absolute';
        element.style.fontSize = Math.random() * 40 + 20 + 'px';
        element.style.opacity = '0';
        element.style.color = '#4CAF50';
        element.style.fontWeight = 'bold';
        element.style.zIndex = '100';
        element.style.pointerEvents = 'none';

        // Náhodná pozice v rámci kontejneru
        const xPos = Math.random() * (containerRect.width - 50); // -50 pro zabránění přetečení
        const yPos = Math.random() * (containerRect.height - 50);
        
        element.style.left = xPos + 'px';
        element.style.top = yPos + 'px';

        container.appendChild(element);

        // Vylepšená animace s náhodnými parametry
        gsap.to(element, {
            duration: 2 + Math.random(), // Náhodná doba trvání 2-3s
            opacity: 1,
            y: -100 - Math.random() * 100, // Náhodná vzdálenost pohybu
            x: (Math.random() - 0.5) * 100, // Náhodný pohyb do stran
            rotation: (Math.random() - 0.5) * 45, // Náhodná rotace
            ease: "power1.out",
            delay: Math.random() * 0.5, // Náhodné zpoždění startu
            onComplete: () => {
                element.remove();
            }
        });
    }
}

// Přidat novou funkci pro kontrolu možnosti zavření na 9 šipek
function canCheckoutIn9Darts(score) {
    // Nezobrazovat devítku, dokud nejsou hozeny alespoň 3 šipky
    if (totalDarts < 3) return false;
    
    // Pokud je skóre 0 nebo neplatné, nelze zavřít
    if (score <= 0) return false;
    
    // Seznam skóre, které nelze zavřít na poslední 3 šipky
    const impossibleScores = [159, 162, 163, 165, 168, 169];
    
    // Pokud zbývají poslední 3 šipky a máme "nezavíratelné" skóre
    if (totalDarts === 6 && impossibleScores.includes(score)) {
        console.log("Toto skóre nelze zavřít na poslední 3 šipky");
        return false;
    }
    
    // Kontrola, zda všechny předchozí hody byly triple nebo double bull (50)
    const allPreviousThrowsValid = history.every(state => {
        if (!state.throws) return true; // Přeskočit počáteční stav
        return state.throws.every(t => {
            // Platné hody jsou triple (60, 57, 54, 51) nebo double bull (50)
            return t.points >= 50 && (t.points === 50 || t.multiplier === 3);
        });
    });
    
    // Pokud některý z předchozích hodů nebyl triple nebo bull, nelze zavřít na 9
    if (!allPreviousThrowsValid) {
        console.log("Některý z hodů nebyl triple nebo double bull - nelze zavřít na 9");
        return false;
    }
    
    // Výpočet zbývajících šipek do 9
    const remainingDarts = 9 - totalDarts;
    console.log(`Zbývá ${remainingDarts} šipek do devíti`);
    
    // Kontrola, zda je teoreticky možné zavřít s aktuálním skóre
    // Maximální možný zisk na šipku je 60 bodů (T20)
    const maxPossibleScore = remainingDarts * 60;
    if (score > maxPossibleScore) {
        console.log("Příliš vysoké skóre na zbývající počet šipek");
        return false;
    }
    
    // Pokud jsme došli až sem, stále je možné zavřít na 9 šipek
    console.log("Stále možné zavřít na 9 šipek");
    return true;
}

// Přidat event listener pro přepínání herního módu
// document.getElementById('gameMode').addEventListener('change', function(e) {
//     const botSettings = document.querySelector('.bot-settings');
//     botSettings.style.display = e.target.value === 'bot' ? 'block' : 'none';
// });

// Přidat novou funkci pro tah bota
function playBotTurn() {
    if (!bot || isPlayerTurn) return;
    
    const oldScore = bot.score;
    const botScore = bot.throwDarts();
    
    console.log('Bot hodil:', botScore);
    console.log('Bot skóre:', oldScore, '→', bot.score);
    
    // Animace odečítání bodů bota
    const botScoreElement = document.getElementById('botScoreDisplay');
    gsap.to(botScoreElement, {
        innerHTML: bot.score,
        duration: 1,
        snap: { innerHTML: 1 },
        ease: "power1.out"
    });
    
    // Zobrazit skóre bota s jeho jménem
    const botScoreDisplay = document.createElement('div');
    botScoreDisplay.className = 'bot-score-display';
    botScoreDisplay.innerHTML = `${bot.name} hodil: ${botScore}`;
    botScoreDisplay.style.position = 'fixed';
    botScoreDisplay.style.top = '50%';
    botScoreDisplay.style.left = '50%';
    botScoreDisplay.style.transform = 'translate(-50%, -50%)';
    botScoreDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    botScoreDisplay.style.color = 'white';
    botScoreDisplay.style.padding = '20px';
    botScoreDisplay.style.borderRadius = '10px';
    botScoreDisplay.style.zIndex = '1000';
    botScoreDisplay.style.textAlign = 'center';
    
    document.body.appendChild(botScoreDisplay);
    
    // Aktualizovat zobrazení
    updateDisplay();
    
    setTimeout(() => {
        botScoreDisplay.remove();
        // Změněná podmínka - bot zavřel, pokud hodil přesně tolik, kolik mu zbývalo
        if (botScore === oldScore) {
            // Bot vyhrál leg
            showErrorBanner('Bot vyhrál leg!');
            currentLeg++; // Zvýšíme číslo legu
            
            // Začít nový leg
            currentScore = 501;
            throws = [];
            history = [{score: 501, throws: []}];
            currentRound = 1;
            currentThrowIndex = 0;
            totalDarts = 0;
            bot.resetScore();
            updateDisplay();
        } else {
            isPlayerTurn = true;
        }
    }, 2000);
}

const historyButton = document.querySelector('.history-button');
const historyModal = document.querySelector('.history-modal');
const closeHistoryBtn = document.querySelector('.close-history-btn');

historyButton.addEventListener('click', () => {
    historyModal.style.display = 'block';
    overlay.classList.add('active');
});

closeHistoryBtn.addEventListener('click', () => {
    historyModal.style.display = 'none';
    overlay.classList.remove('active');
});

// Přidat novou funkci pro aktualizaci historie
function updateHistory() {
    const historyData = document.querySelector('.history-data');
    const throwSum = throws.reduce((sum, t) => sum + t.points, 0);
    const throwDetails = throws.map(t => t.points).join(',');
    
    // Přidáme logování
    console.log('Aktualizace historie:');
    console.log('Hody:', throws);
    console.log('Součet:', throwSum);
    console.log('Detaily hodů:', throwDetails);
    
    // Kontrola, zda začíná nový set
    if (currentSet > 1 && !document.querySelector(`.history-set-${currentSet}`)) {
        const setDivider = document.createElement('div');
        setDivider.className = `history-set-${currentSet} history-divider`;
        setDivider.innerHTML = `<strong>Set ${currentSet}</strong>`;
        historyData.insertBefore(setDivider, historyData.firstChild);
    }
    
    // Kontrola, zda začíná nový leg
    if ((currentLeg > 1 || currentSet > 1) && !document.querySelector(`.history-leg-${currentSet}-${currentLeg}`)) {
        const legDivider = document.createElement('div');
        legDivider.className = `history-leg-${currentSet}-${currentLeg} history-divider`;
        legDivider.innerHTML = `<em>Leg ${currentLeg}</em>`;
        historyData.insertBefore(legDivider, historyData.firstChild);
    }
    
    if (throws.length === 3) {  // Přidáme záznam pouze když máme všechny 3 hody
        const historyEntry = document.createElement('div');
        historyEntry.className = 'history-entry';
        historyEntry.textContent = `${throwSum} (${throwDetails})`;
        console.log('Přidávám záznam do historie:', historyEntry.textContent);
        historyData.insertBefore(historyEntry, historyData.firstChild);
    }
}