import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text, Alert, StyleSheet, FlatList } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Header from '@/components/header';
import { BottomNav } from '@/components/bottomNav';
import { router } from 'expo-router';
import { useColaboradoratabase, ColaboradorDatabase } from '@/database/useColaboradorDatabase';

export default function ColaboradorView() {
  
  //Modal to show or hide
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
  //Setting up input search
  const [search, setSearch] = useState("");

  // ID from table
  const [id, setId] = useState(0);

  //setting up radio button
  const options = ['Nome', 'Função'];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  //Colaborador Table
  const [colaboradorTable, setColaboradorTable] = useState<ColaboradorDatabase[]>([]);
  
  //Manager the database
  const colaboradorDatabase = useColaboradoratabase();

  //Get List from database
  async function list() {
    try {
      const response = selectedOption === "Nome"
       ? await colaboradorDatabase.searchByNome(search) 
       :
        await colaboradorDatabase.searchByFuncao(search);
      setColaboradorTable(response);
    } catch (error) {
      console.error("Error to get a colaborador:", error);
    }
  }
  //Remove data by id from database
  async function remove() {
    try {
      await colaboradorDatabase.remove(id);
      await list();
      setId(0);
      setRemoveModalVisible(false);
    } catch (error) {
      console.log(error)
    }
  }
  
  function confirmDeletion(id: number){
    setRemoveModalVisible(true);
    setId(id);
 }

  //setting up Filter
  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setFilterModalVisible(false);
  };

  useEffect(() => {
    list()
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entre com a pesquisa"
            onChangeText={setSearch}
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

        <FlatList
          data={colaboradorTable}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.nome}</Text>
              <Text style={styles.tableCell}>{item.funcao}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => confirmDeletion(item.id)}>
                  <MaterialIcons name="remove-circle-outline" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "/colaborador/edition/[id]", params: { id: item.id } })}>
                  <MaterialIcons name="edit" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "/colaborador/visualization/[id]", params: { id: item.id} })}>
                  <MaterialIcons name="visibility" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </View>

      {/* Custom Confirmation Modal */}
              <Modal
              visible={removeModalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={ () => setRemoveModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Confirmação</Text>
                  <Text style={styles.modalMessage}>Deseja realmente remover esse colaborador ? </Text>
      
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={ () => setRemoveModalVisible(false)}
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
  tableHeader: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#0056b3',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  nameColumn: {
    flex: 1,
  },
  dateColumn: {
    flex: 1,
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
});