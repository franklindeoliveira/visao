app.controller('VisaoController', function($scope, ajaxService, $uibModal) {
    
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

    $scope.modalFerramentas = function(atributo, tabela) {
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
            //$scope.ferramentaSelecionada = ferramentaSelecionada;
            console.log('Ferramentas selecionada: ' + ferramentaSelecionada.ferramenta.nome);
            var posicaoTabela = $scope.tabelas.indexOf(tabela);
            var posicaoAtributo = tabela.atributos.indexOf(atributo);
            var idTabela = $scope.tabelas[posicaoTabela].id;
            var idAtributo = tabela.atributos[posicaoAtributo];
            $scope.tabelas[posicaoTabela].atributos[posicaoAtributo].ferramentas.push(ferramentaSelecionada);
        }, function(data) {
            console.log('Dismissed: ' + data);
        });
    }
    
    
    
    function carregaTabelas() {
//        ajaxService.get('/processo/visao/tabela')
//            .success(function(data) {
//                console.log('Tabelas carregadas com sucesso.');
//            })
//            .error(function(err) {
//                console.log('Ocorreu um erro ao carregar as tabelas.');
//                console.log(err);
//            });
        var tabelas = [
            {
                'id': 1,
                'posicao': 0,
                'nome': 'Tabela 1',
                'tabelasFilhas': [],
                'maxOcorrencias': 1,
                'atributos': [{
                  'id': 1,
                  'posicao' : 0,
                  'nome' : 'Atributo 1',
                  'tipo' : 'Numerico',
                  'tamanho' : 20, 
                  'ehOrigemUsuario': true,
                  'ferramentas' : [
                    {
                      'ferramenta' : {
                        'id': 1,
                        'nomeUso': 'Ferramenta Uso 1',
                        'nome' : 'Ferramenta'
                      }
                    }
                  ]
                }]
            },
            {
                'id': 2,
                'posicao': 1,
                'nome': 'Tabela 2',
                'tabelasFilhas': [],
                'maxOcorrencias': 1,
                'atributos': []
            },
            {
                'id': 3,
                'posicao': 2,
                'nome': 'Tabela 3',
                'tabelasFilhas': [],
                'maxOcorrencias': 1,
                'atributos': []
            },
        ];
        
        return tabelas;
    };
    
    $scope.removeTabela = function(tabela, $index) {
//        ajaxService.del('/processo/{:id}/visao/tabela/{:id}')
//            .success(function(data) {
//                console.log('Tabela removida com sucesso.');
//            })
//            .error(function(err) {
//                console.log('Ocorreu um erro ao remover a tabela.');
//                console.log(err);
//            });
        // 1o - remove a tabela do banco de dados
        console.log(tabela.nome);
        // 2o - remove a tabela da lista de tabelas
        $scope.tabelas.splice($index, 1);
        
    };
    
    $scope.adicionaTabela = function() {
//        ajaxService.post('/processo/{:id}/visao/tabela')
//            .success(function(data) {
//                console.log('Tabela adicionada com sucesso.');
//                $scope.tabelas.push(data);
//            })
//            .error(function() {
//                console.log('Ocorreu um erro ao adicionar a tabela.');
//            });
        $scope.tabelas.push(
            {
                'id': $scope.tabelas.length + 1,
                'posicao': 0,
                'nome': 'Tabela 1',
                'tabelasFilhas': [],
                'maxOcorrencias': 1,
                'atributos': []
            }
        );
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
        $scope.tabelas[posicaoTabela].atributos.push({
          'id': 1,
          'posicao' : 0,
          'nome' : 'Atributo 1',
          'tipo' : 'Numerico',
          'tamanho' : 20, 
          'ehOrigemUsuario': true,
          'ferramentas' : []
         });
    };
    
    $scope.adicionaFerramenta = function(atributo, tabela) {
        $scope.modalFerramentas(atributo, tabela);
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