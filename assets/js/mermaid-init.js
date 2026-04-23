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
  var font = getComputedStyle(document.documentElement)
    .getPropertyValue('--bs-font-sans-serif').trim() || 'system-ui, sans-serif';

  var config = isDark
    ? {
        startOnLoad: false,
        fontFamily: font,
        theme: 'base',
        themeVariables: {
          // Fond et texte — One Dark
          background:           '#282c34',
          primaryColor:         '#2c313a',
          primaryTextColor:     '#abb2bf',
          primaryBorderColor:   '#3e4451',
          // Arêtes / flèches
          lineColor:            '#5c6370',
          // Nœuds secondaires / clusters
          secondaryColor:       '#21252b',
          secondaryTextColor:   '#abb2bf',
          secondaryBorderColor: '#3e4451',
          tertiaryColor:        '#21252b',
          tertiaryTextColor:    '#abb2bf',
          tertiaryBorderColor:  '#3e4451',
          // Labels sur les arêtes
          edgeLabelBackground:  '#21252b',
          // Clusters (sous-graphes)
          clusterBkg:           '#21252b',
          clusterBorder:        '#3e4451',
          // Titres
          titleColor:           '#abb2bf',
          // Texte des nœuds (séquences, flowcharts…)
          nodeTextColor:        '#abb2bf',
          // Éléments Gantt
          critBkgColor:         '#e06c75',
          critTextColor:        '#21252b',
          doneTaskBkgColor:     '#98c379',
          activeTaskBkgColor:   '#61afef',
          activeTaskBorderColor:'#61afef',
          taskTextColor:        '#21252b',
          taskTextOutsideColor: '#abb2bf',
          gridColor:            '#3e4451',
          // Séquences
          actorBkg:             '#2c313a',
          actorBorder:          '#3e4451',
          actorTextColor:       '#abb2bf',
          actorLineColor:       '#5c6370',
          signalColor:          '#abb2bf',
          signalTextColor:      '#abb2bf',
          labelBoxBkgColor:     '#21252b',
          labelBoxBorderColor:  '#3e4451',
          labelTextColor:       '#abb2bf',
          loopTextColor:        '#abb2bf',
          noteBkgColor:         '#e5c07b',
          noteTextColor:        '#21252b',
          noteBorderColor:      '#d19a66',
          activationBkgColor:   '#61afef',
          activationBorderColor:'#61afef',
        },
      }
    : {
        startOnLoad: false,
        fontFamily: font,
        theme: 'base',
        themeVariables: {
          // Mode clair — accent One Dark blue adapté (#4e8ecb)
          background:           '#ffffff',
          primaryColor:         '#dde8f5',
          primaryTextColor:     '#1f2328',
          primaryBorderColor:   '#4e8ecb',
          lineColor:            '#4e8ecb',
          secondaryColor:       '#f0f4f8',
          secondaryTextColor:   '#1f2328',
          secondaryBorderColor: '#4e8ecb',
          tertiaryColor:        '#f6f8fa',
          tertiaryTextColor:    '#1f2328',
          tertiaryBorderColor:  '#d0d7de',
          edgeLabelBackground:  '#ffffff',
          clusterBkg:           '#f6f8fa',
          clusterBorder:        '#d0d7de',
          titleColor:           '#1f2328',
          nodeTextColor:        '#1f2328',
          noteBkgColor:         '#fff8d6',
          noteTextColor:        '#1f2328',
          noteBorderColor:      '#d19a66',
        },
      };

  mermaid.initialize(config);
  mermaid.run();
})();
