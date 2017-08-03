(function () {
    angular.module('app')
        .controller('EditBookController', [
            '$routeParams',
            'books',
            '$cookies',
            '$cookieStore',
            'dataService',
            '$log',
            '$location',
            'BooksResource',
            'currentUser',
            EditBookController]);

    function EditBookController(
        $routeParams,
        books,
        $cookies,
        $cookieStore,
        dataService,
        $log,
        $location,
        BooksResource,
        currentUser
        ) {

        
            var vm = this;
            
           
            // vm.currentBook = books.filter(function (item) {
            //     return item.book_id == $routeParams.bookID;
            // })[0];

            dataService.getBookByID($routeParams.bookID)
                .then(getBookSuccess)
                .catch(getBookError);
            
            //Example with using BooksResource:
            //vm.currentBook = BooksResource.get({book_id: $routeParams.bookID});

           
            function getBookSuccess(book){

                vm.currentBook = book;
                
                //Storing in a cookie example
                //$cookieStore.put('lastEdited', vm.currentBook);
                
                currentUser.lastBookEdited = vm.currentBook;
                //console.log(currentUser.lastBookEdited);

                
            }            

            function getBookError(reason){
                $log.error(reason);
            }

            vm.saveBook = function(){
                dataService.updateBook(vm.currentBook)
                    .then(updateBookSuccess)
                    .catch(updateBookError);
                
                // Example with using BooksResource
                // vm.currentBook.$update();
                //  $location.path('/');  
            }

            function updateBookSuccess(message){
                $log.info(message);
                $location.path('/');   
            }

            function updateBookError(errorMessage){
                $log.error(errorMessage);
            }

            vm.setAsFavorite = function() {
                $cookies.favoriteBook = vm.currentBook.title;
            }

           

    }

}());