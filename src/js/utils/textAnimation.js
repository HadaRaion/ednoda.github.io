import SplitType from "split-type";

/**
 * HTML 요소에 애니메이션용 텍스트 구조를 생성합니다.
 * @param {string} selector - 대상 요소의 CSS 선택자
 * @param {Object} options - 설정 옵션
 * @param {string} options.type - SplitType 분할 타입 ('chars', 'words', 'lines')
 * @param {string} options.animationClass - 애니메이션 요소에 추가할 클래스 (선택사항)
 * @returns {Object} SplitType 인스턴스와 대상 요소들
 */
export function createAnimatedText(
  selector,
  { type = "chars", animationClass = "" } = {}
) {
  const elements = document.querySelectorAll(selector);
  const results = [];

  elements.forEach((element, index) => {
    // 고유 ID가 없는 경우 생성
    if (!element.id) {
      element.id = `text-reveal-${index}`;
    }

    // 이미 처리된 요소의 경우 기존 SplitType 인스턴스 재사용
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

    // 스크린리더용 텍스트
    const srOnlySpan = `<span class="sr-only">${originalText}</span>`;

    // 애니메이션용 텍스트
    const animationSpan = `<span class="animation-text ${animationClass}" aria-hidden="true">${originalText}</span>`;

    // HTML 교체
    element.innerHTML = srOnlySpan + animationSpan;

    // SplitType 적용
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

  // ID 선택자(#)인 경우 첫 번째 결과만 반환
  return selector.includes("#") ? results[0] : results;
}
