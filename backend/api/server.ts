import {db} from '../db/index'
import {format} from 'node-pg-format'
import {PersonDataProp, CreatePersonDataProp, UpdatePersonDataProp,
  ResearchDataProp, CreateResearchDataProp, UpdateResearchDataProp,
  PublicationDataProp, CreatePublicationDataProp, UpdatePublicationDataProp} from './generated/schemas';
import {IServerAPI} from './generated/IHandler';

export type IState = {
  id: string;
}

export default {
  getPeoplesData: async _req => {
    try {
      const {rows: r} = await db.query(format(`
        SELECT 
          p.id AS id, 
          p.name AS name,
          p.position AS position,
          p.imgPath AS imgPath,
          pd.degree AS degree,
          pd.school AS school,
          pd.department AS department,
          pd.yearStart AS yearStart,
          pd.yearEnd AS yearEnd,
        FROM peoples AS p
        INNER JOIN people_degrees AS pd ON p.id=pd.peopleId
      `));
      return [200, r.map(PersonDataProp.from)];
    } catch {
      return [404];
    }
  },
  createPeopleData: async _req => {
    try {
      const {name, position, imgPath, bs, ms, phd} = _req.body;
      const result = await db.query(format(`
        INSERT INTO peoples ("name", "position", "imgPath")
        VALUES (%L, %L, %L)
        RETURNING id
      `, name, position, imgPath));
      const [{id: peopleId}] = result.rows;
      if (bs && Object.keys(bs).length === 5) {
        await db.query(format(`
          INSERT INTO people_degrees ("peopleId", "degree", "school", "department", "yearStart", "yearEnd")
          VALUES (%L, %L, %L, %L, %L, %L)
        `, peopleId, bs.degree, bs.school, bs.department, bs.yearStart, bs.yearEnd)); 
      }
      if (ms && Object.keys(ms).length === 5) {
        await db.query(format(`
          INSERT INTO people_degrees ("peopleId", "degree", "school", "department", "yearStart", "yearEnd")
          VALUES (%L, %L, %L, %L, %L, %L)
        `, peopleId, ms.degree, ms.school, ms.department, ms.yearStart, ms.yearEnd)); 
      }
      if (phd && Object.keys(phd).length === 5) {
        await db.query(format(`
          INSERT INTO people_degrees ("peopleId", "degree", "school", "department", "yearStart", "yearEnd")
          VALUES (%L, %L, %L, %L, %L, %L)
        `, peopleId, phd.degree, phd.school, phd.department, phd.yearStart, phd.yearEnd)); 
      }
      return [201];
    } catch {
      return [404];
    }
  },
  updatePeopleData: async _req => {
    console.log(_req.body);
    try {
      if (_req.body.bs) {
        const bs = _req.body.bs;
        const keys = Object.keys(bs);
        const values = Object.values(bs);
        const count = keys.length;
        const I = (Array.from({length: count}, (_, i) => '%I')).join("','");
        const L = (Array.from({length: count}, (_, i) => '%L')).join('","');
        await db.query(format("UPDATE people_degrees SET ( '" + I + "' ) VALUES ( \""+ L + "\" )",
        ...keys, ...values));
      }
      if (_req.body.ms) {
        const ms = _req.body.ms;
        const keys = Object.keys(ms);
        const values = Object.values(ms);
        const count = keys.length;
        const I = (Array.from({length: count}, (_, i) => '%I')).join("','");
        const L = (Array.from({length: count}, (_, i) => '%L')).join('","');
        await db.query(format("UPDATE people_degrees SET ( '" + I + "' ) VALUES ( \""+ L + "\" )",
        ...keys, ...values));
      }
      if (_req.body.phd) {
        const phd: any = _req.body.phd;
        console.log(phd);
	const validKeys = Object.keys(phd).filter((key) => phd[key] !== undefined);
        const result = validKeys.map((key) => '"' + key + '"=\'' + phd[key].toString() + "'");
        await db.query('UPDATE people_degrees SET ' + result.join(',') + ' WHERE "degree"=\'3\' AND "peopleId"=\'' + _req.body.id + "'");
      }
      delete(_req.body.bs);
      delete(_req.body.ms);
      delete(_req.body.phd);
      console.log(_req.body);
      const keys = Object.keys(_req.body);
      const values = Object.values(_req.body);
      const count = keys.length;
      const L = (Array.from({length: count}, (_, i) => '%L')).join('","');
      const I = (Array.from({length: count}, (_, i) => '%I')).join("','");
      await db.query(format("UPDATE peoples SET ( '" + I + "' ) VALUES ( \""+ L + "\" )",
      ...keys, ...values));
      return [201];
    } catch {
      return [404];
    }
  },
  deletePeopleData: async _req => {
    try {
      const {id} = _req.path;
      await db.query(format(`
        DELETE FROM peoples WHERE "id"=%L
      `, id));
      await db.query(format(`
        DELETE FROM people_degrees WHERE "peopleId"=%L
      `, id));
      return [204];
    } catch {
      return [404];
    }
  },
  getResearchsData: async _req => {
    try {
      const {rows: r} = await db.query(format(`
        SELECT * FROM researchs
      `));
      return [200, r.map(ResearchDataProp.from)];
    } catch {
      return [404];
    }
  },
  createResearchData: async _req => {
    try {
      const {title, imgPath, description, reference} = _req.body;
      await db.query(format(`
        INSERT INTO researchs ("title", "imgPath", "description", "reference")
        VALUES (%L, %L, %L, %L)
      `, title, imgPath, description, reference));
      return [201];
    } catch {
      return [401];
    }
  },
  updateResearchData: async _req => {
    try {
      const keys = Object.keys(_req.body);
      const values = Object.values(_req.body);
      const count = keys.length;
      const L = (Array.from({length: count}, (_, i) => '%L')).join('","');
      const I = (Array.from({length: count}, (_, i) => '%I')).join("','");
      await db.query(format("UPDATE researchs SET ( '" + I + "' ) VALUES ( \""+ L + "\" )",
      ...keys, ...values));
      return [201];
    } catch {
      return [401];
    }
  },
  deleteResearchData: async _req => {
    try {
      const {id} = _req.path;
      await db.query(format(`
        DELETE FROM researchs WHERE "id"=%L
      `, id));
      return [204];
    } catch {
      return [401];
    }
  },
  getPublicationsData: async _req => {
    try {
      const {rows: r} = await db.query(format(`
        SELECT * FROM publications
      `));
      return [200, r.map(PublicationDataProp.from)];
    } catch {
      return [404];
    }
  },
  createPublicationData: async _req => {
    try {
      const {year, detail} = _req.body;
      await db.query(format(`
        INSERT INTO publications ("year", "detail")
        VALUES (%L, %L)
      `, year, detail));
      return [201];
    } catch {
      return [401];
    }
  },
  updatePublicationData: async _req => {
    try {
      const keys = Object.keys(_req.body);
      const values = Object.values(_req.body);
      const count = keys.length;
      const L = (Array.from({length: count}, (_, i) => '%L')).join('","');
      const I = (Array.from({length: count}, (_, i) => '%I')).join("','");
      await db.query(format("UPDATE publications SET ( '" + I + "' ) VALUES ( \""+ L + "\" )",
      ...keys, ...values));
      return [201];
    } catch {
      return [401];
    }
  },
  deletePublicationData: async _req => {
    try {
      const {id} = _req.path;
      await db.query(format(`
        DELETE FROM publications WHERE "id"=%L
      `, id));
      return [204];
    } catch {
      return [401];
    }
  }
} as IServerAPI<IState>;
