const axios = require("axios");
const server = require("./src/server");
const { conn, Country } = require('./src/db.js');

const PORT = 3001;

conn.sync({ force: false }).then(async () => {
  try {
    const countries = await Country.findAll();
    if(countries.length === 0){
      const { data } = await axios.get('http://localhost:5000/countries');

      const dataDB = data.map(dataItem => {
        return({
          id: dataItem.cca3,
          name: dataItem.translations.spa.common ? dataItem.translations.spa.common : dataItem.name.common,
          image: dataItem.flags.svg,
          continent: dataItem.continents[0],
          capital: dataItem.hasOwnProperty('capital') ? dataItem.capital[0] : "none",
          subregion: dataItem.hasOwnProperty('subregion') ? dataItem.subregion : "none",
          area: dataItem.area,
          poblacion: dataItem.population
        })
      });
      
      await Country.bulkCreate(dataDB);
    }
  } catch (error) {
    console.error('Error al obtener datos de países:', error);
  }

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(error => console.error(error));
