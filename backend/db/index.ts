import {Pool} from 'pg';
import {format} from 'node-pg-format';

export const db = new Pool({
  user: 'plasma',
  password: 'harrypotterb09504007',
  port: 5432,
});

export const insertInto = <T extends {[key: string]: any}>(tableName: string, obj: T) =>
  db.query(format('INSERT INTO %I(%L) VALUES(%L)', tableName, Object.keys(obj), Object.values(obj)));
