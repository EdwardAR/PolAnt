import { FormEngine } from './form-engine.js';
import { TemplateEngine } from './template-engine.js';
import { parteAccidente } from '../docs/parte-accidente.js';
import { actaInfraccion } from '../docs/acta-infraccion.js';
import { prompts } from '../docs/prompts.js';

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
  formTitle.textContent = doc.title;
  formEngine.clearForm(docForm);
  docForm.innerHTML = '';
  docForm.appendChild(formEngine.renderForm(doc.sections));
  document.querySelectorAll('.doc-btn').forEach(b => b.classList.remove('active'));
  const btn = docList.querySelector(`[data-doc-id="${id}"]`);
  if (btn) btn.classList.add('active');
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
  const categories = [...new Set(prompts.map(p => p.category))];
  for (const cat of categories) {
    const header = document.createElement('li');
    const headerBtn = document.createElement('button');
    headerBtn.className = 'prompt-btn prompt-cat-header';
    headerBtn.textContent = cat;
    headerBtn.dataset.category = cat;
    headerBtn.addEventListener('click', () => showPromptsCategory(cat));
    header.appendChild(headerBtn);
    promptList.appendChild(header);
  }
}

function showPromptsCategory(category) {
  welcome.classList.add('hidden');
  formView.classList.add('hidden');
  previewView.classList.add('hidden');
  promptsView.classList.remove('hidden');
  promptsDetail.classList.add('hidden');
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
    title.textContent = cat;
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

renderSidebar();
renderPromptSidebar();
