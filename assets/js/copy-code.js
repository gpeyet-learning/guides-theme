(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".highlight").forEach(function (block) {
      var btn = document.createElement("button");
      btn.className = "code-copy-btn";
      btn.setAttribute("aria-label", "Copier le code");
      btn.innerHTML = '<i class="bi bi-clipboard"></i> Copier';
      block.appendChild(btn);

      btn.addEventListener("click", function () {
        var pre = block.querySelector("pre");
        if (!pre) return;

        var text = pre.textContent;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(text)
            .then(function () {
              markCopied(btn);
            })
            .catch(function () {
              fallbackCopy(text, btn);
            });
        } else {
          fallbackCopy(text, btn);
        }
      });
    });
  });

  function markCopied(btn) {
    btn.innerHTML = '<i class="bi bi-check-lg"></i> Copié';
    btn.classList.add("copied");
    setTimeout(function () {
      btn.innerHTML = '<i class="bi bi-clipboard"></i> Copier';
      btn.classList.remove("copied");
    }, 2000);
  }

  function fallbackCopy(text, btn) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
      markCopied(btn);
    } catch (e) {
      console.warn("Impossible de copier le code.");
    }
    document.body.removeChild(ta);
  }
})();
