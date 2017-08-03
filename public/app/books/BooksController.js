(function() {

    //console.log('Starting BooksController.js');
    angular.module('app')
        .controller('BooksController', [
        'books',
        'dataService',
        'logger',
        'badgeService',   
        '$cookies',
        '$cookieStore', 
        '$log',
        '$route',        
        'BooksResource',
        'currentUser',
         BooksController]);

    function BooksController(
        books, 
        dataService,
        logger,
        badgeService,
        $cookies,
        $cookieStore,
        $log,
        $route,
        BooksResource,
        currentUser
    ) {
        
        
        var vm = this;

        vm.appName = books.appName;


        dataService.getUserSummary()
            .then(getUserSummarySuccess);

        function getUserSummarySuccess(summaryData){
            vm.summaryData = summaryData;
        }

        //Тоже самое, но с другим сервисом:
        //vm.allBooks = BooksResource.query();

        dataService.getAllBooks()
            .then(getBooksSuccess, null, getBooksNotification)
            .catch(getBooksError)
            .finally(getAllBooksComplete);

        
        
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
        
        // Example Using cashing
        //vm.lastEdited = $cookieStore.get('lastEdited');
        
        vm.currentUser = currentUser;
        // console.log(currentUser.lastBookEdited);
    }


}());