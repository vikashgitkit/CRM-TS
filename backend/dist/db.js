"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'crm'
});
pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});
// Event listener for connection errors
pool.on('error', (err) => {
    console.error('Error connecting to the database:', err);
});
pool.connect();
const queries = {
    query: (text, params) => {
        return pool.query(text, params);
    }
};
exports.default = queries;
