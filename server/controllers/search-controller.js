import sql from '../models/database.js';
import { capitalizeString, concatUnique } from '../utils/utils.js';

// list 10 suggestions
export async function find(req, res) {
    let value1 = capitalizeString(req.query.search);
    let value2 = req.query.search.toLowerCase();

    // query for start of city name match
    let query1 = await sql`SELECT id, name FROM cities 
                            WHERE name LIKE ${value1 + '%'}
                            ORDER BY name LIMIT 10`;
    // query for mid or end of city name match
    let query2 = await sql`SELECT id, name FROM cities
                            WHERE name LIKE ${'%' + value1 + '%'} OR name LIKE ${'%' + value2 + '%'}
                            ORDER BY name LIMIT 10`;
    
    // filter unique, take first 10
    let result = concatUnique(query1, query2).splice(0, 10);
    res.status(200).send(result);
}

// find all matches
export async function findAll(req, res) {
    let value0 = req.query.search;
    let value1 = capitalizeString(req.query.search);
    let value2 = req.query.search.toLowerCase();

    // query for exact match and start of city name match
    let query1 = await sql`SELECT id, name FROM cities
                            WHERE name = ${value0} OR name = ${value1} OR name LIKE ${value1 + '%'}
                            ORDER BY name`;
    // query for mid or end of city name match
    let query2 = await sql`SELECT id, name FROM cities
                            WHERE name LIKE ${'%' + value2 + '%'} OR name LIKE ${'%' + value1 + '%'}
                            ORDER BY name`;

    // filter unique, take first 10
    let result = concatUnique(query1, query2);
    res.status(200).send(result);
}