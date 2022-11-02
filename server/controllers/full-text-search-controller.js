import sql from '../models/database.js';
import { fullTextValidation } from '../utils/utils.js';

export async function findFullText(req, res) {
    // parse query for search values and adopt them for tsquery
    let value = fullTextValidation(req.query.search);

    let query = await sql`SELECT id, name 
                            FROM cities
                            WHERE name_tokens @@ to_tsquery(${ value })
                            ORDER BY ts_rank(name_tokens, to_tsquery(${ value })) DESC
                            LIMIT 10`;
    res.status(200).send(query);
}

export async function findFullTextAll(req, res) {
    // parse query for search values and adopt them for tsquery
    let value = fullTextValidation(req.query.search);

    let query = await sql`SELECT id, name
                            FROM cities
                            WHERE name_tokens @@ to_tsquery(${ value })
                            ORDER BY ts_rank(name_tokens, to_tsquery(${ value })) DESC`;
    res.status(200).send(query);
}