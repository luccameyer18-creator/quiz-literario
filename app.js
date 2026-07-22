/* =========================================================================
   Quiz de Perfil Literário. Lógica do app (JS puro, sem framework)
   ========================================================================= */

/* ------------------------------ Estado ---------------------------------- */
let quiz = null;        // { questions:[{...,options embaralhadas}], answers:[] }
let currentIndex = 0;

/* --------------------------- Utilidades --------------------------------- */

// Embaralhamento Fisher-Yates (cópia, não muta o original)
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function el(id) { return document.getElementById(id); }

function show(screenId) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  el(screenId).classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/* ------------------------- Início do quiz ------------------------------- */

function startQuiz() {
  // Cada pergunta ganha suas alternativas EMBARALHADAS, quebrando o padrão
  // "letra A = sempre Romântico". O perfil viaja junto de cada opção.
  quiz = {
    questions: QUESTIONS.map((q) => ({ ...q, options: shuffle(q.options) })),
    answers: new Array(QUESTIONS.length).fill(null),
  };
  currentIndex = 0;
  renderQuestion();
  show("screen-quiz");
}

/* --------------------------- Render pergunta ---------------------------- */

function renderQuestion() {
  const total = quiz.questions.length;
  const q = quiz.questions[currentIndex];

  el("progress-text").textContent = `Pergunta ${currentIndex + 1} de ${total}`;
  el("progress-bar-fill").style.width = `${((currentIndex + 1) / total) * 100}%`;

  el("question-text").textContent = q.q;

  const optionsBox = el("options");
  optionsBox.innerHTML = "";

  const letters = ["A", "B", "C", "D", "E"];
  q.options.forEach((opt, i) => {
    const selected = quiz.answers[currentIndex] === i;
    const btn = document.createElement("button");
    btn.className = "option" + (selected ? " selected" : "");
    btn.type = "button";
    btn.innerHTML =
      `<span class="option-letter">${letters[i]}</span>` +
      `<span class="option-text">${opt.text}</span>`;
    btn.addEventListener("click", () => selectOption(i));
    optionsBox.appendChild(btn);
  });

  // Botões de navegação
  el("btn-prev").disabled = currentIndex === 0;
  const answered = quiz.answers[currentIndex] !== null;
  const isLast = currentIndex === total - 1;
  el("btn-next").textContent = isLast ? "Ver meu perfil" : "Próxima";
  el("btn-next").disabled = !answered;
}

function selectOption(i) {
  quiz.answers[currentIndex] = i;
  // feedback visual
  const opts = document.querySelectorAll("#options .option");
  opts.forEach((o, idx) => o.classList.toggle("selected", idx === i));
  el("btn-next").disabled = false;

  const isLast = currentIndex === quiz.questions.length - 1;
  // Avanço automático suave (exceto na última, pra não pular o resultado)
  if (!isLast) {
    setTimeout(() => { if (quiz.answers[currentIndex] === i) nextQuestion(); }, 350);
  }
}

function nextQuestion() {
  if (quiz.answers[currentIndex] === null) return;
  if (currentIndex < quiz.questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    goToCheckout();
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
}

/* ----------------------------- Pontuação -------------------------------- */

function computeResult() {
  const counts = { ROMANTIC: 0, ADVENTURER: 0, OBSERVER: 0, SCIENTIST: 0, GOSSIPER: 0 };
  let stamina = "medio";
  let profileQuestions = 0;

  quiz.questions.forEach((q, qi) => {
    const ans = quiz.answers[qi];
    if (ans === null) return;
    const opt = q.options[ans];
    if (q.isStamina) {
      stamina = opt.stamina;
    } else {
      counts[opt.profile] += 1;
      profileQuestions += 1;
    }
  });

  // Vencedor: maior contagem. DESEMPATE ALEATÓRIO entre os empatados
  // (corrige o viés do app original, que dava a vitória sempre ao 1º da lista).
  const max = Math.max(...Object.values(counts));
  const leaders = Object.keys(counts).filter((k) => counts[k] === max);
  const winner = leaders[Math.floor(Math.random() * leaders.length)];

  // Percentuais
  const percentages = {};
  Object.keys(counts).forEach((k) => {
    percentages[k] = profileQuestions ? Math.round((counts[k] / profileQuestions) * 100) : 0;
  });

  return { winner, counts, percentages, stamina };
}

/* --------------------- Recomendação dos livros -------------------------- */

const STAMINA_LABEL = {
  curto: "Leitura curta",
  medio: "Leitura média",
  longo: "Leitura longa",
};
const STAMINA_ORDER = ["curto", "medio", "longo"];

function recommendBooks(profile, stamina, limit) {
  limit = limit || 4;
  const sameProfile = BOOKS.filter((b) => b.profile === profile);

  // 1) mesmo perfil + mesmo fôlego de leitura
  let picks = sameProfile.filter((b) => b.stamina === stamina);

  // 2) completa com o fôlego mais próximo (mesmo perfil)
  if (picks.length < limit) {
    const near = STAMINA_ORDER
      .slice()
      .sort((a, b) => Math.abs(STAMINA_ORDER.indexOf(a) - STAMINA_ORDER.indexOf(stamina))
                    - Math.abs(STAMINA_ORDER.indexOf(b) - STAMINA_ORDER.indexOf(stamina)));
    near.forEach((st) => {
      if (st === stamina) return;
      sameProfile.filter((b) => b.stamina === st).forEach((b) => {
        if (picks.length < limit && !picks.includes(b)) picks.push(b);
      });
    });
  }

  return shuffle(picks).slice(0, limit);
}

/* ---------------------------- Checkout ---------------------------------- */
/* "Login" leve no fim, só pra salvar no histórico deste dispositivo.
   (Sem senha e sem enviar nada pra fora, respeitando a privacidade do aluno.) */

let pendingResult = null;

function goToCheckout() {
  pendingResult = computeResult();
  el("checkout-name").value = "";
  show("screen-checkout");
  setTimeout(() => el("checkout-name").focus(), 100);
}

function finishCheckout(save) {
  const result = pendingResult;
  if (save) {
    const name = (el("checkout-name").value || "").trim();
    saveToHistory(name, result);
  }
  renderResult(result);
  show("screen-result");
}

/* ---------------------------- Histórico --------------------------------- */

const HISTORY_KEY = "quiz-literario-historico";

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
  catch { return []; }
}

