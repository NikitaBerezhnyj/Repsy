import { openDB } from "./db";

export const createTables = async () => {
  const db = await openDB();

  await db.withExclusiveTransactionAsync(async () => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS programs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT (datetime('now'))
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS program_exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        program_id INTEGER NOT NULL,
        exercise_id INTEGER NOT NULL,
        order_number INTEGER NOT NULL,
        FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
        FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
        UNIQUE(program_id, exercise_id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        program_id INTEGER NOT NULL,
        start_time DATETIME DEFAULT (datetime('now')),
        end_time DATETIME,
        feeling TEXT CHECK(feeling IN ('Погано', 'Нормально', 'Круто')),
        comment TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS session_exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER NOT NULL,
        program_exercise_id INTEGER NOT NULL,
        skipped BOOLEAN DEFAULT 0,
        FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
        FOREIGN KEY (program_exercise_id) REFERENCES program_exercises(id) ON DELETE CASCADE
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS sets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_exercise_id INTEGER NOT NULL,
        reps INTEGER,
        weight REAL,
        duration_seconds INTEGER,
        done BOOLEAN DEFAULT 0,
        timestamp DATETIME DEFAULT (datetime('now')),
        FOREIGN KEY (session_exercise_id) REFERENCES session_exercises(id) ON DELETE CASCADE
      );
    `);

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_program_exercises_program 
      ON program_exercises(program_id);
    `);

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_program_exercises_order 
      ON program_exercises(program_id, order_number);
    `);

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_sessions_program 
      ON sessions(program_id);
    `);

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_sessions_date 
      ON sessions(start_time);
    `);

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_session_exercises_session 
      ON session_exercises(session_id);
    `);

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_sets_session_exercise 
      ON sets(session_exercise_id);
    `);

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_sets_timestamp 
      ON sets(timestamp);
    `);
  });
};

export const checkTablesExist = async (): Promise<boolean> => {
  try {
    const db = await openDB();
    const tables = await db.getAllAsync(`
      SELECT name FROM sqlite_master 
      WHERE type='table' 
      AND name IN ('exercises', 'programs', 'program_exercises', 'sessions', 'session_exercises', 'sets')
    `);

    return tables.length === 6;
  } catch (error) {
    console.error("Помилка перевірки таблиць:", error);
    return false;
  }
};

export const initializeDatabase = async (): Promise<void> => {
  const tablesExist = await checkTablesExist();

  if (!tablesExist) {
    await createTables();
    console.log("Таблиці бази даних створено успішно");
  } else {
    console.log("Таблиці бази даних вже існують");
  }
};
