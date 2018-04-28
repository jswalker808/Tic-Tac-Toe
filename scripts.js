document.body.onload = function () {
  let tds = document.body.querySelectorAll("td");
  let playerTurn = 0;
  let xPath = "images/cross.png"
  let oPath = "images/cir.png"
  let p1Score = document.body.querySelector(".p1score");
  let p2Score = document.body.querySelector(".p2score");
  let possiblePaths = [
    [[1,2], [4,8], [3,6]],//0
    [[0,2], [4,7]],//1
    [[0,1], [4,6], [5,8]],//2
    [[0,6], [4,5]],//3
    [[0,8], [1,7], [2,6], [3,5]],//4
    [[2,8], [3,4]],//5
    [[0,3], [2,4], [7,8]],//6
    [[6,8], [1,4]],//7
    [[0,4], [2,5], [6,7]]//8
  ];

  function loadX() {
    for (let i = 0; i < tds.length; i++) {
      tds[i].addEventListener("click", function(){
        if (tds[i].selected != true) {
          if (playerTurn % 2 === 0) {
            createSymbol(tds[i], xPath);
            tds[i].symbol = "x";
          }
          else {
            createSymbol(tds[i], oPath);
            tds[i].symbol = "o";
          }
          tds[i].selected = true;
          if (threeInRow(i)) {
            showWinner();
            setAllToSelected();
          }
          else if (isDraw())
            showDraw();
        }
      });
    }
  }
  function createSymbol(td, path) {
    var x = document.createElement("IMG");
    x.setAttribute("src", path);
    x.setAttribute("width", "100%");
    x.setAttribute("height", "100%");
    x.setAttribute("visibility", "visible");
    playerTurn++;
    td.appendChild(x);
  }
  function threeInRow(index) {
    let counter = 0;
    for (let i = 0; i < possiblePaths[index].length; i++) {
      for (let j = 0; j < possiblePaths[index][i].length; j++) {
        if (tds[possiblePaths[index][i][j]].symbol === tds[index].symbol) {
          counter++;
        }
      }
      if (counter === 2) return true;
      counter = 0;
    }
    return false;
  }
  function showWinner() {
    let winText = document.body.querySelector('.show');
    let playButton = document.body.querySelector(".btn-lg.btn-info.center-block.show");
    if (playerTurn % 2 === 1) {
      winText.innerHTML = "Player 1 wins!";
      addP1Score();
    }
    else {
      winText.innerHTML = "Player 2 wins!";
      addP2Score();
    }
    winText.style.visibility = "visible";
    playButton.style.visibility = "visible";
  }
  function hideWinner() {
    let winText = document.body.querySelector('.show');
    let playButton = document.body.querySelector('.btn-lg.btn-info.center-block.show');
    winText.style.visibility = "hidden";
    playButton.style.visibility = "hidden";
  }
  function loadScore() {
    p1Score.innerHTML = 0;
    p2Score.innerHTML = 0;
  }
  function addP1Score() {
    p1Score.innerHTML++;
  }
  function addP2Score() {
    p2Score.innerHTML++;
  }
  function resetAttributes(index) {
    tds[index].selected = false;
    tds[index].symbol = "";
  }
  function resetBoard() {
    for (let i = 0; i < tds.length; i++) {
      resetAttributes(i);
      if (tds[i].childNodes.length > 0) {
        let child = tds[i].childNodes[0];
        tds[i].removeChild(child);
      }
    }
    hideWinner();
    playerTurn = 0;
  }
  function playAgain(className) {
    let playButton = document.body.querySelector(".btn-lg.btn-info.center-block.show");
    playButton.addEventListener('click', function() {
      resetBoard();
    });

  }
  function resetMatch() {
    let resetButton = document.body.querySelector(".btn.btn-lg.bg-danger.text-white.mx-auto");
    resetButton.addEventListener('click', function() {
      resetBoard();
      loadScore();
    });
  }
  function setAllToSelected() {
    for (let i = 0; i < tds.length; i++)
      tds[i].selected = true;
  }
  function isDraw() {
    for (let i = 0; i < tds.length; i++) {
      console.log(tds[i].selected + " " + i);
      if (tds[i].selected !== true)
        return false;
    }
    console.log(true);
    return true;
  }
  function showDraw() {
    let drawText = document.body.querySelector('.show');
    let playButton = document.body.querySelector(".btn-lg.btn-info.center-block.show");
    drawText.innerHTML = "It's a tie!";
    drawText.style.visibility = "visible";
    playButton.style.visibility = "visible";
  }
  // console.log(tds);
  loadScore();
  loadX();
  playAgain();
  resetMatch();
}
