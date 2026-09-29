const GAMES = {
  mario64: {
    name: "Mario 64",
    type: "3D Platformer",
    description: "Explore Peach’s Castle, hunt for Stars, and revisit a classic 3D platforming adventure in your browser.",
    url: "https://ghostship.net64.dev/",
    accent: "coral",
    icon: "★"
  },
  animal: {
    name: "Animal Crossing",
    type: "Life Simulation",
    description: "A cozy island-style experience for exploring, decorating, and taking things at your own pace.",
    url: "https://turtlekiosk.github.io/slider/",
    accent: "mint",
    icon: "✿"
  },
  scramjet: {
    name: "Scramjet",
    type: "Web Experience",
    description: "A browser-based Scramjet experience, launched directly inside the game dock.",
    url: "https://scramjet.mercurywork.shop/",
    accent: "violet",
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

function getGameKey() {
  const params = new URLSearchParams(window.location.search);
  const queryGame = params.get("game");
  if (queryGame && GAMES[queryGame]) return queryGame;

  const firstLabel = window.location.hostname.split(".")[0].toLowerCase();
  if (SUBDOMAIN_MAP[firstLabel]) return SUBDOMAIN_MAP[firstLabel];

  return null;
}

function gamePath(key) {
  return "game.html?game=" + encodeURIComponent(key);
}

function renderHome() {
  const grid = document.getElementById("gameGrid");
  if (!grid) return;

  const cards = Object.entries(GAMES).map(([key, game]) => `
    <article class="game-card ${game.accent}">
      <div class="card-icon" aria-hidden="true">${game.icon}</div>
      <div class="card-topline">
        <span class="badge">${game.type}</span>
        <span class="card-number">0${Object.keys(GAMES).indexOf(key) + 1}</span>
      </div>
      <h2>${game.name}</h2>
      <p>${game.description}</p>
      <a class="play-link" href="${gamePath(key)}">
        <span>Play now</span>
        <span aria-hidden="true">→</span>
      </a>
    </article>
  `).join("");

  grid.innerHTML = cards;
}

function renderGame(key) {
  const game = GAMES[key];
  if (!game) {
    window.location.replace("./");
    return;
  }

  document.title = game.name + " — Game Dock";
  document.getElementById("gameName").textContent = game.name;
  document.getElementById("gameType").textContent = game.type;
  document.getElementById("externalLink").href = game.url;
  document.getElementById("gameFrame").title = game.name + " embedded game";
  document.getElementById("gameFrame").src = game.url;

  document.getElementById("backButton").addEventListener("click", (event) => {
    if (window.history.length > 1 && document.referrer) {
      event.preventDefault();
      window.history.back();
    }
  });
}

renderHome();

const gameKey = getGameKey();
if (document.getElementById("gameFrame")) {
  renderGame(gameKey);
} else if (gameKey && !window.location.pathname.endsWith("/game.html")) {
  window.location.replace(gamePath(gameKey));
}
