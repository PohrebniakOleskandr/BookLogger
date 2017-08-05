//TODO: Change Syntax to ES6
(function() {
    //console.log('Starting app.js');
    var app = angular.module('app', ['ngRoute','ngCookies', 'ngResource']);

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



    app.config(function(booksProvider,$routeProvider,$httpProvider,$logProvider,$provide){
        //console.log('In config method');
        booksProvider.setIncludeVersionInTitle(true);
        
        $provide.decorator('$log', ['$delegate', 'books', logDecorator])

        $logProvider.debugEnabled(true);
        

        $httpProvider.interceptors.push('bookLoggerInterceptor');

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
            .otherwise('/');
    }); 

    function logDecorator($delegate, books){
        
        function log(message) {
            message += ' ' + new Date() + ' (' + books.appName + ')';
            $delegate.log(message);
        }        

        function info(message) {
            $delegate.info(message);
        }       

        function warn(message) {
            $delegate.warn(message);
        }    

        function error(message) {
            $delegate.error(message);
        }

        function debug(message) {
            $delegate.debug(message);
        }

        function awesome(message){
            message = 'Awesome!!! - '+message;
            $delegate.log(message);
        }

        return {
            log:log,
            info: info,
            warn: warn,
            error: error,
            debug: debug,
            awesome:awesome
        }
    }

    app.run(['$rootScope', function($rootScope){
        //console.log('Inside of app.run');
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous){
            //console.log('successfully changed routes');
        });

        $rootScope.$on('$routeChangeError',  function(event, current, previous, rejection){
            console.log('error changing routes');

            console.log('event '+event);
            console.log('current '+current);
            console.log('previous '+previous);
            console.log('rejection '+rejection);
        });
        
    }]);

    app.config.$inject = ['booksProvider','$routeProvider','$httpProvider','$logProvider','$provide'];
}());