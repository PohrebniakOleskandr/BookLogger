(function() {

    //console.log('Starting BooksController.js');
    angular.module('app')
        .controller('BooksController', BooksController);


    function BooksController(books, dataService,logger) {
        //console.log('Inside BooksController');
        var vm = this;

        vm.appName = books.appName;
        vm.allBooks = dataService.getAllBooks();

        logger.output('Testing logger service');

    }


}());