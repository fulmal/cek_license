/**
 * Informasi Detail Lisensi — Badan Intelijen Negara
 * Referensi: PRD-LSV-2026-001 (v2.0)
 */

const INFO = {
  issuer: "Cybersphere Solution — Hongkong",
  customer: "Badan Intelijen Negara",
  address: "Jl. Seno Raya Pejaten Timur, Pasar Minggu, Jakarta Selatan",
  start: "1 Mei 2026",
  end: "31 Desember 2029"
};

const SUB = "Image Submodul/";
const MOD = "Imge Modul/";
const TRACE = "TRACE _ Training for Counter Narrative Engagement";

const MODULES = [
  {
    id: "deep-processing",
    name: "Deep Processing Module",
    cert: "CERT-883A-9V21",
    shipTo: "80049210",
    image: `${MOD}${TRACE}.png`,
    subs: [
      ["Basic Information Processing Module", "X7A9B2K4M1", `${SUB}${TRACE}.png`],
      ["Massive Data Processing Module", "Q3P8N5Z6L0", `${SUB}${TRACE} (2).png`],
      ["Relationship Data Extraction Module", "C2F1Y9H4R7", `${SUB}${TRACE} (3).png`],
      ["Historical Case Report Processing Module", "T5D8J0E3W6", `${SUB}${TRACE} (4).png`]
    ]
  },
  {
    id: "data-fusion",
    name: "Data Fusion Module",
    cert: "CERT-K9P1-3R5V",
    shipTo: "94018275",
    image: `${MOD}${TRACE} (2).png`,
    subs: [
      ["Fusion Graph Module", "E1U7F4S2G8", `${SUB}Lisence(5).png`],
      ["Fusion Geospatial Module", "F9T2G8H1J4", `${SUB}Lisence(6).png`],
      ["Fusion Profile Module", "G3R5K7L9M6", `${SUB}Lisence(7).png`],
      ["Fusion Search Module", "H5P1M4N2B8", `${SUB}Lisence(8).png`]
    ]
  },
  {
    id: "threat-detection",
    name: "Threat Detection Module",
    cert: "CERT-D2W8-N4Z6",
    shipTo: "48291047",
    image: `${MOD}${TRACE} (3).png`,
    subs: [
      ["Rule Based Alerting Module", "J8Q6B3V7X9", `${SUB}Lisence(9).png`],
      ["Score Based Alerting Module", "K2M9C1X5Z4", `${SUB}Lisence(10).png`]
    ]
  },
  {
    id: "operation-workflow",
    name: "Operation Workflow Module",
    cert: "CERT-8Y1T-C5F9",
    shipTo: "73928105",
    image: `${MOD}${TRACE} (4).png`,
    subs: [
      ["SOP Knowledge Base Retrieval Module", "L7N4Z9A2S1", `${SUB}Lisence(11).png`],
      ["AI Assisted Case Analysis Module", "M1B6S8D3F5", `${SUB}Lisence(12).png`],
      ["AI Driven Investigation Module", "N9V2F5G7H3", `${SUB}Lisence(13).png`],
      ["AI Report Generation Assistance Module", "P4C8H1J6K9", `${SUB}Lisence(14).png`]
    ]
  },
  {
    id: "command-center",
    name: "Command Center Module",
    cert: "CERT-H6J2-L8A3",
    shipTo: "20584913",
    image: `${MOD}${TRACE} (5).png`,
    subs: [
      ["Strategic Overview Module", "Q6X1J9K2L7", `${SUB}Lisence(15).png`],
      ["Operational Deployment Module", "R3Z7L4M8N5", `${SUB}Lisence(16).png`],
      ["Live Tactical Module", "S5A9N2B6P1", `${SUB}Lisence(17).png`]
    ]
  },
  {
    id: "action-layer",
    name: "Action Layer Module",
    cert: "CERT-9E7G-X1M4",
    shipTo: "56103948",
    image: `${MOD}${TRACE} (6).png`,
    subs: [
      ["Personnel System Integration API", "T2S4P9C1Q8", `${SUB}Lisence(18).png`],
      ["Tools System Integration API", "U8D1Q5W3E6", `${SUB}Lisence(19).png`],
      ["CCTV VMS System Integration API", "V4F7E2R9T3", `${SUB}Lisence(20).png`]
    ]
  }
].map(m => ({
  ...m,
  subs: m.subs.map(([name, key, image]) => ({ name, key, image }))
}));

/* ---------- Helpers ---------- */

const $ = id => document.getElementById(id);

const esc = s =>
  String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const src = path => path.split("/").map(encodeURIComponent).join("/");

const findModule = id => MODULES.find(m => m.id === id);

function findSub(key) {
  for (const m of MODULES) {
    const s = m.subs.find(s => s.key === key);
    if (s) return { m, s };
  }
  return null;
}

