var ide = {};

ide.name = "monkeyide";
ide.version = "1.0.0";
ide.license = "MIT";
ide.buttonsBar = document.createElement("div");
ide.buttonsBar.className = "tabbuttons";
ide.files = [];
ide.totalTabs = 0;
ide.limit = "infinity";
document.body.appendChild(ide.buttonsBar);
ide.tabsElements = document.createElement("div");
ide.tabsElements.id = "tabs";
document.body.appendChild(ide.tabsElements);

ide.removeElement = function (array, index) {
  let returnedArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i !== index) {
      returnedArray.push(array[i]);
    }
  }
  return returnedArray;
};

ide.createTab = function (string, configGiven) {
  if (typeof this.limit === "number" && this.totalTabs >= this.limit) {
    return;
  }
  let i;
  let newTabDiv = document.createElement("div");
  newTabDiv.innerHTML = '<textarea id="textarea"></textarea>';
  newTabDiv.className = "tabcontent";
  for (i = 0; i < document.querySelectorAll(".tabcontent").length; i++) {
    let element = document.querySelectorAll(".tabcontent")[i];
    element.style.display = "none";
  }
  newTabDiv.style.display = "block";
  tabsCurrentTotalAdded = document.getElementById("tabs").childElementCount;
  newTabDiv.id = "tab-" + tabsCurrentTotalAdded;
  document.getElementById("tabs").appendChild(newTabDiv);
  let newTabButton = document.createElement("button");
  newTabButton.id = tabsCurrentTotalAdded;
  newTabButton.className = "buttonsFortab";
  newTabButton.onclick = function (event) {
    ide.openTab(event.target.id);
  };
  newTabButton.innerHTML = string;
  document.querySelector(".tabbuttons").appendChild(newTabButton);
  this.files.push({
    mirror: CodeMirror.fromTextArea(
      document.querySelectorAll(
        "#tab-" + tabsCurrentTotalAdded + " textarea"
      )[0],
      configGiven
    ),
    name: string,
    configuration: configGiven,
  });
  this.openTab(tabsCurrentTotalAdded);
  this.totalTabs += 1;
};

ide.getCodeByTab = function (index) {
  return ide.files[index].mirror.getValue();
};

ide.getTabs = function () {
  return ide.files;
};

ide.getTab = function (id) {
  return ide.files[id];
};

ide.openTab = function (tabIDGiven) {
  let tabID = "tab-" + tabIDGiven;
  let i;
  let tabContents = document.getElementsByClassName("tabcontent");
  let tabButtons = document.getElementsByClassName("buttonsFortab");
  for (i = 0; i < tabContents.length; i++) {
    let element = tabContents[i];
    if (element.id == tabID) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
  for (i = 0; i < tabButtons.length; i++) {
    let element = tabButtons[i];
    if (element.id == tabID.substring(4)) {
      element.style.backgroundColor = "grey";
    } else {
      element.style.backgroundColor = "white";
    }
  }
  ide.currentTab = tabIDGiven;
};

ide.removeTab = function (id) {
  let tabID = "tab-" + id;
  let i;
  let tabContents = document.getElementsByClassName("tabcontent");
  let tabButtons = document.getElementsByClassName("buttonsFortab");
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
    element.id = "tab-" + i;
  }
  for (i = 0; i < tabButtons.length; i++) {
    let element = tabButtons[i];
    element.id = i;
  }
  ide.openTab(0);
  ide.files = this.removeElement(ide.files, id);
  this.totalTabs -= 1;
};
