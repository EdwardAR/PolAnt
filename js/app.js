const docRegistry = {};
let currentDocId = null;

const formEngine = new FormEngine();
const templateEngine = new TemplateEngine();
const docForm = document.getElementById('doc-form');
const formView = document.getElementById('form-view');
const previewView = document.getElementById('preview-view');
const welcome = document.getElementById('welcome');
const formTitle = document.getElementById('form-title');
const previewContent = document.getElementById('preview-content');
const docList = document.getElementById('doc-list');
const promptList = document.getElementById('prompt-list');
const promptsView = document.getElementById('prompts-view');
const promptsCategories = document.getElementById('prompts-categories');
const promptsDetail = document.getElementById('prompts-detail');
const promptContent = document.getElementById('prompt-content');
const drawingView = document.getElementById('drawing-view');

function registerDocument(doc) {
  docRegistry[doc.id] = doc;
}

registerDocument(parteAccidente);
registerDocument(actaInfraccion);

function renderSidebar() {
  docList.innerHTML = '';
  const ids = Object.keys(docRegistry);
  ids.sort((a, b) => docRegistry[a].title.localeCompare(docRegistry[b].title));
  for (const id of ids) {
    const doc = docRegistry[id];
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'doc-btn';
    btn.textContent = doc.title;
    btn.dataset.docId = id;
    btn.addEventListener('click', () => selectDocument(id));
    li.appendChild(btn);
    docList.appendChild(li);
  }
}

function selectDocument(id) {
  const doc = docRegistry[id];
  if (!doc) return;
  currentDocId = id;
  welcome.classList.add('hidden');
  formView.classList.remove('hidden');
  previewView.classList.add('hidden');
  promptsView.classList.add('hidden');
  drawingView.classList.add('hidden');
  formTitle.textContent = doc.title;
  formEngine.clearForm(docForm);
  docForm.innerHTML = '';
  docForm.appendChild(formEngine.renderForm(doc.sections));
  document.querySelectorAll('.doc-btn').forEach(b => b.classList.remove('active'));
  const btn = docList.querySelector(`[data-doc-id="${id}"]`);
  if (btn) btn.classList.add('active');
  initFormProgress(doc.sections.length);
  const firstInput = docForm.querySelector('input, select, textarea');
  if (firstInput) setTimeout(() => firstInput.focus(), 100);
  setBottomNavActive('docs');
}

function generateDocument() {
  if (!currentDocId) return;
  const doc = docRegistry[currentDocId];
  if (!doc) return;
  if (!formEngine.validateForm(docForm)) return;
  const data = formEngine.getFormValues(docForm);
  let html;
  if (typeof doc.generate === 'function') {
    html = doc.generate(data);
  } else {
    html = templateEngine.render(doc.template, data);
  }
  previewContent.innerHTML = html;
  formView.classList.add('hidden');
  previewView.classList.remove('hidden');
}

function goBack() {
  previewView.classList.add('hidden');
  formView.classList.remove('hidden');
}

function printDocument() {
  window.print();
}

