import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Pressable
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import FontAwesome
import { BottomNav } from '@/components/bottomNav';
import Header from '@/components/header';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { usePontoDatabase } from '@/database/usePontoDatabase';
import { ColaboradorDatabase, useColaboradoratabase } from '@/database/useColaboradorDatabase';
import { format } from 'date-fns-tz';

export default function PontoForm() {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  // Setting up input to search empluyer
  const [searchEmployer, setSerchEmployer] = useState("");

  //Setting up hour and time input and output
  const BRAZILIAN_TIMEZONE = 'America/Sao_Paulo';
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedOutputDateTime, setSelectedOutputDateTime] = useState<Date>(new Date());
  const [showOutputDatePicker, setShowOutputDatePicker] = useState(false);
  const [showOutputTimePicker, setShowOutputTimePicker] = useState(false);

  //Setting up default input
  const initialData = {
    nome: "",
    funcao: "",
    data_entrada: "",
    hora_entrada: "",
    data_saida: "",
    hora_saida: ""
  };

  //Setting up text button
  const [buttonAction, setButtonAction] = useState("Adicionar");
   //Input from form
  const [data, setData] = useState({
    nome: "",
    funcao: "",
    data_entrada: "",
    hora_entrada: "",
    data_saida: "",
    hora_saida: ""
  })
  //colaborador Table
  const [colaboradorTable, setColaboradorTable] = useState<ColaboradorDatabase[]>([]);
  //Get Parameter
  const params = useLocalSearchParams<{ id: string }>()
   // Use state to manage `id` dynamically
   const [dynamicId, setDynamicId] = useState(params.id); 
  //Manager the database
  const pontoDatabase = usePontoDatabase();
  const colaboradorDatabase = useColaboradoratabase();


  //Manager the input
  const handleNomeChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      nome: text,
    }));
  };

  const handleFuncaoChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      funcao: text,
    }));
  };

  const handleDataEntradaChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      data_entrada: text,
    }));
  };

  const handleHoraEntradaChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      hora_entrada: text,
    }));
  };

  const handleDataSaidaChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      data_saida: text,
    }));
  };
   
  const handleHoraSaidaChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      hora_saida: text,
    }));
  };

  //Case select employer from table
  function selectedEmployer(nome: string, funcao: string) {
    handleNomeChange(nome);
    handleFuncaoChange(funcao);
    setDynamicId("0");
    setButtonAction("Adicionar");
  }

  //Setting up hour and time functions
  const formatToBrazilianTime = (date: Date): string => {
    return format(date, 'dd/MM/yyyy HH:mm:ss', { timeZone: BRAZILIAN_TIMEZONE });
  };

  // Input Date and Hour functions
  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date) {
      // Update only the date portion
      selectedDateTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setSelectedDateTime(new Date(selectedDateTime));
      handleDataEntradaChange(format(new Date(selectedDateTime), 'dd/MM/yyyy', { timeZone: BRAZILIAN_TIMEZONE }));
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    if (event.type === 'set' && time) {
      // Update only the time portion
      selectedDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
      setSelectedDateTime(new Date(selectedDateTime));
      handleHoraEntradaChange(format(new Date(selectedDateTime), 'HH:mm', { timeZone: BRAZILIAN_TIMEZONE }));
    }
    setShowTimePicker(false);
  };

  // Outut Date and Hour functions
  const handleOutputDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date) {
      // Update only the date portion
      selectedOutputDateTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setSelectedOutputDateTime(new Date(selectedOutputDateTime));
      handleDataSaidaChange(format(new Date(selectedOutputDateTime), 'dd/MM/yyyy', { timeZone: BRAZILIAN_TIMEZONE }));
    }
    setShowOutputDatePicker(false);
  };

  const handleOutputTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    if (event.type === 'set' && time) {
      // Update only the time portion
      selectedOutputDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
      setSelectedOutputDateTime(new Date(selectedOutputDateTime));
      handleHoraSaidaChange(format(new Date(selectedOutputDateTime), 'HH:mm', { timeZone: BRAZILIAN_TIMEZONE }));
    }
    setShowOutputTimePicker(false);
  };


  // when close model from employer table
  function closeEmployerModel() {
    setSerchEmployer("");
    setModalVisible(false);
  }

  //Add new employer on the database
  async function create() {
    try {
      const response = await pontoDatabase.create({
        nome: data.nome,
        funcao: data.funcao,
        data_entrada: data.data_entrada,
        hora_entrada: data.hora_entrada,
        data_saida: data.data_saida,
        hora_saida: data.hora_saida
      });
      setData(initialData);
      Alert.alert("Ponto adicionado com sucesso !");
    } catch (error) {
      console.log("Error to add new ponto:", error);
    }
  }

  //Update employer from database
  async function update() {
    try {
      const response = await pontoDatabase.update({
        id: Number(dynamicId),
        nome: data.nome,
        funcao: data.funcao,
        data_entrada: data.data_entrada,
        hora_entrada: data.hora_entrada,
        data_saida: data.data_saida,
        hora_saida: data.hora_saida
      });
      Alert.alert("Ponto atualizado com sucesso !");
      router.back();
    } catch (error) {
      console.log("Error to update ponto:", error);
    }
  }

  //Get item from database
  async function colaboradorList() {
    try {
      const response = await colaboradorDatabase.searchByNome(searchEmployer);
      setColaboradorTable(response);
    } catch (error) {
      console.error("Error to get a colaborador list:", error);
    }
  }

  useEffect(() => {
    if (Number(dynamicId) === 0) {
      setButtonAction("Adicionar")
    } else {
      setButtonAction("Atualizar")
    }
    if (Number(dynamicId) != 0) {
      pontoDatabase.show(Number(dynamicId)).then((response) => {
        if (response) {
          setData({
            nome: response.nome,
            funcao: response.funcao,
            data_entrada: response.data_entrada,
            hora_entrada: response.hora_entrada,
            data_saida: response.data_saida,
            hora_saida: response.hora_saida
          })
        }
      })
    }
    colaboradorList()
  }, [searchEmployer]);

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
          value={data.nome}
          onChangeText={handleNomeChange}
        />

        <Text style={styles.titleForm}>Data e Hora da entrada:</Text>
        <View style={styles.dateTimeContainer}>
          {/* Date Picker */}
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.pickerButton}
            >
              <Text style={styles.pickerText}>
                {selectedDateTime.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {/* Show Date Picker */}
            {showDatePicker && (
              <DateTimePicker
                value={selectedDateTime}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Time Picker */}
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={styles.pickerButton}
            >
              <Text style={styles.pickerText}>
                {format(selectedDateTime, 'HH:mm:ss', { timeZone: BRAZILIAN_TIMEZONE })}
              </Text>
            </TouchableOpacity>

            {/* Show Time Picker */}
            {showTimePicker && (
              <DateTimePicker
                value={selectedDateTime}
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
            <TouchableOpacity
              onPress={() => setShowOutputDatePicker(true)}
              style={styles.pickerButton}
            >
              <Text style={styles.pickerText}>
                {selectedOutputDateTime.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {/* Show Date Picker */}
            {showOutputDatePicker && (
              <DateTimePicker
                value={selectedOutputDateTime}
                mode="date"
                display="default"
                onChange={handleOutputDateChange}
              />
            )}
          </View>

          {/* Time Picker */}
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={() => setShowOutputTimePicker(true)}
              style={styles.pickerButton}
            >
              <Text style={styles.pickerText}>
                {format(selectedOutputDateTime, 'HH:mm:ss', { timeZone: BRAZILIAN_TIMEZONE })}
              </Text>
            </TouchableOpacity>

            {/* Show Time Picker */}
            {showOutputTimePicker && (
              <DateTimePicker
                value={selectedOutputDateTime}
                mode="time"
                display="default"
                onChange={handleOutputTimeChange}
              />
            )}
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={() => {
          if (Number(dynamicId) === 0) {
            create();
          } else {
            update();
          }
        }}>
          <Text style={styles.buttonText}>{buttonAction}</Text>
        </TouchableOpacity>

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
                onChangeText={(text) => setSerchEmployer(text)}
              />
              <FlatList
                data={colaboradorTable}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.employeeRow}
                    onPress={() => {
                      selectedEmployer(item.nome, item.funcao);
                      closeEmployerModel();
                    }}
                  >
                    <Text style={styles.employeeName}>{item.nome}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => closeEmployerModel()}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: '#007BFF',
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
    fontSize: 18,
    color: '#007BFF', // Blue text color
    fontWeight: 'bold',
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
  logButton: {
    backgroundColor: '#28A745',
  },
  selectedContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  
});
