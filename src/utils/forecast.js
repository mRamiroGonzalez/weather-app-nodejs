const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    
    const weatherstackToken = '8bd1f149805d4c7538a45a1c943b0ec5';
    const url = 'http://api.weatherstack.com/current?access_key=' + weatherstackToken + '&query=' + longitude + ',' + latitude + '';
    
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Could not fetch weather data');
        } else if (body.error) {
            callback('Weather api error')
        } else {
            callback(undefined, body.current);
        }
    });
}

module.exports = forecast;