export const userEntity = {
    create: `
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT
      );`,
    drop: `DROP TABLE IF EXISTS user;`,
    seed: [
      `INSERT INTO user (email, password) VALUES ('testing@gmail.com', '123456');`,
      `INSERT INTO user (email, password) VALUES ('other@gmail.com', '654321');`
    ],
  };