// Global State
let allTitles = [];
let filteredTitles = [];
let currentPage = 1;
let itemsPerPage = 10;

let activeLetter = "ALL";
let activePlatform = "ALL";
let activeCountry = "ALL";
let activeLanguage = "ALL";
let searchQuery = "";

// ALL 13 Vector SVGs (Exact match for your requested list)
const PLATFORM_LOGOS = {
  // 1. YouTube
  "YouTube": `
    <svg viewBox="0 0 100 100" aria-label="YouTube">
      <path d="M96 30.5a12.5 12.5 0 0 0-8.8-8.8C79.4 19.5 50 19.5 50 19.5s-29.4 0-37.2 2.2A12.5 12.5 0 0 0 4 30.5 131 131 0 0 0 1.8 50c0 6.5.7 13.1 2.2 19.5a12.5 12.5 0 0 0 8.8 8.8c7.8 2.2 37.2 2.2 37.2 2.2s29.4 0 37.2-2.2a12.5 12.5 0 0 0 8.8-8.8 131 131 0 0 0 2.2-19.5c0-6.5-.7-13.1-2.2-19.5z" fill="#FF0000"/>
      <polygon points="40,38 66,50 40,62" fill="#FFFFFF"/>
    </svg>`,

  // 2. Theatrical / Digital Rental
  "Theatrical / Digital Rental": `
    <svg viewBox="0 0 100 100" aria-label="Theatrical / Digital Rental">
      <rect width="100" height="100" rx="20" fill="#1e293b"/>
      <path d="M20 30 h60 v44 H20 Z" fill="none" stroke="#f59e0b" stroke-width="6" rx="4"/>
      <path d="M20 38 h60 M34 30 l-6 8 M50 30 l-6 8 M66 30 l-6 8" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
      <polygon points="44,48 62,56 44,64" fill="#38bdf8"/>
    </svg>`,

  // 3. SonyLIV
  "SonyLIV": `
    <svg viewBox="0 0 100 100" aria-label="SonyLIV">
      <defs>
        <linearGradient id="sonyLivGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0272c4"/>
          <stop offset="50%" stop-color="#7a149b"/>
          <stop offset="100%" stop-color="#e94c16"/>
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="20" fill="url(#sonyLivGrad)"/>
      <text x="50" y="34" fill="#FFFFFF" font-size="14" font-family="Arial Black, sans-serif" font-weight="900" letter-spacing="2" text-anchor="middle">SONY</text>
      <rect x="22" y="46" width="10" height="34" rx="5" fill="#fbb022"/>
      <rect x="36" y="54" width="10" height="26" rx="5" fill="#fbb022"/>
      <circle cx="41" cy="45" r="5" fill="#fbb022"/>
      <path d="M50 54 L58 76 C 60 82, 68 80, 72 72 L82 46" fill="none" stroke="#fbb022" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

  // 4. Sun NXT
  "Sun NXT": `
    <svg viewBox="0 0 100 100" aria-label="Sun NXT">
      <rect width="100" height="100" rx="20" fill="#c11f36"/>
      <!-- Sun Rays -->
      <path d="M50 20 v-8 M50 88 v-8 M20 50 h-8 M88 50 h-8 M28 28 l-6-6 M78 78 l-6-6 M28 72 l-6 6 M78 22 l-6 6" stroke="#fbbf24" stroke-width="5" stroke-linecap="round"/>
      <!-- Rising Sun Arc -->
      <circle cx="50" cy="50" r="18" fill="#fbbf24"/>
      <text x="50" y="56" fill="#c11f36" font-size="12" font-family="'Arial Black', sans-serif" font-weight="900" text-anchor="middle">NXT</text>
    </svg>`,

  // 5. ZEE5
  "ZEE5": `
    <svg viewBox="0 0 100 100" aria-label="ZEE5">
      <circle cx="50" cy="50" r="44" fill="#0b0b0f" stroke="#e11d48" stroke-width="4"/>
      <path d="M14 50 A 36 36 0 0 1 76 22" fill="none" stroke="#f59e0b" stroke-width="6"/>
      <path d="M10 50 A 40 40 0 0 0 66 90" fill="none" stroke="#06b6d4" stroke-width="6"/>
      <text x="50" y="58" fill="#FFFFFF" font-size="20" font-family="Arial, sans-serif" font-weight="900" text-anchor="middle">ZEE5</text>
    </svg>`,

  // 6. JioCinema
  "JioCinema": `
    <svg viewBox="0 0 100 100" aria-label="JioCinema">
      <defs>
        <linearGradient id="jioCineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#990066"/>
          <stop offset="100%" stop-color="#e6005c"/>
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="20" fill="url(#jioCineGrad)"/>
      <circle cx="50" cy="50" r="32" fill="#ffffff"/>
      <polygon points="44,36 64,50 44,64" fill="#e6005c"/>
    </svg>`,

  // 7. Stage
  "Stage": `
    <svg viewBox="0 0 100 100" aria-label="Stage">
      <rect width="100" height="100" rx="20" fill="#0a0a0a"/>
      <!-- Spotlight Cone -->
      <polygon points="50,15 15,85 85,85" fill="#ef4444" opacity="0.85"/>
      <ellipse cx="50" cy="82" rx="28" ry="8" fill="#fca5a5"/>
      <text x="50" y="60" fill="#ffffff" font-size="14" font-family="'Arial Black', sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">STAGE</text>
    </svg>`,

  // 8. Lionsgate Play
  "Lionsgate Play": `
    <svg viewBox="0 0 100 100" aria-label="Lionsgate Play">
      <rect width="100" height="100" rx="20" fill="#000000"/>
      <text x="50" y="44" fill="#FFFFFF" font-size="14" font-family="Impact, sans-serif" letter-spacing="1" text-anchor="middle">LIONSGATE</text>
      <polygon points="42,56 64,68 42,80" fill="#f59e0b"/>
    </svg>`,

  // 9. Netflix
  "Netflix": `
    <svg viewBox="0 0 24 24" fill="#E50914" aria-label="Netflix">
      <path d="M5.398 0v24c1.173-.42 2.373-.807 3.6-.997V0H5.398zm9.604 0v23.003c1.227.19 2.427.577 3.6.997V0h-3.6zM9.002 0v5.334L15 22.846V17.51L9.002 0z"/>
    </svg>`,

  // 10. Disney+ Hotstar
  "Disney+ Hotstar": `
    <svg viewBox="0 0 100 100" aria-label="Disney+ Hotstar">
      <rect width="100" height="100" rx="20" fill="#0c5776"/>
      <path d="M12 28 C 45 8, 75 14, 92 38" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
      <text x="35" y="62" fill="#FFFFFF" font-size="28" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900">D</text>
      <path d="M68 45 v20 M58 55 h20" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
    </svg>`,

  // 11. Aha
  "Aha": `
    <svg viewBox="0 0 100 100" aria-label="Aha">
      <rect width="100" height="100" rx="20" fill="#FF5000"/>
      <path d="M50 18 L22 80 h15 l6-14 h14 l6 14 h15 Z M46 54 L50 42 L54 54 Z" fill="#FFFFFF"/>
    </svg>`,

  // 12. Amazon Prime Video
  "Amazon Prime Video": `
    <svg viewBox="0 0 100 100" aria-label="Amazon Prime Video">
      <rect width="100" height="100" rx="20" fill="#00A8E1"/>
      <path d="M28 32h14c9 0 14 4 14 11s-5 11-14 11h-7v14H28V32zm7 16h6c5 0 7-2 7-5s-2-5-7-5h-6v10z" fill="#FFFFFF"/>
      <path d="M58 46h7v22h-7V46zm0-14h7v7h-7v-7z" fill="#FFFFFF"/>
      <path d="M20 74c18 10 42 10 60 0 .5-.3 1 .3.7.8-17 12-45 12-61.4-.1-.4-.4 0-.9.7-.7z" fill="#FFFFFF"/>
    </svg>`,

  // 13. Chaupal
  "Chaupal": `
    <svg viewBox="0 0 100 100" aria-label="Chaupal">
      <rect width="100" height="100" rx="20" fill="#4a154b"/>
      <path d="M22 62 C 28 32, 72 32, 78 62" fill="none" stroke="#facc15" stroke-width="8" stroke-linecap="round"/>
      <text x="50" y="76" fill="#facc15" font-size="14" font-family="'Arial Black', sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">CHAUPAL</text>
    </svg>`
};

function renderPlatformBadge(platformName) {
  const logo = PLATFORM_LOGOS[platformName] || "";
  return `
    <span class="ott-badge">
      ${logo}
      <span>${escapeHtml(platformName || "Unknown")}</span>
    </span>
  `;
}

// Elements
const catalogList = document.getElementById("catalogList");
const paginationBar = document.getElementById("paginationBar");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const platformFilter = document.getElementById("platformFilter");
const countryFilter = document.getElementById("countryFilter");
const languageFilter = document.getElementById("languageFilter");
const pageSizeSelect = document.getElementById("pageSizeSelect");
const alphabetTrack = document.getElementById("alphabetTrack");
const resultsCount = document.getElementById("resultsCount");
const pageInfo = document.getElementById("pageInfo");
const menuToggle = document.getElementById("menuToggle");
const filterDrawer = document.getElementById("filterDrawer");

// 1. Boot Application
async function initApp() {
  buildAlphabetTrack();
  try {
    const res = await fetch("data.json");
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    allTitles = await res.json();

    allTitles.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: "base" }));

    populateDropdownFilters();
    applyFilterPipeline();
  } catch (err) {
    catalogList.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 30px; color:#ef4444;">Error reading data.json: ${err.message}</td></tr>`;
    pageInfo.textContent = "Data loading failed";
  }
}

