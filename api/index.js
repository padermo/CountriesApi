//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require('axios');
const port = process.env.PORT || 3001;



// cargamos la DB con los datos de la API al iniciar el servidor
async function cargar() {
  await axios.get('https://restcountries.com/v3/all').then((response) => {
    const formatCountry = response.data.map(e => {
      const obj = {
        id: e.cca3,
        name: e.name.common.toLowerCase(),
        image: e.flags[0],
        continent: e.continents[0],
        capital: e.capital ? e.capital[0] : 'has not capital',
        subregion: e.subregion,
        area: e.area,
        population: e.population,
      }
      return obj;
    });
    Country.bulkCreate(formatCountry);
  });
}

// Syncing all the models at once.
conn.sync().then(() => {
  ()=>cargar();
  server.listen(port, () => {
    console.log(`Server listen on port ${port}`); // eslint-disable-line no-console
  });
});


