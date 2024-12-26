import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  Modal,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import FontAwesome
import { BottomNav } from '@/components/bottomNav';
import Header from '@/components/header';
import { useFuncaoDatabase, FuncaoDatabase } from '@/database/useFuncaoDatabase';
import { useColaboradoratabase } from '@/database/useColaboradorDatabase';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function EmployerForm() {
  const router = useRouter();
  //Setting up input from form
  const [data, setData] = useState({
    nome: "",
    email: "",
    telefone: "",
    funcao: "",
    status: "",
    observacao: "",
  })
  //Setting up default input
  const initialData = {
    nome: "",
    email: "",
    telefone: "",
    funcao: "",
    status: "",
    observacao: "",
  };
  //Get Pameteter
  const params = useLocalSearchParams<{ id: string }>()
  //Case add new item from Funcao table
  const [nomeFuncao, setNomeFuncao] = useState("");
  //Setting up Modal 
  const [modalVisible, setModalVisible] = useState(false);
  //Check if get data or not
  const [isDataOnForm, setIsDataOnForm] = useState(false);
  //funcao Table
  const [funcaoTable, setFuncaoTable] = useState<FuncaoDatabase[]>([]);
  //Manager the database
  const funcaoDatabase = useFuncaoDatabase();
  const colaboradorDatabase = useColaboradoratabase();

  //Manager the input
  const handleNomeChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      nome: text,
    }));
  };

  const handleEmailChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      email: text,
    }));
  };

  const handleTelefoneChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      telefone: formatPhoneNumber(text)
    }));
  };

  const handleFuncaoChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      funcao: text,
    }));
  };

  const handleStatusChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      status: text,
    }));
  };

  const handleObservacaoChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      observacao: text,
    }));
  };

  // regex to format phone
  function formatPhoneNumber(phone: string) {
    const number = phone.length <= 14 ? phone.replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
      :
      phone.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')
      ;
    return number;
  }

  //Add new employer on the database
  async function create() {
    try {
      const response = await colaboradorDatabase.create({
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        funcao: data.funcao,
        status: data.status,
        observacao: data.observacao
      });
      setData(initialData);
      Alert.alert("Colaborador adicionado com sucesso !");
    } catch (error) {
      console.log("Error to add new colaborador:", error);
    }
  }

  //Add new function on the database
  async function createFuncao() {
    try {
      if (!nomeFuncao) {
        Alert.alert("Preencha o campo antes de continuar !")
        return;
      }
      const response = await funcaoDatabase.create({ nome: nomeFuncao });
      setNomeFuncao("");
      funcaoList();
      setModalVisible(false);
    } catch (error) {
      console.log("Error to add new funcao:", error);
    }
  }

  //Update employer from database
  async function update() {
    try {
      const response = await colaboradorDatabase.update({
        id: Number(params.id),
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        funcao: data.funcao,
        status: data.status,
        observacao: data.observacao
      });
      Alert.alert("Colaborador atualizado com sucesso !");
      router.back();
    } catch (error) {
      console.log("Error to add new colaborador:", error);
    }
  }

  //Get item from database
  async function funcaoList() {
    try {
      const response = await funcaoDatabase.list();
      setFuncaoTable(response);
    } catch (error) {
      console.error("Error to get a funcao list:", error);
    }
  }

  //Get data case has id
  async function getData() {
    if (Number(params.id) != 0 && !isDataOnForm) {
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
        setIsDataOnForm(true);
      })
    }
  }

  useEffect(() => {
    funcaoList()
    getData()
  }, [funcaoTable, params.id]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Colaborador Formulário - Cadastro/Edição</Text>
      </View>

      <ScrollView>
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>CRM Manager</Text>
        {/* Form Inputs */}
        <Text style={styles.titleForm}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entre com o Nome do colaborador"
          value={data.nome}
          onChangeText={handleNomeChange}
        />
        <Text style={styles.titleForm}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entre com o Email do colaborador"
          value={data.email}
          onChangeText={handleEmailChange}
        />
        <Text style={styles.titleForm}>Telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entre com o Telefone do colaborador"
          value={data.telefone}
          onChangeText={handleTelefoneChange}
        />

        <Text style={styles.titleForm}>Funcão:</Text>
        {/* Picker and + button wrapped in a row */}
        <View style={styles.pickerRow}>
          <Picker
            selectedValue={data.funcao}
            onValueChange={(itemValue) => handleFuncaoChange(itemValue)}
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

          {/* Add button with + icon */}
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
            <FontAwesome name="plus" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.titleForm}>Disponibilidade:</Text>
          <Picker
            selectedValue={data.status}
            onValueChange={(itemValue) => handleStatusChange(itemValue)}
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
          onChangeText={handleObservacaoChange}
          multiline={true}
          numberOfLines={10}
        />
 
        {/* Add new Funcao */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Adicionar nova função</Text>
              {/* Form Inputs */}
              <TextInput
                style={styles.input}
                placeholder="Entre com o nome do função"
                value={nomeFuncao}
                onChangeText={setNomeFuncao}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={[styles.button, styles.cancelButton]}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={createFuncao}
                  style={[styles.button, styles.confirmButton]}
                >
                  <Text style={styles.buttonText}>Gravar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Buttons */}
        {Number(params.id) === 0 ? (
          <TouchableOpacity style={styles.button} onPress={create}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={update}>
            <Text style={styles.buttonText}>Atualizar</Text>
          </TouchableOpacity>
        )}
     
      </View>
      </ScrollView>
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
    padding: 20,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: 'blue',
  },
  confirmButton: {
    backgroundColor: 'green',
  },
});
