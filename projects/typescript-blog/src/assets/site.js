export function updateCategoryVisibility(buttons, items) {
  const active = new Set(
    buttons
      .filter(button => button.getAttribute('aria-pressed') !== 'false')
      .map(button => button.getAttribute('data-category-toggle'))
      .filter(Boolean)
  );

  items.forEach(item => {
    const categories = (item.getAttribute('data-categories') ?? '').split(/\s+/).filter(Boolean);
    const isVisible = categories.length === 0 || categories.some(category => active.has(category));
    item.hidden = !isVisible;
  });
}

export function setupCategoryFilters(doc = document) {
  const buttons = [...doc.querySelectorAll('[data-category-toggle]')];
  const items = [...doc.querySelectorAll('[data-categories]')];

  if (buttons.length === 0 || items.length === 0) {
    return;
  }

  const update = () => {
    updateCategoryVisibility(buttons, items);
  };

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const isPressed = button.getAttribute('aria-pressed') !== 'false';
      button.setAttribute('aria-pressed', String(!isPressed));
      update();
    });
  });

  update();
}

export function setupCopyButtons(doc = document, clipboard = navigator.clipboard) {
  const status = doc.getElementById('copy-status');

  doc.querySelectorAll('[data-copy-code]').forEach(button => {
    button.addEventListener('click', async () => {
      const container = button.closest('pre');
      const lines = container?.querySelectorAll('.code-line');
      const text = [...(lines ?? [])].map(line => line.textContent ?? '').join('\n');

      if (!text) {
        return;
      }

      try {
        await clipboard.writeText(text);
        button.dataset.copied = 'true';
        button.textContent = 'Copied';
        if (status) {
          status.textContent = 'Code copied to clipboard.';
        }
      } catch (error) {
        button.dataset.copied = 'false';
        button.textContent = 'Copy failed';
        if (status) {
          status.textContent = 'Unable to copy code to the clipboard.';
        }
        window.setTimeout(() => {
          button.textContent = 'Copy';
          if (status) {
            status.textContent = '';
          }
        }, 1500);
        return;
      }

      window.setTimeout(() => {
        button.dataset.copied = 'false';
        button.textContent = 'Copy';
        if (status) {
          status.textContent = '';
        }
      }, 1500);
    });
  });
}

export function setupMermaidExtensionPoint(doc = document, win = window) {
  const mermaidBlocks = [...doc.querySelectorAll('pre.mermaid')];
  if (mermaidBlocks.length === 0) {
    return;
  }

  const runtime = win.typescriptBlog ?? {};
  runtime.enhanceMermaid = enhancer => {
    if (typeof enhancer === 'function') {
      enhancer(mermaidBlocks);
    }
  };
  win.typescriptBlog = runtime;

  if (win.mermaid?.run) {
    win.mermaid.run({ nodes: mermaidBlocks });
  }
}

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  setupCategoryFilters();
  setupCopyButtons();
  setupMermaidExtensionPoint();
}
