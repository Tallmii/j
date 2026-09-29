const GAMES = {
  mario64: {
    name: "Mario 64",
    type: "3D Platformer",
    tag: "N64",
    description: "Explore Peach’s Castle, hunt for Stars, and revisit a classic 3D platforming adventure in your browser.",
    url: "https://ghostship.net64.dev/",
    art: "art-mario",
    icon: "★"
  },
  animal: {
    name: "Animal Crossing",
    type: "Life Simulation",
    tag: "COZY",
    description: "A laid-back island-style experience built around exploration, decorating, and taking things at your own pace.",
    url: "https://turtlekiosk.github.io/slider/",
    art: "art-animal",
    icon: "✿"
  },
  scramjet: {
    name: "Scramjet",
    type: "Web Experience",
    tag: "WEB",
    description: "A browser-based Scramjet experience launched directly inside the J game shelf.",
    url: "https://scramjet.mercurywork.shop/",
    art: "art-scramjet",
    icon: "↗"
  }
};

const SUBDOMAIN_MAP = {
  mario: "mario64",
  "mario-64": "mario64",
  animal: "animal",
  "animal-crossing": "animal",
  scramjet: "scramjet"
};

const orderedKeys = Object.keys(GAMES);

function getRequestedGame() {
  const params = new URLSearchParams(window.location.search);
  const queryGame = params.get("game");
  if (queryGame && GAMES[queryGame]) return queryGame;

  const firstLabel = window.location.hostname.split(".")[0].toLowerCase();
  return SUBDOMAIN_MAP[firstLabel] || "mario64";
}

function gamePath(key) {
  return "game.html?game=" + encodeURIComponent(key);
}

function cardMarkup(key, index) {
  const game = GAMES[key];
  return `
    <button class="game-card" data-game="${key}" type="button" aria-label="Play ${game.name}">
      <div class="cover ${game.art}">
        <div class="cover-grid"></div>
        <span class="cover-icon">${game.icon}</span>
        <span class="cover-tag">${game.tag}</span>
      </div>
      <div class="card-meta">
        <div>
          <span class="card-type">${game.type}</span>
          <h3>${game.name}</h3>
        </div>
        <span class="card-index">0${index + 1}</span>
      </div>
      <p>${game.description}</p>
      <span class="card-cta">Play <span>↗</span></span>
    </button>
  `;
}

function renderShelf(activeKey) {
  const grid = document.getElementById("gameGrid");
  grid.innerHTML = orderedKeys
    .map((key, index) => cardMarkup(key, index))
    .join("");

  grid.querySelectorAll(".game-card").forEach((card) => {
    const key = card.dataset.game;
    if (key === activeKey) card.classList.add("selected");
    card.addEventListener("click", () => selectGame(key));
  });
}

function selectGame(key, pushHistory = true) {
  const game = GAMES[key];
  if (!game) return;

  document.title = game.name + " — J";
  document.getElementById("featuredName").textContent = game.name;
  document.getElementById("featuredType").textContent = game.type.toUpperCase();
  document.getElementById("featuredDescription").textContent = game.description;
  document.getElementById("openSource").href = game.url;
  document.getElementById("fullGameLink").href = gamePath(key);

  const frame = document.getElementById("homeFrame");
  frame.title = game.name + " embedded game";
  frame.src = game.url;

  const hint = document.getElementById("frameHint");
  hint.querySelector(".hint-title").textContent = "Playing " + game.name;

  renderShelf(key);

  if (pushHistory) {
    const url = new URL(window.location.href);
    url.searchParams.set("game", key);
    window.history.pushState({ game: key }, "", url);
  }
}

document.getElementById("randomGame")?.addEventListener("click", () => {
  const current = getRequestedGame();
  const choices = orderedKeys.filter((key) => key !== current);
  selectGame(choices[Math.floor(Math.random() * choices.length)] || orderedKeys[0]);
  document.querySelector(".featured-wrap")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

window.addEventListener("popstate", () => {
  selectGame(getRequestedGame(), false);
});

const initialGame = getRequestedGame();
selectGame(initialGame, false);
