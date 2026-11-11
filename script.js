// ---------- Theme (dark / light) ----------
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");

function setTheme(theme) {
  root.dataset.theme = theme;
  themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeBtn.addEventListener("click", () =>
  setTheme(root.dataset.theme === "dark" ? "light" : "dark")
);

// ---------- Mobile menu ----------
const navLinks = document.getElementById("navLinks");
document.getElementById("menuBtn").addEventListener("click", () =>
  navLinks.classList.toggle("open")
);
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ---------- Helpers ----------
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function thumb(p) {
  return p.image
    ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" />`
    : `<span class="thumb-emoji">${p.emoji || "📁"}</span>`;
}

function links(p) {
  let html = "";
  if (p.demo) html += `<a class="btn btn-primary btn-sm" href="${esc(p.demo)}" target="_blank" rel="noopener">Live demo ↗</a>`;
  if (p.code) html += `<a class="btn btn-ghost btn-sm" href="${esc(p.code)}" target="_blank" rel="noopener">Code ↗</a>`;
  return html;
}

// ---------- Skills ----------
document.getElementById("skillsList").innerHTML = SKILLS.map(
  (s) => `<span class="skill">${esc(s)}</span>`
).join("");

// ---------- Projects + filters ----------
const grid = document.getElementById("projectGrid");
const filtersEl = document.getElementById("filters");
const allTags = [...new Set(PROJECTS.flatMap((p) => p.tags))].sort();
let active = "All";

function renderFilters() {
  filtersEl.innerHTML = ["All", ...allTags]
    .map((t) => `<button class="chip ${t === active ? "active" : ""}" data-tag="${esc(t)}">${esc(t)}</button>`)
    .join("");
}

function renderProjects() {
  const list = PROJECTS.filter((p) => active === "All" || p.tags.includes(active));
  grid.innerHTML = list
    .map(
      (p) => `
      <article class="card ${p.featured ? "featured" : ""}" tabindex="0" data-index="${PROJECTS.indexOf(p)}">
        <div class="thumb">${thumb(p)}${p.featured ? '<span class="badge">Featured</span>' : ""}</div>
        <div class="card-body">
          <h3>${esc(p.title)}</h3>
          <p class="muted mono small">${esc(p.date || "")}</p>
          <p>${esc(p.description)}</p>
          <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          <div class="card-links">${links(p)}</div>
        </div>
      </article>`
    )
    .join("");
  document.getElementById("emptyMsg").hidden = list.length > 0;
}

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-tag]");
  if (!btn) return;
  active = btn.dataset.tag;
  renderFilters();
  renderProjects();
});

// ---------- Modal ----------
const modal = document.getElementById("modal");
function openModal(p) {
  document.getElementById("modalThumb").innerHTML = thumb(p);
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDate").textContent = p.date || "";
  document.getElementById("modalDesc").textContent = p.description;
  document.getElementById("modalTags").innerHTML = p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  document.getElementById("modalLinks").innerHTML = links(p);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}
grid.addEventListener("click", (e) => {
  if (e.target.closest("a")) return; // let links work normally
  const card = e.target.closest(".card");
  if (card) openModal(PROJECTS[card.dataset.index]);
});
grid.addEventListener("keydown", (e) => {
  const card = e.target.closest(".card");
  if (card && e.key === "Enter") openModal(PROJECTS[card.dataset.index]);
});
modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

// ---------- Stats (count up) ----------
function countUp(el, target) {
  let n = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const t = setInterval(() => {
    n = Math.min(target, n + step);
    el.textContent = n;
    if (n >= target) clearInterval(t);
  }, 40);
}
countUp(document.getElementById("statProjects"), PROJECTS.length);
countUp(document.getElementById("statTech"), new Set([...allTags, ...SKILLS]).size);

// ---------- Scroll reveal ----------
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => en.isIntersecting && en.target.classList.add("visible")),
  { threshold: 0.12 }
);
function observe() { document.querySelectorAll(".section, .card").forEach((el) => io.observe(el)); }

document.getElementById("year").textContent = new Date().getFullYear();
renderFilters();
renderProjects();
observe();
