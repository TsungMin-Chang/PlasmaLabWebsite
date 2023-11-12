import {MigrationBuilder} from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('events', {
    id: 'uuidNN',
    year: 'int2NN',
    imgPath: 'textNN',
  });
}
  
export async function down(pgm: MigrationBuilder): Promise<void> {
  // table
  pgm.dropTable('events');
}
  