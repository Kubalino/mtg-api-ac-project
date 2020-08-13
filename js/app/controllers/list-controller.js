define(['services/card-service', 'views/list-view'], function(cardService, listView) {
    var internals = {};
    var externals = {};

    externals.start = function () {
        internals.bindEventHandlers();

        cardService.loadRandomCards(listView.render);
    };

    internals.bindEventHandlers = function () {
        listView.bind('buttonClick', internals.onButtonClickHandler);
    }

    internals.onButtonClickHandler = function () {
        cardService.loadCard(listView.render);    
    }

    return externals;
});