(function() {

    //console.log('Starting BooksController.js');
    angular.module('app')
        .controller('BooksController', ['books', 'dataService','logger','badgeService', BooksController]);

    function BooksController(books, dataService,logger,badgeService) {
        //console.log('Inside BooksController');
        var vm = this;

        vm.appName = books.appName;


        //vm.allBooks = dataService.getAllBooks();
        // ---------------------------->
        dataService.getAllBooks()
            .then(getBooksSuccess, getBooksError);
        
        function getBooksSuccess(books){
            vm.allBooks = books;
        }

        function getBooksError(reason){
            console.log(reason);
        }
        
        
        
        vm.allReaders = dataService.getAllReaders();

        //console.log(badgeService.retrieveBadge);
        //badgeService.retrieveBadge('2500');
        vm.getBadge = badgeService.retrieveBadge;

        //logger.output('Testing logger service');

    }


}());