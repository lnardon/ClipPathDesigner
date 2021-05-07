const drawArea = document.getElementsByClassName("clipPathDiv")[0];
let currentNode = { id: 1 };
let currentPath = "50% 0%, 0% 100%, 100% 100%";
let nodeList = [];

function addNode() {
  let div = document.createElement("div");
  div.className = `handle ${nodeList.length}`;
  div.setAttribute("nodeId", nodeList.length);
  div.setAttribute("draggable", true);
  div.setAttribute("ondragstart", "startDrag()");
  div.setAttribute("ondrop", "dropHandle()");
  document.getElementsByClassName("clipPathDiv")[0].append(div);
  nodeList.push(div);
}

function deleteNode() {
  if (nodeList.length > 1) {
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
  document
    .getElementsByClassName("deviceBtn")[1]
    .classList.remove("btn-active");
  document.getElementsByClassName("deviceBtn")[0].classList.add("btn-active");
}

function mobileVersion() {
  drawArea.style.width = "250px";
  document
    .getElementsByClassName("deviceBtn")[0]
    .classList.remove("btn-active");
  document.getElementsByClassName("deviceBtn")[1].classList.add("btn-active");
}

function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  document.getElementsByClassName("handle")[0].style.marginLeft = "200px";
}
