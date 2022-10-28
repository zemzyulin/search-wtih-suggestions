import pg from 'pg';
const { Pool } = pg;

/*
const pool = new Pool({
  user: "mvc",
  host: "localhost",
  database: "cities_search",
  password: "toomuch",
  port: "5432"
});*/

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});


/*

DB_USER=mvc
DB_PASSWORD=toomuch
DB_HOST=localhost
DB_POST=5432
DB_DATABASE=cities_search
PORT=8000
*/

export default pool;
