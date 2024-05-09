function appendContent(selectorPath = "", contentAppend = "") {
  const textNode = document.createTextNode(contentAppend);
  selectorPath.textContent = "";
  selectorPath.appendChild(textNode);
}

function createProjectHeader() {
  // project <title>, the text on tab bar
  const projectTitlePath = document.querySelector("head > title");
  const projectTitleName = "การวิเคราะห์ข้อมูล Light Curve ในโดเมนเวลา (Time Series)";
  appendContent(selectorPath = projectTitlePath, contentAppend = projectTitleName);
  
  // project breadcrumbs <h1>, the text on top of every project page
  const projectHeaderPath = document.querySelector("#main > div > div > h1");
  const projectHeaderName = "LAB-1: การวิเคราะห์ข้อมูล Light Curve ในโดเมนเวลา (Time Series)";
  appendContent(selectorPath = projectHeaderPath, contentAppend = projectHeaderName);
}

createProjectHeader();