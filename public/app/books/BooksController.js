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
        'BooksResource',
         BooksController]);

    function BooksController(books, 
        dataService,
        logger,
        badgeService,
        $cookies,
        $cookieStore,
        $log,
        $route,
        BooksResource
    ) {
        
        var vm = this;

        vm.appName = books.appName;


        dataService.getUserSummary()
            .then(getUserSummarySuccess);

        function getUserSummarySuccess(summaryData){
            vm.summaryData = summaryData;
        }

        // Use BooksResource instead:

        // dataService.getAllBooks()
        //     .then(getBooksSuccess, null, getBooksNotification)
        //     .catch(getBooksError)
        //     .finally(getAllBooksComplete);

        vm.allBooks = BooksResource.query();
        
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