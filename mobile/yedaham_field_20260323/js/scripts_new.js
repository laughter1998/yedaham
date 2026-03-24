
document.querySelectorAll('.tab-item').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // 탭 active
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // 컨텐츠 전환
    document.querySelectorAll('.tab-content').forEach(c => {
      c.classList.remove('active');
      if (c.dataset.tabContent === target) {
        c.classList.add('active');
      }
    });
  });
});

function initAccordion() {
  const accordions = document.querySelectorAll('[data-accordion]');

  accordions.forEach(card => {
    const trigger = card.querySelector('[data-accordion-trigger]');
    const body = card.querySelector('[data-accordion-body]');

    if (!trigger || !body) return;

    // 초기 상태 (is-open 있으면 열어둠)
    if (card.classList.contains('is-open')) {
      body.style.height = 'auto';
    } else {
      body.style.height = '0px';
    }

    trigger.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');

      if (isOpen) {
        // 닫기
        body.style.height = body.scrollHeight + 'px';

        requestAnimationFrame(() => {
          body.style.height = '0px';
        });

        card.classList.remove('is-open');
      } else {
        // 열기
        body.style.height = body.scrollHeight + 'px';
        card.classList.add('is-open');

        body.addEventListener('transitionend', function handler() {
          body.style.height = 'auto';
          body.removeEventListener('transitionend', handler);
        });
      }
    });
  });
}

// DOM 로드 후 실행
document.addEventListener('DOMContentLoaded', initAccordion);