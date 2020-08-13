fetchData(processResults);

function fetchData(cb) {
    $.ajax({
        url: 'https://api.scryfall.com/cards/random',
        type: 'GET',
        dataType: 'json',
        success: function (results) { cb(null, results) },
        error: function (request, statusText, httpError) { cb(httpError || statusText) }
    });
}

function processResults(error, results) {

    var app = $('#app');
    var card = results;
    var cardName = results.name;
    var cardImage = results.image_uris.normal;

    console.log(card);
    console.log(cardName);
    console.log(cardImage);

    if(error) {
        app.append('<p class="error">This data is not available</p>');
    }
    app.html('<p>' + cardName + '</p>' +
            '<img src=' + cardImage + ' alt="image magic">');
}