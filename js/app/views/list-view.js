define(function () {
    var internals = {};
    var externals = {};

    internals.elements = {};
    //vai guardar as funções que lidam com os binds e estão declaradas no controller. A view vai utilizalas nos onClick
    internals.handlers = {};
    
    internals.elements.app = $('#app');

    externals.render = function(error, cards) {
        
        console.log(cards);

        //console.log(error);
        if(error) {
            renderError(error);
        }
       
      internals.renderButton();
      
        if(cards) {   
            internals.renderCard(cards);
        }
    };
   
    internals.renderCard = function(cards) {

        if(internals.elements.card) {
            internals.elements.card.empty();
        }

        internals.elements.card = $(internals.createCard(cards));
        internals.elements.app.append(internals.elements.card);
    };

    internals.renderButton = function() {
        if(internals.elements.button) {
            return;
        }
        internals.elements.button = $(internals.createButton());
        //a view é que lida com o button.click mas a função(ação) é do controller
        internals.elements.button.click(internals.handlers['buttonClick']);
        internals.elements.app.append(internals.elements.button);
    };

    internals.renderError = function(error) {
        internals.elements.error = $(internals.createError(error));
        internals.elements.app.append(internals.elements.error);
    }

     //fazer bind da string que vem do controller e da função handler correspondente, para guardar nos elements.handlers
     externals.bind = function (eventName, handler) {
        internals.handlers[eventName] = handler;
    }

    //html
    internals.createButton = function() {
        return ('<div class="container"><div class="row"><button type="button" class="btn btn-outline-dark">Discover your Magic The Gathering of the day!</button></div>');
    }; 

    internals.createCard = function(cards) {
        //console.log(cards);
        return ('<div class="card" style="width: 18rem;">' + 
        '<img class="card-img-top" src="' + cards.image + '" alt="image magic">' +
        '<div class="card-body">' +
        '<a href="#" class="btn btn-dark">View Details</a>'+
        '</div></div>');
    };

    internals.createError = function() {
        console.log('Error Found!');
        return ('<span class="badge badge-secundary">Error fetching Data!</span>')
    }

    return externals;
})