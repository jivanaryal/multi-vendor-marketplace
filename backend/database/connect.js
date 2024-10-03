// connect.js
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const db = neon(process.env.DATABASE_URL);

export default db;
