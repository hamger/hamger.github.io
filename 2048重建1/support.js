 var documentWidth = window.screen.availWidth
 var gridContainerWidth = documentWidth * 0.92;
 var cellSpace = 0.04 * documentWidth;
 var cellLength = 0.2 * documentWidth;
 if (documentWidth > 500) {
     gridContainerWidth = 500;
     cellSpace = 20;
     cellLength = 100;
 }

 $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
 $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
 $('#grid-container').css('padding', cellSpace);
 $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);

 $('.grid-cell').css('width', cellLength);
 $('.grid-cell').css('height', cellLength);
 $('.grid-cell').css('border-radius', 0.02 * cellLength);

 function getTop(i, j) {
     return cellSpace + i * (cellSpace + cellLength);
 }

 function getLeft(i, j) {
     return cellSpace + j * (cellSpace + cellLength);
 }

 function getBackgroundColor(number) {
     switch (number) {
         case 2:
             return "#eee4da";
             break;
         case 4:
             return "#ede0c8";
             break;
         case 8:
             return "#f2b179";
             break;
         case 16:
             return "#f59563";
             break;
         case 32:
             return "#f67c5f";
             break;
         case 64:
             return "#f65e3b";
             break;
         case 128:
             return "#edcf72";
             break;
         case 256:
             return "#edcc61";
             break;
         case 512:
             return "#9c0";
             break;
         case 1024:
             return "#33b5e5";
             break;
         case 2048:
             return "#09c";
             break;
         case 4096:
             return "#a6c";
             break;
         case 8192:
             return "#93c";
             break;
         default:
             return "#000";
     }
 }

 function getColor(number) {
     if (number <= 4) {
         return "#776e65";
     }
     return "white";

 }

 function showNumber(i, j, randNumber) {
     var numberCell = $('#number-cell-' + i + "-" + j);

     numberCell.css('background-color', getBackgroundColor(randNumber));
     numberCell.css('color', getColor(randNumber));
     numberCell.text(randNumber);

     numberCell.animate({
         width: cellLength,
         height: cellLength,
         top: getTop(i, j),
         left: getLeft(i, j)
     }, 100);
 }

 function nospace(board) {
     for (var i = 0; i < 4; i++) {
         for (var j = 0; j < 4; j++) {
             if (board[i][j] == 0) {
                 return false;
             }
         }
     }
     return true;
 }

 function nomove(board) {
     if (canMoveLeft(board) ||
         canMoveRight(board) ||
         canMoveUp(board) ||
         canMoveDown(board)) {
         return false;
     }
     return true;
 }

 function showMoveAnimation(fx, fy, tx, ty) {
     var numberCell = $('#number-cell-' + fx + '-' + fy);
     numberCell.animate({
         top: getTop(tx, ty),
         left: getLeft(tx, ty)
     }, 200);
 }


 function noBlockHorizontal(row, col1, col2, board) {
     for (var i = col1 + 1; i < col2; i++)
         if (board[row][i] != 0)
             return false;
     return true;
 }

 function noBlockVertical(col, row1, row2, board) {
     for (var i = row1 + 1; i < row2; i++)
         if (board[i][col] != 0)
             return false;
     return true;
 }

 function canMoveLeft(board) {

     for (var i = 0; i < 4; i++)
         for (var j = 1; j < 4; j++)
             if (board[i][j] != 0)
                 if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
                     return true;

     return false;
 }

 function canMoveRight(board) {

     for (var i = 0; i < 4; i++)
         for (var j = 2; j >= 0; j--)
             if (board[i][j] != 0)
                 if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
                     return true;

     return false;
 }

 function canMoveUp(board) {

     for (var j = 0; j < 4; j++)
         for (var i = 1; i < 4; i++)
             if (board[i][j] != 0)
                 if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
                     return true;

     return false;
 }

 function canMoveDown(board) {

     for (var j = 0; j < 4; j++)
         for (var i = 2; i >= 0; i--)
             if (board[i][j] != 0)
                 if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
                     return true;
     return false;
 }

 function updateScore(score) {
     $('#score').text(score);
 }
