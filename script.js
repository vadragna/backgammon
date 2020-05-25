(function () {
  let column24 = $(".column.twentyfour");
  let column19 = $(".column.nineteen");
  let column6 = $(".column.six");
  let column1 = $(".column.one").children();

  console.log(column1, column19.children());

  column24.children().eq(0).addClass("red");
  column24.children().eq(1).addClass("red");

  for (let i = 0; i <= 4; i++) {
    column19.children().eq(i).addClass("white");
    column6.children().eq(i).addClass("red");
  }
})();
