//TODO: Change Syntax to ES6
(function() {

    var app = angular.module('app', []);

    app.provider('books', function() {
            this.$get = function() {
                var appName = 'Book Logger';
                var appDesc = 'Track which books you read.';
                var version = '1.0';

                console.log('Inside $get method');
                //console.log(includeVersionInTitle);
                if(includeVersionInTitle){
                    appName += ' '+version; 
                }
                
                return {
                    appName:appName,
                    appDesc:appDesc
                };
            };

            console.log('Inside provider method');
            var includeVersionInTitle = false;
            this.setIncludeVersionInTitle = function(value){
                includeVersionInTitle = value;
            };


        });



    app.config(function(booksProvider){
        console.log('In config method');
        booksProvider.setIncludeVersionInTitle(true);
    });
}());