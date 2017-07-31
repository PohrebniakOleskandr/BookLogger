(function() {

    //console.log('Starting BooksController.js');
    angular.module('app')
        .controller('BooksController', ['books',
        'dataService',
        'logger',
        'badgeService',   
        '$cookies',
        '$cookieStore',         
         BooksController]);

    function BooksController(books, 
        dataService,
        logger,
        badgeService,
        $cookies,
        $cookieStore 
    ) {
       
        var vm = this;

        vm.appName = books.appName;

        dataService.getAllBooks()
            .then(getBooksSuccess, getBooksError);
        
        function getBooksSuccess(books){
            vm.allBooks = books;
        }

        function getBooksError(reason){
            console.log(reason);
        }    
        
        vm.allReaders = dataService.getAllReaders();
        vm.getBadge = badgeService.retrieveBadge;

        vm.favoriteBook = $cookies.favoriteBook;
        vm.lastEdited = $cookieStore.get('lastEdited');
        


    }


}());