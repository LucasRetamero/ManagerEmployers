import { useSQLiteContext } from "expo-sqlite";

export type UserDatabase = {
    id: number,
    email: string,
    password: string
}

export function useUserDatabase(){

    const database = useSQLiteContext();

    async function create(data: Omit<UserDatabase, "id">) {
        const statement =  await database.prepareAsync(
          "INSERT INTO user(email, password) VALUES ($email, $password)"
        );

        try{
            const result = await statement.executeAsync({
             $email: data.email,
             $password: data.password
            });

            const insertedRowid = result.lastInsertRowId.toLocaleString();
            return { insertedRowid }
        } catch (error) {
          throw error;
        } finally{
            await statement.finalizeAsync();
        }
    }

 async function searchByEmail(email: string){
  try {
    const query = "SELECT * FROM user WHERE email LIKE ?";

    const response = await database.getAllAsync<UserDatabase>(
        query, 
        `%${email}%`);

    return response ;
  } catch (error) {
    throw error;
  } 
 }

 async function update(data: UserDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE user SET email = $email, password = $password WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $id: data.id,
        $email: data.email,
        $password: data.password,
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }
 
 async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM user WHERE id = " + id)
    } catch (error) {
      throw error
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM user WHERE id = ?"

      const response = await database.getFirstAsync<UserDatabase>(query, [
        id,
      ])

      return response
    } catch (error) {
      throw error
    }
  }

 return { create, searchByEmail, remove, show, update };
}