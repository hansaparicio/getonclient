//creacion del controlador
angular
    .module('getonApp')
    .controller('getonController', getonController);

//inyeccion de recursos
getonController.$inject =['$scope'];

//declaracion de metodos y propiedades dentro del controlador
function getonController($scope){
    //incializacion de variables
    $scope.geton={
        mensaje:"Campo para edicion del mensaje",
        destinatario:"Campo para edicion del destinatario",
        token: "193ea73804e51cff8b030c90325bbd9ea7eda4c2",
        campana: "210"
    }
}