(function() {

    angular.module('app')
        .controller('BooksController', BooksController);


    function BooksController(books) {
        console.log('Inside BooksController');
        var vm = this;

        vm.appName = books.appName;

    }


}());