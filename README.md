## Search with suggestions

### Short description
__Project Title:__ Search with suggestions
__Description:__ A search component that provides user with suggestions during input and retrieves all data upon search.
Component fetches data from PostgreSQL database via NodeJS server. User interface is built on React and utilizes lodash.debounce and mark.js for better UI/UX.

### Features
1. Component provides up to 10 suggestions upon input.
2. Suggestions are ordered relative to search criteria.
3. Component uses lodash.debounce to provide suggestions only when input is finished.
4. Component uses mark.js to highlight criteria that was used to find suggestions.
5. When search is fired component fetches all available data from database.
6. Data is stored in PostgreSQL database.
7. Data is accessed via requests to NodeJS (Express) server.
8. All request have basic validation.

__Technology: JavaScript, Node.js, Express, PostgreSQL, React, Lodash.debounce, Mark.js, Heroku__

<br>
<br>

### How to run locally
__Setup PostgreSQL Database__
Install project dependencies using `npm install` in `/`
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

Run `npm start` in `/`
Run `npm start` in `client`


<br>
<br>

Best regards,  
Yehor Zemzyulin