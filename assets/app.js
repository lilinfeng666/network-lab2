const filterButtons = [...document.querySelectorAll('[data-filter]')];
const vlanRows = [...document.querySelectorAll('[data-vlan-row]')];
const filterStatus = document.querySelector('.filter-status');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });

    vlanRows.forEach((row) => {
      const visible = filter === 'all' || row.dataset.vlanRow === filter;
      row.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    filterStatus.textContent = `显示 ${visibleCount} 个网段`;
  });
});

const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const sections = [...document.querySelectorAll('[data-section]')];

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (!visibleSections.length) return;
    const activeId = visibleSections[0].target.id;
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-20% 0px -60%', threshold: [0, 0.2, 0.5] });

  sections.forEach((section) => sectionObserver.observe(section));
}
