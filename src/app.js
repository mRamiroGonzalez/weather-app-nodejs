const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// handlebars engine config
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// static resources
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
   res.render('index', {
      title: 'Weather',
      name: "mramiro"
   });
});

app.get('/weather', (req, res) => {
   console.log('GET /weather');

   if (!req.query.address) {
      return res.send({ error: 'Missing query parameter: "address"' });
   }

   const address = req.query.address;
   geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
         return res.send({ error });
      }
      forecast(longitude, latitude, (error, forecastData) => {
         if (error) {
            return res.send({ error });
         }
         return res.send({
            forecast: forecastData.weather_descriptions + ", " + forecastData.temperature + "°C",
            location: location,
            address: address
         });
      });
   });
});

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About me',
      name: "mramiro"
   });
});

app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help',
      message: "RTFM",
      name: "mramiro"
   });
});

app.get('/help/*', (req, res) => {
   res.render('404', {
      title: '404 - Not Found',
      errorMessage: "Could not find help article",
      name: "mramiro"
   });
});

app.get('*', (req, res) => {
   res.render('404', {
      title: '404 - Not Found',
      errorMessage: "Page not found",
      name: "mramiro"
   });
});

app.listen(3000, () => {
   console.log('Server up and listening on port 3000');
});