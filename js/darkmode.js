// Dark mode logika
let darkMode = localStorage.getItem('darkMode') === 'true';
let autoDarkMode = localStorage.getItem('autoDarkMode') === 'true';
let darkModeStartTime = localStorage.getItem('darkModeStart') || '20:00';
let darkModeEndTime = localStorage.getItem('darkModeEnd') || '07:00';

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

// Inicializace po načtení DOM
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const autoDarkModeToggle = document.getElementById('autoDarkModeToggle');
    const darkModeStartInput = document.getElementById('darkModeStart');
    const darkModeEndInput = document.getElementById('darkModeEnd');
    const autoDarkModeTimesDiv = document.querySelector('.auto-dark-mode-times');

    // Načtení uložených hodnot
    darkModeToggle.checked = darkMode;
    autoDarkModeToggle.checked = autoDarkMode;
    darkModeStartInput.value = darkModeStartTime;
    darkModeEndInput.value = darkModeEndTime;
    autoDarkModeTimesDiv.style.display = autoDarkMode ? 'block' : 'none';

    if (darkMode) {
        document.body.classList.add('dark-mode');
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

    darkModeToggle.addEventListener('change', (e) => {
        if (!autoDarkMode) {
            darkMode = e.target.checked;
            localStorage.setItem('darkMode', darkMode);
            document.body.classList.toggle('dark-mode', darkMode);
        }
    });

    // Kontrola každou minutu
    setInterval(updateDarkMode, 1000);
    
    // Počáteční kontrola
    updateDarkMode();
});
