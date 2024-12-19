import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet,
  FlatList,
  Alert
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Header from '@/components/header';
import { BottomNav } from '@/components/bottomNav';
import { router } from 'expo-router';
import PontoTable from '@/components/pontoTable';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { PontoDatabase, usePontoDatabase } from '@/database/usePontoDatabase';
import { format } from 'date-fns-tz';

export default function PontoView() {
  //Setting up search
  const [search, setSearch] = useState("");
  //Setting up modal to ask remove iten
  const [modalVisible, setModalVisible] = useState(false);
  //States to modal and radiobutton
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const options = ['Nome'];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  //Setting up hour and time input and output
  const BRAZILIAN_TIMEZONE = 'America/Sao_Paulo';
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedOutputDateTime, setSelectedOutputDateTime] = useState<Date>(new Date());
  const [showOutputDatePicker, setShowOutputDatePicker] = useState(false);
  const [showOutputTimePicker, setShowOutputTimePicker] = useState(false);

  //Colaborador Table
  const [pontoTable, setPontoTable] = useState<PontoDatabase[]>([]);

  //Manager the database
  const pontoDatabase = usePontoDatabase();

  // ID from table
  const [id, setId] = useState(0);

  //Input to query by Date
  const [data, setData] = useState({
    data_entrada: "",
    data_saida: ""
  });

  //Setting function to manager input
  const handleDataEntradaChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      data_entrada: text,
    }));
  };

  const handleDataSaidaChange = (text: string) => {
    setData((prevData) => ({
      ...prevData,
      data_saida: text,
    }));
  };

  //Get List from database
  async function list() {
    try {
      const response = await pontoDatabase.searchByNome(search)
      setPontoTable(response);
    } catch (error) {
      console.error("Error to get a ponto:", error);
    }
  }

  //Get List by Datefrom database
  async function listByDate() {;
    try {
      const response = await pontoDatabase.searchByDate(data.data_entrada, data.data_saida)
      setPontoTable([]);
      setPontoTable(response);
    } catch (error) {
      console.error("Error to get a ponto by date:", error);
    }
  }

  //Remove data by id from database
  async function remove() {
    try {
      await pontoDatabase.remove(id);
      await list();
      setId(0);
      setModalVisible(false);
    } catch (error) {
      console.log(error)
    }
  }

  //Case confirm to remove item
  function confirmDeletion(id: number) {
    setModalVisible(true);
    setId(id);
  }

  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setFilterModalVisible(false);
  };

  //Setting up hour and time functions
  const formatToBrazilianTime = (date: Date): string => {
    return format(date, 'dd-MM-yyyy HH:mm:ss', { timeZone: BRAZILIAN_TIMEZONE });
  };

  // Input Date and Hour functions
  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date) {
      // Update only the date portion
      selectedDateTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setSelectedDateTime(new Date(selectedDateTime));
      handleDataEntradaChange(format(new Date(selectedDateTime), 'dd-MM-yyyy HH:mm:ss', { timeZone: BRAZILIAN_TIMEZONE }));
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    if (event.type === 'set' && time) {
      // Update only the time portion
      selectedDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
      setSelectedDateTime(new Date(selectedDateTime));
      handleDataEntradaChange(format(new Date(selectedDateTime), 'dd-MM-yyyy HH:mm:ss', { timeZone: BRAZILIAN_TIMEZONE }));
    }
    setShowTimePicker(false);
  };

  // Outut Date and Hour functions
  const handleOutputDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date) {
      // Update only the date portion
      selectedOutputDateTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setSelectedOutputDateTime(new Date(selectedOutputDateTime));
      handleDataSaidaChange(format(new Date(selectedOutputDateTime), 'dd-MM-yyyy HH:mm:ss', { timeZone: BRAZILIAN_TIMEZONE }));
    }
    setShowOutputDatePicker(false);
  };

  const handleOutputTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    if (event.type === 'set' && time) {
      // Update only the time portion
      selectedOutputDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
      setSelectedOutputDateTime(new Date(selectedOutputDateTime));
      handleDataSaidaChange(format(new Date(selectedOutputDateTime), 'dd-MM-yyyy HH:mm:ss', { timeZone: BRAZILIAN_TIMEZONE }));
    }
    setShowOutputTimePicker(false);
  };

  useEffect(() => {
    list()
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header />

        <TouchableOpacity onPress={toggleFilterModal} style={styles.filterIcon}>
          <FontAwesome name="filter" size={25} color="white" style={styles.icon} />
          <Text style={styles.filterText}> Filtrar pesquisa</Text>
        </TouchableOpacity>

        {/* Conditional Rendering */}
        {(selectedOption === 'Nome' || selectedOption === 'Função') && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Entre com a pesquisa"
              value={search}
              onChangeText={setSearch} />
          </View>
        )}

        {selectedOption === 'Data & Hora' && (
          <View>
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
            <View>
              {/* Blue Search Button */}
              <TouchableOpacity style={styles.searchButton} onPress={listByDate}>
                <Text style={styles.searchButtonText}>Pesquisar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Modal
          visible={filterModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleFilterModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.filterTitle}>Selecione a opção de filtro:</Text>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.radioButtonContainer}
                  onPress={() => handleOptionSelect(option)}
                >
                  <View
                    style={[
                      styles.radioButton,
                      selectedOption === option && styles.selectedRadioButton,
                    ]}
                  />
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={toggleFilterModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Table rendering */}
        <FlatList
          data={pontoTable}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.nome}</Text>
              <Text style={styles.tableCell}>{item.data_entrada}</Text>
              <Text style={styles.tableCell}>{item.data_saida}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => confirmDeletion(item.id)}>
                  <MaterialIcons name="remove-circle-outline" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "/ponto/edition/[id]", params: { id: item.id } })}>
                  <MaterialIcons name="edit" size={24} color="blue" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </View>

      {/* Custom Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmação</Text>
            <Text style={styles.modalMessage}>Deseja realmente remover o ponto ? </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={remove}
                style={[styles.button, styles.confirmButton]}
              >
                <Text style={styles.buttonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#007bff',
    padding: 15,
    marginRight: 10,
    borderRadius: 5,
  },
  filterIcon: {
    flexDirection: 'row', // Aligns children (icon and text) in a row
    alignItems: 'center', // Vertically centers the icon and text
    backgroundColor: '#007BFF', // Background color for the button
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  icon: {
    marginRight: 8, // Adds space between the icon and text
  },
  filterText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    marginRight: 10,
  },
  selectedRadioButton: {
    backgroundColor: '#007bff',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    marginTop: 20,
    fontSize: 16,
    color: '#007bff',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateTimeButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  dateTimeText: {
    color: '#fff',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20, // Space from the previous content
    width: '100%',
    marginBottom: 10,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: 'white', // White background for rows
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Light gray border
    alignItems: 'center', // Align content vertically
  },
  tableCell: {
    flex: 2, // Adjust column width
    fontSize: 18,
    color: '#007BFF', // Blue text color
    textAlign: 'center',
    fontWeight: 'bold',
  },
  actions: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'blue',
  },
  confirmButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  titleForm: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left', // Ensures the text is aligned to the left
    width: '100%',     // Matches the width of the input
    marginBottom: 15,   // Adds space between the title and the input
  },
  pickerContainer: {
    flex: 1,
    marginRight: 10,
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
