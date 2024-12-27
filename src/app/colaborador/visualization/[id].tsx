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
import { MaterialIcons } from '@expo/vector-icons'; // Import FontAwesome
import { BottomNav } from '@/components/bottomNav';
import Header from '@/components/header';
import { FuncaoDatabase, useFuncaoDatabase } from '@/database/useFuncaoDatabase';
import { useColaboradoratabase } from '@/database/useColaboradorDatabase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function EmployerViewForm() {
  const router = useRouter();
  //Get Pameteter
  const params = useLocalSearchParams<{ id: string }>()
  //Setting up input from form
  const [data, setData] = useState({
    nome: "",
    email: "",
    telefone: "",
    funcao: "",
    status: "",
    observacao: "",
  })
  //funcao Table
  const [funcaoTable, setFuncaoTable] = useState<FuncaoDatabase[]>([]);
  //Manager the database
  const funcaoDatabase = useFuncaoDatabase();
  const colaboradorDatabase = useColaboradoratabase();

  //Get item from database
  async function funcaoList() {
    try {
      const response = await funcaoDatabase.list();
      setFuncaoTable(response);
    } catch (error) {
      console.error("Error to get a funcao list:", error);
    }
  }

  useEffect(() => {
    if (Number(params.id) != 0) {
      colaboradorDatabase.show(Number(params.id)).then((response) => {
        if (response) {
          setData({
            nome: response.nome,
            email: response.email,
            telefone: response.telefone,
            funcao: response.funcao,
            status: response.status,
            observacao: response.observacao
          })
        }
      })
    }
    funcaoList()
  }, [params.id, funcaoTable]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Colaborador Formulário - Visualizar informações</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Form Inputs */}
        <Text style={styles.titleForm}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entre com o Nome do colaborador"
          value={data.nome}
        />

        <Text style={styles.titleForm}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entre com o Email do colaborador"
          value={data.email}
        />
        <Text style={styles.titleForm}>Telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entre com o Telefone do colaborador"
          value={data.telefone}
        />

        <Text style={styles.titleForm}>Funcão:</Text>
        {/* Picker and + button wrapped in a row */}
        <View style={styles.pickerRow}>
          <Picker
            selectedValue={data.funcao}
            style={styles.picker}
          >
            <Picker.Item label="Selecione a função do colaborador" value="" />
            {funcaoTable.length < 0 ? (
              <Picker.Item label="Carregando..." value="" />
            ) : (
              funcaoTable.map((option, index) => (
                <Picker.Item key={index} label={option.nome} value={option.nome} />
              ))
            )}

          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.titleForm}>Disponibilidade:</Text>
          <Picker
            selectedValue={data.status}
            style={styles.picker}
          >
            <Picker.Item label="Selecione se o colaborador esta ativo ou não" value="" />
            <Picker.Item label="Ativo" value="Ativo" />
            <Picker.Item label="Desativado" value="Desativado" />
          </Picker>
        </View>

        <Text style={styles.titleForm}>Observações:</Text>
        <TextInput
          style={styles.input}
          placeholder="Escreva as observações referente ao colaborador"
          value={data.observacao}
          multiline={true}
          numberOfLines={10}
        />

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: "/colaborador/colaborador-view", params: {} })}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
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
    fontSize: hp('2%'),
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
});
