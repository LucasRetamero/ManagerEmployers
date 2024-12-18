import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  Modal
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import FontAwesome
import { BottomNav } from '@/components/bottomNav';
import Header from '@/components/header';
import { useFuncaoDatabase, FuncaoDatabase } from '@/database/useFuncaoDatabase';

export default function EmployerForm() {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  //Case add new item from Funcao table
  const [nomeFuncao, setNomeFuncao] = useState("");
  //Setting up Model 
  const [modalVisible, setModalVisible] = useState(false);
  //funcao Table
  const [funcaoTable, setFuncaoTable] = useState<FuncaoDatabase[]>([]);
 //Manager the database
  const funcaoDatabase = useFuncaoDatabase();
   
  const handleAdd = () => {
    Alert.alert('Add', `Name: ${name}, Email: ${email}, Option: ${selectedOption}`);
  };

  const handleUpdate = () => {
    Alert.alert('Update', `Name: ${name}, Email: ${email}, Option: ${selectedOption}`);
  };
   
//Add new item on the database
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
  funcaoList()
  }, [funcaoTable]);
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
       <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
         <MaterialIcons name="arrow-back" size={30} color="white" />
       </TouchableOpacity>
        <Text style={styles.headerTitle}>Colaborador Formulário - Cadastro/Edição</Text>
       </View>

      {/* Content */}
      <View style={styles.content}>
       <Text style={styles.title}>CRM Manager</Text>

        {/* Form Inputs */}
        <Text style={styles.titleForm}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entre com o Nome do colaborador"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.titleForm}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entre com o Email do colaborador"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.titleForm}>Telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entre com o Telefone do colaborador"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.titleForm}>Funcão:</Text>
         {/* Picker and + button wrapped in a row */}
         <View style={styles.pickerRow}>
          <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue) => setSelectedOption(itemValue)}
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
            selectedValue={selectedOption}
            onValueChange={(itemValue) => setSelectedOption(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione se o colaborador esta ativo ou não" value="" />
            <Picker.Item label="Disponivel" value="Disponivel" />
            <Picker.Item label="Indisponível" value="Indisponível" />
          </Picker>
        </View>

        <Text style={styles.titleForm}>Observações:</Text>
        <TextInput
          style={styles.input}
          placeholder="Escreva as observações referente ao colaborador"
          value={description}
          onChangeText={setDescription}
          multiline={true}  
          numberOfLines={10} 
        />
        
         {/* Add new Funcao */}
                <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={ () => setModalVisible(false)}
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
                        onPress={ () => setModalVisible(false)}
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
        {id === null ? (
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Atualizar</Text>
          </TouchableOpacity>
        )}
      </View>
     <BottomNav/>
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