const crumbs = items =>
  `<nav class="crumbs" aria-label="Breadcrumb">${items
    .map(([label, href]) => (href ? `<a href="${href}">${esc(label)}</a>` : `<span aria-current="page">${esc(label)}</span>`))
    .join("<span aria-hidden='true'>›</span>")}</nav>`;

const card = ({ href, image, title, meta, alt }) => `
  <a class="card" href="${href}">
    <div class="card-img"><img src="${src(image)}" alt="${esc(alt || title)}" loading="lazy" /></div>
    <div class="card-body">
      <div class="card-title">${esc(title)}</div>
      ${meta}
    </div>
  </a>`;

/* ---------- Views ---------- */

// Halaman utama: tab 6 modul (kiri) + pratinjau gambar modul (kanan)
function modulesView(active) {
  const tabs = MODULES.map((m, i) => `
    <a class="tab ${m.id === active.id ? "active" : ""}" href="#module/${m.id}" ${m.id === active.id ? 'aria-current="page"' : ""}>
      <span class="tab-num">${i + 1}</span>
      <span class="tab-text">
        <span class="tab-name">${esc(m.name)}</span>
        <span class="tab-meta">${m.subs.length} submodul</span>
      </span>
    </a>`).join("");

  return `
    <div class="split">
      <nav class="tabs" aria-label="Daftar modul">
        <div class="tabs-head">6 Modul</div>
        ${tabs}
      </nav>

      <section class="preview" aria-label="${esc(active.name)}">
        <div class="preview-head">
          <h1>${esc(active.name)}</h1>
          <span class="chip">${active.cert}</span>
        </div>

        <div class="cert">
          <div class="cert-top">
            <span class="cert-label">Diberikan kepada</span>
            <div class="cert-customer">${esc(INFO.customer)}</div>
            <div class="cert-module">${esc(active.name)}</div>
          </div>

          <div class="cert-body">
            <div class="cert-grid">
              <div class="cert-field"><span>Certificate ID</span><strong class="mono">${active.cert}</strong></div>
              <div class="cert-field"><span>Ship-To ID</span><strong class="mono">${active.shipTo}</strong></div>
              <div class="cert-field"><span>Mulai</span><strong>${INFO.start}</strong></div>
              <div class="cert-field"><span>Berlaku hingga</span><strong>${INFO.end}</strong></div>
              <div class="cert-field"><span>Pelanggan</span><strong>${esc(INFO.customer)}</strong></div>
              <div class="cert-field"><span>Alamat</span><strong>${esc(INFO.address)}</strong></div>
            </div>
          </div>

          <div class="cert-foot">Diterbitkan oleh ${esc(INFO.issuer)}</div>
        </div>

        <div class="sub-head">Submodul</div>
        <div class="sub-grid">
          ${active.subs.map(s => `
            <a class="sub-thumb" href="#sub/${s.key}" title="${esc(s.name)}">
              <img src="${src(s.image)}" alt="${esc(s.name)}" loading="lazy" />
              <span class="sub-thumb-name">${esc(s.name)}</span>
              <span class="chip">${s.key}</span>
            </a>`).join("")}
        </div>
      </section>
    </div>`;
}

function subView({ m, s }) {
  const i = m.subs.indexOf(s);
  const prev = m.subs[i - 1];
  const next = m.subs[i + 1];

  return `
    ${crumbs([["Modul", "#home"], [m.name, `#module/${m.id}`], [s.name]])}
    <div class="detail">
      <div class="viewer" onclick="openLightbox('${src(s.image)}', '${esc(s.name)}')">
        <img src="${src(s.image)}" alt="Sertifikat ${esc(s.name)}" />
        <div class="viewer-hint">Klik untuk memperbesar</div>
      </div>
      <aside class="side">
        <h1>${esc(s.name)}</h1>
        <div class="key-box">
          <small>LICENSE KEY</small>
          <div>${s.key}</div>
        </div>
        <div class="rows">
          <div class="row"><span>Modul</span><span>${esc(m.name)}</span></div>
          <div class="row"><span>Certificate ID</span><span>${m.cert}</span></div>
          <div class="row"><span>Berlaku</span><span>s.d. ${INFO.end}</span></div>
        </div>
        <div class="pager">
          <button type="button" ${prev ? `onclick="location.hash='#sub/${prev.key}'"` : "disabled"}>← Sebelumnya</button>
          <button type="button" ${next ? `onclick="location.hash='#sub/${next.key}'"` : "disabled"}>Berikutnya →</button>
        </div>
      </aside>
    </div>`;
}

function searchView(q) {
  const term = q.toLowerCase();
  const results = [];

  MODULES.forEach(m => {
    if ([m.name, m.cert].some(v => v.toLowerCase().includes(term))) {
      results.push(card({
        href: `#module/${m.id}`,
        image: m.image,
        title: m.name,
        meta: `<div class="card-meta">Modul · ${m.subs.length} submodul</div>`
      }));
    }
    m.subs.forEach(s => {
      if ([s.name, s.key, m.name, m.cert].some(v => v.toLowerCase().includes(term))) {
        results.push(card({ href: `#sub/${s.key}`, image: s.image, title: s.name, meta: `<span class="chip">${s.key}</span>` }));
      }
    });
  });

  return `
    <div class="page-head">
      <h1>Hasil pencarian</h1>
      <p>${results.length} hasil untuk “${esc(q)}”</p>
    </div>
    ${results.length
      ? `<div class="grid">${results.join("")}</div>`
      : `<div class="empty"><strong>Tidak ditemukan</strong>Coba kata kunci lain, misalnya “Fusion” atau “CERT”.</div>`}`;
}

