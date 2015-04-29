var autogestionApp = angular.module('autogestion', 
  ['ngResource',
   'angular-flash.service',
   'angular-flash.flash-alert-directive'  
  ]
);

autogestionApp.controller('AlumnoController', function ($scope,$resource) {
  
  //{"alumnoId":"1","alumnoNombre":"Rodolfo","alumnoApellido":"Leyes","alumnoDni":"1"}
  $scope.alumno = {};
  
  Alumno = $resource('http://localhost:3000/alumnos/', 
    { format: 'json' },
    {
      'create': {method: 'POST'}
    }
  );
  
  onError=function(){
    return false;
  };
  
  
  $scope.guardar = function()
  {
    Alumno.create($scope.alumno,
            function(newAlumno){
                
            }
            ,
            onError
    );
  
  };
  
});


autogestionApp.controller('LoginController', function ($scope,$resource,flash) {
  
  
  Alumno = $resource('http://10.48.129.36:8080/autogestionapp/autogestion/alumnos/:dni', 
    { dni: "@dni"}
  );
  
  
  
  $scope.login=function(){
    Alumno.get({dni: $scope.dni},
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
