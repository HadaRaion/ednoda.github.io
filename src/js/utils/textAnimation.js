import SplitType from "split-type";

/**
 * Creates an animated text structure for HTML elements.
 * @param {string} selector - CSS selector for target elements
 * @param {Object} options - Configuration options
 * @param {string} options.type - SplitType split type ('chars', 'words', 'lines')
 * @param {string} options.animationClass - Class to add to animation elements (optional)
 * @returns {Object} SplitType instance and target elements
 */
export function createAnimatedText(
  selector,
  { type = "chars", animationClass = "" } = {}
) {
  const elements = document.querySelectorAll(selector);
  const results = [];

  elements.forEach((element, index) => {
    // Generate unique ID if not present
    if (!element.id) {
      element.id = `text-reveal-${index}`;
    }

    // Reuse existing SplitType instance if element already processed
    if (element.querySelector(".sr-only")) {
      const animationText = element.querySelector(".animation-text");
      const splitInstance = new SplitType(animationText, {
        types: type,
      });

      results.push({
        element,
        splitInstance,
        chars: splitInstance.chars,
        words: splitInstance.words,
        lines: splitInstance.lines,
      });
      return;
    }

    const originalText = element.textContent.trim();

    // Text for screen readers
    const srOnlySpan = `<span class="sr-only">${originalText}</span>`;

    // Text for animation
    const animationSpan = `<span class="animation-text ${animationClass}" aria-hidden="true">${originalText}</span>`;

    // Replace HTML
    element.innerHTML = srOnlySpan + animationSpan;

    // Apply SplitType
    const splitInstance = new SplitType(
      element.querySelector(".animation-text"),
      {
        types: type,
      }
    );

    results.push({
      element,
      splitInstance,
      chars: splitInstance.chars,
      words: splitInstance.words,
      lines: splitInstance.lines,
    });
  });

  // Return first result only for ID selector (#)
  return selector.includes("#") ? results[0] : results;
}
