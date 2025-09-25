document.addEventListener("DOMContentLoaded", function() {
    fetch('https://cdn.jsdelivr.net/gh/saturn-dev/saturnctrl@main/json/games.json')
        .then(response => response.json())
        .then(data => {
            let gamesData = data;
            let flashGamesData = data.flashGames;
            let gameContainer = document.getElementById("gameContainer");
            let searchInput = document.getElementById("searchInput");
            let gridModeToggle = document.getElementById("gridModeToggle");
            let randomGameBtn = document.getElementById("randomGameBtn");
            let toggleButton = document.getElementById("toggleFlashGames");

let iframeContainer = document.createElement("div");
iframeContainer.id = "iframeContainer";
iframeContainer.style.display = "none";
iframeContainer.style.position = "fixed";
iframeContainer.style.top = "0";
iframeContainer.style.left = "0";
iframeContainer.style.width = "100%";
iframeContainer.style.height = "100%";
iframeContainer.style.background = "rgba(0, 0, 0, 0.9)";
iframeContainer.style.justifyContent = "center";
iframeContainer.style.alignItems = "center";
iframeContainer.style.flexDirection = "column";
iframeContainer.style.zIndex = "9999";

const backButton = document.createElement("button");
backButton.textContent = "← Go Back";
backButton.style.marginBottom = "20px";
backButton.style.padding = "10px 20px";
backButton.style.fontSize = "18px";
backButton.style.cursor = "pointer";
backButton.style.backgroundColor = "#4ADE80";
backButton.style.color = "#fff";
backButton.style.border = "none";
backButton.style.borderRadius = "8px";

const iframe = document.createElement("iframe");
iframe.style.width = "90%";
iframe.style.height = "80%";
iframe.style.border = "none";
iframe.style.borderRadius = "12px";

iframeContainer.appendChild(backButton);
iframeContainer.appendChild(iframe);
document.body.appendChild(iframeContainer);

            
            let gridModeEnabled = localStorage.getItem("gridMode") === "true";

            if (gridModeEnabled) {
                gameContainer.classList.add("grid");
                gameContainer.classList.remove("default");
                gridModeToggle.classList.add("active");
            } else {
                gameContainer.classList.add("default");
                gameContainer.classList.remove("grid");
                gridModeToggle.classList.remove("active");
            }



            gridModeToggle.addEventListener("click", function() {
                gridModeEnabled = !gridModeEnabled;
                localStorage.setItem("gridMode", gridModeEnabled);

                if (gridModeEnabled) {
                    gridModeToggle.classList.add("active");
                    gameContainer.classList.add("grid");
                    gameContainer.classList.remove("default");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    showNotification('Enabled', 'Grid mode has been successfully enabled!', 5000, '#4ADE80');
                } else {
                    gridModeToggle.classList.remove ("active");
                    gameContainer.classList.add("default");
                    gameContainer.classList.remove("grid");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    showNotification('Disabled', 'Grid mode has been successfully disabled!', 5000, '#F87171');
                }

                displayGames(currentGames);
            });

            randomGameBtn.addEventListener("click", function () {
                const allGames = currentGames;
                if (allGames.length === 0) return;

                const randomIndex = Math.floor(Math.random() * allGames.length);
                const selectedGame = allGames[randomIndex];
                const gameSlug = selectedGame.name.toLowerCase().replace(/\s+/g, "-");

                showNotification('Launching...', `Taking you to ${selectedGame.name}`, 2000, '#4ADE80');

                setTimeout(() => {
                    window.location.href = `/play.html?game=${gameSlug}`;
                }, 3000);
            });

            let flashMode = false;
            let currentGames = gamesData.games;

            function displayGames(filteredGames) {
                gameContainer.innerHTML = "";

                if (filteredGames.length === 0) {
                    const msg = document.createElement("div");
                    msg.classList.add("not-found-message");
                    msg.innerHTML = `
                        <h2>We did not find what you were looking for</h2>
                        <p>You can try searching for something else, or play one of the games below:</p>
                    `;
                    gameContainer.appendChild(msg);

                    const randomCount = gridModeEnabled ? 20 : 10;
                    const randoms = [...currentGames]
                        .sort(() => 0.5 - Math.random())
                        .slice(0, randomCount);

                    randoms.forEach(game => {
                        let slug = game.name.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "");
                        const item = document.createElement("div");
                        item.classList.add("game-item");

                        const link = document.createElement("a");
                        link.href = `/play.html?game=${slug}`;

                        const img = document.createElement("img");
                        img.src = `https://cdn.jsdelivr.net/gh/saturn-dev/saturnctrl@main/images/game-images/${gridModeEnabled ? "normal" : "thumbnails"}/${slug}.png`;
                        
                        img.alt = game.name;
                        link.appendChild(img);

                        const title = document.createElement("div");
                        title.classList.add("game-title");
                        title.textContent = game.name;
                        link.appendChild(title);

                        if (game.special !== "None") {
                            const lbl = document.createElement("div");
                            lbl.className = `status-label small ${game.special.toLowerCase()}`;
                            lbl.textContent = game.special + "!"; 
                            link.appendChild(lbl);
                        }

                        const titleSm = document.createElement("div");
                        titleSm.classList.add("game-title-smaller");
                        titleSm.textContent = game.name;
                        link.appendChild(titleSm);

                        item.appendChild(link);
                        gameContainer.appendChild(item);
                    });

                    return;
                }

                filteredGames.forEach(game => {
                    let slug = game.name.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "");
                    const item = document.createElement("div");
                    item.classList.add("game-item");

                    const link = document.createElement("a");
link.addEventListener("click", function(e) {
    e.preventDefault();
    const gameSlug = game.name.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "");
    const gameURL = `/play.html?game=${gameSlug}`;
    
    gameContainer.style.display = "none";
    iframeContainer.style.display = "flex";
    iframe.src = gameURL;
});
backButton.addEventListener("click", function() {
    iframeContainer.style.display = "none";
    gameContainer.style.display = gridModeEnabled ? "grid" : "block";
    iframe.src = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
});

                    if (game.special !== "None") {
                        const lbl = document.createElement("div");
                        lbl.className = `status-label small ${game.special.toLowerCase()}`;
                        lbl.textContent = game.special + "!";
                        link.appendChild(lbl);
                    }

                    const img = document.createElement("img");
                    img.src = `https://cdn.jsdelivr.net/gh/saturn-dev/saturnctrl@main/images/game-images/${gridModeEnabled ? "normal" : "thumbnails"}/${slug}.png`;
                    img.alt = game.name;
                    link.appendChild(img);

                    const title = document.createElement("div");
                    title.classList.add("game-title");
                    title.textContent = game.name;
                    link.appendChild(title);

                    const titleSm = document.createElement("div");
                    titleSm.classList.add("game-title-smaller");
                    titleSm.textContent = game.name;
                    link.appendChild(titleSm);

                    item.appendChild(link);
                    gameContainer.appendChild(item);
                });
            }
            displayGames(currentGames);
            searchInput.addEventListener("input", function () {
                window.scrollTo({ top: 0, behavior: "smooth" });
                const term = this.value.toLowerCase();
                const results = currentGames.filter(g => g.name.toLowerCase().includes(term));
                displayGames(results);
            });
            toggleButton.addEventListener("click", () => {
                flashMode = !flashMode;
                searchInput.value = "";
                currentGames = flashMode ? flashGamesData : gamesData.games;
                displayGames(currentGames);
                toggleButton.textContent = flashMode ? "Show All Games" : "Show Flash Games";
            });
        })
        .catch(error => {
            console.error("Error loading games data:", error);
        });
});
