define(function () {

  var internals = {};
  var externals = {};

  internals.app = $('#app');

  internals.cards = [];

  internals.loadCard = function (cb) {

    $.ajax({
      url: 'https://api.scryfall.com/cards/random',
      type: 'GET',
      dataType: 'json',
      success: function (results) {

        console.log(results);

        internals.card = {
          cardName: results.name,
          image: results.image_uris.png,
          artist: results.artist,
          rarity: results.rarity,
          purchaseUris: results.purchase_uris.cardmarket,
          type: results.type_line,
          releaseDate: results.released_at,
          flavorText: results.flavor_text,
        };

        console.log(internals.card);
        //cb(null, internals.card);

      },
      error: function (request, statusText, httpError) { cb(httpError || statusText) }
 
    });
  };

  externals.loadRandomCards = function (cb) {
      
    for (var index = 0; index < 6; index++) {
      internals.cards.push(internals.loadCard(null, cb))
      console.log(internals.cards);
    }
  }

  return externals;
});
