import { Pool,  QueryResult } from 'pg';
const pool:Pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'crm'
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
  });
 
  
  // Event listener for connection errors
  pool.on('error', (err:Error) => {
    console.error('Error connecting to the database:', err);
  });

pool.connect();

const queries = {
  query: (text: string , params:Array<string | number> ): Promise<QueryResult> => {
    return pool.query(text, params);
  }
};
export default queries;