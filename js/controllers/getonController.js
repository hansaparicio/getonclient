//creacion del controlador
angular
    .module('getonApp')
    .controller('getonController', getonController);

//inyeccion de recursos
getonController.$inject =['$scope','$http'];

//declaracion de metodos y propiedades dentro del controlador
function getonController($scope,$http){
    //incializacion de variables
    $scope.geton={
        mensaje:"Campo para edicion del mensaje",
        destinatario:"54111536814751",
        token: "193ea73804e51cff8b030c90325bbd9ea7eda4c2",
        campana: "210"
    }
    //funcion de envio de mensaje
    // debe seguir el patron 
    //"https://platform.get-on.io/v1/public/api/campaignsmss/sendsms?message=${mensaje}&phone=${telefono}&campaignsms=${id_campaña}"
    //${api_token}
    //${mensaje} que es el mensaje a enviar, que tiene como máximo 160 caracteres
    //${telefono} teléfono móvil de destino. La aplicación intentará formatear el número, pero el formato ideal de envio es cód de país + cód de área + 15 + número 
    //(ej. para CABA: 54111565432112)
    //${id_campaña} identificador de la campaña SMS continua 
    $scope.getonEnvio=function(){
        //uso de comunicacion rest
        $httpProvider.defaults.headers.post = {
            'x-api-token':$scope.geton.token,
            "Cache-Control": "no-cache",
            "Content-Type": "multipart/form-data"
        }
        var req = {
            method: 'POST',
            url: "https://platform.get-on.io/v1/public/api/campaignsmss/sendsms",
            headers: {
                'x-api-token':$scope.geton.token,
               "Cache-Control": "no-cache",
               "Content-Type": "multipart/form-data",
            },
            data: {
                message:  $scope.geton.mensaje,
                phone: $scope.geton.destinatario,
                campaignsms: $scope.geton.campana
            },
        }
        //ejecucion de llamado a la api
        $http(req)
            //actualizacion de base de datos en local storage
            .then(function(){
                //preparacion de stampa de tiempo
                var tiempo = new Date();
                var stamp = tiempo.getTime();
                //obtencion de data
                var data = "";
                data = '{"fecha":"' +stamp + '","destinatario":"' + $scope.geton.destinatario + '","mensaje":"' + $scope.geton.mensaje +'"}';

                if (localStorage.DataStorage != undefined) {
                    indexString = localStorage.DataStorage.length - 1;
                    subString = localStorage.DataStorage.substring(1, indexString);
                    data = subString +","+ data;
                    data = '[' + data + ']';
                    localStorage.setItem('DataStorage', data);
                    console.log(localStorage.DataStorage);
                }
                //---condicion de inexistencia de registro
                else {
                    data = '[' + data + ']';
                    localStorage.setItem('DataStorage', data);
                    console.log(localStorage.DataStorage);
                }
            })
        // obtencion de datos para tabla
        if (localStorage.DataStorage != undefined) {
            $scope.envios = JSON.parse(localStorage.DataStorage);
        } else {
            console.log("error en obtencion de datos");
        }

    };

}