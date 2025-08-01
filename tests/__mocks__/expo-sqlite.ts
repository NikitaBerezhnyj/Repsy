export const openDatabaseAsync = jest.fn(() =>
  Promise.resolve({
    execAsync: jest.fn(() => Promise.resolve()),
    closeAsync: jest.fn(() => Promise.resolve()),
    withExclusiveTransactionAsync: jest.fn(async (cb) => {
      await cb();
    }),
    getFirstAsync: jest.fn(async (query) => {
      if (query.includes("exercises")) {
        return { name: "exercises" };
      }
      return null;
    }),
    getAllAsync: jest.fn(async () => [
      { name: "exercises" },
      { name: "programs" },
      { name: "program_exercises" },
      { name: "sessions" },
      { name: "session_exercises" },
      { name: "sets" }
    ])
  })
);
