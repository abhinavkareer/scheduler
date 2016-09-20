app.module('ngScheduler').controller("createSchedule", function ($scope,$http,$location,$rootScope) {
  $scope.createSchedule = function() {
    $http({
           method  : 'POST',
           url     : "../createSchedule",
           data    : {cronSyntax:$scope.cronSyntax,
           message:$scope.message}, //forms user object
        headers:{'Content-Type':'application/json'}
          })
           .success(function(data) {
             $scope.response=data.stringify();
           });
         }
});
