export default class Accordion {
  constructor(container, options = {}) {
    this.container = document.querySelector(container);
    
    this.options = {
      initialActive: 0,
      maxActive: 1,
      ...options
    };

    this.init();
    this.bindEvents();
  }

  init() {
    const items = this.container.querySelectorAll('.faq__item');
    items.forEach((item, index) => {
      if (index === this.options.initialActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  bindEvents() {
    this.container.addEventListener('click', (e) => {
      const trigger = e.target.closest('.faq__question');
      if (!trigger) return;

      const item = trigger.closest('.faq__item');
      const items = this.container.querySelectorAll('.faq__item');
      const index = Array.from(items).indexOf(item);
      
      this.toggleAccordion(item, items);
    });
  }

  toggleAccordion(targetItem, items) {
    if (this.options.maxActive === 1) {
      items.forEach(item => {
        if (item !== targetItem) {
          item.classList.remove('active');
        }
      });
    }

    targetItem.classList.toggle('active');
  }
}
