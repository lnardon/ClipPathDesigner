let currentNode = { id: 1 };
let nodeList = [];
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

function copyCSS() {}

function webVersion() {}

function mobileVersion() {}
