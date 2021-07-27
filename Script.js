var board = [
  [" "," "," "],
  [" "," "," "],
  [" "," "," "]
];
var AllWinPattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],];
//1 = player 1, player / 2 = player 2, Bot
var turn = "1";
//swap player
const turn_dict = new Map();turn_dict.set("1","2");turn_dict.set("2","1");
win = false;
filled = false;

function BoardFull() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == " ") {
        return false;
      }
    }
  } return true;
}

function CheckWin(now_turn) {
  for (const pattern of AllWinPattern) {
    var row_0 = pattern[0] % 3, row_1 = pattern[1] % 3, row_2 = pattern[2] % 3;
    var col_0 = Math.floor(pattern[0] / 3), col_1 = Math.floor(pattern[1] / 3), col_2 = Math.floor(pattern[2] / 3);
    if (board[row_0][col_0] == board[row_1][col_1] && board[row_1][col_1] == board[row_2][col_2] && board[row_2][col_2] == now_turn) {
      return true;
    }
  } return false;
}

function Reset() {
  location.reload();
}

function Move(row, col, turn) {
  board[row][col] = turn;
  win = CheckWin(turn);
  filled = BoardFull();
  if (win) {
    turn = (turn == '1') ? "Player 1":"Player 2";
    document.getElementById("State").innerHTML = turn + " Win!!";
    for (let i = 0; i < 9; i++) {
      document.getElementById("cell_"+i).disabled = true;
    }
  } else if (filled) {
    document.getElementById("State").innerHTML = "Draw";
    for (let i = 0; i < 9; i++) {
      document.getElementById("cell_"+i).disabled = true;
    }
  }
}

function Click(row, col) {
  cell = document.getElementById("cell_"+(3*row+col));
  if (board[row][col] == " ") {
    if (turn == "1") {
      cell.style.background = "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)";
    } else if (turn == "2") {
      cell.style.background = "linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%)";
    }
    Move(row, col, turn);
    cell.disabled = true;
    turn = turn_dict.get(turn);
  }
}
