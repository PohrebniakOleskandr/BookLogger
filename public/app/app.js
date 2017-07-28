//TODO: Change Syntax to ES6
(function() {
    //console.log('Starting app.js');
    var app = angular.module('app', []);

    app.provider('books', function(constants) {
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


        });



    app.config(function(booksProvider){
        //console.log('In config method');
        booksProvider.setIncludeVersionInTitle(true);
    });
}());