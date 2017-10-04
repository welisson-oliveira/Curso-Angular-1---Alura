angular.module('alurapic').controller('FotoController', function ($scope, $http, $routeParams, $window, recursoFoto, cadastroDeFotos) {
    
    $scope.foto = {};
    $scope.exibe = false;

    if($routeParams.fotoId) {
        recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto) {
            $scope.foto = foto; 
        }, function(erro) {
            console.log(erro);
            $scope.mensagem = 'Não foi possível obter a foto'
        });
    }

    $scope.submeter = function () {

        if ($scope.formulario.$valid) {
            cadastroDeFotos.cadastrar($scope.foto)
            .then(function(dados) {
                $scope.mensagem = dados.mensagem;
                if (dados.inclusao) $scope.foto = {};
                
                //utilizado no watcher
                //$scope.focado = true;

            })
            .catch(function(erro) {
                $scope.mensagem = erro.mensagem;
            });
        }
    }

});