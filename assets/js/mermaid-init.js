(function () {
  if (typeof mermaid === 'undefined') return;

  var blocks = document.querySelectorAll('code.language-mermaid');
  if (!blocks.length) return;

  // Convertir les blocs <code class="language-mermaid"> générés par Hugo
  // en <div class="mermaid"> que Mermaid.js peut prendre en charge
  blocks.forEach(function (code) {
    var pre = code.parentElement;
    var parent = pre ? pre.parentElement : null;
    var div = document.createElement('div');
    div.className = 'mermaid';
    div.textContent = code.textContent;
    // Hugo enveloppe dans un .highlight — remonter d'un niveau si c'est le cas
    var target = (parent && parent.classList.contains('highlight')) ? parent : pre;
    target.replaceWith(div);
  });

  var isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';

  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'default',
    fontFamily: getComputedStyle(document.documentElement)
      .getPropertyValue('--bs-font-sans-serif').trim() || 'system-ui, sans-serif',
  });

  mermaid.run();
})();
