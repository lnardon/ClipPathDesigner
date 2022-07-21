const drawArea = document.getElementsByClassName("clipPathDiv")[0];
let currentNode = { id: 0 };
let currentPath = "50% 0%, 0% 100%, 100% 100%";
let nodeList = [];

document
  .getElementsByClassName("handles")[0]
  .addEventListener("dragover", (evt) => {
    dropHandle(evt);
  });

function addNode() {
  let div = document.createElement("div");
  div.setAttribute("draggable", true);
  div.setAttribute("ondrag", "drag(event)");
  div.setAttribute("drop", "dropHandle(event)");
  div.setAttribute("class", `handle ${nodeList.length}`);
  document.getElementsByClassName("handles")[0].append(div);
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

function drag(e) {
  let t = drawArea.getBoundingClientRect();
  document.getElementsByClassName(
    "box"
  )[0].style.clipPath = `polygon(${Mapalizer(
    e.clientX,
    t.left,
    t.left + t.width,
    0,
    100,
    0
  )}% ${Mapalizer(
    e.clientY,
    t.top,
    t.top + t.height,
    0,
    100,
    0
  )}%, 0% 100%, 100% 100%)`;
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
  console.log(e.clientY);
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
