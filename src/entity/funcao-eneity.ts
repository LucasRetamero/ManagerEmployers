export const funcaoEntity = {
    create: `
      CREATE TABLE IF NOT EXISTS funcao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT
      );`,
    drop: `DROP TABLE IF EXISTS funcao;`,
    seed: [
      `INSERT INTO funcao (nome) VALUES ('Aguia');`,
      `INSERT INTO funcao (nome) VALUES ('Porteiro');`,
      `INSERT INTO funcao (nome) VALUES ('Lider');`,
    ],
  };