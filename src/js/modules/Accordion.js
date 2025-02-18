export default class Accordion {
  static CLASSES = {
    ITEM: "accordion-item",
    TRIGGER: "accordion-trigger",
    PANEL: "accordion-panel",
    ACTIVE: "active",
  };

  constructor(container, options = {}) {
    this.container = document.querySelector(container);
    this.options = {
      initialActive: 0,
      maxActive: 1,
      ...options,
    };

    this.accordionItems = [];
    this.init();
  }

  init() {
    const items = this.container.querySelectorAll(`.${Accordion.CLASSES.ITEM}`);

    items.forEach((item, index) => {
      const trigger = item.querySelector(`.${Accordion.CLASSES.TRIGGER}`);
      const panel = item.querySelector(`.${Accordion.CLASSES.PANEL}`);

      // 각 아코디언 아이템 초기화
      this.accordionItems.push({
        item,
        trigger,
        panel,
      });

      // 트리거 클릭 이벤트 설정
      trigger.addEventListener("click", () => this.toggleAccordion(index));

      // 초기 상태 설정
      if (index === this.options.initialActive) {
        this.openAccordion(index);
      } else {
        this.closeAccordion(index);
      }
    });
  }

  toggleAccordion(index) {
    const isExpanded =
      this.accordionItems[index].trigger.getAttribute("aria-expanded") ===
      "true";

    // maxActive가 1일 경우, 다른 모든 아코디언을 닫음
    if (this.options.maxActive === 1) {
      this.accordionItems.forEach((item, i) => {
        if (i !== index) {
          this.closeAccordion(i);
        }
      });
    }

    // 현재 아코디언 토글
    if (isExpanded) {
      this.closeAccordion(index);
    } else {
      this.openAccordion(index);
    }
  }

  openAccordion(index) {
    const { item, trigger, panel } = this.accordionItems[index];

    item.classList.add(Accordion.CLASSES.ACTIVE);
    trigger.setAttribute("aria-expanded", "true");
    panel.removeAttribute("hidden");
  }

  closeAccordion(index) {
    const { item, trigger, panel } = this.accordionItems[index];

    item.classList.remove(Accordion.CLASSES.ACTIVE);
    trigger.setAttribute("aria-expanded", "false");
    panel.setAttribute("hidden", "");
  }
}
