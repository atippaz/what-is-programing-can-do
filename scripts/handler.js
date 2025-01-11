async function initState() {
  const pencilCanvas = document.getElementById("pencil-canvas");
  pencilCanvas.innerText = "";
  const api = await (
    await fetch("https://what-is-programing-can-do.onrender.com/pencils")
  ).json();
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
      pencilBody.querySelector("div").setAttribute("data-color", colorPencil);
      pencilContainer.appendChild(pencilBody);
    }
    const penclHeadTemplate = document.getElementById("pencil-head-template");
    const pencilHead = penclHeadTemplate.content.cloneNode(true);
    pencilHead.querySelector(".pencil-color").style["border-left-color"] =
      colorPencil;
    pencilHead
      .querySelector(".pencil-head")
      .setAttribute("id", `pencil-head-${colorPencil}`);
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

        const pencilBodies = pencilContainer.querySelectorAll(
          `[data-color="${colorPencil}"]`
        );

        if (color.qty <= 1 || pencilBodies.length === 0) return;

        if (await removeColor(colorPencil)) {
          color.qty -= 1;
          mile.innerText = `pencil ${color.color} long : ${color.qty} m.`;
          pencilBodies[0].remove();
        }
      });

    penclAction
      .querySelector("#plus")
      .addEventListener("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (await addColor(colorPencil)) {
          color.qty += 1;
          mile.innerText = `pencil ${color.color} long : ${color.qty} m.`;

          const pencilBodyTemplate = document.getElementById(
            "pencil-body-template"
          );
          const newPencilBody = pencilBodyTemplate.content.cloneNode(true);
          newPencilBody.querySelector("div").style.backgroundColor =
            colorPencil;
          newPencilBody
            .querySelector("div")
            .setAttribute("data-color", colorPencil);
          const _pencilHead = pencilContainer.querySelector(
            `#pencil-head-${color.color}`
          );
          pencilContainer.removeChild(_pencilHead);
          pencilContainer.insertBefore(
            newPencilBody,
            pencilContainer.lastChild
          );
          pencilContainer.insertBefore(_pencilHead, pencilContainer.lastChild);
          console.log("Added new pencil:", pencilContainer.childNodes);
        }
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
  const result = await fetch(
    `https://what-is-programing-can-do.onrender.com/pencils/${color}`,
    {
      method: "DELETE",
    }
  );
  return result.status === 200;
}
async function addColor(color) {
  const result = await fetch(
    `https://what-is-programing-can-do.onrender.com/pencils/${color}`,
    {
      method: "POST",
    }
  );
  return result.status === 200;
}
// initState();
document.addEventListener("DOMContentLoaded", () => {
  initState();
});
