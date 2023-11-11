import {MigrationBuilder} from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('users', {
    id: 'uuidNN',
    username: 'textNN',
    passwd: 'textNN',
  });
}
  
export async function down(pgm: MigrationBuilder): Promise<void> {
  // table
  pgm.dropTable('users');
}
  