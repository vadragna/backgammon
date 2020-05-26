(function () {
  let columns = $(".column");
  let destinationColumn;
  let random;
  let moves = [];
  let currentPlayer = "red";

  function clearDice() {
    if (currentPlayer == "red" && moves.length == 1) {
      $(".dice.first").children().removeClass("black");
    } else if (currentPlayer == "red" && moves.length == 0) {
      $(".dice.second").children().removeClass("black");
    }
    if (currentPlayer == "white" && moves.length == 1) {
      $(".dice.third").children().removeClass("black");
    } else if (currentPlayer == "white" && moves.length == 0) {
      $(".dice.fourth").children().removeClass("black");
    }
  }

  function moveCoin(e, player, opponent, type) {
    if (moves.length >= 1) {
      for (let i = 0; i <= 24; i++) {
        if (columns[i] == e.currentTarget) {
          let targetColumn = $(columns[i]).eq(0).children();
          for (let x = targetColumn.length - 1; x >= 0; x--) {
            if (targetColumn.eq(x).hasClass(player)) {
              if (player === "red") {
                destinationColumn = $(columns[i - moves[0]])
                  .eq(0)
                  .children();
              } else {
                destinationColumn = $(columns[i + moves[0]])
                  .eq(0)
                  .children();
              }
              if (
                destinationColumn.eq(0).hasClass(opponent) &&
                destinationColumn.eq(1).hasClass(opponent)
              ) {
                return;
              }
              if (type == "add") {
                targetColumn.eq(x).removeClass(player);
                moves.shift();
                clearDice();
              }
              if (
                destinationColumn.eq(0).hasClass(opponent) &&
                !destinationColumn.eq(1).hasClass(opponent) &&
                type === "add"
              ) {
                console.log("eat the coin");
                destinationColumn.eq(0).removeClass(opponent);
                destinationColumn.eq(1).removeClass("yellow");
                console.log(columns.eq(0).children());
                for (let i = 0; i < columns.eq(0).children().length; i++) {
                  if (
                    !columns.eq(0).children().eq(i).hasClass(player) &&
                    !columns.eq(0).children().eq(i).hasClass(opponent)
                  ) {
                    columns.eq(0).children().eq(i).addClass(opponent);
                    break;
                  }
                }
              }

              for (let y = 0; y <= destinationColumn.length; y++) {
                if (
                  !destinationColumn.eq(y).hasClass(player) &&
                  !destinationColumn.eq(y).hasClass(opponent)
                ) {
                  console.log("type", type);
                  if (type === "add") {
                    destinationColumn.eq(y).removeClass("yellow");
                    destinationColumn.eq(y).addClass(player);
                  } else if (type === "over") {
                    destinationColumn.eq(y).addClass("yellow");
                  } else if (type === "out") {
                    destinationColumn.eq(y).removeClass("yellow");
                  }
                  console.log("y", y, "x", x);
                  break;
                }
              }
              break;
            }
          }
          if (type == "add") {
            if (moves.length == 0) {
              if (currentPlayer == "red") {
                currentPlayer = "white";
              } else {
                currentPlayer = "red";
              }
            }
          }
        }
      }
    } else {
      return;
    }
  }

  function rollTheDice(dice) {
    if (moves.length >= 2) {
      return;
    }
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
    for (let i = 0; i < $(".dice.second").children().length; i++) {
      if (
        currentPlayer == "red" &&
        $(".dice.second").children().eq(i).hasClass("black")
      ) {
        return;
      }
    }
    if (currentPlayer === "red") {
      rollTheDice("first");
      rollTheDice("second");
    } else {
      for (let i = 0; i < $(".dice.fourth").children().length; i++) {
        if (
          currentPlayer == "red" &&
          $(".dice.fourth").children().eq(i).hasClass("black")
        ) {
          return;
        }
      }
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
      moveCoin(e, "red", "white", "add");
    } else {
      moveCoin(e, "white", "red", "add");
    }
  });

  columns.on("mouseover", function (e) {
    if (currentPlayer === "red") {
      moveCoin(e, "red", "white", "over");
    } else {
      moveCoin(e, "white", "red", "over");
    }
    console.log("destination column", destinationColumn);
  });

  columns.on("mouseleave", function (e) {
    console.log("mouseout");
    if (currentPlayer === "red") {
      moveCoin(e, "red", "white", "out");
    } else {
      moveCoin(e, "white", "red", "out");
    }
  });
})();
