(function () {
  var tocEl = document.querySelector('.guide-toc');
  if (!tocEl) return;

  var headings = Array.from(
    document.querySelectorAll('.chapter-body h2[id], .chapter-body h3[id]')
  );
  if (!headings.length) return;

  var tocLinks = Array.from(tocEl.querySelectorAll('a[href^="#"]'));
  if (!tocLinks.length) return;

  var headerOffset = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--guide-header-height'),
    10
  ) || 52;

  function getActiveId() {
    var scrollTop = window.scrollY + headerOffset + 24;
    var activeId = headings[0].id;
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].offsetTop <= scrollTop) {
        activeId = headings[i].id;
      } else {
        break;
      }
    }
    return activeId;
  }

  function update() {
    var id = getActiveId();
    tocLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  update();
})();
