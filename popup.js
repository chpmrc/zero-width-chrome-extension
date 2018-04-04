let showZWC = document.getElementById('showZWC');

function showZeroWidthCharacters() {
  let walker = document.createTreeWalker(document,NodeFilter.SHOW_TEXT,null,false);
  const zeroWidthCharRegexes = ['%EF%BB%BF', '%E2%80%8B', '%E2%80%8C'].map(zwc => new RegExp(zwc, 'g'));
  const encodedEmojis = ['%F0%9F%98%B3', '%F0%9F%98%82', '%F0%9F%A4%94'];
  let n = null;
  while (n = walker.nextNode()) {
    let encodedValue = encodeURIComponent(n.nodeValue);
    for (let zwc of zeroWidthCharRegexes) {
      if (encodedValue.match(zwc) !== null) {
        encodedValue = encodedValue.replace(zeroWidthCharRegexes[0], encodedEmojis[0]);
        encodedValue = encodedValue.replace(zeroWidthCharRegexes[1], encodedEmojis[1]);
        encodedValue = encodedValue.replace(zeroWidthCharRegexes[2], encodedEmojis[2]);
        n.nodeValue = decodeURIComponent(encodedValue);
        break;
      }
    }
  }
}

showZWC.onclick = function(element) {
  chrome.tabs.executeScript(
    {code: '' + showZeroWidthCharacters + '; showZeroWidthCharacters()'});
};
