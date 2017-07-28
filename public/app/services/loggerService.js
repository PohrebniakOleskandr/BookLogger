(function() {
    angular.module('app')
        .service('logger', BookAppLogger);
        
    function LoggerBase(){

    }
    
    LoggerBase.prototype.output = function(message){
        console.log('LoggerBase: '+message);
    }

    function BookAppLogger(){
        LoggerBase.call(this); 
    }

    BookAppLogger.prototype = Object.create(LoggerBase.prototype);
    BookAppLogger.prototype.logBook = function(book){
            console.log('Book: ' + book.title);
    }

}());