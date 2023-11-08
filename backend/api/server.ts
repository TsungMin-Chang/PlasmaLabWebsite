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
          p."imgPath" AS "imgPath",
          pd.degree AS degree,
          pd.school AS school,
          pd.department AS department,
          pd."yearStart" AS "yearStart",
          pd."yearEnd" AS "yearEnd"
        FROM peoples AS p
        INNER JOIN people_degrees AS pd ON p.id=pd."peopleId"
      `));
      return [200, r.map(PersonDataProp.from)];
    } catch {
      return [404];
    }
  },
  createPeoplesData: async _req => {
    try {
      await Promise.all(_req.body.map(async (ele: CreatePersonDataProp): Promise<void> => {
        const {name, position, imgPath, bs, ms, phd} = ele;
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
      }))
      return [201]; 
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
    // console.log(_req.body);
    try {
      if (_req.body.bs) {
        const bs: any = _req.body.bs;
        const temp: any = [];
        const validKeys = Object.keys(bs).filter((key) => bs[key] !== undefined);
        const validValues = validKeys.map((key) => bs[key]);
        const count = validKeys.length;
        Array.from({length: count}, (_, i) => i).map((i) => temp.push(validKeys[i], validValues[i]));
        const temp2 = Array.from({length: count}, (_, i) => i).map((i) => '%I=%L').join(',');
        await db.query(format(`
          UPDATE people_degrees SET ${temp2} 
          WHERE "degree"='1' AND "peopleId"='${_req.body.id}'
        `, ...temp));
      }
      if (_req.body.ms) {
        const ms: any = _req.body.ms;
        const temp: any = [];
        const validKeys = Object.keys(ms).filter((key) => ms[key] !== undefined);
        const validValues = validKeys.map((key) => ms[key]);
        const count = validKeys.length;
        Array.from({length: count}, (_, i) => i).map((i) => temp.push(validKeys[i], validValues[i]));
        const temp2 = Array.from({length: count}, (_, i) => i).map((i) => '%I=%L').join(',');
        await db.query(format(`
          UPDATE people_degrees SET ${temp2} 
          WHERE "degree"='2' AND "peopleId"='${_req.body.id}'
        `, ...temp));
      }
      if (_req.body.phd) {
        const phd: any = _req.body.phd;
        const temp: any = [];
        const validKeys = Object.keys(phd).filter((key) => phd[key] !== undefined);
        const validValues = validKeys.map((key) => phd[key]);
        const count = validKeys.length;
        Array.from({length: count}, (_, i) => i).map((i) => temp.push(validKeys[i], validValues[i]));
        const temp2 = Array.from({length: count}, (_, i) => i).map((i) => '%I=%L').join(',');
        await db.query(format(`
          UPDATE people_degrees SET ${temp2} 
          WHERE "degree"='3' AND "peopleId"='${_req.body.id}'
        `, ...temp));
      }
      // console.log(_req.body);
      await db.query(format("UPDATE peoples SET name=%L, position=%L WHERE id=%L",
      _req.body.name, _req.body.position, _req.body.id));
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
  createResearchsData: async _req => {
    try {
      await Promise.all(_req.body.map(async (ele: CreateResearchDataProp): Promise<void> => {
        const {title, imgPath, description, reference} = ele;
        await db.query(format(`
          INSERT INTO researchs ("title", "imgPath", "description", "reference")
          VALUES (%L, %L, %L, %L)
        `, title, imgPath, description, reference));
      }))
      return [201]; 
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
      const {id, title, description, reference} = _req.body; 
      await db.query(format("UPDATE researchs SET title=%L, description=%L, reference=%L WHERE id=%L",
      title, description, reference, id));
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
  createPublicationsData: async _req => {
    try {
      await Promise.all(_req.body.map(async (ele: CreatePublicationDataProp): Promise<void> => {
        const {year, detail} = ele;
        await db.query(format(`
          INSERT INTO publications ("year", "detail")
          VALUES (%L, %L)
        `, year, detail));
      }));
      return [201]; 
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
      const {id, year, detail} = _req.body; 
      await db.query(format("UPDATE publications SET year=%L, detail=%L WHERE id=%L",
      year, detail, id));
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
