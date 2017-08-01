(function () {
    angular.module('app')
        .controller('EditBookController', [
            '$routeParams',
            /*'books',*/
            '$cookies',
            '$cookieStore',
            'dataService',
            '$log',
            '$location',
        EditBookController]);

    function EditBookController(
        $routeParams,
        /*books,*/
        $cookies,
        $cookieStore,
        dataService,
        $log,
        $location
        ) {

            var vm = this;
            
            //previous hardcodeded example (without using new service methods):

            // vm.currentBook = books.filter(function (item) {
            //     return item.book_id == $routeParams.bookID;
            // })[0];

            dataService.getBookByID($routeParams.bookID)
                .then(getBookSuccess)
                .catch(getBookError);
            
            function getBookSuccess(book){
                vm.currentBook = book;
                $cookieStore.put('lastEdited', vm.currentBook);
            }            

            function getBookError(reason){
                $log.error(reason);
            }

            vm.saveBook = function(){
                dataService.updateBook(vm.currentBook)
                    .then(updateBookSuccess)
                    .catch(updateBookError);
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