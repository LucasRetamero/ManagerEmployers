import { useSQLiteContext } from "expo-sqlite";

export type ColaboradorDatabase = {
    id: number,
    nome: string,
    email: string,
    telefone: string,
    funcao: string,
    status: string,
    observacao: string
}

export function useColaboradoratabase(){

    const database = useSQLiteContext();

    async function create(data: Omit<ColaboradorDatabase, "id">) {
        const statement =  await database.prepareAsync(
          "INSERT INTO colaborador(nome, email, telefone, funcao, status, observacao) VALUES ($nome, $email, $telefone, $funcao, $status, $observacao)"
        );

        try{
            const result = await statement.executeAsync({
             $nome: data.nome,
             $email: data.email,
             $telefone: data.telefone,
             $funcao: data.funcao,
             $status: data.status,
             $observacao: data.observacao
            });

            const insertedRowid = result.lastInsertRowId.toLocaleString();
            return { insertedRowid }
        } catch (error) {
          throw error;
        } finally{
            await statement.finalizeAsync();
        }
    }

 async function searchByNome(nome: string){
  try {
    const query = "SELECT * FROM colaborador WHERE nome LIKE ?";

    const response = await database.getAllAsync<ColaboradorDatabase>(
        query, 
        `%${nome}%`);

    return response ;
  } catch (error) {
    throw error;
  } 
 }
 
 async function searchByFuncao(funcao: string){
  try {
    const query = "SELECT * FROM colaborador WHERE funcao LIKE ?";

    const response = await database.getAllAsync<ColaboradorDatabase>(
        query, 
        `%${funcao}%`);

    return response ;
  } catch (error) {
    throw error;
  } 
 }

 async function list(){
  try {
    const query = "SELECT * FROM colaborador";

    const response = await database.getAllAsync<ColaboradorDatabase>(query);

    return response ;
  } catch (error) {
    throw error;
  } 
 }

 async function update(data: ColaboradorDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE colaborador SET nome = $nome, email = $email, telefone = $telefone, funcao = $funcao, status = $status, observacao = $observacao WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $id: data.id,
        $nome: data.nome,
        $email: data.email,
        $telefone: data.telefone,
        $funcao: data.funcao,
        $status: data.status,
        $observacao: data.observacao
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }
 
 async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM colaborador WHERE id = " + id)
    } catch (error) {
      throw error
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM colaborador WHERE id = ?"

      const response = await database.getFirstAsync<ColaboradorDatabase>(query, [
        id,
      ])

      return response
    } catch (error) {
      throw error
    }
  }

 return { create, searchByNome, searchByFuncao, remove, show, update, list };
}