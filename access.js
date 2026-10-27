(function () {
  function startGame() {
    if (typeof window.GameMaker_Init !== "function") { setTimeout(startGame, 40); return; }
    if (window.__retroBowlStarted) return;
    window.__retroBowlStarted = true;
    window.GameMaker_Init();
  }
  async function isVerifiedOwner() {
    var key;
    try { key = JSON.parse(localStorage.getItem("recess-github-visitor-key") || "null"); } catch (_) { return false; }
    if (typeof key !== "string" || !key) return false;
    try {
      var response = await fetch("https://recess-arcade.niceloon33.chatgpt.site/api/visitors", {
        headers: { Authorization: "Bearer " + key }, credentials: "omit", cache: "no-store", signal: AbortSignal.timeout(8000)
      });
      if (!response.ok) return false;
      return (await response.json()).owner === true;
    } catch (_) { return false; }
  }
  isVerifiedOwner().then(function (owner) {
    if (!owner) { startGame(); return; }
    document.documentElement.classList.add("owner-mod-menu");
    var script = document.createElement("script");
    script.src = "mod-menu.js";
    script.onerror = startGame;
    document.body.appendChild(script);
  }, startGame);
})();
