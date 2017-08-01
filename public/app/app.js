//TODO: Change Syntax to ES6
(function() {
    //console.log('Starting app.js');
    var app = angular.module('app', ['ngRoute','ngCookies']);

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
                controllerAs: 'bookAdder'
            })
            .when('/editbook/:bookID',{
                templateUrl: '/app/templates/editbook.html',
                controller: 'EditBookController',
                controllerAs: 'bookEditor',
                /*resolve: {
                    books: function(dataService) {
                        //throw 'error 312313';
                        return dataService.getAllBooks();
                    }
                }*/
            })
            .otherwise('/')
            ;
    });

    app.run(['$rootScope', function($rootScope){
        //console.log('Inside of app.run');
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous){
            console.log('successfully changed routes');
        });

        $rootScope.$on('$routeChangeError',  function(event, current, previous, rejection){
            console.log('error changing routes');

            console.log('event '+event);
            console.log('current '+current);
            console.log('previous '+previous);
            console.log('rejection '+rejection);
        });
        
    }]);

    app.config.$inject = ['booksProvider','$routeProvider'];
}());