function saveToHistory(name, result) {
  const list = loadHistory();
  list.unshift({
    name: name || "Sem nome",
    profile: result.winner,
    stamina: result.stamina,
    percentages: result.percentages,
    date: new Date().toISOString(),
  });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 50)));
}

function renderHistory() {
  const list = loadHistory();
  const box = el("history-list");
  box.innerHTML = "";
  if (list.length === 0) {
    box.innerHTML = `<p class="muted center">Nenhum resultado salvo neste dispositivo ainda.</p>`;
  } else {
    list.forEach((item) => {
      const p = PROFILES[item.profile];
      const d = new Date(item.date);
      const dateStr = d.toLocaleDateString("pt-BR") + " " +
        d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      const card = document.createElement("div");
      card.className = "history-item";
      card.style.borderLeftColor = p.color;
      card.innerHTML =
        `<span class="history-dot" style="background:${p.color}"></span>` +
        `<div class="history-info">` +
          `<strong>${escapeHtml(item.name)}</strong>` +
          `<span class="muted">${p.name} · ${STAMINA_LABEL[item.stamina]}</span>` +
        `</div>` +
        `<div class="history-date muted">${dateStr}</div>`;
      box.appendChild(card);
    });
  }
  show("screen-history");
}

function clearHistory() {
  if (confirm("Apagar todo o histórico salvo neste dispositivo?")) {
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
  }
}

/* ---------------------------- Resultado --------------------------------- */

function renderResult(result) {
  const p = PROFILES[result.winner];

  document.documentElement.style.setProperty("--accent", p.color);

  el("result-emoji").textContent = p.name.charAt(0);
  el("result-emoji").style.color = p.color;
  el("result-emoji").style.borderColor = p.color;
  el("result-name").textContent = p.name;
  el("result-name").style.color = p.color;
  el("result-tagline").textContent = p.tagline;
  el("result-description").textContent = p.description;
  el("result-vibe").textContent = p.vibe;

  el("result-cinema").innerHTML =
    `<strong>Se fosse cinema/série:</strong> ${p.cinema}<br>` +
    `<span class="muted">Tipo: ${p.examples}</span>`;

  // Barras de porcentagem (todos os perfis, ordenados)
  const bars = el("result-bars");
  bars.innerHTML = "";
  Object.keys(result.percentages)
    .sort((a, b) => result.percentages[b] - result.percentages[a])
    .forEach((k) => {
      const pr = PROFILES[k];
      const pct = result.percentages[k];
      const row = document.createElement("div");
      row.className = "bar-row";
      row.innerHTML =
        `<span class="bar-label">${pr.name}</span>` +
        `<span class="bar-track"><span class="bar-fill" style="width:${pct}%;background:${pr.color}"></span></span>` +
        `<span class="bar-pct">${pct}%</span>`;
      bars.appendChild(row);
    });

  // Livros indicados
  const books = recommendBooks(result.winner, result.stamina, 4);
  el("books-title").textContent =
    `Livros pra você começar (${STAMINA_LABEL[result.stamina].toLowerCase()})`;
  const booksBox = el("result-books");
  booksBox.innerHTML = "";
  books.forEach((b) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML =
      `<div class="book-spine" style="background:${p.color}"></div>` +
      `<div class="book-body">` +
        `<h4>${escapeHtml(b.title)}</h4>` +
        `<span class="book-author muted">${escapeHtml(b.author)}</span>` +
        `<p>${escapeHtml(b.blurb)}</p>` +
        `<span class="book-tag" style="color:${p.color};border-color:${p.color}">${STAMINA_LABEL[b.stamina]}</span>` +
      `</div>`;
    booksBox.appendChild(card);
  });
}

/* --------------------------- Utilidades UI ------------------------------ */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ----------------------------- Listeners -------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  el("btn-start").addEventListener("click", startQuiz);
  el("btn-history").addEventListener("click", renderHistory);
  el("btn-prev").addEventListener("click", prevQuestion);
  el("btn-next").addEventListener("click", nextQuestion);

  el("btn-save-result").addEventListener("click", () => finishCheckout(true));
  el("btn-skip-save").addEventListener("click", () => finishCheckout(false));

  el("btn-retry").addEventListener("click", startQuiz);
  el("btn-home").addEventListener("click", () => show("screen-home"));

  el("btn-history-back").addEventListener("click", () => show("screen-home"));
  el("btn-clear-history").addEventListener("click", clearHistory);

  show("screen-home");
});
