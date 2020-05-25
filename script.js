(function () {
  let columns = $(".column");
  let destinationColumn;
  let random;
  let moves = [];
  let currentPlayer = "red";
  console.log("columns", columns);

  function moveCoin(e, player, opponent) {
    console.log("e.currentTarget", $(e.currentTarget), "e.target", $(e.target));
    for (let i = 0; i <= 24; i++) {
      if (columns[i] == e.currentTarget) {
        let targetColumn = $(columns[i]).eq(0).children();
        console.log("targetColumn", targetColumn);
        for (let x = targetColumn.length - 1; x >= 0; x--) {
          if (targetColumn.eq(x).hasClass(player)) {
            console.log(targetColumn.eq(x).hasClass(player));
            targetColumn.eq(x).removeClass(player);
            if (player === "red") {
              destinationColumn = $(columns[i - moves[0]])
                .eq(0)
                .children();
            } else {
              destinationColumn = $(columns[i + moves[0]])
                .eq(0)
                .children();
            }
            moves.shift();
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

  function rollTheDice(dice) {
    random = Math.floor(Math.random() * 6) + 1;
    let diceSlots = $(".dice." + dice).children();
    console.log(dice, diceSlots);

    console.log("random", random);
    if (random === 1) {
      diceSlots.eq(4).addClass("black");
    }
    if (random === 2) {
      diceSlots.eq(1).addClass("black");
      diceSlots.eq(7).addClass("black");
    }
    if (random === 3) {
      diceSlots.eq(1).addClass("black");
      diceSlots.eq(4).addClass("black");
      diceSlots.eq(7).addClass("black");
    }
    if (random === 4) {
      diceSlots.eq(0).addClass("black");
      diceSlots.eq(2).addClass("black");
      diceSlots.eq(6).addClass("black");
      diceSlots.eq(8).addClass("black");
    }
    if (random === 5) {
      diceSlots.eq(0).addClass("black");
      diceSlots.eq(2).addClass("black");
      diceSlots.eq(4).addClass("black");
      diceSlots.eq(6).addClass("black");
      diceSlots.eq(8).addClass("black");
    }
    if (random === 6) {
      diceSlots.eq(0).addClass("black");
      diceSlots.eq(2).addClass("black");
      diceSlots.eq(3).addClass("black");
      diceSlots.eq(5).addClass("black");
      diceSlots.eq(6).addClass("black");
      diceSlots.eq(8).addClass("black");
    }
    moves.push(random);
  }

  $("#roll").on("click", function () {
    if (currentPlayer === "red") {
      rollTheDice("first");
      rollTheDice("second");
    } else {
      rollTheDice("third");
      rollTheDice("fourth");
    }
  });

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
    if (currentPlayer === "red") {
      moveCoin(e, "red", "white");
    } else {
      moveCoin(e, "white", "red");
    }
  });
})();
