export class FormEngine {
  renderForm(sections) {
    const container = document.createElement('div');
    for (const section of sections) {
      const sectionEl = document.createElement('div');
      sectionEl.className = 'form-section';
      if (section.title) {
        const h3 = document.createElement('h3');
        h3.textContent = section.title;
        sectionEl.appendChild(h3);
      }
      for (const field of section.fields) {
        sectionEl.appendChild(this._createField(field));
      }
      container.appendChild(sectionEl);
    }
    return container.innerHTML;
  }

  _createField(field) {
    const group = document.createElement('div');
    group.className = 'form-group';
    group.dataset.fieldName = field.name;

    const label = document.createElement('label');
    label.setAttribute('for', `field-${field.name}`);
    label.textContent = field.label;
    if (field.required) {
      const span = document.createElement('span');
      span.className = 'required';
      span.textContent = ' *';
      label.appendChild(span);
    }
    group.appendChild(label);

    let input;
    if (field.type === 'select') {
      input = document.createElement('select');
      input.id = `field-${field.name}`;
      input.name = field.name;
      if (field.required) input.setAttribute('required', '');
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
      if (field.required) input.setAttribute('required', '');
      if (field.rows) input.rows = field.rows;
      if (field.placeholder) input.placeholder = field.placeholder;
    } else {
      input = document.createElement('input');
      input.type = field.type || 'text';
      input.id = `field-${field.name}`;
      input.name = field.name;
      if (field.required) input.setAttribute('required', '');
      if (field.placeholder) input.placeholder = field.placeholder;
    }

    group.appendChild(input);

    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-msg';
    group.appendChild(errorMsg);

    return group;
  }

  getFormValues(formEl) {
    const data = {};
    const groups = formEl.querySelectorAll('.form-group');
    for (const group of groups) {
      const name = group.dataset.fieldName;
      if (!name) continue;
      const input = group.querySelector('input, select, textarea');
      data[name] = input ? input.value : '';
    }
    return data;
  }

  setFormValues(formEl, data) {
    for (const [name, value] of Object.entries(data)) {
      const input = formEl.querySelector(`#field-${name}`);
      if (input) input.value = value;
    }
  }

  clearForm(formEl) {
    const inputs = formEl.querySelectorAll('input, select, textarea');
    for (const input of inputs) {
      if (input.tagName === 'SELECT') {
        input.selectedIndex = 0;
      } else {
        input.value = '';
      }
      input.classList.remove('error');
    }
    const errorMsgs = formEl.querySelectorAll('.error-msg');
    for (const msg of errorMsgs) msg.textContent = '';
  }

  validateForm(formEl) {
    let valid = true;
    const inputs = formEl.querySelectorAll('input, select, textarea');
    for (const input of inputs) {
      const group = input.closest('.form-group');
      const errorMsg = group ? group.querySelector('.error-msg') : null;
      input.classList.remove('error');
      if (errorMsg) errorMsg.textContent = '';

      if (input.hasAttribute('required') && !input.value.trim()) {
        valid = false;
        input.classList.add('error');
        if (errorMsg) errorMsg.textContent = 'Campo obligatorio';
      }
    }
    return valid;
  }
}
