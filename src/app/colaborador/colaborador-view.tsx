import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text, Button, StyleSheet, FlatList } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Header from '@/components/header';
import { BottomNav } from '@/components/bottomNav';
import { router } from 'expo-router';

export default function colaboradorView(){
   
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [tableData, setTableData] = useState([
    { id: '1', name: 'John Doe', size: 'Large' },
    { id: '2', name: 'Jane Smith', size: 'Medium' },
  ]);

  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setFilterModalVisible(false);
  };
  
  
  return (
    <View style={styles.container}>
    <View style={styles.content}>
    <Header />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Entre com a pesquisa"
        />
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
            {['Option 1', 'Option 2', 'Option 3'].map((option, index) => (
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

      <FlatList
        data={tableData}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <View style={styles.actions}>
            <TouchableOpacity onPress={() => alert('Remove ' + item.name)}>
                <MaterialIcons name="remove-circle-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('Edit ' + item.name)}>
                <MaterialIcons name="edit" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push({pathname: "/colaborador/colaborador-form-visu-view", params: {}})}>
                <MaterialIcons name="visibility" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
    <BottomNav />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Example background color
  },
  content: {
    flex: 1, // Takes up the available space
    padding: 16, // Padding applied to content only
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  input: {
    flex: 1,
    borderWidth: 1,        // Border width
    borderColor: '#007bff', // Blue border color
    padding: 15,
    marginRight: 10,
    borderRadius: 5,   
  },
  filterIcon: {
    padding: 10,
    backgroundColor: '#007bff',
    color: '#FFF'
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
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#007bff', // Blue background
    borderBottomWidth: 5,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // White text
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
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
    borderColor: '#007bff', // Blue border for the radio button
    marginRight: 10,
  },
  selectedRadioButton: {
    backgroundColor: '#007bff', // Blue color for selected radio button
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


