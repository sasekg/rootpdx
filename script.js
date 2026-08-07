(() => {
  const form = document.getElementById('cli-form');
  const input = document.getElementById('cli-command');
  const navigation = document.getElementById('navigation');
  const navigationList = document.getElementById('navigation-list');
  const navigationItemTemplate = document.getElementById('navigation-item-template');
  const strings = navigationStrings;

  document.getElementById('cli-prompt').textContent = strings.prompt;
  document.getElementById('cli-command-help').textContent = strings.promptHelp;
  form.setAttribute('aria-label', strings.terminalLabel);
  navigation.setAttribute('aria-label', strings.navigationLabel);

  strings.navigation.forEach((item) => {
    const listItem = navigationItemTemplate.content.firstElementChild.cloneNode(true);
    const link = listItem.querySelector('a');
    link.href = item.href;
    link.textContent = item.label;
    if (item.download) link.download = item.download;
    navigationList.append(listItem);
  });

  const links = [...navigationList.querySelectorAll('a')];

  const openSelection = (value) => {
    const link = links[Number(value) - 1];
    if (link) link.click();
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    openSelection(input.value);
  });

  input.focus();
})();
