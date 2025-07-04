import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: "postgresql://postgres:postgres@localhost:5432/postgres"
});

export default pool;
