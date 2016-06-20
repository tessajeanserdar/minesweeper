var myApp = angular.module('myApp', ['BoardService']);
myApp.controller('CalculatorController', function ($scope, Board) {
    $scope.initGame = function(mode){
      $scope.mode = mode;
      $scope.status = "live";
      $scope.cheatEnabled = false;
      Board.clearBoard();
      Board.initBoard(Board.gameMode[mode].size,Board.gameMode[mode].mines,mode);
      $scope.rows = Board.rows;
    }
    $scope.visit = function (cell) {
      if(cell.isMine){
        $scope.status = "lost";
      }
      Board.getConnectedNonMineCells(cell,$scope.mode)
    }
    $scope.validateBoard = function(){
      if(Board.totalUncovered === Board.gameMode[$scope.mode].totalSquares - Board.gameMode[$scope.mode].mines && $scope.status !== "lost") {
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