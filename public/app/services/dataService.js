(function() {
    //console.log('Starting dataService.js');

    angular.module('app')
       //The second param should return a service
      .factory('dataService', ['$q', '$timeout', '$http', 'constants', '$cacheFactory', dataService]);
    
    function dataService($q, $timeout, $http, constants,$cacheFactory) {
        //console.log('Inside dataService');

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook:deleteBook,
            getUserSummary:getUserSummary
        };


        function deleteAllBooksResponseFromCache() {

            var httpCache = $cacheFactory.get('$http');
            httpCache.remove('api/books');
        }


        function getUserSummary(){

            var deffered = $q.defer(); //объявить промис

            var dataCache = $cacheFactory.get('bookLoggerCache');

            if(!dataCache) {
                dataCache = $cacheFactory('bookLoggerCache');
            }

            var summaryFromCache = dataCache.get('summary');

            if(summaryFromCache){
                console.log('Returned from cache...');
                deffered.resolve(summaryFromCache);

            } else {
            
                var booksPromise = getAllBooks();
                var readersPromise = getAllReaders();

                $q.all([booksPromise,readersPromise])
                    .then(function(bookLoggerData){
                        var allBooks = bookLoggerData[0];
                        var allReaders = bookLoggerData[1];

                        var grandTotalMinutes = 0;

                        allReaders.forEach(function(currentReader){
                            grandTotalMinutes += currentReader.totalMinutesRead;
                        });

                        var summaryData = {
                            bookCount: allBooks.length,
                            readerCount: allReaders.length,
                            grandTotalMinutes: grandTotalMinutes
                        };

                        dataCache.put('summary', summaryData);
                        console.log('Returned just now...');
                        deffered.resolve(summaryData); //это будет результатом его резолвт состояния
                    });
            }

            return deffered.promise; //вернуть промис
        }

        function deleteSummaryFromCache(){
            var dataCache = $cacheFactory.get('bookLoggerCache');
            dataCache.remove('summary');
        }

        function getAllBooks () {
            
            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                },
                transformResponse: transformGetBooks,
                cache: true
            })
                .then(sendResponseData)
                .catch(sendGetBooksError);
            
        }

        function transformGetBooks(data, headersGetter){
            var transformed = angular.fromJson(data);

            transformed.forEach(function(currentValue){
                currentValue.dateDownloaded = new Date();
            });

            console.log(transformed);
            return transformed;
        }

        function sendResponseData(response){
            return response.data;
        }

        function sendGetBooksError(){
            return $q.reject('Error retrieving book(s). (HTTP status '+response.status+')');
        }

        function getBookByID(bookID) {

            // return $http({
            //     method: 'GET',
            //     url: 'api/books/'+bookID
            // })         
            return $http.get('api/books/'+bookID)
                .then(sendResponseData)
                .catch(sendGetBooksError);
        }

        function updateBook(book){

            deleteSummaryFromCache();
            deleteAllBooksResponseFromCache();

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

            deleteSummaryFromCache();
            deleteAllBooksResponseFromCache();

            // return $http({
            //     method: 'POST',
            //     url: 'api/books',
            //     data: newBook
            // })
            return $http.post('api/books',newBook,{
                transformRequest: transformPostRequest
            })
                .then(addBookSuccess)
                .catch(addBookError);
        }

        function transformPostRequest(data,headersGetter){
            data.newBook = true;

            console.log(data);

            return JSON.stringify(data); 
        }

        function addBookSuccess(response){
            return 'Book added: '+response.config.data.title;
        }

        function addBookError(response){
            return $q.reject('Error adding book.(HTTP status: '+response.status+')');
        }
        
        function deleteBook(bookID){
            
            deleteAllBooksResponseFromCache();
            deleteSummaryFromCache();

            return $http({
                method: 'DELETE',
                url: 'api/books/'+ bookID
            })
                .then(deleteBookSuccess)
                .catch(deleteBookError);
        }

        function deleteBookSuccess(){
            return 'Book deleted';
        }

        function deleteBookError(){
            return $q.reject('Error deleting book.(HTTP status: '+response.status+')');
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