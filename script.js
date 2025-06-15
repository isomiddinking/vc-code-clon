let htmlEditor, cssEditor, jsEditor;

require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs' } });

require(['vs/editor/editor.main'], () => {
  // LocalStorage dan olish
  const savedHTML = localStorage.getItem('htmlCode') || '<!-- HTML yozing -->';
  const savedCSS = localStorage.getItem('cssCode') || '/* CSS yozing */';
  const savedJS = localStorage.getItem('jsCode') || '// JS yozing';

  htmlEditor = monaco.editor.create(document.getElementById('htmlEditor'), {
    value: savedHTML,
    language: 'html',
    theme: 'vs-dark',
    automaticLayout: true,
  });

  cssEditor = monaco.editor.create(document.getElementById('cssEditor'), {
    value: savedCSS,
    language: 'css',
    theme: 'vs-dark',
    automaticLayout: true,
  });

  jsEditor = monaco.editor.create(document.getElementById('jsEditor'), {
    value: savedJS,
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
  });

  // HTML Snippet Completion
  monaco.languages.registerCompletionItemProvider('html', {
    provideCompletionItems: () => {
      const tags = [
        'html', 'head', 'body', 'title', 'meta', 'link', 'style', 'script',
        'div', 'span', 'p', 'a', 'img', 'ul', 'ol', 'li',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'table', 'thead', 'tbody', 'tr', 'td', 'th',
        'form', 'input', 'textarea', 'button', 'label',
        'section', 'article', 'nav', 'footer', 'header'
      ];
      const suggestions = tags.map(tag => ({
        label: tag,
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: `<${tag}>\n\t$0\n</${tag}>`,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: `<${tag}> tegi`
      }));
      return { suggestions };
    }
  });

  // Ishga tushurish
  document.getElementById('runBtn').addEventListener('click', () => {
    const html = htmlEditor.getValue();
    const css = `<style>${cssEditor.getValue()}</style>`;
    const js = `<script>${jsEditor.getValue()}<\/script>`;

    const output = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        ${css}
      </head>
      <body>
        ${html}
        ${js}
      </body>
      </html>
    `;

    document.getElementById('output').srcdoc = output;
  });

  // Saqlash → localStorage
  document.getElementById('saveBtn').addEventListener('click', () => {
    localStorage.setItem('htmlCode', htmlEditor.getValue());
    localStorage.setItem('cssCode', cssEditor.getValue());
    localStorage.setItem('jsCode', jsEditor.getValue());
    alert('Kodlar localStorage-ga saqlandi!');
  });
});
