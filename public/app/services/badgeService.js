(function() {

      
    angular.module('app')
        .value('badgeService', {
            retrieveBadge:retrieveBadge
        });

    function retrieveBadge (minutesRead) {
        //console.log(minutesRead);
        var badge = null;

        switch(true) {
            case (minutesRead > 5000):
                badge = 'Book Warm';
                break;
            case (minutesRead > 2500):
                badge = 'Page turner';
                break;
            default:
                badge = 'Getting Started';
        }

        return badge;
    }
}());