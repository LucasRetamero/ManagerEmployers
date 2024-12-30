export const pontoEntity = {
    create: `
      CREATE TABLE IF NOT EXISTS ponto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        funcao TEXT,
        data_entrada TEXT,
        hora_entrada TEXT,
        data_saida TEXT,
        hora_saida TEXT
        );`,
    drop: `DROP TABLE IF EXISTS ponto;`,
    seed: [
      `INSERT INTO ponto (nome, funcao, data_entrada, hora_entrada, data_saida, hora_saida) VALUES ('Torres alberto', 'Lider', '18/12/2024', '18:00', '18/12/2024', '20:00');`,
      `INSERT INTO ponto (nome, funcao, data_entrada, hora_entrada, data_saida, hora_saida) VALUES ('Maria Torres', 'Aguia', '18/12/2024', '13:00', '18/12/2024', '20:00');`,
      `INSERT INTO ponto (nome, funcao, data_entrada, hora_entrada, data_saida, hora_saida) VALUES ('Maria Torres', 'Aguia', '18/12/2024', '10:00', '18/12/2024', '20:00');`,
    ],
  };