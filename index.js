let currentNode = { id: 1 };
let currentPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
let nodeList = [];
let drawArea = document.getElementsByClassName("clipPathDiv")[0];
let drawAreaWidth = document
  .getElementsByClassName("clipPathDiv")[0]
  .getBoundingClientRect().width;
let drawAreaHeight = document
  .getElementsByClassName("clipPathDiv")[0]
  .getBoundingClientRect().height;

function addNode() {
  let div = document.createElement("div");
  div.className = `handle ${nodeList.length}`;
  div.setAttribute("nodeId", nodeList.length);
  document.getElementsByClassName("clipPathDiv")[0].append(div);
  nodeList.push(div);
}

function deleteNode() {
  if (currentNode) {
    nodeList.splice(currentNode.id, 1);
    document.getElementsByClassName(`handle ${currentNode.id}`)[0].remove();
  }
}

function copyCSS() {
  const input = document.createElement("textarea");
  input.innerHTML = `clip-path: ${currentPath}`;
  document.body.appendChild(input);
  input.select();
  const result = document.execCommand("copy");
  document.body.removeChild(input);
}

function webVersion() {
  drawArea.style.width = "600px";
}

function mobileVersion() {
  drawArea.style.width = "250px";
}
