import * as db from "@/db/db";
import * as schema from "@/db/schema";

jest.mock("expo-sqlite");

describe("[UNIT]: db/schema.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("openDB opens the database and sets PRAGMA statements", async () => {
    const database = await db.openDB();

    expect(database).toBeDefined();
    expect(database.execAsync).toHaveBeenCalledWith("PRAGMA foreign_keys = ON;");
    expect(database.execAsync).toHaveBeenCalledWith("PRAGMA journal_mode = WAL;");
  });

  test("closeDB closes the database", async () => {
    const database = await db.openDB();
    await db.closeDB();

    expect(database.closeAsync).toHaveBeenCalled();
  });

  test("checkDatabaseHealth returns true if the 'exercises' table exists", async () => {
    const health = await db.checkDatabaseHealth();
    expect(health).toBe(true);
  });

  test("checkTablesExist returns true if all required tables exist", async () => {
    const exist = await schema.checkTablesExist();
    expect(exist).toBe(true);
  });

  test("clearAllTables calls execAsync with correct DELETE statements", async () => {
    await db.clearAllTables();
    const database = await db.openDB();

    expect(database.execAsync).toHaveBeenCalledWith("DELETE FROM sets;");
    expect(database.execAsync).toHaveBeenCalledWith("DELETE FROM exercises;");
  });
});