// 2. Dropdown Filter Populator
function populateDropdownFilters() {
  const platforms = [...new Set(allTitles.map(i => i.platform).filter(Boolean))].sort();
  const countries = [...new Set(allTitles.map(i => i.available_in).filter(Boolean))].sort();
  const languages = [...new Set(allTitles.map(i => i.language).filter(Boolean))].sort();

  platforms.forEach(p => platformFilter.innerHTML += `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`);
  countries.forEach(c => countryFilter.innerHTML += `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`);
  languages.forEach(l => languageFilter.innerHTML += `<option value="${escapeHtml(l)}">${escapeHtml(l)}</option>`);
}

// 3. Alphabet Bar
function buildAlphabetTrack() {
  const letters = ["ALL", "#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  alphabetTrack.innerHTML = letters.map(letter => `
    <button class="letter-pill ${letter === 'ALL' ? 'active' : ''}" data-letter="${letter}">
      ${letter}
    </button>
  `).join("");

  alphabetTrack.addEventListener("click", (e) => {
    const target = e.target.closest(".letter-pill");
    if (!target) return;
    document.querySelectorAll(".letter-pill").forEach(p => p.classList.remove("active"));
    target.classList.add("active");
    activeLetter = target.dataset.letter;
    currentPage = 1;
    applyFilterPipeline();
  });
}

// 4. Filtering Logic
function applyFilterPipeline() {
  filteredTitles = allTitles.filter(item => {
    if (activePlatform !== "ALL" && item.platform !== activePlatform) return false;
    if (activeCountry !== "ALL" && item.available_in !== activeCountry) return false;
    if (activeLanguage !== "ALL" && item.language !== activeLanguage) return false;

    if (searchQuery) {
      const matchTitle = item.title?.toLowerCase().includes(searchQuery);
      const matchYear = String(item.year || "").includes(searchQuery);
      const matchPlatform = item.platform?.toLowerCase().includes(searchQuery);
      const matchCountry = item.available_in?.toLowerCase().includes(searchQuery);
      const matchLanguage = item.language?.toLowerCase().includes(searchQuery);
      if (!matchTitle && !matchYear && !matchPlatform && !matchCountry && !matchLanguage) return false;
    }

    if (activeLetter === "ALL") return true;
    if (activeLetter === "#") return /^[0-9]/.test(item.title);
    return item.title.toUpperCase().startsWith(activeLetter);
  });

  resultsCount.textContent = `${filteredTitles.length} Titles`;
  renderCurrentPage();
  renderPaginationControls();
}

// 5. Render Current Page
function renderCurrentPage() {
  const total = filteredTitles.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = filteredTitles.slice(startIndex, endIndex);

  pageInfo.textContent = total > 0
    ? `Showing ${startIndex + 1}–${Math.min(endIndex, total)} of ${total}`
    : "No records found";

  if (pageItems.length === 0) {
    catalogList.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 40px; color:#94a3b8;">No matching titles found.</td></tr>`;
    return;
  }

  catalogList.innerHTML = pageItems.map((item, idx) => `
    <tr>
      <td class="col-num" style="color:#64748b;">${startIndex + idx + 1}</td>
      <td class="col-title">${escapeHtml(item.title)}</td>
      <td class="col-year"><span class="sub-tag">${escapeHtml(item.year || "—")}</span></td>
      <td class="col-platform">${renderPlatformBadge(item.platform)}</td>
      <td class="col-type"><span class="sub-tag">${escapeHtml(item.type || "Movie")}</span></td>
      <td class="col-lang"><span class="sub-tag">${escapeHtml(item.language || "N/A")}</span></td>
      <td class="col-country"><span class="sub-tag">${escapeHtml(item.available_in || "Global")}</span></td>
      <td class="col-action">
        <a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer" class="btn-stream">
          Watch Now &rarr;
        </a>
      </td>
    </tr>
  `).join("");
}

