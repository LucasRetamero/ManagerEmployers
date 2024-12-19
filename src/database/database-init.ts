import { SQLiteDatabase } from 'expo-sqlite';
export { type SQLiteDatabase } from 'expo-sqlite';
import { userEntity } from '@/entity/user-entity';
import { funcaoEntity } from '@/entity/funcao-entity';
import { colaboradorEntity } from '@/entity/colaborador-entity';
import { pontoEntity } from '@/entity/ponto-entity';

export async function InitDB(database: SQLiteDatabase){
    const tables = [userEntity, funcaoEntity, colaboradorEntity, pontoEntity];
    try {
        for (const table of tables) {
          await database.execAsync(table.drop); // Drop existing tables
          await database.execAsync(table.create); // Create tables
          for (const seedQuery of table.seed) {
            await database.execAsync(seedQuery); // Insert seed data
          }
        }
        console.log("Database initialization complete.");
      } catch (error) {
        console.error("Error during database initialization:", error);
      }
}