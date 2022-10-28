const pool = require('../models/database');
const { capitalizeString, concatUnique } = require('../utils/utils');

// list 10 suggestions
exports.find = async (req, res) => {
    try {
        // query for start of city name match
        let query1 = `SELECT * FROM cities WHERE name LIKE $1 ORDER BY name LIMIT 10`
        let value1 = capitalizeString(req.query.search);
        let result1 = await pool.query(query1, [`${value1}%`]);

        // query for mid or end of city name match
        let query2 = `SELECT * FROM cities WHERE name LIKE $1 OR name LIKE $2 ORDER BY name LIMIT 10`;
        let value2 = req.query.search.toLowerCase();
        let result2 = await pool.query(query2, [`%${value1}%`, `%${value2}%`]);
        
        // filter unique, take first 10
        let results = concatUnique(result1.rows, result2.rows).splice(0, 10);

        res.status(200).send(results);
    } catch (error) {
        res.status(400).send(error);
    }
}

// find all matches
exports.findAll = async (req, res) => {
    try {
        // query for exact match and start of city name match
        let query1 = `SELECT * FROM cities WHERE name = $1 OR name = $2 OR name LIKE $2 ORDER BY name`;
        let value1 = capitalizeString(req.query.search);
        let result1 = await pool.query(query1, [`${req.query.search}`, `${value1}%`]);

        // query for mid or end of city name match
        let query2 = `SELECT * FROM cities WHERE name LIKE $1 OR name LIKE $2 ORDER BY name`;
        let value2 = req.query.search.toLowerCase();
        let result2 = await pool.query(query2, [`%${value2}%`, `%${value1}%`]);

        // filter unique, take first 10
        let results = concatUnique(result1.rows, result2.rows);
        
        res.status(200).send(results);
    } catch (error) {
        res.status(400).send(error);
    }
}