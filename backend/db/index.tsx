import {Pool} from 'pg';
import {format} from 'node-pg-format';

const {env} = process;
export const db = new Pool({
  user: 'plasma',
  host: '192.168.7.24',
  password: 'harrypotterb09504007',
  port: 5432,
});

export const insertInto = <T extends {[key: string]: any}>(tableName: string, obj: T) =>
  db.query(format('INSERT INTO %I(%L) VALUES(%L)', tableName, Object.keys(obj), Object.values(obj)));