function infoView() {
  const rows = [
    ["Penerbit", INFO.issuer],
    ["Pelanggan", INFO.customer],
    ["Alamat", INFO.address],
    ["Mulai", INFO.start],
    ["Berakhir", INFO.end],
    ["Jumlah modul", "6"],
    ["Jumlah submodul", "20"]
  ];
  return `
    <div class="page-head"><h1>Informasi Lisensi</h1></div>
    <div class="info-card rows">
      ${rows.map(([k, v]) => `<div class="row"><span>${k}</span><span>${esc(v)}</span></div>`).join("")}
    </div>`;
}

/* ---------- Router ---------- */

function render() {
  const [route, param = ""] = (location.hash.slice(1) || "home").split("/");
  const value = decodeURIComponent(param);
  let html;
  let title = "Informasi Lisensi — Badan Intelijen Negara";

  if (route === "module" && findModule(value)) {
    const m = findModule(value);
    html = modulesView(m);
    title = `${m.name} — Informasi Lisensi`;
  } else if (route === "sub" && findSub(value)) {
    const match = findSub(value);
    html = subView(match);
    title = `${match.s.name} — Informasi Lisensi`;
  } else if (route === "search" && value.trim()) {
    html = searchView(value.trim());
  } else if (route === "info") {
    html = infoView();
  } else {
    html = modulesView(MODULES[0]);
  }

  $("app").innerHTML = html;
  document.title = title;
  $("navHome").classList.toggle("active", ["home", "module", "sub"].includes(route) || !location.hash);
  $("navInfo").classList.toggle("active", route === "info");
  if (route !== "search") $("searchInput").value = "";
  else if (document.activeElement !== $("searchInput")) $("searchInput").value = value;
  window.scrollTo(0, 0);
}

/* ---------- Lightbox (zoom + geser) ---------- */

let zoomLevel = 100;

function openLightbox(image, title) {
  $("lightboxImg").src = image;
  $("lightboxImg").alt = title;
  $("lightboxTitle").textContent = title;
  zoomLevel = 100;
  applyZoom();
  $("lightbox").showModal();
}

function zoom(delta) {
  zoomLevel = Math.min(300, Math.max(100, zoomLevel + delta));
  applyZoom();
}

function applyZoom() {
  const img = $("lightboxImg");
  const zoomed = zoomLevel > 100;
  img.style.maxWidth = zoomed ? "none" : "100%";
  img.style.maxHeight = zoomed ? "none" : "100%";
  img.style.width = zoomed ? `${zoomLevel}%` : "";
  $("lightboxStage").classList.toggle("zoomed", zoomed);
  $("zoomLevel").textContent = `${zoomLevel}%`;
}

function enableDragPan(el) {
  let down = false, x = 0, y = 0, left = 0, top = 0;
  el.addEventListener("mousedown", e => {
    down = true; x = e.pageX; y = e.pageY; left = el.scrollLeft; top = el.scrollTop;
  });
  ["mouseup", "mouseleave"].forEach(ev => el.addEventListener(ev, () => (down = false)));
  el.addEventListener("mousemove", e => {
    if (!down) return;
    e.preventDefault();
    el.scrollLeft = left - (e.pageX - x);
    el.scrollTop = top - (e.pageY - y);
  });
}

/* ---------- Init ---------- */

document.addEventListener("DOMContentLoaded", () => {
  const input = $("searchInput");
  let timer;

  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const q = input.value.trim();
      const target = q ? `#search/${encodeURIComponent(q)}` : "#home";
      history.replaceState(null, "", target);
      render();
      input.focus();
    }, 150);
  });

  $("searchForm").addEventListener("submit", e => e.preventDefault());

  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
  });

  const lightbox = $("lightbox");
  lightbox.addEventListener("click", e => { if (e.target === lightbox) lightbox.close(); });
  enableDragPan($("lightboxStage"));

  window.addEventListener("hashchange", render);
  render();
});