// 6. Pagination System
function renderPaginationControls() {
  const totalPages = Math.ceil(filteredTitles.length / itemsPerPage);
  paginationBar.innerHTML = "";
  if (totalPages <= 1) return;

  const createBtn = (text, targetPage, disabled = false, active = false) => {
    const btn = document.createElement("button");
    btn.className = `page-btn ${active ? "active" : ""}`;
    btn.textContent = text;
    btn.disabled = disabled;
    btn.addEventListener("click", () => {
      currentPage = targetPage;
      renderCurrentPage();
      renderPaginationControls();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return btn;
  };

  paginationBar.appendChild(createBtn("‹ Prev", currentPage - 1, currentPage === 1));

  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);

  if (start > 1) {
    paginationBar.appendChild(createBtn("1", 1));
    if (start > 2) {
      const span = document.createElement("span");
      span.className = "page-dots";
      span.textContent = "...";
      paginationBar.appendChild(span);
    }
  }

  for (let i = start; i <= end; i++) {
    paginationBar.appendChild(createBtn(i, i, false, i === currentPage));
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      const span = document.createElement("span");
      span.className = "page-dots";
      span.textContent = "...";
      paginationBar.appendChild(span);
    }
    paginationBar.appendChild(createBtn(totalPages, totalPages));
  }

  paginationBar.appendChild(createBtn("Next ›", currentPage + 1, currentPage === totalPages));
}

function escapeHtml(str) {
  if (str === undefined || str === null) return "";
  return String(str).replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[m]);
}

// Event Listeners
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  clearSearch.style.display = searchQuery ? "block" : "none";
  currentPage = 1;
  applyFilterPipeline();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  clearSearch.style.display = "none";
  currentPage = 1;
  applyFilterPipeline();
});

platformFilter.addEventListener("change", (e) => {
  activePlatform = e.target.value;
  currentPage = 1;
  applyFilterPipeline();
});

countryFilter.addEventListener("change", (e) => {
  activeCountry = e.target.value;
  currentPage = 1;
  applyFilterPipeline();
});

languageFilter.addEventListener("change", (e) => {
  activeLanguage = e.target.value;
  currentPage = 1;
  applyFilterPipeline();
});

pageSizeSelect.addEventListener("change", (e) => {
  itemsPerPage = parseInt(e.target.value, 10);
  currentPage = 1;
  applyFilterPipeline();
});

menuToggle.addEventListener("click", () => {
  filterDrawer.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", initApp);