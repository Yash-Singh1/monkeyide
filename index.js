var ide = {};

ide.name = 'monkeyide';
ide.version = '1.0.0';
ide.license = 'MIT';
ide.buttonsBar = document.createElement('div');
ide.buttonsBar.className = 'tabbuttons';
ide.files = [];
ide.totalTabs = 0;
ide.limit = 'infinity';
document.body.appendChild(ide.buttonsBar);
ide.tabsElements = document.createElement('div');
ide.tabsElements.id = 'tabs';
document.body.appendChild(ide.tabsElements);

ide.createTab = function createTab(tabName, configGiven) {
  if (typeof this.limit === 'number' && this.totalTabs >= this.limit) {
    return;
  }
  let i;
  let newTabDiv = document.createElement('div');
  newTabDiv.innerHTML = '<textarea id="textarea">' + configGiven.value + '</textarea>';
  newTabDiv.classList.add('tabcontent');
  if (typeof configGiven.placeholder != 'undefined') {
    newTabDiv.placeholder = configGiven.placeholder;
  }
  if (typeof configGiven.theme != 'undefined') {
    newTabDiv.classList.add('cm-s-' + configGiven.theme);
    newTabDiv.classList.add('CodeMirror');
  }
  for (i = 0; i < document.querySelectorAll('.tabcontent').length; i++) {
    let element = document.querySelectorAll('.tabcontent')[i];
    element.style.display = 'none';
  }
  newTabDiv.style.display = 'block';
  tabsCurrentTotalAdded = document.getElementById('tabs').childElementCount;
  newTabDiv.id = 'tab-' + tabsCurrentTotalAdded;
  document.getElementById('tabs').appendChild(newTabDiv);
  let newTabButton = document.createElement('button');
  newTabButton.id = tabsCurrentTotalAdded;
  newTabButton.className = 'buttonsFortab';
  newTabButton.onclick = function (event) {
    ide.openTab(event.target.id);
  };
  newTabButton.innerHTML = tabName;
  document.querySelector('.tabbuttons').appendChild(newTabButton);
  this.files.push({
    mirror: CodeMirror.fromTextArea(
      document.querySelectorAll('#tab-' + tabsCurrentTotalAdded + ' textarea')[0],
      configGiven
    ),
    name: tabName,
    configuration: configGiven,
  });
  this.openTab(tabsCurrentTotalAdded);
  this.totalTabs += 1;
};

ide.getCodeByTab = function getCodeByTab(index) {
  return this.files[index].mirror.getValue();
};

ide.getTabs = function getTabs() {
  return this.files;
};

ide.getTab = function getTab(id) {
  return this.files[id];
};

ide.openTab = function openTab(tabIDGiven) {
  let tabID = 'tab-' + tabIDGiven;
  let i;
  let tabContents = document.getElementsByClassName('tabcontent');
  let tabButtons = document.getElementsByClassName('buttonsFortab');
  for (i = 0; i < tabContents.length; i++) {
    let element = tabContents[i];
    if (element.id == tabID) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  }
  for (i = 0; i < tabButtons.length; i++) {
    let element = tabButtons[i];
    if (element.id == tabID.substring(4)) {
      element.style.backgroundColor = 'grey';
    } else {
      element.style.backgroundColor = 'white';
    }
  }
  this.currentTab = tabIDGiven;
};

ide.removeTab = function removeTab(id) {
  let tabID = 'tab-' + id;
  let i;
  let tabContents = document.getElementsByClassName('tabcontent');
  let tabButtons = document.getElementsByClassName('buttonsFortab');
  for (i = 0; i < tabContents.length; i++) {
    let element = tabContents[i];
    if (element.id == tabID) {
      element.remove();
    }
  }
  for (i = 0; i < tabButtons.length; i++) {
    let element = tabButtons[i];
    if (element.id == tabID.substring(4)) {
      element.remove();
    }
  }
  for (i = 0; i < tabContents.length; i++) {
    let element = tabContents[i];
    element.id = 'tab-' + i;
  }
  for (i = 0; i < tabButtons.length; i++) {
    let element = tabButtons[i];
    element.id = i;
  }
  this.openTab(0);
  this.files = this.files.filter((value, index) => index != id);
  this.totalTabs -= 1;
};

ide.removeAll = function removeAll() {
  while (this.totalTabs !== 0) {
    this.removeTab(0);
  }
};

ide.pack = function pack(obj) {
  let returnedList = [];
  for (let i = 0; i < obj.length; i++) {
    let element = obj[i];
    if (typeof element.configuration !== 'object' || element.configuration === undefined) {
      element.configuration = {};
    }
    element.configuration.value = element.mirror.getValue();
    returnedList.push({
      name: element.name,
      configuration: element.configuration,
    });
  }
  return returnedList;
};

ide.large = function large(lst) {
  for (let i = 0; i < lst.length; i++) {
    let element = lst[i];
    this.createTab(element.name, element.configuration);
  }
  this.openTab(0);
};
