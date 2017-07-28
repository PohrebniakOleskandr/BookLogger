(function() {

    //console.log('Starting BooksController.js');
    angular.module('app')
        .controller('BooksController', BooksController);


    function BooksController(books, dataService,logger,badgeService) {
        //console.log('Inside BooksController');
        var vm = this;

        vm.appName = books.appName;
        vm.allBooks = dataService.getAllBooks();
        vm.allReaders = dataService.getAllReaders();

        //console.log(badgeService.retrieveBadge);
        //badgeService.retrieveBadge('2500');
        vm.getBadge = badgeService.retrieveBadge;

        //logger.output('Testing logger service');

    }


}());