function appendContent(selectorPath = "", contentAppend = "") {
  const textNode = document.createTextNode(contentAppend);
  selectorPath.textContent = "";
  selectorPath.appendChild(textNode);
}

function createProjectHeader() {
  // project <title>, the text on tab bar
  const projectTitlePath = document.querySelector("head > title");
  const projectTitleName = "การวิเคราะห์ความสัมพันธ์ระหว่างตัวแปรของหลุมดำด้วย Orthogonal distance regression";
  appendContent(selectorPath = projectTitlePath, contentAppend = projectTitleName);
  
  // project breadcrumbs <h1>, the text on top of every project page
  const projectHeaderPath = document.querySelector("#main > div > div > h1");
  const projectHeaderName = "LAB-3: การวิเคราะห์ความสัมพันธ์ระหว่างตัวแปรของหลุมดำด้วย Orthogonal distance regression";
  appendContent(selectorPath = projectHeaderPath, contentAppend = projectHeaderName);
}

createProjectHeader();

// moduleNameObject
function objectiveGenerateContent() {
  let moduleNumber = 1;
  for (const currentModule of Object.keys(moduleNameObject)) {
    const ulArticle = document.querySelector(`#article-module-${moduleNumber} > ul`);
    ulArticle.textContent = "";
    
    const fragment = document.createDocumentFragment();
    const listModule = moduleNameObject[currentModule];            
    
    listModule.forEach((moduleChapter) => {
      const link = document.createElement("a");
      link.setAttribute("href", moduleChapter[0]);
//      link.setAttribute("target", "_blank");
      link.appendChild(document.createTextNode(moduleChapter[1]));
  
      const li = document.createElement("li");
      li.appendChild(link);
      fragment.appendChild(li);
    });
    
    ulArticle.appendChild(fragment);
    moduleNumber++;
  }
}

function createBottonCopyCode() {
  const selectPre = document.querySelectorAll("pre");
  
  selectPre.forEach(thisPre => {
    let codeText = thisPre.textContent; // text of <pre>, which is <code>
    codeText = codeText.replace(/^\s+|\s+$/g, "");  // remove line break at beginning and ending
    const createButton = Object.assign(document.createElement("button"), {
      type: "button"
    });
    createButton.textContent = "Copy";
    createButton.addEventListener("click", () => {
      navigator.clipboard.writeText(codeText);  // very tricky, careful for bug in the future
    })
    thisPre.insertBefore(createButton, thisPre.firstChild);
  });
}

// module list handling
const modulePath = window.location.pathname;
const modulePage = modulePath.split("/").pop();
const moduleNameIndex = modulePage.indexOf(".html");
const moduleName = modulePage.slice(0, moduleNameIndex);

if (moduleName === "objective") {
  objectiveGenerateContent();
} else {
  createBottonCopyCode();
}