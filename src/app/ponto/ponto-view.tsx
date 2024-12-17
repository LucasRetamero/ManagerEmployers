import React, { useState } from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';

export default function PontoView() {
  //States to modal and radiobutton
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const options = ['Nome', 'Data & Hora', 'Função'];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  // States for date and time pickers
  const [inputDate, setInputDate] = useState(new Date());
  const [outputDate, setOutputDate] = useState(new Date());
  const [showInputDatePicker, setShowInputDatePicker] = useState(false);
  const [showOutputDatePicker, setShowOutputDatePicker] = useState(false);

  // Updated table data structure
  const [tableData, setTableData] = useState([
    {
      id: '1',
      name: 'John Doe',
      inputDate: '15-12-2024',
      inputTime: '09:00',
      outputDate: '15-12-2024',
      outputTime: '17:00',
    },
    {
      id: '2',
      name: 'Jane Smith',
      inputDate: '15-12-2024',
      inputTime: '08:30',
      outputDate: '16-12-2024',
      outputTime: '16:30',
    },
  ]);

  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setFilterModalVisible(false);
  };

  const handleDateChange = (event: any, date: any, type: any) => {
    if (type === 'input' && date) {
      setShowInputDatePicker(false);
      setInputDate(date);
    } else if (type === 'output' && date) {
      setShowOutputDatePicker(false);
      setOutputDate(date);
    }
  };

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
            <TextInput style={styles.input} placeholder="Entre com a pesquisa" />
          </View>
        )}

        {selectedOption === 'Data & Hora' && (
          <View>
            {/* Input Date-Time Pickers */}
            <Text style={styles.label}>Entrada:</Text>
            <View style={styles.dateTimeRow}>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowInputDatePicker(true)}
              >
                <Text style={styles.dateTimeText}>
                  {inputDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowInputDatePicker(true)}
              >
                <Text style={styles.dateTimeText}>
                  {inputDate.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Saída:</Text>
            <View style={styles.dateTimeRow}>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowOutputDatePicker(true)}
              >
                <Text style={styles.dateTimeText}>
                  {outputDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowOutputDatePicker(true)}
              >
                <Text style={styles.dateTimeText}>
                  {outputDate.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
            </View>

            {/* DateTime Pickers */}
            {showInputDatePicker && (
              <DateTimePicker
                value={inputDate}
                mode="date"
                display="default"
                onChange={(event, date) => handleDateChange(event, date, 'input')}
              />
            )}
            {showOutputDatePicker && (
              <DateTimePicker
                value={outputDate}
                mode="date"
                display="default"
                onChange={(event, date) => handleDateChange(event, date, 'output')}
              />
            )}

            <View>
              {/* Blue Search Button */}
              <TouchableOpacity style={styles.searchButton} onPress={() => Alert.alert("Search by data and hour")}>
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
        <PontoTable data={tableData} />
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
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20, // Space from the previous content
    width: '100%',
    marginBottom: 15,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
