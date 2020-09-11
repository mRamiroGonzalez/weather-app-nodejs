const request = require('postman-request');

const geocode = (address, callback) => {
    
    const mapboxToken = 'pk.eyJ1IjoibXJhbWlybyIsImEiOiJja2V0eXF3cDAwa3F1MnJwN3RieWNwNzVyIn0.pLFyLVyIqu6mLUthWDF96g';
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=' + mapboxToken;

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Could not connect to location service');
        } else if (!body.features || body.features.length == 0) {
            callback('Location not found');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;