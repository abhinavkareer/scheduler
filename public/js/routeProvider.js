var app = angular.module("ngScheduler", ["ngRoute"]);
app.run(function($rootScope){
$rootScope.myName="Abhi";
})

.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "html/home.html"
    })
    .when("/settings", {
        templateUrl : "html/settings.html"
    })
    .when("/createSchedule", {
        templateUrl : "html/createSchedule.html",
        controller:"createSchedule"
    })
    .when("/storedProcedures", {
        templateUrl : "html/storedProcedures.html",
        controller:"createScheduleForStoredProcedure"
    })
});

// create Schedule  Controller
app.controller("createSchedule", function ($scope,$http,$location,$rootScope) {
  $scope.createSchedule = function() {
    $http({
           method  : 'POST',
           url     : "../createSchedule",
           data    : {cronSyntax:$scope.cronSyntax,
           message:$scope.message}, //forms user object
        headers:{'Content-Type':'application/json'}
          })
           .success(function(data) {
             console.log(data);
             $scope.response=data.stringify();
           });
         }
});

// create Stored Procedure Schedule  Controller
app.controller("createScheduleForStoredProcedure", function ($scope,$http,$location,$rootScope) {




  $http({
         method  : 'GET',
         url     : "../listAllStoredProcedures",
        })
         .success(function(data) {
           console.log(data);
           $scope.response=data;
         });







  var monthNames=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  var daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  $scope.cronScheduleOptions={sec:[],dayOfWeek:[],month:[],hour:[],day:[]};
  for(i=0;i<60;i++)
  {
    $scope.cronScheduleOptions.sec.push(i);
    if(i<8)
    {
      $scope.cronScheduleOptions.dayOfWeek.push({value:i,displayValue:daysInWeek[i]})
    }

    if(i>0 && i<=12)
    {
      $scope.cronScheduleOptions.month.push({value:i,displayValue:monthNames[i]});
    }
    if(i<=23)
    {
      $scope.cronScheduleOptions.hour.push(i);
    }

    if(i>0 && i<=31)
    {
      $scope.cronScheduleOptions.day.push(i);
    }

  }





  // $scope.createSchedule = function() {
  //   $http({
  //          method  : 'POST',
  //          url     : "../createSchedule",
  //          data    : {cronSyntax:$scope.cronSyntax,
  //          message:$scope.message}, //forms user object
  //       headers:{'Content-Type':'application/json'}
  //         })
  //          .success(function(data) {
  //            console.log(data);
  //            $scope.response=data.stringify();
  //          });
  //        }
});
