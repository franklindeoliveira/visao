app.controller('ModalController', function($scope, $uibModalInstance, ferramentas) {
    
    $scope.ferramentas = ferramentas;
    $scope.ferramentaSelecionada = $scope.ferramentas[0];
    
    $scope.salvar = function () {
        $uibModalInstance.close($scope.ferramentaSelecionada);
    };

    $scope.fechar = function () {
        $uibModalInstance.dismiss('Fechar');
    };

});