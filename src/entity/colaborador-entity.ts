export const colaboradorEntity = {
    create: `
      CREATE TABLE IF NOT EXISTS colaborador (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        email TEXT,
        telefone TEXT,
        funcao TEXT,
        status TEXT,
        observacao TEXT
      );`,
    drop: `DROP TABLE IF EXISTS colaborador;`,
    seed: [
      `INSERT INTO colaborador (nome, email, telefone, funcao, status, observacao) VALUES ('Torres alberto', 'torresalberto@gmail.com', '123456789', 'Lider', 'Disponivel', 'faltar entregar documentos');`,
      `INSERT INTO colaborador (nome, email, telefone, funcao, status, observacao) VALUES ('Maria Torres', 'mariatorres@gmail.com', '987654321', 'Aguia', 'Indisponivel', 'faltar entregar documentos');`,
      `INSERT INTO colaborador (nome, email, telefone, funcao, status, observacao) VALUES ('Juliano Alves', 'julianoalves@gmail.com', '95136745', 'Porteiro', 'Disponivel', 'documentos entregue');`,  
    ],
  };