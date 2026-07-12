import { normativa } from '../docs/normativa.js';

export class FormEngine {
  renderForm(sections) {
    const container = document.createElement('div');
    for (const section of sections) {
      const sectionEl = document.createElement('div');
      sectionEl.className = 'form-section-card';

      if (section.title) {
        const h3 = document.createElement('h3');
        h3.className = 'section-title';
        h3.textContent = section.title;
        sectionEl.appendChild(h3);
      }

      const fieldsGrid = document.createElement('div');
      fieldsGrid.className = 'fields-grid';

      for (const field of section.fields) {
        fieldsGrid.appendChild(this._createField(field));
      }

      sectionEl.appendChild(fieldsGrid);
      container.appendChild(sectionEl);
    }
    return container;
  }

  _createField(field) {
    if (field.type === 'normativa') {
      return this._createNormativaField(field);
    }

    const group = document.createElement('div');
    group.className = 'form-group';
    group.dataset.fieldName = field.name;

    const label = document.createElement('label');
    label.setAttribute('for', `field-${field.name}`);
    label.textContent = field.label;
    group.appendChild(label);

    let input;
    if (field.type === 'select') {
      input = document.createElement('select');
      input.id = `field-${field.name}`;
      input.name = field.name;
      const emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      emptyOpt.textContent = 'Seleccione...';
      input.appendChild(emptyOpt);
      for (const opt of field.options || []) {
        const optEl = document.createElement('option');
        optEl.value = opt.value || opt;
        optEl.textContent = opt.label || opt;
        input.appendChild(optEl);
      }
    } else if (field.type === 'textarea') {
      input = document.createElement('textarea');
      input.id = `field-${field.name}`;
      input.name = field.name;
      if (field.rows) input.rows = field.rows;
      if (field.placeholder) input.placeholder = field.placeholder;
    } else {
      input = document.createElement('input');
      input.type = field.type || 'text';
      input.id = `field-${field.name}`;
      input.name = field.name;
      if (field.placeholder) input.placeholder = field.placeholder;
    }

    if (field.required) {
      input.required = true;
      if (field.type !== 'checkbox' && field.type !== 'normativa') {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'form-error';
        errorSpan.textContent = 'Este campo es obligatorio';
        group.appendChild(errorSpan);
      }
    }

    group.appendChild(input);
    return group;
  }

  _createNormativaField(field) {
    const group = document.createElement('div');
    group.className = 'form-group form-group-normativa';
    group.dataset.fieldName = field.name;

    const label = document.createElement('label');
    label.textContent = field.label;
    group.appendChild(label);

    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'normativa-list';

    for (const ley of normativa.leyes) {
      const leyHeader = document.createElement('div');
      leyHeader.className = 'normativa-ley';
      leyHeader.textContent = ley.nombre;
      checkboxContainer.appendChild(leyHeader);

      for (const cat of ley.categorias) {
        const catHeader = document.createElement('div');
        catHeader.className = 'normativa-categoria';
        catHeader.textContent = cat.nombre;
        checkboxContainer.appendChild(catHeader);

        for (const art of cat.articulos) {
          const cbRow = document.createElement('label');
          cbRow.className = 'normativa-item';

          const cb = document.createElement('input');
          cb.type = 'checkbox';
          cb.dataset.ref = art.ref;
          cb.className = 'normativa-cb';

          const txt = document.createElement('span');
          txt.innerHTML = `<strong>${art.ref}</strong> — ${art.desc}`;

          cbRow.appendChild(cb);
          cbRow.appendChild(txt);
          checkboxContainer.appendChild(cbRow);
        }
      }
    }

    group.appendChild(checkboxContainer);

    const customRow = document.createElement('div');
    customRow.className = 'normativa-otras';
    const customLabel = document.createElement('label');
    customLabel.className = 'normativa-otras-label';
    customLabel.textContent = 'Otras normas no listadas:';
    const customInput = document.createElement('input');
    customInput.type = 'text';
    customInput.className = 'normativa-custom';
    customInput.placeholder = 'Ej: Ley 24.449 Art. 55 — Ley 13.927 Art. 44';
    customRow.appendChild(customLabel);
    customRow.appendChild(customInput);
    group.appendChild(customRow);

    return group;
  }

  getFormValues(formEl) {
    const data = {};
    const groups = formEl.querySelectorAll('.form-group');
    for (const group of groups) {
      const name = group.dataset.fieldName;
      if (!name) continue;

      if (group.classList.contains('form-group-normativa')) {
        const checked = [];
        const cbs = group.querySelectorAll('.normativa-cb:checked');
        for (const cb of cbs) {
          checked.push(cb.dataset.ref);
        }
        const custom = group.querySelector('.normativa-custom')?.value?.trim() || '';
        const parts = [...checked, custom].filter(Boolean);
        data[name] = parts.join('; ');
        continue;
      }

      const input = group.querySelector('input, select, textarea');
      data[name] = input ? input.value : '';
    }
    return data;
  }

  clearForm(formEl) {
    const inputs = formEl.querySelectorAll('input:not([type="checkbox"]), select, textarea');
    for (const input of inputs) {
      if (input.tagName === 'SELECT') {
        input.selectedIndex = 0;
      } else {
        input.value = '';
      }
    }
    const checkboxes = formEl.querySelectorAll('input[type="checkbox"]');
    for (const cb of checkboxes) cb.checked = false;
  }

  validateForm(formEl) {
    const required = formEl.querySelectorAll('[required]');
    let firstInvalid = null;
    for (const el of required) {
      if (!el.checkValidity()) {
        el.style.borderColor = '#c0392b';
        if (!firstInvalid) firstInvalid = el;
      } else {
        el.style.borderColor = '';
      }
    }
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  }
}
