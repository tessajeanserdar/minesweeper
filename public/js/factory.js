var BoardService = angular.module('BoardService', [])
.service('Board', function () {
    this.mines = null;
    this.rows = [];
    this.totalUncovered = 0;
    this.gameMode =  {
      normal: {size : 8, mines : 10}, 
      easy: {size : 4, mines: 4},
      medium: {size : 10, mines: 20},
      hard: {size : 12, mines: 40} 
    }
    this.gameMode.normal.totalSquares = this.gameMode.normal.size * this.gameMode.normal.size;
    this.gameMode.easy.totalSquares = this.gameMode.easy.size * this.gameMode.easy.size; 
    this.gameMode.medium.totalSquares = this.gameMode.medium.size * this.gameMode.medium.size; 
    this.gameMode.hard.totalSquares = this.gameMode.hard.size * this.gameMode.hard.size; 
    this.addMines = function (mines,mode){
      var minesCreated = 0;
      var rowLocation;
      var colLocation;
      console.log(mode)
      console.log(this.gameMode[mode].size)
      while (minesCreated < mines){
        rowLocation = Math.floor(Math.random() * this.gameMode[mode].size);
        colLocation = Math.floor(Math.random() * this.gameMode[mode].size);
        if(!this.rows[rowLocation][colLocation].isMine){
          this.rows[rowLocation][colLocation].isMine = true;
          this.addToAdjacentCellsMinesCount(rowLocation,colLocation,mode);
          minesCreated++;
        }
      }
    }
    this.clearBoard = function (){
       this.rows = [];
       this.totalUncovered = 0;
    }
    this.addToAdjacentCellsMinesCount = function (r,c,mode){
      if ( r > 0 && c > 0 ) {
        this.rows[r-1][c-1].minesAdjacentCount++;
      } 
      if ( r > 0 ) {
        this.rows[r-1][c].minesAdjacentCount++;
      }
      if( r > 0 && c < this.gameMode[mode].size - 1) {
        this.rows[r-1][c+1].minesAdjacentCount++;
      }
      if ( c > 0 ) {
        this.rows[r][c-1].minesAdjacentCount++;
      }
      if ( c > 0 && r < this.gameMode[mode].size - 1) {
        this.rows[r+1][c-1].minesAdjacentCount++;
      }
      if ( c < this.gameMode[mode].size -1 && r < this.gameMode[mode].size -1 ) {
        this.rows[r+1][c+1] .minesAdjacentCount++;    
      }
      if ( c < this.gameMode[mode].size - 1 ) {
        this.rows[r][c+1].minesAdjacentCount++;
      }
      if ( r < this.gameMode[mode].size -1 ) {
        this.rows[r+1][c].minesAdjacentCount++;
      }
    }
    this.getConnectedNonMineCells = function(cell,mode){
      cell.isRevealed = true;
      this.totalUncovered++;
      for (var i = -1 ; i < 2 ; i++) {
        for (var j = -1; j < 2 ; j++) {
          var row = cell.rowNum + i;
          var column = cell.colNum + j;
          if ((row >= 0) && (column >= 0) && (row < this.gameMode[mode].size) && (column < this.gameMode[mode].size)) {
            var current = this.rows[row][column];
            if (!current.isMine && !current.isRevealed) {
              this.totalUncovered++;
              current.isRevealed = true;
            }
          }
        }
      }
    }
    this.initBoard = function(size,mines,mode){
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
      this.addMines(mines,mode);
    } 
});