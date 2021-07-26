var board = [
  [" "," "," "],
  [" "," "," "],
  [" "," "," "]
];
var AllWinPattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],];
//1 = player 1, player / 2 = player 2, Bot
var turn = "2";
var player1 = 'Player 1';
var player2 = 'Player 2';
var Bot = false;
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

function evaluate(Board) {
  if (CheckWin("2")) {
    return 10;
  } else if (CheckWin("1")) {
    return -10;
  } else {
    return 0;
  }
}

function minimax(Board, depth, max) {
  let score = evaluate(board);
  if (score != 0 || BoardFull()) {return score}
  if (max) {
    let best = -100;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        alert();
        if (Board[i][j] == " ") {
          Board[i][j] = "2";
          best = Math.max(best, minimax(Board, depth+1, !max));
          Board[i][j] = " ";
        }
      }
    } return best
  } else {
    let best = 100;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        alert(Board[i][j]);
        if (Board[i][j] == " ") {
          Board[i][j] = "1";
          best = Math.min(best, minimax(Board, depth+1, !max));
          Board[i][j] = " ";
        }
      }
    } return best
  }
}

function BestMove(Board) {
  let best_value = -100;
  let best_move = [-1,-1];
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (Board[i][j] == " ") {
        Board = "2";
        let move_value = minimax(Board, 0, false);
        Board[i][j] = " ";
        if (move_value > best_move) {
          best_move = [i, j];
          best_value = move_value;
        }
      }
    }
  }Move(best_move[0], best_move[1], "2");
}

function Reset() {
  location.reload();
}

function Move(row, col, turn) {
  cell = document.getElementById("cell_"+(3*row+col));
  if (turn == "1") {
    cell.style.background = "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)";
  } else if (turn == "2") {
    cell.style.background = "linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%)";
  }
  board[row][col] = turn;
  win = CheckWin(turn);
  filled = BoardFull();
  if (win) {
    turn = (turn = '1') ? player1:player2;
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
  document.getElementById("Mode").disabled = true;  
  if (board[row][col] == " ") {
    Move(row, col, turn);
  }
  if (Bot) {
    BestMove(board);
  } else {
    turn = turn_dict.get(turn);
  }
}
function ChangeMode(Mode) {
  if (Mode == 'AI') {
    document.getElementById("Mode").setAttribute("onclick", "javascript: ChangeMode('Player');")
    document.getElementById("Mode").innerHTML = 'AI';
    document.getElementById("P1").innerHTML = 'Player';
    document.getElementById("P2").innerHTML = 'AI';
    Bot = true;
    player1 = 'Player';
    player2 = 'Agent A';
  } else if (Mode == 'Player') {
    document.getElementById("Mode").setAttribute("onclick", "javascript: ChangeMode('AI');")
    document.getElementById("Mode").innerHTML = 'Player';
    document.getElementById("P1").innerHTML = 'Player 1';
    document.getElementById("P2").innerHTML = 'Player 2';
    Bot = false;
    player1 = 'Player 1';
    player2 = 'Player 2';
  }
}