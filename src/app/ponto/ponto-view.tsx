import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Header from '@/components/header';
import { BottomNav } from '@/components/bottomNav';
import { router } from 'expo-router';
import PontoTable from '@/components/pontoTable';

export default function PontoView() {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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

  const handleOptionSelect = (option:any) => {
    setSelectedOption(option);
    setFilterModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header />
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Entre com a pesquisa" />
          <TouchableOpacity onPress={toggleFilterModal} style={styles.filterIcon}>
            <FontAwesome name="filter" size={25} color="white" />
          </TouchableOpacity>
        </View>

        <Modal
          visible={filterModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleFilterModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.filterTitle}>Selecione a opção de filtro:</Text>
              {['Nome', 'Função'].map((option, index) => (
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
        <PontoTable data={tableData}/>
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
    padding: 16,
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
    padding: 10,
    backgroundColor: '#007bff',
    color: '#FFF',
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
});
