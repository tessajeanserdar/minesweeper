var BoardService = angular.module('BoardService', [])
.service('Board', function () {
    this.gameSize  = 8;
    this.squareCount = this.gameSize * this.gameSize
    this.rows = [];
    this.mines = 10;
    this.totalUncovered = 0;
    this.gameMode = {
      normal: {size : 8, mines : 10}, 
      easy: {size : 4, mines: 4},
      medium: {size : 10, mines: 20},
      hard: {size : 12, mines: 40}
    }
    this.addMines = function (mines){
      var minesCreated = 0;
      var rowLocation;
      var colLocation;
      while (minesCreated < mines){
        rowLocation = Math.floor(Math.random() * this.gameSize);
        colLocation = Math.floor(Math.random() * this.gameSize);
        if(!this.rows[rowLocation][colLocation].isMine){
          this.rows[rowLocation][colLocation].isMine = true;
          this.addToAdjacentCellsMinesCount(rowLocation,colLocation);
          minesCreated++;
        }
      }
    }
    this.addToAdjacentCellsMinesCount = function (r,c){
      if ( r > 0 && c > 0 ) {
        this.rows[r-1][c-1].minesAdjacentCount++;
      } 
      if ( r > 0 ) {
        this.rows[r-1][c].minesAdjacentCount++;
      }
      if( r > 0 && c < this.gameSize - 1) {
        this.rows[r-1][c+1].minesAdjacentCount++;
      }
      if ( c > 0 ) {
        this.rows[r][c-1].minesAdjacentCount++;
      }
      if ( c > 0 && r < this.gameSize - 1) {
        this.rows[r+1][c-1].minesAdjacentCount++;
      }
      if ( c < this.gameSize -1 && r < this.gameSize -1 ) {
        this.rows[r+1][c+1] .minesAdjacentCount++;    
      }
      if ( c < this.gameSize - 1 ) {
        this.rows[r][c+1].minesAdjacentCount++;
      }
      if ( r < this.gameSize -1 ) {
        this.rows[r+1][c].minesAdjacentCount++;
      }
    }
    this.getConnectedNonMineCells = function(cell){
      cell.isRevealed = true;
      this.totalUncovered++;
      for (var i = -1 ; i < 2 ; i++) {
        for (var j = -1; j < 2 ; j++) {
          var row = cell.rowNum + i;
          var column = cell.colNum + j;
          if ((row >= 0) && (column >= 0) && (row < this.gameSize) && (column < this.gameSize)) {
            var current = this.rows[row][column];
            if (!current.isMine && !current.isRevealed) {
              this.totalUncovered++
              current.isRevealed = true;
            }
          }
        }
      }
    }
    this.initBoard = function(size,mines){
        for (var i = 0; i < size; i++) {
          this.rows[i] = new Array(size);
          for (var j = 0; j < size; j++) {
            this.rows[i][j] = {
              isMine: false,
              isRevealed : false,
              minesAdjacentCount : null,
              rowNum : i,
              colNum : j
            };
          }
        }
        this.addMines(mines);
    } 
});