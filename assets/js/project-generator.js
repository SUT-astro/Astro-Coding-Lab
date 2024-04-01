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
      link.setAttribute("target", "_blank");
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
  
  selectPre.forEach((thisPre) => {
    const codeRaw = thisPre.textContent; // text of <pre>, which is <code>
    const codeText = codeRaw.replace(/^\s+|\s+$/g, "");  // remove line break at beginning and ending
    const createButton = Object.assign(document.createElement("button"), {
      type: "button"
    });
    createButton.textContent = "Copy";
    createButton.classList.add("code-button");
    createButton.addEventListener("click", () => {
      navigator.clipboard.writeText(codeText);
    })
    thisPre.insertBefore(createButton, thisPre.firstChild);
  });
}

function chapterSectionButton() {
  const sectionButtonSelector = document.querySelector("#main > section > div > div > section");
  sectionButtonSelector.textContent = "";
  
  const moduleList = [];
  const moduleNameKeys = Object.keys(moduleNameObject);
  moduleNameKeys.forEach((i) => {
    const j = moduleNameObject[i];
    j.forEach((k) => {
      moduleList.push(k[0]);
    });
  });
  const indexModule = moduleList.indexOf(modulePage);
  
  const fragment = document.createDocumentFragment();
  
  const buttonElementList = ["&lt; &lt;<br>Previous", "สารบัญ", "&gt; &gt;<br>Next"]
  
  for (let i = 0; i < buttonElementList.length; i++) {
    const createButtonChapter = document.createElement("button");
    createButtonChapter.innerHTML = buttonElementList[i];
    
    const linkButton = document.createElement("a");
    if (i === 1) {
      linkButton.setAttribute("href", "objective.html");
    } else if (i === 0) {
      console.log(indexModule);
      if (indexModule === 0) {
        linkButton.setAttribute("href", "");
      } else {
        linkButton.setAttribute("href", moduleList[indexModule - 1]);
      }
    } else {
      if (indexModule === moduleList.length - 1) {
        linkButton.setAttribute("href", "");
      } else {
        linkButton.setAttribute("href", moduleList[indexModule + 1]);
      }
    }
    linkButton.appendChild(createButtonChapter);
    fragment.appendChild(linkButton);
  }
  sectionButtonSelector.appendChild(fragment);
}

// module list handling
const modulePath = window.location.pathname;
const modulePage = modulePath.split("/").pop();
const moduleNameIndex = modulePage.indexOf(".html");
const moduleName = modulePage.slice(0, moduleNameIndex);

if (moduleName === "objective") {
  objectiveGenerateContent();
} else if (moduleName.slice(0, 6) === "module") {
  createBottonCopyCode();
  chapterSectionButton()
}