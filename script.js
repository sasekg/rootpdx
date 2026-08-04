(() => {
  const strings = {
    prompt: 'rootpdx:~$',
    terminalLabel: 'Open a numbered section',
    navigationLabel: 'ROOTPDX sections',
    promptHelp: 'Enter a number from 1 through 5 to open that item. Enter is not required.',
    navigation: [
      { label: '[1] Get To Know Glen Sasek', href: 'https://chatgpt.com/g/g-6a4ed887624881919db62c1d146fca71-get-to-know-glen-sasek' },
      { label: '[2] Thinking', href: '/thinking/' },
      { label: '[3] Working', href: '/working/' },
      { label: '[4] Playing', href: '/playing/' },
      { label: '[5] Contact Glen Sasek', href: '/contact/' }
    ]
  };

  const form = document.getElementById('terminal');
  const input = document.getElementById('selection');
  const navigation = document.getElementById('navigation');
  const navigationList = document.getElementById('navigation-list');
  const navigationItemTemplate = document.getElementById('navigation-item-template');

  document.getElementById('prompt').textContent = strings.prompt;
  document.getElementById('prompt-help').textContent = strings.promptHelp;
  form.setAttribute('aria-label', strings.terminalLabel);
  navigation.setAttribute('aria-label', strings.navigationLabel);

  strings.navigation.forEach((item) => {
    const listItem = navigationItemTemplate.content.firstElementChild.cloneNode(true);
    const link = listItem.querySelector('a');
    link.href = item.href;
    link.textContent = item.label;
    navigationList.append(listItem);
  });

  const links = [...navigationList.querySelectorAll('a')];
  input.pattern = `[1-${links.length}]`;
  input.maxLength = String(links.length).length;

  const openSelection = (value) => {
    const link = links[Number(value) - 1];
    if (link) window.location.assign(link.href);
  };

  input.addEventListener('input', () => openSelection(input.value));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    openSelection(input.value);
  });

  document.addEventListener('keydown', (event) => {
    if (/^[1-5]$/.test(event.key) && document.activeElement !== input) {
      event.preventDefault();
      input.value = event.key;
      openSelection(event.key);
    }
  });
})();
