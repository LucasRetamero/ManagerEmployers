import React, { useState } from 'react';
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
import { useRouter } from 'expo-router';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import FontAwesome
import { BottomNav } from '@/components/bottomNav';
import Header from '@/components/header';

export default function EmployerForm() {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState('');

  const handleAdd = () => {
    Alert.alert('Add', `Name: ${name}, Email: ${email}, Option: ${selectedOption}`);
  };

  const handleUpdate = () => {
    Alert.alert('Update', `Name: ${name}, Email: ${email}, Option: ${selectedOption}`);
  };
   
  const handleAddFunction = () => {
    // Your function to handle the "Add" action
    alert('Add new function');
  };
  
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
            <Picker.Item label="Option 1" value="option1" />
            <Picker.Item label="Option 2" value="option2" />
            <Picker.Item label="Option 3" value="option3" />
          </Picker>

          {/* Add button with + icon */}
          <TouchableOpacity onPress={handleAddFunction} style={styles.addButton}>
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
            <Picker.Item label="Disponivel" value="option1" />
            <Picker.Item label="Indisponível" value="option2" />
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
});
