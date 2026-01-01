// src/setupTests.ts
import "@testing-library/jest-dom";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock scrollTo
Element.prototype.scrollTo = function () {};

// Mock scrollIntoView
Element.prototype.scrollIntoView = function () {};
