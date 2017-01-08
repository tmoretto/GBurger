angular.module('starter').controller('ListagemController', function($scope, BurgerService){
    
    $scope.groups = [];
    $scope.groups[0] = {
        name: "Simples",
        show: false
    };
    $scope.groups[1] = {
        name: "Com Bacon",
        show: false
    };
    $scope.groups[2] = {
        name: "Recheados",
        show: false
    };
    
    /*
    * if given group is the selected group, deselect it
    * else, select the given group
    */
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };

    BurgerService.obterBurgers().then(function(dados){
            $scope.listaDeBurgers = dados;
    });



});

angular.module('starter').controller('ListagemPimentasController', function($scope, BurgerService){
    
    BurgerService.obterPimentas().then(function(dados){
            $scope.listaDePimentas = dados;
    });

});

angular.module('starter').controller('BurgerEscolhidoController', function($stateParams, $scope, $ionicPopup, $state, BurgerService){
   
   $scope.burgerEscolhido = angular.fromJson($stateParams.burger);
   $scope.burgerEscolhidoTotal = $scope.burgerEscolhido.preco;
   
   $scope.mudou = function(qtdeSelecionada) {
       if (qtdeSelecionada == undefined) { qtdeSelecionada = 1;}
       $scope.burgerEscolhidoTotal = $scope.burgerEscolhido.preco * qtdeSelecionada;  
   };

   $scope.adicionarBurgerAoPedido = function(qtdeSelecionada) {

        if (qtdeSelecionada == undefined) { qtdeSelecionada = 1; }

        var itemPedido = {
                'item': $scope.burgerEscolhido.nome,
                'qtde': qtdeSelecionada,
                'preco': $scope.burgerEscolhidoTotal
        }
        BurgerService.adicionarPedido(itemPedido);

        $ionicPopup.alert({
            title: '',
            template: 'Burger adicionado ao seu Pedido.' 
        }).then(function() {
            $state.go('listagem');
        });
   };

});

angular.module('starter').controller('PimentaEscolhidaController', function($stateParams, $scope, $ionicPopup, $state, BurgerService){
   
   $scope.pimentaEscolhida = angular.fromJson($stateParams.pimenta);
   $scope.pimentaEscolhidaTotal = $scope.pimentaEscolhida.preco;
   
   $scope.mudou = function(qtdeSelecionada) {
       if (qtdeSelecionada == undefined) { qtdeSelecionada = 1;}
       $scope.pimentaEscolhidaTotal = $scope.pimentaEscolhida.preco * qtdeSelecionada;  
   };

   $scope.adicionarPimentaAoPedido = function(qtdeSelecionada) {

        if (qtdeSelecionada == undefined) { qtdeSelecionada = 1; }

        var itemPedido = {
                'item': $scope.pimentaEscolhida.nome,
                'qtde': qtdeSelecionada,
                'preco': $scope.pimentaEscolhidaTotal
        }
        BurgerService.adicionarPedido(itemPedido);

        $ionicPopup.alert({
            title: '',
            template: 'Pimenta adicionada ao seu Pedido.' 
        }).then(function() {
            $state.go('listagempimentas');
        });
   };

});


angular.module('starter').controller('FinalizarPedidoController', function($stateParams, $scope, $ionicPopup, $state, BurgerService){

    var calcTotalDoPedido = 0;

    BurgerService.obterItensPedido().then(function(dados){
            $scope.itensPedido = dados;
            angular.forEach($scope.itensPedido, function(item) {
                calcTotalDoPedido = parseInt(calcTotalDoPedido) + parseInt(item.preco);
                console.log(">>> calcTotalDoPedido: " + calcTotalDoPedido);
            });
            $scope.totalDoPedido = calcTotalDoPedido;
    });
    
    $scope.pedido = {};

    $scope.finalizarPedido = function() {

        var dadosPedidoFinalizado = {
                nome: $scope.pedido.nome,
                endereco: $scope.pedido.endereco, 
                telefone: $scope.pedido.telefone,
                email: $scope.pedido.email,
                itens : $scope.itensPedido               
        }

        BurgerService.salvarPedido(dadosPedidoFinalizado).then(function(dados) {
            BurgerService.limparItensPedido();
            $ionicPopup.alert({
                title: 'Parabéns',
                template: 'Pedido enviado com Sucesso!' 
            }).then(function() {
                $state.go('listagem');
            });            
        }, function(erro) {
            $ionicPopup.alert({
                title: 'Aviso',
                template: 'Ops, algo deu errado :(' 
            });      
        });

    };

});
