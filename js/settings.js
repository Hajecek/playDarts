// Globální proměnné
let soundEnabled = localStorage.getItem('soundEnabled') === 'true';
let newGameModal, startingScoreInput, overlay;

// Inicializace po načtení DOM
document.addEventListener('DOMContentLoaded', () => {
    // Získání referencí na elementy
    const settingsButton = document.querySelector('.settings-button');
    const settingsSidebar = document.querySelector('.settings-sidebar');
    overlay = document.querySelector('.overlay');  // Přiřazení do globální proměnné
    newGameModal = document.getElementById('newGameModal');
    startingScoreInput = document.getElementById('startingScore');
    const soundToggle = document.getElementById('soundToggle');

    // Načtení stavu zvuku z localStorage
    soundToggle.checked = soundEnabled;

    // Event listenery
    settingsButton.addEventListener('click', () => {
        settingsSidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    document.querySelector('.new-game-button').addEventListener('click', () => {
        newGameModal.style.display = 'block';
        overlay.classList.add('active');
        startingScoreInput.value = currentScore;
    });

    overlay.addEventListener('click', () => {
        settingsSidebar.classList.remove('active');
        overlay.classList.remove('active');
        closeNewGameModal();
    });

    soundToggle.addEventListener('change', (e) => {
        soundEnabled = e.target.checked;
        localStorage.setItem('soundEnabled', soundEnabled);
        
        if (soundEnabled) {
            playSound('click');
        }
    });
});

// Funkce pro zavření modálního okna nové hry
function closeNewGameModal() {
    if (newGameModal) {
        newGameModal.style.display = 'none';
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Funkce pro spuštění nové hry
function startNewGame() {
    const newScore = parseInt(startingScoreInput.value);
    if (newScore && newScore > 0) {
        currentScore = newScore;
        throws = [];
        history = [{score: newScore, throws: []}];
        activeMultiplier = 1;
        currentRound = 1;
        totalDarts = 0;
        currentThrowIndex = 0;
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
        showErrorBanner('Zadejte platné počáteční skóre!');
    }
}

// Funkce pro přehrání zvuku
function playSound(type) {
    if (!soundEnabled) return;
    
    const sounds = {
        click: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADQABERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERE//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAkDxQpnpAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGQwD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ=='),
        error: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADQABERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERE//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAkC7LgjHAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGQwD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ=='),
        success: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADQABERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERE//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAkCf5s/YAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGQwD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==')
    };
    
    if (sounds[type]) {
        sounds[type].play().catch(e => console.log('Zvuk nelze přehrát:', e));
    }
}

// Funkce pro přehrání zvuku Russ Bray
function playRussBray() {
    if (!soundEnabled) return;
    
    const russAudio = new Audio('./audio/russbray.mp3');
    russAudio.play().catch(e => console.log('Zvuk nelze přehrát:', e));
}
