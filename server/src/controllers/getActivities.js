const { Activity } = require('../db.js');

const getActivities = async (req, res) => {
    try{
        const ativities = await Activity.findAll();
        return res.status(200).json(ativities);
    }catch(error){
        return res.status(401).json({error: error.message});
    }
}

module.exports = getActivities;
