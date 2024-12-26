import { useEffect, useState } from 'react';
import { Input } from '@/components/input';
import { StyleSheet,View, Button, Alert, FlatList } from 'react-native';
import { router } from "expo-router";
import { useUserDatabase, UserDatabase } from '@/database/useUserDatabase';
import { User } from '@/components/user';


const Style = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      padding: 100,
      gap: 6
    }
  });

export default function userView(){
    // npx expo probuild to generate android folder
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState<UserDatabase[]>([]);
    const [search, setSearch] = useState("");
    
    const userDatabase = useUserDatabase();

    async function create(){
        try {
            const response = await userDatabase.create({email, password});
            await listByEmail()
            Alert.alert("User added with sucess: " + response.insertedRowid);
        } catch (error) {
            console.log("Error to add new user:",error);
        } 
    }

    async function remove(id: number) {
        try {
          await userDatabase.remove(id)
          await listByEmail()
        } catch (error) {
          console.log(error)
        }
      }
    
    async function listByEmail(){
       try {
        const response = await userDatabase.searchByEmail(search);
        setUsers(response);
       } catch (error) {
         console.error("Error to get a user:", error);
       }
    }

    function details(item: UserDatabase) {
        setId(String(item.id))
        setEmail(item.email)
        setPassword(item.password)
      }
    
    useEffect(() => {
    listByEmail()
    }, [search]);

    return (
    <View style={Style.screen}>
       <Input placeholder='Email' onChangeText={setEmail} value={email}/>
       <Input placeholder='Senha' onChangeText={setPassword} value={password}/>
       <Button title='Save' onPress={create}/>
       <Input placeholder='Search' onChangeText={setSearch}/>
       <FlatList
         data={users}
         keyExtractor={(item) => String(item.id)}
         renderItem={({ item }) => (
            <User
             data={item}
             onPress={() => details(item)}
             onDelete={() => remove(item.id)}
             onOpen={() =>  router.push({ pathname: "/details/[id]", params: { id: item.id } })}
             />
         )}
         />
    </View>
    );
}