import assert from 'node:assert/strict';
import { test } from 'node:test';
import { addRevealButton, REVEAL_ATTR } from './password-reveal';

// Just enough DOM for addRevealButton: attributes, listeners, and where the button lands.
class FakeElement {
  attrs = new Map<string, string>();
  listeners = new Map<string, (e: Event) => void>();
  type = '';
  className = '';
  innerHTML = '';
  spellcheck = true;
  next: FakeElement | null = null;
  ownerDocument = { createElement: () => new FakeElement() };
  setAttribute(name: string, value: string) {
    this.attrs.set(name, value);
  }
  addEventListener(type: string, fn: (e: Event) => void) {
    this.listeners.set(type, fn);
  }
  after(el: FakeElement) {
    this.next = el;
  }
  fire(type: string) {
    let prevented = false;
    this.listeners.get(type)?.({ preventDefault: () => { prevented = true; } } as unknown as Event);
    return prevented;
  }
}

function setup() {
  const input = new FakeElement();
  input.type = 'password';
  const set = addRevealButton(input as unknown as HTMLInputElement);
  return { input, button: input.next!, set };
}

test('the button flips the input between hidden and shown, and its label follows', () => {
  const { input, button } = setup();
  assert.equal(button.type, 'button');
  assert.equal(button.attrs.get('aria-label'), 'Tampilkan password');
  assert.equal(button.attrs.get('aria-pressed'), 'false');

  button.fire('click');
  assert.equal(input.type, 'text');
  assert.equal(button.attrs.get('aria-label'), 'Sembunyikan password');
  assert.equal(button.attrs.get('aria-pressed'), 'true');

  button.fire('click');
  assert.equal(input.type, 'password');
  assert.equal(button.attrs.get('aria-label'), 'Tampilkan password');
});

test('pressing the button does not take focus from the field', () => {
  assert.equal(setup().button.fire('mousedown'), true);
});

test('a shown password is not capitalised, corrected, or spell-checked', () => {
  const { input } = setup();
  assert.equal(input.attrs.get('autocapitalize'), 'none');
  assert.equal(input.attrs.get('autocorrect'), 'off');
  assert.equal(input.spellcheck, false);
  assert.equal(input.attrs.has(REVEAL_ATTR), true);
});

test('the returned switch hides it again, as the submit handler does', () => {
  const { input, button, set } = setup();
  button.fire('click');
  set(false);
  assert.equal(input.type, 'password');
  assert.equal(button.attrs.get('aria-pressed'), 'false');
});
