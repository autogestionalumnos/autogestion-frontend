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
  
  Curso = $resource('http://10.48.129.36:8080/autogestionapp/autogestion/cursos/:id', 
    { id: "@id"}
  );
  
  
  Recibo = $resource('http://10.48.129.36:8080/autogestionapp/autogestion/alumnos/:alumnoId/recibos', 
    { alumnoId: "@alumnoId"},
    {'query': {method: 'GET', isArray: true}}
    
  );
  
  
  $scope.login=function(dni){
    Alumno.get({dni: dni},
         function(alumno){
            $scope.alumno = alumno;
            flash.success= "Bienvenido!";
            
            Curso.get({id: alumno.cursoId},
             function(curso){
                $scope.curso = curso;
              }
            ,
              function(httpResponse){ 
                $scope.curso = null;
                flash.error = "Curso no encontrado";
              }
            );
            
            Recibo.query({alumnoId: alumno.idAlumno },
             function(recibos){
                $scope.recibos = recibos;
              }
            ,
              function(httpResponse){ 
                $scope.recibos = null;
                flash.error = "No hay recibos";
              }
            );
          }
        ,
          function(httpResponse){ 
            $scope.alumno = null;
            flash.error = "Dni incorrecto";
          }
    );
  };
  
  
  
});