function downloadWord() {
  const content = previewContent.innerHTML;
  const title = currentDocId ? docRegistry[currentDocId].title : 'documento';
  const styles = document.querySelector('#preview-content style')?.innerHTML || '';

  const fullDoc = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  body { font-family: "Segoe UI", Arial, sans-serif; font-size: 12pt; line-height: 1.6; margin: 2cm auto; max-width: 210mm; padding: 0 20px; }
  table { border-collapse: collapse; width: 100%; }
  td, th { padding: 4px 8px; }
  ${styles}
</style>
</head>
<body>${content}</body></html>`;

  const blob = new Blob([fullDoc], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/\s+/g, '_')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Form Progress ────────────────────────────────────────────

function initFormProgress(total) {
  const el = document.getElementById('form-progress');
  if (!el) return;
  el.classList.remove('hidden');
  el.querySelector('.progress-total').textContent = total;
  el.querySelector('.progress-current').textContent = '1';
  el.querySelector('.progress-fill').style.width = (1 / total * 100) + '%';
  const main = document.getElementById('main-content');
  if (!main) return;
  const handler = () => {
    const cards = docForm.querySelectorAll('.form-section-card');
    let active = 1;
    const scrollTop = main.scrollTop;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].offsetTop < scrollTop + 100) active = i + 1;
    }
    el.querySelector('.progress-current').textContent = Math.min(active, total);
    el.querySelector('.progress-fill').style.width = (Math.min(active, total) / total * 100) + '%';
  };
  main.addEventListener('scroll', handler);
}

// ─── Toast ────────────────────────────────────────────────────

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2500);
}

// ─── Keyboard Shortcuts ───────────────────────────────────────

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    if (!formView.classList.contains('hidden') && welcome.classList.contains('hidden')) {
      e.preventDefault();
      generateDocument();
    }
  }
  if (e.key === 'Escape') {
    if (!previewView.classList.contains('hidden')) {
      goBack();
    }
  }
});

document.getElementById('btn-generate').addEventListener('click', generateDocument);
document.getElementById('btn-clear').addEventListener('click', () => {
  if (currentDocId) {
    formEngine.clearForm(docForm);
    document.querySelectorAll('.doc-btn').forEach(b => b.classList.remove('active'));
  }
});
document.getElementById('btn-back').addEventListener('click', goBack);
document.getElementById('btn-word').addEventListener('click', downloadWord);
document.getElementById('btn-print').addEventListener('click', printDocument);

// ─── Prompts ──────────────────────────────────────────────────

function renderPromptSidebar() {
  promptList.innerHTML = '';
  const catIconMap = {
    'Redacción Jurídica': 'pen',
    'Consulta Normativa': 'book',
    'Procedimiento': 'checkSquare',
    'Revisión y Corrección': 'search'
  };
  const categories = [...new Set(prompts.map(p => p.category))];
  for (const cat of categories) {
    const header = document.createElement('li');
    const headerBtn = document.createElement('button');
    headerBtn.className = 'prompt-btn prompt-cat-header';
    const iconId = catIconMap[cat];
    if (iconId && icons[iconId]) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'prompt-cat-icon';
      iconSpan.innerHTML = icons[iconId];
      headerBtn.appendChild(iconSpan);
    }
    const textSpan = document.createElement('span');
    textSpan.textContent = cat;
    headerBtn.appendChild(textSpan);
    headerBtn.dataset.category = cat;
    headerBtn.addEventListener('click', () => showPromptsCategory(cat));
    header.appendChild(headerBtn);
    promptList.appendChild(header);
  }
}

let lastPromptCategory = null;

function showPromptsCategory(category) {
  lastPromptCategory = category;
  const noResults = document.getElementById('prompt-no-results');
  if (noResults) noResults.classList.add('hidden');
  welcome.classList.add('hidden');
  formView.classList.add('hidden');
  previewView.classList.add('hidden');
  promptsView.classList.remove('hidden');
  drawingView.classList.add('hidden');
  promptsDetail.classList.add('hidden');
  setBottomNavActive('prompts');
  promptsCategories.classList.remove('hidden');
  document.querySelectorAll('.doc-btn, .prompt-btn').forEach(b => b.classList.remove('active'));
  if (category) {
    const catBtn = promptList.querySelector(`[data-category="${category}"]`);
    if (catBtn) catBtn.classList.add('active');
  }

  promptsCategories.innerHTML = '';
  const cats = category ? [category] : [...new Set(prompts.map(p => p.category))];
  for (const cat of cats) {
    const section = document.createElement('div');
    section.className = 'prompt-category';

    const title = document.createElement('h3');
    title.className = 'prompt-category-title';
    const catIconMap = {'Redacción Jurídica':'pen','Consulta Normativa':'book','Procedimiento':'checkSquare','Revisión y Corrección':'search'};
    const iconId = catIconMap[cat];
    if (iconId && icons[iconId]) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'section-icon';
      iconSpan.innerHTML = icons[iconId];
      title.appendChild(iconSpan);
    }
    const catTextSpan = document.createElement('span');
    catTextSpan.textContent = cat;
    title.appendChild(catTextSpan);
    section.appendChild(title);

    const cards = document.createElement('div');
    cards.className = 'prompt-cards';

    const catPrompts = prompts.filter(p => p.category === cat);
    for (const p of catPrompts) {
      const card = document.createElement('div');
      card.className = 'prompt-card';
      card.dataset.promptId = p.id;

      const badge = document.createElement('div');
      badge.className = 'prompt-card-badge';
      badge.textContent = p.category;
      card.appendChild(badge);

      const cardTitle = document.createElement('div');
      cardTitle.className = 'prompt-card-title';
      cardTitle.textContent = p.title;
      card.appendChild(cardTitle);

      const desc = document.createElement('div');
      desc.className = 'prompt-card-desc';
      desc.textContent = p.description;
      card.appendChild(desc);

      const actions = document.createElement('div');
      actions.className = 'prompt-card-actions';

      const copyBtn = document.createElement('button');
      copyBtn.className = 'btn btn-primary';
      copyBtn.textContent = 'Copiar prompt';
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        copyPromptText(p.prompt, copyBtn);
      });
      actions.appendChild(copyBtn);

      const viewBtn = document.createElement('button');
      viewBtn.className = 'btn btn-secondary';
      viewBtn.textContent = 'Ver';
      viewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPromptDetail(p);
      });
      actions.appendChild(viewBtn);

      card.appendChild(actions);
      card.addEventListener('click', () => showPromptDetail(p));
      cards.appendChild(card);
    }

    section.appendChild(cards);
    promptsCategories.appendChild(section);
  }
}

function showPromptDetail(promptObj) {
  promptsCategories.classList.add('hidden');
  promptsDetail.classList.remove('hidden');

  promptContent.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'prompt-detail-card';

  const title = document.createElement('div');
  title.className = 'prompt-detail-title';
  title.textContent = promptObj.title;
  card.appendChild(title);

  const badge = document.createElement('div');
  badge.className = 'prompt-detail-badge';
  badge.textContent = promptObj.category;
  card.appendChild(badge);

  const desc = document.createElement('div');
  desc.className = 'prompt-detail-desc';
  desc.textContent = promptObj.description;
  card.appendChild(desc);

  const text = document.createElement('div');
  text.className = 'prompt-detail-text';
  text.textContent = promptObj.prompt;
  card.appendChild(text);

  const actions = document.createElement('div');
  actions.className = 'prompt-detail-actions';

  const copyBtn = document.createElement('button');
  copyBtn.className = 'btn-copy';
  copyBtn.textContent = 'Copiar prompt';
  copyBtn.addEventListener('click', () => copyPromptText(promptObj.prompt, copyBtn));
  actions.appendChild(copyBtn);

  const feedback = document.createElement('span');
  feedback.className = 'copy-feedback';
  feedback.id = 'copy-feedback';
  feedback.textContent = 'Copiado al portapapeles';
  actions.appendChild(feedback);

  card.appendChild(actions);
  promptContent.appendChild(card);
}

function copyPromptText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copiado';
    btn.classList.add('copied');
    showToast('Prompt copiado al portapapeles');
    setTimeout(() => {
      btn.textContent = 'Copiar prompt';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    btn.textContent = 'Copiado';
    btn.classList.add('copied');
    showToast('Prompt copiado al portapapeles');
    setTimeout(() => {
      btn.textContent = 'Copiar prompt';
      btn.classList.remove('copied');
    }, 2000);
  });
}

document.getElementById('btn-prompts-back').addEventListener('click', () => {
  const activeCat = document.querySelector('.prompt-btn.prompt-cat-header.active');
  if (activeCat) {
    showPromptsCategory(activeCat.dataset.category);
  } else {
    showPromptsCategory(null);
  }
});

// ─── Scroll to Top ─────────────────────────────────────────────

const scrollTopBtn = document.getElementById('scroll-top');
const mainContent = document.getElementById('main-content');

mainContent.addEventListener('scroll', () => {
  if (mainContent.scrollTop > 200) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// ─── Prompt Search ────────────────────────────────────────────

const promptSearch = document.getElementById('prompt-search');
const promptSearchClear = document.getElementById('prompt-search-clear');
const promptNoResults = document.getElementById('prompt-no-results');
const promptNoResultsDesc = document.getElementById('prompt-no-results-desc');
let searchTimeout = null;

function filterPromptCards(q, fromSearch) {
  const categories = document.querySelectorAll('.prompt-category');
  let totalVisible = 0;

  for (const cat of categories) {
    let hasVisible = false;
    const cardsInCat = cat.querySelectorAll('.prompt-card');
    for (const card of cardsInCat) {
      const title = card.querySelector('.prompt-card-title')?.textContent?.toLowerCase() || '';
      const desc = card.querySelector('.prompt-card-desc')?.textContent?.toLowerCase() || '';
      const badge = card.querySelector('.prompt-card-badge')?.textContent?.toLowerCase() || '';
      const promptId = card.dataset.promptId;
      const promptObj = promptId ? prompts.find(p => p.id === promptId) : null;
      const promptText = promptObj?.prompt?.toLowerCase() || '';
      const match = !q || title.includes(q) || desc.includes(q) || badge.includes(q) || promptText.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) hasVisible = true;
    }
    cat.style.display = hasVisible ? '' : 'none';
    if (hasVisible) totalVisible++;
  }

  if (q && totalVisible === 0 && fromSearch) {
    if (promptNoResults) {
      if (promptNoResultsDesc) promptNoResultsDesc.textContent = `No se encontraron prompts para «${q}». Probá con otras palabras clave.`;
      promptNoResults.classList.remove('hidden');
    }
  } else {
    if (promptNoResults) promptNoResults.classList.add('hidden');
  }

  if (promptSearchClear) {
    if (q) promptSearchClear.classList.remove('hidden');
    else promptSearchClear.classList.add('hidden');
  }
}

if (promptSearch) {
  promptSearch.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const q = promptSearch.value.trim();
      const activeCat = document.querySelector('.prompt-btn.prompt-cat-header.active');

      if (q) {
        if (activeCat) {
          const catName = activeCat.dataset.category;
          showPromptsCategory(null);
          setTimeout(() => filterPromptCards(q, true), 50);
        } else {
          filterPromptCards(q, true);
        }
      } else {
        filterPromptCards('', false);
        if (promptSearchClear) promptSearchClear.classList.add('hidden');
        if (lastPromptCategory) {
          showPromptsCategory(lastPromptCategory);
        } else {
          showPromptsCategory(null);
        }
      }
    }, 200);
  });
}

if (promptSearchClear) {
  promptSearchClear.addEventListener('click', () => {
    promptSearch.value = '';
    promptSearchClear.classList.add('hidden');
    if (promptNoResults) promptNoResults.classList.add('hidden');
    if (lastPromptCategory) {
      showPromptsCategory(lastPromptCategory);
    } else {
      showPromptsCategory(null);
    }
    promptSearch.focus();
  });
}

renderSidebar();
renderPromptSidebar();

// ─── Welcome screen CTAs ────────────────────────────────────────

(function initWelcomeCTAs() {
  const ids = Object.keys(docRegistry);
  ids.sort((a, b) => docRegistry[a].title.localeCompare(docRegistry[b].title));

  const wcardParte    = document.getElementById('wcard-parte');
  const wcardActa     = document.getElementById('wcard-acta');
  const wcardPrompts  = document.getElementById('wcard-prompts');
  const wcardDrawing  = document.getElementById('wcard-drawing');
  const btnWelcomeDocs    = document.getElementById('btn-welcome-docs');
  const btnWelcomePrompts = document.getElementById('btn-welcome-prompts');

  function activateCard(el) {
    if (el) {
      el.addEventListener('click', () => el.click && el.click());
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
    }
  }

  if (wcardParte) {
    wcardParte.addEventListener('click', () => selectDocument('parte-accidente'));
    wcardParte.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectDocument('parte-accidente'); } });
  }
  if (wcardActa) {
    wcardActa.addEventListener('click', () => selectDocument('acta-infraccion'));
    wcardActa.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectDocument('acta-infraccion'); } });
  }
  if (wcardPrompts) {
    wcardPrompts.addEventListener('click', () => showPromptsCategory(null));
    wcardPrompts.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showPromptsCategory(null); } });
  }
  if (wcardDrawing) {
    wcardDrawing.addEventListener('click', () => showDrawingView());
    wcardDrawing.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showDrawingView(); } });
  }
  if (btnWelcomeDocs) {
    btnWelcomeDocs.addEventListener('click', () => {
      if (isMobile()) { openDocDrawer(); }
      else if (ids.length > 0) { selectDocument(ids[0]); }
    });
  }
  if (btnWelcomePrompts) {
    btnWelcomePrompts.addEventListener('click', () => {
      if (isMobile()) { openPromptsDrawer(); }
      else { showPromptsCategory(null); }
    });
  }
})();

// ─── Drawing View ──────────────────────────────────────────────

function showDrawingView() {
  welcome.classList.add('hidden');
  formView.classList.add('hidden');
  previewView.classList.add('hidden');
  promptsView.classList.add('hidden');
  drawingView.classList.remove('hidden');
  document.querySelectorAll('.doc-btn, .prompt-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('btn-open-drawing');
  if (btn) btn.classList.add('active');
  setBottomNavActive('drawing');
}

const btnOpenDrawing = document.getElementById('btn-open-drawing');
if (btnOpenDrawing) {
  btnOpenDrawing.addEventListener('click', showDrawingView);
}

// ─── Bottom Navigation (mobile) ────────────────────────────────

function isMobile() {
  return window.innerWidth <= 640;
}

function setBottomNavActive(section) {
  document.querySelectorAll('.bottom-nav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.section === section);
  });
}

// Drawer: documentos
const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');
const mobileDrawer = document.getElementById('mobile-drawer');
const mobileDocList = document.getElementById('mobile-doc-list');
const btnDrawerClose = document.getElementById('btn-drawer-close');

function openDocDrawer() {
  mobileDocList.innerHTML = '';
  const ids = Object.keys(docRegistry);
  ids.sort((a, b) => docRegistry[a].title.localeCompare(docRegistry[b].title));
  for (const id of ids) {
    const doc = docRegistry[id];
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'doc-btn' + (currentDocId === id ? ' active' : '');
    btn.textContent = doc.title;
    btn.dataset.docId = id;
    btn.addEventListener('click', () => {
      closeDocDrawer();
      selectDocument(id);
    });
    li.appendChild(btn);
    mobileDocList.appendChild(li);
  }
  mobileDrawer.classList.remove('hidden');
  mobileDrawerOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeDocDrawer() {
  mobileDrawer.classList.add('hidden');
  mobileDrawerOverlay.classList.add('hidden');
  document.body.style.overflow = '';
}

if (btnDrawerClose) btnDrawerClose.addEventListener('click', closeDocDrawer);
if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeDocDrawer);

// Drawer: prompts
const mobilePromptsOverlay = document.getElementById('mobile-prompts-overlay');
const mobilePromptsDrawer = document.getElementById('mobile-prompts-drawer');
const mobilePromptList = document.getElementById('mobile-prompt-list');
const btnPromptsDrawerClose = document.getElementById('btn-prompts-drawer-close');

function openPromptsDrawer() {
  mobilePromptList.innerHTML = '';
  const catIconMap = {
    'Redacción Jurídica': 'pen',
    'Consulta Normativa': 'book',
    'Procedimiento': 'checkSquare',
    'Revisión y Corrección': 'search'
  };
  const categories = [...new Set(prompts.map(p => p.category))];
  for (const cat of categories) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'prompt-btn prompt-cat-header';
    const iconId = catIconMap[cat];
    if (iconId && icons[iconId]) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'prompt-cat-icon';
      iconSpan.innerHTML = icons[iconId];
      btn.appendChild(iconSpan);
    }
    const textSpan = document.createElement('span');
    textSpan.textContent = cat;
    btn.appendChild(textSpan);
    btn.dataset.category = cat;
    btn.addEventListener('click', () => {
      closePromptsDrawer();
      showPromptsCategory(cat);
    });
    li.appendChild(btn);
    mobilePromptList.appendChild(li);
  }
  mobilePromptsDrawer.classList.remove('hidden');
  mobilePromptsOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closePromptsDrawer() {
  mobilePromptsDrawer.classList.add('hidden');
  mobilePromptsOverlay.classList.add('hidden');
  document.body.style.overflow = '';
}

if (btnPromptsDrawerClose) btnPromptsDrawerClose.addEventListener('click', closePromptsDrawer);
if (mobilePromptsOverlay) mobilePromptsOverlay.addEventListener('click', closePromptsDrawer);

// Bottom nav tap handlers
document.querySelectorAll('.bottom-nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const section = btn.dataset.section;
    if (section === 'docs') {
      openDocDrawer();
    } else if (section === 'prompts') {
      openPromptsDrawer();
    } else if (section === 'drawing') {
      showDrawingView();
    }
  });
});


