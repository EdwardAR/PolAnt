export class TemplateEngine {
  render(template, data) {
    return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
      const value = data[key.trim()];
      return value !== undefined && value !== null ? value : '';
    });
  }
}
