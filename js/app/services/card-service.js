define(function () {

  var internals = {};
  var externals = {};

  internals.app = $('#app');

  internals.cards = [];

  internals.loadCard = function (viewRender) {

    $.ajax({
      url: 'https://api.scryfall.com/cards/random',
      type: 'GET',
      dataType: 'json',
      success: function (results) {
        console.log(internals.cards)
        if(internals.cards.length === 5) { 
          console.log(internals.cards)
          viewRender(null, internals.cards);
          return;
        }

        var card = {
          cardName: results.name,
          image: results.image_uris.png,
          artist: results.artist,
          rarity: results.rarity,
          purchaseUris: results.purchase_uris.cardmarket,
          type: results.type_line,
          releaseDate: results.released_at,
          flavorText: results.flavor_text,
        };

        internals.cards.push(card);
        //internals.loadCard(viewRender);
        
      },
      error: function (request, statusText, httpError) { cb(httpError || statusText) }
 
    });
  };

  internals.loadCards = function (viewRender) {
      for (let index = 0; index < 6; index++) {
        internals.loadCard(viewRender)
        
      }
  }

  externals.loadRandomCards = function (viewRender) {
    
    internals.cards = [];
    internals.loadCards(viewRender);

  }
  return externals;

});
