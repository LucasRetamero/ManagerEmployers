import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import FontAwesome
import { BottomNav } from '@/components/bottomNav';
import Header from '@/components/header';
import { useFuncaoDatabase } from '@/database/useFuncaoDatabase';

export default function FuncaoFormView() {
  const router = useRouter();
  //ID from funcao
  const [id, setId] = useState(null);
  //Input from form
  const [data, setData] = useState({
    nome: "",
  })

  //Get Parameter
  const params = useLocalSearchParams<{ id: string }>()
  //Manager the database
  const funcaoDatabase = useFuncaoDatabase();


  //Manager the input
  const handleNomeChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      nome: text, // Update only the email field
    }));
  };

  //Add new item on the database
  async function create() {
    try {
      if (!data.nome) {
        Alert.alert("Preencha o campo antes de continuar !")
        return;
      }
      const response = await funcaoDatabase.create({ nome: data.nome });
      Alert.alert("Função adicionada com sucesso !");
      handleNomeChange("");
    } catch (error) {
      console.log("Error to add new funcao:", error);
    }
  }

  //Updated item from database
  async function update() {
    try {
      if (!data.nome) {
        Alert.alert("Preencha o campo antes de continuar !")
        return;
      }
      const response = await funcaoDatabase.update({ id: Number(params.id), nome: data.nome });
      Alert.alert("Função atualizada !");
      router.back();
    } catch (error) {
      console.error("Error to updated funcao:", error);
    }
  }
  
   useEffect(() => {
      if (Number(params.id) != 0) {
        funcaoDatabase.show(Number(params.id)).then((response) => {
          if (response) {
            setData({
              nome: response.nome,
            })
          }
        })
      }
    }, [params.id])
    
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Função Formulário - Cadastro/Edição</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>CRM Manager</Text>

        {/* Form Inputs */}
        <Text style={styles.titleForm}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entre com o nome do função"
          value={data.nome}
          onChangeText={handleNomeChange}
        />

        {/* Buttons */}
        {params.id === "0" ? (
          <TouchableOpacity style={styles.button} onPress={create}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={update}>
            <Text style={styles.buttonText}>Atualizar</Text>
          </TouchableOpacity>
        )}
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 15,
  },
  backButton: {
    marginRight: 10, // Add space between the icon and title
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#007BFF',
  },
  titleForm: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left', // Ensures the text is aligned to the left
    width: '100%',     // Matches the width of the input
    marginBottom: 5,   // Adds space between the title and the input
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#007BFF',
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
  pickerContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#007BFF',
    marginBottom: 20,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 50,
    width: 120,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
