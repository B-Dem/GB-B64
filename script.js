// Function to load games from JSON file
function loadGames() {
    fetch('games.json')
        .then(response => response.json())
        .then(data => {
            displayGames(data);
            document.getElementById('search-button').addEventListener('click', () => filterGames(data));
            document.getElementById('search-input').addEventListener('input', () => filterGames(data));
        })
        .catch(error => console.error('Error loading games:', error));
}

// Function to display games
function displayGames(games) {
    const gameList = document.getElementById('game-list');
    gameList.innerHTML = ''; // Clear previous list items
    games.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        
        const gameIcon = document.createElement('img');
        gameIcon.src = game.icone;
        gameIcon.alt = game.nom;

        const gameName = document.createElement('div');
        gameName.className = 'game-name';
        gameName.textContent = game.nom;

        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copier';
        copyButton.addEventListener('click', () => copyToClipboard(game.base64));

        gameItem.appendChild(gameIcon);
        gameItem.appendChild(gameName);
        gameItem.appendChild(copyButton);

        gameList.appendChild(gameItem);
    });
}

// Function to filter games based on search input
function filterGames(games) {
    const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
    const filteredGames = games.filter(game => game.nom.toLowerCase().includes(searchQuery));
    displayGames(filteredGames);
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Texte copié dans le presse-papiers!');
    }).catch(err => {
        console.error('Erreur lors de la copie du texte : ', err);
    });
}

// Load games when the page is loaded
window.addEventListener('DOMContentLoaded', loadGames);
