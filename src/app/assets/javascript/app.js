var autogestionApp = angular.module('autogestion', 
  ['ngResource',
   'angular-flash.service',
   'angular-flash.flash-alert-directive'  
  ]
);

autogestionApp.controller('AutogestionController', function ($scope,$resource,flash) {
  
  
  Alumno = $resource('http://10.48.129.36:8080/autogestionapp/autogestion/alumnos/:dni', 
    { dni: "@dni"}
  );
  
  
  
  $scope.login=function(dni){
    Alumno.get({dni: dni},
         function(alumno){
            $scope.alumno = alumno;
            flash.success= "Bienvenido!";
          }
        ,
          function(httpResponse){ 
            $scope.alumno = null;
            flash.error = "Dni incorrecto";
          }
    );
  };
  
  
  
});
