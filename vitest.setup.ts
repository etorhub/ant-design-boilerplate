import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// JSDOM does not implement window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Ant Design Table calls getComputedStyle with a pseudo-element; JSDOM lacks that API.
const originalGetComputedStyle = window.getComputedStyle.bind(window);
window.getComputedStyle = ((elt: Element, pseudoElt?: string | null) => {
  if (pseudoElt) {
    return {
      getPropertyValue: () => '',
    } as CSSStyleDeclaration;
  }
  return originalGetComputedStyle(elt);
}) as typeof window.getComputedStyle;
