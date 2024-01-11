const { Router } = require("express");
const { getCountries, getCountriesById } = require('../controllers/getCountries');
const getActivities = require('../controllers/getActivities');
const postActivity = require('../controllers/postActivity');

const router = Router();

router.get('/countries', getCountries);
router.get('/activities', getActivities);
router.get('/countries/:countriesId', getCountriesById);

router.post('/activities', postActivity);

module.exports = router;
