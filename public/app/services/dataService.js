(function() {
    //console.log('Starting dataService.js');

    angular.module('app')
       //The second param should return a service
      .factory('dataService', ['$q', '$timeout', '$http', 'constants', dataService]);
    
    function dataService($q, $timeout, $http, constants) {
        //console.log('Inside dataService');

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook,
            addBook: addBook 
        };




        function getAllBooks () {

            //previous hardcodeded data:

            // var booksArray=  [
            //     {
            //         book_id: 1,
            //         title: 'Harry Potter and the Deadly Hallows',
            //         author: 'J.K. Rowling',
            //         year_published: 2000
            //     },
            //     {
            //         book_id: 2,
            //         title: 'The Cat in the Hat',
            //         author: 'Dr. Seuss',
            //         year_published: 1957
            //     },
            //     {
            //         book_id: 3,
            //         title: 'Encyclopedia Brown, Boy Detective',
            //         author: 'Donald J. Sobol',
            //         year_published: 1963
            //     }
            // ];
            // var deffered = $q.defer();

            // $timeout(function(){
            //     var succesful = true;

            //     if(succesful){
            //         deffered.resolve(booksArray);
            //     }
            //     else {
            //         deffered.reject('Error retrieving books...');
            //     }
            // }, 1000);

            // return deffered.promise;

            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                }
            })
                .then(sendResponseData)
                .catch(sendGetBooksError);
            
        }

        function sendResponseData(response){
            return response.data;
        }

        function sendGetBooksError(){
            return $q.reject('Error retrieving book(s). (HTTP status '+response.status+')');
        }

        function getBookByID(bookID) {
            return $http({
                method: 'GET',
                url: 'api/books/'+bookID
            })                
                .then(sendResponseData)
                .catch(sendGetBooksError);
        }

        function updateBook(book){

            return $http({
                method: 'PUT',
                url: 'api/books/'+book.book_id,
                data: book
            }) 
                .then(updateBookSuccess)
                .catch(updateBookError);
        }

        function updateBookSuccess(response){
            return 'Book updated ' + response.config.data.title;
        }

        function updateBookError(){
            return $q.reject('Error updating book.(HTTP status: '+response.status+')');
        }

        function addBook(newBook){
            return $http({
                method: 'POST',
                url: 'api/books',
                data: newBook
            })
                .then(addBookSuccess)
                .catch(addBookError);
        }

        function addBookSuccess(response){
            return 'Book added: '+response.config.data.title;
        }

        function addBookError(response){
            return $q.reject('Error adding book.(HTTP status: '+response.status+')');
        }

        function getAllReaders(){
             return [
                {
                    reader_id: 1,
                    name: 'Sasha',
                    weeklyReadingGoal: 310,
                    totalMinutesRead: 3000
                },
                {
                    reader_id: 2,
                    name: 'Katya',
                    weeklyReadingGoal: 200,
                    totalMinutesRead: 6000
                },
                {
                    reader_id: 3,
                    name: 'Stas',
                    weeklyReadingGoal: 500,
                    totalMinutesRead: 1500
                }
            ];
        }
    }
        
}());