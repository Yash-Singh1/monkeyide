var ide = {};

ide.name = 'monkeyide';
ide.version = '1.1.0';
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

/**
 * Create a new tab
 * @param {string} tabName The name of the new tab
 * @param {Object} configGiven The configuration for the new tab
 */
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
    configuration: configGiven
  });
  this.openTab(tabsCurrentTotalAdded);
  this.totalTabs += 1;
};

/**
 * Get the code for a certain index's tab
 * @param {number} index The tab index to remove
 */
ide.getCodeByTab = function getCodeByTab(index) {
  return this.files[index].mirror.getValue();
};

/**
 * Get a list of all the tabs
 */
ide.getTabs = function getTabs() {
  return this.files;
};

/**
 * Get information on a certain tab
 * @param {number} id The index of the tab
 */
ide.getTab = function getTab(index) {
  return this.files[index];
};

/**
 * Open up a tab
 * @param {number} tabIDGiven The index of the tab to open
 */
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

/**
 * Remove a tab
 * @param {number} indexOfTab The index of the tab to remove
 */
ide.removeTab = function removeTab(indexOfTab) {
  let tabID = 'tab-' + indexOfTab;
  let i;
  let tabContents = document.getElementsByClassName('tabcontent');
  let tabButtons = document.getElementsByClassName('buttonsFortab');
  for (i = 0; i < tabContents.length; i++) {
    let element = tabContents[i];
    if (element.id == tabID) {
      delete tabContents[i];
    }
  }
  tabContents = [...tabContents].filter((content) => content !== undefined);
  for (i = 0; i < tabButtons.length; i++) {
    let element = tabButtons[i];
    if (element.id == tabID.substring(4)) {
      delete tabButtons[i];
    }
  }
  tabButtons = [...tabButtons].filter((button) => button !== undefined);
  for (i = 0; i < tabContents.length; i++) {
    let element = tabContents[i];
    element.id = 'tab-' + i;
  }
  for (i = 0; i < tabButtons.length; i++) {
    let element = tabButtons[i];
    element.id = i;
  }
  this.openTab(0);
  this.files = this.files.filter((value, index) => index != indexOfTab);
  this.totalTabs -= 1;
};

/**
 * Remove all tabs
 */
ide.removeAll = function removeAll() {
  while (this.totalTabs !== 0) {
    this.removeTab(0);
  }
};

/**
 * Pack up all the tabs so they can be reused
 * @param {Array<{ name: string, configuration: Object }>} obj The files to pack up, usually the ide.files
 */
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
      configuration: element.configuration
    });
  }
  return returnedList;
};

/**
 * Rename a tab
 * @param {number} index The index of the tab to rename
 * @param {string} newName The new name for the tab
 */
ide.renameTab = function renameTab(index, newName) {
  let tabButtons = document.getElementsByClassName('buttonsFortab');
  for (const tabButton of tabButtons) {
    if (tabButton == index) {
      tabButton.innerHTML = newName;
    }
  }
  this.files[index].name = newName;
};

/**
 * Create multiple tabs
 * @param {Array<{ name: string, configuration: Object }>} lst The tabs to create
 */
ide.large = function large(lst) {
  for (let i = 0; i < lst.length; i++) {
    let element = lst[i];
    this.createTab(element.name, element.configuration);
  }
  this.openTab(0);
};
