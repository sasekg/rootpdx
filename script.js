(() => {
  const strings = {
    prompt: 'rootpdx:~$',
    terminalLabel: 'Open a numbered section',
    navigationLabel: 'ROOTPDX sections',
    promptHelp: 'Enter a number from 1 through 5 to open that item.',
    navigation: [
      { label: '[1] Get To Know Glen Sasek', href: 'https://chatgpt.com/g/g-6a4ed887624881919db62c1d146fca71-get-to-know-glen-sasek' },
      { label: '[2] Schedule a Meeting', href: 'https://calendar.app.google/k8yhXzGVT7sTCWCw9' },
      { label: '[3] Call  503-347-6817', href: 'tel:+15033476817' },
      { label: '[4] Email sasekg@gmail.com', href: 'mailto:sasekg@gmail.com' },
      { label: '[5] Add Glen Sasek to Contacts', href: 'glen-sasek.vcf', download: 'glen-sasek.vcf' }
    ]
  };

  const form = document.getElementById('cli-form');
  const input = document.getElementById('cli-command');
  const navigation = document.getElementById('navigation');
  const navigationList = document.getElementById('navigation-list');
  const navigationItemTemplate = document.getElementById('navigation-item-template');

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
  //input.pattern = `[1-${links.length}]`;
  input.maxLength = 100;//String(links.length).length;

  const openSelection = (value) => {
    const link = links[Number(value) - 1];
    if (link) link.click();
  };

  // input.addEventListener('input', () => openSelection(input.value));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    openSelection(input.value);
  });

  // document.addEventListener('keydown', (event) => {
  //   if (/^[1-5]$/.test(event.key) && document.activeElement !== input) {
  //     event.preventDefault();
  //     input.value = event.key;
  //     openSelection(event.key);
  //   }
  // });

  input.focus();
})();
