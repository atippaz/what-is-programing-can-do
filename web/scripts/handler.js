async function initState() {
  const pencilCanvas = document.getElementById("pencil-canvas");
  pencilCanvas.innerText = "";
  const api = await (await fetch("http://localhost:3000/pencils")).json();
  const groupedData = api.reduce((acc, item) => {
    if (acc[item.color]) {
      acc[item.color].qty += item.qty;
    } else {
      acc[item.color] = { color: item.color, qty: item.qty };
    }
    return acc;
  }, {});
  const group = Object.values(groupedData).sort((x, y) => y.qty - x.qty);
  console.log(group);
  const divContainer = document.createElement("div");
  for (const color of group) {
    const pencilContainer = document.createElement("div");
    const pencilAction = document.createElement("div");
    pencilContainer.style.display = "flex";
    const colorPencil = color.color;
    for (let index = 0; index < color.qty; index++) {
      const pencilBodyTemplate = document.getElementById(
        "pencil-body-template"
      );
      const pencilBody = pencilBodyTemplate.content.cloneNode(true);
      pencilBody.querySelector("div").style.backgroundColor = colorPencil;
      pencilContainer.appendChild(pencilBody);
    }
    const penclHeadTemplate = document.getElementById("pencil-head-template");
    const pencilHead = penclHeadTemplate.content.cloneNode(true);
    pencilHead.querySelector(".pencil-color").style["border-left-color"] =
      colorPencil;
    pencilContainer.appendChild(pencilHead);

    const penclActionTemplate = document.getElementById(
      "pencil-action-template"
    );
    const penclAction = penclActionTemplate.content.cloneNode(true);
    penclAction.querySelector("#name").textContent = colorPencil;
    penclAction
      .querySelector("#minus")
      .addEventListener("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (color.qty <= 1) return;
        await removeColor(colorPencil);
      });
    penclAction
      .querySelector("#plus")
      .addEventListener("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();
        await addColor(colorPencil);
      });
    pencilAction.appendChild(penclAction);
    pencilAction.style.marginBottom = "12px";
    pencilAction.style.marginTop = "12px";

    const mile = document.createElement("div");
    mile.innerText = `pencil ${color.color} long : ${color.qty} m.`;
    mile.style.marginTop = "12px";
    divContainer.appendChild(mile);
    divContainer.appendChild(pencilAction);
    divContainer.appendChild(pencilContainer);
  }
  pencilCanvas.appendChild(divContainer);
}
async function removeColor(color) {
  const result = await fetch(`http://localhost:3000/pencils/${color}`, {
    method: "DELETE",
  });
}
async function addColor(color) {
  const result = await fetch(`http://localhost:3000/pencils/${color}`, {
    method: "POST",
  });
}
// initState();
document.addEventListener("DOMContentLoaded", () => {
  initState();
  document.removeEventListener("DOMContentLoaded", () => {
    console.log("remove");
  });
});
