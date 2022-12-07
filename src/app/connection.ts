import mysql from 'mysql';
import { mySQLConfig } from '../configs/mysql/index.js';

export default mysql.createConnection(mySQLConfig);
