"use strict";

(() => {
 const words = [
  "Wolke", "Morgen", "Schule", "Brief", "Schlüssel", "Laterne", "Kiesel", "Mütze",
  "Brücke", "Tasche", "Fahrrad", "Berg", "Wiese", "Fluss", "Regen", "Karte", "Blatt",
  "Straße", "Kakao", "Übung", "Tinte", "Lineal", "Bücher", "Flöte", "Vogel", "Schnee",
  "Fuchs", "Garten", "Küste", "Klasse", "Pause", "Schrift", "Fenster", "Rätsel", "Planet",
  "Kompass", "Ruhe", "Eule", "Insel", "Pinsel", "Wörter", "Wasser", "Musik", "Käfer"
 ];
 const duration = 45;
 const input = $("gameInput");
 const start = $("gameStart");
 const status = $("gameStatus");
 const timerLabel = $("gameTime");
 const currentParcel = $("gameWord").closest(".parcel");
 let best = Math.max(0, Number(store.g("tippoGameBest", 0)) || 0);
 let round = null;
 let timer;

 function fillQueue() {
  while (round.queue.length < 3) {
   const available = words.filter(word => !round.queue.includes(word) && word !== round.last);
   round.queue.push(available[Math.floor(Math.random() * available.length)]);
  }
  [ $("gameWord"), $("gameNext"), $("gameLater") ].forEach((label, i) => {
   label.textContent = round.queue[i];
  });
 }
 function updateScore() {
  $("gameScore").textContent = round?.score || 0;
  $("gameStreak").textContent = round?.streak || 0;
  $("gameBest").textContent = best;
 }
 function updateClock(remaining) {
  const seconds = Math.ceil(remaining);
  timerLabel.textContent = mmss(seconds);
  $("gameClock").value = seconds;
 }
 function finish(timeUp) {
  if (!round) return;
  clearInterval(timer);
  const { score, delivered } = round;
  const record = score > best;
  if (record) {
   best = score;
   store.s("tippoGameBest", best);
  }
  updateScore();
  round = null;
  if (timeUp && document.activeElement === input) start.focus({ preventScroll: true });
  input.value = "";
  input.disabled = true;
  input.setAttribute("aria-invalid", "false");
  start.textContent = "Noch eine Runde";
  status.textContent = (timeUp ? "Zeit abgelaufen. " : "Runde beendet. ") +
   delivered + (delivered === 1 ? " Paket" : " Pakete") + " · " + score +
   (score === 1 ? " Punkt." : " Punkte.") + (record ? " Neuer Rekord!" : "");
 }
 function tickGame() {
  if (!round) return;
  const left = Math.max(0, (round.until - performance.now()) / 1000);
  updateClock(left);
  if (left === 0) finish(true);
 }
 start.onclick = () => {
  if (round) { finish(false); return; }
  round = { until: performance.now() + duration * 1000, score: 0, delivered: 0, streak: 0, queue: [], last: "", error: false };
  updateScore();
  updateClock(duration);
  fillQueue();
  status.textContent = "Tippe die erste Aufschrift.";
  start.textContent = "Runde beenden";
  input.disabled = false;
  input.focus({ preventScroll: true });
  timer = setInterval(tickGame, 100);
 };
 function checkWord() {
  if (!round) return;
  tickGame();
  if (!round) return;
  const expected = round.queue[0].toLocaleLowerCase("de");
  const entered = input.value.normalize("NFC").toLocaleLowerCase("de");
  const error = !expected.startsWith(entered);
  input.setAttribute("aria-invalid", String(error));
  if (error) {
   if (!round.error) status.textContent = "Tippfehler. Korrigiere die Aufschrift.";
   round.error = true;
   round.streak = 0;
  } else if (entered === expected) {
   if (!round.error) round.streak++;
   const bonus = Math.min(3, 1 + Math.floor(round.streak / 3));
   round.score += bonus;
   round.delivered++;
   round.last = round.queue.shift();
   round.error = false;
   input.value = "";
   fillQueue();
   currentParcel.classList.add("sent");
   status.textContent = "Paket verschickt. +" + bonus + (bonus === 1 ? " Punkt." : " Punkte.");
  } else if (round.error) {
   status.textContent = "Aufschrift weiter tippen.";
  }
  updateScore();
 }
 input.addEventListener("input", event => { if (!event.isComposing) checkWord(); });
 input.addEventListener("compositionend", checkWord);
 currentParcel.addEventListener("animationend", () => currentParcel.classList.remove("sent"));
 for (const type of ["paste", "drop"]) input.addEventListener(type, event => event.preventDefault());
 window.addEventListener("tippo-page", event => { if (event.detail !== "game") finish(false); });
 updateScore();
})();
