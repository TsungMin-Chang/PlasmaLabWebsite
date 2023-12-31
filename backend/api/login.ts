import {format} from 'node-pg-format'
import {db} from 'db/index'

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import {IState} from '#ServerAPI';
import {IServerAPI} from './generated/IHandler';

export const authCookieName = 'plasma-token';
const secret = 'harrypotter0724';
export const jwtSign = (data: string|object|Buffer) => jwt.sign(data, secret);

export default {
  postLogin: async (req, _res, ctx) => {
    const {username, passwd} = req.body;
    if (!username || !passwd) return [401];
    const {rows: [r]} = await db.query(format(`
      SELECT passwd AS "dbPasswd" FROM users
      WHERE username=%L
    `, username));
    if (!r) return [401];
    if (!await bcrypt.compare(passwd, r.dbPasswd)) return [401];
    const token = jwtSign({role: 'editor'});
    const tmp = new Date();
    const expire = new Date(tmp.valueOf() + 1800000);
    ctx.cookies.set(authCookieName, token, {httpOnly: false, expires: expire});
    return [201];
  }
} as Partial<IServerAPI<IState>>;
