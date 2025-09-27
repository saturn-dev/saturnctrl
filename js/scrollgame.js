async function fetchImages() {
    return [
  "10-minutes-till-dawn.png",
  "2048.png",
].map(img => `https://cdn.jsdelivr.net/gh/saturn-dev/saturnctrl@main/images/game-images/normal/${img}`);
}



function createGameElement(imageSrc) {
    let game = document.createElement("div");
    game.classList.add("scrollgame");
    let img = document.createElement("img");
    img.classList.add("scrollimg");
    img.src = imageSrc;
    game.appendChild(img);
    return game;
}

async function startScrolling(columnId, speed, direction) {
    let images = await fetchImages();
    if (images.length === 0) {
        console.error("No images found in /images/game-images/normal/");
        return;
    }

    let column = document.getElementById(columnId);
    let columnHeight = column.clientHeight;
    let gameHeight = 280;
    let numGames = Math.ceil(columnHeight / gameHeight) + 2;
    let games = [];
    let usedImages = new Set();

    function getUniqueImage() {
        let availableImages = images.filter(img => !usedImages.has(img));
        if (availableImages.length === 0) {
            usedImages.clear();
            availableImages = images;
        }
        let selectedImage = availableImages[Math.floor(Math.random() * availableImages.length)];
        usedImages.add(selectedImage);
        return selectedImage;
    }

    for (let i = 0; i < numGames; i++) {
        let game = createGameElement(getUniqueImage());
        game.style.top = `${direction === "up" ? i * gameHeight : columnHeight - (i + 1) * gameHeight}px`;
        column.appendChild(game);
        games.push(game);
    }

    function scroll() {
        for (let game of games) {
            let currentTop = parseFloat(game.style.top) || 0;
            game.style.top = `${currentTop + (direction === "up" ? -speed : speed)}px`;
        }

        let firstGame = games[0];
        let lastGame = games[games.length - 1];

        if (direction === "up" && parseFloat(firstGame.style.top) + gameHeight < 0) {
            firstGame.style.top = `${parseFloat(lastGame.style.top) + gameHeight}px`;
            firstGame.querySelector(".scrollimg").src = getUniqueImage();
            games.push(games.shift());
        } 

        if (direction === "down" && parseFloat(lastGame.style.top) > columnHeight) {
            lastGame.style.top = `${parseFloat(firstGame.style.top) - gameHeight}px`;
            lastGame.querySelector(".scrollimg").src = getUniqueImage();
            games.unshift(games.pop());
        }

        requestAnimationFrame(scroll);
    }

    scroll();
}

startScrolling("leftColumn", 0.35, "up");
startScrolling("rightColumn", 0.35, "down");