(function () {
  let columns = $(".column");
  let destinationColumn;
  console.log("columns", columns);

  function moveCoin(e, player, opponent) {
    console.log("e.currentTarget", $(e.currentTarget), "e.target", $(e.target));
    for (let i = 0; i <= 24; i++) {
      if (columns[i] == e.currentTarget) {
        let targetColumn = $(columns[i]).eq(0).children();
        console.log("targetColumn", targetColumn);
        let random = 1;
        for (let x = targetColumn.length - 1; x >= 0; x--) {
          if (targetColumn.eq(x).hasClass(player)) {
            console.log(targetColumn.eq(x).hasClass(player));
            targetColumn.eq(x).removeClass(player);
            if (player === "red") {
              destinationColumn = $(columns[i - random])
                .eq(0)
                .children();
            } else {
              destinationColumn = $(columns[i + random])
                .eq(0)
                .children();
            }
            for (let y = 0; y <= destinationColumn.length; y++) {
              if (
                !destinationColumn.eq(y).hasClass(player) &&
                !destinationColumn.eq(y).hasClass(opponent)
              ) {
                console.log(destinationColumn.eq(0));
                destinationColumn.eq(y).addClass(player);
                console.log("y", y, "x", x);
                break;
              }
            }
            break;
          }
        }
      }
    }
  }

  for (let i = 0; i <= 4; i++) {
    columns.eq(13).children().eq(i).addClass("white");
    columns.eq(6).children().eq(i).addClass("white");
    columns.eq(12).children().eq(i).addClass("red");
    columns.eq(19).children().eq(i).addClass("red");
  }

  for (let i = 0; i <= 1; i++) {
    columns.eq(1).children().eq(i).addClass("white");
    columns.eq(24).children().eq(i).addClass("red");
  }

  for (let i = 0; i <= 2; i++) {
    columns.eq(17).children().eq(i).addClass("white");
    columns.eq(8).children().eq(i).addClass("red");
  }

  columns.on("click", function (e) {
    moveCoin(e, "red", "white");
    // moveCoin(e, "white", "red");
  });
})();
