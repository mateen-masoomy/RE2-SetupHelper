(function () {
  const grid = document.querySelector(".grid");
  for (let col = 20; col > 0; col--) {
    for (let row = 20; row > 0; row--) {
      const div = document.createElement("div");
      div.id = "cell_" + col + "x" + row;
      div.classList.add("grid-cell");
      grid.appendChild(div);
    }
  }
})();
