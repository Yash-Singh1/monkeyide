var ide = {};

ide.buttonsBar = document.createElement("div");
ide.buttonsBar.className = "tabbuttons";
ide.files = [];
document.body.appendChild(ide.buttonsBar);
ide.tabsElements = document.createElement("div");
ide.tabsElements.id = "tabs";
document.body.appendChild(ide.tabsElements);

ide.createTab = function (string, configGiven) {
  let i;
  let newTabDiv = document.createElement("div");
  newTabDiv.innerHTML = '<textarea id="textarea"></textarea>';
  newTabDiv.className = "tabcontent";
  for (i = 0; i < document.querySelectorAll(".tabcontent").length; i++) {
    let element = document.querySelectorAll(".tabcontent")[i];
    element.style.display = "none";
  }
  newTabDiv.style.display = "block";
  tabsCurrentTotalAdded = document.getElementById("tabs").childElementCount + 1;
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
  ide.files.push({
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
};

ide.getCodeByTab = function (index) {
  return ide.files[index - 1].mirror.getValue();
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
