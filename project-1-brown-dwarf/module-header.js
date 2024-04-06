function appendContent(selectorPath = "", contentAppend = "") {
  const textNode = document.createTextNode(contentAppend);
  selectorPath.textContent = "";
  selectorPath.appendChild(textNode);
}

function createProjectHeader() {
  // project <title>, the text on tab bar
  const projectTitlePath = document.querySelector("head > title");
  const projectTitleName = "การจำแนกดาวแคระน้ำตาลด้วย Machine Learning";
  appendContent(selectorPath = projectTitlePath, contentAppend = projectTitleName);
  
  // project breadcrumbs <h1>, the text on top of every project page
  const projectHeaderPath = document.querySelector("#main > div > div > h1");
  const projectHeaderName = "LAB-1: การจำแนกดาวแคระน้ำตาลด้วย Random Forest";
  appendContent(selectorPath = projectHeaderPath, contentAppend = projectHeaderName);
}

createProjectHeader();