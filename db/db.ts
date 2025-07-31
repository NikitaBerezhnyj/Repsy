import * as SQLite from "expo-sqlite";

let database: SQLite.SQLiteDatabase | null = null;

export const openDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (database) {
    return database;
  }

  database = await SQLite.openDatabaseAsync("repsy.db");
  await database.execAsync("PRAGMA foreign_keys = ON;");
  await database.execAsync("PRAGMA journal_mode = WAL;");
  return database;
};

export const closeDB = async (): Promise<void> => {
  if (database) {
    await database.closeAsync();
    database = null;
  }
};

export const clearAllTables = async (): Promise<void> => {
  const db = await openDB();
  await db.withExclusiveTransactionAsync(async () => {
    await db.execAsync("DELETE FROM sets;");
    await db.execAsync("DELETE FROM session_exercises;");
    await db.execAsync("DELETE FROM sessions;");
    await db.execAsync("DELETE FROM program_exercises;");
    await db.execAsync("DELETE FROM programs;");
    await db.execAsync("DELETE FROM exercises;");
  });
};

export const removeAllTables = async (): Promise<void> => {
  const db = await openDB();
  await db.withExclusiveTransactionAsync(async () => {
    await db.execAsync("PRAGMA foreign_keys = OFF;");
    await db.execAsync("DROP TABLE IF EXISTS sets;");
    await db.execAsync("DROP TABLE IF EXISTS session_exercises;");
    await db.execAsync("DROP TABLE IF EXISTS sessions;");
    await db.execAsync("DROP TABLE IF EXISTS program_exercises;");
    await db.execAsync("DROP TABLE IF EXISTS programs;");
    await db.execAsync("DROP TABLE IF EXISTS exercises;");
    await db.execAsync("PRAGMA foreign_keys = ON;");
  });
};

export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    const db = await openDB();
    const result = (await db.getFirstAsync(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='exercises';
    `)) as { name: string } | null;

    return result !== null;
  } catch (error) {
    console.error("Перевірка стану бази даних завершилась невдачею:", error);
    return false;
  }
};

export const resetDatabase = async (): Promise<void> => {
  await removeAllTables();
  const { createTables } = await import("./schema");
  await createTables();
};
