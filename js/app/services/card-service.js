define(function () {

  var internals = {};
  var externals = {};

  internals.app = $('#app');

  internals.cards = [];

  internals.loadCard = function () {

    $.ajax({
      url: 'https://api.scryfall.com/cards/random',
      type: 'GET',
      dataType: 'json',
      success: function (results) {

        //console.log(results);

        internals.cards.push(internals.card = {
          cardName: results.name,
          image: results.image_uris.png,
          artist: results.artist,
          rarity: results.rarity,
          purchaseUris: results.purchase_uris.cardmarket,
          type: results.type_line,
          releaseDate: results.released_at,
          flavorText: results.flavor_text,
        });

        //console.log(internals.cards);
        //cb(null, internals.cards);

      },
      error: function (request, statusText, httpError) { cb(httpError || statusText) }
 
    });
  };

  externals.loadRandomCards = function (cb) {
    
    console.log(internals.cards);

    for (var index = 0; index < 6; index++) {
      internals.loadCard();
    }
    cb(null, internals.cards);
  }

  return externals;
});
