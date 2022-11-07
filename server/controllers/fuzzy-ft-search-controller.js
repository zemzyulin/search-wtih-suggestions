import sql from '../models/database.js';
import { fullTextValidation } from '../utils/utils.js';

export async function findFuzzyText(req, res) {
  try {
    // Step 1. Full-Text Search
    let value = req.query.search;
    let valueFTSearch = fullTextValidation(req.query.search);

    let query = await sql`SELECT id, name 
                            FROM cities
                            WHERE name_tokens @@ to_tsquery(${ valueFTSearch })
                            ORDER BY ts_rank(name_tokens, to_tsquery(${ valueFTSearch })) DESC
                            LIMIT 10`;

    // Step 2. if no results --> run fuzzy search
    if (query.length < 1) {
        let fuzzyQuery = await sql`SELECT word AS name, similarity(word, ${value})
                                    FROM lexemes
                                    WHERE similarity(word, ${value}) > 0.3
                                    ORDER BY word <-> ${value}
                                    LIMIT 10`

        // if no results --> return no results
        if (fuzzyQuery.length < 1) {
            return res.status(200).send({});
        }        
        
        // Step 3. Run full text search with suggestions from fuzzy search
        let fuzzyString = fuzzyQuery.map(el => el.name).join(' | ');
        let fullTextQuery = await sql`SELECT name, similarity(${value}, name) sml
                                        FROM (SELECT name FROM cities
                                                WHERE name_tokens @@ to_tsquery(${fuzzyString})) AS fullsearch
                                        ORDER BY sml DESC
                                        LIMIT 10`;

        return res.status(200).send(fullTextQuery);
    }
    res.status(200).send(query);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function findFuzzyTextAll(req, res) {
    try {
    // Step 1. Full-Text Search
    let value = req.query.search;
    let valueFTSearch = fullTextValidation(req.query.search);

    let query = await sql`SELECT id, name 
                            FROM cities
                            WHERE name_tokens @@ to_tsquery(${ valueFTSearch })
                            ORDER BY ts_rank(name_tokens, to_tsquery(${ valueFTSearch })) DESC`;

    // Step 2. if no results --> run fuzzy search
    if (query.length < 1) {
        let fuzzyQuery = await sql`SELECT word AS name, similarity(word, ${value})
                                    FROM lexemes
                                    WHERE similarity(word, ${value}) > 0.3
                                    ORDER BY word <-> ${value}`
                                    
        // if no results --> return no results
        if (fuzzyQuery.length < 1) {
            return res.status(200).send({});
        }        
        
        // Step 3. Run full text search with suggestions from fuzzy search
        let fuzzyString = fuzzyQuery.map(el => el.name).join(' | ');
        let fullTextQuery = await sql`SELECT name, similarity(${value}, name) sml
                                        FROM (SELECT name FROM cities
                                                WHERE name_tokens @@ to_tsquery(${fuzzyString})) AS fullsearch
                                        ORDER BY sml DESC`;

        return res.status(200).send(fullTextQuery);
    }
    res.status(200).send(query);
  } catch (error) {
    res.status(400).send(error);
  }
}