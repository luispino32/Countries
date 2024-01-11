const { Country, Activity } = require('../db.js');
const { Sequelize } = require('sequelize');

const Op = Sequelize.Op;

const getCountries = async (req, res) => {
    const { name } = req.query;

    try{
        if(!name){
            const countries = await Country.findAll({
                include: {
                    model: Activity,
                    attributes: ["name"],
                    through:{
                        attributes: [],
                    },
                }
            });
            return res.status(200).json(countries);
        }else{
            const country = await Country.findAll({
                where: { 
                    name:{[Op.iLike]: `%${name}%`}
                },
                include: {
                    model: Activity,
                    attributes: ["name"],
                    through:{
                        attributes: [],
                    },
                }
            });
    
            return res.status(200).json(country);
        }
    }catch(error){
        return res.status(401).json({error: error.message});
    }
}

const getCountriesById = async (req, res) => {
    const { countriesId } = req.params;

    try{
        if(!countriesId) return res.status(400).json({error: 'Faltan datos'});

        const country = await Country.findOne({
            where: { id: countriesId },
            include: {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through:{
                    attributes: [],
                },
            }
        });

        return res.status(200).json(country);
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    getCountries,
    getCountriesById
}
