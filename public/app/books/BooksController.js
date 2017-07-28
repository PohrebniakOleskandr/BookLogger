(function() {

    angular.module('app')
        .controller('BooksController', BooksController);


    function BooksController(books, dataService) {
        console.log('Inside BooksController');
        var vm = this;

        vm.appName = books.appName;
        vm.allBooks = dataService.getAllBooks();

    }


}());