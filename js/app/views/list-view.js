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

        internals.renderHeader();
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

    internals.renderHeader = function() {
        internals.elements.header = $(internals.createHeader());
        internals.elements.app.append(internals.elements.header);

        //internals.elements.header.append(internals.createButton());
        //internals.elements.header.append(internals.createSearch());
        internals.renderButton();
        internals.renderSearch();
    }

    internals.renderButton = function() {
        if(internals.elements.button) {
            return;
        }
        internals.elements.button = $(internals.createButton());
        //a view é que lida com o button.click mas a função(ação) é do controller
        internals.elements.button.click(internals.handlers['buttonClick']);
        internals.elements.header.append(internals.elements.button);
    };

    internals.renderSearch = function(search) {
        if(internals.elements.search) {
            return;
        }

        internals.elements.search = $(internals.createSearch());
        internals.elements.header.append(internals.elements.search);
    }

    internals.renderError = function(error) {
        internals.elements.error = $(internals.createError(error));
        internals.elements.app.append(internals.elements.error);
    }

     //fazer bind da string que vem do controller e da função handler correspondente, para guardar nos elements.handlers
     externals.bind = function (eventName, handler) {
        internals.handlers[eventName] = handler;
    }

    internals.createHeader = function() {
        return `<div id="header" class="container row"></div>`
    }

    internals.createCardHolder = function() {
        return ('<div id="cardHolder" class="container row"></div>')
    }

    internals.createButton = function() {
        return ('<div class="col-4"><button type="button" class="btn btn-dark">Generate a set of random Cards!</button></div>');
    }; 

    internals.createCard = function(element) {
        //console.log(card + 'tas aqui?');
        return ('<div><div class="col-4><div class="card" style="width: 18rem; margin: 15px;">' + 
        '<img class="card-img-top" src=' + element.image + ' alt="image magic">' +
        '<div class="card-body">' +
        '<a href="#" class="btn btn-dark">View Details</a>'+
        '</div></div></div></div>');
    };

    internals.createError = function() {
        return ('<span class="badge badge-secundary">Error fetching Data!</span>')
    }

    internals.createSearch = function() {
       return (`<div class="col-4"><form class="form-inline">
                <i class="fas fa-search" aria-hidden="true"></i>
                <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                aria-label="Search">
                </form></div>`)
    }

    return externals;
})