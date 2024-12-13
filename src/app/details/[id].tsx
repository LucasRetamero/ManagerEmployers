import { useState, useEffect } from "react"
import { View, Text, Button, Alert } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { router } from "expo-router";
import { useUserDatabase } from "@/database/useUserDatabase"
import { Input } from "@/components/input"

export default function Details() {
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const userDatabase = useUserDatabase()
  const params = useLocalSearchParams<{ id: string }>()
  
  async function update(){
    try {
        const response = await userDatabase.update({id: Number(params.id), email: data.email, password: data.password});
        Alert.alert("User updated");
        router.navigate("/");
    } catch (error) {
        console.error("Error to updated user:", error);
    }
  }
  
  const handleEmailChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      email: text, // Update only the email field
    }));
  };

  const handlePasswordChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      password: text, // Update only the email field
    }));
  };

  useEffect(() => {
    if (params.id) {
      userDatabase.show(Number(params.id)).then((response) => {
        if (response) {
          setData({
            email: response.email,
            password: response.password,
          })
        }
      })
    }
  }, [params.id])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 32 }}>ID: {params.id} </Text>
      <Input style={{ fontSize: 32 }} placeholder="Email" onChangeText={handleEmailChange} defaultValue={data.email}></Input>
      <Input style={{ fontSize: 32 }} placeholder="Password" onChangeText={handlePasswordChange} defaultValue={data.password}></Input>
      <Button title='Update' onPress={update}/>
    </View>
  )
}