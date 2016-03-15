app.controller('VisaoController', function($scope, ajaxService, $uibModal) {
    
    // Exemplo de chamada da api rest
//    ajaxService.get('/processo/visao/tabela')
//        .success(function(data) {
//            console.log('Tabelas carregadas com sucesso.');
//            console.log(data);
//        })
//        .error(function(error) {
//            console.log('Ocorreu um erro ao carregar as tabelas.');
//            console.log(error);
//        });
    
    $scope.tabelas = [];
    $scope.ferramentas = [];
    
    $scope.tabelas = carregaTabelas();
    $scope.ferramentas = [// fazer chamada ajax
        {
            'ferramenta' : {
                'id': 1,
                'nome' : 'Ferramenta 1'
            }
        },
        {
            'ferramenta' : {
                'id': 2,
                'nome' : 'Ferramenta 2'
            }
        },
        {
            'ferramenta' : {
                'id': 3,
                'nome' : 'Ferramenta 3'
            }
        }
    ];

    $scope.abreModalFerramentas = function(atributo, tabela) {
        var modalInstance = $uibModal.open({
            templateUrl: 'templates/ModalTemplate.html',
            controller: 'ModalController',
            resolve: {
                ferramentas: function () {
                    return $scope.ferramentas;
                }
            }
        });
        
        modalInstance.result.then(function(ferramentaSelecionada) {
            $scope.adicionaFerramenta(ferramentaSelecionada, atributo, tabela);
        }, function(data) {
            console.log(data);
        });
    }
    
    function carregaTabelas() {
        var tabelas = [];
        return tabelas;
    };
    
    $scope.removeTabela = function(tabela, $index) {
        $scope.tabelas.splice($index, 1);
    };
    
    $scope.adicionaTabela = function() {
        var tabela = {
            'id': $scope.tabelas.length + 1,
            'posicao': 0,
            'nome': 'Tabela 1',
            'tabelasFilhas': [],
            'maxOcorrencias': 1,
            'atributos': []
        };
        $scope.tabelas.push(tabela);
    };
    
    $scope.removeAtributo = function(atributo, tabela) {
        var posicaoTabela = $scope.tabelas.indexOf(tabela);
        var posicaoAtributo = tabela.atributos.indexOf(atributo);
        var idTabela = $scope.tabelas[posicaoTabela].id;
        var idAtributo = tabela.atributos[posicaoAtributo];
        $scope.tabelas[posicaoTabela].atributos.splice(posicaoAtributo, 1);
    };
    
    $scope.adicionaAtributo = function(tabela) {
        var posicaoTabela = $scope.tabelas.indexOf(tabela);
        var atributo = {
            'id': 1,
            'posicao' : 0,
            'nome' : 'Atributo 1',
            'tipo' : 'Numerico',
            'tamanho' : 20, 
            'ehOrigemUsuario': true,
            'ferramentas' : []
         };
        $scope.tabelas[posicaoTabela].atributos.push(atributo);
    };
    
    $scope.adicionaFerramenta = function(ferramenta, atributo, tabela) {
        var posicaoTabela = $scope.tabelas.indexOf(tabela);
        var posicaoAtributo = tabela.atributos.indexOf(atributo);
        var posicaoFerramenta = tabela.atributos[posicaoAtributo].ferramentas.indexOf(ferramenta);
        var idTabela = $scope.tabelas[posicaoTabela].id;
        var idAtributo = tabela.atributos[posicaoAtributo];
        var idFerramenta = ferramenta.id;
        $scope.tabelas[posicaoTabela].atributos[posicaoAtributo].ferramentas.push(ferramenta);
    };
    
    $scope.removeFerramenta = function(ferramenta, atributo, tabela) {
        var posicaoTabela = $scope.tabelas.indexOf(tabela);
        var posicaoAtributo = tabela.atributos.indexOf(atributo);
        var posicaoFerramenta = tabela.atributos[posicaoAtributo].ferramentas.indexOf(ferramenta);
        var idTabela = tabela.id;
        var idAtributo = atributo.id;
        var idFerramenta = ferramenta.id;
        $scope.tabelas[posicaoTabela].atributos[posicaoAtributo].ferramentas.splice(posicaoFerramenta, 1);
    };

});