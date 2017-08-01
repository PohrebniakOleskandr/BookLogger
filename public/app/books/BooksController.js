(function() {

    //console.log('Starting BooksController.js');
    angular.module('app')
        .controller('BooksController', ['books',
        'dataService',
        'logger',
        'badgeService',   
        '$cookies',
        '$cookieStore', 
        '$log',
        '$route',        
         BooksController]);

    function BooksController(books, 
        dataService,
        logger,
        badgeService,
        $cookies,
        $cookieStore,
        $log,
        $route 
    ) {
       
        var vm = this;

        vm.appName = books.appName;

        dataService.getAllBooks()
            .then(getBooksSuccess, null, getBooksNotification)
            .catch(getBooksError)
            .finally(getAllBooksComplete)
            ;
        
        function getBooksSuccess(books){
            vm.allBooks = books;
        }

        function getBooksNotification(notification){
            //console.log('Promise notification '+notification);
        }

        function getBooksError(reason){
            console.log('Error Message '+reason);
        }    

        function getAllBooksComplete(){
            //console.log('getAllBooks has completed')
        }   

        vm.deleteBook = function(bookID) {
            dataService.deleteBook(bookID)
                .then(deleteBookSuccess)
                .catch(deleteBookError)
        }

        function deleteBookSuccess(message){
            $log.info(message);
            $route.reload(); 
        }

        function deleteBookError(errorMessage){
            $log.error(errorMessage);
        }
        
        vm.allReaders = dataService.getAllReaders();
        vm.getBadge = badgeService.retrieveBadge;

        vm.favoriteBook = $cookies.favoriteBook;
        vm.lastEdited = $cookieStore.get('lastEdited');
        
    }


}());