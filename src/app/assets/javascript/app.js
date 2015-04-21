var autogestionApp = angular.module('autogestion', 
  ['ngResource']
);

autogestionApp.controller('AlumnoController', function ($scope,$resource) {
  
  //{"alumnoId":"1","alumnoNombre":"Rodolfo","alumnoApellido":"Leyes","alumnoDni":"1"}
  $scope.alumno = {};
  
  Alumno = $resource('http://localhost:8080/autogestionapp/autogestion/alumnos/:alumnoDni', 
    { alumnoDni: "@alumnoDni", format: 'json' },
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
