import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import FontAwesome
import { BottomNav } from '@/components/bottomNav';
import Header from '@/components/header';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function PontoForm() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const  [searchEmployer, setSerchEmployer] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const employees = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Michael Johnson' },
    { id: '4', name: 'Emily Davis' },
  ];

  const handleSelectEmployee = (employee: { id: string; name: string }) => {
    setSelectedEmployee(employee.name);
    console.log('Selected Employee:', employee);
  };
  const handleAdd = () => {
    Alert.alert('Add', `Name: ${name}, Email: ${email}, Option: ${selectedOption}`);
  };

  const handleUpdate = () => {
    Alert.alert('Update', `Name: ${name}, Email: ${email}, Option: ${selectedOption}`);
  };
   
  const handleDateChange = (event:any, date:any) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (event:any, time:any) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
       <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
         <MaterialIcons name="arrow-back" size={30} color="white" />
       </TouchableOpacity>
        <Text style={styles.headerTitle}>Ponto Formulário - Cadastro/Edição</Text>
       </View>

      {/* Content */}
      <View style={styles.content}>
       <Text style={styles.title}>CRM Manager</Text>
       {/* Form */}
       <TouchableOpacity style={styles.SearchEmploButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Buscar Colaborador</Text>
       </TouchableOpacity>
       {/* Form Inputs */}
               <Text style={styles.titleForm}>Nome:</Text>
               <TextInput
                 style={styles.input}
                 placeholder="Entre com o Nome do colaborador"
                 value={name}
                 onChangeText={setName}
               />
       
               <Text style={styles.titleForm}>Funcão:</Text>
                {/* Picker and + button wrapped in a row */}
                <View style={styles.pickerRow}>
                 <Picker
                   selectedValue={selectedOption}
                   onValueChange={(itemValue) => setSelectedOption(itemValue)}
                   style={styles.picker}
                 >
                   <Picker.Item label="Função do colaborador" value="" />
                   <Picker.Item label="Option 1" value="option1" />
                   <Picker.Item label="Option 2" value="option2" />
                   <Picker.Item label="Option 3" value="option3" />
                 </Picker>
               </View>

      <Text style={styles.titleForm}>Data e Hora da entrada:</Text>
      <View style={styles.dateTimeContainer}>
        {/* Date Picker */}
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={showDatePickerModal} style={styles.pickerButton}>
            <Text style={styles.pickerText}>
              {selectedDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {/* Show Date Picker */}
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Time Picker */}
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={showTimePickerModal} style={styles.pickerButton}>
            <Text style={styles.pickerText}>
              {selectedTime.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>

          {/* Show Time Picker */}
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
      </View>
       

      <Text style={styles.titleForm}>Data e Hora da saida:</Text>
      <View style={styles.dateTimeContainer}>
        {/* Date Picker */}
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={showDatePickerModal} style={styles.pickerButton}>
            <Text style={styles.pickerText}>
              {selectedDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {/* Show Date Picker */}
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Time Picker */}
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={showTimePickerModal} style={styles.pickerButton}>
            <Text style={styles.pickerText}>
              {selectedTime.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>

          {/* Show Time Picker */}
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
      </View>

        {/* Buttons */}
        {id === "" ? (
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Atualizar</Text>
          </TouchableOpacity>
        )}

<Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecione o colaborador</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar pelo nome do colaborador..."
            value={searchEmployer}
            onChangeText={setSerchEmployer}
          />
          <FlatList
            data={employees}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.employeeRow}
                onPress={() => {
                  Alert.alert("Selected",item.name);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.employeeName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
  SearchEmploButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 50,
    width: 250,
    alignItems: 'center',
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 50,
    width: 120,
    alignItems: 'center',
    marginVertical: 10, // Add space between the icon and title
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
    marginBottom: 15,   // Adds space between the title and the input
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
    flex: 1,
    marginRight: 10,  
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  employeeRow: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  employeeName: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    flexDirection: 'row',  // Arrange Date and Time pickers side by side
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerText: {
    color: '#fff',
    fontSize: 16,
  },
});
