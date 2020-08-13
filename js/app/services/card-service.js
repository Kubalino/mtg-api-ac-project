define(function() {

    var internals = {};
    var externals = {};

    internals.app = $('#app');

    

    externals.loadCard = function(cb) {
      $.ajax({
          url: 'https://api.scryfall.com/cards/random',
          type: 'GET',
          dataType: 'json',
          success: function (results) { 
            
            console.log(results);
            internals.cards = {};
            internals.cards.artist = results.artist;
            internals.cards.image = results.image_uris.png;

            console.log(internals.cards.artist);
            console.log(internals.cards.image); 
            
          cb(null, internals.cards) },
          error: function (request, statusText, httpError) { cb(httpError || statusText) }
      });
    };

  /*externals.getCard = function(cb, index) {
        cb(internals.processResults);
    };
    */

    return externals;
}
);
