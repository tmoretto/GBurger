angular.module('starter').service('BurgerService', function($http){
    
    //var url_burgers = 'http://localhost:8080/burgers';
    var url_burgers = 'https://gibaburgerbackend.herokuapp.com/burgers';
    
    //var url_pimentas = 'http://localhost:8080/pimentas';
    var url_pimentas = 'https://gibaburgerbackend.herokuapp.com/pimentas';
        
    //var url_post = 'http://localhost:8080/pedidos/create';
    var url_post = 'https://gibaburgerbackend.herokuapp.com/pedidos/create';
    
    var itensPedido = [];

    return {
        obterBurgers : function() {
            return $http.get(url_burgers).then(function(res) {
                return res.data;
            });
        },

        obterPimentas : function() {
            return $http.get(url_pimentas).then(function(res) {
                return res.data;
            });
        },

        obterItensPedido : function() {
            return $http.get('').then(function(res) {
                return itensPedido;
            });                        
        },

        limparItensPedido : function() {
            itensPedido = [];          
            return true;
        },

        adicionarPedido : function(itemPedido) {
            itensPedido.push(itemPedido);            
            return true;
        },

        salvarPedido : function(dadosPedidoFinalizado) {

            //console.log(JSON.stringify(dadosPedidoFinalizado));

            return $http.post(url_post, dadosPedidoFinalizado).then(function(res) {
                return true;
            });
            
        }
    }

});