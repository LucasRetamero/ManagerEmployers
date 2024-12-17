import { useSQLiteContext } from "expo-sqlite";

export type FuncaoDatabase = {
    id: number,
    nome: string,
}

export function useFuncaoDatabase(){

    const database = useSQLiteContext();

    async function create(data: Omit<FuncaoDatabase, "id">) {
        const statement =  await database.prepareAsync(
          "INSERT INTO funcao(nome) VALUES ($nome)"
        );

        try{
            const result = await statement.executeAsync({
             $nome: data.nome,
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
    const query = "SELECT * FROM funcao WHERE nome LIKE ?";

    const response = await database.getAllAsync<FuncaoDatabase>(
        query, 
        `%${nome}%`);

    return response ;
  } catch (error) {
    throw error;
  } 
 }

 async function update(data: FuncaoDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE funcao SET nome = $nome WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $id: data.id,
        $nome: data.nome,
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }
 
 async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM funcao WHERE id = " + id)
    } catch (error) {
      throw error
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM funcao WHERE id = ?"

      const response = await database.getFirstAsync<FuncaoDatabase>(query, [
        id,
      ])

      return response
    } catch (error) {
      throw error
    }
  }

 return { create, searchByNome, remove, show, update };
}