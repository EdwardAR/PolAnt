import { FormEngine } from './form-engine.js';
import { TemplateEngine } from './template-engine.js';
import { parteAccidente } from '../docs/parte-accidente.js';
import { actaInfraccion } from '../docs/acta-infraccion.js';

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
  formTitle.textContent = doc.title;
  formEngine.clearForm(docForm);
  docForm.innerHTML = formEngine.renderForm(doc.sections);
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

document.getElementById('btn-generate').addEventListener('click', generateDocument);
document.getElementById('btn-clear').addEventListener('click', () => {
  if (currentDocId) {
    formEngine.clearForm(docForm);
    document.querySelectorAll('.doc-btn').forEach(b => b.classList.remove('active'));
  }
});
document.getElementById('btn-back').addEventListener('click', goBack);
document.getElementById('btn-print').addEventListener('click', printDocument);

renderSidebar();
