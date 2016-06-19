var myApp = angular.module('myApp', ['BoardService']);
myApp.controller('CalculatorController', function ($scope, Board) {
    $scope.initGame = function(mode){
      mode = mode || 'normal';
      Board.initBoard(Board.gameMode[mode].size,Board.gameMode[mode].mines);
      $scope.status = "live";
      $scope.cheatEnabled = false;
      Board.totalUncovered = 0;
      $scope.rows = Board.rows;
    }
    $scope.visit = function (cell) {
      if(cell.isMine){
        $scope.status = "lost";
      }
      Board.getConnectedNonMineCells(cell)
    }
    $scope.validateBoard = function(){
      if(Board.totalUncovered === Board.squareCount - Board.mines && $scope.status !== "lost") {
        $scope.status = "won"
      } else  {
        $scope.status = "lost";
      }
    }
    $scope.setCheatMode = function(){
      $scope.cheatEnabled = !$scope.cheatEnabled;
    }
    $scope.initGame('normal');
     
});