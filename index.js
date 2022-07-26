const drawArea = document.getElementsByClassName("clipPathDiv")[0];
const t = drawArea.getBoundingClientRect();
let currentNode = { id: 0 };
let currentPath = "50% 0%, 0% 100%, 100% 100%";
let nodeList = [{ id: 0 }, { id: 1 }, { id: 2 }];

function addNode() {
  let uuid = Math.pow(Date.now() * Math.random(), Math.random());
  let div = document.createElement("div");
  div.setAttribute("draggable", true);
  div.setAttribute("ondrag", "drag(event)");
  div.setAttribute("class", `handle ${uuid}`);
  div.setAttribute("style", "top:50%; left:50%");
  nodeList.push({ id: uuid });
  currentNode = { id: uuid };
  document.getElementsByClassName("handles")[0].append(div);
  generatePath({ clientX: window.innerWidth, clientY: window.innerHeight });
}

function deleteNode(e) {
  if (nodeList.length > 3) {
    nodeList.splice(currentNode.id, 1);
    document.getElementsByClassName(`handle ${currentNode.id}`)[0].remove();
    generatePath(e);
  } else {
    alert("At least 3 handles should be present");
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
  currentNode = {
    id: e.target.classList[1],
  };
  generatePath({
    target: e.target,
    x: e.clientX,
    y: e.clientY,
  });
}

function getConvertedPosition(e, axis) {
  if (axis === "X") {
    if (e.x >= t.left && e.x < t.right) {
      return e.x;
    } else {
      if (e.x <= t.left) {
        return t.left;
      }
      if (e.x >= t.right) {
        return t.right;
      }
    }
  } else {
    if (e.y >= t.top && e.y < t.bottom) {
      return e.y;
    } else {
      if (e.y < t.top) {
        return t.top;
      }
      if (e.y > t.bottom) {
        return t.bottom;
      }
    }
  }
}

function generatePath(e) {
  if (e.x !== 0 && e.y !== 0) {
    let nodes = currentPath.split(",");
    for (const i in nodeList) {
      if (nodeList[i].id == e.target.classList[1]) {
        nodes[i] = `${Mapalizer(
          getConvertedPosition(e, "X"),
          t.left,
          t.right,
          0,
          100,
          1
        )}% ${Mapalizer(
          getConvertedPosition(e, "Y"),
          t.top,
          t.bottom,
          0,
          100,
          1
        )}%`;
        let updatedPath = nodes.join(",");
        document.getElementsByClassName(
          "box"
        )[0].style.clipPath = `polygon(${updatedPath})`;
        currentPath = updatedPath;
      }
    }
    document.getElementsByClassName(
      `handle ${currentNode.id}`
    )[0].style.left = `${Mapalizer(
      getConvertedPosition(e, "X"),
      t.left,
      t.right,
      0,
      100,
      0
    )}%`;
    document.getElementsByClassName(
      `handle ${currentNode.id}`
    )[0].style.top = `${Mapalizer(
      getConvertedPosition(e, "Y"),
      t.top,
      t.bottom,
      0,
      100,
      0
    )}%`;
  }
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
