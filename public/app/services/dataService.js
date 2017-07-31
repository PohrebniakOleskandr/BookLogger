(function() {
    //console.log('Starting dataService.js');

    angular.module('app')
       //The second param should return a service
      .factory('dataService', ['$q', '$timeout', dataService]);
    
    function dataService($q, $timeout) {
        //console.log('Inside dataService');

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };

        function getAllBooks () {
            var booksArray=  [
                {
                    book_id: 1,
                    title: 'Harry Potter and the Deadly Hallows',
                    author: 'J.K. Rowling',
                    year_published: 2000
                },
                {
                    book_id: 2,
                    title: 'The Cat in the Hat',
                    author: 'Dr. Seuss',
                    year_published: 1957
                },
                {
                    book_id: 3,
                    title: 'Encyclopedia Brown, Boy Detective',
                    author: 'Donald J. Sobol',
                    year_published: 1963
                }
            ];
            var deffered = $q.defer();

            $timeout(function(){
                var succesful = true;

                if(succesful){
                    deffered.resolve(booksArray);
                }
                else {
                    deffered.reject('Error retrieving books...');
                }
            }, 1000);

            return deffered.promise;
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