const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const apiKey = '9ca47ea70d79642749ea59a53217032e';

let projectData = {};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('website'));
app.use(cors());

function connectApi(zipCode) {
  const url = `http://api.openweathermap.org/data/2.5/forecast?id=${zipCode}&appid=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.post('/data', (req, res) => {
  if (req.body && req.body.zip) {
    const zipCode = req.body.zip;
    console.log(`The zip code is ${zipCode}`);

    connectApi(zipCode)
      .then(data => {
        if (data.list && data.list.length > 0) {
          console.log(`The date is ${data.list[0].dt_txt}`);
          console.log(`The temp is ${data.list[0].main.temp_max}`);
          res.json(data);
        } else {
          res.status(500).send('Error fetching weather data');
        }
      })
      .catch(error => {
        res.status(500).send('Error fetching weather data');
      });
  } else {
    res.status(400).send('No zip code provided');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});