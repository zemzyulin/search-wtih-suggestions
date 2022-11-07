## Search with suggestions

### Short description
__Project Title:__ Search with suggestions (w/ Full-Text and Fuzzy Search options)  
__Description:__ A search component that provides user with suggestions during input and retrieves all data upon search. Search has several options, which include Postres Full Text Search and Postgres Fuzzy Search. Component fetches data from PostgreSQL database via NodeJS (Express) server. User interface is built on React and utilizes lodash.debounce and mark.js for better UI/UX.

### Features
1. Component provides 3 options to search database: Full-Text Search, Fuzzy Search and Simple SQL Search for comparison.
2. Full-Text Search and Fuzzy Search are implemented using PostgreSQL built-in features.
3. Component provides up to 10 suggestions upon input.
4. Suggestions are ordered relative to search criteria.
5. Component uses lodash.debounce to provide suggestions only when input is finished.
6. Component uses mark.js to highlight criteria that was used to find suggestions.
7. When search is fired component fetches all available data from database.
8. Data is stored in PostgreSQL database.
9. Data is accessed via requests to NodeJS (Express) server.
10. All request have basic validation.

__Technology: JavaScript, Node.js, Express, PostgreSQL, pg_trgm, React, Lodash.debounce, Mark.js__

<br>
<br>

### How to run locally
__Setup PostgreSQL Database__
Install project dependencies using `npm install` in `/server`  
Install project dependencies using `npm install` in `/client`

Create PostgreSQL database and populate database with data
```
postgres=> CREATE DATABASE cities_search;
postgres=> \c cities_search;
cities_search=> CREATE TABLE cities (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL);
cities_search=> \q
```
Create .env with relevant variables
```
DB_USER=username
DB_PASSWORD=password
DB_HOST=localhost
DB_POST=5432
DB_DATABASE=cities_search
PORT=8000
```

Run `npm start` in `/server`  
Run `npm start` in `/client`

PS. To utilize Fuzzy Search build additional table with lexemes and name it 'lexemes'.

__Useful reads:__
1. https://www.postgresql.org/docs/current/textsearch.html
2. http://rachbelaid.com/postgres-full-text-search-is-good-enough/
3. http://www.www-old.bartlettpublishing.com/site/bartpub/blog/3/entry/350
4. https://www.compose.com/articles/mastering-postgresql-tools-full-text-search-and-phrase-search/


<br>
<br>

Best regards,  
Yehor Zemzyulin