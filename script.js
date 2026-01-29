// script.js
const LS_STARTED = "petStarted";
const LS_DEAD = "petDead";
const SS_TAB = "petTab";

const app = document.getElementById("app");

function renderAlive() {
  document.body.className = "alive";
  app.innerHTML = `
    <div class="pet-wrap">
      <!-- Put your image at: /assets/pet.png -->
      <img class="pet" src="assets/pet.png" alt="pet" draggable="false" />
      <div class="pet-name">hi.</div>
    </div>
  `;
}

function renderDead() {
  document.body.className = "dead";
  app.innerHTML = `
    <div class="grave">
      <div class="stone">🪦</div>
      <div class="text">It's all your fault</div>
    </div>
  `;
}

(function boot() {
  const started = localStorage.getItem(LS_STARTED) === "true";
  const dead = localStorage.getItem(LS_DEAD) === "true";
  const tabAlive = sessionStorage.getItem(SS_TAB) === "1";

  // If it's already dead, it's dead forever.
  if (dead) {
    renderDead();
    return;
  }

  // If it was started before, but this tab has no session marker,
  // that means the original tab life ended (closed), so we kill it permanently.
  if (started && !tabAlive) {
    localStorage.setItem(LS_DEAD, "true");
    renderDead();
    return;
  }

  // Otherwise, pet is alive (first visit or same-tab reload)
  localStorage.setItem(LS_STARTED, "true");
  sessionStorage.setItem(SS_TAB, "1");
  renderAlive();
})();
