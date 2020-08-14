define(function () {
    var internals = {};
    var externals = {};

    internals.elements = {};
    //vai guardar as funções que lidam com os binds e estão declaradas no controller. A view vai utilizalas nos onClick
    internals.handlers = {};
    
    internals.elements.app = $('#app');

    externals.render = function(error, cards) {
        
        //console.log(cards);
        //console.log(error);
        if(error) {
            renderError(error);
        }
    
      
    
      if(cards) {
        internals.renderCardHolder(cards);
        //console.log(cards);
            //console.log(element);
        };

    internals.renderButton();
    };  

    internals.renderCardHolder = function(cards) {
        if(internals.elements.cardHolder) {
            internals.elements.cardHolder.empty();
        }

        internals.elements.cardHolder = $(internals.createCardHolder())
        internals.elements.app.append(internals.elements.cardHolder);


        cards.forEach(function(element) {
            
            internals.elements.cardHolder.append(internals.createCard(element));
    })
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

    internals.createCardHolder = function() {
        return ('<div id="cardHolder" class="container row"></div>')
    }

    //html
    internals.createButton = function() {
        return ('<div class="container"><div class="row"><button type="button" class="btn btn-dark">Generate a set of random Cards!</button></div>');
    }; 

    internals.createCard = function(element) {
        //console.log(card + 'tas aqui?');
        return ('<div><div class="col-4>"<div class="card" style="width: 18rem; margin: 15px;">' + 
        '<img class="card-img-top" src=' + element.image + ' alt="image magic">' +
        '<div class="card-body">' +
        '<a href="#" class="btn btn-dark">View Details</a>'+
        '</div></div></div></div>');
    };

    internals.createError = function() {
        return ('<span class="badge badge-secundary">Error fetching Data!</span>')
    }

    return externals;
})

/*
1º - renderCard not working;
2º - set interval nas requests à api;
3º - fazer o git merge em segurança;
4º - centrar o button com o bootstrap
*/