import {MigrationBuilder, ColumnDefinitions, PgLiteral} from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = {
  uuidNN: {
    type: 'uuid',
    default: new PgLiteral('uuid_generate_v4()'),
    notNull: true,
    primaryKey: true,
  },
  textNN: {type: 'text', notNull: true},
  int2NN: {type: 'int2', notNull: true, default: 0},
  peopleId: {type: 'uuid', references: 'peoples', notNull: true},
  userId: {type: 'uuid', references: 'users', notNull: true}
};

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createExtension('uuid-ossp', {
    ifNotExists: true,
  });

  pgm.createTable('peoples', {
    id: 'uuidNN',
    name: 'textNN',
    position: 'int2NN',
    imgPath: 'textNN',
  });

  pgm.createTable('people_degrees', {
    id: 'uuidNN',
    peopleId: 'peopleId',
    degree: 'int2NN',
    school: 'textNN',
    department: 'textNN',
    yearStart: 'int2NN',
    yearEnd: 'int2NN',
  });

  pgm.createTable('researchs', {
    id: 'uuidNN',
    title: 'textNN',
    imgPath: 'textNN',
    description: 'textNN',
    reference: 'textNN',
  });

  pgm.createTable('publications', {
    id: 'uuidNN',
    year: 'int2NN',
    detail: 'textNN',
  });  
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropExtension('uuid-ossp');
  // table
  pgm.dropTable('peoples');
  pgm.dropTable('people_degrees');
  pgm.dropTable('researchs');
  pgm.dropTable('publications');
}
