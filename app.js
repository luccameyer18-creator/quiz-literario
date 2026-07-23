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
  curto: "Leitura rápida",
  medio: "Leitura média",
  longo: "Leitura longa",
};
// Filtro de fôlego (como no app original): rótulo curto + faixa de páginas.
const FOLEGO = [
  { key: "curto", label: "Curto", range: "até 150 páginas" },
  { key: "medio", label: "Médio", range: "150–250 páginas" },
  { key: "longo", label: "Longo", range: "250+ páginas" },
];

// Todos os livros de um perfil, num fôlego. Se não houver nenhum naquele
// fôlego, devolve todos do perfil (nunca deixa a lista vazia).
function booksFor(profile, stamina) {
  const same = BOOKS.filter((b) => b.profile === profile);
  const picks = same.filter((b) => b.stamina === stamina);
  return shuffle(picks.length ? picks : same);
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
  show("screen-result");
  renderResult(result);
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

let currentResult = null; // guardado pra o filtro de fôlego re-renderizar

function renderResult(result) {
  currentResult = result;
  const p = PROFILES[result.winner];

  document.documentElement.style.setProperty("--accent", p.color);

  el("result-emoji").textContent = p.name.charAt(0);
  el("result-emoji").style.color = p.color;
  el("result-emoji").style.borderColor = p.color;
  el("result-name").textContent = p.name;
  el("result-name").style.color = p.color;
  el("result-line").textContent = p.resultLine;

  el("result-sobre").textContent = p.sobre;
  el("result-cinema").textContent = p.cinema;
  el("result-examples").textContent = p.exemplos;

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

  // Filtro de fôlego (começa na escolha do quiz)
  renderFolego(result.stamina);
  renderBooks(result.winner, result.stamina);
}

// Botões de fôlego (Curto / Médio / Longo). O escolhido no quiz já vem ativo.
function renderFolego(active) {
  const box = el("result-folego");
  box.innerHTML = "";
  FOLEGO.forEach((f) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "folego-btn" + (f.key === active ? " active" : "");
    btn.innerHTML =
      `<span class="folego-label">${f.label}</span>` +
      `<span class="folego-range">${f.range}</span>`;
    btn.addEventListener("click", () => {
      renderFolego(f.key);
      renderBooks(currentResult.winner, f.key);
    });
    box.appendChild(btn);
  });
}

// Fichas dos livros: título, páginas, autor • ano, categoria e sinopse
// (a sinopse abre/fecha ao toque, pra não deixar a ficha gigante no celular).
function renderBooks(profile, stamina) {
  const p = PROFILES[profile];
  const books = booksFor(profile, stamina);
  const booksBox = el("result-books");
  booksBox.innerHTML = "";
  books.forEach((b) => {
    const pages = b.pages ? `<span class="book-pages">${b.pages} páginas</span>` : "";
    const meta = b.author + (b.year ? ` • ${b.year}` : "");
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML =
      `<div class="book-spine" style="background:${p.color}"></div>` +
      `<div class="book-body">` +
        `<div class="book-head"><h4>${escapeHtml(b.title)}</h4>${pages}</div>` +
        `<span class="book-author muted">${escapeHtml(meta)}</span>` +
        `<span class="book-tag" style="color:${p.color};border-color:${p.color}">${STAMINA_LABEL[b.stamina]}</span>` +
        `<p class="book-syn clamp">${escapeHtml(b.synopsis)}</p>` +
        `<button type="button" class="book-more">ler mais</button>` +
      `</div>`;
    // botão abre/fecha a sinopse. Só aparece quando o texto é longo o bastante
    // pra ser cortado (senão vira botão inútil em sinopse curta).
    const syn = card.querySelector(".book-syn");
    const more = card.querySelector(".book-more");
    requestAnimationFrame(() => {
      const overflowing = syn.scrollHeight - syn.clientHeight > 4;
      if (!overflowing) {
        syn.classList.remove("clamp");
        more.style.display = "none";
      }
    });
    more.addEventListener("click", () => {
      const clamped = syn.classList.toggle("clamp");
      more.textContent = clamped ? "ler mais" : "ler menos";
    });
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
