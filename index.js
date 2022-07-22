const drawArea = document.getElementsByClassName("clipPathDiv")[0];
let currentNode = { id: 0 };
let currentPath = "50% 0%, 0% 100%, 100% 100%";
let nodeList = [{ id: 0 }, { id: 1 }, { id: 2 }];

document
  .getElementsByClassName("handles")[0]
  .addEventListener("dragover", (evt) => {
    dropHandle(evt);
  });

function addNode() {
  let div = document.createElement("div");
  div.setAttribute("draggable", true);
  div.setAttribute("ondrag", "drag(event)");
  div.setAttribute("class", `handle ${nodeList.length}`);
  document.getElementsByClassName("handles")[0].append(div);
  nodeList.push(div);
  let t = drawArea.getBoundingClientRect();
  generatePath({ clientX: 0, clientY: 0 }, t);
}

function deleteNode() {
  if (nodeList.length > 1) {
    nodeList.splice(currentNode.id, 1);
    document.getElementsByClassName(`handle ${currentNode.id}`)[0].remove();
  }
}

function copyCSS() {
  const input = document.createElement("textarea");
  input.innerHTML = `clip-path: polygon(${currentPath})`;
  document.body.appendChild(input);
  input.select();
  const result = document.execCommand("copy");
  document.body.removeChild(input);
  alert("CSS Clip-path property copied successfully to your clipboard.");
}

function webVersion() {
  drawArea.style.width = "100%";
  document
    .getElementsByClassName("deviceBtn")[1]
    .classList.remove("btn-active");
  document.getElementsByClassName("deviceBtn")[0].classList.add("btn-active");
}

function mobileVersion() {
  drawArea.style.width = "40%";
  document
    .getElementsByClassName("deviceBtn")[0]
    .classList.remove("btn-active");
  document.getElementsByClassName("deviceBtn")[1].classList.add("btn-active");
}

function drag(e) {
  currentNode = { id: e.target.classList[1] };
  let t = drawArea.getBoundingClientRect();
  generatePath(e, t);
}

function dropHandle(e) {
  e.preventDefault();
  let t = drawArea.getBoundingClientRect();
  document.getElementsByClassName(
    `handle ${currentNode.id}`
  )[0].style.left = `${Mapalizer(
    e.clientX,
    t.left,
    t.left + t.width,
    0,
    100,
    1
  )}%`;
  document.getElementsByClassName(
    `handle ${currentNode.id}`
  )[0].style.top = `${Mapalizer(
    e.clientY,
    t.top,
    t.top + t.height,
    0,
    100,
    1
  )}%`;
}

function generatePath(e, t) {
  let nodes = currentPath.split(",");
  nodes[e.target.classList[1]] = `${Mapalizer(
    e.clientX,
    t.left,
    t.left + t.width,
    0,
    100,
    1
  )}% ${Mapalizer(e.clientY, t.top, t.top + t.height, 0, 100, 1)}%`;
  let updatedPath = nodes.join(",");
  document.getElementsByClassName(
    "box"
  )[0].style.clipPath = `polygon(${updatedPath})`;
  currentPath = updatedPath;
}

// HELPER
function Mapalizer(
  value,
  initalBaseVal,
  finalBaseVal,
  initalTargetVal,
  finalTargetVal,
  precision
) {
  let result = 0;
  result =
    ((value - initalBaseVal) / (finalBaseVal - initalBaseVal)) *
      (finalTargetVal - initalTargetVal) +
    initalTargetVal;

  if (precision !== 0) {
    result = parseFloat(result.toFixed(precision));
  }
  return result;
}
