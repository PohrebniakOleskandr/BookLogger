//TODO: Change Syntax to ES6
(function() {
    //console.log('Starting app.js');
    var app = angular.module('app', ['ngRoute']);

    app.provider('books', ['constants', function(constants) {
            this.$get = function() {
                var appName = constants.APP_TITLE;
                var appDesc = constants.APP_DESCRIPTION;
                var version = constants.APP_VERSION;

                //console.log('Inside $get method');
                if(includeVersionInTitle){
                    appName += ' '+version; 
                }
                
                return {
                    appName:appName,
                    appDesc:appDesc
                };
            };

            //console.log('Inside provider method');
            var includeVersionInTitle = false;
            this.setIncludeVersionInTitle = function(value){
                includeVersionInTitle = value;
            };


        }]);



    app.config(function(booksProvider,$routeProvider){
        //console.log('In config method');
        booksProvider.setIncludeVersionInTitle(true);

        $routeProvider
            .when('/',{
                templateUrl: '/app/templates/books.html',
                controller: 'BooksController',
                controllerAs: 'books'
            })
            .when('/addbook',{
                templateUrl: '/app/templates/addbook.html',
                controller: 'AddBookController',
                controllerAs: 'addBook'
            })
            .when('/editbook/:bookID',{
                templateUrl: '/app/templates/editbook.html',
                controller: 'EditBookController',
                controllerAs: 'bookEditor',
                resolve: {
                    books: function(dataService) {
                        return dataService.getAllBooks();
                    }
                }
            })
            .otherwise('/')
            ;
    });

    app.config.$inject = ['booksProvider','$routeProvider'];
}());