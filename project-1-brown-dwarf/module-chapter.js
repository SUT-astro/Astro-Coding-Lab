function createProjectHeader() {
  const projectHeaderPath = document.querySelector("#main > div > div > h1");

  const projectHeaderName = "LAB-1: การจำแนกดาวแคระน้ำตาลด้วย Random Forest";  // project title
  
  const projectHeaderText = document.createTextNode(projectHeaderName);
  projectHeaderPath.textContent = "";  //remove existing text
  projectHeaderPath.appendChild(projectHeaderText);  // apply new text
}

const chaptorsNumber = {module1: 3, module2: 5, module3: 4};

const path = window.location.pathname;
const page = path.split("/").pop();
console.log(page);

createProjectHeader();