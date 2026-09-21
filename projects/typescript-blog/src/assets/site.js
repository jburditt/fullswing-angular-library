function setupCategoryFilters() {
  const buttons = [...document.querySelectorAll('[data-category-toggle]')];
  const items = [...document.querySelectorAll('[data-categories]')];

  if (buttons.length === 0 || items.length === 0) {
    return;
  }

  const update = () => {
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

function setupCopyButtons() {
  document.querySelectorAll('[data-copy-code]').forEach(button => {
    button.addEventListener('click', async () => {
      const container = button.closest('pre');
      const lines = container?.querySelectorAll('.code-line');
      const text = [...(lines ?? [])].map(line => line.textContent ?? '').join('\n');

      if (!text) {
        return;
      }

      await navigator.clipboard.writeText(text);
      button.dataset.copied = 'true';
      button.textContent = 'Copied';
      window.setTimeout(() => {
        button.dataset.copied = 'false';
        button.textContent = 'Copy';
      }, 1500);
    });
  });
}

function setupMermaidExtensionPoint() {
  const mermaidBlocks = [...document.querySelectorAll('pre.mermaid')];
  if (mermaidBlocks.length === 0) {
    return;
  }

  const runtime = window.typescriptBlog ?? {};
  runtime.enhanceMermaid = enhancer => {
    if (typeof enhancer === 'function') {
      enhancer(mermaidBlocks);
    }
  };
  window.typescriptBlog = runtime;

  if (window.mermaid?.run) {
    window.mermaid.run({ nodes: mermaidBlocks });
  }
}

setupCategoryFilters();
setupCopyButtons();
setupMermaidExtensionPoint();
