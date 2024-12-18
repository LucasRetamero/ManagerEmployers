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
      `INSERT INTO colaborador (nome, email, telefone, funcao, status, observacao) VALUES ('Torres alberto', 'torresalberto@gmail.com', '(19) 3854-2381', 'Lider', 'Ativo', 'faltar entregar documentos');`,
      `INSERT INTO colaborador (nome, email, telefone, funcao, status, observacao) VALUES ('Maria Torres', 'mariatorres@gmail.com', '(19) 93854-2381', 'Aguia', 'Desativado', 'faltar entregar documentos');`,
      `INSERT INTO colaborador (nome, email, telefone, funcao, status, observacao) VALUES ('Juliano Alves', 'julianoalves@gmail.com', '(19) 3854-2381', 'Porteiro', 'Ativo', 'documentos entregue');`,  
    ],
  };