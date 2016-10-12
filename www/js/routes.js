angular.module('starter').config(function($stateProvider, $urlRouterProvider) {

   $urlRouterProvider.otherwise('listagem');

   $stateProvider

   .state('listagem', {
       url: '/listagem',
       templateUrl: 'templates/listagem.html',
       controller: 'ListagemController'
   })
   
   .state('listagempimentas', {
       url: '/listagempimentas',
       templateUrl: 'templates/listagempimentas.html',
       controller: 'ListagemPimentasController'
   })

   .state('burgerescolhido', {
       url: '/burgerescolhido/:burger',
       templateUrl: 'templates/burgerescolhido.html',
       controller: 'BurgerEscolhidoController'
   })

   .state('pimentaescolhida', {
       url: '/pimentaescolhida/:pimenta',
       templateUrl: 'templates/pimentaescolhida.html',
       controller: 'PimentaEscolhidaController'
   })

   .state('finalizarPedido', {
       url: '/finalizarpedido',
       templateUrl: 'templates/finalizarpedido.html',
       controller: 'FinalizarPedidoController'
   });

});