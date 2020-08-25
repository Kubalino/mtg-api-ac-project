define(function () {

  var internals = {};
  var externals = {};

  internals.app = $('#app');

  internals.cards = [];

  internals.loadRandomCard = function (viewRender) {

    $.ajax({
      url: 'https://api.scryfall.com/cards/random',
      type: 'GET',
      dataType: 'json',
      success: function (results) {
        
        //console.log(results);
        //console.log(internals.cards)
        
        viewRender(null, internals.cards);

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
      },
      error: function (request, statusText, httpError) { cb(httpError || statusText) }
 
    });
  };

  internals.transform = function() {
      

  }

  externals.loadCards = function (viewRender, numberOfCards) {

    internals.cards = [];
    for (let index = 0; index <= numberOfCards; index++) {
      internals.loadRandomCard(viewRender)
    }
  }

  return externals;

});
