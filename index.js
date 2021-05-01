let currentNode;
let nodeList = [];
let drawAreaWidth = document
  .getElementsByClassName("clipPathDiv")[0]
  .getBoundingClientRect().width;
let drawAreaHeight = document
  .getElementsByClassName("clipPathDiv")[0]
  .getBoundingClientRect().height;

function addNode() {
  let div = document.createElement("div");
  div.className = "handle";
  div.setAttribute("nodeId", nodeList.length);
  document.getElementsByClassName("clipPathDiv")[0].append(div);
  nodeList.push(div);
}

function deleteNode(index) {}

function copyCSS() {}

function webVersion() {}

function mobileVersion() {}
