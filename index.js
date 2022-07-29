let drawArea = document.getElementsByClassName("clipPathDiv")[0];
let areaProps = drawArea.getBoundingClientRect();
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
  document.getElementsByClassName("handles")[0].append(div);
  setActiveNode(uuid, currentNode.id);
  generatePath(
    {
      x: areaProps.left + areaProps.width / 2,
      y: areaProps.top + areaProps.height / 2,
      target: { classList: div.classList },
    },
    nodeList
  );
}

function deleteNode() {
  if (nodeList.length > 3) {
    const el = document.getElementsByClassName(`handle ${currentNode.id}`)[0];
    let newPath = currentPath;
    for (let i = nodeList.length - 1; i >= 0; --i) {
      if (nodeList[i].id == el.classList[1]) {
        let oldPath = currentPath.split(",");
        nodeList.splice(i, 1);
        oldPath.splice(i, 1);
        newPath = oldPath.join(",");
      }
    }
    el.remove();
    document.getElementsByClassName(
      "box"
    )[0].style.clipPath = `polygon(${newPath})`;
    currentPath = newPath;
    setActiveNode(nodeList[0].id, el.classList[1]);
  } else {
    alert("At least 3 nodes should be present.");
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

function landscapeVersion() {
  drawArea.style.width = "100%";
  document
    .getElementsByClassName("deviceBtn")[1]
    .classList.remove("btn-active");
  document.getElementsByClassName("deviceBtn")[0].classList.add("btn-active");
  // Wait for the CSS animation to end so the new area props can be set.
  setTimeout(() => {
    areaProps = document
      .getElementsByClassName("clipPathDiv")[0]
      .getBoundingClientRect();
  }, 500);
}

function portraitVersion() {
  drawArea.style.width = "30%";
  document.getElementsByClassName("deviceBtn")[1].classList.add("btn-active");
  document
    .getElementsByClassName("deviceBtn")[0]
    .classList.remove("btn-active");
  // Wait for the CSS animation to end so the new area props can be set.
  setTimeout(() => {
    areaProps = document
      .getElementsByClassName("clipPathDiv")[0]
      .getBoundingClientRect();
  }, 500);
}

function drag(e) {
  if (currentNode.id !== e.target.classList[1]) {
    setActiveNode(e.target.classList[1], currentNode.id);
  }
  generatePath(
    {
      target: e.target,
      x: e.clientX,
      y: e.clientY,
    },
    nodeList
  );
}

function getConvertedPosition(e, axis) {
  if (axis === "X") {
    if (e.x >= areaProps.left && e.x < areaProps.right) {
      return e.x;
    } else {
      if (e.x <= areaProps.left) {
        return areaProps.left;
      }
      if (e.x >= areaProps.right) {
        return areaProps.right;
      }
    }
  } else {
    if (e.y >= areaProps.top && e.y < areaProps.bottom) {
      return e.y;
    } else {
      if (e.y < areaProps.top) {
        return areaProps.top;
      }
      if (e.y > areaProps.bottom) {
        return areaProps.bottom;
      }
    }
  }
}

function generatePath(e, nodeList) {
  if (e.x !== 0 && e.y !== 0) {
    let nodes = currentPath.split(",");
    let convertedX = Mapalizer(
      getConvertedPosition(e, "X"),
      areaProps.left,
      areaProps.right,
      0,
      100,
      1
    );
    let convertedY = Mapalizer(
      getConvertedPosition(e, "Y"),
      areaProps.top,
      areaProps.bottom,
      0,
      100,
      1
    );
    for (const i in nodeList) {
      if (nodeList[i].id == e.target.classList[1]) {
        nodes[i] = `${convertedX}% ${convertedY}%`;
        let updatedPath = nodes.join(",");
        document.getElementsByClassName(
          "box"
        )[0].style.clipPath = `polygon(${updatedPath})`;
        currentPath = updatedPath;
      }
    }
    document.getElementsByClassName(
      `handle ${currentNode.id}`
    )[0].style.left = `${convertedX}%`;
    document.getElementsByClassName(
      `handle ${currentNode.id}`
    )[0].style.top = `${convertedY}%`;
  }
}

function setActiveNode(id, oldId) {
  let oldEl = document.getElementsByClassName(oldId)[0];
  if (oldEl) oldEl.classList.remove("active");
  document.getElementsByClassName(id)[0].classList.add("active");
  currentNode = { id: id };
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
