import { useSQLiteContext } from "expo-sqlite";

export type PontoDatabase = {
    id: number,
    nome: string,
    funcao: string,
    data_entrada: string,
    hora_entrada: string,
    data_saida: string,
    hora_saida: string
}

export function usePontoDatabase() {

    const database = useSQLiteContext();

    async function create(data: Omit<PontoDatabase, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO ponto(nome, funcao, data_entrada, hora_entrada, data_saida, hora_saida) VALUES ($nome, $funcao, $data_entrada, $hora_entrada, $data_saida, $hora_saida)"
        );

        try {
            const result = await statement.executeAsync({
                $nome: data.nome,
                $funcao: data.funcao,
                $data_entrada: data.data_entrada,
                $hora_entrada: data.hora_entrada,
                $data_saida: data.data_saida,
                $hora_saida: data.hora_saida,
            });

            const insertedRowid = result.lastInsertRowId.toLocaleString();
            return { insertedRowid }
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function searchByNome(nome: string) {
        try {
            const query = "SELECT * FROM ponto WHERE nome LIKE ?";

            const response = await database.getAllAsync<PontoDatabase>(
                query,
                `%${nome}%`);

            return response;
        } catch (error) {
            throw error;
        }
    }
    
    async function searchByDate(data_entrada: string) {
        try {
            const query = "SELECT * FROM ponto WHERE data_entrada LIKE ?";
            const response = await database.getAllAsync<PontoDatabase>(
                query,
                `${data_entrada}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async function list() {
        try {
            const query = "SELECT * FROM ponto";

            const response = await database.getAllAsync<PontoDatabase>(query);
            console.log("my resp list:", response);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async function update(data: PontoDatabase) {
        const statement = await database.prepareAsync(
            "UPDATE ponto SET nome = $nome, funcao = $funcao, data_entrada = $data_entrada, hora_entrada = $hora_entrada, data_saida = $data_saida, hora_saida = $hora_saida  WHERE id = $id"
        )

        try {
            await statement.executeAsync({
                $id: data.id,
                $nome: data.nome,
                $funcao: data.funcao,
                $data_entrada: data.data_entrada,
                $hora_entrada: data.hora_entrada,
                $data_saida: data.data_saida,
                $hora_saida: data.hora_saida,
            })
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function remove(id: number) {
        try {
            await database.execAsync("DELETE FROM ponto WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function show(id: number) {
        try {
            const query = "SELECT * FROM ponto WHERE id = ?"

            const response = await database.getFirstAsync<PontoDatabase>(query, [
                id,
            ])

            return response
        } catch (error) {
            throw error
        }
    }

    return { create, searchByNome, searchByDate, remove, show, update, list };
}