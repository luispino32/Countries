const { Country, Activity } = require('../db.js');

const postActivity = async (req, res) => {
    const { name, difficulty, duration, season, countriesId } = req.body;

    try{
        if(!name || !difficulty || !duration || !season || countriesId.length <= 0) 
            return res.status(400).json({error: 'Faltan Datos'});

        const countries = await Country.findAll({
            where: {id: countriesId},
        });

        if(!countries) return res.status(400).json({error: 'Ciudades no validas'});

        const activityCreate = await Activity.create({ name, difficulty, duration, season });
        await activityCreate.setCountries(countries);

        return res.status(200).json(activityCreate);
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

module.exports = postActivity;