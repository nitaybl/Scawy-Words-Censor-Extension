// Targets and replacements: whole-word matches, case-insensitive, with functional replace.
const WORD_RULES = [
  {
    re: /\bjob\b/gi,                    // match "job" as a whole word, any case
    replace: (m) => m + '*' + m.slice(2) // "job" -> "j*b" while preserving case of j and b
  },
  {
    re: /\bemployment\b/gi,             // match "employment" as a whole word, any case
    replace: (m) => m.slice(0, 4) + '*' + m.slice(5) // "employment" -> "empl*yment"
  }
];

// Utility: iterate visible text nodes only.
function createWalker(root) {
  return document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const s = node.nodeValue;
      if (!s || !s.trim()) return NodeFilter.FILTER_REJECT;
      const p = node.parentNode;
      if (!p) return NodeFilter.FILTER_REJECT;
      const tag = p.nodeName;
      // Skip non-visible or script/style-ish containers
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'NOSCRIPT') {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
}

// Count occurrences of all targets before mutating.
function countOccurrences(root) {
  let total = 0;
  const walker = createWalker(root);
  while (walker.nextNode()) {
    const txt = walker.currentNode.nodeValue;
    for (const { re } of WORD_RULES) {
      const matches = txt.match(re);
      if (matches) total += matches.length;
      re.lastIndex = 0;
    }
  }
  return total;
}

// Perform censorship in-place.
function censorText(root) {
  const walker = createWalker(root);
  while (walker.nextNode()) {
    let t = walker.currentNode.nodeValue;
    let changed = false;
    for (const { re, replace } of WORD_RULES) {
      const newT = t.replace(re, replace);
      if (newT !== t) {
        t = newT;
        changed = true;
      }
      re.lastIndex = 0;
    }
    if (changed) walker.currentNode.nodeValue = t;
  }
}

// Perplexity-styled popup (5s) that slides out to the right.
function showAlert(totalCount) {
  if (document.getElementById('pplx-censor-alert')) return;

  const alert = document.createElement('div');
  alert.id = 'pplx-censor-alert';
  alert.setAttribute('role', 'status');
  alert.setAttribute('aria-live', 'polite');
  alert.innerHTML = `
    <div class="checkmark-circle">
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <polyline class="checkmark" points="8 18 14 24 26 10"/>
      </svg>
    </div>
    <span>Censoring ${totalCount} occurrence${totalCount === 1 ? '' : 's'} of <b>j*b</b> / <b>empl*yment</b></span>
  `;
  document.body.appendChild(alert);

  setTimeout(() => {
    alert.classList.add('fadeout');
    setTimeout(() => alert.remove(), 1200);
  }, 5000);
}

// Main: count, always censor, conditionally show popup (>=3 hits).
(function run() {
  const hits = countOccurrences(document.body); // count first to decide popup [8][7]
  censorText(document.body); // always censor [9]
  if (hits >= 3) showAlert(hits); // only show popup if threshold met [9]
})();
