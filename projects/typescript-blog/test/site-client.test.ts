import test from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

class FakeButton {
  hidden = false;
  textContent = '';
  dataset: Record<string, string> = {};
  private readonly attributes = new Map<string, string>();
  private clickHandler?: () => void;

  constructor(category: string, pressed: boolean) {
    this.attributes.set('data-category-toggle', category);
    this.attributes.set('aria-pressed', String(pressed));
  }

  addEventListener(_eventName: string, handler: () => void): void {
    this.clickHandler = handler;
  }

  click(): void {
    this.clickHandler?.();
  }

  getAttribute(name: string): string | null {
    return this.attributes.get(name) ?? null;
  }

  setAttribute(name: string, value: string): void {
    this.attributes.set(name, value);
  }
}

class FakeItem {
  hidden = false;
  private readonly attributes = new Map<string, string>();

  constructor(categories: string) {
    this.attributes.set('data-categories', categories);
  }

  getAttribute(name: string): string | null {
    return this.attributes.get(name) ?? null;
  }
}

test('setupCategoryFilters should toggle pressed state and hide non-matching items', async () => {
  const moduleUrl = pathToFileURL(
    resolve('/home/runner/work/fullswing-angular-library/fullswing-angular-library/projects/typescript-blog/src/assets/site.js')
  ).href;
  const { setupCategoryFilters } = await import(moduleUrl);

  const angularButton = new FakeButton('angular', true);
  const javascriptButton = new FakeButton('javascript', true);
  const angularItem = new FakeItem('angular typescript');
  const javascriptItem = new FakeItem('javascript');
  const document = {
    querySelectorAll(selector: string) {
      if (selector === '[data-category-toggle]') {
        return [angularButton, javascriptButton];
      }
      if (selector === '[data-categories]') {
        return [angularItem, javascriptItem];
      }
      return [];
    },
  };

  setupCategoryFilters(document);
  javascriptButton.click();

  assert.equal(javascriptButton.getAttribute('aria-pressed'), 'false');
  assert.equal(angularItem.hidden, false);
  assert.equal(javascriptItem.hidden, true);
});
